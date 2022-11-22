import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "./modules";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import "./i18n/index";

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App className="app" />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
