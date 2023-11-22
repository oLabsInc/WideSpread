const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    for_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    unregistered_user: {
        fname: String,
        lname: String,
        mailing_address: {
            street: String,
            building: String,
            apartment: String,
            city: String,
            state: String,
            zip: String,
            counrty: String,
            spcial_instructions: String
        },
        billing: {
            payment_type: String,
            payment_info: {
                card_number: String,
                expiration: String,
                cvv: String
            }
        }
    },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
            quantity: Number,
            chosen_size: String
        }
    ],
    total_price: Number,
    total_quantity: Number,
    ship_to: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod' },
    order_date: {
        type: Date,
        default: Date.now()
    },
    shipped: {
        type: Boolean,
        default: false
    },
    shipped_date: Date
});


module.exports = new mongoose.model('Cart', cartSchema);