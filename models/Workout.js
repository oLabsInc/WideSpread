const mongoose = require('mongoose');


const WorkoutSchema = new mongoose.Schema({
    exercise: String,
    category: String
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;