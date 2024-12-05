import { Registry } from '@azure/iot-hub';
import { logger } from '../utils/logger';

let registry: Registry;

export const setupIoTHub = async () => {
  try {
    registry = Registry.fromConnectionString(process.env.AZURE_IOT_HUB_CONNECTION_STRING!);
    logger.info('IoT Hub connection established');
  } catch (error) {
    logger.error('Failed to connect to IoT Hub:', error);
    throw error;
  }
};

export const registerDevice = async (deviceId: string) => {
  try {
    const device = await registry.create({ deviceId });
    return device;
  } catch (error) {
    logger.error(`Failed to register device ${deviceId}:`, error);
    throw error;
  }
};

export const getDeviceConnectionString = async (deviceId: string) => {
  try {
    const device = await registry.get(deviceId);
    return device.connectionString;
  } catch (error) {
    logger.error(`Failed to get device connection string for ${deviceId}:`, error);
    throw error;
  }
};
