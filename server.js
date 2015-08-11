var http = require('http');


var sensors = [];
http.createServer(function(req,res){
  var data = ''
  req.on('data',function(chunk){
    data += chunk;
    var obj = JSON.parse(data);
    console.log(obj.sensor + ": " + obj.value);
  });
  console.log("body: "+req.body);
  console.log("data: ");
  req.on('end',function(){
    console.log('ended. data: '+data);
  });
}).listen(3000,'192.168.1.1');
