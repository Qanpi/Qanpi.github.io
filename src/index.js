import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import MainPage from "./components/mainPage/mainPage";
import GithubPage from "./components/githubPage/githubPage";
import Editor from "./components/editor/editor";

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

function Footer({ filename, pageRef }) {
  const [scrollY, setScrollY] = useState(0);
  const [pageHeight, setPageHeight] = useState(1);
  const percentage = Math.round((scrollY / pageHeight) * 100);

  useEffect(() => {
    function handleScroll(ev) {
      const el = ev.target;

      setScrollY(el.scrollTop);
      setPageHeight(el.scrollTopMax);
    }

    pageRef.current.addEventListener("scroll", handleScroll);

    return () => pageRef.current.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="footer">
      <div className="left">
        <div className="mode-indicator">
          <span>NORMAL</span>
        </div>
        <span>{filename}</span>
      </div>
      <div className="right">
        <span>unix | netrw</span>
        <span>{percentage}%</span>
      </div>
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

  useLayoutEffect(() => {
    if (pageRef.current) {
      const weirdOffset = tab === "main" ? 72 : 0; //very botched fix for some autoscrolling weirdness 
      pageRef.current.scrollTo(0, openPages[tab]["y"] - weirdOffset);
    }
  }, [tab]);

  function handleTabOpen(title, page) {
    setOpenPages((prevState) => {
      console.log(tab, pageRef.current.scrollTop);
      prevState[tab]["y"] = pageRef.current.scrollTop;
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

      <Footer filename={tab} pageRef={pageRef} />
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
