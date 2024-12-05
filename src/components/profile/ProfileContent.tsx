import React from 'react';
import { PersonalInfo } from './sections/PersonalInfo';
import { SecuritySettings } from './sections/SecuritySettings';
import { NotificationSettings } from './sections/NotificationSettings';
import { ApiKeys } from './sections/ApiKeys';
import { DataManagement } from './sections/DataManagement';
import { Compliance } from './sections/Compliance';

interface ProfileContentProps {
  activeSection: string;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfo />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'api':
        return <ApiKeys />;
      case 'data':
        return <DataManagement />;
      case 'compliance':
        return <Compliance />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
      {renderContent()}
    </div>
  );
};
