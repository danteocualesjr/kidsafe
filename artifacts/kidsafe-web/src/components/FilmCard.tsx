import { Link } from "wouter";
import { Film } from "@/data/types";
import { AgeBadge } from "./AgeBadge";
import { SafetyScore } from "./SafetyScore";
import { motion } from "framer-motion";

export function FilmCard({ film, index = 0 }: { film: Film; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 1, 0.5, 1] }}
      className="h-full"
    >
      <Link href={`/film/${film.id}`}>
        <div className="group h-full cursor-pointer rounded-3xl border border-border/40 bg-card p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 flex flex-col">
          <div className="relative mb-4 aspect-[2/3] w-full overflow-hidden rounded-2xl bg-muted/30">
            <img
              src={film.posterUrl}
              alt={film.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute right-3 top-3">
              <AgeBadge age={film.ageRecommendation} />
            </div>
          </div>
          
          <div className="flex flex-col flex-1 px-1">
            <div className="mb-4">
              <h3 className="font-serif text-xl font-bold leading-tight line-clamp-1 group-hover:text-primary transition-colors">{film.title}</h3>
              <p className="text-sm font-medium text-muted-foreground mt-1.5">{film.year} <span className="opacity-50 mx-1">•</span> {film.genres.slice(0, 2).join(", ")}</p>
            </div>
            <div className="mt-auto pt-4 border-t border-border/40">
              <SafetyScore scores={film.safetyScores} compact />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
