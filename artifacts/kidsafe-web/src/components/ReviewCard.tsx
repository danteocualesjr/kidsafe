import { Review } from "@/data/types";
import { Star } from "lucide-react";

function initials(name: string) {
  return name.split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase();
}

const GRADIENTS = [
  "from-rose-400 to-orange-300",
  "from-emerald-400 to-teal-300",
  "from-violet-400 to-indigo-300",
  "from-amber-400 to-yellow-300",
  "from-sky-400 to-cyan-300",
];

export function ReviewCard({ review }: { review: Review }) {
  const gradient = GRADIENTS[review.author.charCodeAt(0) % GRADIENTS.length];
  return (
    <article className="rounded-2xl border bg-card p-5">
      <header className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold`}>
          {initials(review.author)}
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold">{review.author}</div>
          <div className="text-xs text-muted-foreground">{review.date} {review.isParent ? "· Verified parent" : "· Kid review"}</div>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
          ))}
        </div>
      </header>
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">{review.text}</p>
    </article>
  );
}
