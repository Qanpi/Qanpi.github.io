import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import MainPage from "./components/mainPage/mainPage";
import GithubPage from "./components/githubPage/githubPage";
import Editor from "./components/editor/editor";

function TabBar({ titles, selected, onTabOpen, onTabClose }) {
  const tabs = titles.map((t, i) => (
    <div key={t} className="tab" id={selected === t ? "selected" : ""} onClick={() => onTabOpen(t)}>
      <span>{t}</span>
      <button onClick={ev => onTabClose(ev, t)}>✕</button>
    </div>
  ));

  return <div className="tab-bar">{tabs}</div>;
}

function Nordea() {
  return (
    <Editor className="experience">
      <p className="green">Sep 1, 2021.</p>
      <p>A week-long experience at Nordea for TET.</p>
      <p></p>
      <p>As part of my responsibilities, created material about entrepreneurship.</p>
      <p></p>
      <p>Also appearead on <span className="emphasis">national TV and Nordea social media.</span></p>
      <p></p>
      <p>Plus, met and talked to some great people.</p>
    </Editor>
  )
}

function Slush() {
  return (
    <Editor>
      <p className="green">Nov 2022.</p>
      <p>Attended as a <span className="emphasis">volunteer in Partnership Chambers.</span></p>
      <p></p>
      <p>Got to meet great people, and great companies.</p>
      <p>+ great merch :)</p>
      <p></p>
      <p>Planning to apply for position as Group Lead next season.</p>
    </Editor>
  )
}

function Rovio() {
  return (
    <Editor>
      <p className="green">January 2023.</p>
      <p>After winning the <span className="emphasis">first place in a Rovio-sponsored hackathon</span>, my friends and I were awarded a day at the office.</p>
      <p></p>
      <p>We got a tour of the Rovio building, insight into unreleased games and a bunch of snacks.</p>
      <p></p>
      <p><span className="emphasis">The people at Rovio</span>, and the discussions we shared, were undoubtedly the best part of it, though.</p>
    </Editor>
  )
}

function Footer({filename}) {
  const [scrollY, setScrollY] = useState(0)
  const [pageHeight, setPageHeight] = useState(1);
  const percentage = Math.round(scrollY / pageHeight * 100);

  useEffect(() => {
    function handleScroll(ev) {
      const doc = ev.target.documentElement;
      console.log(doc)

      setScrollY(doc.scrollTop);
      setPageHeight(doc.offsetHeight - doc.clientHeight);
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll);
  })

   return (
<div className="footer">
        <div className="left">
          <div className="mode-indicator"><span>NORMAL</span></div>
          <span>{filename}</span>
        </div>
        <div className="right">
          <span>unix | netrw</span>
          <span >{percentage}%</span>
        </div>
      </div>
  )
}

function Window() {
  //too many magic strings, maybe address somehow later
  const pagesLookup = {
    "main": MainPage(handleLinkClick),
    //portfolio
    "iqArrowsSolver.java": GithubPage("iqArrowsSolver"),
    "aoc2022.clj": GithubPage("aoc2022"),
    "inception.java": GithubPage("inception"),
    "datatähti2023.cpp": GithubPage("datatahti2023"),
    "stega.py": GithubPage("stega"),
    //experience
    "nordea": Nordea(),
    "slush": Slush(), 
    "rovio": Rovio()
  }

  const [currentTab, setCurrentTab] = useState("main");
  const [tabs, setTabs] = useState([currentTab]);
  const currentPage = pagesLookup[currentTab];

  const overflow = pagesLookup[currentTab].type === "iframe" ? "hidden" : "";

  useEffect(() => {
    window.document.body.style["overflow"] = overflow;

    return () => window.document.body.style["overflow"] = overflow;
  }, [overflow])


  function handleLinkClick(address) {
    if (!(address in pagesLookup)) return;
    window.scroll(0, 0); 

    setCurrentTab(address);

    if (tabs.includes(address)) return;

    const nextTabs = tabsOpen => [...tabsOpen, address];
    setTabs(nextTabs);
  }

  function handleTabClose(ev, address) {
    ev.stopPropagation(); //prevent handleLinkClick from firing simultaneously

    //TODO: add rickroll
    const i = tabs.indexOf(address);
    const index = i > 0 ? i - 1 : 1;
    setCurrentTab(tabs[index])

    const nextTabs = tabs => tabs.filter(t => t !== address)
    setTabs(nextTabs); 
  }
  
  return (
    <>
      <TabBar titles={tabs} selected={currentTab} onTabOpen={handleLinkClick} onTabClose={handleTabClose}/>

      {currentPage} 

      <Footer filename={currentTab}/>
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
