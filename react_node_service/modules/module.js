const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/recruiment-datas'
mongoose.connect(DB_URL)
const models = {
  users: {
    'user': {type: String, require: true},
    'pwd': {type: String, require: true},
    'type': {type: String, require: true},
    'avatar': String,
    'desc': String,
    'title': String,
    'company': String,
    'money': String
  },
  chat: {
    'chatid': {type: String, require: true},
    'from': {type: String, require: true},
    'to': {type: String, require: true},
    'read': {type: String, require: true},
    'content': {type: String, require: true, default: ''},
    'create_time': {type: Number, default: Date.now}
  }
}

for(let i in models) {
  mongoose.model(i, new mongoose.Schema(models[i]))
}

module.exports = {
  getModel(name) {
    return mongoose.model(name)
  }
}