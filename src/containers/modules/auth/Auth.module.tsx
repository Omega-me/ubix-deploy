import { AuthData, LoginUserDto, UserDataDto } from 'common/interfaces';
import { Auth } from 'components';
import useAuth from 'hooks/useAuth';
import { useForm } from 'react-hook-form';

const AuthModule = () => {
  const { isLoading, isSuccess, message, signup, signin, sendPasswordResetEmail, signinWithGoogle } = useAuth<AuthData<UserDataDto>>();
  const pathName = location.pathname.split('/')[1].toLowerCase();

  const {
    register: registerSignUp,
    handleSubmit: handleSignUp,
    reset: resetSignup,
    formState: { errors: signUpErrors },
    clearErrors: clearSignupErrors,
  } = useForm<LoginUserDto>();

  const {
    register: registerLogIn,
    handleSubmit: handleLogIn,
    reset: resetLogin,
    formState: { errors: logInErrors },
    clearErrors: clearLoginErrors,
  } = useForm<LoginUserDto>();

  const {
    register: registerForgotPassword,
    handleSubmit: handleForgotPassword,
    reset: resetForgotPassword,
    formState: { errors: forgotPasswordErrors },
    clearErrors: clearForgotPasswordErrors,
  } = useForm<{ email: string }>();

  const onSignUp = handleSignUp((signUpData: LoginUserDto) => {
    signup({
      data: signUpData,
      navigateUrl: '/profile',
      toast: {
        error: message,
      },
    });
    if (isSuccess) {
      resetSignup();
    }
  });

  const onLogin = handleLogIn((signInData: LoginUserDto) => {
    signin({
      data: signInData,
      navigateUrl: '/',
    });
    if (isSuccess) {
      resetLogin();
    }
  });

  const onLoginWithGoogle = () => {
    signinWithGoogle({
      navigateUrl: '/',
      toast: {
        error: message,
      },
    });
    if (isSuccess) {
      resetLogin();
    }
  };

  const onForgotPassword = handleForgotPassword((data: { email: string }) => {
    sendPasswordResetEmail({ email: data.email }).then(() => {
      resetForgotPassword();
    });
  });

  return (
    <Auth
      pathName={pathName}
      isLoading={isLoading}
      signup={{ registerSignUp, signUpErrors, onSignUp, resetSignup, clearSignupErrors }}
      login={{ registerLogIn, logInErrors, onLogin, resetLogin, clearLoginErrors, onLoginWithGoogle }}
      forgotpassword={{ forgotPasswordErrors, registerForgotPassword, onForgotPassword, resetForgotPassword, clearForgotPasswordErrors }}
    />
  );
};

export default AuthModule;
