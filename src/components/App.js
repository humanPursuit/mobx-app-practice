import React from "react";
import { inject, observer } from "mobx-react";
import { Switch, Route, withRouter } from "react-router-dom";

import Header from "./Header";
import Login from "./Login";

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
            <Route path="/register" component={Login} />
          </Switch>
        </div>
      );
    }
    return <Header />;
  }
}
