export interface EmissionData {
  id: string;
  vehicleId: string;
  plateNumber: string;
  timestamp: string;
  co2Amount: number; // in grams
  distance: number; // in kilometers
}

export type TimeFrame = 'day' | 'week' | 'month' | 'year' | 'custom';

export interface EmissionStats {
  total: number;
  average: number;
  peak: number;
}
