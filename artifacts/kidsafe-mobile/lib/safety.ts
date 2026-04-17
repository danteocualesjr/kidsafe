import { SafetyScores } from "@/data/dummy";

const POSITIVE = new Set(["positiveMessages", "roleModels"]);

export function avgConcern(scores: SafetyScores) {
  const keys = (Object.keys(scores) as (keyof SafetyScores)[]).filter(k => !POSITIVE.has(k));
  return keys.reduce((s, k) => s + scores[k], 0) / keys.length;
}

export function safetyOutOf100(scores: SafetyScores) {
  return Math.max(0, Math.min(100, Math.round((1 - avgConcern(scores) / 5) * 100)));
}

export function safetyTier(value: number, inverted = false) {
  if (inverted) {
    if (value >= 4) return { label: "Excellent", color: "#10b981", bg: "#d1fae5" };
    if (value >= 2.5) return { label: "Good", color: "#d97706", bg: "#fef3c7" };
    return { label: "Limited", color: "#e11d48", bg: "#ffe4e6" };
  }
  if (value <= 1) return { label: "Low concern", color: "#10b981", bg: "#d1fae5" };
  if (value <= 2.5) return { label: "Moderate", color: "#d97706", bg: "#fef3c7" };
  return { label: "Heads up", color: "#e11d48", bg: "#ffe4e6" };
}

export const CRITERIA_LABELS: Record<keyof SafetyScores, string> = {
  violence: "Violence",
  language: "Language",
  sexualContent: "Sexual Content",
  scariness: "Scariness",
  substanceUse: "Substance Use",
  consumerism: "Consumerism",
  positiveMessages: "Positive Messages",
  roleModels: "Role Models",
};

export const POSITIVE_KEYS = ["positiveMessages", "roleModels"] as const;
