/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateOptions, To, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'state/redux/store';
import { signInWithPhoneNumberAction, signinAction, signinWithAppleAction, signinWithGoogleAction, signupAction } from 'state/redux/actions/auth.action';
import { LoginUserDto, SignupUserDto } from 'common/interfaces';
import {
  resetAuthMessageState as resetMessageAction,
  resetPhoneConfirmationState as resetPhoneConfirmationAction,
  setMessageState as setMessageStateAction,
  resetAuthState as resetAction,
  initializeUserState,
  setPhoneConfirmationState,
  setIsPhoneLoadingState,
  resetIsPhoneLoadingState,
} from 'state/redux/store/auth.store';
import { ActionCodeSettings, ConfirmationResult, User } from 'firebase/auth';
import {
  getCurrentUserService,
  getPhoneConfirmationCodeService,
  getUserDataService,
  sendEmailVerificationService,
  sendPasswordResetEmailService,
  signOutService,
  updateEmailService,
  updatePasswordService,
} from 'services';
import { toast } from 'react-toastify';

const useAuth = <TData = any>() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isError, isLoading, isGoogleLoading, isAppleLoading, isPhoneLoading, isSuccess, message, phoneConfirmation } = useAppSelector(
    state => state.authState
  );

  /**
   *@summary dispatches resetAuthState
   */
  const resetAuthState = (): void => {
    dispatch(resetAction());
  };

  /**
   *@summary dispatches resetAuthMessage
   */
  const resetAuthMessageState = (): void => {
    dispatch(resetMessageAction());
  };

  /**
   * @summary dispatches resetPhoneConfirmationState
   */
  const resetPhoneConfirmationState = () => {
    dispatch(resetPhoneConfirmationAction());
  };

  const refreshUser = async () => {
    const user = getCurrentUserService();
    if (user) {
      const userData = await getUserDataService(user as User);
      if (userData) {
        dispatch(initializeUserState(userData));
      }
    }
  };

  /**
   *
   * @returns current the firebase user from storage
   */
  const getUser = () => {
    return getCurrentUserService();
  };

  /**
   *
   * @param config
   */
  const signin = (config: {
    data: LoginUserDto;
    navigateUrl?: To;
    navigateOptions?: NavigateOptions | undefined;
    toast?: { success?: string; error?: string };
  }) => {
    dispatch(signinAction(config.data)).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        resetAuthMessageState();
        if (config.navigateUrl) {
          navigate(config.navigateUrl, { replace: true, ...config?.navigateOptions });
        }
        if (config.toast) {
          toast.success(config?.toast?.success);
        }
      }
      if (res.meta.requestStatus === 'rejected') {
        if (config?.toast) {
          toast.error(config?.toast?.error);
        }
      }
    });
  };

  /**
   *
   * @param config
   */
  const signinWithGoogle = (config: { navigateUrl?: To; navigateOptions?: NavigateOptions | undefined; toast?: { success?: string; error?: string } }) => {
    dispatch(signinWithGoogleAction()).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        resetAuthMessageState();
        if (config.navigateUrl) {
          navigate(config.navigateUrl, { replace: true, ...config?.navigateOptions });
        }
        if (config.toast) {
          toast.success(config?.toast?.success);
        }
      }
      if (res.meta.requestStatus === 'rejected') {
        if (config?.toast) {
          toast.error(config?.toast?.error);
        }
      }
    });
  };

  /**
   *
   * @param config
   */
  const signinWithApple = (config: { navigateUrl?: To; navigateOptions?: NavigateOptions | undefined; toast?: { success?: string; error?: string } }) => {
    dispatch(signinWithAppleAction()).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        resetAuthMessageState();
        if (config.navigateUrl) {
          navigate(config.navigateUrl, { replace: true, ...config?.navigateOptions });
        }
        if (config.toast) {
          toast.success(config?.toast?.success);
        }
      }
      if (res.meta.requestStatus === 'rejected') {
        if (config?.toast) {
          toast.error(config?.toast?.error);
        }
      }
    });
  };

  /**
   *
   * @param phoneNumber
   */
  const getPhoneConfirmationCode = async (phoneNumber: string) => {
    dispatch(setIsPhoneLoadingState());
    const confirmation = await getPhoneConfirmationCodeService(phoneNumber);
    dispatch(resetIsPhoneLoadingState());
    dispatch(setPhoneConfirmationState(confirmation));
  };

  /**
   *
   * @param config
   */
  const signInWithPhoneNumber = (config: {
    data: { otp: string; confirmation: ConfirmationResult };
    navigateUrl?: To;
    navigateOptions?: NavigateOptions | undefined;
    toast?: { success?: string; error?: string };
  }) => {
    dispatch(signInWithPhoneNumberAction(config.data)).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        resetPhoneConfirmationState();
        resetAuthMessageState();
        if (config.navigateUrl) {
          navigate(config.navigateUrl, { replace: true, ...config?.navigateOptions });
        }
        if (config.toast) {
          toast.success(config?.toast?.success);
        }
      }
      if (res.meta.requestStatus === 'rejected') {
        if (config?.toast) {
          toast.error(config?.toast?.error);
        }
      }
    });
  };

  /**
   *
   * @param config
   */
  const signup = (config: {
    data: SignupUserDto;
    navigateUrl?: To;
    navigateOptions?: NavigateOptions | undefined;
    toast?: { success?: string; error?: string };
  }) => {
    dispatch(signupAction(config.data)).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        resetAuthMessageState();
        if (config.navigateUrl) {
          navigate(config.navigateUrl, { replace: true, ...config?.navigateOptions });
        }
        if (config?.toast) {
          toast.success(config?.toast?.success);
        }
      }
      if (res.meta.requestStatus === 'rejected') {
        if (config?.toast) {
          toast.error(config?.toast?.error);
        }
      }
    });
  };

  const signOut = async (config: { navigateUrl?: To; navigateOptions?: NavigateOptions | undefined; toast?: boolean }) => {
    const data = await signOutService();
    resetAuthState();
    if (data.success) {
      if (config.navigateUrl) {
        navigate(config.navigateUrl, { replace: true, ...config?.navigateOptions });
      }
      if (config.toast) {
        toast.success(data.message);
      }
    } else {
      if (config.toast) {
        toast.error(data.message);
      }
    }
  };

  /**
   *
   * @param config
   */
  const updateEmail = async (config: { user: User; newEmail: string; navigateUrl?: To; navigateOptions?: NavigateOptions | undefined; toast?: boolean }) => {
    const data = await updateEmailService({ user: config.user, newEmail: config.newEmail });
    dispatch(setMessageStateAction(data.message));
    if (data.success) {
      if (config.navigateUrl) {
        navigate(config.navigateUrl, { replace: true, ...config?.navigateOptions });
      }
      if (config.toast) {
        toast.success(data.message);
      }
    } else {
      if (config.toast) {
        toast.error(data.message);
      }
    }
  };

  /**
   *
   * @param config
   */
  const updatePassword = async (config: {
    user: User;
    newPassword: string;
    navigateUrl?: To;
    navigateOptions?: NavigateOptions | undefined;
    toast?: boolean;
  }) => {
    const data = await updatePasswordService({ user: config.user, newPassword: config.newPassword });
    dispatch(setMessageStateAction(data.message));
    if (data.success) {
      if (config.navigateUrl) {
        navigate(config.navigateUrl, { replace: true, ...config?.navigateOptions });
      }
      if (config.toast) {
        toast.success(data.message);
      }
    } else {
      if (config.toast) {
        toast.error(data.message);
      }
    }
  };

  /**
   *
   * @param config
   */
  const sendPasswordResetEmail = async (config: {
    email: string;
    actionCodeSettings?: ActionCodeSettings | undefined;
    navigateUrl?: To;
    navigateOptions?: NavigateOptions | undefined;
    toast?: boolean;
  }) => {
    const data = await sendPasswordResetEmailService({ email: config.email, actionCodeSettings: config.actionCodeSettings });
    dispatch(setMessageStateAction(data.message));
    if (data.success) {
      if (config.navigateUrl) {
        navigate(config.navigateUrl, { replace: true, ...config?.navigateOptions });
      }
      if (config.toast) {
        toast.success(data.message);
      }
    } else {
      if (config.toast) {
        toast.error(data.message);
      }
    }
  };

  /**
   *
   * @param config
   */
  const sendEmailVerification = async (config: {
    user: User;
    actionCodeSettings?: ActionCodeSettings | undefined;
    navigateUrl?: To;
    navigateOptions?: NavigateOptions | undefined;
    toast?: boolean;
  }) => {
    const data = await sendEmailVerificationService({ user: config.user, actionCodeSettings: config.actionCodeSettings });
    dispatch(setMessageStateAction(data.message));
    if (data.success) {
      if (config.navigateUrl) {
        navigate(config.navigateUrl, { replace: true, ...config?.navigateOptions });
      }
      if (config.toast) {
        toast.success(data.message);
      }
    } else {
      if (config.toast) {
        toast.error(data.message);
      }
    }
  };

  return {
    resetAuthState,
    resetPhoneConfirmationState,
    resetAuthMessageState,
    refreshUser,
    signinWithGoogle,
    signinWithApple,
    getPhoneConfirmationCode,
    signInWithPhoneNumber,
    signin,
    signup,
    signOut,
    getUser,
    updateEmail,
    updatePassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    data: data as TData,
    isError,
    isLoading,
    isGoogleLoading,
    isAppleLoading,
    isPhoneLoading,
    isSuccess,
    message,
    phoneConfirmation,
  };
};

export default useAuth;
