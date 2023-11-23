<<<<<<< HEAD
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    in_course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    class_creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    description: String,
    toolbox: [String],
    segments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Segment' }],
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
    attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    class_color: String
});

const Class = mongoose.model('Class', classSchema);

=======
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    in_course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    class_creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    description: String,
    toolbox: [String],
    segments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Segment' }],
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
    attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    class_color: String
});

const Class = mongoose.model('Class', classSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = Class;