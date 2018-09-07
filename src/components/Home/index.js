import Banner from "./Banner";
import MainView from "./MainView";
import Tags from "./Tags";
import React from "react";

import { inject, observer } from "mobx-react";

@inject("commonStore")
@observer
export default class Home extends React.Component {
  componentDidMount() {
    this.props.commonStore.loadTags();
  }

  render() {
    const {
      tags,
      token,
      appName,
    } = this.props.commonStore;

    return (
      <div className="home-page">
        <Banner token={token} appName={appName} />
        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <Tags tags={tags} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
