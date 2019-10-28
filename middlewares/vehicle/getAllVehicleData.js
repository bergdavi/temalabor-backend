const models  = require('../../models');

module.exports = function () {
    return function (req, res, next) {
        models.Vehicle.findAll({ include: [models.Line] }).then(function (vehicles) {
            let vehicleList = [];
            vehicles.forEach(vehicle => vehicleList.push({
                id: vehicle.id,
                type: vehicle.type,
                licencePlate: vehicle.licencePlate,
                line: vehicle.Line ? {
                    id: vehicle.Line.id,
                    name: vehicle.Line.name,
                    type: vehicle.Line.type
                } : null
            }));
            res.json(vehicleList);
        });
    };
};
