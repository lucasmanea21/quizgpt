// components/Timer.tsx
import { useState, useEffect } from "react";
import { GAME_DURATION } from "../../utils/config";
import { useAtom } from "jotai";
import { gameStartTimeAtom } from "../../store/atom";

interface TimerProps {
  onTimeUp: () => void;
  time: number;
  startTime: number;
}

export const Timer: React.FC<TimerProps> = ({ onTimeUp, time, startTime }) => {
  // const [startTime] = useAtom(gameStartTimeAtom);

  const [remainingTime, setRemainingTime] = useState(time);

  console.log("time, startTime", time, startTime);

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

  return (
    <div className="mb-4 text-xl font-bold">
      Time remaining: {Math.ceil(remainingTime / 1000)}s
    </div>
  );
};
