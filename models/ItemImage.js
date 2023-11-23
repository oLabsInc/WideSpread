<<<<<<< HEAD
const mongoose = require('mongoose');

const ItemImageSchema = new mongoose.Schema({
    for_item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    img:
    {
        data: Buffer,
        contentType: String
    },
    image_description: String
});



=======
const mongoose = require('mongoose');

const ItemImageSchema = new mongoose.Schema({
    for_item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    img:
    {
        data: Buffer,
        contentType: String
    },
    image_description: String
});



>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = new mongoose.model('ItemImage', ItemImageSchema); 