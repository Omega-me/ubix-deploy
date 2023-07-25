import globalReducer from '../store/global.store';
import authReducer from '../store/auth.store';
import jobSlice from 'common/features/job/jobSlice';
import toggleSlice from 'common/features/toggle/toggleSlice';
import filterSlice from 'common/features/filter/filterSlice';
import employerSlice from 'common/features/employer/employerSlice';
import employerFilterSlice from 'common/features/filter/employerFilterSlice';
import candidateSlice from 'common/features/candidate/candidateSlice';
import candidateFilterSlice from 'common/features/filter/candidateFilterSlice';
import shopSlice from 'common/features/shop/shopSlice';

const reducer = {
  authState: authReducer,
  globalState: globalReducer,
  job: jobSlice,
  toggle: toggleSlice,
  filter: filterSlice,
  employer: employerSlice,
  employerFilter: employerFilterSlice,
  candidate: candidateSlice,
  candidateFilter: candidateFilterSlice,
  shop: shopSlice,
};

export default reducer;
