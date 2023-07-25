import { JobListingModule } from 'containers/modules';
import useTitle from 'hooks/useTitle';
import { useEffect } from 'react';

const JobListingPage = () => {
  const { setAppTitle } = useTitle();

  useEffect(() => {
    setAppTitle('Ubix - Job listing');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <JobListingModule />;
};

export default JobListingPage;
