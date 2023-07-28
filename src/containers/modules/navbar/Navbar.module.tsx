import { AuthData, UserDataDto } from 'common/interfaces';
import { Navbar } from 'components';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';

const NavbarModule = (props: { isLoginPage?: boolean }) => {
  const [navbar, setNavbar] = useState(false);
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

  return <Navbar signOut={signOut} userData={userData} isLoginPage={props.isLoginPage} navbar={navbar} />;
};

export default NavbarModule;
