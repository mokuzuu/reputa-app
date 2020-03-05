let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const responseTime = require('response-time')
const api = require('./api');
const AWS = require('aws-sdk');

let indexRouter = require('./routes/index');
let searchRouter = require('./routes/search');

// Cloud Services Set-up
// Create unique bucket name
const bucketName = api.bucketName;
// Create a promise on S3 service object
const bucketPromise = new AWS.S3({
  apiVersion: '2006-03-01'
}).createBucket({
  Bucket: bucketName
}).promise();

bucketPromise.then(function(data) {
  console.log("Successfully created " + bucketName);
}).catch(function(err) {
  console.error(err, err.stack);
});

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cors());
app.use(responseTime());

app.use('/', indexRouter);
app.use('/search', searchRouter);

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
