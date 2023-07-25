import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGlobalState } from 'common/interfaces';
import * as LABELS from 'common/labels';
import { GlobalReducer } from '../reducers/global.reducer';

const initialState: IGlobalState = {
  title: LABELS.APP_TITLE,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setTitle: (state, { payload }: PayloadAction<string>) => {
      new GlobalReducer<string>({ state, payload }).setTitle();
    },
  },
});

export const { setTitle } = globalSlice.actions;
export default globalSlice.reducer;
