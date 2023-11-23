<<<<<<< HEAD
const express = require('express');
const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })

 
/* Models */
const User = require('../models/User');
const Company = require('../models/Company');
const Subpage = require('../models/SubPage');
const Item = require('../models/Item');
const Store = require('../models/Store');
const Cart = require('../models/Cart');
const UnregisteredCart = require('../models/UnregisteredCart');
const Address = require('../models/Address');
const ItemImage = require('../models/ItemImage');

router.get('/', async (req, res) => {
    let company = null
    const allCompanies = await Company.find()
    res.render('business/home', { company, subZone: 'Home', zone: 'Business', subZonePage: 'Home', allCompanies})
});

router.get('/add/company', ensureAuthenticated, async (req, res) => {

    res.render('business/add-company', { subZone: 'Company', zone: 'Business', subZonePage: 'Add Company'})
})
router.post('/add/company', ensureAuthenticated, async (req, res) => {
    console.log(req.body)
    const data = req.body
    const newCompany = new Company(data)
    newCompany.save()
    const companyId = newCompany.id
    res.redirect(`/business/company/${companyId}`)
    
})

router.get('/company/:id', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId).populate('companyOwner').exec();
    const pages = await Subpage.find({ 'company_site': { $eq: companyId } });
    const companyName = company.company_name;
    res.render('business/company/home', { subZone: 'Company', zone: 'Business', subZonePage: 'Home', company, pages})
});

/* Subpages */
router.get('/company/:id/page/:pageId', async (req, res) => {
    const companyId = req.params.id;
    const pageId = req.params.pageId;
    const company = await Company.findById(companyId);
    const pages = await Subpage.find({ 'company_site': { $eq: companyId } });
    const page = await Subpage.findById(pageId);
    const items = await Item.find({ for_company: companyId, for_sale: true})
    
    const pageName = page.page_name;
    res.render('business/company/sub-page', { items, subZone: 'Company', zone: 'Business', subZonePage: pageName, company, page, pages})
});
router.get('/company/:companyId/product/:itemId', async (req, res) => {
    const companyId = req.params.companyId;
    const itemId = req.params.itemId;
    const company = await Company.findById(companyId);
    const pages = await Subpage.find({ 'company_site': { $eq: companyId } });
    const item = await Item.findById(itemId)
    const itemName = item.name
    res.render('business/company/store-product', { item, subZone: 'Company', zone: 'Business', subZonePage: 'Store', company, pages})
});


/* Employee Portal */
router.get('/employee/:id', async (req, res) => {
   const companyId = req.params.id; 
   const company = await Company.findById(companyId)
   res.render('business/company/employee/portal', { subZone: 'Portal', zone: 'Business', subZonePage: 'Employee Portal', company})
});


/* Admin Portal */
router.get('/admin/:id', async (req, res) => {
    const companyId = req.params.id; 
    const company = await Company.findById(companyId)
    res.render('business/company/admin/portal', { subZone: 'Company', zone: 'Business', subZonePage: 'Admin Portal', company})

});

/* Admin Manage Public Pages */
router.get('/admin/:id/manage/public-pages', async (req, res) => {
    const companyId = req.params.id; 
    const company = await Company.findById(companyId)
    const subPages = await Subpage.find({ company_site: { $eq: companyId } });
    res.render('business/company/admin/manage-pages', { subZone: 'Company', zone: 'Business', subZonePage: 'Manage Public Pages', company, subPages})

});


/* Admin Edit Subpage */
router.get('/admin/:id/manage/public-pages/edit/:pageId', async (req, res) => {
    const companyId = req.params.id;
    const pageId = req.params.pageId;
    const company = await Company.findById(companyId);
    const pages = await Subpage.find({ 'company_site': { $eq: companyId } });
    const page = await Subpage.findById(pageId);
    const pageName = page.page_name;
    res.render('business/company/admin/sub-page-edit', { subZone: 'Company', zone: 'Business', subZonePage: pageName, company, page, pages })
});

/* Admin Add Subpage */
router.get('/admin/:id/manage/public-pages/add', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    res.render('business/company/admin/sub-page-add', { subZone: 'Company', zone: 'Business', subZonePage: 'Add New Page', company })
});

