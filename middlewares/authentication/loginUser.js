const passport = require('passport');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        passport.authenticate('local', function(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new ApplicationError('Wrong username or password', 401));
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                req.session.save(function() {
                    return res.redirect('/user');
                });
            });
        })(req, res, next);
    };
};
