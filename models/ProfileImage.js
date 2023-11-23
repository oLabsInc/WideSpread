<<<<<<< HEAD
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

=======
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

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = new mongoose.model('ProfileImage', imageProfileSchema); 