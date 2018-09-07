import React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";

@inject("articlesStore")
@observer
export default class ArticlePreview extends React.Component {
  render() {
    const { article } = this.props;
    const favoriteBtnClassName = article.favorited
      ? FAVORITED_CLASS
      : NOT_FAVORITED_CLASS;

    return (
      <div className="article-preview">
        <div className="article-meta">
          <Link to={`/@${article.author.username}`}>
            <img src={article.author.image} alt="" />
          </Link>
        </div>

        <div className="info">
          <Link className="author" to={`/@${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteBtnClassName} onClick={() => {}}>
            <i className="ion-heart" /> {article.favoritesCount}
          </button>
        </div>

        <Link to={`/article/${article.slug}`} className="preview-link">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <span>Read More...</span>
          <ul className="tag-list">
            {article.tagList.map(tag => (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </Link>
      </div>
    );
  }
}
