import { eOAuthProvider, eRoutes } from 'common/enums';
import { AuthData, LoginUserDto, UserDataDto } from 'common/interfaces';
import { PROCEES_FAILED_PLEASE_TRY_AGAIN } from 'common/labels';
import { Auth } from 'components';
import useAuth from 'hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthModule = () => {
  const {
    isLoading,
    isGoogleLoading,
    isAppleLoading,
    isPhoneLoading,
    isSuccess,
    message,
    phoneConfirmation,
    signup,
    signin,
    sendPasswordResetEmail,
    signinWithGoogle,
    signinWithApple,
    getPhoneConfirmationCode,
    signInWithPhoneNumber,
    resetPhoneConfirmationState,
  } = useAuth<AuthData<UserDataDto>>();
  const locations = useLocation();
  const pathName = locations.pathname;
  const locationState: eRoutes.LOGIN | eRoutes.SIGNUP = locations.state;

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

  const {
    register: registerLoginWithPhone,
    handleSubmit: handleLoginWithPhone,
    reset: resetLoginWithPhone,
    formState: { errors: forgotLoginWithPhoneErrors },
    clearErrors: clearLoginWithPhoneErrors,
  } = useForm<{ phone: string; otp: string }>();

  const onSignUp = handleSignUp((signUpData: LoginUserDto) => {
    signup({
      data: signUpData,
      navigateUrl: eRoutes.PROFILE,
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
      navigateUrl: eRoutes.HOME,
      navigateOptions: {
        state: {
          checkProfile: true,
        },
      },
    });
    if (isSuccess) {
      resetLogin();
    }
  });

  const onLoginWithOAuth = (provider: eOAuthProvider) => {
    switch (provider) {
      case eOAuthProvider.GOOGLE:
        signinWithGoogle({
          navigateUrl: eRoutes.HOME,
          navigateOptions: {
            state: {
              checkProfile: true,
            },
          },
          toast: {
            error: message,
          },
        });
        break;
      case eOAuthProvider.APPLE:
        signinWithApple({
          navigateUrl: eRoutes.HOME,
          navigateOptions: {
            state: {
              checkProfile: true,
            },
          },
          toast: {
            error: message,
          },
        });
        break;
    }

    if (isSuccess) {
      resetLogin();
    }
  };

  const onGetConfirmation = handleLoginWithPhone(data => {
    getPhoneConfirmationCode(data.phone).then(() => {
      resetLoginWithPhone();
      clearLoginWithPhoneErrors();
    });
  });

  const onLoginWithPhone = handleLoginWithPhone(data => {
    if (phoneConfirmation) {
      signInWithPhoneNumber({
        data: {
          confirmation: phoneConfirmation,
          otp: data.otp,
        },
        navigateUrl: eRoutes.HOME,
        navigateOptions: {
          state: {
            checkProfile: true,
          },
        },
        toast: {
          error: message,
        },
      });
      resetLoginWithPhone();
      clearLoginWithPhoneErrors();
    } else {
      toast.error(PROCEES_FAILED_PLEASE_TRY_AGAIN);
    }
  });

  const onForgotPassword = handleForgotPassword((data: { email: string }) => {
    sendPasswordResetEmail({ email: data.email }).then(() => {
      resetForgotPassword();
      clearForgotPasswordErrors();
    });
  });

  return (
    <Auth
      pathName={pathName}
      locationState={locationState}
      isLoading={isLoading}
      isPhoneLoading={isPhoneLoading}
      isGoogleLoading={isGoogleLoading}
      isAppleLoading={isAppleLoading}
      signup={{ registerSignUp, signUpErrors, onSignUp, resetSignup, clearSignupErrors }}
      login={{
        registerLogIn,
        logInErrors,
        onLogin,
        resetLogin,
        clearLoginErrors,
        onLoginWithOAuth,
        registerLoginWithPhone,
        onGetConfirmation,
        onLoginWithPhone,
        forgotLoginWithPhoneErrors,
        phoneConfirmation,
        clearLoginWithPhoneErrors,
        resetLoginWithPhone,
        resetPhoneConfirmationState,
      }}
      forgotpassword={{ forgotPasswordErrors, registerForgotPassword, onForgotPassword, resetForgotPassword, clearForgotPasswordErrors }}
    />
  );
};

export default AuthModule;
