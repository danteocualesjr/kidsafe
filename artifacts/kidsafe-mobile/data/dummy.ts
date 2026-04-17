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

export type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  ageRecommendation: number;
  genres: string[];
  pages: number;
  plotSummary: string;
  safetyScores: SafetyScores;
  whatParentsNeedToKnow: string;
  parentReviews: { author: string; rating: number; text: string; date: string }[];
  kidReviews: { author: string; rating: number; text: string; date: string }[];
  tags: string[];
};

export const books: Book[] = [
  {
    id: "the-quiet-mountain",
    title: "The Quiet Mountain",
    author: "Eleanor Whitfield",
    year: 2024,
    ageRecommendation: 7,
    genres: ["Adventure", "Nature"],
    pages: 184,
    plotSummary: "A shy girl learns to listen to the world around her on a week-long camping trip with her grandfather.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 1, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Quiet, contemplative book about nature and intergenerational connection. No conflict, no peril, no scary content.",
    parentReviews: [
      { author: "Amelia T.", rating: 5, text: "A beautiful, slow read. My 7-year-old asked thoughtful questions for days afterward.", date: "March 1, 2026" },
    ],
    kidReviews: [
      { author: "Iris, age 8", rating: 5, text: "I felt like I was on the trip too. The grandpa is so kind.", date: "February 24, 2026" },
    ],
    tags: ["nature", "grandparents", "introvert-friendly", "calm"],
  },
  {
    id: "the-button-collector",
    title: "The Button Collector",
    author: "Hassan Karim",
    year: 2023,
    ageRecommendation: 6,
    genres: ["Family", "Slice of Life"],
    pages: 142,
    plotSummary: "Sami inherits his great-grandmother's collection of 1,247 buttons — and each one has a story.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 4 },
    whatParentsNeedToKnow: "Mentions of an elderly family member's death (gentle, off-page). Otherwise peaceful and uplifting.",
    parentReviews: [
      { author: "Yousef A.", rating: 5, text: "Charming and warm. Great for read-aloud with younger siblings too.", date: "January 8, 2026" },
    ],
    kidReviews: [
      { author: "Layla, age 7", rating: 5, text: "I started a button jar after I read this.", date: "January 5, 2026" },
    ],
    tags: ["family", "memory", "calm", "heritage"],
  },
  {
    id: "moss-and-marigold",
    title: "Moss and Marigold",
    author: "Tilda Beech",
    year: 2025,
    ageRecommendation: 5,
    genres: ["Picture Book", "Friendship"],
    pages: 48,
    plotSummary: "A snail named Moss and a beetle named Marigold try to figure out which of them lives in the prettier garden corner.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 4 },
    whatParentsNeedToKnow: "Picture book, completely peaceful. Beautiful for ages 3–7.",
    parentReviews: [
      { author: "Reese G.", rating: 5, text: "Bedtime favorite. The illustrations are dreamy and the message is sweet.", date: "April 5, 2026" },
    ],
    kidReviews: [
      { author: "Posy, age 5", rating: 5, text: "Moss is silly. I want to read it again.", date: "April 1, 2026" },
    ],
    tags: ["picture-book", "friendship", "nature", "toddler-friendly"],
  },
  {
    id: "feelings-soup",
    title: "Today My Feelings Are Soup",
    author: "Robin Estevez",
    year: 2024,
    ageRecommendation: 4,
    genres: ["Picture Book", "Emotions"],
    pages: 36,
    plotSummary: "A young child learns that big feelings are like soup — lots of ingredients all swirled together, and that's okay.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Excellent emotional literacy resource. No content concerns whatsoever.",
    parentReviews: [
      { author: "Carmen V.", rating: 5, text: "An incredible tool for emotional vocabulary. My 4-year-old now tells me when his feelings are 'a little bit lemony'.", date: "March 18, 2026" },
    ],
    kidReviews: [
      { author: "Theo, age 4", rating: 5, text: "My feelings are tomato soup today.", date: "March 14, 2026" },
    ],
    tags: ["emotions", "picture-book", "toddler-friendly", "mental-health"],
  },
  {
    id: "compass-of-haven",
    title: "The Compass of Haven",
    author: "Jasper Wren",
    year: 2024,
    ageRecommendation: 9,
    genres: ["Fantasy", "Adventure"],
    pages: 312,
    plotSummary: "Eleven-year-old Wren discovers a compass that points not north, but home — and she's not entirely sure what or where home means.",
    safetyScores: { violence: 1, language: 0, sexualContent: 0, scariness: 2, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 4 },
    whatParentsNeedToKnow: "Two scenes of mild peril (a chase in a forest, getting lost in fog). No violence, no scary creatures, no death.",
    parentReviews: [
      { author: "Ophelia D.", rating: 5, text: "Lyrical and quietly thrilling. A few brief moments of peril (no violence). Excellent first 'big' book.", date: "February 11, 2026" },
    ],
    kidReviews: [
      { author: "Wren, age 10", rating: 5, text: "I want my own compass. I read it in two nights.", date: "February 8, 2026" },
    ],
    tags: ["fantasy", "adventure", "found-family", "middle-grade"],
  },
  {
    id: "kindness-club",
    title: "The Tuesday Kindness Club",
    author: "Mae Honda",
    year: 2025,
    ageRecommendation: 8,
    genres: ["Realistic Fiction", "Friendship"],
    pages: 224,
    plotSummary: "Four classmates start a secret club with one rule: every Tuesday, do something kind for someone who'll never know it was you.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 1, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Models healthy friendship dynamics, including a chapter on apologizing well. Brief mention of a classroom commercial-themed party.",
    parentReviews: [
      { author: "Imani O.", rating: 5, text: "My 8-year-old started leaving anonymous notes for her teacher. The book itself is a gift.", date: "March 25, 2026" },
    ],
    kidReviews: [
      { author: "Hana, age 9", rating: 5, text: "I started a club at my school too. Tuesdays are the best now.", date: "March 22, 2026" },
    ],
    tags: ["friendship", "kindness", "school", "realistic"],
  },
  {
    id: "wishing-stones",
    title: "Wishing Stones",
    author: "Beatrice Lark",
    year: 2023,
    ageRecommendation: 7,
    genres: ["Magical Realism", "Family"],
    pages: 198,
    plotSummary: "On the night his mother starts chemotherapy, Pim discovers that the smooth stones in their backyard creek glow when held by someone who needs hope.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 2, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Central plot involves a parent's cancer diagnosis (treatment goes well in the story). May prompt important conversations. Hopeful ending.",
    parentReviews: [
      { author: "Cassia W.", rating: 5, text: "Handles a parent's cancer treatment with extraordinary grace. We read it together over two weeks.", date: "September 4, 2025" },
    ],
    kidReviews: [
      { author: "Pim, age 8", rating: 5, text: "It made me cry but in a good way. I picked up a stone after.", date: "September 1, 2025" },
    ],
    tags: ["family", "illness", "hope", "magical-realism"],
  },
  {
    id: "bedtime-for-bears",
    title: "Bedtime for Bears",
    author: "Pippa Hollow",
    year: 2025,
    ageRecommendation: 3,
    genres: ["Picture Book", "Bedtime"],
    pages: 32,
    plotSummary: "All the forest bears have one last yawn, one last stretch, and one last bedtime story before the long winter sleep.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Calming bedtime book for the youngest readers. No content concerns.",
    parentReviews: [
      { author: "Sam B.", rating: 5, text: "Knocks our toddler out cold every time. Beautifully illustrated.", date: "March 30, 2026" },
    ],
    kidReviews: [],
    tags: ["bedtime", "picture-book", "toddler-friendly", "animals"],
  },
];

