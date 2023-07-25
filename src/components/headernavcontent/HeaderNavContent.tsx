import { blogItems, candidateItems, employerItems, findJobItems, homeItems, pageItems, shopItems } from 'common/data';
import { isActiveParent, isActiveLink, isActiveParentChaild } from '../../common/utils';
import { Link, useLocation } from 'react-router-dom';

const HeaderNavContent = () => {
  // const router = useRouter();
  const location = useLocation();

  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}
          <li className={`${isActiveLink('/', location.pathname) ? 'current' : ''}`}>
            <Link to="/">Home</Link>
          </li>
          {/* End homepage menu items */}
          <li className={`${isActiveLink('/jobListing', location.pathname) ? 'current' : ''}`} id="has-mega-menu">
            <Link to="jobListing">Find Jobs</Link>
          </li>
          {/* End findjobs menu items */}
          {/* <li
            className={`${
              isActiveParent(employerItems, location.pathname) || location.pathname === '/employers-dashboard/dashboard' ? 'current' : ''
            } dropdown`}>
            <>Employers</>
            <ul>
                {employerItems.map((item) => (
                  <li className="dropdown" key={item.id}>
                    <span className={isActiveParentChaild(item.items, location.pathname) ? 'current' : ''}>{item.title}</span>
                    <ul>
                      {item.items.map((menu, i) => (
                        <li className={isActiveLink(menu.routePath, location.pathname) ? 'current' : ''} key={i}>
                          <Link to={menu.routePath}>{menu.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
                <li className={isActiveLink('/employers-dashboard/dashboard', location.pathname) ? 'current' : ''}>
                  <Link to="/employers-dashboard/dashboard">Employers Dashboard</Link>
                </li>
              </ul>
          </li> */}
          {/* End Employers menu items */}{' '}
          <li className={`${isActiveLink('/candidateslisting', location.pathname) ? 'current' : ''}`}>
            <Link to="candidateslisting">Candidates</Link>
          </li>
          <li className={`${isActiveLink('/dashboard', location.pathname) ? 'current' : ''}`}>
            <Link to="dashboard">Dashboard</Link>
          </li>
          {/* End Candidates menu items */}
          <li className={`${isActiveParentChaild(blogItems, location.pathname) ? 'current' : ''} dropdown`}>
            <span>Blog</span>
            <ul>
              {blogItems.map((item, i) => (
                <li className={isActiveLink(item.routePath, location.pathname) ? 'current' : ''} key={i}>
                  <Link to={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>
          {/* End Blog menu items */}
          <li
            className={`${
              isActiveParentChaild(pageItems, location.pathname) || isActiveParentChaild(shopItems[0].items, location.pathname) ? 'current ' : ''
            } dropdown`}
          >
            <span>Pages</span>
            <ul>
              {shopItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span className={`${isActiveParentChaild(shopItems[0].items, location.pathname) ? 'current ' : ''}`}>{item.title}</span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li className={isActiveLink(menu.routePath, location.pathname) ? 'current' : ''} key={i}>
                        <Link to={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              {pageItems.map((item, i) => (
                <li className={isActiveLink(item.routePath, location.pathname) ? 'current' : ''} key={i}>
                  <Link to={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>
          {/* End Pages menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
