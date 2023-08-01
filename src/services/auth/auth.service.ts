/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt_decode from 'jwt-decode';
import { auth } from 'common/configs';
import { eApiRoutes, eHttpMethod, eSigninProvider } from 'common/enums';
import { AuthData, LoginUserDto, SignupUserDto, UserDataDto } from 'common/interfaces';
import {
  ActionCodeSettings,
  ConfirmationResult,
  RecaptchaVerifier,
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut,
  updateEmail,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { httpClient } from 'services';
import {
  AN_EMAIL_VERIFICATION_LINK_WAS_SENT_TO_YOUR_EMAIL_ACCOUNT,
  A_PASSWORD_RESET_LINK_WAS_SEND_TO_YOUR_EMAIL_ADDRESS,
  THERE_WAS_A_PROBLEM_LOGGING_THE_USER_OUT,
  THERE_WAS_A_PROBLEM_SENDING_EMAIL_VERFICATION,
  THERE_WAS_A_PROBLEM_SENDING_PASSWORD_RESET_EMAIL,
  THERE_WAS_A_PROBLEM_UPDATING_YOUR_EMAIL,
  THERE_WAS_A_PROBLEM_UPDATING_YOUR_PASSWORD,
  USER_HAS_BEEN_SUCCESSFULLY_LOGGED_OUT,
  YOUR_EMAIL_WAS_CHANGED_SUCCESSFULLY,
  YOUR_PASSSWORD_WAS_CHANGED_SUCCESSFULLY,
} from 'common/labels';

const provider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

/**
 *
 * @param user
 */
export const getUserDataService = async (user: User) => {
  const token = await user.getIdToken();
  const decoded: {
    email_verified: boolean;
    phone_number: string;
    email: string;
    picture: string;
    firebase: {
      sign_in_provider: string;
    };
  } = jwt_decode(token);

  const authData = {
    token,
    emailVerified: decoded.email_verified,
    signinProvider: decoded?.firebase.sign_in_provider as eSigninProvider,
    email: decoded.email,
    phone: decoded.phone_number,
    picture: decoded.picture,
  };

  try {
    const res = await httpClient(eHttpMethod.GET, eApiRoutes.USERS+eApiRoutes.SELF, {
      axiosConfig: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    const data: AuthData<UserDataDto> = {
      user: {
        profile: true,
        ...res,
      },
      ...authData,
    };
    return data;
  } catch (error: any) {
    if (error && error.response && error.response.status === 404) {
      const data: AuthData<{ profile: boolean }> = {
        user: {
          profile: false,
        },
        ...authData,
      };
      return data;
    }
    return null;
  }
};

/**
 *
 * @param data
 * @returns
 */
export const signInWithEmailAndPasswordService = async (data: LoginUserDto) => {
  const res = await signInWithEmailAndPassword(auth, data.email, data.password);
  return res.user;
};

/**
 *
 * @returns
 */
export const signinWithGoogleService = async () => {
  const res = await signInWithPopup(auth, provider);
  return res.user;
};

/**
 *
 * @returns
 */
export const signinWithAppleService = async () => {
  const redirectRes = await signInWithRedirect(auth, appleProvider);
  const res = await getRedirectResult(redirectRes);
  return res?.user;
};

/**
 *
 * @param phoneNumber
 * @returns
 */
export const getPhoneConfirmationCodeService = async (phoneNumber: string) => {
  const recaptcha = new RecaptchaVerifier('recaptcha', {}, auth);
  const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptcha);
  return confirmation;
};

/**
 *
 * @param data
 * @returns
 */
export const siginWithPhoneNumberService = async (data: { otp: string; confirmation: ConfirmationResult }) => {
  const res = await data.confirmation.confirm(data.otp);
  return res.user;
};

/**
 *
 * @param data
 * @returns
 */
export const createUserWithEmailAndPasswordService = async (data: SignupUserDto) => {
  const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
  return res.user;
};

/**
 *
 * @param data
 * @returns
 */
export const updateEmailService = async (data: { user: User; newEmail: string }) => {
  try {
    await updateEmail(data.user, data.newEmail);
    return {
      success: true,
      message: YOUR_EMAIL_WAS_CHANGED_SUCCESSFULLY,
    };
  } catch (error) {
    return {
      success: false,
      message: THERE_WAS_A_PROBLEM_UPDATING_YOUR_EMAIL,
    };
  }
};

/**
 *
 * @param data
 * @returns
 */
export const updatePasswordService = async (data: { user: User; newPassword: string }) => {
  try {
    await updatePassword(data.user, data.newPassword);
    return {
      success: true,
      message: YOUR_PASSSWORD_WAS_CHANGED_SUCCESSFULLY,
    };
  } catch (error) {
    return {
      success: false,
      message: THERE_WAS_A_PROBLEM_UPDATING_YOUR_PASSWORD,
    };
  }
};

/**
 *
 * @param data
 * @returns
 */
export const sendPasswordResetEmailService = async (data: { email: string; actionCodeSettings?: ActionCodeSettings | undefined }) => {
  try {
    await sendPasswordResetEmail(auth, data.email, data.actionCodeSettings);
    return {
      success: true,
      message: A_PASSWORD_RESET_LINK_WAS_SEND_TO_YOUR_EMAIL_ADDRESS,
    };
  } catch (error) {
    return {
      success: false,
      message: THERE_WAS_A_PROBLEM_SENDING_PASSWORD_RESET_EMAIL,
    };
  }
};

/**
 *
 * @param data
 * @returns
 */
export const sendEmailVerificationService = async (data: { user: User; actionCodeSettings?: ActionCodeSettings | null | undefined }) => {
  try {
    await sendEmailVerification(data.user, data.actionCodeSettings);
    return {
      success: true,
      message: AN_EMAIL_VERIFICATION_LINK_WAS_SENT_TO_YOUR_EMAIL_ACCOUNT,
    };
  } catch (error) {
    return {
      success: false,
      message: THERE_WAS_A_PROBLEM_SENDING_EMAIL_VERFICATION,
    };
  }
};

/**
 *
 * @returns
 */
export const signOutService = async () => {
  try {
    await signOut(auth);
    return {
      success: true,
      message: USER_HAS_BEEN_SUCCESSFULLY_LOGGED_OUT,
    };
  } catch (error) {
    return {
      success: false,
      message: THERE_WAS_A_PROBLEM_LOGGING_THE_USER_OUT,
    };
  }
};

/**
 *
 * @returns
 */
export const getCurrentUserService = () => {
  return auth.currentUser;
};
