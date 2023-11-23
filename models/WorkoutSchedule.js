<<<<<<< HEAD
const mongoose = require('mongoose');


const WorkoutScheduleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    sunday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    monday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    tuesday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    wednesday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    thursday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    friday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    saturday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }]
});

const WorkoutSchedule = mongoose.model('WorkoutSchedule', WorkoutScheduleSchema);

=======
const mongoose = require('mongoose');


const WorkoutScheduleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    sunday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    monday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    tuesday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    wednesday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    thursday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    friday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    saturday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }]
});

const WorkoutSchedule = mongoose.model('WorkoutSchedule', WorkoutScheduleSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = WorkoutSchedule;