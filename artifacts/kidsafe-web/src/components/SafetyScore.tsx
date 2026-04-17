import { SafetyScores } from "@/data/types";
import { motion } from "framer-motion";

const CRITERIA_LABELS: Record<keyof SafetyScores, string> = {
  violence: "Violence",
  language: "Language",
  sexualContent: "Sexual Content",
  scariness: "Scariness",
  substanceUse: "Substance Use",
  consumerism: "Consumerism",
  positiveMessages: "Positive Messages",
  roleModels: "Role Models",
};

function safetyTier(avg: number, inverted = false) {
  if (inverted) {
    if (avg >= 4) return { label: "Excellent", tone: "emerald" };
    if (avg >= 2.5) return { label: "Good", tone: "amber" };
    return { label: "Limited", tone: "rose" };
  }
  if (avg <= 1) return { label: "Low concern", tone: "emerald" };
  if (avg <= 2.5) return { label: "Moderate", tone: "amber" };
  return { label: "Heads up", tone: "rose" };
}

const TONE_CLASSES: Record<string, { bg: string; ring: string; text: string; dot: string }> = {
  emerald: { bg: "bg-emerald-100", ring: "ring-emerald-200", text: "text-emerald-800", dot: "bg-emerald-500" },
  amber: { bg: "bg-amber-100", ring: "ring-amber-200", text: "text-amber-800", dot: "bg-amber-500" },
  rose: { bg: "bg-rose-100", ring: "ring-rose-200", text: "text-rose-800", dot: "bg-rose-500" },
};

const POSITIVE_KEYS: (keyof SafetyScores)[] = ["positiveMessages", "roleModels"];

function ScoreDots({ value, inverted = false }: { value: number; inverted?: boolean }) {
  const tier = safetyTier(value, inverted);
  const tone = TONE_CLASSES[tier.tone];
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          className={`h-2.5 w-6 rounded-full transition-all ${i <= value ? tone.dot : "bg-muted/60"}`}
        />
      ))}
    </div>
  );
}

export function SafetyScore({ scores, compact = false }: { scores: SafetyScores; compact?: boolean }) {
  const concernKeys = (Object.keys(scores) as (keyof SafetyScores)[]).filter(k => !POSITIVE_KEYS.includes(k));
  const avgConcern = concernKeys.reduce((s, k) => s + scores[k], 0) / concernKeys.length;
  const overallTier = safetyTier(avgConcern);
  const overallTone = TONE_CLASSES[overallTier.tone];
  const overallScore = Math.max(0, Math.min(100, Math.round((1 - avgConcern / 5) * 100)));

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className={`relative h-14 w-14 rounded-full ${overallTone.bg} ${overallTone.text} flex items-center justify-center ring-2 ring-offset-2 ring-offset-card ${overallTone.ring}`}>
          <span className="text-lg font-serif font-bold tabular-nums">{overallScore}</span>
        </div>
        <div className="leading-tight">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Safety</div>
          <div className={`text-sm font-semibold ${overallTone.text}`}>{overallTier.label}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 rounded-[2rem] border border-border/60 bg-card p-8 md:p-10 shadow-xl shadow-primary/5">
      <div className="flex flex-col gap-8 border-b border-border/40 pb-8 sm:flex-row sm:items-center sm:gap-10">
        <div className="relative shrink-0">
          <svg className="h-40 w-40 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/40" />
            <motion.circle
              cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8"
              strokeLinecap="round" pathLength="100"
              strokeDasharray="100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 100 - overallScore }}
              transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
              className={overallTone.text}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-serif text-5xl font-bold tabular-nums tracking-tighter">{overallScore}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Safety</span>
          </div>
        </div>
        <div className="space-y-3 flex-1">
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${overallTone.bg} ${overallTone.text}`}>
            <span className={`h-2 w-2 rounded-full ${overallTone.dot} animate-pulse`} />
            {overallTier.label}
          </div>
          <h3 className="font-serif text-3xl md:text-4xl font-bold leading-tight">Safety Breakdown</h3>
          <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
            Rated on a five-point scale by KidSafe editors and verified by real parents in our community.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2">
        {(Object.keys(scores) as (keyof SafetyScores)[]).map(key => {
          const inverted = POSITIVE_KEYS.includes(key);
          const value = scores[key];
          const tier = safetyTier(value, inverted);
          const tone = TONE_CLASSES[tier.tone];
          return (
            <div key={key} className="group flex items-center justify-between gap-4 py-2 border-b border-border/20 last:border-0 sm:[&:nth-last-child(1)]:border-0 sm:[&:nth-last-child(2)]:border-0">
              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold text-foreground/90">{CRITERIA_LABELS[key]}</span>
                <span className={`text-xs font-medium uppercase tracking-wider ${tone.text}`}>{tier.label}</span>
              </div>
              <ScoreDots value={value} inverted={inverted} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
