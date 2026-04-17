import { Link } from "wouter";
import { Film } from "@/data/types";
import { AgeBadge } from "./AgeBadge";
import { SafetyScore } from "./SafetyScore";
import { motion } from "framer-motion";

export function FilmCard({ film, index = 0 }: { film: Film; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 1, 0.5, 1] as const }}
      className="h-full"
    >
      <Link href={`/film/${film.id}`}>
        <div className="group h-full cursor-pointer flex flex-col hover-elevate">
          <div className="relative mb-3 aspect-[2/3] w-full overflow-hidden rounded-xl bg-muted/30 border border-border/50">
            <img
              src={film.posterUrl}
              alt={film.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute right-2 top-2">
              <AgeBadge age={film.ageRecommendation} />
            </div>
          </div>
          
          <div className="flex flex-col flex-1 px-1">
            <div className="mb-3">
              <h3 className="font-serif text-lg font-medium leading-snug line-clamp-1 group-hover:text-primary transition-colors">{film.title}</h3>
              <p className="text-xs font-medium text-muted-foreground mt-1">{film.year} <span className="opacity-50 mx-1">•</span> {film.genres.slice(0, 2).join(", ")}</p>
            </div>
            <div className="mt-auto">
              <SafetyScore scores={film.safetyScores} compact />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
