const five = require('johnny-five');
const piIO = require('pi-io');

const board = new five.Board({
  io: new piIO()
});

board.on('ready', () => {
  const proximity = new five.Proximity({
    controller: piIO.HCSR04,
    triggerPin: 'GPIO18',
    echoPin: 'GPIO24'
  });


  proximity.on("change", function() {
    console.log("cm: ", this.cm);
  });

});
