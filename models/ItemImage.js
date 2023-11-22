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



module.exports = new mongoose.model('ItemImage', ItemImageSchema); 