import React, { useEffect, useState, useCallback } from 'react';
import Map, { NavigationControl, GeolocateControl, FullscreenControl } from 'react-map-gl';
import { Vehicle } from '../../types/vehicle';
import { VehicleMarker } from './VehicleMarker';
import { VehiclePopup } from './VehiclePopup';
import { useVehicleMovement } from '../../hooks/useVehicleMovement';
import { MAP_STYLES, SWITZERLAND_BOUNDS } from '../../constants/map';
import { Box, Layers } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

interface VehicleMapProps {
  selectedVehicle: Vehicle | null;
}

export const VehicleMap: React.FC<VehicleMapProps> = ({ selectedVehicle }) => {
  const [popupInfo, setPopupInfo] = useState<Vehicle | null>(null);
  const [is3D, setIs3D] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: 8.2275,
    latitude: 46.8182,
    zoom: 8,
    pitch: 0,
    bearing: 0
  });

  const vehicles = useVehicleMovement(selectedVehicle);

  const fitBoundsToVehicles = useCallback(() => {
    if (vehicles.length === 0) return;

    let minLat = vehicles[0].location.latitude;
    let maxLat = vehicles[0].location.latitude;
    let minLng = vehicles[0].location.longitude;
    let maxLng = vehicles[0].location.longitude;

    vehicles.forEach(vehicle => {
      minLat = Math.min(minLat, vehicle.location.latitude);
      maxLat = Math.max(maxLat, vehicle.location.latitude);
      minLng = Math.min(minLng, vehicle.location.longitude);
      maxLng = Math.max(maxLng, vehicle.location.longitude);
    });

    // Add padding to bounds
    const latPadding = (maxLat - minLat) * 0.2;
    const lngPadding = (maxLng - minLng) * 0.2;

    setViewState(prev => ({
      ...prev,
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      zoom: Math.min(
        8,
        Math.floor(
          Math.min(
            Math.log2(360 / (maxLng - minLng + lngPadding * 2) * 2),
            Math.log2(180 / (maxLat - minLat + latPadding * 2) * 2)
          )
        )
      ),
      bearing: 0
    }));
  }, [vehicles]);

  // Update view when selected vehicle changes
  useEffect(() => {
    if (selectedVehicle) {
      const selectedVehicleData = vehicles.find(v => v.id === selectedVehicle.id);
      if (selectedVehicleData) {
        setViewState(prev => ({
          ...prev,
          longitude: selectedVehicleData.location.longitude,
          latitude: selectedVehicleData.location.latitude,
          zoom: 14,
          bearing: selectedVehicleData.heading || 0
        }));
        setPopupInfo(selectedVehicleData);
      }
    } else {
      fitBoundsToVehicles();
      setPopupInfo(null);
    }
  }, [selectedVehicle, vehicles, fitBoundsToVehicles]);

  const handleMarkerClick = useCallback((vehicle: Vehicle) => {
    setPopupInfo(vehicle);
    setViewState(prev => ({
      ...prev,
      longitude: vehicle.location.longitude,
      latitude: vehicle.location.latitude,
      zoom: 14,
      bearing: vehicle.heading || 0
    }));
  }, []);

  const toggle3D = () => {
    setIs3D(!is3D);
    setViewState(prev => ({
      ...prev,
      pitch: !is3D ? 60 : 0,
    }));
  };

  return (
    <div className="relative h-full">
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
            onClick={() => handleMarkerClick(vehicle)}
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
