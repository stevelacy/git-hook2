var http = require('http');
var querystring = require('querystring');
var exec = require('child_process').exec;

var config = {
  port: 3000,
  repo: 'git@github.com:stevelacy/git-hook2.git'
};
var port = 3000;



var start = function(){
  var cmd = 'pm2 restart 0';
  exec(cmd, function(err, stdout, stderr){
    if (err){
      // cry

    }
  });
};


var server = http.createServer(function(req, res) {
  var data = '';
  if (req.method === 'POST') {
    req.on('data', function(chunk) {
      data += chunk;
    });
  }

  req.on('end', function() {
    if (/^payload=/.test(data)) {
      var payload = JSON.parse(querystring.unescape(data.slice(8)));
      if (payload.repository && payload.repository.ssh_url) {
        if (payload.repository.ssh_url == config.repo){
          var cmd = 'git pull origin master';
          exec(cmd, function(err, stdout, stderr){
            console.log(err, stdout, stderr);
            start();
          });
        }
      }

      res.writeHead(200, {
        'Content-type': 'text/html'
      });
    }
    return res.end();
  });

});

server.listen(config.port);
