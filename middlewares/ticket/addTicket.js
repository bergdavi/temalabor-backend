const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        models.Ticket.create({
            type: req.body.type,
            validFor: req.body.validFor,
            line: req.body.line,
            price: req.body.price
        }).then(function(ticket) {
            if (ticket) {
                res.json({status: 'ok', description: 'Ticket created successfully'});
            } else {
                return next(new ApplicationError('Error while creating ticket', 500));
            }
        }).catch(function(err) {
            return next(new ApplicationError('Error while creating ticket', 500));
        });
    };
};
