import { eRoutes } from 'common/enums';
import { AuthData, UserDataDto } from 'common/interfaces';
import { Navbar } from 'components';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const NavbarModule = (props: { isLoginPage?: boolean }) => {
  const [navbar, setNavbar] = useState(false);
  const locations = useLocation();
  const pathName = locations.pathname;
  const { data: userData, signOut } = useAuth<AuthData<UserDataDto>>();

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
  }, []);

  const onLogOut = () => {
    signOut({
      navigateUrl: eRoutes.HOME,
    });
  };

  return <Navbar pathName={pathName} onLogOut={onLogOut} userData={userData} isLoginPage={props.isLoginPage} navbar={navbar} />;
};

export default NavbarModule;
