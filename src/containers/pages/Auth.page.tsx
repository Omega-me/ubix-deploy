import { APP_TITLE_LOGIN_SIGNUP } from 'common/labels';
import { AuthModule } from 'containers/modules';
import useTitle from 'hooks/useTitle';
import { useEffect } from 'react';

const HomePage = () => {
  const { setAppTitle } = useTitle();

  useEffect(() => {
    setAppTitle(APP_TITLE_LOGIN_SIGNUP);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthModule />;
};

export default HomePage;
