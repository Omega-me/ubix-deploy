import { CandidateDataDto } from 'common/interfaces';
import { CandidateViewProfile } from 'components';
import { useUserQuery } from 'hooks';
import { useLocation } from 'react-router-dom';

const CandidateViewProfileModule = () => {
  const location = useLocation();
  const id = location?.search.split('=')[1];

  const { data: userData } = useUserQuery<CandidateDataDto>({
    queryConfig: {
      queryUrl: id,
    },
  });

  return <CandidateViewProfile userData={userData} />;
};

export default CandidateViewProfileModule;
