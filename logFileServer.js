// Simple server for serving static log files
var port = process.env.PORT || 8000;

var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.static('logs', {
  setHeaders: function(res){
    res.setHeader('Content-Type', 'text/html');
  }
}));

app.get('/', function(req, res, next) {
  fs.readdir('./logs', function(err, files) {
    if (err) {
      console.log("Error reading log dir.");
      res.send("Error reading log dir.");
    } else {
      var html = '<ul>'
      files.forEach(function(file, i, arr) {
        html += '<li><a href="/' + file + '">' + file + '</a></li>';
      });
      html += '</ul';
      res.send(html);
    }
  });
});

app.listen(port, function() {
  console.log("Serving log files on port ", port);
});;