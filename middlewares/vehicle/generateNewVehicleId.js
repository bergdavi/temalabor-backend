const models  = require('../../models');
const uuidv4 = require('uuid/v4');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        models.Vehicle.findOne({where: {id: req.params.vehicleId}}).then(function (vehicle) {
            if(!vehicle) {
                return next(new ApplicationError(`Vehicle with id ${req.params.vehicleId} does not exist`, 404));
            }
			vehicle.update({
                changingId: uuidv4()
			}).then(function() {
				return res.redirect(`/vehicle/${vehicle.id}`);
			}).catch(function(err) {
			    return next(new ApplicationError('There was an error while generating new vehicle id', 500));
            });
        });
    };
};
