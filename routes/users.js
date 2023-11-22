const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// const {ensureAuthenticated } = require('../config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })


const { readUserData, allUserPosts, getUserPosts } = require("../modules/user/user-data");

/* Models */
const User = require('../models/User');
const Post = require('../models/Post');
const ProfileImage = require('../models/ProfileImage');
const Avatar = require('../models/Avatar');
const SpreadChat = require('../models/SpreadChat');
const Event = require('../models/Event');



// Login Page
router.get('/login', async (req, res) => {
    const currentUser = null

    if (!req.user) {
        const userSpreadChats = null
        res.render('login', {currentPageTitle: 'Login', currentUser, userSpreadChats});
    } else {
        const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: req.user.id.split(',') } },
            function (err, userSpreadChats) {
                console.log("User: " + userSpreadChats);
            }).populate('user_list').exec()
            res.render('login', {currentPageTitle: 'Login', currentUser, userSpreadChats});
    }
})

// Register Page
router.get('/register', (req, res) => {
    const currentUser = null
    res.render('register', {currentPageTitle: 'Register', currentUser});
})

// Register Handle
router.post('/register', (req, res) => {
    const {fname, lname, email, password, password2 } = req.body;
    let errors = [];
    console.log(req.body)
    // Check required fields
    if(!fname || !lname || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields'})
    }
    // Check passwords match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match'})
    }

    // Check password length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters'})
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            fname,
            lname,
            email,
            password,
            password2
        });
    } else {
        // Validation Pass
        User.findOne({ email: email })
        .then(user => {
            if (user) {
                // User Exists
                errors.push({ msg: 'Email is already registered'})
                res.render('register', {
                    errors,
                    fname,
                    lname,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    fname,
                    lname,
                    email,
                    password
                });
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    // Set password to hashed
                    newUser.password = hash;
                    // Save user
                    newUser.save()
                        .then(user => {
                            console.log('user: ', user)
                            req.flash('success_msg', 'You are now registered and can log in');
                            res.render('login', {currentPageTitle: 'Login'});
                        })
                        .catch(err => console.log(err));

                }))
            }
        })
        .catch();
    }
})


// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users/dashboard',
        successReturnToOrRedirect: '/users/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
    console.log(req)
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login')
});


router.get('/test', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    readUserData(userId).then(userData => {

        getUserPosts(userId).then( data => {
            console.log(`\n \n \n \n \n \n \n \n \n \nDATA: ${user}`)
            res.render('test-page', {userData, data})
        }
        )
    })
});


router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    const thisUser = req.user;
    const userId = req.user.id;
    const allUsers = await User.find()
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') }},
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    const user = await User.findById(userId).populate('friends').exec()
    res.render('users/user-dashboard', { subZone: 'Dashboard', zone: 'User', user, allUsers, userSpreadChats});
});






router.get('/settings', ensureAuthenticated, async (req, res) => {
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: req.user.id.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate('user_list').exec()
    const user = req.user;
    const userId = req.user.id;
    res.render('users/user-settings', { subZone: 'Settings', zone: 'User', subZonePage: 'Home', user, userSpreadChats});
});

router.get('/settings/update-profile', ensureAuthenticated, async (req, res) => {
    const user = req.user;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: req.user.id.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate('user_list').exec()
    res.render('users/settings/update-profile', { subZonePage: 'Update Your Profile', subZone: 'Settings', zone: 'User', user, userSpreadChats})
});

router.get('/settings/prefrences', ensureAuthenticated, async (req, res) => {
    const user = req.user;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: req.user.id.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate('user_list').exec()
    res.render('users/settings/prefrences', { subZonePage: 'Prefrences', subZone: 'Settings', zone: 'User', user, userSpreadChats})
});

router.get('/settings/privacy', ensureAuthenticated, async (req, res) => {
    const user = req.user;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: req.user.id.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate('user_list').exec()
    res.render('users/settings/privacy', { subZonePage: 'Privacy', subZone: 'Settings', zone: 'User', user, userSpreadChats})
});

