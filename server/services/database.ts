import { CosmosClient, Database, Container } from '@azure/cosmos';
import { logger } from '../utils/logger';

let database: Database;
let vehiclesContainer: Container;
let telemetryContainer: Container;
let emissionsContainer: Container;

export const setupDatabase = async () => {
  try {
    const client = new CosmosClient(process.env.AZURE_COSMOS_DB_CONNECTION_STRING!);
    database = client.database(process.env.AZURE_COSMOS_DB_NAME!);

    // Initialize containers
    vehiclesContainer = database.container('vehicles');
    telemetryContainer = database.container('telemetry');
    emissionsContainer = database.container('emissions');

    logger.info('Database connection established');
  } catch (error) {
    logger.error('Failed to connect to database:', error);
    throw error;
  }
};

export const saveTelemetryData = async (data: any) => {
  try {
    const { resource } = await telemetryContainer.items.create(data);
    return resource;
  } catch (error) {
    logger.error('Failed to save telemetry data:', error);
    throw error;
  }
};

export const getVehicleTelemetry = async (vehicleId: string) => {
  try {
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.vehicleId = @vehicleId ORDER BY c._ts DESC',
      parameters: [{ name: '@vehicleId', value: vehicleId }]
    };
    
    const { resources } = await telemetryContainer.items.query(querySpec).fetchAll();
    return resources;
  } catch (error) {
    logger.error(`Failed to get telemetry for vehicle ${vehicleId}:`, error);
    throw error;
  }
};

export const saveEmissionsData = async (data: any) => {
  try {
    const { resource } = await emissionsContainer.items.create(data);
    return resource;
  } catch (error) {
    logger.error('Failed to save emissions data:', error);
    throw error;
  }
};
