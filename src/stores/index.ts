import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer, { RootState } from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger],
});

// rootReducer 가 컴파일 될 때마다 새로운 루트ㄹㅣ듀서 생성
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;

// configureStore 를 사용하면 자동으로 default로 redux devtools 지원!
// const getDefaultMiddleware = [thunk, immutableStateInvariant, serializableStateInvariant]
