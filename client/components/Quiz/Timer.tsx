import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface TimerProps {
  onTimeUp: () => void;
  time: number;
  startTime: number;
}

export const Timer: React.FC<TimerProps> = ({ onTimeUp, time, startTime }) => {
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, time - elapsed);
      setRemainingTime(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onTimeUp();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, onTimeUp]);

  const percentage = (remainingTime / time) * 100;

  return (
    <div className="mb-4 text-xl font-bold text-white">
      <CircularProgressbar
        value={percentage}
        text={`${Math.ceil(remainingTime / 1000)}s`}
        styles={buildStyles({
          textSize: "35px",
          textColor: "#fff",
          trailColor: "#d6d6d6",
          pathColor: "#3b82f6",
        })}
      />
    </div>
  );
};
