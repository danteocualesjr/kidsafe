import { ImageSourcePropType } from "react-native";

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

export type Film = {
  id: string;
  title: string;
  year: number;
  ageRecommendation: number;
  poster: ImageSourcePropType;
  genres: string[];
  director: string;
  runtime: string;
  plotSummary: string;
  safetyScores: SafetyScores;
  whatParentsNeedToKnow: string;
  parentReviews: { author: string; rating: number; text: string; date: string }[];
  tags: string[];
};

const POSTERS = [
  require("../assets/images/poster_0.png"),
  require("../assets/images/poster_1.png"),
  require("../assets/images/poster_2.png"),
  require("../assets/images/poster_3.png"),
  require("../assets/images/poster_4.png"),
  require("../assets/images/poster_5.png"),
];

export const heroImage = require("../assets/images/hero.png");

export const films: Film[] = [
  {
    id: "brave-explorer",
    title: "The Brave Little Explorer",
    year: 2024,
    ageRecommendation: 5,
    poster: POSTERS[0],
    genres: ["Animation", "Adventure"],
    director: "Mira Tanaka",
    runtime: "1h 32m",
    plotSummary: "A curious girl wanders into the enchanted forest behind her grandmother's cottage and befriends a wise red fox who teaches her that bravery isn't the absence of fear.",
    safetyScores: { violence: 1, language: 0, sexualContent: 0, scariness: 2, substanceUse: 0, consumerism: 1, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "A gentle, lyrical adventure perfect for sensitive viewers. One mildly tense sequence (under 90 seconds).",
    parentReviews: [
      { author: "Hannah K.", rating: 5, text: "My 5 and 7 year olds were absolutely captivated. Beautiful animation and a message that landed.", date: "March 14, 2026" },
      { author: "David M.", rating: 4, text: "Genuinely beautiful. One mildly intense scene but resolves quickly.", date: "March 2, 2026" },
    ],
    tags: ["nature", "courage", "family"],
  },
  {
    id: "starlight-dreamers",
    title: "Starlight Dreamers",
    year: 2025,
    ageRecommendation: 7,
    poster: POSTERS[1],
    genres: ["Animation", "Fantasy"],
    director: "Henrik Bjornstad",
    runtime: "1h 48m",
    plotSummary: "Two siblings discover their late mother's paper airplane drawings come alive at night, carrying them on quiet journeys above moonlit oceans.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 1, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Deals tenderly with the death of a parent (off-screen). May prompt meaningful conversations about loss.",
    parentReviews: [
      { author: "Elena S.", rating: 5, text: "We cried. The kids cried. Then they asked to watch it again immediately.", date: "April 1, 2026" },
    ],
    tags: ["grief", "siblings", "imagination"],
  },
  {
    id: "garden-secret",
    title: "The Garden Secret",
    year: 2024,
    ageRecommendation: 6,
    poster: POSTERS[2],
    genres: ["Family", "Mystery"],
    director: "Penelope Wickham",
    runtime: "1h 38m",
    plotSummary: "A shy boy spends summer at his great-aunt's countryside estate, discovering a walled garden sealed for fifty years.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 1, substanceUse: 0, consumerism: 0, positiveMessages: 4, roleModels: 4 },
    whatParentsNeedToKnow: "Meditative, slow-burning film with no scary moments. Excellent for sensitive children.",
    parentReviews: [
      { author: "Margaret O.", rating: 5, text: "Slow in the best way. My 6-year-old was completely absorbed.", date: "January 30, 2026" },
    ],
    tags: ["nature", "calm", "mystery"],
  },
  {
    id: "robot-friend",
    title: "My Friend Bolt",
    year: 2025,
    ageRecommendation: 5,
    poster: POSTERS[3],
    genres: ["Family", "Comedy"],
    director: "Alfie Hutchins",
    runtime: "1h 26m",
    plotSummary: "When Maddie finds an old tin robot in her grandfather's shed, she has no idea he's been waiting fifty years to finish a single promise.",
    safetyScores: { violence: 1, language: 0, sexualContent: 0, scariness: 1, substanceUse: 0, consumerism: 1, positiveMessages: 5, roleModels: 4 },
    whatParentsNeedToKnow: "Brief slapstick. One mild peril scene in a thunderstorm. Themes of intergenerational love.",
    parentReviews: [
      { author: "Jacob R.", rating: 5, text: "Funny without being snarky. Heartfelt without being saccharine.", date: "March 8, 2026" },
    ],
    tags: ["robots", "comedy", "grandparents"],
  },
  {
    id: "ocean-song",
    title: "Ocean Song",
    year: 2025,
    ageRecommendation: 8,
    poster: POSTERS[4],
    genres: ["Animation", "Adventure"],
    director: "Kalani Reyes",
    runtime: "1h 52m",
    plotSummary: "A young marine biologist's daughter discovers she can hear ancient whales — and they're warning her about a coming storm.",
    safetyScores: { violence: 2, language: 0, sexualContent: 0, scariness: 3, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Extended storm/peril sequence (~6 min). No deaths. Strong environmental message.",
    parentReviews: [
      { author: "Lila V.", rating: 5, text: "The storm is intense for younger kids but the resolution is so triumphant.", date: "February 22, 2026" },
    ],
    tags: ["ocean", "environment", "courage"],
  },
  {
    id: "mountain-quest",
    title: "The Mountain Quest",
    year: 2024,
    ageRecommendation: 9,
    poster: POSTERS[5],
    genres: ["Adventure", "Family"],
    director: "Sven Aaltonen",
    runtime: "1h 56m",
    plotSummary: "After his father is injured on an expedition, twelve-year-old Eli sets out with the family's golden retriever to deliver a message.",
    safetyScores: { violence: 2, language: 1, sexualContent: 0, scariness: 3, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Two mild language uses. Intense crevasse scene (resolved happily, ~3 min). Themes of perseverance.",
    parentReviews: [
      { author: "Carolyn H.", rating: 5, text: "Genuinely thrilling without ever feeling exploitative. Eli is the role model I want.", date: "December 15, 2025" },
    ],
    tags: ["adventure", "dogs", "wilderness"],
  },
  {
    id: "summer-fireflies",
    title: "Summer of Fireflies",
    year: 2024,
    ageRecommendation: 6,
    poster: POSTERS[0],
    genres: ["Family"],
    director: "Yusra El-Amin",
    runtime: "1h 35m",
    plotSummary: "Three cousins spend a slow, golden summer at their grandmother's farmhouse — and a nightly firefly ritual becomes a foundation for lifelong friendship.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Gentle, low-conflict film. No peril, no antagonist, no scary moments.",
    parentReviews: [
      { author: "Diane P.", rating: 5, text: "The kind of film that makes you want to call your own grandmother.", date: "July 8, 2025" },
    ],
    tags: ["summer", "grandparents", "low-conflict"],
  },
  {
    id: "snow-symphony",
    title: "Snow Day Symphony",
    year: 2024,
    ageRecommendation: 4,
    poster: POSTERS[5],
    genres: ["Animation", "Musical"],
    director: "Ingrid Solberg",
    runtime: "1h 18m",
    plotSummary: "When a tiny mountain town gets the biggest snowfall in a hundred years, a quiet girl and her musical grandfather discover that snow itself can sing.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Musical, low-stakes film. No conflict. Perfect for the youngest viewers.",
    parentReviews: [
      { author: "Henrik J.", rating: 5, text: "Forever-watch list. My toddler insists on dancing through the credits.", date: "December 22, 2025" },
    ],
    tags: ["music", "winter", "toddler-friendly"],
  },
];

export const getFilm = (id: string) => films.find(f => f.id === id);

export type Thread = { id: string; title: string; author: string; category: string; replies: number; likes: number; lastActivity: string; content: string };
export const threads: Thread[] = [
  { id: "1", title: "Is Stranger Things really not okay for a 7-year-old?", author: "Hannah K.", category: "Films & TV", replies: 24, likes: 47, lastActivity: "2 hours ago", content: "My son is mature for his age and his classmates have been talking about it. Looking for honest takes." },
  { id: "2", title: "How are you handling screen time over summer break?", author: "Elena S.", category: "Daily Life", replies: 38, likes: 89, lastActivity: "5 hours ago", content: "Last summer was a free-for-all. Looking for realistic structures." },
  { id: "3", title: "Talking to my 11-year-old about online safety — help", author: "Tomas L.", category: "Tweens & Teens", replies: 19, likes: 56, lastActivity: "1 day ago", content: "She's getting her first phone for her 12th birthday." },
  { id: "4", title: "Recommend films for a very sensitive 6-year-old?", author: "Sophie B.", category: "Films & TV", replies: 27, likes: 64, lastActivity: "1 day ago", content: "He cries at the opening of 'Up'. Looking for adventures without peril." },
  { id: "5", title: "Books for a 7yo whose grandmother just died", author: "Cassia W.", category: "Books & Reading", replies: 16, likes: 71, lastActivity: "2 days ago", content: "We're navigating big grief. Looking for books that don't shy away but don't traumatize." },
  { id: "6", title: "Best museums for a curious 3-year-old?", author: "Renata L.", category: "Places & Activities", replies: 11, likes: 33, lastActivity: "2 days ago", content: "Visiting from out of town. Hands-on, low-stress, stroller-accessible." },
];

export type Kid = { id: string; name: string; age: number; sensitivities: string[]; gradient: [string, string] };
export const kids: Kid[] = [
  { id: "ada", name: "Ada", age: 6, sensitivities: ["loud noises", "fast pacing"], gradient: ["#fda4af", "#fdba74"] },
  { id: "miles", name: "Miles", age: 9, sensitivities: ["sad themes", "animal peril"], gradient: ["#6ee7b7", "#5eead4"] },
  { id: "june", name: "June", age: 4, sensitivities: ["any peril"], gradient: ["#c4b5fd", "#a5b4fc"] },
];
