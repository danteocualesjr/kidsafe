import { Link } from "wouter";
import { Film } from "@/data/types";
import { AgeBadge } from "./AgeBadge";
import { SafetyScore } from "./SafetyScore";
import { motion } from "framer-motion";

export function FilmCard({ film, index = 0 }: { film: Film; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: "easeOut" }}
    >
      <Link href={`/film/${film.id}`}>
        <div className="group cursor-pointer rounded-2xl border bg-card p-3 transition-all hover-elevate active-elevate-2">
          <div className="relative mb-3 aspect-[2/3] overflow-hidden rounded-xl bg-muted">
            <img
              src={film.posterUrl}
              alt={film.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute right-2 top-2">
              <AgeBadge age={film.ageRecommendation} />
            </div>
          </div>
          <div className="space-y-2 px-1 pb-1">
            <div>
              <h3 className="font-serif text-lg font-bold leading-tight line-clamp-1">{film.title}</h3>
              <p className="text-xs text-muted-foreground">{film.year} · {film.genres.slice(0, 2).join(" · ")}</p>
            </div>
            <SafetyScore scores={film.safetyScores} compact />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
