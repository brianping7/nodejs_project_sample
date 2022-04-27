var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs')
var session = require('express-session');
var index = require('./routes/index');
var collections = require('./routes/collections'); 
var kit = require('./routes/kit');
var admin = require('./routes/admin');
var login = require('./routes/login');
var player = require('./routes/player');
var color = require('./routes/color');
var contact = require('./routes/contact');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html'); 
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser('bricoadmin'));
app.use(session({
    secret: 'bricoadmin',//与cookieParser中的一致
    resave: true,
    saveUninitialized:true
}));


app.use(function (req, res, next) {
  if (!req.session.likes) {
    req.session.likes = {}
  }

  // // get the url pathname
  // var pathname = parseurl(req).pathname

  // // count the views
  // req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

  next()
})


app.use('/', index);
app.use('/collections', collections);
app.use('/kit', kit);
app.use('/player', player);
app.use('/color', color);
app.use('/contact', contact);
app.use('/admin', admin);
app.use('/login', login);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);

  res.render('404.html', {
    title: 'No Found'
  })
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

// app.get('/', function (req, res) {
//     res.sendfile('app/index.html');
// });

module.exports = app;
