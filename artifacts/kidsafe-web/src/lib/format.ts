import { SafetyScores } from "@/data/types";

const POSITIVE = new Set(["positiveMessages", "roleModels"]);

export function avgConcern(scores: SafetyScores) {
  const keys = (Object.keys(scores) as (keyof SafetyScores)[]).filter(k => !POSITIVE.has(k));
  return keys.reduce((s, k) => s + scores[k], 0) / keys.length;
}

export function safetyOutOf100(scores: SafetyScores) {
  return Math.max(0, Math.min(100, Math.round((1 - avgConcern(scores) / 5) * 100)));
}
