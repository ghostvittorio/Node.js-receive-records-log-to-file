const fs = require('fs');
var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//write file port 3000
app.post('/data', function (req, res) {
  console.log(req.body);
  var param1 = req.body.param1,
        param2 = req.body.param2;
  fs.appendFile('CATIASTATUS.txt', param1 + ',' + param2 + '\n')
  res.end();
});

//display file port 4000
var server = http.createServer(function (req, res) {
  fs.readFile('CATIASTATUS.txt', function readData(err, data) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(data);
  })
}).listen(4000);

app.listen(3000);
