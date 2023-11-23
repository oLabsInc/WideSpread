<<<<<<< HEAD
const mongoose = require('mongoose');


const FlexFloorSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    floor: {
        size: {
            width: Number,
            length: Number
        },
        texture: String,
    },
    wall_1: {
        size: {
            height: Number,
            length: Number
        },
        texture: String,

    },
    wall_2: {
        size: {
            height: Number,
            length: Number
        },
        texture: String,

    },
    wall_3: {
        size: {
            height: Number,
            length: Number
        },
        texture: String,

    },
    wall_4: {
        size: {
            height: Number,
            length: Number
        },
        texture: String,

    }
});

const FlexFloor = mongoose.model('FlexFloor', FlexFloorSchema);

=======
const mongoose = require('mongoose');


const FlexFloorSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    floor: {
        size: {
            width: Number,
            length: Number
        },
        texture: String,
    },
    wall_1: {
        size: {
            height: Number,
            length: Number
        },
        texture: String,

    },
    wall_2: {
        size: {
            height: Number,
            length: Number
        },
        texture: String,

    },
    wall_3: {
        size: {
            height: Number,
            length: Number
        },
        texture: String,

    },
    wall_4: {
        size: {
            height: Number,
            length: Number
        },
        texture: String,

    }
});

const FlexFloor = mongoose.model('FlexFloor', FlexFloorSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = FlexFloor;