const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        if(req.body.validFor) {
            if(!['day', 'hour'].includes(req.body.validTimeUnit)) {
                return next(new ApplicationError('If validFor is given, validFor is required, and must be "day" or "hour"', 400));
            }
        }
        models.Ticket.create({
            type: req.body.name,
            validFor: req.body.validFor,
            validTimeUnit: req.body.validTimeUnit,
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
