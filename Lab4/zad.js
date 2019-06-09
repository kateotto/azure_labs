var Gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'out');
var MOTION = new Gpio(17, 'in', 'both');

MOTION.watch(function (error, value) {
    if (value === 0) {
        LED.writeSync(0)
    }
    else {
        LED.writeSync(1)
    }
});