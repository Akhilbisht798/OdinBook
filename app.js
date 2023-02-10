var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const cors = require('cors');

dotenv.config();

// MongoDb connection.
require('./config/mongoConfig');

// Passport Strategy
require('./config/passport-local');
require('./config/passport-facebook');

var userRouter = require('./routes/auth');
var requestRouter = require('./routes/Request');
var postRouter = require('./routes/postRoute');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash()); 
app.use(session({
  secret: process.env.SECRET,
  resave: false, 
  saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());

//Routes.
app.use('/', userRouter);
app.use('/Request', requestRouter);
app.use('/Post', postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

app.listen(process.env.PORT, () => {
  console.log(`[server]: Server listening in PORT ${process.env.PORT}`);
})

module.exports = app;