router.get('/settings/security', ensureAuthenticated, async (req, res) => {
    const user = req.user;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: req.user.id.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate('user_list').exec()
    res.render('users/settings/security', { subZonePage: 'Security', subZone: 'Settings', zone: 'User', user, userSpreadChats})
});

router.get('/settings/help', ensureAuthenticated, async (req, res) => {
    const user = req.user;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: req.user.id.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate('user_list').exec()
    res.render('users/settings/help', { subZonePage: 'Help', subZone: 'Settings', zone: 'User', user, userSpreadChats})
});




router.patch('/update-profile', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    await User.findByIdAndUpdate(userId, data);
    res.redirect(req.get('referer'));
});

router.patch('/update-profile/add-education', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const data = {
        "institution": req.body.institution,
        "grade_numbers.start": req.body.gradeStart,
        "grade_numbers.end": req.body.gradeEnd,
        "attended.start": req.body.start,
        "attended.end.completed": req.body.graduated,
        "attended.end.completion_date": req.body.completionDate,
        "attended.gpa": req.body.gpa,
    }
    await User.findByIdAndUpdate(userId,
        { $addToSet: { previous_education: data } },
        { safe: true, upsert: true },
        function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                console.log('doc: ', doc)
                return
            }
        }
    )
    res.redirect(req.get('referer'));
});

router.delete('/delete', ensureAuthenticated, async (req, res) => {
    const user = req.user.id;
    await User.findByIdAndDelete(user);
    res.redirect('/users/login')
});




// User Profile Page
router.get('/public/:id', async (req, res) => {
    const id = req.params.id
    const profileImages = await ProfileImage.find({ imageOwner: { $eq: id } });
    const avatarImage = await Avatar.findOne({ imageOwner: { $eq: id } });

    const thisUser = await User.findById(id)
        .populate('friends')
        .exec()
    res.render('users/public-public-profile', { currentPageTitle: "Profile", thisUser, profileImages, avatarImage })

})
router.get('/private/:id', ensureAuthenticated, async (req, res) => {
    const id = req.params.id
    const userId = req.user._id;

    const posts = await Post.find({ author: { $eq: id } }).sort({ createdAt: 'desc' }).populate(
        {
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'author',
                model: 'User'
            }
        }
    )
    .populate({
        path: 'author',
        model: 'User'
    })
    .exec();
    console.log(posts)
    const profileImages = await ProfileImage.find({ imageOwner: { $eq: id } });
    const avatarImage = await Avatar.findOne({ imageOwner: { $eq: id } });

    const thisUser = await User.findById(id)
        .populate('friends')
        .exec()

        res.render('users/public-profile', { currentPageTitle: "Profile", posts, userId, thisUser, profileImages, avatarImage, id })
});
router.get('/reject/:requestingUserId/reject-friend/:userId', ensureAuthenticated, async (req, res) => {
    const requestingUserId = req.params.requestingUserId
    const userId = req.params.userId

    await User.findByIdAndUpdate(userId, 
        { $pull: { friend_requests: requestingUserId } },
        function (err, doc) {
            if (err) {
                console.log(err);
            } else {

                console.log(doc)
            }
        })
    await User.findByIdAndUpdate(requestingUserId, 
        { $pull: { pending_friend_requests: userId } },
        function (err, doc) {
            if (err) {
                console.log(err);
            } else {

                console.log(doc)
            }
        })
    res.redirect('/users/notifications/type/friend')
})
router.get('/friend-request/:userRequesting/:userRequested', ensureAuthenticated, async (req, res) => {
    const userRequestingId = req.params.userRequesting
    const userRequestedId = req.params.userRequested
    console.log('userRequestedId: ', userRequestedId)
    console.log('userRequestingId: ', userRequestingId)


    await User.findByIdAndUpdate(userRequestedId,
        { $addToSet: { friend_requests: userRequestingId } },
        { safe: true, upsert: true },
        function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                console.log('doc: ', doc)
                return
            }
        }
    )

    await User.findByIdAndUpdate(userRequestingId,
        { $addToSet: { pending_friend_requests: userRequestedId } },
        { safe: true, upsert: true },
        function (err, doc) {
            if (err) {
                console.log(err);
            } else {

                console.log(doc)
            }
        }
    )

    res.redirect(req.get('referer'));


})


