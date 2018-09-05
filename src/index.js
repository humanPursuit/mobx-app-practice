import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { configure } from "mobx";
import promiseFinally from "promise.prototype.finally";

import App from "./components/App";
import commonStore from "./stores/commonStore";
import registerServiceWorker from "./registerServiceWorker";

promiseFinally.shim();
configure({ enforceActions: "always" });

const stores = {
  commonStore
};

ReactDOM.render(
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
