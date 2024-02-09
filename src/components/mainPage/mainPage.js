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

      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.mtvuutiset.fi/artikkeli/etatyo-sai-rinnalleen-etatetin-jotta-korona-ajan-koululaisetkin-paasevat-tyoharjoitteluun-loistavia-tuloksia-vaikka-yksi-asia-harmittaa/7958856"
      >
        <p>
          Also appearead on
          <span className="emphasis">
            {" "}
            national TV and Nordea social media.
          </span>
        </p>
      </a>

      <p></p>
      <p>Plus, met and talked to some great people.</p>
      <p></p>
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
      <p></p>
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
      <p></p>
    </Editor>
  );
}
function Research() {
  return (
    <Editor>
      <p className="green">June 2022 - February 2023</p>
      <p>
        Under the supervision of my computer science professor, I completed
        research into{" "}
        <span className="emphasis">
          the viability of using synthetically generated data to train computer
          vision models
        </span>
        .
      </p>
      <p></p>
      <p>
        You can find an abstract of my paper{" "}
        <a
          href={process.env.PUBLIC_URL + "/abstract.pdf"}
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        , and browse the complete report{" "}
        <a
          href={process.env.PUBLIC_URL + "/report.pdf"}
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        .
      </p>
      <p></p>
      <p>
        I also{" "}
        <span className="emphasis">
          submitted my research paper to{" "}
          <a href="https://www.tukoke.fi/" target="_blank" rel="noreferrer">
            TuKoKe 2024
          </a>
        </span>
        , a national research contest, and hope to hear from them soon.
      </p>
      <p></p>
    </Editor>
  );
}
export function Copa() {
  return (
    <Editor>
      <p className="green">January 2023 - present</p>
      <p>
        After noticing a vacuum in software for managing football tournaments, I
        spent a year{" "}
        <span className="emphasis">
          solo designing and developing a web app
        </span>{" "}
        with intent to revolutionize hosting and participating in our school's
        soccer tournaments.
      </p>
      <p></p>
      <p>
        You can find the running application{" "}
        <a
          href="https://copadekuutio.azurewebsites.net/"
          target="_blank"
          rel={"noreferrer"}
        >
          here
        </a>
        , a comprehensive overview of my development journey on{" "}
        <a
          href="https://github.com/Qanpi/copa"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        , and a video detailing the main functionality{" "}
        <a
          href="https://www.youtube.com/watch?v=_Qzak7chLwM"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        .
      </p>
      <p></p>
      <p>
        In the process, I've amassed skills ranging from technical experience
        with{" "}
        <span className="emphasis">
          React.js, Node.js, Typescript, MongoDB and Azure for cloud hosting
        </span>{" "}
        to more abstract concepts like{" "}
        <span className="emphasis">
          requirements analysis, testing and quality assurance, open-source
          collaboration, and agile development
        </span>
        .
      </p>
      <p></p>
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

function TypeAnimationWrapper({ normalText, sequence, fontSize }) {
  const ref = useRef(null);
  const { height, lineHeight, width } = useContainerDimensions(ref);

  const extraLines = (2 - Math.floor(width / 1000)) * lineHeight; //add two for mobile, one for PC
  const computedHeight = ref.current ? height + extraLines + 10 + "px" : "auto";

  return (
    <p
      style={{
        height: computedHeight,
        fontSize: "max(3vw, 32px)",
        lineHeight: "1.2em",
      }}
    >
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

function Link({ url, children, target }) {
  return (
    <a href={url} rel="noreferrer noopener" target={target}>
      <p className="file">{children}</p>
    </a>
  );
}

export default function MainPage(onLinkClick) {
  const interests = [
    "React.js",
    "web development",
    "Node.js",
    "data analysis",
    "Typescript",
    "AI/ML",
    "competitive programming",
    "computer vision",
    "game development",
  ];

  const interestsSequence = interests.map((t, i) => [" " + t, 1000]).flat();

  const baseUrl = "https://qanpi.github.io/";

  return (
    <Editor>
      <TypeAnimationWrapper
        fontSize={"42px"}
        normalText="hello world, my name is aleksei. I am an enthusiastic developer dabbling in "
        sequence={interestsSequence}
      />

      <p></p>

      <p className="folder">portfolio/</p>

      {/* TODO: short preview on hover */}
      <Link url={"https://github.com/Qanpi/copa"}>
        copa<span className="green">.ts</span>
      </Link>

      <Link url={baseUrl + "stega"}>
        stega<span className="green">.py</span>
      </Link>

      <Link url={baseUrl + "iqArrowsSolver"}>
        iqArrowsSolver<span className="green">.java</span>
      </Link>

      <Link url={baseUrl + "aoc2022"}>
        aoc2022<span className="green">.clj</span>
      </Link>

      <Link url={baseUrl + "datatahti2023"}>
        datatähti2023<span className="green">.cpp</span>
      </Link>

      <Link url="http://github.com/Qanpi">...</Link>

      <p></p>

      <p className="folder">experience/</p>
      <p className="file" onClick={() => onLinkClick("copa", Copa())}>
        copa
      </p>
      <p
        className="file"
        onClick={() => onLinkClick("ML research", Research())}
      >
        ML research
      </p>
      <p className="file" onClick={() => onLinkClick("rovio", Rovio())}>
        rovio
      </p>
      <p className="file" onClick={() => onLinkClick("slush", Slush())}>
        slush2022
      </p>
      <p className="file" onClick={() => onLinkClick("nordea", Nordea())}>
        nordea
      </p>

      <p></p>

      <p>
        Currently, I am looking to expand my{" "}
        <span className="emphasis">professional expertise.</span>
      </p>
      <Link url={process.env.PUBLIC_URL + "/CV2024.pdf"} target="_blank">
        my CV
      </Link>

      <p></p>

      <p>
        Here are some of the ways you can{" "}
        <span className="emphasis">get in touch</span> with me.
      </p>

      <p></p>

      <p className="folder">contacts/</p>
      <Link url="mailto:aleksei.terin@outlook.com">
        aleksei.terin@outlook.com
      </Link>

      <Link url="https://www.linkedin.com/in/aleksei-terin/" target="_blank">
        linkedIn
      </Link>

      <Link url="https://github.com/Qanpi" target="_blank">
        github
      </Link>

      <p></p>
    </Editor>
  );
}
