require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');
var brandsRouter = require('./routes/brands');
var subcategoryRouter = require('./routes/subcategory');
var productsRouter = require('./routes/products');
var productDetailsRouter = require('./routes/productdetails');
var adminRouter = require('./routes/admin');
var bannersRouter = require('./routes/banner');
var concernsRouter = require('./routes/concern');
var userInterfaceRouter = require('./routes/userinterface');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.log('users:', typeof usersRouter);
console.log('category:', typeof categoryRouter);
console.log('brands:', typeof brandsRouter);
console.log('subcategory:', typeof subcategoryRouter);
console.log('products:', typeof productsRouter);
console.log('productDetails:', typeof productDetailsRouter);
console.log('admin:', typeof adminRouter);
console.log('banners:', typeof bannersRouter);
console.log('concerns:', typeof concernsRouter);
console.log('userInterface:', typeof userInterfaceRouter);

app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/brands', brandsRouter);
app.use('/subcategory', subcategoryRouter);
app.use('/products', productsRouter);
app.use('/productdetails', productDetailsRouter);
app.use('/admin', adminRouter);
app.use('/banner', bannersRouter);
app.use('/concern', concernsRouter);
app.use('/userinterface', userInterfaceRouter);
app.use(
  cors({
    origin: [
      'https://medbazzar.netlify.app',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5000',
    ],
    credentials: true,
  }),
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
