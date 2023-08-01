import { eSigninProvider } from 'common/enums';
import { ConfirmationResult } from 'firebase/auth';

export interface IStateThunk<TData = unknown> {
  data: AuthData<TData> | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isGoogleLoading: boolean;
  isAppleLoading: boolean;
  isPhoneLoading: boolean;
  message: string;
  phoneConfirmation: ConfirmationResult | null;
}

export interface AuthData<TUser = unknown> {
  user: TUser | null;
  token: string;
  signinProvider: eSigninProvider;
  emailVerified?: boolean;
  email?: string;
  phone?: string;
  picture?: string;
}
