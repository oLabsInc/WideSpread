<<<<<<< HEAD
const mongoose = require('mongoose');


const zoneSchema = new mongoose.Schema({
    name: String,
    code: Number,
    route: String
});

const Zone = mongoose.model('Zone', zoneSchema);

=======
const mongoose = require('mongoose');


const zoneSchema = new mongoose.Schema({
    name: String,
    code: Number,
    route: String
});

const Zone = mongoose.model('Zone', zoneSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = Zone;