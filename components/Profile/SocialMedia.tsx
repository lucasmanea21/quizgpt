// SocialMediaComponent.tsx
import React from "react";
import { SocialMediaLinks } from "../../interfaces/userProfile";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // install react-icons for these

interface Props {
  socialMedia: SocialMediaLinks;
}

const SocialMediaComponent: React.FC<Props> = ({ socialMedia }) =>
  socialMedia ? (
    <div className="flex justify-center space-x-4">
      <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer">
        <FaFacebook className="w-6 h-6" />
      </a>
      <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer">
        <FaTwitter className="w-6 h-6" />
      </a>
      <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer">
        <FaInstagram className="w-6 h-6" />
      </a>
      <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="w-6 h-6" />
      </a>
    </div>
  ) : (
    <div>Loading...</div>
  );

export default SocialMediaComponent;
