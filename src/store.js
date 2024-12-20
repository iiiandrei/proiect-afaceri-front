import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root-resource-management',
  storage,
};

const initialState = {
  authToken: null,
  refreshToken: null,
  user: null,
  loginModalOpen: false,
};


const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}
const persistedReducer = persistReducer(persistConfig, changeState)

/* eslint-disable no-underscore-dangle */
export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export const persistor = persistStore(store)
/* eslint-enable */