export const getBook = (id: string) => books.find(b => b.id === id);

export type Place = {
  id: string;
  name: string;
  location: string;
  ageRecommendation: number;
  category: string;
  description: string;
  safetyScores: SafetyScores;
  whatParentsNeedToKnow: string;
  parentReviews: { author: string; rating: number; text: string; date: string }[];
  tags: string[];
};

export const places: Place[] = [
  {
    id: "harborfront-aquarium",
    name: "Harborfront Aquarium",
    location: "Coastal District",
    ageRecommendation: 3,
    category: "Museum",
    description: "A small but beautifully curated aquarium with touch tanks, gentle lighting, and frequent free educational sessions.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 1, substanceUse: 0, consumerism: 2, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "The shark tunnel may frighten very young children but is optional. Gift shop near exit. Sensory-friendly hours every Tuesday morning.",
    parentReviews: [
      { author: "Renata L.", rating: 5, text: "Stroller friendly, calm crowds, ample changing tables. Best afternoon we've had in months.", date: "March 28, 2026" },
      { author: "Owen H.", rating: 4, text: "The shark tunnel is intense for under-fives but easily skipped via the side path.", date: "March 12, 2026" },
    ],
    tags: ["sensory-friendly", "stroller-accessible", "indoor", "educational"],
  },
  {
    id: "willow-creek-park",
    name: "Willow Creek Park",
    location: "Westside",
    ageRecommendation: 2,
    category: "Park",
    description: "Forty acres of shaded paths, a fenced toddler playground, a creek-side picnic area, and an excellent splash pad.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Splash pad open May through September. Bathroom facilities at both ends of the park. Free parking.",
    parentReviews: [
      { author: "Caleb M.", rating: 5, text: "Our weekend ritual. The toddler playground is fully fenced — rare and wonderful.", date: "April 4, 2026" },
    ],
    tags: ["outdoor", "free", "toddler-friendly", "nature"],
  },
  {
    id: "city-childrens-museum",
    name: "City Children's Museum",
    location: "Downtown",
    ageRecommendation: 2,
    category: "Museum",
    description: "Three floors of hands-on exhibits including a kid-sized grocery store, a working water table, and a nature workshop.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 2, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Can get loud and crowded after 11am. Members-only quiet hours Mondays 9–11am. Gift shop and small cafe on site.",
    parentReviews: [
      { author: "Ines R.", rating: 5, text: "The water table is genius — bring a change of clothes! Members-only mornings are the best for sensory needs.", date: "March 9, 2026" },
    ],
    tags: ["indoor", "hands-on", "sensory-friendly", "educational"],
  },
  {
    id: "old-mill-orchard",
    name: "Old Mill Orchard",
    location: "Country Road 12",
    ageRecommendation: 4,
    category: "Outdoor Activity",
    description: "Family-run apple orchard with seasonal U-pick, hayrides, a corn maze in autumn, and a small petting zoo year-round.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 1, substanceUse: 0, consumerism: 1, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Corn maze can be confusing/mildly scary for under-5s. Petting zoo provides hand sanitizer. Cash preferred at the apple cart.",
    parentReviews: [
      { author: "Hattie B.", rating: 5, text: "We've been coming for years. The petting zoo is well-supervised and the goats are sweet.", date: "October 8, 2025" },
    ],
    tags: ["outdoor", "seasonal", "animals", "rural"],
  },
  {
    id: "lighthouse-bookshop",
    name: "Lighthouse Bookshop",
    location: "Old Town",
    ageRecommendation: 2,
    category: "Indoor Activity",
    description: "An independent bookshop with a dedicated children's loft, weekend story hours, and a resident bookshop cat.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 1, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Cozy and quiet most days. Story hours can be busy but well-managed. Wheelchair accessible main floor only.",
    parentReviews: [
      { author: "Joel V.", rating: 5, text: "The cat is named Hector. My kids ask about him by name. Free story time Saturdays at 10.", date: "March 22, 2026" },
    ],
    tags: ["indoor", "books", "calm", "free-events"],
  },
  {
    id: "riverside-trail",
    name: "Riverside Trail",
    location: "North Bank",
    ageRecommendation: 3,
    category: "Outdoor Activity",
    description: "A 2.4-mile paved trail along the river, perfect for strollers, balance bikes, and family walks.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Some unfenced river access points — keep little ones close. Restrooms at trailheads only.",
    parentReviews: [
      { author: "Vera S.", rating: 5, text: "Flat, paved, scenic. Bathrooms at both trailheads. Our go-to for biking practice.", date: "March 18, 2026" },
    ],
    tags: ["outdoor", "free", "stroller-accessible", "biking"],
  },
  {
    id: "starlight-cinema",
    name: "Starlight Family Cinema",
    location: "Midtown",
    ageRecommendation: 4,
    category: "Entertainment",
    description: "A family-focused movie theater with low-volume screenings, dim-lighting options, and recliner seating.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 1, substanceUse: 0, consumerism: 3, positiveMessages: 4, roleModels: 4 },
    whatParentsNeedToKnow: "Concession area features prominent advertising. Sensory-friendly Saturdays at 10am. Quiet bathroom on second floor.",
    parentReviews: [
      { author: "Mira O.", rating: 4, text: "Sensory screenings on Saturdays are a lifeline. Concession prices are steep, as expected.", date: "March 24, 2026" },
    ],
    tags: ["indoor", "sensory-friendly", "movies", "weekend"],
  },
  {
    id: "harvest-farm",
    name: "Harvest Family Farm",
    location: "Greenfield",
    ageRecommendation: 3,
    category: "Outdoor Activity",
    description: "A working farm with twice-daily animal feeding tours, tractor rides, and a kid-sized greenhouse for young gardeners.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 1, substanceUse: 0, consumerism: 1, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Some animals (cows, horses) are large — keep small children supervised. Hand-washing stations throughout.",
    parentReviews: [
      { author: "Diego M.", rating: 5, text: "The feeding tour is the highlight. Staff are wonderful with anxious kids around the animals.", date: "March 30, 2026" },
    ],
    tags: ["outdoor", "animals", "educational", "rural"],
  },
];

