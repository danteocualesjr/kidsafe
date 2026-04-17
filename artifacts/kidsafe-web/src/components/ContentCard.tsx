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
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 1, 0.5, 1] as const }}
      className="h-full"
    >
      <Link href={data.href}>
        <div className="group h-full cursor-pointer flex flex-col hover-elevate">
          <div className="relative mb-3 w-full overflow-hidden rounded-xl bg-muted/30 border border-border/50">
            {data.imageUrl ? (
              <div className="relative w-full" style={{ aspectRatio: data.aspect || "2/3" }}>
                <img 
                  src={data.imageUrl} 
                  alt={data.title} 
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
            ) : (
              <PosterPlaceholder title={data.title} seed={data.seed || 0} aspect={data.aspect || "2/3"} />
            )}
            <div className="absolute right-2 top-2">
              <AgeBadge age={data.ageRecommendation} />
            </div>
          </div>
          
          <div className="flex flex-col flex-1 px-1">
            <div className="mb-3">
              <h3 className="font-serif text-lg font-medium leading-snug line-clamp-1 group-hover:text-primary transition-colors">{data.title}</h3>
              <p className="text-xs font-medium text-muted-foreground mt-1 line-clamp-1">{data.subtitle}</p>
            </div>
            <div className="mt-auto">
              <SafetyScore scores={data.safetyScores} compact />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