router.post('/admin/:id/manage/public-pages/add', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    const newPage = new Subpage({
        company_site: company.id,
        page_name: req.body.page_name,
        page_type: req.body.page_type,
        "page_body.page_header1": req.body.page_header1,
        "page_body.page_body1": req.body.page_body1,
        "page_body.page_header2": req.body.page_header2,
        "page_body.page_body2": req.body.page_body2,
        "page_body.page_header3": req.body.page_header3,
        "page_body.page_body3": req.body.page_body3,
        "page_side.phone1": req.body.phone1,
        "page_side.phone2": req.body.phone2,
        "page_side.phone3": req.body.phone3,
        "page_side.email1": req.body.email1,
        "page_side.email2": req.body.email2,
        "page_side.email3": req.body.email3,
        "page_side.email4": req.body.email4,
        "page_side.fax1": req.body.fax1,
        "page_side.fax2": req.body.fax2,
        "page_side.main_office.street": req.body.street,
        "page_side.main_office.city": req.body.city,
        "page_side.main_office.state": req.body.state,
        "page_side.main_office.country": req.body.country,
        "page_side.main_office.zip": req.body.zip,
        "page_side.sub_office.street_sub": req.body.street_sub,
        "page_side.sub_office.city_sub": req.body.city_sub,
        "page_side.sub_office.state_sub": req.body.state_sub,
        "page_side.sub_office.country_sub": req.body.country_sub,
        "page_side.sub_office.zip_sub": req.body.zip_sub,
        list_name: req.body.list_name,
        list: req.body.list
    });
    newPage.save()
    res.redirect(`/business/admin/${company.id}/manage/public-pages`);    
});

/* Admin Edit Subpage */
router.patch('/admin/:id/manage/public-pages/:pageId', async (req, res) => {
    const companyId = req.params.id;
    const pageId = req.params.pageId;
    const company = await Company.findById(companyId);
    await Subpage.findByIdAndUpdate(pageId, {
        page_name: req.body.page_name,
        "page_body.page_header1": req.body.page_header1,
        "page_body.page_body1": req.body.page_body1,
        "page_body.page_header2": req.body.page_header2,
        "page_body.page_body2": req.body.page_body2,
        "page_body.page_header3": req.body.page_header3,
        "page_body.page_body3": req.body.page_body3,
        "page_side.phone1": req.body.phone1,
        "page_side.phone2": req.body.phone2,
        "page_side.phone3": req.body.phone3,
        "page_side.email1": req.body.email1,
        "page_side.email2": req.body.email2,
        "page_side.email3": req.body.email3,
        "page_side.email4": req.body.email4,
        "page_side.fax1": req.body.fax1,
        "page_side.fax2": req.body.fax2,
        "page_side.main_office.street": req.body.street,
        "page_side.main_office.city": req.body.city,
        "page_side.main_office.state": req.body.state,
        "page_side.main_office.country": req.body.country,
        "page_side.main_office.zip": req.body.zip,
        "page_side.sub_office.street_sub": req.body.street_sub,
        "page_side.sub_office.city_sub": req.body.city_sub,
        "page_side.sub_office.state_sub": req.body.state_sub,
        "page_side.sub_office.country_sub": req.body.country_sub,
        "page_side.sub_office.zip_sub": req.body.zip_sub,
        list_name: req.body.list_name,
        list: req.body.list
    });
    res.redirect(req.get('referer'));
});

/* Admin Delete Subpage */
router.get('/admin/:companyId/manage/public-pages/delete/:pageId', async (req, res) => {
    const pageId = req.params.pageId;
    const companyId = req.params.companyId;
    await Subpage.findByIdAndDelete(pageId)
    res.redirect(`/business/admin/${companyId}/manage/public-pages`)
});


/* Admin Inventory */
router.get('/admin/:companyId/manage/inventory', async (req, res) => {
    const companyId = req.params.companyId;
    const company = await Company.findById(companyId)
    const companyInventory = await Item.find({'for_company': {$eq: companyId}})
    res.render('business/company/admin/inventory', { company, companyInventory, subZone: 'Admin', zone: 'Business', subZonePage: 'Inventory'})
});


