import { Link } from 'react-router-dom';
import logo from 'assets/images/logo.svg';
import { eRoutes } from 'common/enums';

const SidebarHeader = () => {
  return (
    <div className="pro-header">
      <Link to={eRoutes.HOME}>
        <img src={logo} alt="brand" />
      </Link>
      {/* End logo */}

      <div className="fix-icon" data-bs-dismiss="offcanvas" aria-label="Close">
        <span className="flaticon-close"></span>
      </div>
      {/* icon close */}
    </div>
  );
};

export default SidebarHeader;
