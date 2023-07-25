import { useEffect, useState } from 'react';
import { Navbar } from 'components';

const NavbarModule = () => {
  const [navbar, setNavbar] = useState(false);

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

  return <Navbar navbar={navbar} />;
};

export default NavbarModule;
