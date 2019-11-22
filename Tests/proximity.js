const five = require('johnny-five');
const piIO = require('pi-io');

// GPIO18 --> P1-12
// GPIO24 --> P1-18

const board = new five.Board({
  io: new piIO()
});

board.on('ready', () => {
  const proximity = new five.Proximity({
    controller: piIO.HCSR04,
    triggerPin: 'P1-12',
    echoPin: 'P1-18'
  });


  proximity.on("change", function() {
    console.log("cm: ", this.cm);
  });

});
