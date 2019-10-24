const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        models.User.findOne({where: {id: req.params.userId}, include: [models.BoughtTicket]}).then(function (user) {
            if(!user) {
                return next(new ApplicationError(`User with id ${req.params.userId} does not exist`, 400));
            }
            return res.json(
                user.BoughtTickets
            );
        });
    };
};
