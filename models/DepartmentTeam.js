const mongoose = require('mongoose');


const departmentTeamSchema = new mongoose.Schema({
    in_department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    name: String,
    tools: [{
        tool: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        number: String,
    }],
    vehicles: [{
        vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        number: String,
        license_plate: String,
        vin: String,
        driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }],
    trailers: [{
        trailer: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        number: String,
        license_plate: String,
        for_driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }],
    schedule: [{
        sunday: [{
            client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            work: String,
            time_start: {
                type: Date,
                default: Date.now()
            },

            time_end: {
                type: Date,
                default: Date.now()
            },
            notes: String

        }],
        monday: [{
            client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            work: String,
            time_start: {
                type: Date,
                default: Date.now()
            },

            time_end: {
                type: Date,
                default: Date.now()
            },
            notes: String

        }],
        tuesday: [{
            client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            work: String,
            time_start: {
                type: Date,
                default: Date.now()
            },

            time_end: {
                type: Date,
                default: Date.now()
            },
            notes: String

        }],
        wednesday: [{
            client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            work: String,
            time_start: {
                type: Date,
                default: Date.now()
            },

            time_end: {
                type: Date,
                default: Date.now()
            },
            notes: String

        }],
        thursday: [{
            client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            work: String,
            time_start: {
                type: Date,
                default: Date.now()
            },

            time_end: {
                type: Date,
                default: Date.now()
            },
            notes: String

        }],
        friday: [{
            client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            work: String,
            time_start: {
                type: Date,
                default: Date.now()
            },

            time_end: {
                type: Date,
                default: Date.now()
            },
            notes: String

        }],
        saturday: [{
            client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            work: String,
            time_start: {
                type: Date,
                default: Date.now()
            },

            time_end: {
                type: Date,
                default: Date.now()
            },
            notes: String

        }],

    }
    ],
    team_leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    team_color: String,
});

const DepartmentTeam = mongoose.model('DepartmentTeam', departmentTeamSchema);

module.exports = DepartmentTeam;