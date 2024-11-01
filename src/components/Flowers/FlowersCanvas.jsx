import { useEffect, useState } from "react";
import { stars } from "../../utils";
import "./flowers.css";
import { Link } from "react-router-dom";
const FlowersCanvas = () => {
  const [lettersTop, setLettersTop] = useState([]);
  const [lettersBottom, setLettersBottom] = useState([]);
  const [uniqueKey, setUniqueKey] = useState(0);

  const [showOpenButton, setShowOpenButton] = useState(false);

  const messageToDisplay = ["Je t'aime Assia Imsour !", "Ibrahim Kody saneda"];

  useEffect(() => {
    const displayText = (topMessage, bottomMessage = "") => {
      const charactersTop = topMessage.split("").map((char, index) => ({
        char,
        delay: Math.random() * 2,
        key: `top-${index}`,
      }));
      const charactersBottom = bottomMessage
        ? bottomMessage.split("").map((char, index) => ({
            char,
            delay: Math.random() * 2,
            key: `bottom-${index}`,
          }))
        : [];

      setLettersTop(charactersTop);
      setLettersBottom(charactersBottom);
      setUniqueKey((prevKey) => prevKey + 1);
    };

    // Display the first message pair immediately

    const interval = setTimeout(() => {
      displayText(messageToDisplay[0], messageToDisplay[1]);
    }, 6000);

    // const timer1 = () => {
    //   setTimeout(() => {
    //     setShowOpenButton(true);
    //   }, 9000);
    // };
    // timer1();

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div>
      <div className="absolute flex justify-center top-[50px] m-auto  w-[100%] left-0 z-10">
        {/* {showOpenButton && (
          <Link to="/place-to-visit">
            <button className="btn">Continuer</button>
          </Link>
        )} */}
        <div key={uniqueKey} className="title text-[2.5rem] font-bold">
          <div className="text-line">
            {lettersTop.map(({ char, delay, key }) => (
              <span
                key={key}
                style={{ animationDelay: `${delay}s` }}
                className="animated-letter"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flowers">
        <div className="flower flower--1">
          <div className="flower__leafs flower__leafs--1">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`flower__leaf flower__leaf--${num}`}
              ></div>
            ))}
            <div className="flower__white-circle"></div>
            {[...Array(8).keys()].map((num) => (
              <div
                key={num}
                className={`flower__light flower__light--${num + 1}`}
              ></div>
            ))}
          </div>
          <div className="flower__line flower_line-1">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className={`flower__line__leaf flower__line__leaf--${num}`}
              ></div>
            ))}
          </div>
        </div>

        {[2, 3, 4].map((flowerNum) => (
          <div key={flowerNum} className={`flower flower--${flowerNum}`}>
            <div className={`flower__leafs flower__leafs--${flowerNum}`}>
              {[1, 2, 3, 4].map((leafNum) => (
                <div
                  key={leafNum}
                  className={`flower__leaf flower__leaf--${leafNum}`}
                ></div>
              ))}
              <div className="flower__white-circle"></div>
              {[...Array(8).keys()].map((num) => (
                <div
                  key={num}
                  className={`flower__light flower__light--${num + 1}`}
                ></div>
              ))}
            </div>
            <div className="flower__line">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className={`flower__line__leaf flower__line__leaf--${num}`}
                ></div>
              ))}
            </div>
          </div>
        ))}

        <div className="grow-ans" style={{ "--d": "1.2s" }}>
          <div className="flower__g-long">
            <div className="flower__g-long__top"></div>
            <div className="flower__g-long__bottom"></div>
          </div>
        </div>

        {[1, 2].map((grassNum) => (
          <div key={grassNum} className="growing-grass">
            <div className={`flower__grass flower__grass--${grassNum}`}>
              <div className="flower__grass--top"></div>
              <div className="flower__grass--bottom"></div>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div
                  key={num}
                  className={`flower__grass__leaf flower__grass__leaf--${num}`}
                ></div>
              ))}
              <div className="flower__grass__overlay"></div>
            </div>
          </div>
        ))}

        {[2.4, 2.8].map((delay, idx) => (
          <div key={idx} className="grow-ans" style={{ "--d": `${delay}s` }}>
            <div className={`flower__g-right flower__g-right--${idx + 1}`}>
              <div className="leaf"></div>
            </div>
          </div>
        ))}

        <div className="grow-ans" style={{ "--d": "2.8s" }}>
          <div className="flower__g-front">
            {[...Array(8).keys()].map((num) => (
              <div
                key={num}
                className={`flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${
                  num + 1
                }`}
              >
                <div className="flower__g-front__leaf"></div>
              </div>
            ))}
            <div className="flower__g-front__line"></div>
          </div>
        </div>

        <div className="grow-ans" style={{ "--d": "3.2s" }}>
          <div className="flower__g-fr">
            <div className="leaf"></div>
            {[...Array(8).keys()].map((num) => (
              <div
                key={num}
                className={`flower__g-fr__leaf flower__g-fr__leaf--${num + 1}`}
              ></div>
            ))}
          </div>
        </div>

        {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => (
          <div key={num} className={`long-g long-g--${num}`}>
            {[3.6, 4, 3, 3.6].map((delay, idx) => (
              <div
                key={idx}
                className="grow-ans"
                style={{ "--d": `${delay}s` }}
              >
                <div className={`leaf leaf--${idx}`}></div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="bubbles">
        {[...Array(20).keys()].map((num) => (
          <div key={num} className="bubble">
            <svg className="heart" viewBox="0 0 32 32">
              <title>heart22</title>
              <path d="M23.6 2c-3.363 0-6.258 2.736-7.599 5.594-1.342-2.858-4.237-5.594-7.601-5.594-4.637 0-8.4 3.764-8.4 8.401 0 9.433 9.516 11.906 16.001 21.232 6.13-9.268 15.999-12.1 15.999-21.232 0-4.637-3.763-8.401-8.4-8.401z"></path>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowersCanvas;
