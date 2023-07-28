import { UBIX_JOB_DETAILS } from 'common/labels';
import { JobDetailsModule } from 'containers/modules';
import useTitle from 'hooks/useTitle';
import { useEffect } from 'react';

const JobDetails = () => {
  const { setAppTitle } = useTitle();

  useEffect(() => {
    setAppTitle(UBIX_JOB_DETAILS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <JobDetailsModule />;
};

export default JobDetails;
