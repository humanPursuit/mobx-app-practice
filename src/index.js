import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { configure } from "mobx";
import promiseFinally from "promise.prototype.finally";

import registerServiceWorker from "./registerServiceWorker";

import App from "./components/App";

import articlesStore from "./stores/articlesStore";
import authStore from "./stores/authStore";
import commentStore from "./stores/commentStore";
import commonStore from "./stores/commonStore";
import editorStore from "./stores/editorStore";
import profileStore from "./stores/profileStore";
import userStore from "./stores/userStore";

promiseFinally.shim();
configure({ enforceActions: "always" });

const stores = {
  articlesStore,
  authStore,
  commentStore,
  commonStore,
  editorStore,
  profileStore,
  userStore
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
