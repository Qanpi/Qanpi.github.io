import React, { useEffect, useRef, useState } from "react";
import handleViewport from "react-in-viewport";
import { TypeAnimation } from "react-type-animation";
import Editor from "../editor/editor";
import "./mainPage.css";

function Link({children, className, onClick}) {
  return (
    <p className={className} onClick={() => onClick(children)}>{children}</p>
  )
}

const useContainerDimensions = myRef => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, lineHeight: 0})

  useEffect(() => {
    const getDimensions = () => ({
      width: myRef.current.offsetWidth,
      height: myRef.current.offsetHeight,
      lineHeight: parseInt(getComputedStyle(myRef.current).lineHeight)
    })

    const handleResize = () => {
      myRef.current.style["height"] = "auto"; //done to reset height, so the additions don't compound
      setDimensions(getDimensions())
    }

    if (myRef.current) {
      handleResize();
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return dimensions;
};

function TypeAnimationWrapper({normalText, sequence}) {
  const ref = useRef(null);
  const {height, lineHeight} = useContainerDimensions(ref);
  const computedHeight = ref.current ? height + lineHeight + "px" : "auto"; 

  return (
    <p style={{height: computedHeight}}>
      <span ref={ref}>{normalText}</span>
      <TypeAnimation
        sequence={sequence}
        repeat={Infinity}
        wrapper="span"
        className={`type-animation`}
        cursor={false}
      />
    </p>
  )
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
    <Editor>
      <>
        <TypeAnimationWrapper normalText="hello world, my name is aleksei. I am an aspiring developer dabbling in "
        sequence={interestsSequence} />
        <p></p>
        <p></p>
      </>

      <>
        <p className="folder">portfolio/</p>
        <Link className="file" onClick={onLinkClick}>inception.java</Link>
      </>

      <>
        <p></p>
        <p></p>
        <p>Currently, I am looking to expand my professional expertise.</p>
        <p></p>
        <p className="folder">experience/</p>
        <p className="file">inception.java</p>
        <p className="file">...</p>

        <p></p>
        <p></p>
        <p>Here are some of the ways you can get in touch with me.</p>
        <p></p>
        <p className="folder">contacts/</p>
        <p className="file">inception.java</p>
        <p className="file">...</p>
      </>
    </Editor>
  );
}
