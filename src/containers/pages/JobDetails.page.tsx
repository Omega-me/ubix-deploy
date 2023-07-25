import { JobDetailsModule } from 'containers/modules';
import useTitle from 'hooks/useTitle';
import { useEffect } from 'react';

const JobDetails = () => {
  const { setAppTitle } = useTitle();

  useEffect(() => {
    setAppTitle('Ubix - Job Details');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <JobDetailsModule />;
};

export default JobDetails;
