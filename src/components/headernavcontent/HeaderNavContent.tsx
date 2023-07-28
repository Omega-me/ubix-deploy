import { blogItems, pageItems, shopItems } from 'common/data';
import { isActiveLink, isActiveParentChaild } from '../../common/utils';
import { Link, useLocation } from 'react-router-dom';

const HeaderNavContent = () => {
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
          {/* End Employers menu items */}{' '}
          <li className={`${isActiveLink('/candidateslisting', location.pathname) ? 'current' : ''}`}>
            <Link to="candidateslisting">Candidates</Link>
          </li>
          <li className={`${isActiveLink('/profile', location.pathname) ? 'current' : ''}`}>
            <Link to="/profile">Profile</Link>
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
