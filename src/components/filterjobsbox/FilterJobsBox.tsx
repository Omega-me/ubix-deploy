import { JobDataDto } from 'common/interfaces';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Loading } from 'components';
import noJobs from 'assets/images/no-jobs.png';
import { eRoutes } from 'common/enums';
interface FilterJobBoxProps {
  jobsProps: {
    jobs: JobDataDto[];
    setPage: React.Dispatch<React.SetStateAction<number>>;
    pages: number[];
    page: number;
    isLoading: boolean;
  };
}

const FilterJobBox: React.FC<FilterJobBoxProps> = (props) => {
  const content = props?.jobsProps?.jobs?.map((item) => (
    <div className="job-block col-lg-6 col-md-12 col-sm-12" key={item.id}>
      <div className="inner-box">
        <div className="content">
          <span className="company-logo">
            <img src={item?.profileImage as any} alt="item brand" />
          </span>
          <h4>
            <Link to={`${eRoutes.JOBLISTING}/${item.name}?id=${item.id}`}>{item?.name}</Link>
          </h4>

          <ul className="job-info">
            <li>
              <span className="icon flaticon-briefcase"></span>
              {item.fullName}
            </li>
            {/* compnay info */}
            <li>
              <span className="icon flaticon-map-locator"></span>
              {item.address}
            </li>
            {/* location info */}
            <li>
              <span className="icon flaticon-clock-3"></span> {moment(item.createdAt).format('MMM Do YY')}
            </li>
            {/* time info */}
            <li>
              <span className="icon flaticon-money"></span> £{item.salary}
            </li>
            {/* salary info */}
          </ul>
          {/* End .job-info */}

          {/* <ul className="job-other-info">
            {item?.jobType?.map((val, i) => (
              <li key={i} className={`${val.styleClass}`}>
                {val.type}
              </li>
            ))}
          </ul> */}
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
      {/* <div className="ls-switcher">
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

            <div className="form-group">
              <select className="chosen-single form-select">
                {rating?.map((item: any) => (
                  <option value={item.value} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

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
          </div>
        </div>

        /* <div className="sort-by">
          <button className="btn btn-danger text-nowrap me-2" style={{ minHeight: '45px', marginBottom: '15px' }}>
            Clear All
          </button>

          <select className="chosen-single form-select">
            <option value="">Sort by (default)</option>
            <option value="asc">Newest</option>
            <option value="des">Oldest</option>
          </select>

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
        </div> *'/
      </div> */}

      <div className="row">
        {props?.jobsProps?.isLoading ? (
          <Loading />
        ) : props?.jobsProps?.jobs?.length > 0 ? (
          content
        ) : (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <img src={noJobs} alt="No jobs foound!" />
            <div>There are no available job openings. However, we encourage you to check notifications when new job openings become available.</div>
          </div>
        )}
      </div>
      {/* End .row with jobs */}

      {props?.jobsProps?.jobs?.length > 0 && (
        <nav className="ls-pagination">
          <ul>
            {props?.jobsProps?.pages?.length >= 2 && props?.jobsProps?.page !== 1 && (
              <>
                <li className="prev" onClick={() => props?.jobsProps?.setPage(props?.jobsProps?.page - 1)}>
                  <a>
                    <i className="fa fa-arrow-left"></i>
                  </a>
                </li>
                <li onClick={() => props?.jobsProps?.setPage(props?.jobsProps?.page - 1)}>
                  <a>{props?.jobsProps?.page - 1}</a>
                </li>
              </>
            )}
            <li>
              <a className="current-page">{props?.jobsProps?.page}</a>
            </li>
            {props?.jobsProps?.pages?.length <= 2 && props?.jobsProps?.page !== props?.jobsProps.pages?.length && (
              <>
                <li onClick={() => props?.jobsProps?.setPage(props?.jobsProps?.page + 1)}>
                  <a>{props?.jobsProps?.page + 1}</a>
                </li>
                <li className="next" onClick={() => props?.jobsProps?.setPage(props?.jobsProps?.page + 1)}>
                  <a>
                    <i className="fa fa-arrow-right"></i>
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
      {/* <!-- End Pagination --> */}
    </>
  );
};

export default FilterJobBox;
