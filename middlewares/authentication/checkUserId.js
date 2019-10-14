const ApplicationError = require('../../exceptions/ApplicationError');

// Check user permission
// hasPermission array can contain 'self', 'user', 'inspector', 'admin'
// 'self' requires :userId request param, checks if the acessed user is the same as the logged in user
module.exports = function (...hasPermission) {
    return function (req, res, next) {
		if(hasPermission.includes("self")) {
			if(req.user.id === req.params.userId) {
				return next();
			}
		}
        if(hasPermission.includes(req.user.type)) {
        	return next();
        }
        return next(new ApplicationError(`User does not have permission to view this page`, 403));
    };
};
