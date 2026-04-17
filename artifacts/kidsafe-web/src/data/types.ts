export type SafetyScores = {
  violence: number;
  language: number;
  sexualContent: number;
  scariness: number;
  substanceUse: number;
  consumerism: number;
  positiveMessages: number;
  roleModels: number;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  isParent: boolean;
};

export type Film = {
  id: string;
  title: string;
  year: number;
  ageRecommendation: number;
  posterUrl: string;
  genres: string[];
  director: string;
  runtime: string; // e.g. "1h 45m"
  plotSummary: string;
  safetyScores: SafetyScores;
  parentReviews: Review[];
  kidReviews: Review[];
  whatParentsNeedToKnow: string;
  tags: string[];
  similarSaferIds: string[];
};

export type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  ageRecommendation: number;
  coverUrl: string;
  genres: string[];
  pages: number;
  plotSummary: string;
  safetyScores: SafetyScores;
  parentReviews: Review[];
  kidReviews: Review[];
  whatParentsNeedToKnow: string;
  tags: string[];
  similarSaferIds: string[];
};

export type Place = {
  id: string;
  name: string;
  location: string;
  ageRecommendation: number;
  imageUrl: string;
  category: string;
  description: string;
  safetyScores: SafetyScores;
  parentReviews: Review[];
  whatParentsNeedToKnow: string;
  tags: string[];
};

export type Activity = {
  id: string;
  name: string;
  ageRecommendation: number;
  imageUrl: string;
  category: string;
  description: string;
  safetyScores: SafetyScores;
  parentReviews: Review[];
  whatParentsNeedToKnow: string;
  tags: string[];
};

export type Thread = {
  id: string;
  title: string;
  author: string;
  category: string;
  replies: number;
  likes: number;
  lastActivity: string;
  content: string;
  comments: Comment[];
};

export type Comment = {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
};

export type KidProfile = {
  id: string;
  name: string;
  age: number;
  sensitivities: string[];
  avatarColor: string;
};
