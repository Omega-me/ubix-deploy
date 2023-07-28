import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducer from './reducers/root.reducer';
import { auth } from 'common/configs';
import { initializeUserState } from './store/auth.store';
import { getUserDataService, signOutService } from 'services';
import { AuthData, UserDataDto } from 'common/interfaces';
import { toast } from 'react-toastify';
import { THERE_WAS_A_PROBLEM_LOGGING_IN } from 'common/labels';

export const store = configureStore({ reducer: rootReducer });

// initialise user auth state
auth.onAuthStateChanged(async user => {
  if (user) {
    const userData: AuthData<UserDataDto> | null = await getUserDataService(user);
    if (userData) {
      store.dispatch(initializeUserState(userData));
    } else {
      await signOutService();
      toast.error(THERE_WAS_A_PROBLEM_LOGGING_IN);
    }
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
