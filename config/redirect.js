<<<<<<< HEAD
module.exports = {
    getUrl: function (req, res, next) {
        // console.log(res)
        req.returnUrl = req._parsedOriginalUrl.pathname
        console.log('INSIDE ensureAuthenticated MIDDLEWARE')

        console.log(req.returnUrl)
        next()
    }
=======
module.exports = {
    getUrl: function (req, res, next) {
        // console.log(res)
        req.returnUrl = req._parsedOriginalUrl.pathname
        console.log('INSIDE ensureAuthenticated MIDDLEWARE')

        console.log(req.returnUrl)
        next()
    }
>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
}