import { isActiveLink } from '../../common/utils';
import { Link, useLocation } from 'react-router-dom';
import { eRoutes } from 'common/enums';

const HeaderNavContent = () => {
  const location = useLocation();

  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          <li className={`${isActiveLink(eRoutes.HOME, location.pathname) ? 'current' : ''}`}>
            <Link to={eRoutes.HOME}>Home</Link>
          </li>
          <li className={`${isActiveLink(eRoutes.JOBLISTING, location.pathname) ? 'current' : ''}`}>
            <Link to={eRoutes.JOBLISTING}>Find Jobs</Link>
          </li>
          <li className={`${isActiveLink(eRoutes.CANDIDATESLISTING, location.pathname) ? 'current' : ''}`}>
            <Link to={eRoutes.CANDIDATESLISTING}>Candidates</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
