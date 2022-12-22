import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import App from "./App";
import "./index.scss";
// import { UserProvider } from "../src/contexts/user.context.jsx";
import { PersistGate } from "redux-persist/integration/react";
// import { CategoriesProvider } from "../src/contexts/categories.context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
