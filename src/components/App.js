import React from "react";
import { inject, observer } from "mobx-react";
import { Switch, Route, withRouter } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Editor from "./Editor";
import Settings from "./Settings";
import Profile from "./Profile";

@inject("commonStore", "userStore")
@withRouter
@observer
export default class App extends React.Component {
  componentWillMount() {
    const { commonStore } = this.props;
    if (!commonStore.token) {
      commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    const { commonStore, userStore } = this.props;
    if (commonStore.token) {
      userStore.pullUser().finally(() => commonStore.setAppLoaded());
    }
  }

  render() {
    const { commonStore } = this.props;
    if (commonStore.appLoaded) {
      return (
        <div>
          <Header />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/editor/:slug?" component={Editor} />
            <PrivateRoute path="/settings" component={Settings} />
            <Route path="/@:username" component={Profile} />
          </Switch>
        </div>
      );
    }
    return <Header />;
  }
}
