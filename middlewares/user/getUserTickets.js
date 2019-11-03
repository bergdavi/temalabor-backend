const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        models.User.findOne({where: {id: req.params.userId}, include: [{model: models.BoughtTicket, include: [{model: models.Ticket, include: [models.Line]}]}]}).then(function (user) {
            if(!user) {
                return next(new ApplicationError(`User with id ${req.params.userId} does not exist`, 400));
            }
            return res.json(
                user.BoughtTickets.map((ticket => ({
                    id: ticket.id,
                    validFrom: ticket.validFrom,
                    validUntil: ticket.validUntil,
                    ticketType: {
                        typeId: ticket.Ticket.typeId,
                        type: ticket.getTicketType(),
                        name: ticket.type,
                        validFor: ticket.Ticket.validFor,
                        validTimeUnit: ticket.Ticket.validTimeUnit,
                        line: {
                            id: ticket.Ticket.Line.id,
                            name: ticket.Ticket.Line.name,
                            type: ticket.Ticket.Line.type
                        }
                    }
                })))
            );
        });
    };
};
