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
  emerald: { bg: "bg-emerald-50", ring: "ring-emerald-200", text: "text-emerald-700", dot: "bg-emerald-500" },
  amber: { bg: "bg-amber-50", ring: "ring-amber-200", text: "text-amber-700", dot: "bg-amber-500" },
  rose: { bg: "bg-rose-50", ring: "ring-rose-200", text: "text-rose-700", dot: "bg-rose-500" },
};

const POSITIVE_KEYS: (keyof SafetyScores)[] = ["positiveMessages", "roleModels"];

function ScoreDots({ value, inverted = false }: { value: number; inverted?: boolean }) {
  const tier = safetyTier(value, inverted);
  const tone = TONE_CLASSES[tier.tone];
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map(i => (
        <div
          key={i}
          className={`h-2 w-5 rounded-full transition-all ${i < value ? tone.dot : "bg-muted"}`}
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
        <div className={`relative h-12 w-12 rounded-full ${overallTone.bg} ${overallTone.text} flex items-center justify-center ring-1 ${overallTone.ring}`}>
          <span className="text-sm font-bold tabular-nums">{overallScore}</span>
        </div>
        <div className="leading-tight">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Safety</div>
          <div className={`text-sm font-semibold ${overallTone.text}`}>{overallTier.label}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-2xl border bg-card p-6">
      <div className="flex flex-col gap-6 border-b pb-6 sm:flex-row sm:items-center sm:gap-8">
        <div className="relative">
          <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
            <motion.circle
              cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6"
              strokeLinecap="round" pathLength="100"
              strokeDasharray="100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 100 - overallScore }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={overallTone.text}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-serif text-3xl font-bold tabular-nums">{overallScore}</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Safety</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${overallTone.bg} ${overallTone.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${overallTone.dot}`} />
            {overallTier.label}
          </div>
          <h3 className="font-serif text-2xl font-bold leading-tight">Safety Score Breakdown</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Each criterion is rated on a five-point scale by KidSafe editors and verified by parent reviewers.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        {(Object.keys(scores) as (keyof SafetyScores)[]).map(key => {
          const inverted = POSITIVE_KEYS.includes(key);
          const value = scores[key];
          const tier = safetyTier(value, inverted);
          const tone = TONE_CLASSES[tier.tone];
          return (
            <div key={key} className="flex items-center justify-between gap-4 py-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{CRITERIA_LABELS[key]}</span>
                <span className={`text-xs ${tone.text}`}>{tier.label}</span>
              </div>
              <ScoreDots value={value} inverted={inverted} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
