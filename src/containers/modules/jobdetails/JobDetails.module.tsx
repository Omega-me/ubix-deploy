import { JobDetailDataDto } from 'common/interfaces';
import { JobDetails } from 'components';
import { useJobsQuery } from 'hooks';
import { useLocation } from 'react-router-dom';

const JobListingModule = () => {
  const location = useLocation();
  const id = location?.search.split('=')[1];

  const { data: jobData } = useJobsQuery<JobDetailDataDto>({
    queryConfig: {
      queryUrl: id,
    },
  });

  return <JobDetails jobData={jobData} />;
};

export default JobListingModule;
