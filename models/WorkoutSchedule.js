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

module.exports = WorkoutSchedule;