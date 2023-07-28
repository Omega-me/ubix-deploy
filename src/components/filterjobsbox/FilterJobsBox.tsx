import jobs from 'common/data/job-featured';
import { Link } from 'react-router-dom';

const FilterJobBox = () => {
  const jobTypeList = [
    {
      id: 1,
      name: 'Freelancer',
      value: 'freelancer',
      isChecked: false,
    },
    {
      id: 2,
      name: 'Full Time',
      value: 'full-time',
      isChecked: false,
    },
    {
      id: 3,
      name: 'Part Time',
      value: 'part-time',
      isChecked: false,
    },
    {
      id: 4,
      name: 'Temporary',
      value: 'temporary',
      isChecked: false,
    },
  ];
  const datePost = [
    { id: 1, name: 'All', value: 'all', isChecked: false },
    { id: 2, name: 'Last Hour', value: 'last-hour', isChecked: false },
    {
      id: 3,
      name: 'Last 24 Hour',
      value: 'last-24-hour',
      isChecked: false,
    },
    { id: 4, name: 'Last 7 Days', value: 'last-7-days', isChecked: false },
    {
      id: 5,
      name: 'Last 14 Days',
      value: 'last-14-days',
      isChecked: false,
    },
    {
      id: 6,
      name: 'Last 30 Days',
      value: 'last-30-days',
      isChecked: false,
    },
  ];
  const experienceLavel = [
    { id: 1, name: 'Fresh', value: 'fresh', isChecked: false },
    { id: 2, name: '1 Year', value: '1-year', isChecked: false },
    { id: 3, name: '2 Year', value: '2-year', isChecked: false },
    { id: 4, name: '3 Year', value: '3-year', isChecked: false },
    {
      id: 5,
      name: '4 Year',
      value: '4-year',
      isChecked: false,
    },
  ];

  const content = jobs?.map((item) => (
    <div className="job-block col-lg-6 col-md-12 col-sm-12" key={item.id}>
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
            {item?.jobType?.map((val, i) => (
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
    // End all jobs
  ));

  return (
    <>
      <div className="ls-switcher">
        <div className="showing-result">
          <div className="top-filters">
            <div className="form-group">
              <select className="chosen-single form-select">
                <option value="">Job Type</option>
                {jobTypeList?.map((item: any) => (
                  <option value={item.value} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {/* End job type filter */}

            <div className="form-group">
              <select className="chosen-single form-select">
                {datePost?.map((item: any) => (
                  <option value={item.value} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {/* End date posted filter */}

            <div className="form-group">
              <select className="chosen-single form-select">
                <option>Experience Level</option>
                {experienceLavel?.map((item: any) => (
                  <option value={item.value} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {/* End ecperience level filter */}

            <div className="form-group">
              <select className="chosen-single form-select">
                <option
                  value={JSON.stringify({
                    min: 0,
                    max: 20000,
                  })}
                >
                  Salary estimate
                </option>
                <option
                  value={JSON.stringify({
                    min: 0,
                    max: 5000,
                  })}
                >
                  0 - 5000
                </option>
                <option
                  value={JSON.stringify({
                    min: 5000,
                    max: 10000,
                  })}
                >
                  5000 - 10000
                </option>
                <option
                  value={JSON.stringify({
                    min: 10000,
                    max: 15000,
                  })}
                >
                  10000 - 15000
                </option>
                <option
                  value={JSON.stringify({
                    min: 15000,
                    max: 20000,
                  })}
                >
                  15000 - 20000
                </option>
              </select>
            </div>
            {/* End salary estimate filter */}
          </div>
        </div>
        {/* End .showing-result */}

        <div className="sort-by">
          <button className="btn btn-danger text-nowrap me-2" style={{ minHeight: '45px', marginBottom: '15px' }}>
            Clear All
          </button>

          <select className="chosen-single form-select">
            <option value="">Sort by (default)</option>
            <option value="asc">Newest</option>
            <option value="des">Oldest</option>
          </select>
          {/* End select */}

          <select className="chosen-single form-select ms-3 ">
            <option
              value={JSON.stringify({
                start: 0,
                end: 0,
              })}
            >
              All
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 10,
              })}
            >
              10 per page
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 20,
              })}
            >
              20 per page
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 30,
              })}
            >
              30 per page
            </option>
          </select>
          {/* End select */}
        </div>
        {/* End sort by filter */}
      </div>
      {/* <!-- ls Switcher --> */}

      <div className="row">{content}</div>
      {/* End .row with jobs */}

      <nav className="ls-pagination">
        <ul>
          <li className="prev">
            <a href="#">
              <i className="fa fa-arrow-left"></i>
            </a>
          </li>
          <li>
            <a href="#">1</a>
          </li>
          <li>
            <a href="#" className="current-page">
              2
            </a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li className="next">
            <a href="#">
              <i className="fa fa-arrow-right"></i>
            </a>
          </li>
        </ul>
      </nav>
      {/* <!-- End Pagination --> */}
    </>
  );
};

export default FilterJobBox;
