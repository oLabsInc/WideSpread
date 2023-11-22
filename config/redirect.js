module.exports = {
    getUrl: function (req, res, next) {
        // console.log(res)
        req.returnUrl = req._parsedOriginalUrl.pathname
        console.log('INSIDE ensureAuthenticated MIDDLEWARE')

        console.log(req.returnUrl)
        next()
    }
}