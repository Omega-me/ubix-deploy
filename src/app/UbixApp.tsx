import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from 'state/redux/store';
import { AppContainer } from 'containers';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import 'common/styles/global/index.scss';
import 'bootstrap/dist/js/bootstrap';

const queryClient = new QueryClient();

const UbixApp = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <AppContainer />
          </BrowserRouter>
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </Provider>
  );
};

export default UbixApp;
