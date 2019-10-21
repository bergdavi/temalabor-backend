const models  = require('../../models');

module.exports = function () {
    return function (req, res, next) {
        models.Ticket.findAll({ include: [models.Line] }).then(function (tickets) {
            let ticketList = [];
            tickets.forEach(ticket => ticketList.push({
                typeId: ticket.typeId,
                type: ticket.type,
                validFor: ticket.validFor,
                price: ticket.price,
                // TODO decide which to use
                //line: ticket.line ? ticket.line : '*'
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
