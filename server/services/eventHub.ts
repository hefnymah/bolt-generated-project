import { EventHubConsumerClient } from '@azure/event-hubs';
import { io } from '../index';
import { logger } from '../utils/logger';
import { saveTelemetryData } from './database';

let consumerClient: EventHubConsumerClient;

export const setupEventHub = async () => {
  try {
    consumerClient = new EventHubConsumerClient(
      'fleet-telemetry-group',
      process.env.AZURE_EVENT_HUB_CONNECTION_STRING!
    );

    const subscription = consumerClient.subscribe({
      processEvents: async (events) => {
        for (const event of events) {
          try {
            // Save telemetry data to database
            await saveTelemetryData(event.body);
            
            // Emit real-time updates to connected clients
            io.emit('telemetry-update', event.body);
          } catch (error) {
            logger.error('Error processing telemetry event:', error);
          }
        }
      },
      processError: async (err) => {
        logger.error('Error from Event Hub:', err);
      }
    });

    logger.info('Event Hub consumer connected');
    return subscription;
  } catch (error) {
    logger.error('Failed to connect to Event Hub:', error);
    throw error;
  }
};
