const mongoose = require('mongoose');


const companySchema = new mongoose.Schema({
    companyOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    company_name: String,
    company_bio: String,
    company_street_1: String,
    company_street_2: String,
    company_suite_number: String,
    company_city: String,
    company_state: String,
    company_zip: String,
    company_country: String,
    company_type: String,
    company_phone: String,
    company_fax: String,
    company_main_email: String,
    company_website: String,
    background_image: String,
    logo: String,
    item_card_background: String,
    sub_pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subpage' }],
    departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
    job_applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resume' }],
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    inventory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            have: Number,
            need: Number
        }
    ],
    colors: {
        main: String,
        accent: String,
        offset: String
    }
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;