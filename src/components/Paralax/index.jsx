import React, { useEffect } from "react";
import "./paralax.css";
import transitions from "../transitions";

const Paralax = () => {
  useEffect(() => {
    const handleScroll = () => {
      const value = window.scrollY;
      const bg = document.getElementById("bg");
      const moon = document.getElementById("moon");
      const mountain = document.getElementById("mountain");
      const road = document.getElementById("road");
      const text = document.getElementById("text");

      if (bg) bg.style.top = `${value * 0.5}px`;
      if (moon) moon.style.left = `${-value * 0.5}px`;
      if (mountain) mountain.style.top = `${-value * 0.15}px`;
      if (road) road.style.top = `${value * 0.15}px`;
      if (text) text.style.top = `${value * 1}px`;
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="paralax-container">
      <section>
        <img src="moon.png" id="moon" />
        <img src="mountain.png" id="mountain" />
        <img src="road.png" id="road" />
        <h2 id="text">Moon Light</h2>
      </section>
    </div>
  );
};

export default transitions(Paralax);
