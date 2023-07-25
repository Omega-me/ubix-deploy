import { DashboardSidebar } from 'components';

interface DahsboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DahsboardLayoutProps> = (props) => {
  const { children } = props;
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      <DashboardSidebar />

      <section className="user-dashboard">{children}</section>
    </div>
  );
};

export default DashboardLayout;