/* Admin Inventory Add Item */
router.get('/admin/:companyId/manage/inventory/add', async (req, res) => {
    const companyId = req.params.companyId;
    const company = await Company.findById(companyId)
    const companyInventory = await Item.find({'for_company': {$eq: companyId}})
    res.render('business/company/admin/inventory-add', { company, companyInventory, subZone: 'Admin', zone: 'Business', subZonePage: 'Inventory'})
});



/* Admin Store */
router.get('/admin/:companyId/manage/store', async (req, res) => {
    const companyId = req.params.companyId;
    const company = await Company.findById(companyId)
    const companyInventory = await Item.find({'for_company': {$eq: companyId}})
    const store = await Store.find({'for_company': {$eq: companyId}})
    res.render('business/company/admin/store', { store, company, companyInventory, subZone: 'Admin', zone: 'Business', subZonePage: 'Inventory'})
});

router.post('/admin/:companyId/manage/store/add', async (req, res) => {
    const companyId = req.params.companyId;
    const newStore = new Store({
        for_company: companyId
    })
    newStore.save()
    res.redirect(`/business/admin/${companyId}/manage/store`)
})



router.post('/admin/:companyId/manage/store/item/add', async (req, res) => {
    const companyId = req.params.companyId;
    const newStoreItem = new Item({
        for_company: companyId,
        for_sale: true,
        name: req.body.name,
        description: req.body.description,
        sku: req.body.sku,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        price: req.body.price,
        color1: req.body.color1,
        color2: req.body.color2,
        "dimensions.units": req.body.units,
        "dimensions.width": req.body.width,
        "dimensions.height": req.body.height,
        "dimensions.depth": req.body.depth,
        "weight.units": req.body.weight_units,
        "weight.value": req.body.weight_value,
        category: req.body.category,
        supplier_website: req.body.supplier_website,
        product_webpage: req.body.product_webpage,
        product_image_url: req.body.product_image_url,
        total: req.body.total,
        need: req.body.need,
        item_main_image: req.body.item_main_image,
        reorder_alert: req.body.reorder_alert,
    })
    newStoreItem.save()
    res.redirect(`/business/admin/${companyId}/manage/store`)
})


router.get('/admin/:id/manage/store/item/:itemId', async (req, res) => {
    const companyId = req. params.id;
    const itemId = req.params.itemId;
    const storeItem = await Item.findById(itemId);

    res.render('business/company/admin/store-item', { storeItem, companyId, subZone: 'Admin', zone: 'Business', subZonePage: 'Store Inventory' })

});

router.get('/admin/:id/manage/store/item/:itemId/edit', async (req, res) => {
    const companyId = req. params.id;
    const itemId = req.params.itemId;
    const storeItem = await Item.findById(itemId);

    res.render('business/company/admin/store-item-edit', { storeItem, companyId, subZone: 'Admin', zone: 'Business', subZonePage: 'Store Inventory' })

});


router.patch('/admin/:id/manage/store/item/:itemId/edit', async (req, res) => {
    const companyId = req.params.id;
    const itemId = req.params.itemId;
    await Item.findByIdAndUpdate(itemId, {
        for_company: companyId,
        for_sale: true,
        name: req.body.name,
        description: req.body.description,
        sku: req.body.sku,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        price: req.body.price,
        color1: req.body.color1,
        color2: req.body.color2,
        "dimensions.units": req.body.units,
        "dimensions.width": req.body.width,
        "dimensions.height": req.body.height,
        "dimensions.depth": req.body.depth,
        "weight.units": req.body.weight_units,
        "weight.value": req.body.weight_value,
        category: req.body.category,
        supplier_website: req.body.supplier_website,
        product_webpage: req.body.product_webpage,
        product_image_url: req.body.product_image_url,
        total: req.body.total,
        need: req.body.need,
        item_main_image: req.body.item_main_image,
        reorder_alert: req.body.reorder_alert,
    })
    res.redirect(`/business/admin/${companyId}/manage/store/item/${itemId}`)
});

/* WORK */

router.get('/work/:id', async (req, res) => {
    res.render('business/work/home', { subZone: 'Work', zone: 'Business', subZonePage: 'Home', })
});

router.get('/work/:id/schedule', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/work/schedule', { company, subZone: 'Work', zone: 'Business', subZonePage: 'Schedule', })
});

router.get('/work/:id/notes', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/work/notes', { company, subZone: 'Work', zone: 'Business', subZonePage: 'Notes', })
});

