import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { store } from "./redux/store";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <ToastContainer />
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </Provider>
);
