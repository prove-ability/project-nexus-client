import { combineReducers } from '@reduxjs/toolkit';

import youtube from './youtube';

const rootReducer = combineReducers({
  youtube: youtube.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
