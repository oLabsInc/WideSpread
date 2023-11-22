const mongoose = require('mongoose');


const departmentSchema = new mongoose.Schema({
    in_company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    name: String,
    phone: String,
    fax: String,
    email: String,
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DepartmentTeam' }],
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    department_color: String,
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;