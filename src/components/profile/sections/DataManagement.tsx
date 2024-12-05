import React from 'react';
import { Database, Download, HardDrive, Upload } from 'lucide-react';

export const DataManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Data Management</h2>
        <p className="mt-1 text-sm text-gray-500">Manage your fleet data and export options.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">Export Data</h3>
              <p className="mt-1 text-sm text-gray-500">Download your fleet data in various formats</p>
              <div className="mt-3 space-x-2">
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                  CSV
                </button>
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                  JSON
                </button>
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                  PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Upload className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">Import Data</h3>
              <p className="mt-1 text-sm text-gray-500">Upload fleet data from external sources</p>
              <button className="mt-3 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Choose File
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">Data Retention</h3>
              <p className="mt-1 text-sm text-gray-500">Configure how long to keep historical data</p>
              <select className="mt-3 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>6 months</option>
                <option>1 year</option>
                <option>2 years</option>
                <option>Forever</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <HardDrive className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">Storage Usage</h3>
              <p className="mt-1 text-sm text-gray-500">Current storage usage and limits</p>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="mt-1 text-xs text-gray-500">4.5 GB of 10 GB used</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
