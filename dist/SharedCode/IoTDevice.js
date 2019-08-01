"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var azure_iot_device_1 = require("azure-iot-device");
var azure_iot_device_2 = require("azure-iot-device");
var azure_iot_device_mqtt_1 = require("azure-iot-device-mqtt");
var azure_iot_device_3 = require("azure-iot-device");
var IoTDevice = /** @class */ (function () {
    function IoTDevice() {
        console.log("Creating a new IoT Device");
        IoTDevice.connectionString = process.env.CONNECTION_STRING;
        IoTDevice.deviceId = azure_iot_device_2.ConnectionString.parse(IoTDevice.connectionString).DeviceId;
        console.log("ConnectionString points to DeviceID: \"" + IoTDevice.deviceId + "\"");
        IoTDevice.client = azure_iot_device_1.Client.fromConnectionString(IoTDevice.connectionString, azure_iot_device_mqtt_1.Mqtt);
    }
    IoTDevice.prototype.Run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var temperature, humidity, externalTemperature, sendInterval_1;
            return __generator(this, function (_a) {
                temperature = 50;
                humidity = 50;
                externalTemperature = 55;
                try {
                    IoTDevice.client.open();
                    console.log('Sending device metadata:\n' + JSON.stringify(IoTDevice.deviceMetaData));
                    IoTDevice.client.on('message', function (msg) {
                        console.log("recieve data: " + msg.getData());
                    });
                    sendInterval_1 = setInterval(function () {
                        temperature += IoTDevice.generateRandomIncrement();
                        externalTemperature += IoTDevice.generateRandomIncrement();
                        humidity += IoTDevice.generateRandomIncrement();
                        var data = JSON.stringify({
                            'DeviceID': IoTDevice.deviceId,
                            'Temperature': temperature,
                            'Humidity': humidity,
                            'ExternalTemperature': externalTemperature
                        });
                        console.log('Sending device event data:\n' + data);
                        IoTDevice.client.sendEvent(new azure_iot_device_3.Message(data), IoTDevice.printErrorFor('send event'));
                    }, 10000);
                    IoTDevice.client.on('error', function (err) {
                        IoTDevice.printErrorFor('client')(err);
                        if (sendInterval_1)
                            clearInterval(sendInterval_1);
                        IoTDevice.client.close(IoTDevice.printErrorFor('client.close'));
                    });
                }
                catch (err) {
                    IoTDevice.printErrorFor('open')(err);
                }
                return [2 /*return*/];
            });
        });
    };
    // Helper function to print results for an operation
    IoTDevice.printErrorFor = function (op) {
        return function printError(err) {
            if (err)
                console.log(op + ' error: ' + err.toString());
        };
    };
    // Helper function to generate random number between min and max
    IoTDevice.generateRandomIncrement = function () {
        return ((Math.random() * 2) - 1);
    };
    IoTDevice.deviceMetaData = {
        'ObjectType': 'DeviceInfo',
        'IsSimulatedDevice': 0,
        'Version': '1.0',
        'DeviceProperties': {
            'DeviceID': IoTDevice.deviceId,
            'HubEnabledState': 1,
            'CreatedTime': '2015-09-21T20:28:55.5448990Z',
            'DeviceState': 'normal',
            'UpdatedTime': null,
            'Manufacturer': 'Contoso Inc.',
            'ModelNumber': 'MD-909',
            'SerialNumber': 'SER9090',
            'FirmwareVersion': '1.10',
            'Platform': 'node.js',
            'Processor': 'ARM',
            'InstalledRAM': '64 MB',
            'Latitude': 47.617025,
            'Longitude': -122.191285
        },
        'Commands': [{
                'Name': 'SetTemperature',
                'Parameters': [{
                        'Name': 'Temperature',
                        'Type': 'double'
                    }]
            },
            {
                'Name': 'SetHumidity',
                'Parameters': [{
                        'Name': 'Humidity',
                        'Type': 'double'
                    }]
            }]
    };
    return IoTDevice;
}());
exports.IoTDevice = IoTDevice;
//# sourceMappingURL=IoTDevice.js.map