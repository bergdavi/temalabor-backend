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
            Promise.all(createPromises).then(function (ticket) {
                if (ticket) {
                    res.json({status: 'ok', description: 'Ticket bought successfully'});
                } else {
                    return next(new ApplicationError('Error while buying ticket', 500));
                }
            }).catch(function (err) {
                return next(new ApplicationError('Error while buying ticket', 500));
            });
        });
    };
};
