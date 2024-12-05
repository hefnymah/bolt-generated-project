import { Vehicle } from '../types/vehicle';

export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    plateNumber: 'BE-123456',
    model: 'Toyota Camry',
    currentSpeed: 65,
    location: {
      latitude: 46.9480,
      longitude: 7.4474
    },
    status: 'active',
    lastUpdate: new Date().toISOString(),
    heading: 45
  },
  {
    id: '2',
    plateNumber: 'ZH-789012',
    model: 'Ford Transit',
    currentSpeed: 45,
    location: {
      latitude: 47.3769,
      longitude: 8.5417
    },
    status: 'active',
    lastUpdate: new Date().toISOString(),
    heading: 180
  },
  {
    id: '3',
    plateNumber: 'GE-345678',
    model: 'Honda Civic',
    currentSpeed: 0,
    location: {
      latitude: 46.2044,
      longitude: 6.1432
    },
    status: 'maintenance',
    lastUpdate: new Date().toISOString(),
    heading: 270
  }
];
