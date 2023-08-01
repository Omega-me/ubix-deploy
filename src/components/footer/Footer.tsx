import { Link } from 'react-router-dom';
import { footerContentData, socialsData } from 'common/data';
import logo from 'assets/images/logo.svg';

interface FooterProps {
  footerStyle?: string | '';
}

const Footer: React.FC<FooterProps> = (props) => {
  const { footerStyle } = props;
  return (
    <footer className={`main-footer ${footerStyle}`} style={{ zIndex: 99 }}>
      <div className="auto-container">
        {/* <!--Widgets Section--> */}
        <div className="widgets-section" data-aos="fade-up">
          <div className="row">
            <div className="big-column col-xl-4 col-lg-3 col-md-12">
              <div className="footer-column about-widget">
                <div className="logo">
                  <a href="#">
                    <img src={logo} alt="brand" />
                  </a>
                </div>
                <p className="phone-num">
                  <span>Call us </span>
                  <a href="thebeehost@support.com">123 456 7890</a>
                </p>
                <p className="address">
                  329 Queensberry Street, North Melbourne VIC
                  <br /> 3051, Australia. <br />
                  <a href="mailto:support@ubix.com" className="email">
                    support@ubix.com
                  </a>
                </p>
              </div>
            </div>
            {/* End footer left widget */}

            <div className="big-column col-xl-8 col-lg-9 col-md-12">
              <div className="row">
                {/*  eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {footerContentData.map((item: any) => (
                  <div className="footer-column col-lg-3 col-md-6 col-sm-12" key={item.id}>
                    <div className="footer-widget links-widget">
                      <h4 className="widget-title">{item.title}</h4>
                      <div className="widget-content">
                        <ul className="list">
                          {/*  eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {item?.menuList?.map((menu: any, i: number) => (
                            <li key={i}>
                              <Link to={menu.route}>{menu.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* End col-xl-8 */}
          </div>
        </div>
      </div>
      {/* End auto-container */}

      <div className="footer-bottom">
        <div className="auto-container">
          <div className="outer-box">
            <div className="copyright-text">
              © {new Date().getFullYear()} Ubix{' '}
              {/* <a href="https://themeforest.net/user/ib-themes" target="_blank" rel="noopener noreferrer">
                ib-themes
              </a> */}
              . All Right Reserved.
            </div>
            <div className="social-links">
              {socialsData.map((item) => (
                <a href={item.link} target="_blank" rel="noopener noreferrer" key={item.id}>
                  <i className={`fab ${item.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <!--Bottom--> */}
    </footer>
    //   {/* <!-- End Main Footer --> */}
  );
};

export default Footer;
