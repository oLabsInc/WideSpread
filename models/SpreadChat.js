const mongoose = require('mongoose');

const SpreadChatSchema = new mongoose.Schema({
    user_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    chat_session: {
        type: String,
        unique: true
    },
    conversation: [ {
        sent_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: String,
        sent_at: {
            type: Date,
            default: Date.now()
        }
    } ]
});

const SpreadChat = mongoose.model('SpreadChat', SpreadChatSchema);

module.exports = SpreadChat;