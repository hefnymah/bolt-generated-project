export interface Vehicle {
  id: string;
  plateNumber: string;
  model: string;
  currentSpeed: number;
  location: {
    latitude: number;
    longitude: number;
  };
  status: 'active' | 'inactive' | 'maintenance';
  lastUpdate: string;
  heading?: number; // Direction the vehicle is moving (0-360 degrees)
}
