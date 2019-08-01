const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');
const board = new five.Board({
  io: new Raspi()
});

board.on('ready', () => {
  // Create an Led on pin 7 (GPIO4) on P1 and strobe it on/off
  // Optionally set the speed; defaults to 100ms
  
  const led = new five.Led('P1-7');
  led.strobe(100);
});