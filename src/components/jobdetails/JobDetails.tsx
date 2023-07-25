import jobs from 'common/data/job-featured';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { JobDetailsSidebar } from 'components';

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
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>
      {/* <!-- Job Detail Section --> */}
      <section className="job-detail-section">
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-block-outer">
                  <div className="job-block-seven style-two">
                    <div className="inner-box">
                      <div className="content">
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
                    </div>
                  </div>
                  {/* <!-- Job Block --> */}
                </div>
                {/* <!-- job block outer --> */}

                <div className="job-overview-two">
                  <h4>Job Description</h4>
                  {/* <JobOverView2 /> */}
                  <ul>
                    <li>
                      <i className="icon icon-calendar"></i>
                      <h5>Date Posted:</h5>
                      <span>Posted 1 hours ago</span>
                    </li>
                    <li>
                      <i className="icon icon-expiry"></i>
                      <h5>Expiration date:</h5>
                      <span>April 06, 2021</span>
                    </li>
                    <li>
                      <i className="icon icon-location"></i>
                      <h5>Location:</h5>
                      <span>London, UK</span>
                    </li>
                    <li>
                      <i className="icon icon-user-2"></i>
                      <h5>Job Title:</h5>
                      <span>Designer</span>
                    </li>
                    <li>
                      <i className="icon icon-clock"></i>
                      <h5>Hours:</h5>
                      <span>50h / week</span>
                    </li>
                    <li>
                      <i className="icon icon-rate"></i>
                      <h5>Rate:</h5>
                      <span>$15 - $25 / hour</span>
                    </li>
                    <li>
                      <i className="icon icon-salary"></i>
                      <h5>Salary:</h5>
                      <span>$35k - $45k</span>
                    </li>
                  </ul>
                </div>
                {/* <!-- job-overview-two --> */}

                {/* <JobDetailsDescriptions /> */}
                <div className="job-detail">
                  <h4>Job Description</h4>
                  <p>
                    As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will
                    help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on
                    building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to
                    segue your career into the FinTech or Big Data arenas.
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
                      Contribute to sketching sessions involving non-designersCreate, iterate and maintain UI deliverables including sketch files,
                      style guides, high fidelity prototypes, micro interaction specifications and pattern libraries.
                    </li>
                    <li>
                      Ensure design choices are data led by identifying assumptions to test each sprint, and work with the analysts in your team to
                      plan moderated usability test sessions.
                    </li>
                    <li>
                      Design pixel perfect responsive UI’s and understand that adopting common interface patterns is better for UX than reinventing
                      the wheel
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
                {/* End job-details */}

                <div className="other-options">
                  <div className="social-share">
                    <h5>Share this job</h5>
                    {/* <SocialTwo /> */}
                    {socialContent.map((item) => (
                      <a href={item.link} className={item.iconClass} target="_blank" rel="noopener noreferrer" key={item.id}>
                        <i className={`fab ${item.icon}`}></i> {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                {/* <!-- Other Options --> */}
              </div>
              {/* End .content-column */}

              <JobDetailsSidebar company={company} />
              {/* End .sidebar-column */}
            </div>
            {/* End .row  */}

            <div className="related-jobs">
              <div className="title-box">
                <h3>Related Jobs</h3>
                <div className="text">2020 jobs live - 293 added today.</div>
              </div>
              {/* End title box */}

              <div className="row">
                {/* <RelatedJobs2 /> */}

                {jobs.slice(20, 24).map((item: any) => (
                  <div className="job-block-four col-xl-3 col-lg-4 col-md-6 col-sm-12" key={item.id}>
                    <div className="inner-box">
                      <ul className="job-other-info">
                        {item.jobType.map((val: any, i: number) => (
                          <li key={i} className={`${val.styleClass}`}>
                            {val.type}
                          </li>
                        ))}
                      </ul>
                      <span className="company-logo">
                        <img src={item.logo} alt="featured job" />
                      </span>
                      <span className="company-name">{item.company}</span>
                      <h4>
                        <Link to={`/job-single-v3/${item.id}`}>{item.jobTitle}</Link>
                      </h4>
                      <div className="location">
                        <span className="icon flaticon-map-locator"></span>
                        {item.location}
                      </div>
                    </div>
                  </div>
                  // End job-block
                ))}
              </div>
              {/* End .row */}
            </div>
            {/* <!-- Related Jobs --> */}
          </div>
          {/* End auto-container */}
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}
    </>
  );
};

export default JobDetails;
