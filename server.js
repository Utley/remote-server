var http = require('http');


var sensors = [];
http.createServer(function(req,res){
  var data = ''
  req.on('data',function(chunk){
    data += chunk;
    var obj = data.split(':');
    console.log(obj[0]+': '+obj[1]);
  });
  console.log("body: "+req.body);
  console.log("data: ");
  req.on('end',function(){
    console.log('ended. data: '+data);
  });
}).listen(3000,'raspberrypi.home');
