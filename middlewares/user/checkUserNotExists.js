const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {

    return function (req, res, next) {
        // TODO use unique constraint instead
        models.User.findOne({where: {email: req.body.email}}).then(function (user) {
            if(!user) {
                return next();
            }
            return next(new ApplicationError(`User with email address '${req.body.email}' already exists`, 400));
        });
    };
};
