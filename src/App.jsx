import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Flowers from "./components/Flowers";
import FlowersCanvas from "./components/Flowers/FlowersCanvas";
import { useEffect, useState } from "react";
import AuroraScene from "./components/Aurora";

function App() {
  const [isFullscreenApplied, setIsFullscreenApplied] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768); // Set initial width check for desktop

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const enterFullscreen = () => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
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
  let bgMusicAudio = new Audio("./sounds/bg-music.mp3");
  bgMusicAudio.loop = true;
  fireworksAudio.volume = 0.3;

  const playTheSound = () => {
    const currentPath = window.location.pathname;
    bgMusicAudio.play();
    if (currentPath === "/") {
      fireworksAudio.play();
    }
  };

  const routesWithAurora = ["/", "/something-for-you", "/flowers-for-you"];

  if (!isDesktop) {
    return (
      <div className="text-center mt-20 text-lg">
        Please view this content on a larger screen.
      </div>
    );
  }

  return (
    <div>
      {routesWithAurora.includes(location.pathname) && <AuroraScene />}
      {isFullscreenApplied ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/something-for-you" element={<Flowers />} />
            <Route path="/flowers-for-you" element={<FlowersCanvas />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <div className="absolute flex justify-center top-[50vh] m-auto w-[100%] left-0 text-3xl">
          <button
            onClick={() => {
              enterFullscreen();
              playTheSound();
              setIsFullscreenApplied(true);
            }}
            className="text-white px-4 py-2 rounded-lg btn2"
          >
            Commencer
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
