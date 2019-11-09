const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        let now = new Date();
        models.Vehicle.findOne({
            where: {
                $or: [
                    {id: req.body.vehicleId},
                    {changingId: req.body.vehicleId}
                ]
            }
        }).then(function(vehicle){
            if(!vehicle) {
                return next(new ApplicationError(`Vehicle with id ${req.body.vehicleId} does not exist`, 400));
            }
            models.BoughtTicket.findAll({
                include: [{model: models.Ticket, include: [models.Line]}],
                where: {
                    user: req.user.id,
                    $or: [
                        {
                            validFrom: null
                        },
                        {
                            validFrom: {$lte: now},
                            validUntil: {$gte: now}
                        }
                    ]
                }
            }).then(function (tickets) {
                let lineTicket = undefined;
                let passTicket = undefined;
                tickets.forEach(function(ticket) {
                    if(ticket.Ticket.Line === null || ticket.Ticket.Line.id === vehicle.id) {
                        if(ticket.Ticket.getTypeName === 'lineTicket' && !ticket.lastValidated) {
                            lineTicket = ticket;
                        } else {
                            passTicket = ticket;
                        }
                    }
                });
                let ticket = lineTicket? lineTicket : passTicket;
                if(ticket) {
                    ticket.update({
                        lastValidated: now,
                    }).then(function() {
                        return res.end({
                            status: 'validated',
                            ticket: {
                                id: ticket.id,
                                validFrom: ticket.validFrom,
                                validUntil: ticket.validUntil,
                                ticketType: {
                                    typeId: ticket.Ticket.typeId,
                                    type: ticket.Ticket.getTypeName(),
                                    name: ticket.Ticket.type,
                                    validFor: ticket.Ticket.validFor,
                                    validTimeUnit: ticket.Ticket.validTimeUnit,
                                    line: {
                                        id: ticket.Ticket.Line.id,
                                        name: ticket.Ticket.Line.name,
                                        type: ticket.Ticket.Line.type
                                    }
                                }
                            }
                        });
                    });
                } else {
                    return res.end({
                        status: 'invalid',
                        ticket: null
                    });
                }
            });
        });
    };
};
