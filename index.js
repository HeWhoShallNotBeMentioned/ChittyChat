const http = require('http');
const fs = require('fs');
const extract = require('./extract');
const wss = require('./websockets-server');

var handleError = function (err, res) {
  res.write('The page you are looking for is not found. Try going to localhost:3000');
  // res.writeContinue(404);
  res.end();
};

var server = http.createServer(function (req, res) {
  console.log('Responding to a request');

  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data){
    if (err) {
      handleError(err, res);
      return;
    } else {
        res.end(data);
      }
  });
});
server.listen(3000);
