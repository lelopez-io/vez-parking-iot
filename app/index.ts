import { IoTDevice } from "../SharedCode/IoTDevice";

let iotDevice = new IoTDevice;

// Get device to start reporting data to the cloud every 10 seconds
iotDevice.Run();

// Have the app sample from the sensors every 2 seconds
setInterval(() => {

  iotDevice.SetEventData();

  
}, 2000);

