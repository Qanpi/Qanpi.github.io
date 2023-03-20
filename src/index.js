import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

function TabBar({ titles }) {
  const tabs = titles.map((t, i) => (
    <div key={t} className="tab">
      {t}
    </div>
  ));

  return <div className="tab-bar">{tabs}</div>;
}

function Folder({ name, titles }) {
  const items = titles.map((t, i) => (
    <p key={t} className="file">
      {t}
    </p>
  ));

  return (
    <div className={name}>
      <p className="folder">{name}/</p>
      {items}
    </div>
  );
}

function Spacer({n}) {
  return (
    Array(n).fill(<p><br /></p>)
  )
}

function SelfTypingText({text}) {
  return (
    
  )
}

function Editor() {
  const MAX_LINES = 100; //calculate dynamically
  const [cursorPosition, setCursorPosition] = useState()

  function handleMouseMove(ev) {
    console.log(ev)
    console.log(this)
    setCursorPosition(ev.pageY)
  }

  useEffect(() =>
    window.addEventListener("scroll", handleMouseMove)
  )

  return (
    <div className="editor">
      <div className="side-panel">
        {Array.from({ length: MAX_LINES }, (_, i) => (
          <p key={i}>
            {i + 1}
          </p>
        ))}
      </div>

      <div className="text-field">
        <div className="highlight" style={{top: cursorPosition}}></div>
          <p> hello world, I am aleksei. </p>
          <Spacer n={3}/>
          <Folder name="portfolio" titles={["inception.java", "..."]} />
          <Spacer n={1}/>
          <Folder name="experience" titles={["nordea.txt", "test.cpp"]} />
          <Spacer n={1}/>
          <Folder name="contacts" titles={["nordea.txt", "test.cpp"]} />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TabBar titles={["about me", "portfolio", "experience", "contacts"]} />
    <Editor />
    <div className="footer">
      <div class="guide">
        <span>NORMAL</span>
      </div>
      <div class="decor">
        <span>unix | netrw</span>
        <div>
          <span>xx%</span>
        </div>
        <div>
          <span>x:x</span>
        </div>
      </div>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
