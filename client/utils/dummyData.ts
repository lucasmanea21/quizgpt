import { UserProfile } from "../interfaces/userProfile";

export const dummyUserProfile: UserProfile = {
  id: "1",
  name: "John Doe",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  image: "/user-profile.jpg",
  quizzesPlayed: 5,
  achievements: [],
  badges: [],
  socialMedia: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  quizHistory: [
    {
      id: "q1",
      name: "React Quiz",
      difficulty: "Hard",
      numberOfQuestions: 10,
      correctAnswers: 7,
      dateTaken: "2023-07-01T10:00:00.000Z",
    },
    {
      id: "q2",
      name: "JavaScript Quiz",
      difficulty: "Medium",
      numberOfQuestions: 10,
      correctAnswers: 8,
      dateTaken: "2023-06-30T10:00:00.000Z",
    },
    {
      id: "q3",
      name: "HTML Quiz",
      difficulty: "Easy",
      numberOfQuestions: 10,
      correctAnswers: 9,
      dateTaken: "2023-06-29T10:00:00.000Z",
    },
  ],
};
