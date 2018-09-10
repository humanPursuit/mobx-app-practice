import ArticleList from "../ArticleList";
import React from "react";
import { inject, observer } from "mobx-react";
import { NavLink, withRouter } from "react-router-dom";
import { parse as qsParse } from "query-string";

const YourFeedTab = props => {
  if (props.currentUser) {
    return (
      <li className="nav-item">
        <NavLink
          className="nav-link"
          isActive={(match, location) => {
            return !!location.search.match("tab=feed");
          }}
          to={{ path: "/", search: "?tab=feed" }}
        >
          Your Feed
        </NavLink>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  return (
    <li className="nav-item">
      <NavLink
        className="nav-link"
        isActive={(match, location) => {
          return !location.search.match(/tab=(feed|tag)/);
        }}
        to={{ path: "/", search: "?tab=all" }}
      >
        Global Feed
      </NavLink>
    </li>
  );
};

const TagFilterTab = props => {
  if (!props.tag) return null;

  return (
    <li className="nav-item">
      <a className="nav-link active">
        <i className="ion-pound" />
        {props.tag}
      </a>
    </li>
  );
};

@inject("userStore", "articlesStore", "commonStore")
@withRouter
@observer
export default class MainView extends React.Component {
  componentWillMount() {
    this.props.articlesStore.setPredicate(this.getPredicate());
  }

  componentDidMount() {
    this.props.articlesStore.loadArticles();
  }

  componentDidUpdate(prevProps) {
    if (
      this.getTab(this.props) !== this.getTab(prevProps) ||
      this.getTag(this.props) !== this.getTag(prevProps)
    ) {
      this.props.articlesStore.setPredicate(this.getPredicate());
      this.props.articlesStore.loadArticles();
    }
  }

  getTag() {
    return qsParse(this.props.location.search).tag || "";
  }

  getTab() {
    return qsParse(this.props.location.search).tab || "all";
  }

  getPredicate(props = this.props) {
    switch (this.getTab(props)) {
      case "feed":
        return { myFeed: true };
      case "tag":
        return { tag: qsParse(props.location.search).tag };
      default:
        return {};
    }
  }

  handleTabChange = tab => {
    if (this.props.location.query.tab === tab) return;
    this.props.router.push({ ...this.props.location, query: { tab } });
  };

  handleSetPage = page => {
    this.props.articlesStore.setPage(page);
    this.props.articlesStore.loadArticles();
  };

  render() {
    const { currentUser } = this.props.userStore;
    const {
      articles,
      articlesLength,
      isLoading,
      page,
      totalPagesCount
    } = this.props.articlesStore;

    return (
      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active">
            <YourFeedTab currentUser={currentUser} tab={this.getTab()} />
            <GlobalFeedTab tab={this.getTab()} />
            <TagFilterTab tag={qsParse(this.props.location.search).tag} />
          </ul>
        </div>

        <ArticleList
          articles={articles}
          articlesLength={articlesLength}
          loading={isLoading}
          totalPagesCount={totalPagesCount}
          currentPage={page}
          onSetPage={this.handleSetPage}
        />
      </div>
    );
  }
}
