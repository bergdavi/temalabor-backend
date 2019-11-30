const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

// Delete user
module.exports = function (...hasPermission) {
    return function (req, res, next) {
		models.User.destroy({ where: {id: req.params.userId}});
		if(req.user.id === req.params.userId) {
			req.logout();
		}
        res.end('User deleted successfully');
    };
};
