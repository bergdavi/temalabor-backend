const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');
const op = require('sequelize').Op;

function inspectTicket(tickets, vehicle, user) {
    let validTickets = [];
    tickets.forEach(function(ticket) {
        if(ticket.Ticket.getTypeName() === 'lineTicket') {
            if([vehicle.id, vehicle.changingId].includes(ticket.lastValidatedOn)) {
                validTickets.push(ticket);
            }
        } else {
            let now = new Date();
            if(now > ticket.validFrom && now < ticket.validUntil && (ticket.Ticket.line === null || ticket.Ticket.line === vehicle.line)) {
                validTickets.push(ticket);
            }
        }
    });
    let now = new Date();
    validTickets.forEach(function(ticket) {
        ticket.update({
            lastInspected: now
        });
    });
    return {
        status: validTickets.length === 0 ? 'invalid' : 'validated',
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            idCard: user.idCard,
            type: user.type
        },
        tickets: validTickets.map(function(ticket) {
            return {
                id: ticket.id,
                validFrom: ticket.validFrom,
                validUntil: ticket.validUntil,
                lastValidated: ticket.lastValidated,
                lastValidatedOn: ticket.lastValidatedOn,
                ticketType: {
                    typeId: ticket.Ticket.typeId,
                    type: ticket.Ticket.getTypeName(),
                    name: ticket.Ticket.type,
                    validFor: ticket.Ticket.validFor,
                    validTimeUnit: ticket.Ticket.validTimeUnit,
                    line: ticket.Ticket.Line ? {
                        id: ticket.Ticket.Line.id,
                        name: ticket.Ticket.Line.name,
                        type: ticket.Ticket.Line.type
                    } : null
                }
            }
        })
    };
}

module.exports = function () {
    return function (req, res, next) {
        models.Vehicle.findOne({
            where: {
                [op.or]: [
                    {id: req.body.vehicleId},
                    {changingId: req.body.vehicleId}
                ]
            }
        }).then(function(vehicle) {
            if(!vehicle) {
                return next(new ApplicationError(`Vehicle id '${req.body.vehicleId}' not found`, 404));
            }
            models.User.findOne({where: {id: req.body.id},  include: [{model: models.BoughtTicket, include: [{model: models.Ticket, include: [models.Line]}]}]}).then(function (user) {
                if(!user) {
                    models.BoughtTicket.findOne({where: {id: req.body.id}, include: [{model: models.Ticket, include: [models.Line]}, {model: models.User}]}).then(function (ticket) {
                        if(ticket) {
                            res.json(inspectTicket([ticket], vehicle, ticket.User));
                        } else {
                            return next(new ApplicationError(`Ticket / User with id '${req.body.id}' not found`, 404));
                        }
                    });
                } else {
                    res.json(inspectTicket(user.BoughtTickets, vehicle, user));
                }
            });
        });
    }
};
