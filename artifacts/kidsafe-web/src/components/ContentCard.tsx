import { Link } from "wouter";
import { motion } from "framer-motion";
import { AgeBadge } from "./AgeBadge";
import { SafetyScore } from "./SafetyScore";
import { PosterPlaceholder } from "./PosterPlaceholder";
import { SafetyScores } from "@/data/types";

type CardData = {
  id: string;
  href: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
  ageRecommendation: number;
  safetyScores: SafetyScores;
  seed?: number;
  aspect?: string;
};

export function ContentCard({ data, index = 0 }: { data: CardData; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: "easeOut" }}
    >
      <Link href={data.href}>
        <div className="group cursor-pointer rounded-2xl border bg-card p-3 transition-all hover-elevate active-elevate-2">
          <div className="relative mb-3 overflow-hidden rounded-xl">
            {data.imageUrl ? (
              <div className="relative bg-muted" style={{ aspectRatio: data.aspect || "2/3" }}>
                <img src={data.imageUrl} alt={data.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            ) : (
              <PosterPlaceholder title={data.title} seed={data.seed || 0} aspect={data.aspect || "2/3"} />
            )}
            <div className="absolute right-2 top-2">
              <AgeBadge age={data.ageRecommendation} />
            </div>
          </div>
          <div className="space-y-2 px-1 pb-1">
            <div>
              <h3 className="font-serif text-lg font-bold leading-tight line-clamp-1">{data.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-1">{data.subtitle}</p>
            </div>
            <SafetyScore scores={data.safetyScores} compact />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
