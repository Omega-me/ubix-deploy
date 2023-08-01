/* eslint-disable @typescript-eslint/no-explicit-any */
import { eRoutes } from 'common/enums';
import { ProfileSidebar } from 'components';
import useAuth from 'hooks/useAuth';
import { useLocation } from 'react-router-dom';

interface DahsboardLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: React.FC<DahsboardLayoutProps> = props => {
  const { children } = props;
  const locations = useLocation();
  const { signOut } = useAuth();

  const onLogOut = () => {
    signOut({
      navigateUrl: eRoutes.HOME,
    });
  };

  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      <ProfileSidebar onLogOut={onLogOut} location={locations as any} />
      <section className="user-dashboard">{children}</section>
    </div>
  );
};

export default ProfileLayout;
