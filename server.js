var http = require('http');
var gpio = require('pi-gpio');

var controls = [];
var controls = function( name, pin ) {
  this.name = name;
  this.pin = pin;
  controls.append(this);
  this.setup = function(){
    //set up the pin
    gpio.open(pin, "output", function(err) {
      gpio.write(pin, 1, function(){
        gpio.close(pin);
      });
    });
  };
  this.stop = function(){
    gpio.open(pin, "output", function(err) {
      gpio.write(pin, 0, function(){
        gpio.close(pin);
      }); 
    });
  };
};

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
