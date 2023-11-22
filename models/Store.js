const mongoose = require('mongoose');


const storeSchema = new mongoose.Schema({
    for_company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    stripe: {
        public_key: String,
        private_key: String,
        account_email: String
    },
    sales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }]
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;