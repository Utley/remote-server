var http = require('http');
var piblaster = require('pi-blaster.js');
var controls = [];
var Control = function( name, pin ) {
  this.name = name;
  this.pin = pin;
  this.on = false;
  controls.push(this);
  this.set = function(err, brightness){
      console.log(err);
      piblaster.setPwm(17, brightness / 100);
  };
};

http.createServer(function(req,res){
  var data = ''
  var a = new Control("Control 1",12);
  req.on('data',function(chunk){
    data += chunk;
    var obj = data.split(':');
    console.log(obj[0]+': '+obj[1]);
    a.set(null,Number(obj[1])); 
  });
  console.log("body: "+req.body);
  console.log("data: ");
  req.on('end',function(){
    console.log('ended. data: '+data);
  });
}).listen(3000,'raspberrypi.home');
