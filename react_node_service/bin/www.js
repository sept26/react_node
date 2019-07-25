var app = require('../app')
var debug = require('debug')('server:server')
var http = require('http')
var model = require('../modules/module')
var Chat = model.getModel('chat')

var port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

var server = http.Server(app)
const io = require('socket.io')(server)
io.on('connection', (socket) => {
  socket.on('sendmsg', (data) => {
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_');
    if(to){
      Chat.create({chatid, from, to, content:msg}, (err, doc) => {
        io.emit('receivemsg',Object.assign({},doc._doc))
      })
    }
  })
})

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}