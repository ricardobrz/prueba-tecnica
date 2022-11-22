import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import TemplateRoutes from "./routes";
import rootSaga from "./store/sagas";
import configureStore from "./store";
import "./stylesheet.scss";

const { store, persistor, sagaMiddleware } = configureStore();
sagaMiddleware.run(rootSaga);

function App() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TemplateRoutes />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
