<<<<<<< HEAD
module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'You must be logged in to view this page');
        res.redirect('/users/login');
    }
=======
module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'You must be logged in to view this page');
        res.redirect('/users/login');
    }
>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
}