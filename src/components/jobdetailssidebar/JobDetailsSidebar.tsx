import { Social } from 'components';
import { Link } from 'react-router-dom';

interface JobDetailsSidebarProps {
  company?: any;
}

const JobDetailsSidebar: React.FC<JobDetailsSidebarProps> = (props) => {
  const { company } = props;
  return (
    <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
      <aside className="sidebar">
        <div className="btn-box">
          <a href="#" className="theme-btn btn-style-one" data-bs-toggle="modal" data-bs-target="#applyJobModal">
            Apply For Job
          </a>
          <button className="bookmark-btn">
            <i className="flaticon-bookmark"></i>
          </button>
        </div>
        {/* End apply for job btn */}

        {/* <!-- Modal --> */}
        <div className="modal fade" id="applyJobModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="apply-modal-content modal-content">
              <div className="text-center">
                <h3 className="title">Apply for this job</h3>
                <button type="button" className="closed-modal" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              {/* End modal-header */}

              {/* <ApplyJobModalContent /> */}
              <form className="default-form job-apply-form">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                    <div className="uploading-outer apply-cv-outer">
                      <div className="uploadButton">
                        <input
                          className="uploadButton-input"
                          type="file"
                          name="attachments[]"
                          accept="image/*, application/pdf"
                          id="upload"
                          multiple
                          required
                        />
                        <label className="uploadButton-button ripple-effect" htmlFor="upload">
                          Upload CV (doc, docx, pdf)
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* End .col */}

                  <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                    <textarea className="darma" name="message" placeholder="Message" required></textarea>
                  </div>
                  {/* End .col */}

                  <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                    <div className="input-group checkboxes square">
                      <input type="checkbox" name="remember-me" id="rememberMe" />
                      <label htmlFor="rememberMe" className="remember">
                        <span className="custom-checkbox"></span> You accept our{' '}
                        <span data-bs-dismiss="modal">
                          <Link to="/terms">Terms and Conditions and Privacy Policy</Link>
                        </span>
                      </label>
                    </div>
                  </div>
                  {/* End .col */}

                  <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                    <button className="theme-btn btn-style-one w-100" type="submit" name="submit-form">
                      Apply Job
                    </button>
                  </div>
                  {/* End .col */}
                </div>
              </form>
              {/* End PrivateMessageBox */}
            </div>
            {/* End .send-private-message-wrapper */}
          </div>
        </div>
        {/* End .modal */}

        <div className="sidebar-widget company-widget">
          <div className="widget-content">
            <div className="company-title">
              <div className="company-logo">
                <img src={company.logo} alt="resource" />
              </div>
              <h5 className="company-name">{company.company}</h5>
              <a href="#" className="profile-link">
                View company profile
              </a>
            </div>
            {/* End company title */}

            {/* <CompnayInfo /> */}

            <ul className="company-info">
              <li>
                Primary industry: <span>Software</span>
              </li>
              <li>
                Company size: <span>501-1,000</span>
              </li>
              <li>
                Founded in: <span>2011</span>
              </li>
              <li>
                Phone: <span>123 456 7890</span>
              </li>
              <li>
                Email: <span>info@joio.com</span>
              </li>
              <li>
                Location: <span>London, UK</span>
              </li>
              <li>
                Social media:
                <Social />
              </li>
            </ul>

            <div className="btn-box">
              <a href="#" target="_blank" rel="noopener noreferrer" className="theme-btn btn-style-three">
                {company?.link}
              </a>
            </div>
            {/* End btn-box */}
          </div>
        </div>
        {/* End .company-widget */}

        <div className="sidebar-widget contact-widget">
          <h4 className="widget-title">Contact Us</h4>
          <div className="widget-content">
            <div className="default-form">
              {/* <Contact /> */}

              <form>
                <div className="row clearfix">
                  <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                    <input type="text" name="username" placeholder="Your Name" required />
                  </div>
                  {/* End .col */}

                  <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                    <input type="email" name="email" placeholder="Email Address" required />
                  </div>
                  {/* End .col */}

                  <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                    <textarea className="darma" name="message" placeholder="Message"></textarea>
                  </div>
                  {/* End .col */}

                  <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                    <button className="theme-btn btn-style-one" type="submit" name="submit-form">
                      Send Message
                    </button>
                  </div>
                  {/* End .col */}
                </div>
              </form>
            </div>
            {/* End .default-form */}
          </div>
        </div>
        {/* End contact-widget */}
      </aside>
      {/* End .sidebar */}
    </div>
  );
};

export default JobDetailsSidebar;
