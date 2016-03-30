var express = require('express');
var router = express.Router();

var Gpio = require('onoff').Gpio,
  greenLed = new Gpio(17, 'out'),
  blueLed = new Gpio(18, 'out');
  // button = new Gpio(4, 'in', 'both');

/* GET home page. */
router.get('/meital', function(req, res, next) {
	res.send('sam');
});

router.get('/on', function(req, res, next) {
  greenLed.writeSync(1);
  res.send('okay');
});

router.get('/off', function(req, res, next) {
  greenLed.writeSync(0);
  res.send('okay');
});

router.get('/toggle', function(req, res, next) {
  var ledStatus = greenLed.readSync();
  ledStatus = -(ledStatus-1)
  greenLed.writeSync(ledStatus);
  res.send('okay');
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