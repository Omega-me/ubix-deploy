/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionReducerMapBuilder, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthData, IStateThunk, UserDataDto } from 'common/interfaces';
import { AuthReducer } from '../reducers/auth.reducer';
import { ConfirmationResult } from 'firebase/auth';

const initialState: IStateThunk<UserDataDto> = {
  data: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
  phoneConfirmation: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: state => {
      new AuthReducer({ state }).resetAuthState();
    },
    setMessageState: (state, { payload }: PayloadAction<string>) => {
      new AuthReducer({ state }).setMessage(payload);
    },
    resetAuthMessageState: state => {
      new AuthReducer({ state }).resetMessage();
    },
    initializeUserState: (state, { payload }: PayloadAction<AuthData<UserDataDto>>) => {
      new AuthReducer({ state }).initializeUser(payload);
    },
    setPhoneConfirmationState: (state, { payload }: PayloadAction<ConfirmationResult>) => {
      new AuthReducer({ state }).setPhoneConfirmation(payload);
    },
    resetPhoneConfirmationState: state => {
      new AuthReducer({ state }).resetPhoneConfirmation();
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<any>) => {
    new AuthReducer({ builder }).buildExtraReducers();
  },
});

export const { resetAuthState, setMessageState, resetAuthMessageState, initializeUserState, setPhoneConfirmationState, resetPhoneConfirmationState } =
  authSlice.actions;
export default authSlice.reducer;
