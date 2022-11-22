import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import userStore from "./users";

const reducers = combineReducers({
  userStore,
});

const persistConfig = {
  key: "client-platform",
  storage,
};

const rootReducer = (state, action) => {
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
export default function configureStore() {
  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(sagaMiddleware))
  );
  const persistor = persistStore(store);
  return { store, persistor, sagaMiddleware };
}
