import React from 'react';
import { Car, AlertTriangle } from 'lucide-react';
import { Vehicle } from '../types/vehicle';
import { formatDistanceToNow } from 'date-fns';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: () => void;
  isSelected: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onClick, isSelected }) => {
  const getStatusColor = (status: Vehicle['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 transform scale-[1.02]' : 'hover:shadow-lg'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Car className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">{vehicle.plateNumber}</h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(vehicle.status)}`}>
          {vehicle.status}
        </span>
      </div>
      
      <div className="space-y-2">
        <p className="text-gray-600">{vehicle.model}</p>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Current Speed</span>
          <span className="font-semibold">{vehicle.currentSpeed} km/h</span>
        </div>
        {vehicle.currentSpeed > 60 && (
          <div className="flex items-center text-amber-600 text-sm mt-2">
            <AlertTriangle className="h-4 w-4 mr-1" />
            <span>Speed limit warning</span>
          </div>
        )}
        <div className="text-sm text-gray-500 mt-4">
          Last updated {formatDistanceToNow(new Date(vehicle.lastUpdate))} ago
        </div>
      </div>
    </div>
  );
};
