import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducer from './reducers/root.reducer';
import { auth } from 'common/configs';
import { initializeUserState } from './store/auth.store';
import { getUserDataService } from 'services';

export const store = configureStore({ reducer: rootReducer });

// initialise user auth state
auth.onAuthStateChanged(async user => {
  if (user) {
    store.dispatch(initializeUserState(await getUserDataService(user)));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
