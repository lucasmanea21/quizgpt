// ProfileComponent.tsx
import React from "react";
import { useAtom } from "jotai";
import { userProfileAtom } from "../../store/atom";
import AchievementComponent from "./ProfileInfo/AchievementComponent";
import BadgeComponent from "./ProfileInfo/Badge";
import SocialMediaComponent from "./ProfileInfo/SocialMedia";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import useProfile from "../../hooks/useProfile";
import { useUser } from "@supabase/auth-helpers-react";

const ProfileComponent: React.FC = () => {
  const [userProfile] = useAtom(userProfileAtom);
  const user = useUser();
  const { profile } = useProfile(user?.id);

  console.log("profile, user", profile, user);

  if (!userProfile) return null;

  return (
    <div className="flex flex-col items-center justify-center w-3/4 p-4 mt-5 space-y-4 text-white bg-black rounded-md shadow">
      <ProfileInfo userProfile={profile} />
      <div className="grid grid-cols-2 gap-4">
        {/* {userProfile?.achievements?.map((achievement) => (
          <AchievementComponent
            key={achievement.id}
            achievement={achievement}
          />
        ))} */}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {userProfile?.badges?.map((badge) => (
          <BadgeComponent key={badge.id} badge={badge} />
        ))}
      </div>
      <div className="flex items-center justify-between w-2/3 space-x-5">
        <SocialMediaComponent socialMedia={userProfile.socialMedia} />
        <div>
          <button className="self-center w-full p-2 mt-4 text-lg font-bold text-black bg-white rounded">
            Edit Profile
          </button>
          <button className="self-center w-full p-2 mt-2 text-lg font-bold text-black bg-white rounded">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
