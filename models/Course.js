<<<<<<< HEAD
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    course_creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    subject: String,
    description: String,
    difficulty: String,
    prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    credit_value: Number,
    background_image: String,
    course_colors: {
        main: String,
        accent: String
    }
});

const Course = mongoose.model('Course', courseSchema);

=======
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    course_creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    subject: String,
    description: String,
    difficulty: String,
    prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    credit_value: Number,
    background_image: String,
    course_colors: {
        main: String,
        accent: String
    }
});

const Course = mongoose.model('Course', courseSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = Course;