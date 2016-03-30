var express = require('express');
var router = express.Router();

var Gpio = require('onoff').Gpio,
  greenLed = new Gpio(17, 'out'),
  blueLed = new Gpio(18, 'out');
  // button = new Gpio(4, 'in', 'both');

/* GET home page. */
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
module.exports = router;
