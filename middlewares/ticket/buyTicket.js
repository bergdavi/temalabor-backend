const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        let count = req.body.count ? req.body.count : 1;
        let validFrom;
        if(req.body.fromDate) {
            validFrom = new Date(req.body.fromDate);
        } else {
            validFrom = new Date();
        }
        if(!(validFrom instanceof Date && !isNaN(validFrom.getTime()))) {
            return next(new ApplicationError(`Wrong date format, it should be ISO 8601`, 400));
        }
        models.Ticket.findOne({where: {typeId: req.body.typeId}}).then(function (ticket) {
            if(!ticket) {
                return next(new ApplicationError(`Ticket with id ${req.body.typeId} does not exist`, 404));
            }
            let validUntil = ticket.getExpiration(validFrom);
            if(ticket.getTypeName() === 'lineTicket') {
                validFrom = null;
                validUntil = null;
            }
            let createPromises = [];
            for(let i = 0; i < count; i++) {
                createPromises.push(models.BoughtTicket.create({
                    ticketType: req.body.typeId,
                    validFrom: validFrom,
                    validUntil: validUntil,
                    user: req.user.id
                }));
            }
            Promise.all(createPromises).then(function (tickets) {
                if (tickets) {
                    let selectPromises = [];
                    tickets.forEach(ticket => {
                        selectPromises.push(models.BoughtTicket.findOne({where: {id: ticket.id}, include: [models.Ticket]}));
                    });
                    Promise.all(selectPromises).then(function (tickets) {
                        if(tickets) {
                            tickets = tickets.map((ticket => {
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
                            }));
                            return res.json(tickets);
                        } else {
                            return next(new ApplicationError('Error while querying bought tickets', 500));
                        }
                    });
                } else {
                    return next(new ApplicationError('Error while buying ticket', 500));
                }
            }).catch(function (err) {
                return next(new ApplicationError('Error while buying ticket', 500));
            });
        });
    };
};
