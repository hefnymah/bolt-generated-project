import React from 'react';
import { KeyRound, Shield, Smartphone } from 'lucide-react';

export const SecuritySettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
        <p className="mt-1 text-sm text-gray-500">Manage your account security and authentication methods.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <KeyRound className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">Password</h3>
              <p className="mt-1 text-sm text-gray-500">Last changed 3 months ago</p>
              <button className="mt-3 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Change Password
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                  <p className="mt-1 text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">Security Log</h3>
              <p className="mt-1 text-sm text-gray-500">View recent security activity</p>
              <button className="mt-3 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                View Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
