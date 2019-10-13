module.exports = function () {
    return function (req, res, next) {
        return res.redirect(`/user/${req.user.id}`);
    };
};
