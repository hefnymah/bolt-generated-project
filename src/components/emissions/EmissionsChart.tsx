import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { EmissionData } from '../../types/emissions';
import { format } from 'date-fns';

interface EmissionsChartProps {
  data: EmissionData[];
  cumulative: boolean;
}

export const EmissionsChart: React.FC<EmissionsChartProps> = ({ data, cumulative }) => {
  const chartData = cumulative
    ? data.reduce((acc, curr, index) => {
        const total = index === 0 ? curr.co2Amount : acc[index - 1].co2Amount + curr.co2Amount;
        return [...acc, { ...curr, co2Amount: total }];
      }, [] as EmissionData[])
    : data;

  return (
    <div className="h-[400px] bg-white p-4 rounded-lg shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) => format(new Date(timestamp), 'MMM d')}
          />
          <YAxis
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}kg`}
          />
          <Tooltip
            labelFormatter={(timestamp) => format(new Date(timestamp), 'MMM d, yyyy')}
            formatter={(value: number) => [`${(value / 1000).toFixed(2)}kg`, 'CO₂']}
          />
          <Area
            type="monotone"
            dataKey="co2Amount"
            stroke="#3b82f6"
            fill="#93c5fd"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
