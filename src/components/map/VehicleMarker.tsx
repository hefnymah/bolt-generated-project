import React from 'react';
import { Marker } from 'react-map-gl';
import { Vehicle } from '../../types/vehicle';
import { MAP_THEME } from '../../constants/map';

interface VehicleMarkerProps {
  vehicle: Vehicle;
  onClick: () => void;
}

export const VehicleMarker: React.FC<VehicleMarkerProps> = ({ vehicle, onClick }) => {
  const isMoving = vehicle.currentSpeed > 0;
  const isActive = vehicle.status === 'active';

  return (
    <Marker
      longitude={vehicle.location.longitude}
      latitude={vehicle.location.latitude}
      onClick={onClick}
      anchor="center"
      rotationAlignment="map"
      pitchAlignment="map"
    >
      <div className="vehicle-marker relative group cursor-pointer">
        {/* Pulsing circle effect */}
        {isMoving && isActive && (
          <>
            <div 
              className="absolute -inset-4 rounded-full animate-ping"
              style={{ 
                backgroundColor: MAP_THEME.primary,
                opacity: 0.1,
                animationDuration: '3s'
              }}
            />
            <div 
              className="absolute -inset-3 rounded-full animate-ping"
              style={{ 
                backgroundColor: MAP_THEME.primary,
                opacity: 0.2,
                animationDuration: '2s'
              }}
            />
          </>
        )}
        
        {/* Vehicle icon container */}
        <div 
          className="relative flex items-center justify-center"
          style={{
            transform: `rotate(${vehicle.heading || 0}deg)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          {/* Cartoon Car SVG */}
          <div
            className={`w-16 h-16 flex items-center justify-center transform transition-all duration-300
              ${isMoving ? 'scale-105' : 'scale-100'}`}
          >
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Car body shadow */}
              <ellipse
                cx="50"
                cy="85"
                rx="35"
                ry="5"
                fill="rgba(0,0,0,0.2)"
              />
              
              {/* Car body */}
              <path
                d="M15 65 C15 55, 85 55, 85 65 L85 75 C85 80, 15 80, 15 75 Z"
                fill={isActive ? MAP_THEME.primary : '#9CA3AF'}
                stroke="#1F2937"
                strokeWidth="2"
              />
              
              {/* Car top */}
              <path
                d="M30 55 L40 35 C40 35, 60 35, 70 35 L80 55"
                fill={isActive ? MAP_THEME.primary : '#9CA3AF'}
                stroke="#1F2937"
                strokeWidth="2"
              />
              
              {/* Windows */}
              <path
                d="M42 37 L45 50 L65 50 L68 37"
                fill="#E5E7EB"
                stroke="#1F2937"
                strokeWidth="2"
              />
              
              {/* Wheels */}
              <circle cx="30" cy="75" r="8" fill="#1F2937" />
              <circle cx="70" cy="75" r="8" fill="#1F2937" />
              <circle cx="30" cy="75" r="4" fill="#4B5563" />
              <circle cx="70" cy="75" r="4" fill="#4B5563" />
              
              {/* Headlights */}
              <circle
                cx="80"
                cy="65"
                r="3"
                fill={isActive ? '#FCD34D' : '#9CA3AF'}
              />
              <circle
                cx="20"
                cy="65"
                r="3"
                fill={isActive ? '#DC2626' : '#9CA3AF'}
              />
            </svg>
          </div>
        </div>

        {/* Speed indicator */}
        <div 
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1.5 
            rounded-full text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 
            transition-all duration-200 whitespace-nowrap"
          style={{ 
            backgroundColor: MAP_THEME.background,
            color: MAP_THEME.secondary
          }}
        >
          {Math.round(vehicle.currentSpeed)} km/h
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 
            rotate-45 w-2 h-2 bg-white"/>
        </div>
      </div>
    </Marker>
  );
};