router.get('/work/:id/projects', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/work/projects', { company, subZone: 'Work', zone: 'Business', subZonePage: 'Projects', })
});

router.get('/work/:id/presentations', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/work/presentations', { company, subZone: 'Work', zone: 'Business', subZonePage: 'Presentations', })
});

router.get('/work/:id/help', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/work/help', { company, subZone: 'Work', zone: 'Business', subZonePage: 'Help', })
});


/* RESOURCES */

router.get('/resources/:id', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/resources/home', { company, subZone: 'Resources', zone: 'Business', subZonePage: 'Home', })
});

router.get('/resources/:id/text-editor', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/resources/text-editor', { company, subZone: 'Resources', zone: 'Business', subZonePage: 'Text Editor', })
});

router.get('/resources/:id/code-editor', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/resources/code-editor', { company, subZone: 'Resources', zone: 'Business', subZonePage: 'Code Editor', })
});

router.get('/resources/:id/calculators', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/resources/calculators', { company, subZone: 'Resources', zone: 'Business', subZonePage: 'Calculators', })
});

router.get('/resources/:id/information', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/resources/information', { company, subZone: 'Resources', zone: 'Business', subZonePage: 'Information', })
});

router.get('/resources/:id/help', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/resources/help', { company, subZone: 'Resources', zone: 'Business', subZonePage: 'Help', })
});


/* NEWS */

router.get('/news', async (req, res) => {
        const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/news/home', { company, subZone: 'News', zone: 'Business', subZonePage: 'Home', })
});


/* JOB SEARCH */

router.get('/job-search', async (req, res) => {
        const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/jobs/home', { company, subZone: 'Jobs', zone: 'Business', subZonePage: 'Home', })
});


/* INSIGHTS */

router.get('/insights', async (req, res) => {
        const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/insights/home', { company, subZone: 'Insights', zone: 'Business', subZonePage: 'Home', })
});


/* HELP */

router.get('/help', async (req, res) => {
        const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/help/home', { company, subZone: 'Help', zone: 'Business', subZonePage: 'Home', })
});


=======
const express = require('express');
const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })

 
/* Models */
const User = require('../models/User');
const Company = require('../models/Company');
const Subpage = require('../models/SubPage');
const Item = require('../models/Item');
const Store = require('../models/Store');
const Cart = require('../models/Cart');
const UnregisteredCart = require('../models/UnregisteredCart');
const Address = require('../models/Address');
const ItemImage = require('../models/ItemImage');

router.get('/', async (req, res) => {
    let company = null
    const allCompanies = await Company.find()
    res.render('business/home', { company, subZone: 'Home', zone: 'Business', subZonePage: 'Home', allCompanies})
});

router.get('/add/company', ensureAuthenticated, async (req, res) => {

    res.render('business/add-company', { subZone: 'Company', zone: 'Business', subZonePage: 'Add Company'})
})
router.post('/add/company', ensureAuthenticated, async (req, res) => {
    console.log(req.body)
    const data = req.body
    const newCompany = new Company(data)
    newCompany.save()
    const companyId = newCompany.id
    res.redirect(`/business/company/${companyId}`)
    
})

router.get('/company/:id', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId).populate('companyOwner').exec();
    const pages = await Subpage.find({ 'company_site': { $eq: companyId } });
    const companyName = company.company_name;
    res.render('business/company/home', { subZone: 'Company', zone: 'Business', subZonePage: 'Home', company, pages})
});

/* Subpages */
router.get('/company/:id/page/:pageId', async (req, res) => {
    const companyId = req.params.id;
    const pageId = req.params.pageId;
    const company = await Company.findById(companyId);
    const pages = await Subpage.find({ 'company_site': { $eq: companyId } });
    const page = await Subpage.findById(pageId);
    const items = await Item.find({ for_company: companyId, for_sale: true})
    
    const pageName = page.page_name;
    res.render('business/company/sub-page', { items, subZone: 'Company', zone: 'Business', subZonePage: pageName, company, page, pages})
});
router.get('/company/:companyId/product/:itemId', async (req, res) => {
    const companyId = req.params.companyId;
    const itemId = req.params.itemId;
    const company = await Company.findById(companyId);
    const pages = await Subpage.find({ 'company_site': { $eq: companyId } });
    const item = await Item.findById(itemId)
    const itemName = item.name
    res.render('business/company/store-product', { item, subZone: 'Company', zone: 'Business', subZonePage: 'Store', company, pages})
});


