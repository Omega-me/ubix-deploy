import { UBIX_POST_JOBS } from 'common/labels';
import { PostJobsModule, ProfileLayout } from 'containers/modules';
import useTitle from 'hooks/useTitle';
import { useEffect } from 'react';

const PostJobsPage = () => {
  const { setAppTitle } = useTitle();

  useEffect(() => {
    setAppTitle(UBIX_POST_JOBS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProfileLayout>
      <PostJobsModule />
    </ProfileLayout>
  );
};

export default PostJobsPage;
