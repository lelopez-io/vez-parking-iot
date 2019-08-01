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
      console.log('Sending device metadata:\n' + JSON.stringify(IoTDevice.metaData));

      IoTDevice.client.on('message', (msg) => {
        console.log(`recieve data: ${msg.getData()}`);
      })

      let sendInterval = setInterval(() => {

        let data = JSON.stringify({
          'DeviceID': IoTDevice.deviceId,
          'Temperature': IoTDevice.eventData.temperature,
          'Humidity': IoTDevice.eventData.humidity,
          'ExternalTemperature': IoTDevice.eventData.externalTemperature
        });

        console.log('Sending device event data:\n' + data);
        IoTDevice.client.sendEvent(new Message(data), IoTDevice.printErrorFor('send event'));
      }, 10000);

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

  SetEventData() {
    IoTDevice.eventData.temperature += IoTDevice.generateRandomIncrement();
    IoTDevice.eventData.externalTemperature += IoTDevice.generateRandomIncrement();
    IoTDevice.eventData.humidity += IoTDevice.generateRandomIncrement();

    console.log(IoTDevice.eventData.temperature);
    console.log(IoTDevice.eventData.externalTemperature);
    console.log(IoTDevice.eventData.humidity);
  }

}