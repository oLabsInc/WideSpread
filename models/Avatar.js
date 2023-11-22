const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema({
    imageOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    img:
    {
        data: Buffer,
        contentType: String
    },
});

//avatar is a model which has a schema imageSchema 

module.exports = new mongoose.model('Avatar', avatarSchema); 