/* Employee Portal */
router.get('/employee/:id', async (req, res) => {
   const companyId = req.params.id; 
   const company = await Company.findById(companyId)
   res.render('business/company/employee/portal', { subZone: 'Portal', zone: 'Business', subZonePage: 'Employee Portal', company})
});


/* Admin Portal */
router.get('/admin/:id', async (req, res) => {
    const companyId = req.params.id; 
    const company = await Company.findById(companyId)
    res.render('business/company/admin/portal', { subZone: 'Company', zone: 'Business', subZonePage: 'Admin Portal', company})

});

/* Admin Manage Public Pages */
router.get('/admin/:id/manage/public-pages', async (req, res) => {
    const companyId = req.params.id; 
    const company = await Company.findById(companyId)
    const subPages = await Subpage.find({ company_site: { $eq: companyId } });
    res.render('business/company/admin/manage-pages', { subZone: 'Company', zone: 'Business', subZonePage: 'Manage Public Pages', company, subPages})

});


/* Admin Edit Subpage */
router.get('/admin/:id/manage/public-pages/edit/:pageId', async (req, res) => {
    const companyId = req.params.id;
    const pageId = req.params.pageId;
    const company = await Company.findById(companyId);
    const pages = await Subpage.find({ 'company_site': { $eq: companyId } });
    const page = await Subpage.findById(pageId);
    const pageName = page.page_name;
    res.render('business/company/admin/sub-page-edit', { subZone: 'Company', zone: 'Business', subZonePage: pageName, company, page, pages })
});

/* Admin Add Subpage */
router.get('/admin/:id/manage/public-pages/add', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    res.render('business/company/admin/sub-page-add', { subZone: 'Company', zone: 'Business', subZonePage: 'Add New Page', company })
});

router.post('/admin/:id/manage/public-pages/add', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    const newPage = new Subpage({
        company_site: company.id,
        page_name: req.body.page_name,
        page_type: req.body.page_type,
        "page_body.page_header1": req.body.page_header1,
        "page_body.page_body1": req.body.page_body1,
        "page_body.page_header2": req.body.page_header2,
        "page_body.page_body2": req.body.page_body2,
        "page_body.page_header3": req.body.page_header3,
        "page_body.page_body3": req.body.page_body3,
        "page_side.phone1": req.body.phone1,
        "page_side.phone2": req.body.phone2,
        "page_side.phone3": req.body.phone3,
        "page_side.email1": req.body.email1,
        "page_side.email2": req.body.email2,
        "page_side.email3": req.body.email3,
        "page_side.email4": req.body.email4,
        "page_side.fax1": req.body.fax1,
        "page_side.fax2": req.body.fax2,
        "page_side.main_office.street": req.body.street,
        "page_side.main_office.city": req.body.city,
        "page_side.main_office.state": req.body.state,
        "page_side.main_office.country": req.body.country,
        "page_side.main_office.zip": req.body.zip,
        "page_side.sub_office.street_sub": req.body.street_sub,
        "page_side.sub_office.city_sub": req.body.city_sub,
        "page_side.sub_office.state_sub": req.body.state_sub,
        "page_side.sub_office.country_sub": req.body.country_sub,
        "page_side.sub_office.zip_sub": req.body.zip_sub,
        list_name: req.body.list_name,
        list: req.body.list
    });
    newPage.save()
    res.redirect(`/business/admin/${company.id}/manage/public-pages`);    
});

