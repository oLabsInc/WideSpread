<<<<<<< HEAD
const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
    employeeInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    employeeResume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
    start_date: { type: Date, default: Date.now() },
    PIN: String,
    department: String,
    team: String,
    attendance_history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TimeCard' }],
    salary: Number,
    wage: Number,
    requests: [String],
    notes: [String]
});

const Employee = mongoose.model('Employee', employeeSchema);

=======
const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
    employeeInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    employeeResume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
    start_date: { type: Date, default: Date.now() },
    PIN: String,
    department: String,
    team: String,
    attendance_history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TimeCard' }],
    salary: Number,
    wage: Number,
    requests: [String],
    notes: [String]
});

const Employee = mongoose.model('Employee', employeeSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = Employee;