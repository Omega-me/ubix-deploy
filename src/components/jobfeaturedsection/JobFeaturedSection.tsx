import jobFeatured from 'common/data/job-featured';
import { Link } from 'react-router-dom';

const JobFeaturedSection = () => {
  return (
    <section className="job-section">
      <div className="auto-container">
        <div className="sec-title text-center">
          <h2>Top Rated</h2>
          <div className="text">Know your worth and find the job that qualify your life</div>
        </div>
        {/* End .sec-title */}

        <div className="row" data-aos="fade-up">
          {jobFeatured.slice(11, 20).map((item: any) => (
            <div className="job-block-three col-lg-4 col-md-6 col-sm-12" key={item.id}>
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <img src={item.logo} alt="item brand" />
                  </span>
                  <h4>
                    <Link to={`/job-single-v4/${item.id}`}>{item.jobTitle}</Link>
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
                  </ul>
                  {/* End .job-info */}

                  <ul className="job-other-info">
                    {item.jobType.map((val: any, i: number) => (
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
        <div className="btn-box">
          <Link to="/job-list-v3" className="theme-btn btn-style-one bg-blue">
            <span className="btn-title">Load More Listing</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobFeaturedSection;
