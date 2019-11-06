module.exports = function () {
    return function (req, res, next) {
        if(req.user) {
            req.logout();
        }
        res.redirect('/');
    };
};
