<<<<<<< HEAD
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

=======
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

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = Store;