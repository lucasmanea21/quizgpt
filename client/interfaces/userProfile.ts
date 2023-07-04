export interface Quiz {
  id: string;
  name: string;
  difficulty: string;
  numberOfQuestions: number;
  correctAnswers: number;
  dateTaken: string;
}

export interface UserProfile {
  id: string;
  name: string;
  bio: string;
  avatar_url: string;
  quizzesPlayed: number;
  achievements: Achievement[];
  badges: Badge[];
  socialMedia: SocialMediaLinks;
  quizHistory: Quiz[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Badge {
  id: string;
  name: string;
  image: string;
}

export interface SocialMediaLinks {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  // add other social media platforms as needed
}
