import { AuthData, UserDataDto } from 'common/interfaces';
import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarFooterProps {
  isLoginPage?: boolean;
  userData: AuthData<UserDataDto>;
  signOut: () => Promise<void>;
}

const SidebarFooter: React.FC<SidebarFooterProps> = props => {
  const socialContent = [
    { id: 1, icon: 'fa-facebook-f', link: 'https://www.facebook.com/' },
    { id: 2, icon: 'fa-twitter', link: 'https://www.twitter.com/' },
    { id: 3, icon: 'fa-instagram', link: 'https://www.instagram.com/' },
    { id: 4, icon: 'fa-linkedin-in', link: 'https://www.linkedin.com/' },
  ];

  const renderButton = () => {
    if (props.isLoginPage) {
      return null;
    }

    if (props.userData) {
      return (
        <>
          <Link to="/profile" className="theme-btn btn-style-one mm-listitem__text">
            Go to profile
          </Link>
          <button onClick={props.signOut} className="theme-btn btn-style-two mm-listitem__text my-3">
            Logout
          </button>
        </>
      );
    }

    return (
      <>
        <Link to="/login" className="theme-btn btn-style-one mm-listitem__text">
          Login / Register
        </Link>
      </>
    );
  };

  return (
    <div className="mm-add-listing mm-listitem pro-footer">
      {renderButton()}
      {/* job post btn */}
      <div className="mm-listitem__text">
        <div className="contact-info">
          <span className="phone-num">
            <span>Call us</span>
            <a href="tel:1234567890">123 456 7890</a>
          </span>
          <span className="address">
            329 Queensberry Street, North Melbourne VIC <br />
            3051, Australia.
          </span>
          <a href="mailto:support@superio.com" className="email">
            support@superio.com
          </a>
        </div>
        {/* End .contact-info */}

        <div className="social-links">
          {socialContent.map(item => (
            <a href={item.link} target="_blank" rel="noopener noreferrer" key={item.id}>
              <i className={`fab ${item.icon}`}></i>
            </a>
          ))}
        </div>
        {/* End social-links */}
      </div>
      {/* End .mm-listitem__text */}
    </div>
  );
};

export default SidebarFooter;
