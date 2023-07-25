import { Link } from 'react-router-dom';
import jobCatContent from 'common/data/job-catergories';

const JobCategoriesSection = () => {
  return (
    <section className="job-categories">
      <div className="auto-container">
        <div className="sec-title text-center">
          <h2>Popular Job Categories</h2>
          <div className="text">2020 jobs live - 293 added today.</div>
        </div>

        <div className="row" data-aos="fade-up">
          {jobCatContent.slice(0, 8).map((item: any) => (
            <div className="category-block-two col-xl-3 col-lg-4 col-md-6 col-sm-12" key={item.id}>
              <div className="inner-box">
                <div className="content">
                  <span className={`icon ${item.icon}`}></span>
                  <h4>
                    <Link to="/job-list-v2">{item.catTitle}</Link>
                  </h4>
                  <p>({item.jobNumber} open positions)</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCategoriesSection;
