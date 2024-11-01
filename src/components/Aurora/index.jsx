import React, { useEffect, useState } from "react";
import "./AuroraScene.css";

const randomInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const nightsky = ["#280F36", "#632B6C", "#BE6590", "#FFC1A0", "#FE9C7F"];

const Star = ({ size, x, y, duration, delay, type }) => (
  <div
    className={`star star-${type} -z-10 blink`}
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
    <div className="stars-cross -z-10 blink">
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
    <div className="stars-cross-aux -z-10 blink">
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

const AuroraEffect = () => {
  const STAR_COUNT = 500;
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

  // Generate static hues for the aurora lights
  const hues = [120, 180, 240, 280];
  const alphas = [0.5, 0.6, 0.5, 0.3];

  return (
    <div
      className="scene"
      style={{
        "--hue-1": hues[0],
        "--hue-2": hues[1],
        "--hue-3": hues[2],
        "--hue-4": hues[3],
        "--hue-5": hues[4],
        "--alpha-1": alphas[0],
        "--alpha-2": alphas[1],
        "--alpha-3": alphas[2],
        "--alpha-4": alphas[3],
        "--alpha-5": alphas[4],
      }}
    >
      <div className="stars">
        {stars.map((star, index) => (
          <Star key={index} {...star} />
        ))}
      </div>
      <StarsCross crossCount={CROSS_COUNT} />
      <StarsCrossAux crossCount={CROSS_COUNT} />
      <div className="hill" />
      <div className="moon" />
      <div className="lights">
        {Array.from({ length: 40 }).map((_, index) => (
          <div
            key={index}
            className="light"
            style={{
              "--duration": randomInRange(5, 15),
              "--delay": randomInRange(4, 8),
              "--x": randomInRange(0, 5),
              "--y": randomInRange(0, 10),
              "--scale": Math.random() / 10,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AuroraEffect;
