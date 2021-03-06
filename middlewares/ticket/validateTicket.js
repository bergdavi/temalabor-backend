const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');
const op = require('sequelize').Op;

module.exports = function () {
    return function (req, res, next) {
        let now = new Date();
        models.Vehicle.findOne({
            where: {
                [op.or]: [
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
                where: req.body.ticketId ? {
                    id: req.body.ticketId,
                    user: req.user.id,
                    [op.or]: [
                        {
                            validFrom: null
                        },
                        {
                            validFrom: {[op.lte]: now},
                            validUntil: {[op.gte]: now}
                        }
                    ]
                } : {
                    user: req.user.id,
                    [op.or]: [
                        {
                            validFrom: null
                        },
                        {
                            validFrom: {[op.lte]: now},
                            validUntil: {[op.gte]: now}
                        }
                    ]
                }
            }).then(function (tickets) {
                let lineTicket = undefined;
                let passTicket = undefined;
                tickets.forEach(function(ticket) {
                    if(ticket.Ticket.Line === null || ticket.Ticket.Line.id === vehicle.id) {
                        console.log(ticket.Ticket.getTypeName());
                        if(ticket.Ticket.getTypeName() === 'lineTicket') {
                            if(!ticket.lastValidated) {
                                lineTicket = ticket;
                            }
                        } else {
                            passTicket = ticket;
                        }
                    }
                });
                let ticket = passTicket ? passTicket : lineTicket;
                if(ticket) {
					let now = new Date();
					let expire = new Date(now.getTime() + 1000*60*60*2);
					let updatedTicket =  {
						lastValidated: now,
                        lastValidatedOn: vehicle.id
					};
					if(ticket.Ticket.getTypeName() === 'lineTicket') {
						updatedTicket.validFrom = now;
						updatedTicket.validUntil = expire;
					}
                    ticket.update(updatedTicket).then(function() {
                        return res.json({
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
                        });
                    });
                } else {
                    return res.json(null);
                }
            });
        });
    };
};
