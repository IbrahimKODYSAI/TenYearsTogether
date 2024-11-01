import React, { useState, useEffect } from "react";

const Loading = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const keyframes = [
      { time: 0, percentage: 0 },
      { time: 0.2, percentage: 1 },
      { time: 0.4, percentage: 2 },
      { time: 0.6, percentage: 3 },
      { time: 0.8, percentage: 4 },
      { time: 1, percentage: 5 },
      { time: 1.5, percentage: 15 },
      { time: 2.5, percentage: 15 }, // Pause from 1.5s to 2.5s
      { time: 3.5, percentage: 22 },
      { time: 4.5, percentage: 22 }, // Pause from 3.5s to 4.5s
      { time: 5.5, percentage: 36 },
      { time: 6.5, percentage: 36 }, // Pause from 5.5s to 6.5s
      { time: 8.5, percentage: 75 },
      { time: 9.5, percentage: 75 }, // Pause from 8.5s to 9.5s
      { time: 10, percentage: 80 },
      { time: 11, percentage: 80 }, // Pause from 10s to 11s
      { time: 13, percentage: 99 },
      { time: 14, percentage: 99 }, // Pause from 13s to 14s
      { time: 15, percentage: 100 },
    ];

    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsedTime = (Date.now() - startTime) / 1000; // in seconds
      if (elapsedTime >= 15) {
        setPercentage(100);
        clearInterval(interval);
        return;
      }

      const getPercentageAtTime = (t) => {
        for (let i = 0; i < keyframes.length - 1; i++) {
          const kf1 = keyframes[i];
          const kf2 = keyframes[i + 1];
          if (t >= kf1.time && t < kf2.time) {
            const timeDiff = kf2.time - kf1.time;
            const percentageDiff = kf2.percentage - kf1.percentage;
            if (timeDiff === 0) return kf1.percentage; // Avoid division by zero
            const timeSinceKf1 = t - kf1.time;
            const percentage =
              kf1.percentage + (percentageDiff * timeSinceKf1) / timeDiff;
            return percentage;
          }
        }
        return 100; // If time t >= last keyframe time
      };

      setPercentage(getPercentageAtTime(elapsedTime));
    }, 100); // update every 100ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="text-white text-7xl w-32"> {percentage.toFixed(0)}</p>
    </div>
  );
};

export default Loading;
