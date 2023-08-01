import { eRoutes } from 'common/enums';
import {
  AuthPage,
  CandidatesListingPage,
  CandidateViewProfilePage,
  ExperiencesPage,
  HomePage,
  JobDetailsPage,
  JobListingPage,
  ManageJobsCreatedPage,
  ProfilePage,
} from 'containers/pages';
import PostJobsPage from 'containers/pages/PostJobs.page';
import { useRoutes, Navigate } from 'react-router-dom';

export const AppRouter = () => {
  const routes = useRoutes([
    { path: eRoutes.HOME, element: <HomePage /> },
    { path: eRoutes.JOBLISTING, element: <JobListingPage /> },
    { path: eRoutes.JOBLISTING_DETAIL, element: <JobDetailsPage /> },
    { path: eRoutes.CANDIDATESLISTING, element: <CandidatesListingPage /> },
    { path: eRoutes.CANDIDATESLISTING_DETAIL, element: <CandidateViewProfilePage /> },
    { path: eRoutes.LOGIN, element: <AuthPage /> },
    { path: eRoutes.PHONE_LOGIN_REGISTER, element: <AuthPage /> },
    { path: eRoutes.SIGNUP, element: <AuthPage /> },
    { path: eRoutes.FORGOT_PASSWORD, element: <AuthPage /> },
    {
      path: eRoutes.PROFILE,
      children: [
        {
          element: <ProfilePage />,
          index: true,
        },
        {
          path: eRoutes.EXPERIENCES,
          element: <ExperiencesPage />,
        },
        {
          path: eRoutes.POST_JOBS,
          element: <PostJobsPage />,
        },
        {
          path: eRoutes.POST_JOBS_EDIT,
          element: <PostJobsPage />,
        },
        {
          path: eRoutes.MANAGE_JOBS_CREATED,
          element: <ManageJobsCreatedPage />,
        },
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);

  return routes;
};
