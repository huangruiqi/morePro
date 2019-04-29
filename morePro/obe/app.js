var express = require("express") ;
//使用body-parse获取前端传过来的数据。
var bodyParser = require('body-parser');
var formidable = require("formidable");
var mongoose = require("mongoose");
var url = require("url");
var path = require("path");
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const ejs = require('ejs')
const config = require('./config/default.js')
const app = express();
const routes = require('./routes');

mongoose.connect(config.mongodb, (err) => {
  if(err){
      console.log('数据库连接错误了');
  }else{
      console.log('数据库连接成功了');
      app.listen();
  }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.json())
// parse application/json
app.use(bodyParser.urlencoded({ extended: true }))

// 设置模版
app.engine('html', ejs.__express)
app.set('view engine', 'html')
app.use(express.static('public'))
app.use(express.static('fe/public'))

// app.use(cookieParser())
app.set('trust proxy', 1)
app.use(session({
  secret: 'obe',
  name: 'sessionId',
  store: new MongoStore({
    url: config.mongodb
  }),
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 60 * 1000000000
  },
  resave: false,
  saveUninitialized: true,
}))
routes(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(3000,function(){
	console.log("run at 3000")
});