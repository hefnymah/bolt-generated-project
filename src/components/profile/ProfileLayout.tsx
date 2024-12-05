import React from 'react';
import { ProfileNavigation } from './ProfileNavigation';
import { ProfileContent } from './ProfileContent';

export const ProfileLayout: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState('personal');

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-64">
        <ProfileNavigation activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>
      <div className="flex-1">
        <ProfileContent activeSection={activeSection} />
      </div>
    </div>
  );
};
