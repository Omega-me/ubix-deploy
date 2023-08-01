import { UserDetailDataDto } from 'common/interfaces';
import { Loading } from 'components';
import { Link } from 'react-router-dom';
import noCandidates from 'assets/images/no-jobs.png';
import maleAvatar from 'assets/images/maleAvatar.png';
import { eRoutes } from 'common/enums';

interface FilterCandidateBoxProps {
  candidatesProps: {
    candidates: UserDetailDataDto[];
    setPage: React.Dispatch<React.SetStateAction<number>>;
    pages: number[];
    page: number;
    isLoading: boolean;
  };
}

const FilterCandidateBox: React.FC<FilterCandidateBoxProps> = (props) => {
  const { candidatesProps } = props;
  const content = candidatesProps?.candidates?.map((candidate: UserDetailDataDto) => (
    <div className="candidate-block-four col-lg-4 col-md-6 col-sm-12" key={candidate?.id}>
      <div className="inner-box">
        {/* <ul className="job-other-info">
          <li className="green">Featured</li>
        </ul> */}

        <span className="thumb">
          {candidate?.profileImage ? <img src={candidate?.profileImage} alt="logo" /> : <img src={maleAvatar} alt="logo" />}
        </span>
        <h3 className="name">
          <Link to={`/candidates-single-v3/${candidate?.id}`}>{candidate?.fullName}</Link>
        </h3>
        <span className="cat">{candidate?.role}</span>

        <ul className="job-info">
          <li>
            <span className="icon flaticon-map-locator"></span> {candidate?.address}
          </li>
          <li>
            <span className="icon flaticon-star"></span>{' '}
            {candidate?.ratingsAverage !== null ? parseFloat(candidate?.ratingsAverage as any).toFixed(1) : 'No'} rating
          </li>
        </ul>
        {/* End candidate-info */}

        <ul className="post-tags">
          {candidate?.tags?.map((val: string, i: number) => (
            <li key={i}>
              <a href="#">{val}</a>
            </li>
          ))}
        </ul>
        {/* End tags */}

        <Link to={`${eRoutes.CANDIDATESLISTING}/${candidate?.fullName}?id=${candidate?.id}`} className="theme-btn btn-style-three">
          View Profile
        </Link>
      </div>
    </div>
  ));

  // sort handler
  return (
    <>
      <div className="row">
        {' '}
        {candidatesProps?.isLoading ? (
          <Loading />
        ) : candidatesProps?.candidates?.length > 0 ? (
          content
        ) : (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <img src={noCandidates} alt="No jobs foound!" />
            <div>Somethig went wrong, please try again.</div>
          </div>
        )}
      </div>

      {candidatesProps?.candidates?.length > 0 && (
        <nav className="ls-pagination">
          <ul>
            {candidatesProps?.pages?.length >= 2 && candidatesProps?.page !== 1 && (
              <>
                <li className="prev" onClick={() => candidatesProps?.setPage(candidatesProps?.page - 1)}>
                  <a>
                    <i className="fa fa-arrow-left"></i>
                  </a>
                </li>
                <li onClick={() => candidatesProps?.setPage(candidatesProps?.page - 1)}>
                  <a>{candidatesProps?.page - 1}</a>
                </li>
              </>
            )}
            <li>
              <a className="current-page">{candidatesProps?.page}</a>
            </li>
            {candidatesProps?.pages?.length <= 2 && candidatesProps?.page !== candidatesProps.pages?.length && (
              <>
                <li onClick={() => candidatesProps?.setPage(candidatesProps?.page + 1)}>
                  <a>{candidatesProps?.page + 1}</a>
                </li>
                <li className="next" onClick={() => candidatesProps?.setPage(candidatesProps?.page + 1)}>
                  <a>
                    <i className="fa fa-arrow-right"></i>
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}

      {/* <Pagination /> */}
    </>
  );
};

export default FilterCandidateBox;
