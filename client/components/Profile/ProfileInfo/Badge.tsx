// BadgeComponent.tsx
import React, { useState } from "react";
import { Badge } from "../../../interfaces/userProfile";

interface Props {
  badge: Badge;
}

const BadgeComponent: React.FC<Props> = ({ badge }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded shadow"
    >
      <img
        src={badge.image}
        alt={badge.name}
        className="w-12 h-12 mx-auto rounded-full"
      />
      {isHovered && (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full p-2 bg-gray-800 bg-opacity-75 rounded">
          <div className="text-center">
            <h3 className="text-lg font-bold">{badge.name}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeComponent;
