const mongoose = require('mongoose');


const ExerciseSchema = new mongoose.Schema({
    for_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    exercise: String,
    exercise_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout' },
    set1: {
        weight: Number,
        reps: Number,
    },
    set2: {
        weight: Number,
        reps: Number,
    },
    set3: {
        weight: Number,
        reps: Number,
    },
    set4: {
        weight: Number,
        reps: Number,
    },
    set5: {
        weight: Number,
        reps: Number,
    },
    max_weight: Number,
    max_reps: Number,
    date: {
        type: Date,
        default: Date.now()
    }
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;