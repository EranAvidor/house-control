var express = require('express');
var router = express.Router();

var Gpio = require('onoff').Gpio;
var greenLed = new Gpio(17, 'out');
var blueLed = new Gpio(18, 'out');
var redLed = new Gpio(27, 'out');

  // button = new Gpio(4, 'in', 'both');

/* GET home page. */

router.get('/visual', function(req, res, next) {
  res.render('leds');
});

router.get('/meital', function(req, res, next) {
  greenLed.writeSync(1);
  blueLed.writeSync(1);
  redLed.writeSync(1);
  res.send('eran');
});

router.get('/on', function(req, res, next) {
  greenLed.writeSync(1);
  res.send('okay');
});

router.get('/off', function(req, res, next) {
  greenLed.writeSync(0);
  res.send('okay');
});

router.get('/:id/toggle', function(req, res, next) {
  var color = req.params.id;
  console.log(color + 'Led is toggeling');
  //TODO: create method getLedVariableByColor, should return (err, ledVariable)
  led = global[color+'Led'];

  var ledStatus = 'does not exist'
  if (!(typeof(led) == 'undefined'))   {
    ledStatus = led.readSync();
    ledStatus = -(ledStatus-1)
    led.writeSync(ledStatus);
  }
  res.send(color + 'LED is now: ' + ledStatus);
});

router.get('/blink', function(req, res, next) {
  (function blink(count) {
    if (count <= 0) {
      return true;
    }

    greenLed.read(function (err, value) { // Asynchronous read.
      greenLed.write(value ^ 1);// Asynchronous write.
    });

    setTimeout(function () {
      blink(count - 1);
    }, 200);
  }(50));

  (function blink(count) {
    if (count <= 0) {
      return true;
    }

    redLed.read(function (err, value) { // Asynchronous read.
      redLed.write(value ^ 1);// Asynchronous write.
    });

    setTimeout(function () {
      blink(count - 1);
    }, 500);
  }(20));

  (function blink(count) {
    if (count <= 0) {
      return true;
    }

    blueLed.read(function (err, value) { // Asynchronous read.
      blueLed.write(value ^ 1);// Asynchronous write.
    });

    setTimeout(function () {
      blink(count - 1);
    }, 400);
  }(25));
  res.send('okay');
});
module.exports = router;