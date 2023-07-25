import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';

const RegisterModule = () => {
  return (
    <div className="form-inner">
      <h3>Create a Free Superio Account</h3>

      <Tabs>
        <div className="form-group register-dual">
          <TabList className="btn-box row">
            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four">
                <i className="la la-user"></i> Candidate
              </button>
            </Tab>

            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four">
                <i className="la la-briefcase"></i> Employer
              </button>
            </Tab>
          </TabList>
        </div>
        {/* End .form-group */}

        <TabPanel>
          <form method="post" action="add-parcel.html">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="username" placeholder="Username" required />
            </div>
            {/* name */}

            <div className="form-group">
              <label>Password</label>
              <input id="password-field" type="password" name="password" placeholder="Password" />
            </div>
            {/* password */}

            <div className="form-group">
              <button className="theme-btn btn-style-one" type="submit">
                Register
              </button>
            </div>
            {/* login */}
          </form>
        </TabPanel>
        {/* End cadidates Form */}

        <TabPanel>
          <form method="post" action="add-parcel.html">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="username" placeholder="Username" required />
            </div>
            {/* name */}

            <div className="form-group">
              <label>Password</label>
              <input id="password-field" type="password" name="password" placeholder="Password" />
            </div>
            {/* password */}

            <div className="form-group">
              <button className="theme-btn btn-style-one" type="submit">
                Register
              </button>
            </div>
            {/* login */}
          </form>
        </TabPanel>
        {/* End Employer Form */}
      </Tabs>
      {/* End form-group */}

      <div className="bottom-box">
        <div className="text">
          Already have an account?{' '}
          <Link to="#" className="call-modal login" data-bs-toggle="modal" data-bs-dismiss="modal" data-bs-target="#loginPopupModal">
            LogIn
          </Link>
        </div>
        <div className="divider">
          <span>or</span>
        </div>
        {/* <LoginWithSocial /> */}
        <div className="btn-box row">
          <div className="col-lg-6 col-md-12">
            <a href="#" className="theme-btn social-btn-two facebook-btn">
              <i className="fab fa-facebook-f"></i> Log In via Facebook
            </a>
          </div>
          <div className="col-lg-6 col-md-12">
            <a href="#" className="theme-btn social-btn-two google-btn">
              <i className="fab fa-google"></i> Log In via Gmail
            </a>
          </div>
        </div>
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default RegisterModule;
