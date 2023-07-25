import Aos from 'aos';
import { toastOptions } from 'common/configs';
import { ScrollToTop } from 'components';
import useTitle from 'hooks/useTitle';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { CreateProfileModalModule, FooterModule, NavbarModule } from 'containers/modules';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { title } = useTitle();
  const pathName = location.pathname.split('/')[1].toLowerCase();
  // Aos animation activation
  useEffect(() => {
    Aos.init({
      duration: 1400,
      once: true,
    });
  }, []);

  // Change title based on pages
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <div className="page-wrapper">
      {pathName !== 'signup' && pathName !== 'login' && pathName !== 'forgotpassword' && <NavbarModule />}
      {children}
      {pathName !== 'signup' && pathName !== 'login' && pathName !== 'forgotpassword' && <FooterModule />}
      <ScrollToTop />
      <ToastContainer {...toastOptions} newestOnTop={true} />
      <CreateProfileModalModule />
    </div>
  );
};

export default Layout;
