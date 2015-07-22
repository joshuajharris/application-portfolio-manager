var restify = require('restify'),
    fs = require('fs');

var controllers = {},
    controllers_path = process.cwd() + '/app/controllers';
fs.readdirSync(controllers_path).forEach(function(file){
  if(/.*(.js)$/.test(file)) {
    controllers[file.split('.')[0]] = require(controllers_path + '/' + file);
  }
});

var server = restify.createServer();

server
  .use(restify.fullResponse())
  .use(restify.bodyParser());

server.get('/', controllers.test.home);

var port = process.env.PORT || 3000;
server.listen(port, function(err) {
  if(err) {
    console.error(err);
  } else {
    console.log("Server listening on port 3000");
  }
});
