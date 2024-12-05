import React from 'react';
import { EmissionStats } from '../../types/emissions';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface EmissionsStatsProps {
  stats: EmissionStats;
}

export const EmissionsStats: React.FC<EmissionsStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Emissions</p>
            <p className="text-2xl font-semibold">{(stats.total / 1000).toFixed(2)}kg</p>
          </div>
          <TrendingUp className="h-8 w-8 text-blue-500" />
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Average Daily</p>
            <p className="text-2xl font-semibold">{(stats.average / 1000).toFixed(2)}kg</p>
          </div>
          <Activity className="h-8 w-8 text-green-500" />
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Peak Emission</p>
            <p className="text-2xl font-semibold">{(stats.peak / 1000).toFixed(2)}kg</p>
          </div>
          <TrendingDown className="h-8 w-8 text-amber-500" />
        </div>
      </div>
    </div>
  );
};
