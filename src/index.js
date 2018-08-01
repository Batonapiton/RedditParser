import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import 'antd/dist/antd.css';
import { BrowserRouter as Router, } from "react-router-dom";

import { Provider } from "react-redux";

import store from "./store";


//import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
