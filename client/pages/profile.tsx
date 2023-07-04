import React, { useEffect } from "react";
import Profile from "../components/Profile/OldProfile";
import { useAtom } from "jotai";
import { userProfileAtom } from "../store/atom";
import { dummyUserProfile } from "../utils/dummyData";
import ProfileComponent from "../components/Profile/Profile";
import QuizHistoryComponent from "../components/Profile/History/QuizHistory";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);

  useEffect(() => {
    dummyUserProfile && setUserProfile(dummyUserProfile);
  }, [dummyUserProfile]);

  console.log("dummyUserProfile", dummyUserProfile);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-90">
      <ProfileComponent />
      <QuizHistoryComponent />
    </div>
  );
};

export default ProfilePage;
