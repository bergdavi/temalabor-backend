const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function (...params) {
    return function (req, res, next) {
        params.forEach((param) => {
            if(!(param in req.body)) {
                next(new ApplicationError(`Missing parameter '${param}' from request body`, 400));
            }
        });
        return next();
    };
};
