import bannerImg from 'assets/images/resource/banner-img-3.png';

const HomeBannerSection = () => {
  return (
    <section className="banner-section-three">
      <div className="auto-container">
        <div className="row">
          <div className="content-column col-lg-7 col-md-12 col-sm-12">
            <div className="inner-column">
              <div className="title-box" data-aos="fade-up">
                <h3>
                  Welcome <br /> Let’s seek new opportunities!
                </h3>
                {/* <div className="text">Find Jobs, Employment & Career Opportunities</div> */}
              </div>

              {/* <!-- Job Search Form --> */}
              <div className="job-search-form-two" data-aos-delay="500" data-aos="fade-up">
                {/* <SearchForm2 /> */}
                <form>
                  <div className="row">
                    <div className="form-group col-lg-5 col-md-12 col-sm-12">
                      <label className="title">What</label>
                      <span className="icon flaticon-search-1"></span>
                      <input type="text" name="field_name" placeholder="Job title, keywords, or company" />
                    </div>
                    {/* <!-- Form Group --> */}

                    <div className="form-group col-lg-4 col-md-12 col-sm-12 location">
                      <label className="title">Where</label>
                      <span className="icon flaticon-map-locator"></span>
                      <input type="text" name="field_name" placeholder="City or postcode" />
                    </div>
                    {/* <!-- Form Group --> */}

                    <div className="form-group col-lg-3 col-md-12 col-sm-12 btn-box">
                      <button
                        type="submit"
                        className="theme-btn btn-style-one"
                        //</div> onClick={() => Router.push('/job-list-v4')}
                      >
                        <span className="btn-title">Find Jobs</span>
                      </button>
                    </div>
                    {/* <!-- Form Group --> */}
                  </div>
                </form>
              </div>
              {/* <!-- Job Search Form --> */}

              {/* <!-- Popular Search --> */}
              {/* <PopularSearch /> */}
              <div className="popular-searches" data-aos="fade-up" data-aos-delay="1000">
                <span className="title">Popular Searches : </span>
                <a href="#">Designer</a>, <a href="#">Developer</a>, <a href="#">Web</a>,<a href="#"> IOS</a>, <a href="#">PHP</a>,{' '}
                <a href="#">Senior</a>,<a href="#"> Engineer</a>,
              </div>
              {/* <!-- End Popular Search --> */}
            </div>
          </div>

          <div className="image-column col-lg-5 col-md-12">
            {/* <ImageBox /> */}
            <div className="image-box">
              <figure className="main-image" data-aos-delay="1500" data-aos="fade-left">
                <img src={bannerImg} alt="banner-img" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBannerSection;
