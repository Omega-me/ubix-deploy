/* eslint-disable @typescript-eslint/no-explicit-any */
import candidatesuData from 'common/data/candidatesMenuData';
import { isActiveLink } from 'common/utils';
import { Link } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';

interface ProfileSidebarProps {
  location: Location;
  onLogOut: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = props => {
  const { location, onLogOut } = props;
  const pathName = location.pathname.split('/');
  const sidebarOpen = false;

  return (
    <div className={`user-sidebar ${sidebarOpen ? 'sidebar_open' : ''}`}>
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon">
          <span className="flaticon-close"></span>
        </div>
      </div>

      <div className="sidebar-inner">
        <ul className="navigation">
          {candidatesuData.map((item: any) =>
            pathName.length < 3 ? (
              <li className={`${isActiveLink(item.routePath, location.pathname) ? 'active' : ''} mb-1`} key={item.id}>
                <Link to={item.routePath}>
                  <i className={`la ${item.icon}`}></i> {item.name}
                </Link>
              </li>
            ) : (
              <li className={`${isActiveLink(item.routePath.split('/')[2], pathName[2]) ? 'active' : ''} mb-1`} key={item.id}>
                <Link to={item.routePath}>
                  <i className={`la ${item.icon}`}></i> {item.name}
                </Link>
              </li>
            ),
          )}

          <li onClick={onLogOut}>
            <a>
              <i className="la la-sign-out"></i> Logout
            </a>
          </li>
          <li onClick={() => console.log('Delete profile')}>
            <a>
              <i className="la la-trash"></i> Delete profile
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;
