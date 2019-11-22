import { IoTDevice } from "../SharedCode/IoTDevice";
const five = require('johnny-five');
const piIO = require('pi-io');


let sensor1 

if(process.env.HOST_ENV == 'EDGE') {
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
      sensor1 = this.cm
      console.log("cm: ", sensor1);
    });
  
  });
};

let iotDevice = new IoTDevice;

// Get device to start reporting data to the cloud every 10 seconds
iotDevice.Run();

// Have the app sample from the sensors every 2 seconds
setInterval(() => {


  iotDevice.SetEventData();

  
}, 2000);

