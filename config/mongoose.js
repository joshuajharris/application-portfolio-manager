var mongoose = require('mongoose'),
    config = require(process.cwd() + '/config.js'),
    fs = require('fs'),
    models_path = process.cwd() + '/app/models'

//mongoose.connect(process.env.MONGO_URL, {server:{auto_reconnect:true}});
mongoose.connect(config.mongo.uri, {server:{auto_reconnect:true}});
var db = mongoose.connection;

db.on('error', function (err) {
    console.error('MongoDB connection error:', err);
});
db.once('open', function callback() {
    console.info('MongoDB connection is established');
});
db.on('disconnected', function() {
    console.error('MongoDB disconnected!');
    mongoose.connect(process.env.MONGO_URL, {server:{auto_reconnect:true}});
});
db.on('reconnected', function () {
    console.info('MongoDB reconnected!');
});

// load all models from app/models
fs.readdirSync(models_path).forEach(function (file) {
  if(/.*(.js)$/.test(file)) {
    require(models_path + '/' + file)
  }
});

