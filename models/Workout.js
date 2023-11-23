<<<<<<< HEAD
const mongoose = require('mongoose');


const WorkoutSchema = new mongoose.Schema({
    exercise: String,
    category: String
});

const Workout = mongoose.model('Workout', WorkoutSchema);

=======
const mongoose = require('mongoose');


const WorkoutSchema = new mongoose.Schema({
    exercise: String,
    category: String
});

const Workout = mongoose.model('Workout', WorkoutSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = Workout;