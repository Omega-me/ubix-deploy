import { Link } from 'react-router-dom';
import img3 from 'assets/images/resource/image-3.png';

const AboutSection = () => {
  const applicantsContent = [
    {
      id: 1,
      avatar: 'images/resource/applicant-1.png',
      name: 'Brooklyn Simmons',
      designation: 'Web Developer',
    },
    {
      id: 2,
      avatar: 'images/resource/applicant-2.png',
      name: 'Courtney Henry',
      designation: 'Web Developer',
    },
    {
      id: 3,
      avatar: 'images/resource/applicant-3.png',
      name: 'Marvin McKinney',
      designation: 'Web Developer',
    },
  ];
  return (
    <section className="about-section-two">
      <div className="auto-container">
        <div className="row">
          {/* <About2 /> */}

          {/* <!-- Content Column --> */}
          <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
            <div className="inner-column" data-aos="fade-left">
              <div className="sec-title">
                <h2>
                  Get applications from the <br />
                  world best talents.
                </h2>
                <div className="text">
                  Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000 companies
                  worldwide.
                </div>
              </div>
              <ul className="list-style-one">
                <li>Bring to the table win-win survival</li>
                <li>Capitalize on low hanging fruit to identify</li>
                <li>But I must explain to you how all this</li>
              </ul>
              <Link to="/employers-dashboard/post-jobs" className="theme-btn btn-style-one">
                Post a Job
              </Link>
            </div>
          </div>
          {/* End .content-column */}

          {/* <!-- Image Column --> */}
          <div className="image-column col-lg-6 col-md-12 col-sm-12">
            <figure className="image-box" data-aos="fade-right">
              <img src={img3} alt="resource" />
            </figure>

            {/* <!-- Count Employers --> */}
            <div className="applicants-list" data-aos="fade-up">
              <div className="title-box">
                <h4>Applicants List</h4>
              </div>
              <ul className="applicants">
                {/* <ApplicantsList /> */}
                {applicantsContent.map((applicants) => (
                  <li className="applicant" key={applicants.id}>
                    <figure className="image">
                      <img src={applicants.avatar} alt="resource" />
                    </figure>
                    <h4 className="name">{applicants.name}</h4>
                    <span className="designation">{applicants.designation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* End image-column */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
