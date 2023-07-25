import { Auth } from 'components';
import useAuth from 'hooks/useAuth';

const AuthModule = () => {
  const { signup, signin, isSuccess, isError, isLoading, message, resetAuthState, data, sendPasswordResetEmail, signinWithGoogle } = useAuth();
  return (
    <Auth
      useAuth={{
        signin: signin,
        signup: signup,
        isSuccess: isSuccess,
        isError: isError,
        isLoading: isLoading,
        message: message,
        resetAuthState: resetAuthState,
        data: data,
        sendPasswordResetEmail: sendPasswordResetEmail,
        signinWithGoogle: signinWithGoogle,
      }}
    />
  );
};

export default AuthModule;
