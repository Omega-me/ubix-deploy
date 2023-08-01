import { mobileMenuData } from 'common/data';
import { isActiveParentChaild, isActiveLink } from 'common/utils';
import { HeaderNavContent, SidebarFooter, SidebarHeader } from 'components';
import { Menu, MenuItem, ProSidebarProvider, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logo from 'assets/images/logo.svg';
import { AuthData, UserDataDto } from 'common/interfaces';
import { eRoutes } from 'common/enums';
import { PROFILE } from 'common/labels';

interface HeaderProps {
  navbar: boolean;
  isLoginPage?: boolean;
  userData: AuthData<UserDataDto>;
  pathName: string;
  onLogOut: () => void;
}

const Navbar: React.FC<HeaderProps> = props => {
  const renderButtons = () => {
    if (props.isLoginPage) {
      return null;
    }

    if (props.pathName.startsWith(eRoutes.PROFILE)) {
      return null;
    }

    if (props.userData) {
      return (
        <>
          <Link to={eRoutes.PROFILE} className="theme-btn btn-style-three">
            Go to profile
          </Link>
          <button onClick={props.onLogOut} className="theme-btn btn-style-one mx-3">
            Logout
          </button>
        </>
      );
    }

    return (
      <>
        <Link to={eRoutes.LOGIN} className="theme-btn btn-style-three">
          Login / Register
        </Link>
      </>
    );
  };
  return (
    <>
      <header
        className={`main-header ${
          props.isLoginPage
            ? 'fixed-header'
            : props.navbar && !props.pathName.startsWith(eRoutes.PROFILE)
            ? 'fixed-header animated slideInDown'
            : props.pathName.startsWith(eRoutes.PROFILE)
            ? 'fixed-header header-shaddow'
            : ''
        }`}
      >
        <div className="main-box">
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link to={eRoutes.HOME}>
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

      <header className="main-header main-header-mobile">
        <div className="auto-container">
          <div className="inner-box">
            <div className="nav-outer">
              <div className="logo-box">
                <div className="logo">
                  <Link to={eRoutes.HOME}>
                    <img src={logo} alt="brand" />
                  </Link>
                </div>
              </div>
              <div className="offcanvas offcanvas-start mobile_menu-contnet" tabIndex={-1} id="offcanvasMenu" data-bs-scroll="true">
                <SidebarHeader />
                <ProSidebarProvider>
                  <Sidebar>
                    <Menu>
                      {mobileMenuData.map((item) => (
                        <SubMenu className={isActiveParentChaild(item.items, props.pathName) ? 'menu-active' : ''} label={item.label} key={item.id}>
                          {item.items.map((menuItem, i) => (
                            <MenuItem
                              className={isActiveLink(menuItem.routePath, props.pathName) ? 'menu-active-link' : ''}
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
                <SidebarFooter pathName={props.pathName} onLogOut={props.onLogOut} userData={props.userData} isLoginPage={props.isLoginPage} />
              </div>
            </div>

            <div className="outer-box">
              <a href="#" className="mobile-nav-toggler" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu">
                <span className="flaticon-menu-1"></span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
