import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGlobalState } from 'common/interfaces';
import * as LABELS from 'common/labels';
import { GlobalReducer } from '../reducers/global.reducer';

const initialState: IGlobalState = {
  title: LABELS.APP_TITLE,
  lazyLoading: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setTitle: (state, { payload }: PayloadAction<string>) => {
      new GlobalReducer<string>({ state, payload }).setTitle();
    },
    setLazyLoading: (state, { payload }: PayloadAction<boolean>) => {
      new GlobalReducer<boolean>({ state, payload }).setLazyLoading();
    },
  },
});

export const { setTitle, setLazyLoading } = globalSlice.actions;
export default globalSlice.reducer;
