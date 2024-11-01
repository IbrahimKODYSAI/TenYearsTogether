import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Flowers from "./components/Flowers";
import FlowersCanvas from "./components/Flowers/FlowersCanvas";
import { useEffect, useState } from "react";
import AuroraScene from "./components/Aurora";
import Paralax from "./components/Paralax";
import Loading from "./components/Loading";

function App() {
  const [isFullscreenApplied, setIsFullscreenApplied] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [percentage, setPercentage] = useState(false);

  const [passCode, setPassCode] = useState("");

  const formatDate = (value) => {
    // Remove any non-numeric characters
    const cleanedValue = value.replace(/\D/g, "");

    // Split into day, month, and year parts
    const day = cleanedValue.slice(0, 2);
    const month = cleanedValue.slice(2, 4);
    const year = cleanedValue.slice(4, 8);

    let formattedDate = day;
    if (month) formattedDate += `/${month}`;
    if (year) formattedDate += `/${year}`;
    return formattedDate;
  };

  const handleInputChange = (e) => {
    const formattedValue = formatDate(e.target.value);
    setPassCode(formattedValue);
  };

  useEffect(() => {
    if (["01/11/2014", "01-11-2014", "01112014"].includes(passCode)) {
      setShowButton(true);
    }
  }, [passCode]);

  const enterFullscreen = () => {
    const element = document.documentElement; // Fullscreen on the entire page

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen(); // Firefox
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); // Chrome, Safari, Opera
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen(); // IE/Edge
    }

    setIsFullscreenApplied(true);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreenApplied(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  let fireworksAudio = new Audio("./sounds/fireworks1.mp3");
  let bgMusicAuddio = new Audio("./sounds/bg-music.mp3");
  bgMusicAuddio.loop = true;
  fireworksAudio.volume = 0.3;

  const playTheSound = () => {
    const currentPath = window.location.pathname;
    bgMusicAuddio.play();
    if (currentPath === "/") {
      fireworksAudio.play();
    }
  };

  useEffect(() => {
    if (showButton === true) {
      setTimeout(() => {
        setPercentage(true);
      }, 15000);
    }
  }, [showButton]);

  const routesWithAurora = ["/", "/something-for-you", "/flowers-for-you"];

  return (
    <div>
      {routesWithAurora.includes(location.pathname) && <AuroraScene />}
      {isFullscreenApplied && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/something-for-you" element={<Flowers />} />
            <Route path="/flowers-for-you" element={<FlowersCanvas />} />
            <Route path="/about" element={<Paralax />} />
          </Routes>
        </BrowserRouter>
      )}
      {!isFullscreenApplied && (
        <div>
          {!showButton && (
            <div className="flex justify-center m-auto  w-[100vw] h-[100vh] bg-black">
              <input
                type="text"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={passCode}
                className="border rounded-lg bg-transparent py-1 px-2 w-[280px] h-max m-auto z-50"
                placeholder="Entre notre date d'anniversaire..."
              />
            </div>
          )}
          {showButton && (
            <div>
              <div className="absolute flex justify-center top-[50vh] m-auto  w-[100%] left-0 text-3xl">
                {percentage === true ? (
                  <button
                    onClick={() => {
                      enterFullscreen(), playTheSound();
                      setIsFullscreenApplied(true);
                    }}
                    className="text-white px-4 py-2 rounded-lg btn2"
                  >
                    Commencer
                  </button>
                ) : (
                  <div>
                    <p>
                      Prend le temps d'admirer ce magnifique ciel étoilé,
                      scintillant
                    </p>
                    <p>et cette aurore boreal spécialement fait pour toi</p>
                  </div>
                )}
              </div>
              <div className="absolute flex justify-center top-[65vh] m-auto  w-[100%] left-0">
                <Loading /> <p className=" self-end text-4xl pb-2">%</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
