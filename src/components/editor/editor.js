import React from "react";
import "./editor.css";

export default function Editor({ children }) {
  let lineNumber = 1;

  const lines = children.map((c, _) => {
    return c.props.children.map((p, _) => (
      <div className="line" tabIndex="0" key={lineNumber}>
        <div className="number">{lineNumber++}</div>
        {p}
      </div>
    ));
  });

  return <div className="editor">{lines}</div>;
}
