import { KidProfile } from "./types";

export const kids: KidProfile[] = [
  {
    id: "ada",
    name: "Ada",
    age: 6,
    sensitivities: ["loud noises", "fast pacing", "scary creatures"],
    avatarColor: "from-rose-400 to-orange-300",
  },
  {
    id: "miles",
    name: "Miles",
    age: 9,
    sensitivities: ["sad themes", "animal peril"],
    avatarColor: "from-emerald-400 to-teal-300",
  },
  {
    id: "june",
    name: "June",
    age: 4,
    sensitivities: ["any peril", "antagonists"],
    avatarColor: "from-violet-400 to-indigo-300",
  },
];

export const watchlist = [
  { kidId: "ada", filmId: "starlight-dreamers", added: "2 days ago" },
  { kidId: "ada", filmId: "garden-secret", added: "1 week ago" },
  { kidId: "miles", filmId: "mountain-quest", added: "3 days ago" },
  { kidId: "miles", filmId: "ocean-song", added: "2 weeks ago" },
  { kidId: "june", filmId: "snow-day-symphony", added: "Yesterday" },
];

export const recentActivity = [
  { kid: "Ada", action: "Added 'Starlight Dreamers' to watchlist", time: "2 days ago" },
  { kid: "Miles", action: "Marked 'Ocean Song' as watched (4 stars)", time: "3 days ago" },
  { kid: "June", action: "Saved 'Snow Day Symphony'", time: "Yesterday" },
  { kid: "Ada", action: "Read 'The Quiet Mountain'", time: "5 days ago" },
];
