import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import MainPage from "./components/mainPage/mainPage";
import GithubPage from "./components/githubPage/githubPage";
import Editor from "./components/editor/editor";
import { BrowserRouter } from "react-router-dom";

function TabBar({ titles, selected, onTabOpen, onTabClose }) {
  const tabs = titles.map((t, i) => (
    <div
      key={t}
      className={"tab" + (t === "main" ? " main-tab" : "")}
      id={selected === t ? "selected" : ""}
      onClick={() => onTabOpen(t, null)}
    >
      <span>{t}</span>
      <button onClick={(ev) => onTabClose(ev, t)}>✕</button>
    </div>
  ));

  return <div className="tab-bar">{tabs}</div>;
}

function Footer({ filename, docEl }) {
  const [scrollY, setScrollY] = useState(0);
  const pageHeight = docEl.scrollHeight - window.innerHeight;
  const percentage = pageHeight > 0 ? Math.round((scrollY / pageHeight) * 100) : 0;

  useEffect(() => {
    function handleScroll(ev) {
      const el = ev.target.documentElement;
      console.log(el)

      setScrollY(el.scrollTop);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll)
    };
  } );

  return (
    <div className="footer">
        <div className="mode-indicator">
          <span>NORMAL</span>
        </div>
        <span>{filename}</span>

        <span>{percentage + "%"}</span>
    </div>
  );
}

function Window() {
  const [openPages, setOpenPages] = useState({
    main: { page: MainPage(handleTabOpen), y: 0 },
  });
  const [history, setHistory] = useState(new Set().add("main"));

  const titles = Object.keys(openPages);
  const tab = Array.from(history).pop();
  const page = openPages[tab]["page"];

  const pageRef = useRef(null);
  const docEl = window.document.documentElement;

  useLayoutEffect(() => {
    if (pageRef.current) {
      docEl.scrollTo(0, openPages[tab]["y"]);
    }
  }, [tab]);

  function handleTabOpen(title, page) {
    setOpenPages((prevState) => {
      prevState[tab]["y"] = docEl.scrollTop;
      console.log(prevState)
      if (title in prevState) return prevState;
      else return { ...prevState, [title]: { page: page, y: 0 } };
    });

    setHistory((prevState) => {
      const newState = new Set(prevState);
      newState.delete(title);
      return newState.add(title);
    });
  }

  function handleTabClose(ev, title) {
    ev.stopPropagation(); //prevent handleTabOpen from firing simultaneously

    setOpenPages((prevState) => {
      delete prevState[title];
      return prevState;
    });

    setHistory((prevState) => {
      const newState = new Set(prevState);
      newState.delete(title);
      return newState;
    });

    //TODO: add rickroll
  }

  return (
    <>
      <TabBar
        titles={titles}
        selected={tab}
        onTabOpen={handleTabOpen}
        onTabClose={handleTabClose}
      />

      <div className="page" ref={pageRef}>
        {page}
      </div>

      <Footer filename={tab} docEl={docEl} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <Window />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
