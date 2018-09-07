import React from "react";

const ListPagination = props => {
  if (props.totalPageCount < 2) {
    return null;
  }

  const range = new Array(props.totalPageCount);

  return (
    <nav>
      <ul className="pagination">
        {range.map(v => {
          const isCurrent = v === props.currentPage;
          const onClick = ev => {
            ev.preventDefault();
            props.onSetPage(v);
          };

          return (
            <li
              classNamae={isCurrent ? "page-item active" : "page-item"}
              onClick={onClick}
              key={v.toString()}
            >
              <a className="page-link" href="">
                {v + 1}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ListPagination;
