import React from 'react';
import { CheckCircle, FileText, Shield, AlertTriangle } from 'lucide-react';

export const Compliance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Compliance & Regulations</h2>
        <p className="mt-1 text-sm text-gray-500">Review and manage compliance requirements for your fleet.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">Compliance Status</h3>
              <p className="mt-1 text-sm text-green-600">Your fleet is currently compliant with all regulations</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">Required Documents</h3>
              <div className="mt-3 space-y-2">
                {[
                  { name: 'Vehicle Registration', status: 'valid', expiry: '2024-12-31' },
                  { name: 'Insurance Certificate', status: 'valid', expiry: '2024-09-15' },
                  { name: 'Emissions Certificate', status: 'warning', expiry: '2024-04-30' },
                ].map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">Expires: {doc.expiry}</p>
                    </div>
                    {doc.status === 'valid' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">Audit History</h3>
              <div className="mt-3 space-y-2">
                {[
                  { date: '2024-03-10', action: 'Annual Compliance Review', status: 'Completed' },
                  { date: '2024-02-15', action: 'Safety Inspection', status: 'Passed' },
                  { date: '2024-01-20', action: 'Environmental Assessment', status: 'Completed' },
                ].map((audit) => (
                  <div key={audit.date} className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{audit.action}</p>
                      <p className="text-xs text-gray-500">{audit.date}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {audit.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
