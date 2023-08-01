import { UBIX_CANDIDATES } from 'common/labels';
import { CandidatesListingModule } from 'containers/modules';
import useTitle from 'hooks/useTitle';
import { useEffect } from 'react';

const CandidatesListingPage = () => {
  const { setAppTitle } = useTitle();

  useEffect(() => {
    setAppTitle(UBIX_CANDIDATES);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CandidatesListingModule />;
};

export default CandidatesListingPage;
