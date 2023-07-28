import { DashboardLayout } from 'components';
import { AuthPage, CandidatesListingPage, CandidateViewProfilePage, HomePage, JobDetailsPage, JobListingPage, ProfilePage } from 'containers/pages';
import { useRoutes, Navigate } from 'react-router-dom';

export const AppRouter = () => {
  const routes = useRoutes([
    { path: '/', element: <HomePage /> },
    { path: '/joblisting', element: <JobListingPage /> },
    { path: '/jobdetails/:slug', element: <JobDetailsPage /> },
    { path: '/candidateslisting', element: <CandidatesListingPage /> },
    { path: '/candidateprofile/:slug', element: <CandidateViewProfilePage /> },
    { path: '/login', element: <AuthPage /> },
    { path: '/signup', element: <AuthPage /> },
    { path: '/forgotpassword', element: <AuthPage /> },
    {
      path: '/profile',
      children: [
        {
          element: (
            <DashboardLayout>
              <ProfilePage />
            </DashboardLayout>
          ),
          index: true,
        },
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);

  return routes;
};
