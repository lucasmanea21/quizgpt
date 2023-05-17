// components/Timer.tsx
import { useState, useEffect } from "react";
import { GAME_DURATION } from "../../utils/config";
import { useAtom } from "jotai";
import { gameStartTimeAtom } from "../../store/atom";

interface TimerProps {
  onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = ({ onTimeUp }) => {
  const [startTime] = useAtom(gameStartTimeAtom);

  const [remainingTime, setRemainingTime] = useState(GAME_DURATION);

  console.log("startTime", startTime);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, GAME_DURATION - elapsed);
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
