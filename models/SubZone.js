<<<<<<< HEAD
const mongoose = require('mongoose');


const subZoneSchema = new mongoose.Schema({
    zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone' },
    name: String,
    code: Number,
    description: String,
    route: String
});

const subZone = mongoose.model('subZone', subZoneSchema);

=======
const mongoose = require('mongoose');


const subZoneSchema = new mongoose.Schema({
    zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone' },
    name: String,
    code: Number,
    description: String,
    route: String
});

const subZone = mongoose.model('subZone', subZoneSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = subZone;