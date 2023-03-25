import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Editor from "./components/editor/editor";
import MainPage from "./components/mainPage/mainPage.js";

function Tabs({ titles, onTabOpen, onTabClose }) {
  const tabs = titles.map((t, i) => (
    <div key={t} className="tab" onClick={() => onTabOpen(t)}>
      <span>{t}</span>
      <button onClick={ev => onTabClose(ev, t)}>X</button>
    </div>
  ));

  return <div className="tab-bar">{tabs}</div>;
}

function Window() {
  const [currentPage, setCurrentPage] = useState("main");
  const [tabs, setTabs] = useState([currentPage]);

  useEffect(
    () => console.log(tabs),
    [tabs]
  )

  const Pages = Object.freeze({
    "main": MainPage(handleLinkClick),
    "inception.java": MainPage(handleLinkClick)
  })

  function handleLinkClick(address) {
    if (!(address in Pages)) return;
    console.log("fired")

    setCurrentPage(address);

    if (tabs.includes(address)) {
      return;
    }

    const nextTabs = tabsOpen => [...tabsOpen, address];
    setTabs(nextTabs);
  }

  function handleTabClose(ev, address) {
    ev.stopPropagation(); //prevent handleLinkClick from firing simultaneously

    //TODO: add rickroll
    setCurrentPage(tabs[tabs.indexOf(address)-1])

    const nextTabs = tabs => tabs.filter(t => t !== address)
    setTabs(nextTabs); 
  }

  return (
    <>
      <Tabs titles={tabs} onTabOpen={handleLinkClick} onTabClose={handleTabClose}/>

      {Pages[currentPage]} 

      <div className="footer">
        <div className="guide">
          <span>NORMAL</span>
        </div>
        <div className="decor">
          <span>unix | netrw</span>
          <div>
            <span>xx%</span>
          </div>
          <div>
            <span>x:x</span>
          </div>
        </div>
      </div>
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
reportWebVitals();
