import React, { useEffect, useState } from "react";
import "./PurplePageStyle.css";
import "../Aurora/AuroraScene.css";

const randomInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const nightsky = ["#280F36", "#632B6C", "#BE6590", "#FFC1A0", "#FE9C7F"];

const Star = ({ size, x, y, duration, delay, type }) => (
  <div
    className={`star star-${type} z-10 blink`}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}vw`,
      top: `${y}vh`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      backgroundColor: "white",
      opacity: type >= 3 ? 1 : 0.5, // Brighter for larger stars
      boxShadow:
        type >= 4
          ? `0px 0px 6px 1px ${nightsky[randomInRange(0, nightsky.length - 1)]}`
          : "none",
    }}
  />
);

const Blur = ({ color, top, left }) => (
  <div
    className="blur"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      backgroundColor: color,
    }}
  />
);

const StarsCross = ({ crossCount }) => {
  return (
    <div className="stars-cross z-10 blink">
      {Array.from({ length: crossCount }).map((_, index) => (
        <Blur
          key={index}
          color={nightsky[randomInRange(0, nightsky.length - 1)]}
          top={randomInRange(0, 100)}
          left={randomInRange(0, 100)}
        />
      ))}
    </div>
  );
};

const StarsCrossAux = ({ crossCount }) => {
  return (
    <div className="stars-cross-aux z-10 blink">
      {Array.from({ length: crossCount }).map((_, index) => (
        <Blur
          key={index}
          color={nightsky[randomInRange(0, nightsky.length - 1)]}
          top={randomInRange(0, 100)}
          left={randomInRange(0, 100)}
        />
      ))}
    </div>
  );
};
const PurplePage = () => {
  const STAR_COUNT = 1000;
  const CROSS_COUNT = 40;

  const [stars] = useState(
    new Array(STAR_COUNT).fill().map(() => ({
      size: randomInRange(1, 2.5),
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: randomInRange(2, 3),
      delay: randomInRange(1, 2),
      type: randomInRange(0, 5), // Star type for different sizes
    }))
  );

  const [lettersTop, setLettersTop] = useState([]);
  const [lettersBottom, setLettersBottom] = useState([]);
  const [uniqueKey, setUniqueKey] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messageToDisplay = ["Je t'aime."];

  useEffect(() => {
    const displayText = (topMessage, bottomMessage = "") => {
      const charactersTop = topMessage.split("").map((char, index) => ({
        char,
        delay: Math.random() * 1,
        key: `top-${index}`,
      }));
      const charactersBottom = bottomMessage
        ? bottomMessage.split("").map((char, index) => ({
            char,
            delay: Math.random() * 1,
            key: `bottom-${index}`,
          }))
        : [];

      setLettersTop(charactersTop);
      setLettersBottom(charactersBottom);
      setUniqueKey((prevKey) => prevKey + 1);
    };

    // Display the first message pair immediately
    displayText(messageToDisplay[0], messageToDisplay[1]);

    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => {
        const nextIndex = prevIndex + 2;

        // Check if we have reached the end of the messages
        if (nextIndex >= messageToDisplay.length) {
          clearInterval(interval);
          return prevIndex; // Keep the current index to stop updating
        }

        // Display next message pair
        displayText(
          messageToDisplay[nextIndex],
          messageToDisplay[nextIndex + 1] || ""
        );

        return nextIndex; // Move to the next pair
      });
    }, 6000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);
  return (
    <div>
      <div key={uniqueKey} className="title text-[2.5rem] font-bold">
        {/* Top line */}
        <div className="text-line z-50">
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

        {/* Bottom line */}
        {lettersBottom.length > 0 && (
          <div className="text-line mt-4 z-50">
            {lettersBottom.map(({ char, delay, key }) => (
              <span
                key={key}
                style={{ animationDelay: `${delay}s` }}
                className="animated-letter"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="">
        <div className="stars">
          {stars.map((star, index) => (
            <Star key={index} {...star} />
          ))}
        </div>
        <StarsCross crossCount={CROSS_COUNT} />
        <StarsCrossAux crossCount={CROSS_COUNT} />
      </div>
      <div className="absolute w-[100%] top-0 left-0 ">
        <div className="sky">
          <div className="mountains z-50">
            <div className="mountain-1 z-50"></div>
            <div className="mountain-2 z-50"></div>
            <div className="land-1 z-50"></div>
            <div className="land-2 z-50"></div>
            <div className="land-3 z-50"></div>
          </div>
          <div className="mountains-base z-50"></div>
          <div className="light-base "></div>
          <div className="stars"></div>
          <div className="stars-cross"></div>
          <div className="stars-cross-aux"></div>
        </div>
      </div>
    </div>
  );
};

export default PurplePage;
