var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('./mongo/product.model');
require('./mongo/category.model');
require('./mongo/user.model')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());

// chatgpt fix
app.use(express.urlencoded({ extended: true }));


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect Mongo
const db = 'Fruitables'
mongoose.connect(`mongodb://localhost:27017/${db}`)
.then(()=> console.log(`Kết nối mongodb ${db} db thành công`))
.catch(err=>console.log(err))

// Sử dụng CORS với tất cả các nguồn gốc
app.use(cors());

// Hoặc chỉ cho phép một số nguồn gốc cụ thể
// app.use(cors({
//     origin: 'http://127.0.0.1:5500'
// }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productsRouter);
app.use('/categories',categoriesRouter)

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
