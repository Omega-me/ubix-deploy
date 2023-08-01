import { UBIX_MANAGE_JOBS_CREATED } from 'common/labels';
import { ManageJobsCreatedModule, ProfileLayout } from 'containers/modules';
import useTitle from 'hooks/useTitle';
import { useEffect } from 'react';

const ManageJobsCreated = () => {
  const { setAppTitle } = useTitle();

  useEffect(() => {
    setAppTitle(UBIX_MANAGE_JOBS_CREATED);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProfileLayout>
      <ManageJobsCreatedModule />
    </ProfileLayout>
  );
};

export default ManageJobsCreated;
