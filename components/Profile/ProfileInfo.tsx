// ProfileInfo.tsx
import React from "react";
import { UserProfile } from "../../interfaces/userProfile";

interface Props {
  userProfile: UserProfile;
}

const ProfileInfo: React.FC<Props> = ({ userProfile }) => (
  <div className="flex space-x-10 text-white">
    <img
      src={userProfile.image}
      alt="User Avatar"
      className="w-32 h-32 mx-auto rounded-full"
    />
    <div className="flex flex-col items-start text-left">
      <h2 className="mt-4 text-2xl font-bold text-center">
        {userProfile.name}
      </h2>
      <p className="mt-2 text-center">{userProfile.bio}</p>
      <p className="mt-1 text-center">
        Quizzes Played: {userProfile.quizzesPlayed}
      </p>
    </div>
  </div>
);

export default ProfileInfo;
