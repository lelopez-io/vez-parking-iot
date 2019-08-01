"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IoTDevice_1 = require("../SharedCode/IoTDevice");
var iotDevice = new IoTDevice_1.IoTDevice;
// Get device to start reporting data to the cloud every 10 seconds
iotDevice.Run();
// Have the app sample from the sensors every 2 seconds
setInterval(function () {
    iotDevice.SetEventData();
}, 2000);
//# sourceMappingURL=index.js.map