const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        models.Line.findOne({where: {id: req.params.lineId}}).then(function (line) {
            if(!line) {
                return next(new ApplicationError(`Line with id ${req.params.lineId} does not exist`, 404));
            }
			line.update({
				name: req.body.name,
				type: req.body.type
			}).then(function() {
				return res.end("Line data updated successfully");
			});
        });
    };
};
