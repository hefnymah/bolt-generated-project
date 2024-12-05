import React from 'react';
import { User, Shield, Bell, Key, HardDrive, HeartHandshake } from 'lucide-react';

interface ProfileNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const ProfileNavigation: React.FC<ProfileNavigationProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const navigationItems = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'security', label: 'Security Settings', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'data', label: 'Data Management', icon: HardDrive },
    { id: 'compliance', label: 'Compliance', icon: HeartHandshake },
  ];

  return (
    <nav className="w-64 bg-white rounded-lg shadow-sm p-4">
      <div className="space-y-1">
        {navigationItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSectionChange(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg
              transition-colors ${
                activeSection === id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
};
