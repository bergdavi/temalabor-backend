const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        models.Ticket.findOne({where: {typeId: req.params.ticketId}, include: [models.Line]}).then(function (ticket) {
            if(!ticket) {
                return next(new ApplicationError(`Ticket with id ${req.params.ticketId} does not exist`, 404));
            }
            return res.json({
                typeId: ticket.typeId,
                type: ticket.getTicketType(),
                name: ticket.type,
                validFor: ticket.validFor,
                validTimeUnit: ticket.validTimeUnit,
                price: ticket.price,
                line: ticket.Line ? {
                    id: ticket.Line.id,
                    name: ticket.Line.name,
                    type: ticket.Line.type
                } : null
            });
        });
    };
};
