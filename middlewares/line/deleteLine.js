const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

// Delete line
module.exports = function (...hasPermission) {
    return function (req, res, next) {
		models.Line.destroy({ where: {id: req.params.lineId}});
        res.end('Line deleted successfully');
    };
};
