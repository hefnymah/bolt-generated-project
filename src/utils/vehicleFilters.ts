import { Vehicle } from '../types/vehicle';
import { FilterType } from '../components/filters/DashboardFilters';

const SPEED_THRESHOLD = 80; // km/h
const FUEL_EFFICIENCY_THRESHOLD = 8; // L/100km (mock value)

export const filterVehicles = (vehicles: Vehicle[], filterType: FilterType): Vehicle[] => {
  switch (filterType) {
    case 'active':
      return vehicles.filter(vehicle => vehicle.status === 'active');
    case 'normal-speed':
      return vehicles.filter(vehicle => vehicle.currentSpeed <= SPEED_THRESHOLD);
    case 'fuel-efficient':
      // Mock fuel efficiency calculation
      return vehicles.filter(vehicle => {
        const mockFuelEfficiency = (vehicle.currentSpeed * 0.1) / 100;
        return mockFuelEfficiency <= FUEL_EFFICIENCY_THRESHOLD;
      });
    default:
      return vehicles;
  }
};

export const getVehicleStats = (vehicles: Vehicle[]) => {
  return {
    total: vehicles.length,
    active: vehicles.filter(v => v.status === 'active').length,
    normalSpeed: vehicles.filter(v => v.currentSpeed <= SPEED_THRESHOLD).length,
    fuelEfficient: vehicles.filter(v => {
      const mockFuelEfficiency = (v.currentSpeed * 0.1) / 100;
      return mockFuelEfficiency <= FUEL_EFFICIENCY_THRESHOLD;
    }).length,
  };
};
