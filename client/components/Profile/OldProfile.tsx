import React from "react";
import useProfile from "../../hooks/useProfile";
import { FaUser, FaGamepad, FaLevelUpAlt, FaGlobe } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useUser } from "@supabase/auth-helpers-react";

const Profile = () => {
  const user = useUser();

  console.log("user", user);

  const { profile, loading } = useProfile(user?.id);

  console.log("profile", profile);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container p-6 mx-auto">
      <div className="flex items-center mb-6">
        <FaUser className="mr-4 text-4xl" />
        <h1 className="text-2xl font-bold">{profile.full_name}</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <MdEmail className="mr-4 text-2xl" />
          <p>{profile.email}</p>
        </div>
        <div className="flex items-center">
          <FaGlobe className="mr-4 text-2xl" />
          <p>{profile.website}</p>
        </div>
        <div className="flex items-center">
          <FaGamepad className="mr-4 text-2xl" />
          <p>{profile.games_played} games played</p>
        </div>
        <div className="flex items-center">
          <FaLevelUpAlt className="mr-4 text-2xl" />
          <p>Level: {profile.level}</p>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold">Bio:</h2>
        <p>{profile.bio}</p>
      </div>
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold">Socials:</h2>
        <p>{profile.socials}</p>
      </div>
    </div>
  );
};

export default Profile;
