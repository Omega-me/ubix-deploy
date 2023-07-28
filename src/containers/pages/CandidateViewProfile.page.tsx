import { UBIX_CANDIDATE_PROFILE } from 'common/labels';
import { CandidateViewProfileModule } from 'containers/modules';
import useTitle from 'hooks/useTitle';
import { useEffect } from 'react';

const CandidateViewProfilePage = () => {
  const { setAppTitle } = useTitle();

  useEffect(() => {
    setAppTitle(UBIX_CANDIDATE_PROFILE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CandidateViewProfileModule />;
};

export default CandidateViewProfilePage;
