import { HomeModule } from 'containers/modules';
import useTitle from 'hooks/useTitle';
import { useEffect } from 'react';

const HomePage = () => {
  const { setAppTitle } = useTitle();

  useEffect(() => {
    setAppTitle('Ubix');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <HomeModule />;
};

export default HomePage;
