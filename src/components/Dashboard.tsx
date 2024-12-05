import React, { useState, useMemo } from 'react';
import { VehicleCard } from './VehicleCard';
import { VehicleMap } from './map/VehicleMap';
import { DashboardFilters, FilterType } from './filters/DashboardFilters';
import { mockVehicles } from '../data/mockData';
import { Vehicle } from '../types/vehicle';
import { filterVehicles, getVehicleStats } from '../utils/vehicleFilters';

export const Dashboard: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  const vehicleStats = useMemo(() => getVehicleStats(mockVehicles), []);
  
  const filteredVehicles = useMemo(() => 
    filterVehicles(mockVehicles, selectedFilter),
    [selectedFilter]
  );

  const handleVehicleClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <div className="space-y-6">
      <DashboardFilters
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        vehicleStats={vehicleStats}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredVehicles.map((vehicle) => (
          <VehicleCard 
            key={vehicle.id} 
            vehicle={vehicle} 
            onClick={() => handleVehicleClick(vehicle)}
            isSelected={selectedVehicle?.id === vehicle.id}
          />
        ))}
      </div>
      
      <div className="h-[300px] sm:h-[400px] lg:h-[500px] bg-white rounded-lg shadow-md overflow-hidden">
        <VehicleMap selectedVehicle={selectedVehicle} />
      </div>
    </div>
  );
};
