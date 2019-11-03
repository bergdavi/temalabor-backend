const models  = require('../../models');

module.exports = function () {
    return function (req, res, next) {
        models.Ticket.findAll({ include: [models.Line] }).then(function (tickets) {
            let ticketList = [];
            tickets.forEach(ticket => ticketList.push({
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
            }));
            res.json(ticketList);
        });
    };
};
