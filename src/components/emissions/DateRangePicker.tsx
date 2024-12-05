import React from 'react';
import { TimeFrame } from '../../types/emissions';

interface DateRangePickerProps {
  timeFrame: TimeFrame;
  setTimeFrame: (timeFrame: TimeFrame) => void;
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (start: Date | null, end: Date | null) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  timeFrame,
  setTimeFrame,
  startDate,
  endDate,
  onDateChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-white p-4 rounded-lg shadow-sm">
      <div className="flex gap-2">
        {(['day', 'week', 'month', 'year', 'custom'] as TimeFrame[]).map((period) => (
          <button
            key={period}
            onClick={() => setTimeFrame(period)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              timeFrame === period
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>
      
      {timeFrame === 'custom' && (
        <div className="flex gap-2">
          <input
            type="date"
            value={startDate?.toISOString().split('T')[0] || ''}
            onChange={(e) => onDateChange(new Date(e.target.value), endDate)}
            className="px-3 py-1.5 rounded-md border border-gray-300 text-sm"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            value={endDate?.toISOString().split('T')[0] || ''}
            onChange={(e) => onDateChange(startDate, new Date(e.target.value))}
            className="px-3 py-1.5 rounded-md border border-gray-300 text-sm"
          />
        </div>
      )}
    </div>
  );
};
