const ApplicationError = require('../../exceptions/ApplicationError');

function checkIdCardElder(idCard) {
	return idCard === '9999';	
}

module.exports = function () {
    return function (req, res, next) {
        // Anyone can register a new user
        if(!req.body.type || req.body.type === 'user') {
            // If no type is given the default is user
            req.body.type = 'user';
            return next();
        } else if(req.body.type === 'elder') {
			if(req.user && req.user.type === 'admin') {
				return next();
			}
			if(checkIdCardElder(req.body.idCard)) {
				return next();
			}
			return next(new ApplicationError(`Could not verify ID Card '${req.body.idCard}'`, 403));
		} else if(req.body.type === 'inspector' || req.body.type === 'admin') {
            if(!req.user || req.user.type !== 'admin') {
                return next(new ApplicationError(`Only admin users can register new '${req.body.type}' users`, 401));
            }
            return next();
        }
        return next(new ApplicationError(`User type '${req.body.type}' is unknown`, 401));
    };
};