export const getPlace = (id: string) => places.find(p => p.id === id);

export type Activity = {
  id: string;
  name: string;
  ageRecommendation: number;
  category: string;
  description: string;
  safetyScores: SafetyScores;
  whatParentsNeedToKnow: string;
  parentReviews: { author: string; rating: number; text: string; date: string }[];
  tags: string[];
};

export const activities: Activity[] = [
  {
    id: "kitchen-science-kit",
    name: "Kitchen Science Adventures",
    ageRecommendation: 5,
    category: "STEM",
    description: "A weekly subscription kit featuring food-safe science experiments using common kitchen ingredients.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 2, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Subscription required ($24/month). All instructions are kid-led with adult supervision noted clearly.",
    parentReviews: [
      { author: "Hana M.", rating: 5, text: "Genuinely educational with minimal mess. The 'lava lamp' week was a hit.", date: "March 15, 2026" },
    ],
    tags: ["stem", "subscription", "indoor", "educational"],
  },
  {
    id: "nature-journaling",
    name: "Nature Journaling Workshop",
    ageRecommendation: 6,
    category: "Outdoor",
    description: "Local park-led monthly workshop teaching observational drawing, watercolor sketching, and nature identification.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Free, registration required. Held rain or shine — dress accordingly. All supplies provided.",
    parentReviews: [
      { author: "Pearl K.", rating: 5, text: "Free, beautiful, and screen-free. My daughter started a backyard journal at home.", date: "March 9, 2026" },
    ],
    tags: ["outdoor", "free", "art", "nature"],
  },
  {
    id: "junior-pottery",
    name: "Junior Pottery Studio",
    ageRecommendation: 7,
    category: "Arts",
    description: "Drop-in pottery sessions for kids 7–13 with supervised wheel time and air-dry hand-building options for younger siblings.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 1, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Wear clothes that can get dirty. Firing/glazing takes 2–3 weeks for finished pieces.",
    parentReviews: [
      { author: "Theo W.", rating: 4, text: "Studio is calm and well-lit. Pricing is per piece, can add up fast.", date: "March 1, 2026" },
    ],
    tags: ["indoor", "art", "weekend", "siblings"],
  },
  {
    id: "kids-cooking-class",
    name: "Saturday Kids' Cooking Class",
    ageRecommendation: 6,
    category: "Cooking",
    description: "Weekly community center cooking class focusing on world cuisines and safe knife skills.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Allergens noted on each week's recipe. Knife skills introduced gradually with safe kid knives.",
    parentReviews: [
      { author: "Sahar I.", rating: 5, text: "Allergen-aware and confidence-building. My picky eater now eats lentils.", date: "March 26, 2026" },
    ],
    tags: ["indoor", "cooking", "weekend", "skills"],
  },
  {
    id: "youth-yoga",
    name: "Sunbeam Kids' Yoga",
    ageRecommendation: 4,
    category: "Movement",
    description: "Story-based yoga classes that use breathing exercises and animal poses to teach mindfulness.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "No mats required — all provided. Parents can sit in for the first class. Gently introduces meditation.",
    parentReviews: [
      { author: "Tova B.", rating: 5, text: "An absolute reset for our high-energy 5-year-old. She now requests 'belly breaths' on hard days.", date: "April 3, 2026" },
    ],
    tags: ["indoor", "mindfulness", "movement", "weekly"],
  },
  {
    id: "library-story-time",
    name: "Tuesday Story Time",
    ageRecommendation: 2,
    category: "Reading",
    description: "Weekly free library story time with songs, finger plays, and themed picture books for ages 2–5.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Free, no registration. Snacks provided at end. Community-rich environment.",
    parentReviews: [
      { author: "Lev K.", rating: 5, text: "Free, warm, and the librarians are extraordinary. Brings the whole neighborhood out.", date: "March 31, 2026" },
    ],
    tags: ["indoor", "free", "books", "toddler-friendly"],
  },
  {
    id: "neighborhood-soccer",
    name: "Neighborhood Soccer League",
    ageRecommendation: 5,
    category: "Sports",
    description: "Volunteer-led recreational soccer league focused on skill-building, sportsmanship, and zero-pressure play.",
    safetyScores: { violence: 1, language: 1, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 1, positiveMessages: 5, roleModels: 4 },
    whatParentsNeedToKnow: "Some sideline parent intensity reported. League has good behavior guidelines. Cleats and shin guards required.",
    parentReviews: [
      { author: "Marcus P.", rating: 4, text: "Great coaches. One sideline parent has gotten heated — league has clear conduct policy though.", date: "March 20, 2026" },
    ],
    tags: ["outdoor", "sports", "weekly", "team"],
  },
  {
    id: "junior-coding",
    name: "Junior Coders Club",
    ageRecommendation: 8,
    category: "STEM",
    description: "After-school coding club teaching Scratch and beginner Python through game-building projects.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 1, positiveMessages: 5, roleModels: 5 },
    whatParentsNeedToKnow: "Two hours of screen time per session. Devices provided, no installations needed at home.",
    parentReviews: [
      { author: "Ananya G.", rating: 5, text: "Screen time with substance. My 9-year-old built her first game and is now obsessed (in a good way).", date: "March 6, 2026" },
    ],
    tags: ["indoor", "stem", "after-school", "coding"],
  },
];

export const getActivity = (id: string) => activities.find(a => a.id === id);

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
