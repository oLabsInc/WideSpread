const mongoose = require('mongoose');
/* 
{
            item_name: String,
            description: String,
            category: String,
            available_sizes: {
                x_small: Number,
                small: Number,
                medium: Number,
                large: Number,
                x_large: Number,
                one_size: Number
            },
            colors: [String],
            item_number: String,
            sku: String,
            price: String,
            images: {
                main_image: {
                    figure: String,
                    caption: String
                },
                secondary_image: {
                    figure: String,
                    caption: String
                }
            },
            in_stock: Number
        }
*/

const itemSchema = new mongoose.Schema({
    for_company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    name: {
        type: String,
        required: true
    },
    description: String,
    sku: String,
    make: /* {type: mongoose.Schema.Types.ObjectId, ref: 'Company'} */String,
    model: String,
    year: String,
    price: Number,
    color1: String,
    color2: String,
    dimensions: {
        units: String,
        width: Number,
        height: Number,
        depth: Number
    },
    weight: {
        units: String,
        value: Number
    },
    category: String,
    supplier_website: String,
    product_webpage: String,
    product_image_url: String,
    need: Number,
    for_sale: Boolean,
    item_main_image: String,
    item_images: [String],
    total: Number,
    reorder_alert: Number
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;