import { FilterJobsBox } from 'components';

const JobListing = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      {/* <span className="header-span"></span> */}
      <section className="page-title style-two">
        <div className="auto-container">
          <div className="job-search-form">
            <div className="row">
              <div className="form-group col-lg-4 col-md-12 col-sm-12">
                <input type="text" name="listing-search" placeholder="Job title, keywords, or company" />
                <span className="icon flaticon-search-3"></span>
              </div>
              {/* <!-- Form Group --> */}

              <div className="form-group col-lg-3 col-md-12 col-sm-12 location">
                <input type="text" name="listing-search" placeholder="City or postcode" />
                <span className="icon flaticon-map-locator"></span>
              </div>
              {/* <!-- Form Group --> */}

              <div className="form-group col-lg-3 col-md-12 col-sm-12 location">
                <select className="form-select">
                  <option value="">Choose a category</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="apartments">Apartments</option>
                </select>
                <span className="icon flaticon-briefcase"></span>
              </div>
              {/* <!-- Form Group --> */}

              <div className="form-group col-lg-2 col-md-12 col-sm-12 text-right">
                <button type="submit" className="theme-btn btn-style-one">
                  Find Jobs
                </button>
              </div>
              {/* <!-- Form Group --> */}
            </div>
          </div>
          {/* <!-- Job Search Form --> */}
        </div>
      </section>
      {/* <!--End Page Title--> */}

      <section className="ls-section">
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-12">
              <div className="ls-outer">
                <FilterJobsBox />
              </div>
            </div>
            {/* <!-- End Content Column --> */}
          </div>
          {/* End row */}
        </div>
        {/* End container */}
      </section>
      {/* <!--End Listing Page Section --> */}
      {/* <!--End Listing Page Section --> */}

      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default JobListing;
