const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        models.Vehicle.findOne({where: {id: req.params.vehicleId}, include: [models.Line]}).then(function (vehicle) {
            if(!vehicle) {
                return next(new ApplicationError(`Vehicle with id ${req.params.vehicleId} does not exist`, 404));
            }
            return res.json({
                id: vehicle.id,
                type: vehicle.type,
                licencePlate: vehicle.licencePlate,
                // TODO decide which to use
                //line: vehicle.line ? vehicle.line : '*'
                line: vehicle.Line ? {
                    id: vehicle.Line.id,
                    name: vehicle.Line.name,
                    type: vehicle.Line.type
                } : null
            });
        });
    };
};
