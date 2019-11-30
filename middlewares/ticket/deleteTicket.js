const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

// Delete line
module.exports = function (...hasPermission) {
    return function (req, res, next) {
		models.Ticket.destroy({ where: {typeId: req.params.ticketId}}).then(function() {
            res.end('Ticket deleted successfully');
        });
    };
};
