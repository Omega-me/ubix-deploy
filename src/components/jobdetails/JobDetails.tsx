import { Link } from 'react-router-dom';
import jobs from 'common/data/job-featured';
import { JobDetailDataDto } from 'common/interfaces';
import { Map } from 'components';
import moment from 'moment';
import maleAvatar from 'assets/images/maleAvatar.png';
import { CHOOSE_YOUR_LOCATION } from 'common/labels';

interface JobDetailsProps {
  jobData: JobDetailDataDto;
}

const JobDetails: React.FC<JobDetailsProps> = (props) => {
  const { jobData } = props;
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

  return (
    <section className="job-detail-section style-three">
      <div className="upper-box">
        <div className="auto-container">
          <div className="job-block-seven style-three">
            <div className="inner-box">
              <div className="content">
                <span className="company-logo">
                  <img src={jobData?.creatorProfileImage ? jobData?.creatorProfileImage : maleAvatar} alt="logo" />
                </span>
                <h4>{jobData?.name}</h4>

                <ul className="job-info">
                  <li>
                    <span className="icon flaticon-briefcase"></span>
                    {jobData?.companyName}
                  </li>
                  {/* compnay info */}
                  <li>
                    <span className="icon flaticon-map-locator"></span>
                    {jobData?.address}, {jobData?.country}
                  </li>
                  {/* location info */}
                  <li>
                    <span className="icon flaticon-clock-3"></span> {moment(jobData?.createdAt).format('MMM Do YY')}
                  </li>
                  {/* time info */}
                  <li>
                    <span className="icon flaticon-money"></span> £{jobData?.salary}
                  </li>
                  {/* salary info */}
                </ul>
                {/* End .job-info */}

                <ul className="job-other-info">
                  {jobData?.tags?.map((val: string, i: number) => (
                    <li key={i} className={`time`}>
                      {val}
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
                {/* <button className="bookmark-btn">
                  <i className="flaticon-bookmark"></i>
                </button> */}
              </div>
              {/* End apply for job btn */}

              {/* <!-- Modal --> */}
              {/* <div className="modal fade" id="applyJobModal" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="apply-modal-content modal-content">
                    <div className="text-center">
                      <h3 className="title">Apply for this job</h3>
                      <button type="button" className="closed-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <ApplyJobModalContent />

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

                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                          <textarea className="darma" name="message" placeholder="Message" required></textarea>
                        </div>

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

                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                          <button className="theme-btn btn-style-one w-100" type="submit" name="submit-form">
                            Apply Job
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="job-detail-outer">
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-8 offset-2 col-md-12 col-sm-12">
              {/* <JobDetailsDescriptions /> */}
              <div className="job-detail">
                <h4>Job Description</h4>
                <p>{jobData?.description}</p>
                <h4>Key Responsibilities</h4>
                {/* <ul className="list-style-three">
                  <li>{jobData?.requirements}</li>
                </ul> */}
                <p>{jobData?.requirements}</p>

                {/* <h4>Skill & Experience</h4>
                <ul className="list-style-three">
                  <li>You have at least 3 years’ experience working as a Product Designer.</li>
                  <li>You have experience using Sketch and InVision or Framer X</li>
                  <li>You have some previous experience working in an agile environment – Think two-week sprints.</li>
                  <li>You are familiar using Jira and Confluence in your workflow</li>
                </ul> */}
              </div>
              {/* End jobdetails content */}

              <div className="job-detail">
                <h4>Location</h4>

                <div className="form-group col-lg-12 col-md-12">
                  <label htmlFor="countryid">{CHOOSE_YOUR_LOCATION}</label>
                  <div className="map-outer">
                    <div style={{ height: '450px', width: '100%' }}>
                      <Map location={jobData?.location} />
                    </div>
                  </div>
                </div>
              </div>

              {jobData?.socials?.length < 0 && (
                <div className="other-options">
                  <div className="social-share">
                    <h5>Social Media</h5>
                    {jobData?.socials?.map((item: string, index: number) => (
                      <a href={item} className={item} target="_blank" rel="noopener noreferrer" key={index}>
                        <i className={`fab ${item}`}></i> {item}
                      </a>
                    ))}
                  </div>
                </div>
              )}

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

              {/* <div className="related-jobs">
                <div className="title-box">
                  <h3>Related Jobs</h3>
                  <div className="text">2020 jobs live - 293 added today.</div>
                </div>

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
                          <li>
                            <span className="icon flaticon-map-locator"></span>
                            {item.location}
                          </li>
                          <li>
                            <span className="icon flaticon-clock-3"></span> {item.time}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span> {item.salary}
                          </li>
                        </ul>

                        <ul className="job-other-info">
                          {(item.jobType as any).map((val: any, i: number) => (
                            <li key={i} className={`${val.styleClass}`}>
                              {val.type}
                            </li>
                          ))}
                        </ul>

                        <button className="bookmark-btn">
                          <span className="flaticon-bookmark"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                  // End job-block
                ))}
              </div> */}
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
