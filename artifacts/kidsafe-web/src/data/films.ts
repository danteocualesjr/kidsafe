import { Film } from "./types";
import poster0 from "@assets/generated_images/generated_image_3.png";
import poster1 from "@assets/generated_images/generated_image_4.png";
import poster2 from "@assets/generated_images/generated_image_5.png";
import poster3 from "@assets/generated_images/generated_image_6.png";
import poster4 from "@assets/generated_images/generated_image_7.png";
import poster5 from "@assets/generated_images/generated_image_8.png";

const posters = [poster0, poster1, poster2, poster3, poster4, poster5];

export const films: Film[] = [
  {
    id: "brave-explorer",
    title: "The Brave Little Explorer",
    year: 2024,
    ageRecommendation: 5,
    posterUrl: posters[0],
    genres: ["Animation", "Adventure", "Family"],
    director: "Mira Tanaka",
    runtime: "1h 32m",
    plotSummary:
      "When a curious young girl wanders into the enchanted forest behind her grandmother's cottage, she befriends a wise red fox and learns that bravery is not the absence of fear, but the courage to keep going anyway.",
    safetyScores: { violence: 1, language: 0, sexualContent: 0, scariness: 2, substanceUse: 0, consumerism: 1, positiveMessages: 5, roleModels: 5 },
    parentReviews: [
      { id: "p1", author: "Hannah K.", rating: 5, text: "My 5 and 7 year olds were absolutely captivated. The animation is breathtaking and the message about bravery hit just right. We've watched it three times this week.", date: "March 14, 2026", isParent: true },
      { id: "p2", author: "David M.", rating: 4, text: "Genuinely beautiful. One scene where the fox gets caught in a hunter's snare was a little tense for my 4-year-old, but it resolves quickly and gently.", date: "March 2, 2026", isParent: true },
      { id: "p3", author: "Priya R.", rating: 5, text: "A rare film I'm happy to let my kids watch on repeat. No screen-burned-in product placement, no sarcastic humor - just heart.", date: "February 18, 2026", isParent: true },
    ],
    kidReviews: [
      { id: "k1", author: "Lily, age 6", rating: 5, text: "I love the fox. He is funny but also smart. I want a fox friend.", date: "March 10, 2026", isParent: false },
      { id: "k2", author: "Marcus, age 5", rating: 5, text: "The forest is so pretty and I learned that being scared is okay.", date: "March 5, 2026", isParent: false },
    ],
    whatParentsNeedToKnow:
      "A gentle, lyrical adventure perfect for sensitive viewers. There is one mildly tense sequence involving a hunter's snare (under 90 seconds, fox is freed safely). No violence, no scary characters, no commercial tie-ins. Themes of courage, family, and respecting nature are woven throughout.",
    tags: ["nature", "family", "courage", "friendship", "animals"],
    similarSaferIds: ["garden-secret", "starlight-dreamers"],
  },
  {
    id: "starlight-dreamers",
    title: "Starlight Dreamers",
    year: 2025,
    ageRecommendation: 7,
    posterUrl: posters[1],
    genres: ["Animation", "Fantasy"],
    director: "Henrik Bjornstad",
    runtime: "1h 48m",
    plotSummary:
      "Two siblings discover that their late mother's paper airplane drawings come alive at night, carrying them on quiet journeys above moonlit oceans where they help lost creatures find their way home.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 1, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    parentReviews: [
      { id: "p1", author: "Elena S.", rating: 5, text: "We cried. The kids cried. Then they asked to watch it again immediately. A masterpiece about grief that doesn't traumatize.", date: "April 1, 2026", isParent: true },
      { id: "p2", author: "Tomas L.", rating: 5, text: "The bereaved parent thread is handled with extraordinary tenderness. My 8-year-old, who lost her grandmother last year, wanted to talk about it for hours afterward.", date: "March 22, 2026", isParent: true },
    ],
    kidReviews: [
      { id: "k1", author: "Anya, age 8", rating: 5, text: "The whales sing. I want to sleep in the paper airplane.", date: "March 18, 2026", isParent: false },
    ],
    whatParentsNeedToKnow:
      "Deals tenderly with the death of a parent, which is established in the opening minutes (off-screen, gently). May prompt meaningful conversations with children who have experienced loss. Otherwise visually serene and emotionally rich.",
    tags: ["grief", "siblings", "imagination", "loss", "family"],
    similarSaferIds: ["brave-explorer", "ocean-song"],
  },
  {
    id: "garden-secret",
    title: "The Garden Secret",
    year: 2024,
    ageRecommendation: 6,
    posterUrl: posters[2],
    genres: ["Family", "Mystery"],
    director: "Penelope Wickham",
    runtime: "1h 38m",
    plotSummary:
      "A shy boy spends the summer at his great-aunt's countryside estate, where he discovers a walled garden that hasn't been opened in fifty years - and the gentle mystery of why it was sealed.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 1, substanceUse: 0, consumerism: 0, positiveMessages: 4, roleModels: 4 },
    parentReviews: [
      { id: "p1", author: "Margaret O.", rating: 5, text: "Slow in the best way. My 6-year-old, who has trouble with overstimulation, was completely absorbed.", date: "January 30, 2026", isParent: true },
      { id: "p2", author: "Wei Z.", rating: 4, text: "Beautiful pacing and zero conflict spikes. The 'mystery' is gentle - more like discovering than detecting.", date: "January 12, 2026", isParent: true },
    ],
    kidReviews: [
      { id: "k1", author: "Theo, age 7", rating: 4, text: "I liked finding all the keys. The aunt is a little weird but nice.", date: "January 18, 2026", isParent: false },
    ],
    whatParentsNeedToKnow: "A meditative, slow-burning film with no scary moments and no antagonist. Excellent for sensitive children or those overwhelmed by typical action-packed family fare.",
    tags: ["nature", "mystery", "calm", "introvert-friendly"],
    similarSaferIds: ["brave-explorer", "robot-friend"],
  },
  {
    id: "robot-friend",
    title: "My Friend Bolt",
    year: 2025,
    ageRecommendation: 5,
    posterUrl: posters[3],
    genres: ["Family", "Sci-Fi", "Comedy"],
    director: "Alfie Hutchins",
    runtime: "1h 26m",
    plotSummary:
      "When seven-year-old Maddie finds an old tin robot in her grandfather's shed, she has no idea he's been quietly waiting for fifty years to finish a single, simple promise.",
    safetyScores: { violence: 1, language: 0, sexualContent: 0, scariness: 1, substanceUse: 0, consumerism: 1, positiveMessages: 5, roleModels: 4 },
    parentReviews: [
      { id: "p1", author: "Jacob R.", rating: 5, text: "Funny without being snarky. Heartfelt without being saccharine. My kindergartener has now requested a robot for every birthday until further notice.", date: "March 8, 2026", isParent: true },
    ],
    kidReviews: [
      { id: "k1", author: "Maddie, age 6", rating: 5, text: "Bolt makes funny clinking sounds and I laughed so much.", date: "March 1, 2026", isParent: false },
    ],
    whatParentsNeedToKnow: "Brief slapstick comedy (Bolt occasionally falls over). One scene of mild peril in a thunderstorm. Themes of intergenerational love and keeping promises.",
    tags: ["robots", "comedy", "family", "grandparents"],
    similarSaferIds: ["brave-explorer", "garden-secret"],
  },
  {
    id: "ocean-song",
    title: "Ocean Song",
    year: 2025,
    ageRecommendation: 8,
    posterUrl: posters[4],
    genres: ["Animation", "Fantasy", "Adventure"],
    director: "Kalani Reyes",
    runtime: "1h 52m",
    plotSummary:
      "A young marine biologist's daughter discovers she can hear the songs of ancient whales - and they are warning her about a coming storm that will threaten her island home.",
    safetyScores: { violence: 2, language: 0, sexualContent: 0, scariness: 3, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    parentReviews: [
      { id: "p1", author: "Lila V.", rating: 5, text: "The storm sequence is intense for younger kids - we paused twice to check in with our 7-year-old. But the resolution is so triumphant.", date: "February 22, 2026", isParent: true },
      { id: "p2", author: "Ben T.", rating: 4, text: "Stunning environmental themes without being preachy. My 9-year-old started asking about whale conservation the next morning.", date: "February 14, 2026", isParent: true },
    ],
    kidReviews: [
      { id: "k1", author: "Noor, age 9", rating: 5, text: "I want to be a marine biologist now. The whales sound so sad and beautiful.", date: "February 17, 2026", isParent: false },
    ],
    whatParentsNeedToKnow:
      "Contains an extended storm/peril sequence (~6 minutes) that may frighten younger or sensitive viewers. No deaths, but a beloved animal is briefly in danger. Strong environmental message.",
    tags: ["ocean", "environment", "courage", "indigenous heritage", "animals"],
    similarSaferIds: ["starlight-dreamers", "mountain-quest"],
  },
  {
    id: "mountain-quest",
    title: "The Mountain Quest",
    year: 2024,
    ageRecommendation: 9,
    posterUrl: posters[5],
    genres: ["Adventure", "Family"],
    director: "Sven Aaltonen",
    runtime: "1h 56m",
    plotSummary:
      "After his father is injured on an expedition, twelve-year-old Eli sets out with the family's golden retriever to deliver a message to a remote mountain station - a journey that becomes a coming-of-age trial.",
    safetyScores: { violence: 2, language: 1, sexualContent: 0, scariness: 3, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    parentReviews: [
      { id: "p1", author: "Carolyn H.", rating: 5, text: "Genuinely thrilling without ever feeling exploitative. My tweens were on the edge of their seats. Eli is the role model I want for them.", date: "December 15, 2025", isParent: true },
      { id: "p2", author: "Rashid A.", rating: 4, text: "Two uses of mild language ('damn'). One scene where the dog is briefly lost in a crevasse - it was harrowing for my 8-year-old. Otherwise excellent.", date: "December 4, 2025", isParent: true },
    ],
    kidReviews: [
      { id: "k1", author: "Cooper, age 10", rating: 5, text: "I want a dog like Lumen. The mountains are so big.", date: "December 9, 2025", isParent: false },
    ],
    whatParentsNeedToKnow:
      "Two instances of mild language ('damn'). An intense scene where the dog falls into a crevasse (resolved happily, ~3 minutes). Themes of perseverance, responsibility, and trusting yourself.",
    tags: ["adventure", "dogs", "coming-of-age", "wilderness", "family"],
    similarSaferIds: ["ocean-song", "brave-explorer"],
  },
  {
    id: "library-of-keys",
    title: "The Library of Lost Keys",
    year: 2025,
    ageRecommendation: 7,
    posterUrl: posters[2],
    genres: ["Fantasy", "Family"],
    director: "Ottilie Brook",
    runtime: "1h 41m",
    plotSummary:
      "A young librarian's apprentice discovers that every key in the lost-and-found drawer opens a door to someone's forgotten memory - and the head librarian has a secret of her own.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 2, positiveMessages: 5, substanceUse: 0, consumerism: 0, roleModels: 4 },
    parentReviews: [
      { id: "p1", author: "Sophie B.", rating: 4, text: "Imaginative and warm. One memory involves a parent's funeral (handled tastefully) - worth previewing if your child is sensitive to those themes.", date: "March 30, 2026", isParent: true },
    ],
    kidReviews: [
      { id: "k1", author: "Rosa, age 8", rating: 5, text: "I want to find a key like that. The library is magical.", date: "March 25, 2026", isParent: false },
    ],
    whatParentsNeedToKnow:
      "One brief flashback to a funeral (no body shown, gentle handling). Mild emotional intensity throughout. Beautiful exploration of memory and grief for older sensitive kids.",
    tags: ["books", "memory", "fantasy", "imagination"],
    similarSaferIds: ["starlight-dreamers", "garden-secret"],
  },
  {
    id: "summer-of-fireflies",
    title: "Summer of Fireflies",
    year: 2024,
    ageRecommendation: 6,
    posterUrl: posters[0],
    genres: ["Family", "Drama"],
    director: "Yusra El-Amin",
    runtime: "1h 35m",
    plotSummary:
      "Three cousins spend a slow, golden summer at their grandmother's farmhouse, where a nightly firefly ritual becomes the foundation for friendships that will last a lifetime.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    parentReviews: [
      { id: "p1", author: "Diane P.", rating: 5, text: "The kind of film that makes you want to call your own grandmother. Genuinely zero anxiety-inducing moments.", date: "July 8, 2025", isParent: true },
    ],
    kidReviews: [
      { id: "k1", author: "Eve, age 7", rating: 5, text: "I want to catch fireflies. The grandma is the best.", date: "July 4, 2025", isParent: false },
    ],
    whatParentsNeedToKnow: "A gentle, low-conflict film. No peril, no antagonist, no scary moments. Perfect for sensitive viewers and bedtime watching.",
    tags: ["summer", "cousins", "grandparents", "low-conflict"],
    similarSaferIds: ["brave-explorer", "garden-secret"],
  },
  {
    id: "kite-flyer",
    title: "The Kite Flyer's Promise",
    year: 2023,
    ageRecommendation: 8,
    posterUrl: posters[1],
    genres: ["Drama", "Family"],
    director: "Anjali Kapoor",
    runtime: "1h 49m",
    plotSummary:
      "A boy in a small Himalayan village inherits his late uncle's kite-fighting championship spot - and must decide whether honor means winning, or knowing when to let go.",
    safetyScores: { violence: 1, language: 1, sexualContent: 0, scariness: 1, substanceUse: 1, consumerism: 0, positiveMessages: 5, roleModels: 4 },
    parentReviews: [
      { id: "p1", author: "Kiran M.", rating: 5, text: "A beautiful window into another culture without being touristy. One scene shows adults drinking tea with rum at a wake.", date: "October 12, 2025", isParent: true },
    ],
    kidReviews: [
      { id: "k1", author: "Aarav, age 9", rating: 5, text: "I want to fly a kite that high. The village looks so cool.", date: "October 5, 2025", isParent: false },
    ],
    whatParentsNeedToKnow: "Brief scene with adults drinking alcohol at a memorial gathering. One mild swear word. Off-screen death of a beloved uncle (established at the start).",
    tags: ["culture", "honor", "family", "loss", "tradition"],
    similarSaferIds: ["mountain-quest", "ocean-song"],
  },
  {
    id: "treehouse-detectives",
    title: "The Treehouse Detectives",
    year: 2025,
    ageRecommendation: 7,
    posterUrl: posters[3],
    genres: ["Mystery", "Comedy", "Family"],
    director: "Marco DiSilva",
    runtime: "1h 30m",
    plotSummary:
      "Three best friends turn their backyard treehouse into a detective agency, solving the gentlest mysteries in their suburban neighborhood - until a real puzzle arrives.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 1, substanceUse: 0, consumerism: 1, positiveMessages: 5, roleModels: 4 },
    parentReviews: [
      { id: "p1", author: "Janelle F.", rating: 4, text: "Fun without being frenetic. The 'real mystery' turns out to be very wholesome - I won't spoil it. Warm, funny, kid-led.", date: "April 2, 2026", isParent: true },
    ],
    kidReviews: [
      { id: "k1", author: "Owen, age 8", rating: 5, text: "I want a treehouse like theirs. The cat clue was so funny.", date: "March 28, 2026", isParent: false },
    ],
    whatParentsNeedToKnow: "Mild slapstick humor. One scene in a 'spooky' shed that turns out to be perfectly safe. Brief shot of a candy advertisement on TV.",
    tags: ["mystery", "friendship", "humor", "siblings"],
    similarSaferIds: ["robot-friend", "summer-of-fireflies"],
  },
  {
    id: "snow-day-symphony",
    title: "Snow Day Symphony",
    year: 2024,
    ageRecommendation: 4,
    posterUrl: posters[5],
    genres: ["Animation", "Musical", "Family"],
    director: "Ingrid Solberg",
    runtime: "1h 18m",
    plotSummary:
      "When a tiny mountain town gets the biggest snowfall in a hundred years, a quiet girl and her musical grandfather discover that snow itself can sing.",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 0, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    parentReviews: [
      { id: "p1", author: "Henrik J.", rating: 5, text: "We added it to our forever-watch list. My toddler insists on dancing through the credits.", date: "December 22, 2025", isParent: true },
    ],
    kidReviews: [
      { id: "k1", author: "Stella, age 4", rating: 5, text: "Snow goes plinky plinky and I love it.", date: "December 18, 2025", isParent: false },
    ],
    whatParentsNeedToKnow: "A musical, low-stakes film perfect for the youngest viewers. No conflict, no scary moments, no fast cuts.",
    tags: ["music", "winter", "toddler-friendly", "grandparents"],
    similarSaferIds: ["summer-of-fireflies", "brave-explorer"],
  },
  {
    id: "lighthouse-cat",
    title: "The Lighthouse Cat",
    year: 2025,
    ageRecommendation: 5,
    posterUrl: posters[4],
    genres: ["Animation", "Family"],
    director: "Cillian O'Brien",
    runtime: "1h 24m",
    plotSummary:
      "On a rocky island lives a lighthouse keeper, his clever cat, and a long-standing mystery: who keeps leaving small wooden boats on their doorstep each morning?",
    safetyScores: { violence: 0, language: 0, sexualContent: 0, scariness: 1, substanceUse: 0, consumerism: 0, positiveMessages: 5, roleModels: 5 },
    parentReviews: [
      { id: "p1", author: "Aoife C.", rating: 5, text: "Cozy in the truest sense. The cat is the actual main character and my kids are delighted.", date: "March 12, 2026", isParent: true },
    ],
    kidReviews: [
      { id: "k1", author: "Finn, age 5", rating: 5, text: "The cat is brave and small. I want a lighthouse.", date: "March 8, 2026", isParent: false },
    ],
    whatParentsNeedToKnow: "One scene of a stormy sea (no humans or animals in danger). Otherwise tender and slow-paced.",
    tags: ["cats", "ocean", "mystery", "cozy"],
    similarSaferIds: ["snow-day-symphony", "garden-secret"],
  },
];

export const getFilm = (id: string) => films.find(f => f.id === id);
