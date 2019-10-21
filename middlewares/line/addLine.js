const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        models.Line.create({
            name: req.body.name,
            type: req.body.type
        }).then(function (user) {
            if (user) {
                res.json({status: 'ok', description: 'Line created successfully'});
            } else {
                return next(new ApplicationError('Error while creating line', 500));
            }
        });
    };
};
