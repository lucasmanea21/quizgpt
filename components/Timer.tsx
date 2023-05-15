// components/Timer.tsx
import { useState, useEffect } from "react";

interface TimerProps {
  onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = ({ onTimeUp }) => {
  const [time, setTime] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (time === 0) {
        onTimeUp();
        setTime(10);
      } else {
        setTime(time - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [time]);

  return <div className="text-xl font-bold mb-4">Time remaining: {time}s</div>;
};
