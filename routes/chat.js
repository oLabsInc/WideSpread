const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
// const { ensureAuthenticated } = require('../config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })
const { v4: uuidV4 } = require('uuid')

/* Models */
const User = require('../models/User');
const SpreadChat = require('../models/SpreadChat');



router.get('/', (req, res) => {
    res.render('spreadchat/home')
})


router.get('/video/:spreadChatId/:spreadChatSession/:calling/:recieving', ensureAuthenticated, async (req, res) => {
    const spreadChatId = req.params.spreadChatId
    const spreadChatSession = req.params.spreadChatSession
    const callingUserId = req.params.calling
    const recievingUserId = req.params.recieving
    const userId = req.user.id

    const callingUser = await User.findById(callingUserId)
    const recievingUser = await User.findById(recievingUserId)
    const spreadChat = await SpreadChat.findById(spreadChatId)
    
    const userSpreadChats = await SpreadChat.find({chat_session: {$eq: spreadChatSession}},
        function (err, userSpreadChats) {
             console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    res.redirect(`/chat/${spreadChatSession}/${spreadChatId}/${uuidV4()}`)
    res.render('spreadchat/video', {callingUser, recievingUser, spreadChat, userSpreadChats, roomId: spreadChatSession})

})


router.get('/:spreadChatSession/:spreadChatId/:room', ensureAuthenticated, async (req, res) => {
    const spreadChatSession = req.params.spreadChatSession
    const spreadChatId = req.params.spreadChatId;
    const spreadChat = await SpreadChat.findById(spreadChatId).populate('user_list').exec()
    console.log(spreadChat)
    const userSpreadChats = await SpreadChat.find({ chat_session: { $eq: spreadChatSession } },
        function (err, userSpreadChats) {
            console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    res.render('video-chat', { layout: 'video-chat', roomId: req.params.room, userSpreadChats, spreadChatSession, spreadChat })
})
















router.post('/create-new', ensureAuthenticated, async (req, res, next) => {
    const session = req.body
    console.log(session)
    const sessionToSave = session.chat_session
    const otherUser = session.other_user
    const userList = [otherUser, req.user.id]
    const newConversation = new SpreadChat({
        user_list: userList,
        chat_session: sessionToSave
    })
    await newConversation.save()

    userList.forEach(user => {
        User.findByIdAndUpdate(user, 
        { $addToSet: { spread_chats:sessionToSave } },
        { safe: true, upsert: true, new: true },
        function (err, doc) {
            if (err) {
                console.log(err)
            } else {
                return
            }
        
        })

    })
    res.redirect(req.get('referer'));
})


router.post('/spread-session/:sessionId/append', ensureAuthenticated, async (req, res) => {
    const sessionId = req.params.sessionId
    const messageObject = req.body
    const chatObject = {
        user: messageObject.sent_by,
        body: messageObject.body,
        sent_at: Date.now()

    }
    const message = chatObject.body
    console.log('Message', message)
    console.log('messageObject: ', messageObject)


    console.log('chatObject: ', chatObject)
    await SpreadChat.findOneAndUpdate({chat_session: {$eq: sessionId}}, 
        { $addToSet: { conversation:  message } },
        { safe: true, upsert: true, new: true },
        function (err, doc) {
            if (err) {
                console.log(err)
            } else {
                return
            }

        })
})



router.get('/users/:chatId', ensureAuthenticated, async (req, res) => {
    const chatId = req.params.chatId
    const spreadChat = await SpreadChat.find({ chat_session: {$eq: chatId}})
    console.log('spreadChat: ',spreadChat)
    const conversation = spreadChat.conversation
    
    console.log('conversation: ', conversation)
    var obj = { 0: 'a', 1: 'b', 2: 'c' };
    console.log(Object.values(obj));
    res.render('spreadchat/private-room', { layout: 'spreadchat', spreadChat})
} )
module.exports = router;