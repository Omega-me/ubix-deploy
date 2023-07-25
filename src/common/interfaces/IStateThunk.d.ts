import { ConfirmationResult } from 'firebase/auth';

export interface IStateThunk<TData = unknown> {
  data: AuthData<TData> | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  phoneConfirmation: ConfirmationResult | null;
}

export interface AuthData<TUser = unknown> {
  user: TUser | null;
  token: string;
  emailVerified: boolean;
}
