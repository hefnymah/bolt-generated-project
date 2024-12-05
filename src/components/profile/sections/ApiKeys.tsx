import React from 'react';
import { Key, Plus, Trash2 } from 'lucide-react';

export const ApiKeys: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">API Keys</h2>
        <p className="mt-1 text-sm text-gray-500">Manage your API keys for accessing the Fleet Management API.</p>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          Generate New Key
        </button>
      </div>

      <div className="space-y-4">
        {[
          { name: 'Production API Key', created: '2024-02-15', lastUsed: '2024-03-14' },
          { name: 'Development API Key', created: '2024-03-01', lastUsed: '2024-03-14' },
        ].map((key) => (
          <div key={key.name} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Key className="w-5 h-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{key.name}</h3>
                    <p className="mt-1 text-xs text-gray-500">Created: {key.created}</p>
                    <p className="text-xs text-gray-500">Last used: {key.lastUsed}</p>
                  </div>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-2">
                  <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                    ••••••••••••••••••••••
                  </code>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
