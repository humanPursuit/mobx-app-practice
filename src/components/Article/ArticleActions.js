import { Link } from "react-router-dom";
import React from "react";

const ArticleActions = props => {
  const article = props.article;
  const handleClose = () => props.onDelete(article.slug);

  if (props.canModify) {
    return (
      <span>
        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="ion-edit" /> Edit Article
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={handleClose}>
          <i className="ion-trash-a" /> Delete Article
        </button>
      </span>
    );
  }

  return null;
};

export default ArticleActions;
