import React, { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Editor from "../editor/editor";
import GithubPage from "../githubPage/githubPage";
import "./mainPage.css";

function Nordea() {
  return (
    <Editor className="experience">
      <p className="green">Sep 1, 2021.</p>
      <p>A week-long experience at Nordea for TET.</p>
      <p></p>
      <p>
        As part of my responsibilities, created material about entrepreneurship.
      </p>
      <p></p>
      <p>
        Also appearead on{" "}
        <span className="emphasis">national TV and Nordea social media.</span>
      </p>
      <p></p>
      <p>Plus, met and talked to some great people.</p>
    </Editor>
  );
}

function Slush() {
  return (
    <Editor>
      <p className="green">Nov 2022.</p>
      <p>
        Attended as a{" "}
        <span className="emphasis">volunteer in Partnership Chambers.</span>
      </p>
      <p></p>
      <p>Got to meet great people, and great companies.</p>
      <p>+ great merch :)</p>
      <p></p>
      <p>Planning to apply for position as Group Lead next season.</p>
    </Editor>
  );
}
function Rovio() {
  return (
    <Editor>
      <p className="green">January 2023.</p>
      <p>
        After winning the{" "}
        <span className="emphasis">
          first place in a Rovio-sponsored hackathon
        </span>
        , my friends and I were awarded a day at the office.
      </p>
      <p></p>
      <p>
        We got a tour of the Rovio building, insight into unreleased games and a
        bunch of snacks.
      </p>
      <p></p>
      <p>
        <span className="emphasis">The people at Rovio</span>, and the
        discussions we shared, were undoubtedly the best part of it, though.
      </p>
    </Editor>
  );
}

const useContainerDimensions = (myRef) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    lineHeight: 0,
  });

  useEffect(() => {
    const getDimensions = () => ({
      width: myRef.current.offsetWidth,
      height: myRef.current.offsetHeight,
      lineHeight: parseInt(getComputedStyle(myRef.current).lineHeight),
    });

    const handleResize = () => {
      myRef.current.style["height"] = "auto"; //done to reset height, so the additions don't compound
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      handleResize();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef]);

  return dimensions;
};

function TypeAnimationWrapper({ normalText, sequence }) {
  const ref = useRef(null);
  const { height, lineHeight } = useContainerDimensions(ref);

  const computedHeight = ref.current ? height + lineHeight + 10 + "px" : "auto";

  return (
    <p style={{ height: computedHeight }}>
      <span ref={ref}>{normalText}</span>
      <TypeAnimation
        sequence={sequence}
        repeat={Infinity}
        wrapper="span"
        className={"emphasis"}
        cursor={false}
      />
    </p>
  );
}


export default function MainPage(onLinkClick) {
  const interests = [
    "React",
    "data analysis",
    "Clojure",
    "AI/ML",
    "competitive programming",
    "computer vision",
  ];
  const interestsSequence = interests.map((t, i) => [" " + t, 1000]).flat();

  return (
    <Editor >
      <TypeAnimationWrapper
        normalText="hello world, my name is aleksei. I am an aspiring developer dabbling in "
        sequence={interestsSequence}
      />

      <p></p>

      <p></p>

      <p className="folder">portfolio/</p>
      <p className="file" onClick={() => onLinkClick("iqArrowsSolver.java", GithubPage("iqArrowsSolver"))}>
        iqArrowsSolver<span className="green">.java</span>
      </p>
      <p className="file" onClick={() => onLinkClick("aoc2022.clj", GithubPage("aoc2022"))}>
        aoc2022<span className="green">.clj</span>
      </p>
      <p className="file" onClick={() => onLinkClick("stega.py", GithubPage("stega"))}>
        stega<span className="green">.py</span>
      </p>
      <p className="file" onClick={() => onLinkClick("inception.java", GithubPage("inception"))}>
        inception<span className="green">.java</span>
      </p>
      <p className="file" onClick={() => onLinkClick("datatähti2023.cpp", GithubPage("datatahti2023"))}>
        datatähti2023<span className="green">.cpp</span>
      </p>
  
      <a href="http://github.com/Qanpi" rel="noreferrer" target="_blank">
        <p className="file">...</p>
      </a>

      <p></p>
      <p></p>

      <p>Currently, I am looking to expand my <span className="emphasis">professional expertise.</span></p>
      <a href="./CV2023_lite.pdf" rel="noreferrer">
        <p className="file">my CV</p>
      </a>

      <p></p>
      <p className="folder">experience/</p>
      <p className="file" onClick={() => onLinkClick("nordea", Nordea())}>nordea</p>
      <p className="file" onClick={() => onLinkClick("slush", Slush())}>slush2022</p>
      <p className="file" onClick={() => onLinkClick("rovio", Rovio())}>rovio</p>

      <p></p>
      <p></p>

      <p>Here are some of the ways you can <span className="emphasis">get in touch</span> with me.</p>

      <p></p>

      <p className="folder">contacts/</p>
      <a href="mailto:aleksei.terin@outlook.com">
        <p className="file">aleksei.terin@outlook.com</p>
      </a>
      <a href="https://www.linkedin.com/in/aleksei-terin/" rel="noreferrer" target="_blank">
        <p className="file">linkedIn</p>
      </a>
      <a href="https://github.com/Qanpi" rel="noreferrer" target="_blank">
        <p className="file">github</p>
      </a>
    </Editor>
  );
}
