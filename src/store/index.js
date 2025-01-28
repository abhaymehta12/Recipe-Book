import { configureStore } from '@reduxjs/toolkit';
import profile from '../reducers/profile';
import {thunk} from 'redux-thunk';

const store = configureStore({
  reducer: {
    user: profile
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;