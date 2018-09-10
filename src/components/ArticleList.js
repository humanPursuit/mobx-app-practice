import ArticlePreview from "./ArticlePreview";
import ListPagination from "./ListPagination";
import LoadingSpinner from "./ListPagination";
import React from "react";

const ArticleList = props => {
  if (props.loading && !props.articlesLength) {
    return <LoadingSpinner />;
  }

  if (!props.articlesLength) {
    return <div className="article-preview">No Articles</div>;
  }

  return (
    <div>
      {props.articles.map(article => (
        <ArticlePreview article={article} key={article.slug} />
      ))}

      <ListPagination
        onSetPage={props.onSetPage}
        totalPagesCount={props.totalPagesCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default ArticleList;