router.get('/notifications/type/friend', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const user = await User.findById(userId).populate('friend_requests').exec()
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: req.user.id.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate('user_list').exec()
    console.log('currentUser: ', user)

    res.render('users/notifications/friends', { subZonePage: 'Friends', subZone: 'Notifications', zone: 'User', user, userSpreadChats })
})

router.get('/notifications/type/spread', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const user = await User.findById(userId).populate('spread_notifications.from').exec()
    const spreadData = await User.findById(userId).populate('spread_notifications.spread_id').exec()
    console.log('\n\n\n\nSpreadData:\n\n')
    console.log(spreadData)
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: req.user.id.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate('user_list').exec()
    console.log('currentUser: ', user)
    
    res.render('users/notifications/spreads', { subZonePage: 'Spreads', subZone: 'Notifications', zone: 'User', user, userSpreadChats, spreadData })
})

router.post('/:friendId/add-friend/:userAcceptingId/accept', ensureAuthenticated, async (req, res) => {
    const friendId = req.params.friendId
    const userAcceptingId = req.params.userAcceptingId
    const newConversation = userAcceptingId + '_' + friendId
    const userList = [userAcceptingId, friendId]
    console.log('userList: ', userList)
    const newSpreadChat = new SpreadChat({
        user_list: userList,
        chat_session: newConversation
    })
    newSpreadChat.save()
    const spreadChatId = newSpreadChat.id
    console.log('SpreadChat ID: ', spreadChatId)
    res.redirect(`/users/${friendId}/add-friend/${userAcceptingId}/chat-id/${spreadChatId}`)
})
router.get('/:friendId/add-friend/:acceptingUser/chat-id/:spreadChatId', ensureAuthenticated, async (req, res) => {
    const friendId = req.params.friendId;
    const userId = req.params.acceptingUser;
    const spreadChatId = req.params.spreadChatId
    console.log("friendId: " + friendId);
    await User.findByIdAndUpdate(userId, 
            { $pull: { friend_requests: friendId }},
            function (err, doc) {
                if (err) {
                    console.log(err);
                } else {

                    console.log(doc)
                }
            }
        )
    await User.findByIdAndUpdate(userId,
        {
            $addToSet: { spread_chats: spreadChatId }
        },
        { safe: true, upsert: true },
        function (err, doc) {
            if (err) {
                console.log(err);
            } else {

                console.log(doc)
            }
        }
    )
    await User.findOne({ '_id': friendId }, '_id', (err, newFriend) => {
        console.log("newFriend ID - Step 1: " + newFriend._id);
        console.log("currentUser ID - Step 2: " + userId);
        if (err) {
            return
        } else {
            User.findByIdAndUpdate(userId,
                { 
                    $addToSet: { friends: friendId }
                },
                { safe: true, upsert: true },
                function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {

                        console.log(doc)
                    }
                }
            )


            

        }
    })
        .then(

            res.redirect(`/users/return/${userId}/add-friend/${friendId}/chat-id/${spreadChatId}`)
        )

});


/* router.get('/:friendId/add-friend/chat-id/:chatSession', ensureAuthenticated, async (req, res) => {
    const friendId = req.params.friendId
    const chatSession = req.params.chatSession
    const userId = req.user.id
    await User.findByIdAndUpdate(userId, 
        { $addToSet: {spread_chats: chatSession}},
        { safe: true, upsert: true },
        function (err, doc) {
            if (err) {
                console.log(err);
            } else {

                console.log(doc)
            }
        }
    )

    res.redirect(`/users/return/${userId}/${friendId}/add-friend/chat-id/${chatSession}`)
}) */

