const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); //import cors
const session = require('express-session');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/API/user');
const billRouter = require('./routes/API/bill');
const productRouter = require('./routes/API/product');
const categoryRouter = require('./routes/API/category');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//khai báo thong tin session, cookie
app.use(session({
  secret: 'iloveyou',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

//khai báo cors
app.use(cors({ 
  origin: ['http://localhost:3000', 'http://localhost:3001',],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


//conect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/gocpho?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

//http://localhost:3000
app.use('/', indexRouter);
//http://localhost:3000/user
app.use('/user', usersRouter);
//http://localhost:3000/bill
app.use('/bill', billRouter);
//http://localhost:3000/product
app.use('/product', productRouter);
//http://localhost:3000/category
app.use('/category', categoryRouter);

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
