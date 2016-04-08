var Gpio = require('onoff').Gpio;

function Led(pin_id) {
  return {
    gpio: function() { return new Gpio(pin_id, 'out') },
    
    status: function() {
      this.gpio().readSync();
    },
    on: function() {
      this.gpio().writeSync(1);
    },

    off: function() {
      this.gpio().writeSync(0);
    },

    blink: function() {
      console.log("O.O");
      console.log("-.-");
    },

    toggle: function() {
      console.log("**** Everyday I'm toggling! ****");
      ledStatus = this.status();
      ledStatus = -(ledStatus-1)
      led.gpio().writeSync(ledStatus);
      return ledStatus;
    }
  };
};

module.exports = Led;