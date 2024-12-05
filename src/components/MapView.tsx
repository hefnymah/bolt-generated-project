import React, { useState } from 'react';
import Map, { NavigationControl, GeolocateControl, FullscreenControl } from 'react-map-gl';
import { mockVehicles } from '../data/mockData';
import { VehicleMarker } from './map/VehicleMarker';
import { VehiclePopup } from './map/VehiclePopup';
import { useVehicleMovement } from '../hooks/useVehicleMovement';
import { MAP_STYLES } from '../constants/map';
import { Box, Layers } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

export const MapView: React.FC = () => {
  const [popupInfo, setPopupInfo] = useState<Vehicle | null>(null);
  const [is3D, setIs3D] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: 8.2275,
    latitude: 46.8182,
    zoom: 8,
    pitch: 0,
    bearing: 0
  });

  const vehicles = useVehicleMovement(null);

  const toggle3D = () => {
    setIs3D(!is3D);
    setViewState(prev => ({
      ...prev,
      pitch: !is3D ? 60 : 0,
    }));
  };

  return (
    <div className="h-[calc(100vh-8rem)] relative">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle={MAP_STYLES.light}
        mapboxAccessToken="pk.eyJ1IjoiaGVmbnltYWgiLCJhIjoiY2xoZjlhbDdtMTQ4bTNmbnZ3eWNhajd5NiJ9.c4NSuTseOoqcz-jYVcwcZA"
        style={{ width: '100%', height: '100%' }}
        antialias={true}
        terrain={is3D ? { source: 'mapbox-dem', exaggeration: 1.5 } : undefined}
      >
        <GeolocateControl position="top-right" />
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />

        {vehicles.map((vehicle) => (
          <VehicleMarker
            key={vehicle.id}
            vehicle={vehicle}
            onClick={() => setPopupInfo(vehicle)}
          />
        ))}

        {popupInfo && (
          <VehiclePopup
            vehicle={popupInfo}
            onClose={() => setPopupInfo(null)}
          />
        )}
      </Map>

      {/* 2D/3D Toggle Button */}
      <button
        onClick={toggle3D}
        className="absolute bottom-6 right-6 bg-white rounded-lg shadow-lg p-3 
          hover:bg-gray-50 transition-colors z-10 flex items-center gap-2"
      >
        {is3D ? (
          <>
            <Box className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">2D View</span>
          </>
        ) : (
          <>
            <Layers className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">3D View</span>
          </>
        )}
      </button>
    </div>
  );
};
