var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');	//To Acquire it
var methodOverride = require('method-override');
const hbs  = require('hbs');
var passport = require('passport'),
    OpenIDStrategy = require('passport-openid').Strategy;
    var helpers = require('handlebars-helpers')({hbs:hbs});

passport.use(new OpenIDStrategy({
        returnURL: 'http://localhost:3000/auth/openid/return',
        realm: 'http://localhost:3000/',
        profile: true
    },
    function(identifier, profile, done) {
        User.findOrCreate({ openId: identifier }, function(err, user) {
            done(err, user);
        });
    }
));



// api routers
var indexRouter = require('./routes/api/index');
var usersRouter = require('./routes/api/users');
var authRouter = require('./routes/api/auth');
var testRouter = require('./routes/api/test');

//admin routers
const authAdmin = require('./routes/admin/auth');
const groupAdmin = require('./routes/admin/group');
const groupAccessAdmin = require('./routes/admin/groupAccess');
const dashboardAdmin = require('./routes/admin/dashboard');

var app = express();

// view engine setup
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

  
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'mohammad',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false,path:'/', maxAge: 60000 }
  }))

app.use(express.static(path.join(__dirname, 'public')));
// override with the X-HTTP-Method-Override header in the request
// app.use(methodOverride('X-HTTP-Method-Override'))

app.use(methodOverride('_method'))

// api routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/test', testRouter);


// admin routers
app.use('/admin/auth', authAdmin)
app.use('/admin/group', groupAdmin)
app.use('/admin/group', groupAdmin)
app.use('/admin/groupAccess', groupAccessAdmin);
app.use('/admin/dashboard', dashboardAdmin);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    // next(createError(404));
    res.render('404')
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('500');
});

module.exports = app;