/* Admin Edit Subpage */
router.patch('/admin/:id/manage/public-pages/:pageId', async (req, res) => {
    const companyId = req.params.id;
    const pageId = req.params.pageId;
    const company = await Company.findById(companyId);
    await Subpage.findByIdAndUpdate(pageId, {
        page_name: req.body.page_name,
        "page_body.page_header1": req.body.page_header1,
        "page_body.page_body1": req.body.page_body1,
        "page_body.page_header2": req.body.page_header2,
        "page_body.page_body2": req.body.page_body2,
        "page_body.page_header3": req.body.page_header3,
        "page_body.page_body3": req.body.page_body3,
        "page_side.phone1": req.body.phone1,
        "page_side.phone2": req.body.phone2,
        "page_side.phone3": req.body.phone3,
        "page_side.email1": req.body.email1,
        "page_side.email2": req.body.email2,
        "page_side.email3": req.body.email3,
        "page_side.email4": req.body.email4,
        "page_side.fax1": req.body.fax1,
        "page_side.fax2": req.body.fax2,
        "page_side.main_office.street": req.body.street,
        "page_side.main_office.city": req.body.city,
        "page_side.main_office.state": req.body.state,
        "page_side.main_office.country": req.body.country,
        "page_side.main_office.zip": req.body.zip,
        "page_side.sub_office.street_sub": req.body.street_sub,
        "page_side.sub_office.city_sub": req.body.city_sub,
        "page_side.sub_office.state_sub": req.body.state_sub,
        "page_side.sub_office.country_sub": req.body.country_sub,
        "page_side.sub_office.zip_sub": req.body.zip_sub,
        list_name: req.body.list_name,
        list: req.body.list
    });
    res.redirect(req.get('referer'));
});

/* Admin Delete Subpage */
router.get('/admin/:companyId/manage/public-pages/delete/:pageId', async (req, res) => {
    const pageId = req.params.pageId;
    const companyId = req.params.companyId;
    await Subpage.findByIdAndDelete(pageId)
    res.redirect(`/business/admin/${companyId}/manage/public-pages`)
});


/* Admin Inventory */
router.get('/admin/:companyId/manage/inventory', async (req, res) => {
    const companyId = req.params.companyId;
    const company = await Company.findById(companyId)
    const companyInventory = await Item.find({'for_company': {$eq: companyId}})
    res.render('business/company/admin/inventory', { company, companyInventory, subZone: 'Admin', zone: 'Business', subZonePage: 'Inventory'})
});


/* Admin Inventory Add Item */
router.get('/admin/:companyId/manage/inventory/add', async (req, res) => {
    const companyId = req.params.companyId;
    const company = await Company.findById(companyId)
    const companyInventory = await Item.find({'for_company': {$eq: companyId}})
    res.render('business/company/admin/inventory-add', { company, companyInventory, subZone: 'Admin', zone: 'Business', subZonePage: 'Inventory'})
});



/* Admin Store */
router.get('/admin/:companyId/manage/store', async (req, res) => {
    const companyId = req.params.companyId;
    const company = await Company.findById(companyId)
    const companyInventory = await Item.find({'for_company': {$eq: companyId}})
    const store = await Store.find({'for_company': {$eq: companyId}})
    res.render('business/company/admin/store', { store, company, companyInventory, subZone: 'Admin', zone: 'Business', subZonePage: 'Inventory'})
});

router.post('/admin/:companyId/manage/store/add', async (req, res) => {
    const companyId = req.params.companyId;
    const newStore = new Store({
        for_company: companyId
    })
    newStore.save()
    res.redirect(`/business/admin/${companyId}/manage/store`)
})



router.post('/admin/:companyId/manage/store/item/add', async (req, res) => {
    const companyId = req.params.companyId;
    const newStoreItem = new Item({
        for_company: companyId,
        for_sale: true,
        name: req.body.name,
        description: req.body.description,
        sku: req.body.sku,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        price: req.body.price,
        color1: req.body.color1,
        color2: req.body.color2,
        "dimensions.units": req.body.units,
        "dimensions.width": req.body.width,
        "dimensions.height": req.body.height,
        "dimensions.depth": req.body.depth,
        "weight.units": req.body.weight_units,
        "weight.value": req.body.weight_value,
        category: req.body.category,
        supplier_website: req.body.supplier_website,
        product_webpage: req.body.product_webpage,
        product_image_url: req.body.product_image_url,
        total: req.body.total,
        need: req.body.need,
        item_main_image: req.body.item_main_image,
        reorder_alert: req.body.reorder_alert,
    })
    newStoreItem.save()
    res.redirect(`/business/admin/${companyId}/manage/store`)
})


router.get('/admin/:id/manage/store/item/:itemId', async (req, res) => {
    const companyId = req. params.id;
    const itemId = req.params.itemId;
    const storeItem = await Item.findById(itemId);

    res.render('business/company/admin/store-item', { storeItem, companyId, subZone: 'Admin', zone: 'Business', subZonePage: 'Store Inventory' })

});

