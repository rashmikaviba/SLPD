import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <Toaster duration={2500} richColors closeButton position="top-right" />
      <App />
    </Provider>
  </PersistGate>
);
