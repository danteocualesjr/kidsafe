import { Review } from "@/data/types";
import { Star, ShieldCheck } from "lucide-react";

function initials(name: string) {
  return name.split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase();
}

const GRADIENTS = [
  "from-primary/80 to-primary/60",
  "from-secondary/80 to-secondary/60",
  "from-blue-500/80 to-blue-400/60",
  "from-amber-500/80 to-amber-400/60",
  "from-emerald-500/80 to-emerald-400/60",
];

export function ReviewCard({ review }: { review: Review }) {
  const gradient = GRADIENTS[review.author.charCodeAt(0) % GRADIENTS.length];
  
  return (
    <article className="rounded-xl border border-border/60 bg-card p-5 md:p-6 transition-all hover:shadow-md">
      <header className="flex items-center gap-3 mb-4">
        <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
          {initials(review.author)}
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-foreground">{review.author}</div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mt-0.5">
            {review.isParent && <ShieldCheck className="h-3 w-3 text-primary" />}
            {review.isParent ? "Verified parent" : "Kid review"} 
            <span className="opacity-50 mx-1">•</span> 
            {review.date}
          </div>
        </div>
        <div className="flex items-center bg-accent/40 px-2 py-1 rounded-md">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted/40"}`} />
          ))}
        </div>
      </header>
      <p className="text-sm leading-relaxed text-foreground/80 font-medium">"{review.text}"</p>
    </article>
  );
}
