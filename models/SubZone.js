const mongoose = require('mongoose');


const subZoneSchema = new mongoose.Schema({
    zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone' },
    name: String,
    code: Number,
    description: String,
    route: String
});

const subZone = mongoose.model('subZone', subZoneSchema);

module.exports = subZone;