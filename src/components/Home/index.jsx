import { useEffect, useRef, useState } from "react";
import { initializeFireworks } from "./CanvasFireWorks";
import "./index.css";
import { Link } from "react-router-dom";

const Home = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      initializeFireworks(canvasRef.current);
    }
  }, []);

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true); // Show the message after 5000ms
    }, 12000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div>
      <canvas
        className="z-50"
        ref={canvasRef}
        style={{ width: "100%", height: "100vh" }}
      ></canvas>

      <div>
        {showMessage && (
          <Link to="/something-for-you">
            <button className="bg-gray-900 w-max  rounded absolute m-auto px-6 py-2 bottom-[25vh] left-0 right-0 cursor-pointer hover:bg-gray-950 bg-opacity-20 btn2">
              Continuer
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
