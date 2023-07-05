// ProfileInfo.tsx
import React from "react";
import { UserProfile } from "../../../interfaces/userProfile";

interface Props {
  userProfile: UserProfile;
}

const ProfileInfo: React.FC<Props> = ({ userProfile }) => {
  return userProfile ? (
    <div className="flex justify-between w-2/3 space-x-10 text-white">
      <img
        src={userProfile?.avatar_url}
        alt="User Avatar"
        className="w-32 h-32 rounded-full"
      />
      <div className="flex flex-col items-start text-left">
        <h2 className="mt-4 text-2xl font-bold text-center">
          {userProfile?.name}
        </h2>
        <p className="mt-2 text-center">{userProfile.bio}</p>
        <p className="mt-1 text-center">
          Quizzes Played: {userProfile.quizzesPlayed}
        </p>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ProfileInfo;
