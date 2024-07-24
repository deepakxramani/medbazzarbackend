var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');

var usersRouter = require('./routes/users');
var categoryRouter=require('./routes/category');
var brandsRouter=require('./routes/brands');
var subcategoryRouter=require('./routes/subcategory');
var productsRouter=require('./routes/products');
var productDetailsRouter=require('./routes/productdetails');
var adminRouter=require('./routes/admin')
var bannersRouter=require('./routes/banner')
var concernsRouter=require('./routes/concern')
var userInterfaceRouter=require('./routes/userinterface')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/brands', brandsRouter);
app.use('/subcategory', subcategoryRouter);
app.use('/products', productsRouter);
app.use('/productdetails', productDetailsRouter)
app.use('/admin', adminRouter)
app.use('/banner', bannersRouter)
app.use('/concern', concernsRouter)
app.use('/userinterface', userInterfaceRouter)

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
