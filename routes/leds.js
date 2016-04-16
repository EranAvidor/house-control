var express = require('express');
var router = express.Router();

var Led = require('../app/led');

var greenLed = new Led(17, 'green');
var blueLed = new Led(18, 'blue');
var redLed = new Led(27, 'red');
var leds = {'green': greenLed, 'blue': blueLed, 'red': redLed}

router.get('/', function(req, res, next) {
  var status = {};

  for(var led_name in leds) {
    status[led_name] = leds[led_name].readSync();
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(status));
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id
  var status = leds[id].readSync();

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({'name': id, 'status': status}));
});

router.get('/meital', function(req, res, next) {
  leds['green'].writeSync(1);
  leds['blue'].writeSync(1);
  leds['red'].writeSync(1);
  res.send('eran');
});

router.post('/:id/on', function(req, res, next) {
  var id = req.params.id
  leds[id].on();

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({'name': id, 'status': 1}));
});

router.post('/:id/off', function(req, res, next) {
  var id = req.params.id
  leds[id].off();

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({'name': id, 'status': 0}));
});

router.get('/:id/toggle', function(req, res, next) {
  var id = req.params.id;
  var led = leds[id];

  var ledStatus = 'unknown led';
  if (!(typeof(led) == 'undefined'))   {
    ledStatus = led.toggle();
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({'name': id, 'status': ledStatus}));
});

router.get('/blink', function(req, res, next) {
  (function blink(count) {
    if (count <= 0) {
      return true;
    }

    leds['green'].gpio.read(function (err, value) { // Asynchronous read.
      leds['green'].gpio.write(value ^ 1);// Asynchronous write.
    });

    setTimeout(function () {
      blink(count - 1);
    }, 200);
  }(50));

  (function blink(count) {
    if (count <= 0) {
      return true;
    }

    leds['red'].gpio.read(function (err, value) { // Asynchronous read.
      leds['red'].gpio.write(value ^ 1);// Asynchronous write.
    });

    setTimeout(function () {
      blink(count - 1);
    }, 500);
  }(20));

  (function blink(count) {
    if (count <= 0) {
      return true;
    }

    leds['blue'].gpio.read(function (err, value) { // Asynchronous read.
      leds['blue'].gpio.write(value ^ 1);// Asynchronous write.
    });

    setTimeout(function () {
      blink(count - 1);
    }, 400);
  }(25));
  res.send('okay');
});
module.exports = router;
