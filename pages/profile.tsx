import React, { useEffect } from "react";
import Profile from "../components/Profile/Profile";
import { useAtom } from "jotai";
import { userProfileAtom } from "../store/atom";
import { dummyUserProfile } from "../utils/dummyData";
import ProfileComponent from "../components/Profile/NewProfile";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);

  useEffect(() => {
    dummyUserProfile && setUserProfile(dummyUserProfile);
  }, [dummyUserProfile]);

  console.log("dummyUserProfile", dummyUserProfile);

  return (
    <div className="bg-black bg-opacity-90">
      <ProfileComponent />
    </div>
  );
};

export default ProfilePage;
