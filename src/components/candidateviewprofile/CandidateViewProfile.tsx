import candidates from 'common/data/candidates';
import candidateResume from 'common/data/candidateResume';
import galleryItem from 'common/data/gallery';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { Social } from 'components';

const CandidateViewProfile = () => {
  const [candidate, setCandidates] = useState<any>({});
  const location = useLocation();
  const { slug } = useParams();
  const id = location?.search.split('=')[1];

  useEffect(() => {
    if (!id) <h1>Loading...</h1>;
    else setCandidates(candidates.find((item: any) => item.id == id));

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [id]);

  const skills = ['app', 'administrative', 'android', 'wordpress', 'design', 'react'];

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>
      {/* <!-- Job Detail Section --> */}
      <section className="candidate-detail-section style-three">
        <div className="upper-box">
          <div className="auto-container">
            <div className="candidate-block-six">
              <div className="inner-box">
                <figure className="image">
                  <img src={candidate?.avatar} alt="avatar" />
                </figure>
                <h4 className="name">{candidate?.name}</h4>
                <span className="designation">{candidate?.designation}</span>

                <div className="content">
                  <ul className="post-tags">
                    {candidate?.tags?.map((val: any, i: number) => (
                      <li key={i}>{val}</li>
                    ))}
                  </ul>
                  {/* End post-tags */}

                  <ul className="candidate-info">
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {candidate?.location}
                    </li>
                    <li>
                      <span className="icon flaticon-money"></span> ${candidate?.hourlyRate} / hour
                    </li>
                    <li>
                      <span className="icon flaticon-clock"></span> Member Since,Aug 19, 2020
                    </li>
                  </ul>
                  {/* End candidate-info */}

                  <div className="btn-box">
                    <a className="theme-btn btn-style-one" href="/images/sample.pdf" download>
                      Download CV
                    </a>
                    <button className="bookmark-btn">
                      <i className="flaticon-bookmark"></i>
                    </button>
                  </div>
                  {/* Download cv box */}
                </div>
                {/* End .content */}
              </div>
            </div>
            {/*  <!-- Candidate block Five --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        <div className="candidate-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    <div className="widget-content">
                      <ul className="job-overview">
                        <li>
                          <i className="icon icon-calendar"></i>
                          <h5>Experience:</h5>
                          <span>0-2 Years</span>
                        </li>

                        <li>
                          <i className="icon icon-expiry"></i>
                          <h5>Age:</h5>
                          <span>28-33 Years</span>
                        </li>

                        <li>
                          <i className="icon icon-rate"></i>
                          <h5>Current Salary:</h5>
                          <span>11K - 15K</span>
                        </li>

                        <li>
                          <i className="icon icon-salary"></i>
                          <h5>Expected Salary:</h5>
                          <span>26K - 30K</span>
                        </li>

                        <li>
                          <i className="icon icon-user-2"></i>
                          <h5>Gender:</h5>
                          <span>Female</span>
                        </li>

                        <li>
                          <i className="icon icon-language"></i>
                          <h5>Language:</h5>
                          <span>English, German, Spanish</span>
                        </li>

                        <li>
                          <i className="icon icon-degree"></i>
                          <h5>Education Level:</h5>
                          <span>Master Degree</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget conadidate overview */}

                  <div className="sidebar-widget social-media-widget">
                    <h4 className="widget-title">Social media</h4>
                    <div className="widget-content">
                      <div className="social-links">
                        <Social />
                      </div>
                    </div>
                  </div>
                  {/* End .sidebar-widget social-media-widget */}

                  <div className="sidebar-widget">
                    <h4 className="widget-title">Professional Skills</h4>
                    <div className="widget-content">
                      <ul className="job-skills">
                        <ul className="job-skills">
                          {skills.map((skill, i) => (
                            <li key={i}>
                              <a href="#">{skill}</a>
                            </li>
                          ))}
                        </ul>
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget skill widget */}

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

                            <div className="col-lg-12 col-md-12 col-sm-12 form-group mb-0">
                              <button className="theme-btn btn-style-one" type="submit" name="submit-form">
                                Send Message
                              </button>
                            </div>
                            {/* End .col */}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* End .sidebar-widget contact-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}

              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-detail">
                  <h4>Candidates About</h4>
                  <p>
                    Hello my name is Nicole Wells and web developer from Portland. In pharetra orci dignissim, blandit mi semper, ultricies diam.
                    Suspendisse malesuada suscipit nunc non volutpat. Sed porta nulla id orci laoreet tempor non consequat enim. Sed vitae aliquam
                    velit. Aliquam ante erat, blandit at pretium et, accumsan ac est. Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem
                    condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam.
                  </p>
                  <p>
                    Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at pretium et, accumsan ac est. Integer vehicula rhoncus
                    molestie. Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam.
                    Mauris nec erat ut libero vulputate pulvinar.
                  </p>

                  {/* <!-- Portfolio --> */}
                  <div className="portfolio-outer">
                    <div className="row">
                      <Gallery>
                        {galleryItem.map((singleItem: any) => (
                          <div className="col-lg-3 col-md-3 col-sm-6" key={singleItem.id}>
                            <figure className="image" role="button">
                              <Item original={singleItem.img} thumbnail={singleItem.img} width={190} height={167}>
                                {({ ref, open }) => (
                                  <div className="lightbox-image" ref={ref as any} onClick={open}>
                                    <img src={singleItem.img} alt="resource" /> <span className="icon flaticon-plus"></span>
                                  </div>
                                )}
                              </Item>
                            </figure>
                          </div>
                        ))}
                      </Gallery>
                    </div>
                  </div>

                  {/* <!-- Candidate Resume Start --> */}
                  {candidateResume.map((resume: any) => (
                    <div className={`resume-outer ${resume.themeColor}`} key={resume.id}>
                      <div className="upper-title">
                        <h4>{resume?.title}</h4>
                      </div>

                      {/* <!-- Start Resume BLock --> */}
                      {resume?.blockList?.map((item: any) => (
                        <div className="resume-block" key={item.id}>
                          <div className="inner">
                            <span className="name">{item.meta}</span>
                            <div className="title-box">
                              <div className="info-box">
                                <h3>{item.name}</h3>
                                <span>{item.industry}</span>
                              </div>
                              <div className="edit-box">
                                <span className="year">{item.year}</span>
                              </div>
                            </div>
                            <div className="text">{item.text}</div>
                          </div>
                        </div>
                      ))}

                      {/* <!-- End Resume BLock --> */}
                    </div>
                  ))}
                  {/* <!-- Candidate Resume End --> */}

                  {/* TODO <div className="video-outer">
                    <h4>Intro Video</h4>
                    <AboutVideo />
                  </div> */}
                  {/* <!-- About Video Box --> */}
                </div>
              </div>
              {/* End .content-column */}
            </div>
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}
    </>
  );
};

export default CandidateViewProfile;
