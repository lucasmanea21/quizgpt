// AchievementComponent.tsx
import React from "react";
import { Achievement } from "../../../interfaces/userProfile";

interface Props {
  achievement: Achievement;
}

const AchievementComponent: React.FC<Props> = ({ achievement }) => (
  <div className="p-4 bg-gray-200 rounded shadow">
    <img
      src={achievement.image}
      alt={achievement.name}
      className="w-24 h-24 mx-auto rounded"
    />
    <h3 className="mt-2 text-lg font-bold text-center">{achievement.name}</h3>
    <p className="text-center">{achievement.description}</p>
  </div>
);

export default AchievementComponent;
