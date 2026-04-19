import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import {
  Bookmark,
  Share2,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Hammer,
  Heart,
  Clock,
} from "lucide-react";
import { getActivity, activities } from "@/data/activities";
import { ReviewCard } from "@/components/ReviewCard";
import { PosterPlaceholder } from "@/components/PosterPlaceholder";
import { Button } from "@/components/ui/button";
import NotFound from "./not-found";

const SAFETY_LABELS: Record<string, { label: string; note: string }> = {
  violence: { label: "Physical Risk", note: "Likelihood of bumps, scrapes, or rough play." },
  language: { label: "Language Exposure", note: "Mature language from peers or facilitators." },
  sexualContent: { label: "Adult Themes", note: "Material directed at older audiences." },
  scariness: { label: "Sensory Intensity", note: "Loud, fast, or visually overwhelming moments." },
  substanceUse: { label: "Substance Visibility", note: "Adult substances visible at the venue." },
  consumerism: { label: "Cost & Upsells", note: "Subscription fees, materials, or add-ons." },
  positiveMessages: { label: "Positive Outcomes", note: "Encourages curiosity, calm, or skill-building." },
  roleModels: { label: "Facilitator Quality", note: "Adults present and family-friendly tone." },
};

const POSITIVE = new Set(["positiveMessages", "roleModels"]);

function isHighConcern(key: string, value: number) {
  if (POSITIVE.has(key)) return value <= 2;
  return value >= 4;
}
function isModerate(value: number) {
  return value === 3;
}

function safetyTotal(a: (typeof activities)[number]): number {
  const s = a.safetyScores;
  return (s.positiveMessages + s.roleModels) * 2 - (s.violence + s.scariness + s.consumerism);
}

