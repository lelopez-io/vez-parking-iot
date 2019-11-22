import { Client } from "azure-iot-device";
import { ConnectionString } from "azure-iot-device";
import { Mqtt } from "azure-iot-device-mqtt";
import { Message } from "azure-iot-device";

export class IoTDevice {
  private static deviceId: string;
  private static client: Client;
  private static connectionString: string;
  private static message: Message;

  // TODO: Fill out the correct info for pi metadata
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
    }
  };

  // TODO: better format these fields for how we'll be reporting zones
  private static eventData = {
    'Group_A': {
      'spot_0': {
        'status':  -1
      },
      'spot_1': {
        'status':  -1
      },
      'spot_2': {
        'status':  -1
      },
      'spot_3': {
        'status':  -1
      },
      'spot_4': {
        'status':  -1
      },
      'spot_5': {
        'status':  -1
      },
      'spot_6': {
        'status':  -1
      },
      'spot_7': {
        'status':  -1
      },
      'spot_8': {
        'status':  -1
      },
      'spot_9': {
        'status':  -1
      },
      'spot_10': {
        'status':  -1
      },
      'spot_11': {
        'status':  -1
      },
      'spot_12': {
        'status':  -1
      },
      'spot_13': {
        'status':  -1
      },
      'spot_14': {
        'status':  -1
      },
      'spot_15': {
        'status':  -1
      },
      'spot_16': {
        'status':  -1
      },
      'spot_17': {
        'status':  -1
      },
      'spot_18': {
        'status':  -1
      },
      'spot_19': {
        'status':  -1
      },
      'spot_20': {
        'status':  -1
      },
      'spot_21': {
        'status':  -1
      },
      'spot_22': {
        'status':  -1
      },
      'spot_23': {
        'status':  -1
      },
      'spot_24': {
        'status':  -1
      },
      'spot_25': {
        'status':  -1
      },
      'spot_26': {
        'status':  -1
      },
      'spot_27': {
        'status':  -1
      },
      'spot_28': {
        'status':  -1
      },
      'spot_29': {
        'status':  -1
      },
      'spot_30': {
        'status':  -1
      },
      'spot_31': {
        'status':  -1
      },
      'spot_32': {
        'status':  -1
      },
      'spot_33': {
        'status':  -1
      },
      'spot_34': {
        'status':  -1
      },
      'spot_35': {
        'status':  -1
      },
      'spot_36': {
        'status':  -1
      },
      'spot_37': {
        'status':  -1
      },
      'spot_38': {
        'status':  -1
      },
      'spot_39': {
        'status':  -1
      },
      'spot_40': {
        'status':  -1
      },
      'spot_41': {
        'status':  -1
      },
      'spot_42': {
        'status':  -1
      },
      'spot_43': {
        'status':  -1
      },
      'spot_44': {
        'status':  -1
      },
      'spot_45': {
        'status':  -1
      },
      'spot_46': {
        'status':  -1
      },
      'spot_47': {
        'status':  -1
      },
      'spot_48': {
        'status':  -1
      },
      'spot_49': {
        'status':  -1
      },
      'spot_50': {
        'status':  -1
      },
      'spot_51': {
        'status':  -1
      },
      'spot_52': {
        'status':  -1
      },
      'spot_53': {
        'status':  -1
      },
      'spot_54': {
        'status':  -1
      },
      'spot_55': {
        'status':  -1
      },
      'spot_56': {
        'status':  -1
      },
      'spot_57': {
        'status':  -1
      },
      'spot_58': {
        'status':  -1
      },
      'spot_59': {
        'status':  -1
      },
      'spot_60': {
        'status':  -1
      },
      'spot_61': {
        'status':  -1
      },
      'spot_62': {
        'status':  -1
      },
      'spot_63': {
        'status':  -1
      },
      'spot_64': {
        'status':  -1
      },
      'spot_65': {
        'status':  -1
      },
      'spot_66': {
        'status':  -1
      },
      'spot_67': {
        'status':  -1
      },
      'spot_68': {
        'status':  -1
      },
      'spot_69': {
        'status':  -1
      },
      'spot_70': {
        'status':  -1
      },
      'spot_71': {
        'status':  -1
      },
      'spot_72': {
        'status':  -1
      },
      'spot_73': {
        'status':  -1
      },
      'spot_74': {
        'status':  -1
      },
      'spot_75': {
        'status':  -1
      },
      'spot_76': {
        'status':  -1
      },
      'spot_77': {
        'status':  -1
      },
      'spot_78': {
        'status':  -1
      },
      'spot_79': {
        'status':  -1
      }
    },
    'Group_B': {
      'spot_0': {
        'status':  -1
      },
      'spot_1': {
        'status':  -1
      },
      'spot_2': {
        'status':  -1
      },
      'spot_3': {
        'status':  -1
      },
      'spot_4': {
        'status':  -1
      },
      'spot_5': {
        'status':  -1
      },
      'spot_6': {
        'status':  -1
      },
      'spot_7': {
        'status':  -1
      },
      'spot_8': {
        'status':  -1
      },
      'spot_9': {
        'status':  -1
      },
      'spot_10': {
        'status':  -1
      },
      'spot_11': {
        'status':  -1
      },
      'spot_12': {
        'status':  -1
      },
      'spot_13': {
        'status':  -1
      },
      'spot_14': {
        'status':  -1
      },
      'spot_15': {
        'status':  -1
      },
      'spot_16': {
        'status':  -1
      },
      'spot_17': {
        'status':  -1
      },
      'spot_18': {
        'status':  -1
      },
      'spot_19': {
        'status':  -1
      },
      'spot_20': {
        'status':  -1
      },
      'spot_21': {
        'status':  -1
      },
      'spot_22': {
        'status':  -1
      },
      'spot_23': {
        'status':  -1
      },
      'spot_24': {
        'status':  -1
      },
      'spot_25': {
        'status':  -1
      },
      'spot_26': {
        'status':  -1
      },
      'spot_27': {
        'status':  -1
      },
      'spot_28': {
        'status':  -1
      },
      'spot_29': {
        'status':  -1
      },
      'spot_30': {
        'status':  -1
      },
      'spot_31': {
        'status':  -1
      },
      'spot_32': {
        'status':  -1
      },
      'spot_33': {
        'status':  -1
      },
      'spot_34': {
        'status':  -1
      },
      'spot_35': {
        'status':  -1
      },
      'spot_36': {
        'status':  -1
      },
      'spot_37': {
        'status':  -1
      },
      'spot_38': {
        'status':  -1
      },
      'spot_39': {
        'status':  -1
      },
      'spot_40': {
        'status':  -1
      },
      'spot_41': {
        'status':  -1
      },
      'spot_42': {
        'status':  -1
      },
      'spot_43': {
        'status':  -1
      },
      'spot_44': {
        'status':  -1
      },
      'spot_45': {
        'status':  -1
      },
      'spot_46': {
        'status':  -1
      },
      'spot_47': {
        'status':  -1
      },
      'spot_48': {
        'status':  -1
      },
      'spot_49': {
        'status':  -1
      },
      'spot_50': {
        'status':  -1
      },
      'spot_51': {
        'status':  -1
      },
      'spot_52': {
        'status':  -1
      },
      'spot_53': {
        'status':  -1
      },
      'spot_54': {
        'status':  -1
      },
      'spot_55': {
        'status':  -1
      },
      'spot_56': {
        'status':  -1
      },
      'spot_57': {
        'status':  -1
      },
      'spot_58': {
        'status':  -1
      },
      'spot_59': {
        'status':  -1
      },
      'spot_60': {
        'status':  -1
      },
      'spot_61': {
        'status':  -1
      },
      'spot_62': {
        'status':  -1
      },
      'spot_63': {
        'status':  -1
      },
      'spot_64': {
        'status':  -1
      },
      'spot_65': {
        'status':  -1
      },
      'spot_66': {
        'status':  -1
      },
      'spot_67': {
        'status':  -1
      },
      'spot_68': {
        'status':  -1
      },
      'spot_69': {
        'status':  -1
      },
      'spot_70': {
        'status':  -1
      },
      'spot_71': {
        'status':  -1
      },
      'spot_72': {
        'status':  -1
      },
      'spot_73': {
        'status':  -1
      },
      'spot_74': {
        'status':  -1
      },
      'spot_75': {
        'status':  -1
      },
      'spot_76': {
        'status':  -1
      },
      'spot_77': {
        'status':  -1
      },
      'spot_78': {
        'status':  -1
      },
      'spot_79': {
        'status':  -1
      }
    },
    'Group_C': {
      'spot_0': {
        'status':  -1
      },
      'spot_1': {
        'status':  -1
      },
      'spot_2': {
        'status':  -1
      },
      'spot_3': {
        'status':  -1
      },
      'spot_4': {
        'status':  -1
      },
      'spot_5': {
        'status':  -1
      },
      'spot_6': {
        'status':  -1
      },
      'spot_7': {
        'status':  -1
      },
      'spot_8': {
        'status':  -1
      },
      'spot_9': {
        'status':  -1
      },
      'spot_10': {
        'status':  -1
      },
      'spot_11': {
        'status':  -1
      },
      'spot_12': {
        'status':  -1
      },
      'spot_13': {
        'status':  -1
      },
      'spot_14': {
        'status':  -1
      },
      'spot_15': {
        'status':  -1
      },
      'spot_16': {
        'status':  -1
      },
      'spot_17': {
        'status':  -1
      },
      'spot_18': {
        'status':  -1
      },
      'spot_19': {
        'status':  -1
      },
      'spot_20': {
        'status':  -1
      },
      'spot_21': {
        'status':  -1
      },
      'spot_22': {
        'status':  -1
      },
      'spot_23': {
        'status':  -1
      },
      'spot_24': {
        'status':  -1
      },
      'spot_25': {
        'status':  -1
      },
      'spot_26': {
        'status':  -1
      },
      'spot_27': {
        'status':  -1
      },
      'spot_28': {
        'status':  -1
      },
      'spot_29': {
        'status':  -1
      },
      'spot_30': {
        'status':  -1
      },
      'spot_31': {
        'status':  -1
      },
      'spot_32': {
        'status':  -1
      },
      'spot_33': {
        'status':  -1
      },
      'spot_34': {
        'status':  -1
      },
      'spot_35': {
        'status':  -1
      },
      'spot_36': {
        'status':  -1
      },
      'spot_37': {
        'status':  -1
      },
      'spot_38': {
        'status':  -1
      },
      'spot_39': {
        'status':  -1
      },
      'spot_40': {
        'status':  -1
      },
      'spot_41': {
        'status':  -1
      },
      'spot_42': {
        'status':  -1
      },
      'spot_43': {
        'status':  -1
      },
      'spot_44': {
        'status':  -1
      },
      'spot_45': {
        'status':  -1
      },
      'spot_46': {
        'status':  -1
      },
      'spot_47': {
        'status':  -1
      },
      'spot_48': {
        'status':  -1
      },
      'spot_49': {
        'status':  -1
      },
      'spot_50': {
        'status':  -1
      },
      'spot_51': {
        'status':  -1
      },
      'spot_52': {
        'status':  -1
      },
      'spot_53': {
        'status':  -1
      },
      'spot_54': {
        'status':  -1
      },
      'spot_55': {
        'status':  -1
      },
      'spot_56': {
        'status':  -1
      },
      'spot_57': {
        'status':  -1
      },
      'spot_58': {
        'status':  -1
      },
      'spot_59': {
        'status':  -1
      },
      'spot_60': {
        'status':  -1
      },
      'spot_61': {
        'status':  -1
      },
      'spot_62': {
        'status':  -1
      },
      'spot_63': {
        'status':  -1
      },
      'spot_64': {
        'status':  -1
      },
      'spot_65': {
        'status':  -1
      },
      'spot_66': {
        'status':  -1
      },
      'spot_67': {
        'status':  -1
      },
      'spot_68': {
        'status':  -1
      },
      'spot_69': {
        'status':  -1
      },
      'spot_70': {
        'status':  -1
      },
      'spot_71': {
        'status':  -1
      },
      'spot_72': {
        'status':  -1
      },
      'spot_73': {
        'status':  -1
      },
      'spot_74': {
        'status':  -1
      },
      'spot_75': {
        'status':  -1
      },
      'spot_76': {
        'status':  -1
      },
      'spot_77': {
        'status':  -1
      },
      'spot_78': {
        'status':  -1
      },
      'spot_79': {
        'status':  -1
      }
    },
    'Group_D': {
      'spot_0': {
        'status':  -1
      },
      'spot_1': {
        'status':  -1
      },
      'spot_2': {
        'status':  -1
      },
      'spot_3': {
        'status':  -1
      },
      'spot_4': {
        'status':  -1
      },
      'spot_5': {
        'status':  -1
      },
      'spot_6': {
        'status':  -1
      },
      'spot_7': {
        'status':  -1
      },
      'spot_8': {
        'status':  -1
      },
      'spot_9': {
        'status':  -1
      },
      'spot_10': {
        'status':  -1
      },
      'spot_11': {
        'status':  -1
      },
      'spot_12': {
        'status':  -1
      },
      'spot_13': {
        'status':  -1
      },
      'spot_14': {
        'status':  -1
      },
      'spot_15': {
        'status':  -1
      },
      'spot_16': {
        'status':  -1
      },
      'spot_17': {
        'status':  -1
      },
      'spot_18': {
        'status':  -1
      },
      'spot_19': {
        'status':  -1
      },
      'spot_20': {
        'status':  -1
      },
      'spot_21': {
        'status':  -1
      },
      'spot_22': {
        'status':  -1
      },
      'spot_23': {
        'status':  -1
      },
      'spot_24': {
        'status':  -1
      },
      'spot_25': {
        'status':  -1
      },
      'spot_26': {
        'status':  -1
      },
      'spot_27': {
        'status':  -1
      },
      'spot_28': {
        'status':  -1
      },
      'spot_29': {
        'status':  -1
      },
      'spot_30': {
        'status':  -1
      },
      'spot_31': {
        'status':  -1
      },
      'spot_32': {
        'status':  -1
      },
      'spot_33': {
        'status':  -1
      },
      'spot_34': {
        'status':  -1
      },
      'spot_35': {
        'status':  -1
      },
      'spot_36': {
        'status':  -1
      },
      'spot_37': {
        'status':  -1
      },
      'spot_38': {
        'status':  -1
      },
      'spot_39': {
        'status':  -1
      },
      'spot_40': {
        'status':  -1
      },
      'spot_41': {
        'status':  -1
      },
      'spot_42': {
        'status':  -1
      },
      'spot_43': {
        'status':  -1
      },
      'spot_44': {
        'status':  -1
      },
      'spot_45': {
        'status':  -1
      },
      'spot_46': {
        'status':  -1
      },
      'spot_47': {
        'status':  -1
      },
      'spot_48': {
        'status':  -1
      },
      'spot_49': {
        'status':  -1
      },
      'spot_50': {
        'status':  -1
      },
      'spot_51': {
        'status':  -1
      },
      'spot_52': {
        'status':  -1
      },
      'spot_53': {
        'status':  -1
      },
      'spot_54': {
        'status':  -1
      },
      'spot_55': {
        'status':  -1
      },
      'spot_56': {
        'status':  -1
      },
      'spot_57': {
        'status':  -1
      },
      'spot_58': {
        'status':  -1
      },
      'spot_59': {
        'status':  -1
      },
      'spot_60': {
        'status':  -1
      },
      'spot_61': {
        'status':  -1
      },
      'spot_62': {
        'status':  -1
      },
      'spot_63': {
        'status':  -1
      },
      'spot_64': {
        'status':  -1
      },
      'spot_65': {
        'status':  -1
      },
      'spot_66': {
        'status':  -1
      },
      'spot_67': {
        'status':  -1
      },
      'spot_68': {
        'status':  -1
      },
      'spot_69': {
        'status':  -1
      },
      'spot_70': {
        'status':  -1
      },
      'spot_71': {
        'status':  -1
      },
      'spot_72': {
        'status':  -1
      },
      'spot_73': {
        'status':  -1
      },
      'spot_74': {
        'status':  -1
      },
      'spot_75': {
        'status':  -1
      },
      'spot_76': {
        'status':  -1
      },
      'spot_77': {
        'status':  -1
      },
      'spot_78': {
        'status':  -1
      },
      'spot_79': {
        'status':  -1
      }
    },
    'Group_E': {
      'spot_0': {
        'status':  -1
      },
      'spot_1': {
        'status':  -1
      },
      'spot_2': {
        'status':  -1
      },
      'spot_3': {
        'status':  -1
      },
      'spot_4': {
        'status':  -1
      },
      'spot_5': {
        'status':  -1
      },
      'spot_6': {
        'status':  -1
      },
      'spot_7': {
        'status':  -1
      },
      'spot_8': {
        'status':  -1
      },
      'spot_9': {
        'status':  -1
      },
      'spot_10': {
        'status':  -1
      },
      'spot_11': {
        'status':  -1
      },
      'spot_12': {
        'status':  -1
      },
      'spot_13': {
        'status':  -1
      },
      'spot_14': {
        'status':  -1
      },
      'spot_15': {
        'status':  -1
      },
      'spot_16': {
        'status':  -1
      },
      'spot_17': {
        'status':  -1
      },
      'spot_18': {
        'status':  -1
      },
      'spot_19': {
        'status':  -1
      },
      'spot_20': {
        'status':  -1
      },
      'spot_21': {
        'status':  -1
      },
      'spot_22': {
        'status':  -1
      },
      'spot_23': {
        'status':  -1
      },
      'spot_24': {
        'status':  -1
      },
      'spot_25': {
        'status':  -1
      },
      'spot_26': {
        'status':  -1
      },
      'spot_27': {
        'status':  -1
      },
      'spot_28': {
        'status':  -1
      },
      'spot_29': {
        'status':  -1
      },
      'spot_30': {
        'status':  -1
      },
      'spot_31': {
        'status':  -1
      },
      'spot_32': {
        'status':  -1
      },
      'spot_33': {
        'status':  -1
      },
      'spot_34': {
        'status':  -1
      },
      'spot_35': {
        'status':  -1
      },
      'spot_36': {
        'status':  -1
      },
      'spot_37': {
        'status':  -1
      },
      'spot_38': {
        'status':  -1
      },
      'spot_39': {
        'status':  -1
      },
      'spot_40': {
        'status':  -1
      },
      'spot_41': {
        'status':  -1
      },
      'spot_42': {
        'status':  -1
      },
      'spot_43': {
        'status':  -1
      },
      'spot_44': {
        'status':  -1
      },
      'spot_45': {
        'status':  -1
      },
      'spot_46': {
        'status':  -1
      },
      'spot_47': {
        'status':  -1
      },
      'spot_48': {
        'status':  -1
      },
      'spot_49': {
        'status':  -1
      },
      'spot_50': {
        'status':  -1
      },
      'spot_51': {
        'status':  -1
      },
      'spot_52': {
        'status':  -1
      },
      'spot_53': {
        'status':  -1
      },
      'spot_54': {
        'status':  -1
      },
      'spot_55': {
        'status':  -1
      },
      'spot_56': {
        'status':  -1
      },
      'spot_57': {
        'status':  -1
      },
      'spot_58': {
        'status':  -1
      },
      'spot_59': {
        'status':  -1
      },
      'spot_60': {
        'status':  -1
      },
      'spot_61': {
        'status':  -1
      },
      'spot_62': {
        'status':  -1
      },
      'spot_63': {
        'status':  -1
      },
      'spot_64': {
        'status':  -1
      },
      'spot_65': {
        'status':  -1
      },
      'spot_66': {
        'status':  -1
      },
      'spot_67': {
        'status':  -1
      },
      'spot_68': {
        'status':  -1
      },
      'spot_69': {
        'status':  -1
      },
      'spot_70': {
        'status':  -1
      },
      'spot_71': {
        'status':  -1
      },
      'spot_72': {
        'status':  -1
      },
      'spot_73': {
        'status':  -1
      },
      'spot_74': {
        'status':  -1
      },
      'spot_75': {
        'status':  -1
      },
      'spot_76': {
        'status':  -1
      },
      'spot_77': {
        'status':  -1
      },
      'spot_78': {
        'status':  -1
      },
      'spot_79': {
        'status':  -1
      }
    },
    'Group_F': {
      'spot_0': {
        'status':  -1
      },
      'spot_1': {
        'status':  -1
      },
      'spot_2': {
        'status':  -1
      },
      'spot_3': {
        'status':  -1
      },
      'spot_4': {
        'status':  -1
      },
      'spot_5': {
        'status':  -1
      },
      'spot_6': {
        'status':  -1
      },
      'spot_7': {
        'status':  -1
      },
      'spot_8': {
        'status':  -1
      },
      'spot_9': {
        'status':  -1
      },
      'spot_10': {
        'status':  -1
      },
      'spot_11': {
        'status':  -1
      },
      'spot_12': {
        'status':  -1
      },
      'spot_13': {
        'status':  -1
      },
      'spot_14': {
        'status':  -1
      },
      'spot_15': {
        'status':  -1
      },
      'spot_16': {
        'status':  -1
      },
      'spot_17': {
        'status':  -1
      },
      'spot_18': {
        'status':  -1
      },
      'spot_19': {
        'status':  -1
      },
      'spot_20': {
        'status':  -1
      },
      'spot_21': {
        'status':  -1
      },
      'spot_22': {
        'status':  -1
      },
      'spot_23': {
        'status':  -1
      },
      'spot_24': {
        'status':  -1
      },
      'spot_25': {
        'status':  -1
      },
      'spot_26': {
        'status':  -1
      },
      'spot_27': {
        'status':  -1
      },
      'spot_28': {
        'status':  -1
      },
      'spot_29': {
        'status':  -1
      },
      'spot_30': {
        'status':  -1
      },
      'spot_31': {
        'status':  -1
      },
      'spot_32': {
        'status':  -1
      },
      'spot_33': {
        'status':  -1
      },
      'spot_34': {
        'status':  -1
      },
      'spot_35': {
        'status':  -1
      },
      'spot_36': {
        'status':  -1
      },
      'spot_37': {
        'status':  -1
      },
      'spot_38': {
        'status':  -1
      },
      'spot_39': {
        'status':  -1
      },
      'spot_40': {
        'status':  -1
      },
      'spot_41': {
        'status':  -1
      },
      'spot_42': {
        'status':  -1
      },
      'spot_43': {
        'status':  -1
      },
      'spot_44': {
        'status':  -1
      },
      'spot_45': {
        'status':  -1
      },
      'spot_46': {
        'status':  -1
      },
      'spot_47': {
        'status':  -1
      },
      'spot_48': {
        'status':  -1
      },
      'spot_49': {
        'status':  -1
      },
      'spot_50': {
        'status':  -1
      },
      'spot_51': {
        'status':  -1
      },
      'spot_52': {
        'status':  -1
      },
      'spot_53': {
        'status':  -1
      },
      'spot_54': {
        'status':  -1
      },
      'spot_55': {
        'status':  -1
      },
      'spot_56': {
        'status':  -1
      },
      'spot_57': {
        'status':  -1
      },
      'spot_58': {
        'status':  -1
      },
      'spot_59': {
        'status':  -1
      },
      'spot_60': {
        'status':  -1
      },
      'spot_61': {
        'status':  -1
      },
      'spot_62': {
        'status':  -1
      },
      'spot_63': {
        'status':  -1
      },
      'spot_64': {
        'status':  -1
      },
      'spot_65': {
        'status':  -1
      },
      'spot_66': {
        'status':  -1
      },
      'spot_67': {
        'status':  -1
      },
      'spot_68': {
        'status':  -1
      },
      'spot_69': {
        'status':  -1
      },
      'spot_70': {
        'status':  -1
      },
      'spot_71': {
        'status':  -1
      },
      'spot_72': {
        'status':  -1
      },
      'spot_73': {
        'status':  -1
      },
      'spot_74': {
        'status':  -1
      },
      'spot_75': {
        'status':  -1
      },
      'spot_76': {
        'status':  -1
      },
      'spot_77': {
        'status':  -1
      },
      'spot_78': {
        'status':  -1
      },
      'spot_79': {
        'status':  -1
      }
    },
    'Group_G': {
      'spot_0': {
        'status':  -1
      },
      'spot_1': {
        'status':  -1
      },
      'spot_2': {
        'status':  -1
      },
      'spot_3': {
        'status':  -1
      },
      'spot_4': {
        'status':  -1
      },
      'spot_5': {
        'status':  -1
      },
      'spot_6': {
        'status':  -1
      },
      'spot_7': {
        'status':  -1
      },
      'spot_8': {
        'status':  -1
      },
      'spot_9': {
        'status':  -1
      },
      'spot_10': {
        'status':  -1
      },
      'spot_11': {
        'status':  -1
      },
      'spot_12': {
        'status':  -1
      },
      'spot_13': {
        'status':  -1
      },
      'spot_14': {
        'status':  -1
      },
      'spot_15': {
        'status':  -1
      },
      'spot_16': {
        'status':  -1
      },
      'spot_17': {
        'status':  -1
      },
      'spot_18': {
        'status':  -1
      },
      'spot_19': {
        'status':  -1
      },
      'spot_20': {
        'status':  -1
      },
      'spot_21': {
        'status':  -1
      },
      'spot_22': {
        'status':  -1
      },
      'spot_23': {
        'status':  -1
      },
      'spot_24': {
        'status':  -1
      },
      'spot_25': {
        'status':  -1
      },
      'spot_26': {
        'status':  -1
      },
      'spot_27': {
        'status':  -1
      },
      'spot_28': {
        'status':  -1
      },
      'spot_29': {
        'status':  -1
      },
      'spot_30': {
        'status':  -1
      },
      'spot_31': {
        'status':  -1
      },
      'spot_32': {
        'status':  -1
      },
      'spot_33': {
        'status':  -1
      },
      'spot_34': {
        'status':  -1
      },
      'spot_35': {
        'status':  -1
      },
      'spot_36': {
        'status':  -1
      },
      'spot_37': {
        'status':  -1
      },
      'spot_38': {
        'status':  -1
      },
      'spot_39': {
        'status':  -1
      },
      'spot_40': {
        'status':  -1
      },
      'spot_41': {
        'status':  -1
      },
      'spot_42': {
        'status':  -1
      },
      'spot_43': {
        'status':  -1
      },
      'spot_44': {
        'status':  -1
      },
      'spot_45': {
        'status':  -1
      },
      'spot_46': {
        'status':  -1
      },
      'spot_47': {
        'status':  -1
      },
      'spot_48': {
        'status':  -1
      },
      'spot_49': {
        'status':  -1
      },
      'spot_50': {
        'status':  -1
      },
      'spot_51': {
        'status':  -1
      },
      'spot_52': {
        'status':  -1
      },
      'spot_53': {
        'status':  -1
      },
      'spot_54': {
        'status':  -1
      },
      'spot_55': {
        'status':  -1
      },
      'spot_56': {
        'status':  -1
      },
      'spot_57': {
        'status':  -1
      },
      'spot_58': {
        'status':  -1
      },
      'spot_59': {
        'status':  -1
      },
      'spot_60': {
        'status':  -1
      },
      'spot_61': {
        'status':  -1
      },
      'spot_62': {
        'status':  -1
      },
      'spot_63': {
        'status':  -1
      },
      'spot_64': {
        'status':  -1
      },
      'spot_65': {
        'status':  -1
      },
      'spot_66': {
        'status':  -1
      },
      'spot_67': {
        'status':  -1
      },
      'spot_68': {
        'status':  -1
      },
      'spot_69': {
        'status':  -1
      },
      'spot_70': {
        'status':  -1
      },
      'spot_71': {
        'status':  -1
      },
      'spot_72': {
        'status':  -1
      },
      'spot_73': {
        'status':  -1
      },
      'spot_74': {
        'status':  -1
      },
      'spot_75': {
        'status':  -1
      },
      'spot_76': {
        'status':  -1
      },
      'spot_77': {
        'status':  -1
      },
      'spot_78': {
        'status':  -1
      },
      'spot_79': {
        'status':  -1
      }
    },
    'Group_H': {
      'spot_0': {
        'status':  -1
      },
      'spot_1': {
        'status':  -1
      },
      'spot_2': {
        'status':  -1
      },
      'spot_3': {
        'status':  -1
      },
      'spot_4': {
        'status':  -1
      },
      'spot_5': {
        'status':  -1
      },
      'spot_6': {
        'status':  -1
      },
      'spot_7': {
        'status':  -1
      },
      'spot_8': {
        'status':  -1
      },
      'spot_9': {
        'status':  -1
      },
      'spot_10': {
        'status':  -1
      },
      'spot_11': {
        'status':  -1
      },
      'spot_12': {
        'status':  -1
      },
      'spot_13': {
        'status':  -1
      },
      'spot_14': {
        'status':  -1
      },
      'spot_15': {
        'status':  -1
      },
      'spot_16': {
        'status':  -1
      },
      'spot_17': {
        'status':  -1
      },
      'spot_18': {
        'status':  -1
      },
      'spot_19': {
        'status':  -1
      },
      'spot_20': {
        'status':  -1
      },
      'spot_21': {
        'status':  -1
      },
      'spot_22': {
        'status':  -1
      },
      'spot_23': {
        'status':  -1
      },
      'spot_24': {
        'status':  -1
      },
      'spot_25': {
        'status':  -1
      },
      'spot_26': {
        'status':  -1
      },
      'spot_27': {
        'status':  -1
      },
      'spot_28': {
        'status':  -1
      },
      'spot_29': {
        'status':  -1
      },
      'spot_30': {
        'status':  -1
      },
      'spot_31': {
        'status':  -1
      },
      'spot_32': {
        'status':  -1
      },
      'spot_33': {
        'status':  -1
      },
      'spot_34': {
        'status':  -1
      },
      'spot_35': {
        'status':  -1
      },
      'spot_36': {
        'status':  -1
      },
      'spot_37': {
        'status':  -1
      },
      'spot_38': {
        'status':  -1
      },
      'spot_39': {
        'status':  -1
      },
      'spot_40': {
        'status':  -1
      },
      'spot_41': {
        'status':  -1
      },
      'spot_42': {
        'status':  -1
      },
      'spot_43': {
        'status':  -1
      },
      'spot_44': {
        'status':  -1
      },
      'spot_45': {
        'status':  -1
      },
      'spot_46': {
        'status':  -1
      },
      'spot_47': {
        'status':  -1
      },
      'spot_48': {
        'status':  -1
      },
      'spot_49': {
        'status':  -1
      },
      'spot_50': {
        'status':  -1
      },
      'spot_51': {
        'status':  -1
      },
      'spot_52': {
        'status':  -1
      },
      'spot_53': {
        'status':  -1
      },
      'spot_54': {
        'status':  -1
      },
      'spot_55': {
        'status':  -1
      },
      'spot_56': {
        'status':  -1
      },
      'spot_57': {
        'status':  -1
      },
      'spot_58': {
        'status':  -1
      },
      'spot_59': {
        'status':  -1
      },
      'spot_60': {
        'status':  -1
      },
      'spot_61': {
        'status':  -1
      },
      'spot_62': {
        'status':  -1
      },
      'spot_63': {
        'status':  -1
      },
      'spot_64': {
        'status':  -1
      },
      'spot_65': {
        'status':  -1
      },
      'spot_66': {
        'status':  -1
      },
      'spot_67': {
        'status':  -1
      },
      'spot_68': {
        'status':  -1
      },
      'spot_69': {
        'status':  -1
      },
      'spot_70': {
        'status':  -1
      },
      'spot_71': {
        'status':  -1
      },
      'spot_72': {
        'status':  -1
      },
      'spot_73': {
        'status':  -1
      },
      'spot_74': {
        'status':  -1
      },
      'spot_75': {
        'status':  -1
      },
      'spot_76': {
        'status':  -1
      },
      'spot_77': {
        'status':  -1
      },
      'spot_78': {
        'status':  -1
      },
      'spot_79': {
        'status':  -1
      }
    },
    'Group_I': {
      'spot_0': {
        'status':  -1
      },
      'spot_1': {
        'status':  -1
      },
      'spot_2': {
        'status':  -1
      },
      'spot_3': {
        'status':  -1
      },
      'spot_4': {
        'status':  -1
      },
      'spot_5': {
        'status':  -1
      },
      'spot_6': {
        'status':  -1
      },
      'spot_7': {
        'status':  -1
      },
      'spot_8': {
        'status':  -1
      },
      'spot_9': {
        'status':  -1
      },
      'spot_10': {
        'status':  -1
      },
      'spot_11': {
        'status':  -1
      },
      'spot_12': {
        'status':  -1
      },
      'spot_13': {
        'status':  -1
      },
      'spot_14': {
        'status':  -1
      },
      'spot_15': {
        'status':  -1
      },
      'spot_16': {
        'status':  -1
      },
      'spot_17': {
        'status':  -1
      },
      'spot_18': {
        'status':  -1
      },
      'spot_19': {
        'status':  -1
      },
      'spot_20': {
        'status':  -1
      },
      'spot_21': {
        'status':  -1
      },
      'spot_22': {
        'status':  -1
      },
      'spot_23': {
        'status':  -1
      },
      'spot_24': {
        'status':  -1
      },
      'spot_25': {
        'status':  -1
      },
      'spot_26': {
        'status':  -1
      },
      'spot_27': {
        'status':  -1
      },
      'spot_28': {
        'status':  -1
      },
      'spot_29': {
        'status':  -1
      },
      'spot_30': {
        'status':  -1
      },
      'spot_31': {
        'status':  -1
      },
      'spot_32': {
        'status':  -1
      },
      'spot_33': {
        'status':  -1
      },
      'spot_34': {
        'status':  -1
      },
      'spot_35': {
        'status':  -1
      },
      'spot_36': {
        'status':  -1
      },
      'spot_37': {
        'status':  -1
      },
      'spot_38': {
        'status':  -1
      },
      'spot_39': {
        'status':  -1
      },
      'spot_40': {
        'status':  -1
      },
      'spot_41': {
        'status':  -1
      },
      'spot_42': {
        'status':  -1
      },
      'spot_43': {
        'status':  -1
      },
      'spot_44': {
        'status':  -1
      },
      'spot_45': {
        'status':  -1
      },
      'spot_46': {
        'status':  -1
      },
      'spot_47': {
        'status':  -1
      },
      'spot_48': {
        'status':  -1
      },
      'spot_49': {
        'status':  -1
      },
      'spot_50': {
        'status':  -1
      },
      'spot_51': {
        'status':  -1
      },
      'spot_52': {
        'status':  -1
      },
      'spot_53': {
        'status':  -1
      },
      'spot_54': {
        'status':  -1
      },
      'spot_55': {
        'status':  -1
      },
      'spot_56': {
        'status':  -1
      },
      'spot_57': {
        'status':  -1
      },
      'spot_58': {
        'status':  -1
      },
      'spot_59': {
        'status':  -1
      },
      'spot_60': {
        'status':  -1
      },
      'spot_61': {
        'status':  -1
      },
      'spot_62': {
        'status':  -1
      },
      'spot_63': {
        'status':  -1
      },
      'spot_64': {
        'status':  -1
      },
      'spot_65': {
        'status':  -1
      },
      'spot_66': {
        'status':  -1
      },
      'spot_67': {
        'status':  -1
      },
      'spot_68': {
        'status':  -1
      },
      'spot_69': {
        'status':  -1
      },
      'spot_70': {
        'status':  -1
      },
      'spot_71': {
        'status':  -1
      },
      'spot_72': {
        'status':  -1
      },
      'spot_73': {
        'status':  -1
      },
      'spot_74': {
        'status':  -1
      },
      'spot_75': {
        'status':  -1
      },
      'spot_76': {
        'status':  -1
      },
      'spot_77': {
        'status':  -1
      },
      'spot_78': {
        'status':  -1
      },
      'spot_79': {
        'status':  -1
      }
    },
    'Group_J': {
      'spot_0': {
        'status':  -1
      },
      'spot_1': {
        'status':  -1
      },
      'spot_2': {
        'status':  -1
      },
      'spot_3': {
        'status':  -1
      },
      'spot_4': {
        'status':  -1
      },
      'spot_5': {
        'status':  -1
      },
      'spot_6': {
        'status':  -1
      },
      'spot_7': {
        'status':  -1
      },
      'spot_8': {
        'status':  -1
      },
      'spot_9': {
        'status':  -1
      },
      'spot_10': {
        'status':  -1
      },
      'spot_11': {
        'status':  -1
      },
      'spot_12': {
        'status':  -1
      },
      'spot_13': {
        'status':  -1
      },
      'spot_14': {
        'status':  -1
      },
      'spot_15': {
        'status':  -1
      },
      'spot_16': {
        'status':  -1
      },
      'spot_17': {
        'status':  -1
      },
      'spot_18': {
        'status':  -1
      },
      'spot_19': {
        'status':  -1
      },
      'spot_20': {
        'status':  -1
      },
      'spot_21': {
        'status':  -1
      },
      'spot_22': {
        'status':  -1
      },
      'spot_23': {
        'status':  -1
      },
      'spot_24': {
        'status':  -1
      },
      'spot_25': {
        'status':  -1
      },
      'spot_26': {
        'status':  -1
      },
      'spot_27': {
        'status':  -1
      },
      'spot_28': {
        'status':  -1
      },
      'spot_29': {
        'status':  -1
      },
      'spot_30': {
        'status':  -1
      },
      'spot_31': {
        'status':  -1
      },
      'spot_32': {
        'status':  -1
      },
      'spot_33': {
        'status':  -1
      },
      'spot_34': {
        'status':  -1
      },
      'spot_35': {
        'status':  -1
      },
      'spot_36': {
        'status':  -1
      },
      'spot_37': {
        'status':  -1
      },
      'spot_38': {
        'status':  -1
      },
      'spot_39': {
        'status':  -1
      },
      'spot_40': {
        'status':  -1
      },
      'spot_41': {
        'status':  -1
      },
      'spot_42': {
        'status':  -1
      },
      'spot_43': {
        'status':  -1
      },
      'spot_44': {
        'status':  -1
      },
      'spot_45': {
        'status':  -1
      },
      'spot_46': {
        'status':  -1
      },
      'spot_47': {
        'status':  -1
      },
      'spot_48': {
        'status':  -1
      },
      'spot_49': {
        'status':  -1
      },
      'spot_50': {
        'status':  -1
      },
      'spot_51': {
        'status':  -1
      },
      'spot_52': {
        'status':  -1
      },
      'spot_53': {
        'status':  -1
      },
      'spot_54': {
        'status':  -1
      },
      'spot_55': {
        'status':  -1
      },
      'spot_56': {
        'status':  -1
      },
      'spot_57': {
        'status':  -1
      },
      'spot_58': {
        'status':  -1
      },
      'spot_59': {
        'status':  -1
      },
      'spot_60': {
        'status':  -1
      },
      'spot_61': {
        'status':  -1
      },
      'spot_62': {
        'status':  -1
      },
      'spot_63': {
        'status':  -1
      },
      'spot_64': {
        'status':  -1
      },
      'spot_65': {
        'status':  -1
      },
      'spot_66': {
        'status':  -1
      },
      'spot_67': {
        'status':  -1
      },
      'spot_68': {
        'status':  -1
      },
      'spot_69': {
        'status':  -1
      },
      'spot_70': {
        'status':  -1
      },
      'spot_71': {
        'status':  -1
      },
      'spot_72': {
        'status':  -1
      },
      'spot_73': {
        'status':  -1
      },
      'spot_74': {
        'status':  -1
      },
      'spot_75': {
        'status':  -1
      },
      'spot_76': {
        'status':  -1
      },
      'spot_77': {
        'status':  -1
      },
      'spot_78': {
        'status':  -1
      },
      'spot_79': {
        'status':  -1
      }
    }
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
        try {
          var command = JSON.parse(msg.getData());
          console.log(`recieve command: ${command.Name}`);
          IoTDevice.client.complete(msg, IoTDevice.printErrorFor('complete'));
        }
        catch (err) {
          IoTDevice.printErrorFor('parse received message')(err);
        }
      })

      // This executes at a set interval - 10s seems good for cloud uploads
      let sendInterval = setInterval(() => {


        console.log('Sending device event data:\n' + JSON.stringify(IoTDevice.eventData));
        IoTDevice.client.sendEvent(new Message(JSON.stringify(IoTDevice.eventData)), IoTDevice.printErrorFor('send event'));
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

  // Helper function to generate random occupancy value
  private static generateRandomOccupancy(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // I want eventData object to be generic, perhaps the structur can be passed when constructed
  // so this way the SetEventData will only accept that type of object
  SetEventData() {

    Object.keys(IoTDevice.eventData).forEach(group => 
      Object.keys(IoTDevice.eventData[group]).forEach(spot => 
        IoTDevice.eventData[group][spot]['status'] = IoTDevice.generateRandomOccupancy(-1, 2)
      )
    );

  }

}