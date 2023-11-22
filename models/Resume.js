const mongoose = require('mongoose');


const resumeSchema = new mongoose.Schema({
    resumeOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resume_name: String,
    bio: String,
    objective: String,
    education: {
        school: String,
        graduated: String,
        major: String,
        gpa: String
    },
    employment_history: {
        company: String,
        position: String,
        year_start: String,
        year_end: String,
        reference: {
            fname: String,
            lname: String,
            email: String,
            phone: String
        }
    },
    volunteer_work: String,
    special_skill1: String,
    special_skill2: String,
    special_skill3: String,
    special_skill4: String,
    special_skill5: String
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;