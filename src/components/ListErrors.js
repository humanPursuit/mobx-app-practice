import React from "react";

export default function ListErrors(props) {
  if (props.errors) {
    return (
      <ul className="error-messages">
        {Object.keys(props.errors).map(key => (
          <li key={key}>
            {key} {props.errors[key]}
          </li>
        ))}
      </ul>
    );
  }
  return null;
}
