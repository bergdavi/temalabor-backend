const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        models.Vehicle.findOne({where: {id: req.params.vehicleId}}).then(function (vehicle) {
            console.log(req.body);
            if(!vehicle) {
                return next(new ApplicationError(`Vehicle with id ${req.params.vehicleId} does not exist`, 404));
            }
			vehicle.update({
                line: req.body.line
			}).then(function() {
				return res.end("Vehicle data updated successfully");
			}).catch(function(err) {
			    return next(new ApplicationError('There was an error while updating vehicle data', 500));
            });
        });
    };
};
