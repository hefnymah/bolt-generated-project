import React, { useState, useMemo } from 'react';
import { DateRangePicker } from './DateRangePicker';
import { EmissionsChart } from './EmissionsChart';
import { EmissionsStats } from './EmissionsStats';
import { VehicleFilter } from './VehicleFilter';
import { TimeFrame, EmissionStats } from '../../types/emissions';
import { mockEmissionsData } from '../../data/mockEmissionsData';
import { mockVehicles } from '../../data/mockData';
import { generateEmissionsPDF } from '../../utils/pdfGenerator';
import { FileDown } from 'lucide-react';
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  isWithinInterval,
} from 'date-fns';

export const EmissionsView: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('month');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [cumulative, setCumulative] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  const dateRange = useMemo(() => {
    const now = new Date();
    switch (timeFrame) {
      case 'day':
        return { start: startOfDay(now), end: endOfDay(now) };
      case 'week':
        return { start: startOfWeek(now), end: endOfWeek(now) };
      case 'month':
        return { start: startOfMonth(now), end: endOfMonth(now) };
      case 'year':
        return { start: startOfYear(now), end: endOfYear(now) };
      case 'custom':
        return { start: startDate!, end: endDate! };
      default:
        return { start: startOfMonth(now), end: endOfMonth(now) };
    }
  }, [timeFrame, startDate, endDate]);

  const filteredData = useMemo(() => {
    if (timeFrame === 'custom' && (!startDate || !endDate)) return [];
    
    return mockEmissionsData
      .filter((emission) => {
        const emissionDate = new Date(emission.timestamp);
        const matchesVehicle = selectedVehicleId ? emission.vehicleId === selectedVehicleId : true;
        return matchesVehicle && isWithinInterval(emissionDate, dateRange);
      })
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }, [timeFrame, dateRange, startDate, endDate, selectedVehicleId]);

  const stats: EmissionStats = useMemo(() => {
    if (filteredData.length === 0) return { total: 0, average: 0, peak: 0 };
    
    const total = filteredData.reduce((sum, emission) => sum + emission.co2Amount, 0);
    return {
      total,
      average: total / filteredData.length,
      peak: Math.max(...filteredData.map(emission => emission.co2Amount)),
    };
  }, [filteredData]);

  const handleGeneratePDF = () => {
    const selectedVehicle = selectedVehicleId 
      ? mockVehicles.find(v => v.id === selectedVehicleId)
      : null;
    generateEmissionsPDF(
      filteredData,
      timeFrame,
      selectedVehicle,
      dateRange.start,
      dateRange.end
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">CO₂ Emissions</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCumulative(!cumulative)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              cumulative
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cumulative ? 'Show Daily' : 'Show Cumulative'}
          </button>
          
          <button
            onClick={handleGeneratePDF}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium 
              bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <FileDown className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <VehicleFilter
          vehicles={mockVehicles}
          selectedVehicleId={selectedVehicleId}
          onVehicleSelect={setSelectedVehicleId}
        />

        <DateRangePicker
          timeFrame={timeFrame}
          setTimeFrame={setTimeFrame}
          startDate={startDate}
          endDate={endDate}
          onDateChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
        />

        <EmissionsStats stats={stats} />
        
        <div className="h-[300px] sm:h-[400px] bg-white p-4 rounded-lg shadow-sm">
          <EmissionsChart
            data={filteredData}
            cumulative={cumulative}
          />
        </div>
      </div>
    </div>
  );
};
