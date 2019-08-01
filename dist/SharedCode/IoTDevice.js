"use strict";
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
        try {
            IoTDevice.client.open();
            console.log('Sending device metadata:\n' + JSON.stringify(IoTDevice.metaData));
            IoTDevice.client.on('message', function (msg) {
                console.log("recieve data: " + msg.getData());
            });
            var sendInterval_1 = setInterval(function () {
                var data = JSON.stringify({
                    'DeviceID': IoTDevice.deviceId,
                    'Temperature': IoTDevice.eventData.temperature,
                    'Humidity': IoTDevice.eventData.humidity,
                    'ExternalTemperature': IoTDevice.eventData.externalTemperature
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
    IoTDevice.prototype.SetEventData = function () {
        IoTDevice.eventData.temperature += IoTDevice.generateRandomIncrement();
        IoTDevice.eventData.externalTemperature += IoTDevice.generateRandomIncrement();
        IoTDevice.eventData.humidity += IoTDevice.generateRandomIncrement();
        console.log(IoTDevice.eventData.temperature);
        console.log(IoTDevice.eventData.externalTemperature);
        console.log(IoTDevice.eventData.humidity);
    };
    IoTDevice.metaData = {
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
    IoTDevice.eventData = {
        'temperature': 50,
        'humidity': 50,
        'externalTemperature': 55
    };
    return IoTDevice;
}());
exports.IoTDevice = IoTDevice;
//# sourceMappingURL=IoTDevice.js.map