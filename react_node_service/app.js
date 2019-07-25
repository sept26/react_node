var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/recruiment-datas'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
  console.log('mongodb connect success')
})
var index = require('./routes/index')
var users = require('./routes/users')
var app = express()

//  设置跨域访问
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*')
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, OPTIONS")
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)

app.use((req, res, next) => {
  var error = new Error('Not Fount')
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500) 
  res.render('error')
})

module.exports = app