router.get('/admin/:id/manage/store/item/:itemId/edit', async (req, res) => {
    const companyId = req. params.id;
    const itemId = req.params.itemId;
    const storeItem = await Item.findById(itemId);

    res.render('business/company/admin/store-item-edit', { storeItem, companyId, subZone: 'Admin', zone: 'Business', subZonePage: 'Store Inventory' })

});


router.patch('/admin/:id/manage/store/item/:itemId/edit', async (req, res) => {
    const companyId = req.params.id;
    const itemId = req.params.itemId;
    await Item.findByIdAndUpdate(itemId, {
        for_company: companyId,
        for_sale: true,
        name: req.body.name,
        description: req.body.description,
        sku: req.body.sku,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        price: req.body.price,
        color1: req.body.color1,
        color2: req.body.color2,
        "dimensions.units": req.body.units,
        "dimensions.width": req.body.width,
        "dimensions.height": req.body.height,
        "dimensions.depth": req.body.depth,
        "weight.units": req.body.weight_units,
        "weight.value": req.body.weight_value,
        category: req.body.category,
        supplier_website: req.body.supplier_website,
        product_webpage: req.body.product_webpage,
        product_image_url: req.body.product_image_url,
        total: req.body.total,
        need: req.body.need,
        item_main_image: req.body.item_main_image,
        reorder_alert: req.body.reorder_alert,
    })
    res.redirect(`/business/admin/${companyId}/manage/store/item/${itemId}`)
});

/* WORK */

router.get('/work/:id', async (req, res) => {
    res.render('business/work/home', { subZone: 'Work', zone: 'Business', subZonePage: 'Home', })
});

router.get('/work/:id/schedule', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/work/schedule', { company, subZone: 'Work', zone: 'Business', subZonePage: 'Schedule', })
});

router.get('/work/:id/notes', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/work/notes', { company, subZone: 'Work', zone: 'Business', subZonePage: 'Notes', })
});

router.get('/work/:id/projects', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/work/projects', { company, subZone: 'Work', zone: 'Business', subZonePage: 'Projects', })
});

router.get('/work/:id/presentations', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/work/presentations', { company, subZone: 'Work', zone: 'Business', subZonePage: 'Presentations', })
});

router.get('/work/:id/help', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/work/help', { company, subZone: 'Work', zone: 'Business', subZonePage: 'Help', })
});


/* RESOURCES */

router.get('/resources/:id', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/resources/home', { company, subZone: 'Resources', zone: 'Business', subZonePage: 'Home', })
});

router.get('/resources/:id/text-editor', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/resources/text-editor', { company, subZone: 'Resources', zone: 'Business', subZonePage: 'Text Editor', })
});

router.get('/resources/:id/code-editor', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/resources/code-editor', { company, subZone: 'Resources', zone: 'Business', subZonePage: 'Code Editor', })
});

router.get('/resources/:id/calculators', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/resources/calculators', { company, subZone: 'Resources', zone: 'Business', subZonePage: 'Calculators', })
});

router.get('/resources/:id/information', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/resources/information', { company, subZone: 'Resources', zone: 'Business', subZonePage: 'Information', })
});

router.get('/resources/:id/help', async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/resources/help', { company, subZone: 'Resources', zone: 'Business', subZonePage: 'Help', })
});


/* NEWS */

router.get('/news', async (req, res) => {
        const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/news/home', { company, subZone: 'News', zone: 'Business', subZonePage: 'Home', })
});


/* JOB SEARCH */

router.get('/job-search', async (req, res) => {
        const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/jobs/home', { company, subZone: 'Jobs', zone: 'Business', subZonePage: 'Home', })
});


/* INSIGHTS */

router.get('/insights', async (req, res) => {
        const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/insights/home', { company, subZone: 'Insights', zone: 'Business', subZonePage: 'Home', })
});


/* HELP */

router.get('/help', async (req, res) => {
        const companyId = req.params.id;
    const company = await Company.findById(companyId)
    res.render('business/help/home', { company, subZone: 'Help', zone: 'Business', subZonePage: 'Home', })
});


>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = router;