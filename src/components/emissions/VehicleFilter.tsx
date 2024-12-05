import React from 'react';
import { Vehicle } from '../../types/vehicle';
import { Car } from 'lucide-react';

interface VehicleFilterProps {
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
  onVehicleSelect: (vehicleId: string | null) => void;
}

export const VehicleFilter: React.FC<VehicleFilterProps> = ({
  vehicles,
  selectedVehicleId,
  onVehicleSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-2 bg-white p-4 rounded-lg shadow-sm">
      <button
        onClick={() => onVehicleSelect(null)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
          ${!selectedVehicleId 
            ? 'bg-blue-100 text-blue-700' 
            : 'text-gray-600 hover:bg-gray-100'}`}
      >
        <Car className="w-4 h-4" />
        All Vehicles
      </button>
      
      {vehicles.map((vehicle) => (
        <button
          key={vehicle.id}
          onClick={() => onVehicleSelect(vehicle.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${selectedVehicleId === vehicle.id 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <Car className="w-4 h-4" />
          {vehicle.plateNumber}
        </button>
      ))}
    </div>
  );
}
