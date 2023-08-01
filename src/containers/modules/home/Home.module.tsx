import { eRoutes } from 'common/enums';
import { AuthData, UserDataDto } from 'common/interfaces';
import { Home } from 'components';
import useAuth from 'hooks/useAuth';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HomeModule = () => {
  const locations = useLocation();
  const navigate = useNavigate();
  const { data: userData } = useAuth<AuthData<UserDataDto>>();

  useEffect(() => {
    if (locations?.state?.checkProfile) {
      if (!userData?.user?.profile) {
        navigate(eRoutes.PROFILE);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Home />;
};

export default HomeModule;
