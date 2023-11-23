<<<<<<< HEAD
const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    address_owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    street: String,
    building_number: String,
    apartment_number: String,
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    building_type: String,
    indoor: Boolean,
    handicap_accessible: Boolean,
    virtual: {
        is_virtual: Boolean,
        link: String,
    },
    special_instructions: [String]
});

const Address = mongoose.model('Address', AddressSchema);

=======
const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    address_owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    street: String,
    building_number: String,
    apartment_number: String,
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    building_type: String,
    indoor: Boolean,
    handicap_accessible: Boolean,
    virtual: {
        is_virtual: Boolean,
        link: String,
    },
    special_instructions: [String]
});

const Address = mongoose.model('Address', AddressSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = Address;