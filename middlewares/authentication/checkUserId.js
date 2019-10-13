const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        console.log(req.params);
        if(req.user.id !== req.params.userId && !(req.user.type === 'admin' || req.user.type === 'inspector')) {
            return next(new ApplicationError(`User doesn't have permission to view this page`, 403));
        }
        return next();
    };
};
