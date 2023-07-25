/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateOptions, To, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'state/redux/store';
import { signInWithPhoneNumberAction, signinAction, signinWithGoogleAction, signupAction } from 'state/redux/actions/auth.action';
import { LoginUserDto, SignupUserDto } from 'common/interfaces';
import {
  resetAuthMessageState as resetMessageAction,
  resetPhoneConfirmationState as resetPhoneConfirmationAction,
  setMessageState as setMessageStateAction,
  resetAuthState as resetAction,
  initializeUserState,
  setPhoneConfirmationState,
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

const useAuth = <TData = any>() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isError, isLoading, isSuccess, message, phoneConfirmation } = useAppSelector(state => state.authState);

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
    dispatch(initializeUserState(await getUserDataService(user as User)));
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
  const signin = (config: { data: LoginUserDto; navigateUrl?: To; navigateOptions?: NavigateOptions | undefined }) => {
    dispatch(signinAction(config.data)).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        resetAuthMessageState();
        if (config.navigateUrl) {
          navigate(config.navigateUrl, { replace: true, ...config?.navigateOptions });
        }
      }
    });
  };

  /**
   *
   * @param config
   */
  const signinWithGoogle = (config: { navigateUrl?: To; navigateOptions?: NavigateOptions | undefined }) => {
    dispatch(signinWithGoogleAction()).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        resetAuthMessageState();
        if (config.navigateUrl) {
          navigate(config.navigateUrl, { replace: true, ...config?.navigateOptions });
        }
      }
    });
  };

  /**
   *
   * @param phoneNumber
   */
  const getPhoneConfirmationCode = async (phoneNumber: string) => {
    const confirmation = await getPhoneConfirmationCodeService(phoneNumber);
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
  }) => {
    dispatch(signInWithPhoneNumberAction(config.data)).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        resetPhoneConfirmationState();
        resetAuthMessageState();
        if (config.navigateUrl) {
          navigate(config.navigateUrl, { replace: true, ...config?.navigateOptions });
        }
      }
    });
  };

  /**
   *
   * @param config
   */
  const signup = (config: { data: SignupUserDto; navigateUrl?: To; navigateOptions?: NavigateOptions | undefined }) => {
    dispatch(signupAction(config.data)).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        resetAuthMessageState();
        if (config.navigateUrl) {
          navigate(config.navigateUrl, { replace: true, ...config?.navigateOptions });
        }
      }
    });
  };

  const signOut = async () => {
    await signOutService().then(() => {
      resetAuthState();
    });
  };

  /**
   *
   * @param config
   */
  const updateEmail = async (config: { user: User; newEmail: string }) => {
    const message = await updateEmailService({ user: config.user, newEmail: config.newEmail });
    dispatch(setMessageStateAction(message));
  };

  /**
   *
   * @param config
   */
  const updatePassword = async (config: { user: User; newPassword: string }) => {
    const message = await updatePasswordService({ user: config.user, newPassword: config.newPassword });
    dispatch(setMessageStateAction(message));
  };

  /**
   *
   * @param config
   */
  const sendPasswordResetEmail = async (config: { email: string; actionCodeSettings?: ActionCodeSettings | undefined }) => {
    const message = await sendPasswordResetEmailService({ email: config.email, actionCodeSettings: config.actionCodeSettings });
    dispatch(setMessageStateAction(message));
  };

  /**
   *
   * @param config
   */
  const sendEmailVerification = async (config: { user: User; actionCodeSettings?: ActionCodeSettings | undefined }) => {
    const message = await sendEmailVerificationService({ user: config.user, actionCodeSettings: config.actionCodeSettings });
    dispatch(setMessageStateAction(message));
  };

  return {
    resetAuthState,
    resetPhoneConfirmationState,
    resetAuthMessageState,
    refreshUser,
    signinWithGoogle,
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
    isSuccess,
    message,
    phoneConfirmation,
  };
};

export default useAuth;
