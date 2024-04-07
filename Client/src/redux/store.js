import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistStore} from 'redux-persist';

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig={
  key: 'root',
  Storage,
  version: 1,
};

const persisteReducer = persisteReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persisteReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({ serializableCheck: false}),

});

export const persistor = persistStore(store);

