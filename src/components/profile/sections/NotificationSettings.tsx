import React from 'react';
import { Bell, Mail, MessageSquare, Phone } from 'lucide-react';

export const NotificationSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
        <p className="mt-1 text-sm text-gray-500">Choose how you want to be notified about important updates.</p>
      </div>

      <div className="space-y-4">
        {[
          { icon: Bell, title: 'Push Notifications', description: 'Get notified about vehicle alerts and status changes' },
          { icon: Mail, title: 'Email Notifications', description: 'Receive daily and weekly reports via email' },
          { icon: MessageSquare, title: 'SMS Alerts', description: 'Get critical alerts via text message' },
          { icon: Phone, title: 'Phone Calls', description: 'Receive emergency notifications by phone' }
        ].map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">{title}</h3>
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  );
};