export default function ActivityDetail() {
  const [, params] = useRoute("/activity/:id");
  const activity = params ? getActivity(params.id) : undefined;
  if (!activity) return <NotFound />;

  const seed = activities.findIndex((a) => a.id === activity.id);
  const similar = activities
    .filter((a) => a.id !== activity.id && a.category === activity.category)
    .sort((a, b) => safetyTotal(b) - safetyTotal(a))
    .slice(0, 3);

  const scoreEntries = Object.entries(activity.safetyScores) as [string, number][];
  const left = scoreEntries.slice(0, 4);
  const right = scoreEntries.slice(4);

  return (
    <div className="bg-background pb-24 md:pb-32">
      {/* Editorial scene hero */}
      <header className="relative flex min-h-[520px] w-full items-end overflow-hidden px-6 pb-16 pt-24 md:min-h-[600px] md:px-12 md:pb-20 md:pt-28 lg:px-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-accent via-secondary to-primary" />
          <div
            className="absolute inset-0 opacity-25 mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 25%, white 0%, transparent 45%), radial-gradient(circle at 75% 80%, white 0%, transparent 40%)",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] as const }}
          className="relative z-10 max-w-3xl"
        >
          <Link
            href="/browse"
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3 w-3" /> Back to browse
          </Link>

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-4 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-secondary-foreground">
              <ShieldCheck className="h-3 w-3" /> KidSafe Certified
            </span>
            <span className="rounded-full bg-card/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground backdrop-blur">
              {activity.category}
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
              Best for ages {activity.ageRecommendation}+
            </span>
          </div>

          <h1 className="mb-6 font-serif text-5xl font-extrabold leading-[0.95] tracking-tight text-primary md:text-7xl lg:text-[5.5rem]">
            {activity.name}
          </h1>

          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="rounded-3xl bg-gradient-to-r from-primary to-primary/80 px-7 py-6 text-sm font-bold shadow-lg shadow-primary/20"
            >
              <Hammer className="mr-2 h-4 w-4" /> Try Activity
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-3xl border-border bg-card px-7 py-6 text-sm font-bold"
            >
              <Bookmark className="mr-2 h-4 w-4" /> Save for Weekend
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="rounded-3xl px-7 py-6 text-sm font-bold"
            >
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </motion.div>
      </header>

      <main className="relative z-10 -mt-10 px-4 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-border/60 bg-card p-7 shadow-sm md:p-9"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/40 text-accent-foreground">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-extrabold tracking-tight text-primary">
                  KidSafe AI Quick Summary
                </h2>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {activity.description}
              </p>
            </motion.section>

            <section className="rounded-3xl bg-muted/40 p-7 md:p-9">
              <h2 className="mb-7 font-serif text-3xl font-extrabold tracking-tight text-primary">
                Safety Deep Dive
              </h2>
              <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
                {[left, right].map((col, ci) => (
                  <div key={ci} className="space-y-6">
                    {col.map(([key, value]) => {
                      const meta = SAFETY_LABELS[key];
                      const pct = (value / 5) * 100;
                      const tone = isHighConcern(key, value)
                        ? "destructive"
                        : isModerate(value)
                        ? "accent"
                        : "secondary";
                      return (
                        <div key={key}>
                          <div className="mb-2 flex justify-between">
                            <span className="text-sm font-bold text-foreground">
                              {meta?.label ?? key}
                            </span>
                            <span className="text-sm text-muted-foreground">{value}/5</span>
                          </div>
                          <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                            <div
                              className={`h-full rounded-full ${
                                tone === "destructive"
                                  ? "bg-destructive"
                                  : tone === "accent"
                                  ? "bg-accent"
                                  : "bg-secondary"
                              }`}
                              style={{ width: `${Math.max(pct, 4)}%` }}
                            />
                          </div>
                          {meta?.note && (
                            <p className="mt-2 text-xs text-muted-foreground">{meta.note}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-accent/40 bg-accent/20 p-7 md:p-9">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-accent-foreground" />
                <h2 className="font-serif text-2xl font-extrabold text-accent-foreground">
                  What parents need to know
                </h2>
              </div>
              <p className="text-base leading-relaxed text-accent-foreground/85 md:text-lg">
                {activity.whatParentsNeedToKnow}
              </p>
            </section>

            <section className="space-y-5">
              <div className="flex items-end justify-between">
                <h2 className="font-serif text-3xl font-extrabold tracking-tight text-primary">
                  Community Voice
                </h2>
                <button className="text-sm font-bold text-secondary hover:underline">
                  Read all {activity.parentReviews.length} reviews
                </button>
              </div>

              {activity.parentReviews[0] && (
                <div className="rounded-3xl border-l-4 border-accent bg-card p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/15 text-secondary font-bold">
                      {activity.parentReviews[0].author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-primary">
                        {activity.parentReviews[0].author}
                      </p>
                      <p className="text-xs text-muted-foreground">Parent reviewer</p>
                    </div>
                    <div className="ml-auto inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
                      <Heart className="h-3 w-3" /> Top Pick
                    </div>
                  </div>
                  <p className="italic leading-relaxed text-muted-foreground">
                    "{activity.parentReviews[0].text}"
                  </p>
                </div>
              )}

              <div className="grid gap-4">
                {activity.parentReviews.slice(1).map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-5">
              <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
                <div className="aspect-[4/3] w-full">
                  <PosterPlaceholder
                    title={activity.name}
                    seed={seed + 4}
                    aspect="4/3"
                    className="h-full w-full"
                  />
                </div>
                <div className="space-y-3 p-5">
                  <div>
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-secondary">
                      Category
                    </div>
                    <p className="font-serif text-base font-bold text-primary">
                      {activity.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2 text-xs">
                    <Clock className="h-3.5 w-3.5 text-secondary" />
                    <span className="font-semibold text-foreground">Recommended</span>
                    <span className="ml-auto font-bold text-primary">
                      Ages {activity.ageRecommendation}+
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  What it involves
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activity.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-muted/60 px-3 py-1 text-xs font-semibold text-muted-foreground"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {similar.length > 0 && (
                <div className="rounded-2xl border border-border/60 bg-card p-5">
                  <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    More {activity.category.toLowerCase()} ideas
                  </h3>
                  <div className="space-y-3">
                    {similar.map((s) => (
                      <Link
                        key={s.id}
                        href={`/activity/${s.id}`}
                        className="group -mx-2 flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted/60"
                      >
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                          <PosterPlaceholder
                            title={s.name}
                            seed={activities.findIndex((a) => a.id === s.id) + 7}
                            aspect="1/1"
                            className="h-full w-full"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-serif text-base font-bold leading-tight transition-colors group-hover:text-secondary">
                            {s.name}
                          </div>
                          <div className="mt-0.5 truncate text-xs text-muted-foreground">
                            Ages {s.ageRecommendation}+ · {s.category}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
