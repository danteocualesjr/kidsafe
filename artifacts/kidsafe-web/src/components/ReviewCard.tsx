import { Review } from "@/data/types";
import { Star, ShieldCheck } from "lucide-react";

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
    <article className="rounded-3xl border border-border/40 bg-card p-6 md:p-8 transition-all hover:shadow-lg hover:shadow-primary/5">
      <header className="flex items-center gap-4 mb-5">
        <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-base font-bold shadow-sm`}>
          {initials(review.author)}
        </div>
        <div className="flex-1">
          <div className="text-base font-bold text-foreground">{review.author}</div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mt-0.5">
            {review.isParent && <ShieldCheck className="h-3.5 w-3.5 text-primary" />}
            {review.isParent ? "Verified parent" : "Kid review"} 
            <span className="opacity-50 mx-1">•</span> 
            {review.date}
          </div>
        </div>
        <div className="flex items-center bg-accent/30 px-2.5 py-1.5 rounded-full">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted/40"}`} />
          ))}
        </div>
      </header>
      <p className="text-base leading-relaxed text-foreground/80 font-medium">"{review.text}"</p>
    </article>
  );
}
