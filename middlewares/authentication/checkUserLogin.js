const ApplicationError = require('../../exceptions/ApplicationError');

// TODO: user type should be only verified in 1 middleware
module.exports = function (...allowedTypes) {
    return function (req, res, next) {
        if(!req.user) {
            return next(new ApplicationError(`User not logged in`, 401));
        }
        if(allowedTypes.length !== 0 && !allowedTypes.includes(req.user.type)) {
            return next(new ApplicationError(`User does not have permission to view this page`, 403));
        }
        return next();
    };
};
