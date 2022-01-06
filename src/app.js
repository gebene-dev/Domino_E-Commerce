require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieCheck = require('./middlewares/cookieCheck')

const methodOverride =  require('method-override');
const session = require('express-session');

const localUserCheck = require('./middlewares/processLogin');

const indexRouter= require('./routes/index');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const vistasRouter = require('./routes/vistas');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(session({
  secret : "my secret",
  resave: false,
  saveUninitialized: true
}))

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'..', 'public')));

app.use(cookieCheck);
app.use(localUserCheck);

app.use('/',indexRouter)
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/vistas', vistasRouter);
app.use('/api/carts',require('./routes/api/carts'));

app.use('/api/products',require('./routes/api/products'));
app.use('/api/users',require('./routes/api/users'));


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
  res.render('error');
});

module.exports = app;
