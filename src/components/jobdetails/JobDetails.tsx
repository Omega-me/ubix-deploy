import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import jobs from 'common/data/job-featured';

const JobDetails = () => {
  const [company, setCompany] = useState<any>({});
  const location = useLocation();
  const { slug } = useParams();
  const id = location?.search.split('=')[1];

  const socialContent = [
    {
      id: 1,
      name: 'Facebook',
      icon: 'fa-facebook-f',
      iconClass: 'facebook',
      link: 'https://www.facebook.com/',
    },
    {
      id: 2,
      name: 'Twitter',
      icon: 'fa-twitter',
      iconClass: 'twitter',
      link: 'https://www.twitter.com/',
    },
    {
      id: 3,
      name: 'Linkedin',
      icon: 'fa-likedin',
      iconClass: 'linkedin',
      link: 'https://www.linkedin.com/',
    },
  ];

  useEffect(() => {
    if (!id) <h1>Loading...</h1>;
    else setCompany(jobs.find((item: any) => item.id == id) as any);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [id]);

  return (
    <section className="job-detail-section style-three">
      <div className="upper-box">
        <div className="auto-container">
          <div className="job-block-seven style-three">
            <div className="inner-box">
              <div className="content">
                <span className="company-logo">
                  <img src={company?.logo} alt="logo" />
                </span>
                <h4>{company?.jobTitle}</h4>

                <ul className="job-info">
                  <li>
                    <span className="icon flaticon-briefcase"></span>
                    {company?.company}
                  </li>
                  {/* compnay info */}
                  <li>
                    <span className="icon flaticon-map-locator"></span>
                    {company?.location}
                  </li>
                  {/* location info */}
                  <li>
                    <span className="icon flaticon-clock-3"></span> {company?.time}
                  </li>
                  {/* time info */}
                  <li>
                    <span className="icon flaticon-money"></span> {company?.salary}
                  </li>
                  {/* salary info */}
                </ul>
                {/* End .job-info */}

                <ul className="job-other-info">
                  {company?.jobType?.map((val: any, i: number) => (
                    <li key={i} className={`${val.styleClass}`}>
                      {val.type}
                    </li>
                  ))}
                </ul>
                {/* End .job-other-info */}
              </div>
              {/* End .content */}

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
            </div>
          </div>
          {/* <!-- Job Block --> */}
        </div>
      </div>
      {/* <!-- Upper Box --> */}

      <div className="job-detail-outer">
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-8 offset-2 col-md-12 col-sm-12">
              {/* <JobDetailsDescriptions /> */}
              <div className="job-detail">
                <h4>Job Description</h4>
                <p>
                  As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will
                  help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on
                  building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue
                  your career into the FinTech or Big Data arenas.
                </p>
                <h4>Key Responsibilities</h4>
                <ul className="list-style-three">
                  <li>Be involved in every step of the product design cycle from discovery to developer handoff and user acceptance testing.</li>
                  <li>Work with BAs, product managers and tech teams to lead the Product Design</li>
                  <li>
                    Maintain quality of the design process and ensure that when designs are translated into code they accurately reflect the design
                    specifications.
                  </li>
                  <li>Accurately estimate design tickets during planning sessions.</li>
                  <li>
                    Contribute to sketching sessions involving non-designersCreate, iterate and maintain UI deliverables including sketch files, style
                    guides, high fidelity prototypes, micro interaction specifications and pattern libraries.
                  </li>
                  <li>
                    Ensure design choices are data led by identifying assumptions to test each sprint, and work with the analysts in your team to plan
                    moderated usability test sessions.
                  </li>
                  <li>
                    Design pixel perfect responsive UI’s and understand that adopting common interface patterns is better for UX than reinventing the
                    wheel
                  </li>
                  <li>Present your work to the wider business at Show & Tell sessions.</li>
                </ul>
                <h4>Skill & Experience</h4>
                <ul className="list-style-three">
                  <li>You have at least 3 years’ experience working as a Product Designer.</li>
                  <li>You have experience using Sketch and InVision or Framer X</li>
                  <li>You have some previous experience working in an agile environment – Think two-week sprints.</li>
                  <li>You are familiar using Jira and Confluence in your workflow</li>
                </ul>
              </div>
              {/* End jobdetails content */}

              <div className="other-options">
                <div className="social-share">
                  <h5>Share this job</h5>
                  {socialContent.map((item) => (
                    <a href={item.link} className={item.iconClass} target="_blank" rel="noopener noreferrer" key={item.id}>
                      <i className={`fab ${item.icon}`}></i> {item.name}
                    </a>
                  ))}
                </div>
              </div>
              {/* <!-- Other Options --> */}

              <div className="related-jobs">
                <div className="title-box">
                  <h3>Related Jobs</h3>
                  <div className="text">2020 jobs live - 293 added today.</div>
                </div>
                {/* End title box */}

                {jobs.slice(3, 7).map((item) => (
                  <div className="job-block" key={item.id}>
                    <div className="inner-box">
                      <div className="content">
                        <span className="company-logo">
                          <img src={item.logo} alt="item brand" />
                        </span>
                        <h4>
                          <Link to={`/job-single-v1/${item.id}`}>{item.jobTitle}</Link>
                        </h4>

                        <ul className="job-info">
                          <li>
                            <span className="icon flaticon-briefcase"></span>
                            {item.company}
                          </li>
                          {/* compnay info */}
                          <li>
                            <span className="icon flaticon-map-locator"></span>
                            {item.location}
                          </li>
                          {/* location info */}
                          <li>
                            <span className="icon flaticon-clock-3"></span> {item.time}
                          </li>
                          {/* time info */}
                          <li>
                            <span className="icon flaticon-money"></span> {item.salary}
                          </li>
                          {/* salary info */}
                        </ul>
                        {/* End .job-info */}

                        <ul className="job-other-info">
                          {(item.jobType as any).map((val: any, i: number) => (
                            <li key={i} className={`${val.styleClass}`}>
                              {val.type}
                            </li>
                          ))}
                        </ul>
                        {/* End .job-other-info */}

                        <button className="bookmark-btn">
                          <span className="flaticon-bookmark"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                  // End job-block
                ))}
              </div>
              {/* <!-- Related Jobs --> */}
            </div>
            {/* End .content-column */}
          </div>
        </div>
      </div>
      {/* <!-- job-detail-outer--> */}
    </section>
  );
};

export default JobDetails;
