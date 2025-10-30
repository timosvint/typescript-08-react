import { configureStore, type Reducer } from '@reduxjs/toolkit'
import filterCounter from "./filter/filter"
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer, persistStore} from 'redux-persist';
import { taskApi } from './services/services';
import { authSliceCounter } from './auth/authSlice';
import type { AuthState } from '../TypeScript-types/many-used-types/redux-auth/userAndAuthState';
import type { PersistPartial } from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import modalReducer  from "./modal/modalSlice"


const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user', 'isLoggedIn'],
};

const persistedAuthReducer: Reducer<AuthState & PersistPartial> = persistReducer(authPersistConfig, authSliceCounter);


export const store = configureStore({
  reducer: {
    modal: modalReducer,
    filter: filterCounter,
    auth: persistedAuthReducer,
        [taskApi.reducerPath]: taskApi.reducer,
    },
        middleware: (getDefaultMiddleware) =>  getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(taskApi.middleware),
})



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const persistor = persistStore(store);