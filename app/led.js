"use strict";

var Gpio = require('onoff').Gpio;

function Led(pinId, ledColor) {
  this.gpio = new Gpio(pinId, 'out');
  // TODO: add validation, successful creation
  this.pin = pinId;
  this.color = ledColor;
};

Led.prototype.readSync = function() {
  return this.gpio.readSync();
};

Led.prototype.writeSync = function(status) {
  // TODO: add value validation
  this.gpio.writeSync(status);
};

Led.prototype.on = function() {
  this.writeSync(1);
};

Led.prototype.off = function() {
  this.writeSync(0);
};

Led.prototype.toggle = function() {
  var ledStatus = this.readSync();
  ledStatus = -(ledStatus-1);
  this.writeSync(ledStatus);
  return ledStatus;
};

Led.prototype.blink = function(waitTime, times) {
  console.log("O.O");
  console.log("-.-");
};

module.exports = Led;
