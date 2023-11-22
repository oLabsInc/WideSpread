const mongoose = require('mongoose');

const userBackgroundImageSchema = new mongoose.Schema({
    imageOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    img:
    {
        data: Buffer,
        contentType: String
    },
    image_description: String
});

//UserBackgroundImage is a model which has a schema imageSchema 

module.exports = new mongoose.model('UserBackgroundImage', userBackgroundImageSchema); 