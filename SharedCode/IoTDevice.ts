import { Client } from "azure-iot-device";
import { ConnectionString } from "azure-iot-device";
import { Mqtt } from "azure-iot-device-mqtt";
import { Message } from "azure-iot-device";

export class IoTDevice {
  private static deviceId: string;
  private static client: Client;
  private static connectionString: string;
  private static message: Message;

  private static metaData = {
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

  // TODO: better format these fields for how we'll be reporting zones
  private static eventData = {
    'temperature': 50,
    'humidity': 50,
    'externalTemperature': 55
  }

  constructor() {
    console.log("Creating a new IoT Device");
    IoTDevice.connectionString = process.env.CONNECTION_STRING;
    IoTDevice.deviceId = ConnectionString.parse(IoTDevice.connectionString).DeviceId;
    console.log(`ConnectionString points to DeviceID: "${IoTDevice.deviceId}"`);
    IoTDevice.client = Client.fromConnectionString(IoTDevice.connectionString, Mqtt);
  }

  Run() {


    try {
      IoTDevice.client.open();
      // First message will send Device Metadata
      console.log('Sending device metadata:\n' + JSON.stringify(IoTDevice.metaData));
      IoTDevice.client.sendEvent(new Message(JSON.stringify(IoTDevice.metaData)), IoTDevice.printErrorFor('send metadata'));

      // This is for device methods if we choose to use them
      IoTDevice.client.on('message', (msg) => {
        console.log(`recieve data: ${msg.getData()}`);
      })

      // This executes at a set interval - 10s seems good for cloud uploads
      let sendInterval = setInterval(() => {

        // TODO: this should look more like the call above where we strigify the entire metaData object
        let data = JSON.stringify({
          'DeviceID': IoTDevice.deviceId,
          'Temperature': IoTDevice.eventData.temperature,
          'Humidity': IoTDevice.eventData.humidity,
          'ExternalTemperature': IoTDevice.eventData.externalTemperature
        });
        console.log('Sending device event data:\n' + data);
        IoTDevice.client.sendEvent(new Message(data), IoTDevice.printErrorFor('send event'));
      }, 10000);

      // Incase there is a client error this will report at what interval it happened.
      IoTDevice.client.on('error', (err) => {
        IoTDevice.printErrorFor('client')(err);
        if (sendInterval) clearInterval(sendInterval);
        IoTDevice.client.close(IoTDevice.printErrorFor('client.close'));
      });
    }
    catch (err) {
      IoTDevice.printErrorFor('open')(err);
    }
  }

  // Helper function to print results for an operation
  private static printErrorFor(op) {
  return function printError(err) {
      if (err) console.log(op + ' error: ' + err.toString());
    };
  }

  // Helper function to generate random number between min and max
  private static generateRandomIncrement() {
    return ((Math.random() * 2) - 1);
  }

  // I want eventData object to be generic, perhaps the structur can be passed when constructed
  // so this way the SetEventData will only accept that type of object
  SetEventData() {
    IoTDevice.eventData.temperature += IoTDevice.generateRandomIncrement();
    IoTDevice.eventData.externalTemperature += IoTDevice.generateRandomIncrement();
    IoTDevice.eventData.humidity += IoTDevice.generateRandomIncrement();

    console.log(IoTDevice.eventData.temperature);
    console.log(IoTDevice.eventData.externalTemperature);
    console.log(IoTDevice.eventData.humidity);
  }

}