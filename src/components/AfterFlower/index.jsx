import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AfterFlower = () => {
  const [showOpenButton, setShowOpenButton] = useState(false);

  const [lettersTop, setLettersTop] = useState([]);
  const [lettersBottom, setLettersBottom] = useState([]);
  const [uniqueKey, setUniqueKey] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messageToDisplay = [
    "Aujourd'hui, mes désirs les plus chers sont :",
    "",
    "Que l'on puisse construire notre vie ensemble",
    "et réaliser des projets de vie,",
    "de fonder une famille avec toi",
    "et de vieillir à tes côtés, In Sha Allah.",
    "De tout faire",
    "pour te rendre heureuse, et t'apporter le sourire.",
    "Te soutenir à tout moment, et qu'à deux,",
    "on s'aide à être les meilleures versions de nous-mêmes.",
    "Encore une fois...",
    "",
  ];

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

    const timer1 = () => {
      setTimeout(() => {
        setShowOpenButton(true);
      }, 30000);
    };
    timer1();
    return () => clearInterval(interval, timer1); // Clear interval on component unmount
  }, []);
  return (
    <div className="night-sky">
      {/* {stars.map((star, index) => (
    <div
      key={index}
      style={{
        position: "absolute",
        left: `${star.x}px`,
        top: `${star.y}px`,
        width: `${star.radius}px`,
        height: `${star.radius}px`,
        backgroundColor: `rgba(255, 255, 255, ${star.opacity})`,
        borderRadius: "50%",
      }}
    />
  ))} */}
      <div key={uniqueKey} className="title text-[2.5rem] font-bold">
        {/* Top line */}
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

        {/* Bottom line */}
        {lettersBottom.length > 0 && (
          <div className="text-line mt-4">
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
      {showOpenButton && (
        <div className="absolute flex justify-center top-[60vh] m-auto  w-[100%] left-0">
          <Link to="/iloveyou">
            <div className="btn">
              <svg
                height="24"
                width="24"
                fill="#FFFFFF"
                viewBox="0 0 24 24"
                className="sparkle"
              >
                <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
              </svg>
              <span className="text">Open</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AfterFlower;
