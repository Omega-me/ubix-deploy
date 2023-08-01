import { BreadCrumb, CopyrightFooter } from 'components';
import React from 'react';

interface ProfileLayoutContentProps {
  children: React.ReactNode;
  title: string;
}

const ProfileLayoutContent: React.FC<ProfileLayoutContentProps> = ({ children, title }) => {
  return (
    <div className="dashboard-outer">
      <BreadCrumb title={title} />
      {children}
      <CopyrightFooter />
    </div>
  );
};

export default ProfileLayoutContent;
