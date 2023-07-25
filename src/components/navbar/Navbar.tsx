import { mobileMenuData } from 'common/data';
import { isActiveParentChaild, isActiveLink } from 'common/utils';
import { HeaderNavContent, SidebarFooter, SidebarHeader } from 'components';
import { Menu, MenuItem, ProSidebarProvider, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logo from 'assets/images/logo.svg';

interface HeaderProps {
  navbar: boolean;
}

const Navbar: React.FC<HeaderProps> = (props) => {
  return (
    <>
      {/* Navbar */}
      <header className={`main-header  ${props.navbar ? 'fixed-header animated slideInDown' : ''}`}>
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="brand" />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <HeaderNavContent />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            {/* <!-- Add Listing --> */}
            {/* <Link to="/candidates-dashboard/cv-manager" className="upload-cv">
              Upload your CV
            </Link> */}
            {/* <!-- Login/Register --> */}
            <div className="btn-box">
              <Link to="/login" className="theme-btn btn-style-three call-modal">
                Login / Register
              </Link>
              <Link to="/employers-dashboard/post-jobs" className="theme-btn btn-style-one">
                Job Post
              </Link>
            </div>
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
                <SidebarFooter />
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
      {/* <SignupLoginModal id="loginPopupModal" useAuth={props.useAuth} />
      <SignupLoginModal id="registerModal" useAuth={props.useAuth} />
      <SignupLoginModal id="forgotPassword" useAuth={props.useAuth} /> */}
    </>
  );
};

export default Navbar;
