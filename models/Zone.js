const mongoose = require('mongoose');


const zoneSchema = new mongoose.Schema({
    name: String,
    code: Number,
    route: String
});

const Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;