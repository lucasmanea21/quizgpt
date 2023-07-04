import React, { useState } from "react";
import { UserProfile } from "../../../interfaces/userProfile";

interface ProfileEditFormProps {
  userProfile: UserProfile;
  onSave: (profile: UserProfile) => Promise<void>;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  userProfile,
  onSave,
}) => {
  const [profile, setProfile] = useState(userProfile);

  console.log("profile", profile);

  const handleChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const handleSocialMediaChange = (event, platform) => {
    setProfile({
      ...profile,
      socialMedia: {
        ...profile.socialMedia,
        [platform]: event.target.value,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(profile);
  };

  return profile ? (
    <form onSubmit={handleSubmit} className="w-3/4 space-y-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-2 text-sm text-white">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="bio" className="mb-2 text-sm text-white">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          className="px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="avatar_url" className="mb-2 text-sm text-white">
          Avatar URL
        </label>
        <input
          type="text"
          id="avatar_url"
          name="avatar_url"
          value={profile.avatar_url}
          onChange={handleChange}
          className="px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 text-sm text-white">Social Media</label>
        {/* {Object.entries(profile.socialMedia).map(([platform, url]) => (
          <div key={platform} className="flex flex-col mt-2">
            <label
              htmlFor={platform}
              className="mb-1 text-xs text-gray-300 capitalize"
            >
              {platform}
            </label>
            <input
              type="text"
              id={platform}
              value={url}
              onChange={(event) => handleSocialMediaChange(event, platform)}
              className="px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        ))} */}
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-4 text-sm text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600"
      >
        Save
      </button>
    </form>
  ) : (
    <div>Loading...</div>
  );
};

export default ProfileEditForm;