router.get('/return/:acceptedUsersId/add-friend/:requestingFriendsId/chat-id/:spreadChatId', ensureAuthenticated, async (req, res) => {
    const acceptedUsersId = req.params.acceptedUsersId
    const requestingFriendsId = req.params.requestingFriendsId
    const spreadChatId = req.params.spreadChatId

    await User.findByIdAndUpdate(requestingFriendsId,
        { $addToSet: { spread_chats: spreadChatId } },
        { safe: true, upsert: true },
        function (err, doc) {
            if (err) {
                console.log(err);
            } else {

                console.log(doc)
            }
        }
    )
    await User.findByIdAndUpdate(requestingFriendsId,
        { $pull: { pending_friend_requests: acceptedUsersId } },
        function (err, doc) {
            if (err) {
                console.log(err);
            } else {

                console.log(doc)
            }
        }
    )
    await User.findByIdAndUpdate(requestingFriendsId,
        { $addToSet: { friends: acceptedUsersId } },
        { safe: true, upsert: true },
        function (err, doc) {
            if (err) {
                console.log(err);
            } else {

                console.log(doc)
            }
        }
    )
    await User.findByIdAndUpdate(requestingFriendsId,
        { $addToSet: { spread_chats: spreadChatId } },
        { safe: true, upsert: true },
        function (err, doc) {
            if (err) {
                console.log(err);
            } else {

                console.log(doc)
            }
        }
    )

    res.redirect(`/users/notifications/type/friend`)
})

router.get('/:friendId/add-friend/check', ensureAuthenticated, async (req, res) => {
    let friendId = req.params.friendId;
    let userId = req.user._id;

    let newConversation = userId + '_' + friendId
    console.log("friendId: " + friendId);
    console.log('newConversation: ', newConversation)
    await User.findByIdAndUpdate(userId, 
            { $pull: { friend_requests: friendId }},
            function (err, doc) {
                if (err) {
                    console.log(err);
                } else {

                    console.log(doc)
                }
            }
        )
    await User.findOne({ '_id': friendId }, '_id', (err, newFriend) => {
        console.log("newFriend ID - Step 1: " + newFriend._id);
        console.log("currentUser ID - Step 2: " + userId);
        if (err) {
            return
        } else {
            User.findByIdAndUpdate(userId,
                { 
                    $addToSet: { friends: friendId }
                },
                { safe: true, upsert: true },
                function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {

                        console.log(doc)
                    }
                }
            )


            

        }
    })
        .then(

            res.redirect(`/users/${userId}/add-friend/check`)
        )

});

router.get('/calendar', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const userCalendar = await Event.find({for_user: userId})
    console.log('userCalendar: ', userCalendar)
    res.render('users/calendar', { subZonePage: 'Home', subZone: 'Calendar', zone: 'User', userCalendar})
})


router.post('/calendar/event/save', ensureAuthenticated, async (req, res) => {
    const data = req.body
    console.log('data: ', data)
    const startYear = data.year
    const startMonth = data.month - 1
    const startDay = data.day
    const hoursS = data.start.slice(0, 2);
    const minutesS = data.start.slice(3);
    const start = new Date(startYear, startMonth, startDay, hoursS, minutesS)
    let diffStart = start.getTimezoneOffset()

    console.log('start: ', start)
    console.log('diffStart: ', diffStart)

    const endYear = data.year
    const endMonth = data.month - 1
    const endDay = data.day
    const hoursE = data.end.slice(0, 2);
    const minutesE = data.end.slice(3);
    const end = new Date(endYear, endMonth, endDay, hoursE, minutesE)
    let diffEnd = end.getTimezoneOffset()
    console.log('end: ', end)
    console.log('diffEnd: ', diffEnd)


     const addedEvent = new Event({
        for_user: req.user.id,
        name: req.body.name,
        'schedule.start': start,
        'schedule.end': end
    })
    addedEvent.save()
    console.log('addedEvent: ', addedEvent)
    res.redirect('/users/calendar')
})
module.exports = router;