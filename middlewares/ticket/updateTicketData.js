const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        if(req.body.validFor || req.body.validTimeUnit) {
            if(!['day', 'hour'].includes(req.body.validTimeUnit)) {
                return next(new ApplicationError('If validFor is given, validFor is required, and must be "day" or "hour"', 400));
            }
        }
        models.Ticket.findOne({where: {typeId: req.params.ticketId}}).then(function (ticket) {
            if(!ticket) {
                return next(new ApplicationError(`Ticket with id ${req.params.ticketId} does not exist`, 404));
            }
			ticket.update({
                type: req.body.type,
                validFor: req.body.validFor,
                validTimeUnit: req.body.validTimeUnit,
                line: req.body.line,
                price: req.body.price
			}).then(function() {
				return res.end("Ticket data updated successfully");
			}).catch(function(err) {
			    return next(new ApplicationError('There was an error while updating ticket data', 500));
            });
        });
    };
};
