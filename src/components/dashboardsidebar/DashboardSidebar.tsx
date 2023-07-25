import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import candidatesuData from 'common/data/candidatesMenuData';
import { isActiveLink } from 'common/utils';
import { Link, useLocation } from 'react-router-dom';

const DashboardCandidatesSidebar = () => {
  const percentage = 30;
  const location = useLocation();

  const sidebarOpen = false;

  return (
    <div className={`user-sidebar ${sidebarOpen ? 'sidebar_open' : ''}`}>
      {/* Start sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon">
          <span className="flaticon-close"></span>
        </div>
      </div>
      {/* End sidebar close icon */}

      <div className="sidebar-inner">
        <ul className="navigation">
          {candidatesuData.map((item: any) => (
            <li className={`${isActiveLink(item.routePath, location.pathname) ? 'active' : ''} mb-1`} key={item.id}>
              <Link to={item.routePath}>
                <i className={`la ${item.icon}`}></i> {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* End navigation */}

        {/* <div className="skills-percentage">
          <h4>Skills Percentage</h4>
          <p>
            `Put value for <strong>Cover Image</strong> field to increase your skill up to <strong>85%</strong>`
          </p>
          <div style={{ width: 200, height: 200, margin: 'auto' }}>
            <CircularProgressbar
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: '#7367F0',
                textColor: '#fff',
                pathColor: '#fff',
                trailColor: 'transparent',
              })}
              value={percentage}
              text={`${percentage}%`}
            />
          </div>{' '}
        </div> */}
      </div>
    </div>
  );
};

export default DashboardCandidatesSidebar;
