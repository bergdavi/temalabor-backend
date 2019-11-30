const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

// Delete line
module.exports = function (...hasPermission) {
    return function (req, res, next) {
		models.Line.destroy({ where: {id: req.params.lineId}}).then(function() {
			res.end('Line deleted successfully');
		}).catch(function() {
			return next(new ApplicationError('Failed to delete line', 500));
		});
    };
};
