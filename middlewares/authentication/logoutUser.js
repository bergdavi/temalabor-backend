module.exports = function () {
    return function (req, res, next) {
        req.logout();
        res.redirect('/');
    };
};
