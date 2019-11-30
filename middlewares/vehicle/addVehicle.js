const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        models.Vehicle.create({
            type: req.body.type,
            licencePlate: req.body.licencePlate,
            line: req.body.line
        }).then(function(vehicle) {
            if (vehicle) {
                res.json({status: 'ok', description: 'Vehicle created successfully'});
            } else {
                return next(new ApplicationError('Error while creating vehicle', 500));
            }
        }).catch(function(err) {
            return next(new ApplicationError('Error while creating vehicle', 500));
        });
    };
};
