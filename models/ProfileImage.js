const mongoose = require('mongoose');

const imageProfileSchema = new mongoose.Schema({
    imageOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    img:
    {
        data: Buffer,
        contentType: String
    },
});

//profileImage is a model which has a schema imageSchema 

module.exports = new mongoose.model('ProfileImage', imageProfileSchema); 