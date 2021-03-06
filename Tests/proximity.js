let SPOT_NO_DATA = -1
let SPOT_FREE = 0
let SPOT_OCCUPIED = 1
let SPOT_TRANSIENT = 2

let sensorData = {
  'Group_H': {
    'spot_62': {
      'status': SPOT_NO_DATA,
      'cm_val': SPOT_NO_DATA
    },
    'spot_61': {
      'status': SPOT_NO_DATA,
      'cm_val': SPOT_NO_DATA
    },
    'spot_60': {
      'status': SPOT_NO_DATA,
      'cm_val': SPOT_NO_DATA
    },
    'spot_59': {
      'status': SPOT_NO_DATA,
      'cm_val': SPOT_NO_DATA
    },
    'spot_58': {
      'status': SPOT_NO_DATA,
      'cm_val': SPOT_NO_DATA
    }
  }
}



if(process.env.HOST_ENV == 'EDGE') {
  console.log('Setting up board for EDGE')
  const five = require('johnny-five');
  const piIO = require('pi-io');
  const board = new five.Board({
    io: new piIO()
  });
  
  board.on('ready', () => {
    const sensor1 = new five.Proximity({
      controller: piIO.HCSR04,
      triggerPin: 'P1-12',
      echoPin: 'P1-18'
    });
  
  
    sensor1.on("data", function() {
      sensorData.Group_H.spot_62.cm_val = this.cm
      if(this.cm > 70 || this.cm == 0) {
        sensorData.Group_H.spot_62.status = SPOT_FREE
      } else {
        sensorData.Group_H.spot_62.status = SPOT_OCCUPIED
      }
    });
  
  });
};

setInterval(() => {
    console.log(sensorData)
}, 2000);

