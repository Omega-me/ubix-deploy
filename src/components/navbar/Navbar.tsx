import { mobileMenuData } from 'common/data';
import { isActiveParentChaild, isActiveLink } from 'common/utils';
import { HeaderNavContent, SidebarFooter, SidebarHeader } from 'components';
import { Menu, MenuItem, ProSidebarProvider, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logo from 'assets/images/logo.svg';
import { AuthData, UserDataDto } from 'common/interfaces';

interface HeaderProps {
  navbar: boolean;
  isLoginPage?: boolean;
  userData: AuthData<UserDataDto>;
  signOut: () => Promise<void>;
}

const Navbar: React.FC<HeaderProps> = props => {
  const pathName = location.pathname.split('/')[1];
  const renderButtons = () => {
    if (props.isLoginPage) {
      return null;
    }

    if (props.userData) {
      return (
        <>
          <Link to="/profile" className="theme-btn btn-style-three">
            Go to profile
          </Link>
          <button onClick={props.signOut} className="theme-btn btn-style-one mx-3">
            Logout
          </button>
        </>
      );
    }

    return (
      <>
        <Link to="/login" className="theme-btn btn-style-three">
          Login / Register
        </Link>
      </>
    );
  };
  return (
    <>
      {/* Navbar */}
      <header
        className={`main-header ${
          props.isLoginPage
            ? 'fixed-header'
            : props.navbar && pathName !== 'profile'
            ? 'fixed-header animated slideInDown'
            : pathName === 'profile'
            ? 'fixed-header header-shaddow'
            : ''
        }`}
      >
        <div className="main-box">
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="brand" />
                </Link>
              </div>
            </div>

            <HeaderNavContent />
          </div>

          <div className="outer-box">
            <div className="btn-box">{renderButtons()}</div>
          </div>
        </div>
      </header>

      {/* Navbar Mobile*/}
      <header className="main-header main-header-mobile">
        <div className="auto-container">
          {/* <!-- Main box --> */}
          <div className="inner-box">
            <div className="nav-outer">
              <div className="logo-box">
                <div className="logo">
                  <Link to="/">
                    <img src={logo} alt="brand" />
                  </Link>
                </div>
              </div>
              {/* End .logo-box */}
              <div className="offcanvas offcanvas-start mobile_menu-contnet" tabIndex={-1} id="offcanvasMenu" data-bs-scroll="true">
                <SidebarHeader />
                {/* End pro-header */}
                <ProSidebarProvider>
                  <Sidebar>
                    <Menu>
                      {mobileMenuData.map((item) => (
                        <SubMenu
                          className={isActiveParentChaild(item.items, location.pathname) ? 'menu-active' : ''}
                          label={item.label}
                          key={item.id}
                        >
                          {item.items.map((menuItem, i) => (
                            <MenuItem
                              className={isActiveLink(menuItem.routePath, location.pathname) ? 'menu-active-link' : ''}
                              key={i}
                              routerLink={<Link to={menuItem.routePath} />}
                            >
                              {menuItem.name}
                            </MenuItem>
                          ))}
                        </SubMenu>
                      ))}
                    </Menu>
                  </Sidebar>
                </ProSidebarProvider>
                <SidebarFooter signOut={props.signOut} userData={props.userData} isLoginPage={props.isLoginPage} />
              </div>

              {/* <!-- Main Menu End--> */}
            </div>
            {/* End .nav-outer */}

            <div className="outer-box">
              <div className="login-box">
                <a href="#" className="call-modal" data-bs-toggle="modal" data-bs-target="#loginPopupModal">
                  <span className="icon icon-user"></span>
                </a>
              </div>
              {/* login popup end */}

              <a href="#" className="mobile-nav-toggler" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu">
                <span className="flaticon-menu-1"></span>
              </a>
              {/* right humberger menu */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
