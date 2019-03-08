const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const router       = require('./routes/auth')
const bcrypt       = require('bcryptjs')
const session      = require("express-session");
const MongoStore   = require("connect-mongo")(session);
const app = express();
require('dotenv').config()


mongoose.connect((process.env.MONGODB_URI),  { useNewUrlParser: true })
.then(x => {console.log(`connected, DB name: '${x.connections[0].name}'`)})
.catch(e => { console.log('connection error to Mongo', e)})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// default value for title local
app.locals.title = "IronChristie's";

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 600000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

const index = require('./routes/index');

// app.use("*", (req, res, next)=> {
//   if(req.cookies)
// })
app.use('/', index);
app.use('/', router)
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/site-routes'));
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

//app.listen(3000, ()=> {console.log("ceci, c'est ne pas un server")})
