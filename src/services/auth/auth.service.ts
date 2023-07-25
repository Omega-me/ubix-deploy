import jwt_decode from 'jwt-decode';
import { auth } from 'common/configs';
import { eApiRoutes, eHttpMethod } from 'common/enums';
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

/**
 *
 * @param user
 */
export const getUserDataService = async (user: User) => {
  const token = await user.getIdToken();
  const decoded: { email_verified: boolean } = jwt_decode(token);

  try {
    const res = await httpClient(eHttpMethod.GET, eApiRoutes.SELF, {
      axiosConfig: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    const data: AuthData<UserDataDto> = {
      user: res,
      token,
      emailVerified: decoded.email_verified,
    };
    return data;
  } catch (error) {
    const data: AuthData<UserDataDto> = {
      user: null,
      token,
      emailVerified: decoded.email_verified,
    };
    return data;
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
    return YOUR_EMAIL_WAS_CHANGED_SUCCESSFULLY;
  } catch (error) {
    return THERE_WAS_A_PROBLEM_UPDATING_YOUR_EMAIL;
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
    return YOUR_PASSSWORD_WAS_CHANGED_SUCCESSFULLY;
  } catch (error) {
    return THERE_WAS_A_PROBLEM_UPDATING_YOUR_PASSWORD;
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
    return A_PASSWORD_RESET_LINK_WAS_SEND_TO_YOUR_EMAIL_ADDRESS;
  } catch (error) {
    return THERE_WAS_A_PROBLEM_SENDING_PASSWORD_RESET_EMAIL;
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
    return AN_EMAIL_VERIFICATION_LINK_WAS_SENT_TO_YOUR_EMAIL_ACCOUNT;
  } catch (error) {
    return THERE_WAS_A_PROBLEM_SENDING_EMAIL_VERFICATION;
  }
};

/**
 *
 * @returns
 */
export const signOutService = async () => {
  try {
    await signOut(auth);
    return USER_HAS_BEEN_SUCCESSFULLY_LOGGED_OUT;
  } catch (error) {
    return THERE_WAS_A_PROBLEM_LOGGING_THE_USER_OUT;
  }
};

/**
 *
 * @returns
 */
export const getCurrentUserService = () => {
  return auth.currentUser;
};
