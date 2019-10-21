const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        models.Ticket.findOne({where: {typeId: req.params.ticketId}}).then(function (ticket) {
            if(!ticket) {
                return next(new ApplicationError(`Ticket with id ${req.params.ticketId} does not exist`, 404));
            }
			ticket.update({
                type: req.body.type,
                validFor: req.body.validFor,
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
