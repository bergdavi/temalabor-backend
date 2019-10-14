const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const models  = require('./models');

const passport = require('passport');
const LocalStrategy = require('passport-local');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const usersRouter = require('./routes/users');
const authenticationRouter = require('./routes/authentication');

passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    function(email, password, done) {
        models.User.findOne({where: {email: email}}).then(function (user) {
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    models.User.findOne({where: {id: id}}).then(function (user) {
        return done(null, user);
    });
});


const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'noycr47c8f7h9cb248yoc1r=87oxe8n4or8cs4',
    store: new sequelizeStore({
        db: models.sequelize
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10*60*1000 // 10 mins
    }
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/auth', authenticationRouter);
app.use('/user', userRouter);
app.use('/users', usersRouter);


// Default error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({error: err.message})
});

module.exports = app;
