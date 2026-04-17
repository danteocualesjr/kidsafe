export type ParentTip = {
  id: string;
  title: string;
  body: string;
  author: string;
  category: string;
};

export const tips: ParentTip[] = [
  {
    id: "preview-first-15",
    title: "Preview the first 15 minutes",
    body: "Most films set their tone in the opening sequence. If the first fifteen minutes raise red flags, the rest probably will too.",
    author: "Dr. Lina Marsh, KidSafe Editorial",
    category: "Films & TV",
  },
  {
    id: "name-the-feeling",
    title: "Name the feeling, then move on",
    body: "When a child is overwhelmed by a story, naming the feeling out loud ('that part was tense, wasn't it?') helps them metabolize it without you having to fix it.",
    author: "Dr. Lina Marsh, KidSafe Editorial",
    category: "Daily Life",
  },
  {
    id: "ask-before-recommend",
    title: "Ask before you recommend",
    body: "Even at age 4, kids have strong opinions on what they want from a story. 'Do you want exciting or cozy tonight?' invites them in.",
    author: "Dr. Lina Marsh, KidSafe Editorial",
    category: "Films & TV",
  },
  {
    id: "co-watch-rule",
    title: "The first-time co-watch rule",
    body: "For any new show or film, the first viewing happens together. After that, your child has the context to enjoy it (or skip it) on their own.",
    author: "Dr. Lina Marsh, KidSafe Editorial",
    category: "Daily Life",
  },
];
