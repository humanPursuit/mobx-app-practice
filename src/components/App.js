import React from "react";
import { inject, observer } from "mobx-react";
import { Switch, Route, withRouter } from "react-router-dom";

@inject("commonStore")
@withRouter
@observer
export default class App extends React.Component {
  //   componentWillMount() {
  //     const { commonStore } = this.props;
  //     setTimeout(function() {
  //       commonStore.setAppLoaded();
  //     }, 2000);
  //   }

  render() {
    const { commonStore } = this.props;
    return (
      <div>
        <div> Text: {commonStore.appLoaded ? "Loaded" : "Not Ready"}</div>
        <div>
          <button
            type="button"
            onClick={() => {
              commonStore.setAppLoaded();
            }}
          >
            Toggle State With Action
          </button>
        </div>
      </div>
    );
  }
}
