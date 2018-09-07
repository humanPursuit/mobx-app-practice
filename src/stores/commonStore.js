import { observable, action, reaction, decorate } from "mobx";
import agent from "../agent";

class CommonStore {
  appName = "Conduit";
  token = window.localStorage.getItem("jwt");
  appLoaded = false;

  tags = [];
  isLoadingTags = false;

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  loadTags() {
    this.isLoadingTags = true;
    return agent.Tags.getAll()
      .then(
        action(({ tags }) => {
          this.tags = tags.map(t => t.toLowerCase());
        })
      )
      .finally(() => {
        this.isLoadingTags = false;
      });
  }

  setToken(token) {
    this.token = token;
  }

  setAppLoaded() {
    this.appLoaded = true;
  }
}

const decoratedStore = decorate(CommonStore, {
  app: observable,
  appName: observable,
  token: observable,
  appLoaded: observable,

  tags: observable,
  isLoadingTags: observable,

  loadTags: action,
  setToken: action,
  setAppLoaded: action
});

export default new decoratedStore();
