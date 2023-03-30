import React from "react";
import "./editor.css";

export default function Editor({ children }) {
  let lineNumber = 1;

  const lines = children.map(c => (
      <div className="line" tabIndex="0" key={lineNumber}>
        <div className="number">{lineNumber++}</div>
        {c}
      </div>
    )
  );

  return <div className="editor">{lines}</div>;
}
