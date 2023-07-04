// DummyData.ts
import {
  UserProfile,
  Badge,
  Achievement,
  SocialMediaLinks,
} from "../interfaces/userProfile";

export const dummyUserProfile: UserProfile = {
  id: "1",
  name: "John Doe",
  bio: "Avid quiz enthusiast and lorem ipsum aficionado.",
  image: "https://via.placeholder.com/150",
  quizzesPlayed: 30,
  achievements: [
    {
      id: "1",
      name: "Quiz Rookie",
      description: "Played 5 quizzes.",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "2",
      name: "Quiz Master",
      description: "Played 25 quizzes.",
      image: "https://via.placeholder.com/50",
    },
  ],
  badges: [
    {
      id: "1",
      name: "Perfect Score",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "2",
      name: "Quick Thinker",
      image: "https://via.placeholder.com/50",
    },
  ],
  socialMedia: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
};
