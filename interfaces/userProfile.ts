export interface UserProfile {
  id: string;
  name: string;
  bio: string;
  image: string;
  quizzesPlayed: number;
  achievements: Achievement[];
  badges: Badge[];
  socialMedia: SocialMediaLinks;
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
