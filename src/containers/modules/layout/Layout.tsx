import Aos from 'aos';
import { toastOptions } from 'common/configs';
import { LoadingScreen, ScrollToTop } from 'components';
import useTitle from 'hooks/useTitle';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { FooterModule, NavbarModule } from 'containers/modules';
import { useLocation } from 'react-router-dom';
import { eRoutes } from 'common/enums';
import useStore from 'hooks/useStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { title } = useTitle();
  const { lazyLoading } = useStore().globalState;
  const locations = useLocation();
  const pathName = locations.pathname;

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
    <>
      {lazyLoading ? (
        <div className="page-wrapper">
          <LoadingScreen />
        </div>
      ) : (
        <div className="page-wrapper">
          {pathName !== eRoutes.SIGNUP &&
            pathName !== eRoutes.LOGIN &&
            pathName !== eRoutes.FORGOT_PASSWORD &&
            pathName !== eRoutes.PHONE_LOGIN_REGISTER && <NavbarModule />}
          {children}
          {!pathName.startsWith(eRoutes.PROFILE) &&
            pathName !== eRoutes.SIGNUP &&
            pathName !== eRoutes.LOGIN &&
            pathName !== eRoutes.FORGOT_PASSWORD &&
            pathName !== eRoutes.PHONE_LOGIN_REGISTER && <FooterModule />}
          <ScrollToTop />
          <ToastContainer {...toastOptions} newestOnTop={true} />
        </div>
      )}
    </>
  );
};

export default Layout;
