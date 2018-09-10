import Comment from "./Comment";
import React from "react";
import { observer } from "mobx-react";
import { cpus } from "os";

const CommentList = observer(props => {
  return (
    <div>
      {props.comments.map(comment => (
        <Comment
          comment={comment}
          currentUser={props.currentUser}
          slug={props.slug}
          key={comment.id}
          onDelete={props.onDelete}
        />
      ))}
    </div>
  );
});
