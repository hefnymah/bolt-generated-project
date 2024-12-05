import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngBounds } from 'leaflet';
import { Vehicle } from '../types/vehicle';
import { Car } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface VehicleMapProps {
  selectedVehicle: Vehicle | null;
}

// Component to handle map view updates
const MapUpdater: React.FC<{ selectedVehicle: Vehicle | null }> = ({ selectedVehicle }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedVehicle) {
      map.setView(
        [selectedVehicle.location.latitude, selectedVehicle.location.longitude],
        13
      );
    } else {
      // Default view of Switzerland
      map.setView([46.8182, 8.2275], 8);
    }
  }, [selectedVehicle, map]);

  return null;
};

export const VehicleMap: React.FC<VehicleMapProps> = ({ selectedVehicle }) => {
  return (
    <MapContainer
      center={[46.8182, 8.2275]}
      zoom={8}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapUpdater selectedVehicle={selectedVehicle} />
      
      {selectedVehicle && (
        <Marker
          position={[selectedVehicle.location.latitude, selectedVehicle.location.longitude]}
        >
          <Popup>
            <div className="p-2">
              <div className="flex items-center mb-2">
                <Car className="h-4 w-4 text-blue-600 mr-2" />
                <span className="font-semibold">{selectedVehicle.plateNumber}</span>
              </div>
              <div className="text-sm">
                <p>Model: {selectedVehicle.model}</p>
                <p>Speed: {selectedVehicle.currentSpeed} km/h</p>
                <p>Status: {selectedVehicle.status}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};
