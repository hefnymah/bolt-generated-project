import React from 'react';
import { Popup } from 'react-map-gl';
import { Vehicle } from '../../types/vehicle';
import { Car, Navigation, Gauge } from 'lucide-react';

interface VehiclePopupProps {
  vehicle: Vehicle;
  onClose: () => void;
}

export const VehiclePopup: React.FC<VehiclePopupProps> = ({ vehicle, onClose }) => {
  return (
    <Popup
      longitude={vehicle.location.longitude}
      latitude={vehicle.location.latitude}
      anchor="bottom"
      onClose={onClose}
      closeButton={true}
      closeOnClick={false}
      className="vehicle-popup"
    >
      <div className="p-3 min-w-[200px]">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
          <Car className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-gray-800">{vehicle.plateNumber}</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Navigation className="w-4 h-4" />
            <span>{vehicle.model}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Gauge className="w-4 h-4" />
            <span>{vehicle.currentSpeed} km/h</span>
          </div>
          
          <div className={`mt-2 px-2 py-1 rounded-full text-xs font-medium inline-block
            ${vehicle.status === 'active' ? 'bg-green-100 text-green-800' : 
              vehicle.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-gray-100 text-gray-800'}`}>
            {vehicle.status}
          </div>
        </div>
      </div>
    </Popup>
  );
};
