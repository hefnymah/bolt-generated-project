import { useState, useEffect, useCallback } from 'react';
import { Vehicle } from '../types/vehicle';
import { mockVehicles } from '../data/mockData';
import { MOVEMENT_CONFIG, SWITZERLAND_BOUNDS } from '../constants/map';

export const useVehicleMovement = (selectedVehicle: Vehicle | null) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);

  const keepInBounds = useCallback((lat: number, lng: number) => {
    const { minLat, maxLat, minLng, maxLng } = SWITZERLAND_BOUNDS;
    return {
      latitude: Math.max(minLat, Math.min(maxLat, lat)),
      longitude: Math.max(minLng, Math.min(maxLng, lng))
    };
  }, []);

  const updateVehiclePosition = useCallback((vehicle: Vehicle) => {
    if (vehicle.status !== 'active') return vehicle;

    // Gradually change heading for smoother movement
    const headingChange = (Math.random() - 0.5) * 2 * MOVEMENT_CONFIG.headingChange;
    const newHeading = ((vehicle.heading || 0) + headingChange) % 360;

    // Adjust speed randomly within limits
    const speedChange = (Math.random() - 0.5) * 5; // ±2.5 km/h change
    const newSpeed = Math.max(
      MOVEMENT_CONFIG.minSpeed,
      Math.min(MOVEMENT_CONFIG.maxSpeed, vehicle.currentSpeed + speedChange)
    );

    // Calculate new position
    const speedFactor = newSpeed * MOVEMENT_CONFIG.speedFactor;
    const radians = newHeading * Math.PI / 180;
    const rawPosition = {
      latitude: vehicle.location.latitude + (Math.cos(radians) * speedFactor),
      longitude: vehicle.location.longitude + (Math.sin(radians) * speedFactor)
    };

    // Keep vehicle within Switzerland bounds
    const boundedPosition = keepInBounds(rawPosition.latitude, rawPosition.longitude);

    return {
      ...vehicle,
      heading: newHeading,
      currentSpeed: newSpeed,
      location: boundedPosition,
      lastUpdate: new Date().toISOString()
    };
  }, [keepInBounds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prevVehicles => prevVehicles.map(updateVehiclePosition));
    }, MOVEMENT_CONFIG.interval);

    return () => clearInterval(interval);
  }, [updateVehiclePosition]);

  return vehicles;
};
