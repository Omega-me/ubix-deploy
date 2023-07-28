/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthData, IStateThunk, UserDataDto } from 'common/interfaces';
import { signInWithPhoneNumberAction, signinAction, signinWithGoogleAction, signupAction } from '../actions/auth.action';
import { ConfirmationResult } from 'firebase/auth';

export class AuthReducer {
  private _builder?: ActionReducerMapBuilder<any>;
  private _state?: IStateThunk<any>;

  constructor(options: { builder?: ActionReducerMapBuilder<IStateThunk<any>>; state?: IStateThunk<any>; payload?: any }) {
    this._builder = options && options.builder;
    this._state = options && options.state;
  }

  resetAuthState() {
    if (this._state) {
      this._state.isLoading = false;
      this._state.isError = false;
      this._state.isSuccess = false;
      this._state.message = '';
      this._state.data = null;
    }
  }

  setMessage(message: string) {
    if (this._state) {
      this._state.message = message;
    }
  }

  resetMessage() {
    if (this._state) {
      this._state.message = '';
    }
  }

  initializeUser(user: AuthData<UserDataDto | { profile: boolean }>) {
    if (this._state) {
      this._state.data = user;
    }
  }

  setPhoneConfirmation(confirmation: ConfirmationResult) {
    if (this._state) {
      this._state.phoneConfirmation = confirmation;
    }
  }

  resetPhoneConfirmation() {
    if (this._state) {
      this._state.phoneConfirmation = null;
    }
  }

  buildExtraReducers() {
    if (this._builder) {
      this._builder
        .addCase(signinAction.pending, (state: IStateThunk<any>) => {
          state.isLoading = true;
        })
        .addCase(signinAction.fulfilled, (state: IStateThunk<any>, { payload }) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.data = payload as any;
        })
        .addCase(signinAction.rejected, (state: IStateThunk<any>, { payload }) => {
          state.isError = true;
          state.isLoading = false;
          state.message = payload as string;
        });
      this._builder
        .addCase(signinWithGoogleAction.pending, (state: IStateThunk<any>) => {
          state.isLoading = true;
        })
        .addCase(signinWithGoogleAction.fulfilled, (state: IStateThunk<any>, { payload }) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.data = payload as any;
        })
        .addCase(signinWithGoogleAction.rejected, (state: IStateThunk<any>, { payload }) => {
          state.isError = true;
          state.isLoading = false;
          state.message = payload as string;
        });
      this._builder
        .addCase(signInWithPhoneNumberAction.pending, (state: IStateThunk<any>) => {
          state.isLoading = true;
        })
        .addCase(signInWithPhoneNumberAction.fulfilled, (state: IStateThunk<any>, { payload }) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.data = payload as any;
        })
        .addCase(signInWithPhoneNumberAction.rejected, (state: IStateThunk<any>, { payload }) => {
          state.isError = true;
          state.isLoading = false;
          state.message = payload as string;
        });
      this._builder
        .addCase(signupAction.pending, (state: IStateThunk<any>) => {
          state.isLoading = true;
        })
        .addCase(signupAction.fulfilled, (state: IStateThunk<any>, { payload }) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.data = payload as any;
        })
        .addCase(signupAction.rejected, (state: IStateThunk<any>, { payload }) => {
          state.isError = true;
          state.isLoading = false;
          state.message = payload as string;
        });
    }
  }
}
