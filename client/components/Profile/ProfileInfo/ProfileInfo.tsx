// ProfileInfo.tsx
import React from "react";
import { UserProfile } from "../../../interfaces/userProfile";
import { MdQuiz, MdStar } from "react-icons/md";
import { useUser } from "@supabase/auth-helpers-react";

interface Props {
  userProfile: UserProfile;
}

const ProfileInfo: React.FC<Props> = ({ userProfile }) => {
  const user = useUser();
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
        <div className="flex items-center mt-1 text-center">
          <MdQuiz className="mr-2" />
          <p>Quizzes Played: {userProfile.quizzesPlayed}</p>
        </div>
        <div className="flex items-center mt-1 text-center">
          <MdStar className="mr-2" />
          {/* <p>Points: {userProfile.points}</p> */}
          <p>Points: 99</p>
        </div>
        <p className="mt-1 text-center">
          {/* Date Joined: {new Date(user?.createdAt).toLocaleDateString()} */}
          Date Joined: {new Date(user?.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ProfileInfo;
