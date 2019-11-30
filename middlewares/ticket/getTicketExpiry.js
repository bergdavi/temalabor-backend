const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        models.Ticket.findOne({where: {typeId: req.params.ticketId}}).then(function (ticket) {
            if(!ticket) {
                return next(new ApplicationError(`Ticket with id ${req.params.ticketId} does not exist`, 404));
            }
            let startDate = new Date();
            if(req.query.start) {
                startDate = new Date(req.query.start);
            }

            let expiryDate = ticket.getExpiration(startDate);

            return res.json({
                typeId: ticket.typeId,
                startDate: startDate,
                expiryDate: expiryDate
            });
        });
    };
};
