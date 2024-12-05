import { EmissionData } from '../types/emissions';
import { mockVehicles } from './mockData';
import { subDays, subMonths } from 'date-fns';

// Generate mock emissions data for the last 3 months
export const mockEmissionsData: EmissionData[] = Array.from({ length: 90 }, (_, index) => {
  const vehicle = mockVehicles[Math.floor(Math.random() * mockVehicles.length)];
  const date = subDays(new Date(), index);
  
  return {
    id: `emission-${index}`,
    vehicleId: vehicle.id,
    plateNumber: vehicle.plateNumber,
    timestamp: date.toISOString(),
    co2Amount: Math.floor(Math.random() * (300 - 150) + 150), // Random CO2 between 150-300g/km
    distance: Math.floor(Math.random() * (500 - 50) + 50), // Random distance between 50-500km
  };
});
