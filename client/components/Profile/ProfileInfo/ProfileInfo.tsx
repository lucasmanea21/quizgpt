// ProfileInfo.tsx
import React from "react";
import { UserProfile } from "../../../interfaces/userProfile";
import { MdQuiz, MdStar } from "react-icons/md";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "../../../utils/supabaseClient";

interface Props {
  userProfile: UserProfile;
  setIsEditing: any;
}

const ProfileInfo: React.FC<Props> = ({ userProfile, setIsEditing }) => {
  const user = useUser();

  const onEdit = () => setIsEditing(true);
  const onLogout = async () => {
    await supabase.auth.signOut();
    // redirect to /
  };

  return userProfile ? (
    <div className="relative flex flex-col items-center justify-center w-full h-full space-y-5 text-white md:px-10 md:space-x-10 md:justify-between md:flex-row">
      <div className="flex flex-col items-center justify-center md:space-x-10 md:flex-row ">
        <img
          src={userProfile?.avatar_url}
          alt="User Avatar"
          className="w-32 h-32 rounded-full"
        />
        <div className="flex flex-col justify-center md:items-start">
          <h2 className="mt-4 text-2xl font-bold text-center">
            {userProfile?.name}
          </h2>
          <p className="mt-2 text-center text-md">
            {userProfile.bio ?? "No bio."}
          </p>
          <p className="mt-5 mb-2 text-sm text-center text-gray-200">
            {/* Date Joined: {new Date(user?.createdAt).toLocaleDateString()} */}
            Date Joined: {new Date(user?.created_at).toLocaleDateString()}
          </p>
          <div className="flex space-x-5">
            <div className="flex items-center mt-1 text-center">
              <MdQuiz className="mr-2" size={25} />
              <p>Played: {userProfile.quizzesPlayed}</p>
            </div>
            <div className="flex items-center mt-1 text-center">
              <MdStar className="mr-2" size={25} />
              {/* <p>Points: {userProfile.points}</p> */}
              <p>Points: 99</p>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <button
          className="self-center w-full p-1 mt-4 text-lg text-black bg-white rounded"
          onClick={onEdit}
        >
          Edit Profile
        </button>
        <button
          onClick={onLogout}
          className="self-center w-full p-1 mt-2 text-lg text-black bg-white rounded"
        >
          Log Out
        </button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ProfileInfo;
