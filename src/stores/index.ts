import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import clock, { ClockState } from './clock';

export interface RootState {
  clock: ClockState;
}

const rootReducer = combineReducers({
  clock: clock.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware<RootState>(), logger],
});

// configureStore 를 사용하면 자동으로 default로 redux devtools 지원!
// const getDefaultMiddleware = [thunk, immutableStateInvariant, serializableStateInvariant]
