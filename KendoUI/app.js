var http = require('http');

var nStatic = require('node-static');

var fileServer = new nStatic.Server('./public');

http.createServer(function (req, res) {
    fileServer.serve(req, res);
}).listen(3000, ()=>{
  console.log("Running in localhost at port 3000");
});
