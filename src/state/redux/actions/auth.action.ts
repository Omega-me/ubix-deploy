/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginUserDto, SignupUserDto } from 'common/interfaces';
import {
  getUserDataService,
  signInWithEmailAndPasswordService,
  signinWithGoogleService,
  signinWithAppleService,
  createUserWithEmailAndPasswordService,
  siginWithPhoneNumberService,
} from 'services';
import { ConfirmationResult } from 'firebase/auth';
import { eAuthAction } from 'common/enums';

export const signinAction = createAsyncThunk(eAuthAction.AUTH_SIGNIN, async (loginDto: LoginUserDto, thunkAPI) => {
  try {
    const user = await signInWithEmailAndPasswordService(loginDto);
    if (user) {
      const me = await getUserDataService(user);
      return me;
    }
    return null;
  } catch (error: any) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const signinWithGoogleAction = createAsyncThunk(eAuthAction.AUTH_SIGNINWITHGOOGLE, async (_, thunkAPI) => {
  try {
    const user = await signinWithGoogleService();
    if (user) {
      const me = await getUserDataService(user);
      return me;
    }
    return null;
  } catch (error: any) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const signinWithAppleAction = createAsyncThunk(eAuthAction.AUTH_SIGNINWITHAPPLE, async (_, thunkAPI) => {
  try {
    const user = await signinWithAppleService();
    if (user) {
      const me = await getUserDataService(user);
      return me;
    }
    return null;
  } catch (error: any) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const signInWithPhoneNumberAction = createAsyncThunk(
  eAuthAction.AUTH_SIGNINWITHPHONENUMBER,
  async (data: { otp: string; confirmation: ConfirmationResult }, thunkAPI) => {
    try {
      const user = await siginWithPhoneNumberService(data);
      if (user) {
        const me = await getUserDataService(user);
        return me;
      }
      return null;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signupAction = createAsyncThunk(eAuthAction.AUTH_SIGNUP, async (data: SignupUserDto, thunkAPI) => {
  try {
    const user = await createUserWithEmailAndPasswordService(data);
    if (user) {
      const me = await getUserDataService(user);
      return me;
    }
    return null;
  } catch (error: any) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
