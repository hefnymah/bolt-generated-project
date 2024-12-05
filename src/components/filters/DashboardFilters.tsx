import React from 'react';
import { Filter, Car, Activity, Fuel } from 'lucide-react';
import { Vehicle } from '../../types/vehicle';

export type FilterType = 'all' | 'active' | 'normal-speed' | 'fuel-efficient';

interface DashboardFiltersProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  vehicleStats: {
    total: number;
    active: number;
    normalSpeed: number;
    fuelEfficient: number;
  };
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  selectedFilter,
  onFilterChange,
  vehicleStats,
}) => {
  const filters = [
    {
      id: 'all' as FilterType,
      label: 'All Vehicles',
      icon: Car,
      count: vehicleStats.total,
    },
    {
      id: 'active' as FilterType,
      label: 'Active',
      icon: Activity,
      count: vehicleStats.active,
    },
    {
      id: 'normal-speed' as FilterType,
      label: 'Normal Speed',
      icon: Car,
      count: vehicleStats.normalSpeed,
    },
    {
      id: 'fuel-efficient' as FilterType,
      label: 'Fuel Efficient',
      icon: Fuel,
      count: vehicleStats.fuelEfficient,
    },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {filters.map(({ id, label, icon: Icon, count }) => (
          <button
            key={id}
            onClick={() => onFilterChange(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium 
              transition-colors ${
                selectedFilter === id
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                  : 'bg-white text-gray-600 border-2 border-gray-100 hover:bg-gray-50'
              }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-white text-gray-600 text-xs">
              {count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
