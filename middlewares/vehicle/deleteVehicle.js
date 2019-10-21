const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

// Delete line
module.exports = function (...hasPermission) {
    return function (req, res, next) {
		models.Vehicle.destroy({ where: {id: req.params.vehicleId}}).then(function() {
            res.end('Vehicle deleted successfully');
        });
    };
};
