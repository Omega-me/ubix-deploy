import { UBIX_PROFILE_EXPERIENCES } from 'common/labels';
import { ExperiencesModule, ProfileLayout } from 'containers/modules';
import useTitle from 'hooks/useTitle';
import { useEffect } from 'react';

const ExperiencesPage = () => {
  const { setAppTitle } = useTitle();

  useEffect(() => {
    setAppTitle(UBIX_PROFILE_EXPERIENCES);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProfileLayout>
      <ExperiencesModule />
    </ProfileLayout>
  );
};

export default ExperiencesPage;
