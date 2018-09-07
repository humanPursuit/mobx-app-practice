import React from "react";

import "../styles/loading.less";

const style = {
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  margin: "90px auto",
  position: "relative",
  border: "3px solid rgba(0, 0, 0, 0.1)",
  borderLeft: "3px solid #818a91",
  transform: "translateZ(0)",
  animation: "loading-spinner 0.5s infinite linear"
};

export default function LoadingSpinner() {
  return <div className="loleading-spinner" style={style} />;
}
