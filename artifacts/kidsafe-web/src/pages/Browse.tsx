import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  SlidersHorizontal,
  ShieldCheck,
  Baby,
  Layers,
  ShieldAlert,
  Bookmark,
  Film as FilmIcon,
  BookOpen,
  MapPin,
  Palette,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";
import { films } from "@/data/films";
import { books } from "@/data/books";
import { places } from "@/data/places";
import { activities } from "@/data/activities";
import { games } from "@/data/games";
import { avgConcern } from "@/lib/format";

const POSITIVE_KEYS = new Set(["positiveMessages", "roleModels"]);
function scoreTone(key: string, value: number): "good" | "warn" | "bad" | "neutral" {
  if (POSITIVE_KEYS.has(key)) {
    if (value >= 4) return "good";
    if (value >= 2) return "warn";
    return "bad";
  }
  if (value <= 1) return "good";
  if (value <= 3) return "warn";
  return "bad";
}
import { Button } from "@/components/ui/button";

type Cat = "films" | "books" | "places" | "activities" | "games";

const AGE_GROUPS = [
  { key: "all", label: "All ages", min: 0, max: 99 },
  { key: "toddler", label: "Toddlers (0–4)", min: 0, max: 4 },
  { key: "kid", label: "Kids (5–8)", min: 5, max: 8 },
  { key: "tween", label: "Tweens (9–12)", min: 9, max: 12 },
  { key: "teen", label: "Teens (13+)", min: 13, max: 99 },
];

const SAFETY_TIERS = [
  { key: "all", label: "Any safety level" },
  { key: "safe", label: "Low concern", maxAvg: 1 },
  { key: "mod", label: "Moderate", maxAvg: 2.5 },
  { key: "all-incl", label: "Heads up", maxAvg: 5 },
];

const SORT_OPTIONS = [
  { key: "trending", label: "Most trusted" },
  { key: "youngest", label: "Youngest age first" },
  { key: "oldest", label: "Oldest age first" },
];

const CATEGORIES: { key: Cat; label: string; icon: LucideIcon }[] = [
  { key: "films", label: "Films", icon: FilmIcon },
  { key: "books", label: "Books", icon: BookOpen },
  { key: "games", label: "Games", icon: Gamepad2 },
  { key: "places", label: "Places", icon: MapPin },
  { key: "activities", label: "Activities", icon: Palette },
];

const THRESHOLD_KEYS: { key: keyof Item["safetyScores"]; label: string }[] = [
  { key: "violence", label: "Violence Tolerance" },
  { key: "language", label: "Language Filter" },
  { key: "scariness", label: "Fear / Suspense" },
  { key: "consumerism", label: "Commercialism" },
];

type Item = {
  id: string;
  href: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
  ageRecommendation: number;
  safetyScores: {
    violence: number;
    language: number;
    sexualContent: number;
    scariness: number;
    substanceUse: number;
    consumerism: number;
    positiveMessages: number;
    roleModels: number;
  };
  tags: string[];
  seed: number;
  aspect?: string;
};

function thresholdLabel(v: number) {
  if (v <= 1) return { label: "Strict", color: "secondary" };
  if (v <= 2) return { label: "Low", color: "secondary" };
  if (v <= 3) return { label: "Medium", color: "primary" };
  return { label: "Open", color: "destructive" };
}

export default function Browse() {
  const [cat, setCat] = useState<Cat>("films");
  const [age, setAge] = useState("all");
  const [tier, setTier] = useState("all");
  const [sort, setSort] = useState("trending");
  const [q, setQ] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [thresholds, setThresholds] = useState<Record<string, number>>({
    violence: 2,
    language: 1,
    scariness: 3,
    consumerism: 2,
  });

  const allItems: Item[] = useMemo(() => {
    if (cat === "films")
      return films.map((f, i) => ({
        id: f.id,
        href: `/film/${f.id}`,
        title: f.title,
        subtitle: `${f.year} · ${f.genres.slice(0, 2).join(", ")}`,
        imageUrl: f.posterUrl,
        ageRecommendation: f.ageRecommendation,
        safetyScores: f.safetyScores,
        tags: f.tags,
        seed: i,
      }));
    if (cat === "books")
      return books.map((b, i) => ({
        id: b.id,
        href: `/book/${b.id}`,
        title: b.title,
        subtitle: `${b.author} · ${b.pages}p`,
        ageRecommendation: b.ageRecommendation,
        safetyScores: b.safetyScores,
        tags: b.tags,
        seed: i + 1,
      }));
    if (cat === "places")
      return places.map((p, i) => ({
        id: p.id,
        href: `/place/${p.id}`,
        title: p.name,
        subtitle: `${p.location} · ${p.category}`,
        aspect: "4/3",
        ageRecommendation: p.ageRecommendation,
        safetyScores: p.safetyScores,
        tags: p.tags,
        seed: i + 2,
      }));
    if (cat === "games")
      return games.map((g, i) => ({
        id: g.id,
        href: `/game/${g.id}`,
        title: g.title,
        subtitle: `${g.developer} · ${g.platforms.slice(0, 2).join(", ")}`,
        imageUrl: g.coverUrl,
        ageRecommendation: g.ageRecommendation,
        safetyScores: g.safetyScores,
        tags: g.tags,
        seed: i + 4,
      }));
    return activities.map((a, i) => ({
      id: a.id,
      href: `/activity/${a.id}`,
      title: a.name,
      subtitle: a.category,
      aspect: "4/3",
      ageRecommendation: a.ageRecommendation,
      safetyScores: a.safetyScores,
      tags: a.tags,
      seed: i + 3,
    }));
  }, [cat]);

  const allTags = useMemo(
    () => Array.from(new Set(allItems.flatMap((i) => i.tags))).slice(0, 14),
    [allItems]
  );

  const filtered = useMemo(() => {
    const ag = AGE_GROUPS.find((a) => a.key === age)!;
    const ti = SAFETY_TIERS.find((t) => t.key === tier)!;
    let items = allItems.filter(
      (it) => it.ageRecommendation >= ag.min && it.ageRecommendation <= ag.max
    );
    if (ti.maxAvg !== undefined)
      items = items.filter((it) => avgConcern(it.safetyScores) <= ti.maxAvg);
    if (q.trim())
      items = items.filter(
        (it) =>
          it.title.toLowerCase().includes(q.toLowerCase()) ||
          it.subtitle.toLowerCase().includes(q.toLowerCase())
      );
    if (activeTags.length)
      items = items.filter((it) => activeTags.every((t) => it.tags.includes(t)));
    if (sort === "youngest")
      items = [...items].sort((a, b) => a.ageRecommendation - b.ageRecommendation);
    else if (sort === "oldest")
      items = [...items].sort((a, b) => b.ageRecommendation - a.ageRecommendation);
    else if (sort === "trending")
      items = [...items].sort((a, b) => avgConcern(a.safetyScores) - avgConcern(b.safetyScores));
    return items;
  }, [allItems, age, tier, sort, q, activeTags]);

  const matchCount = filtered.length;

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background">
      <div className="container mx-auto flex flex-col gap-8 px-4 py-8 lg:flex-row lg:gap-10 lg:px-6 lg:py-12">
        {/* Sidebar — Guardian Controls */}
        <aside className="lg:w-72 shrink-0">
          <div className="lg:hidden mb-4">
            <Button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              variant="outline"
              className="w-full rounded-xl"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {isFiltersOpen ? "Hide Filters" : "Guardian Controls"}
            </Button>
          </div>

          <div
            className={`${
              isFiltersOpen ? "block" : "hidden"
            } lg:block lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto rounded-3xl border border-border/60 bg-card p-6 shadow-sm`}
          >
            <div className="mb-7">
              <h2 className="font-serif text-lg font-extrabold tracking-tight text-primary">
                Guardian Controls
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">Refine content safety</p>
            </div>

            <div className="space-y-7">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search…"
                  className="h-10 w-full rounded-full border border-border bg-muted/40 pl-9 pr-9 text-sm font-medium outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                />
                {q && (
                  <button
                    onClick={() => setQ("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Age Ranges */}
              <section>
                <div className="mb-3 flex items-center gap-2 text-primary">
                  <Baby className="h-4 w-4" />
                  <span className="text-sm font-bold">Age Ranges</span>
                </div>
                <div className="space-y-1.5">
                  {AGE_GROUPS.map((a) => {
                    const active = age === a.key;
                    return (
                      <button
                        key={a.key}
                        onClick={() => setAge(a.key)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-all ${
                          active
                            ? "bg-secondary/15 font-bold text-primary"
                            : "text-muted-foreground hover:bg-muted/60"
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                            active ? "border-secondary bg-secondary" : "border-border bg-card"
                          }`}
                        >
                          {active && (
                            <svg viewBox="0 0 12 12" className="h-3 w-3 text-secondary-foreground">
                              <path
                                d="M2.5 6L5 8.5L9.5 4"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        {a.label}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Thresholds */}
              <section>
                <div className="mb-3 flex items-center gap-2 text-primary">
                  <ShieldAlert className="h-4 w-4" />
                  <span className="text-sm font-bold">Thresholds</span>
                </div>
                <div className="space-y-4">
                  {THRESHOLD_KEYS.map((tk) => {
                    const v = thresholds[tk.key as string] ?? 2;
                    const meta = thresholdLabel(v);
                    return (
                      <div key={tk.key as string}>
                        <div className="mb-2 flex justify-between text-xs font-semibold">
                          <span className="text-muted-foreground">{tk.label}</span>
                          <span className={`text-${meta.color}`}>{meta.label}</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={5}
                          value={v}
                          onChange={(e) =>
                            setThresholds((s) => ({ ...s, [tk.key]: Number(e.target.value) }))
                          }
                          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-secondary"
                        />
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Safety tier (kept from original) */}
              <section>
                <div className="mb-3 flex items-center gap-2 text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-sm font-bold">Safety Filters</span>
                </div>
                <div className="space-y-1.5">
                  {SAFETY_TIERS.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTier(t.key)}
                      className={`block w-full rounded-xl px-3 py-2 text-left text-sm transition-all ${
                        tier === t.key
                          ? "bg-accent font-bold text-accent-foreground"
                          : "text-muted-foreground hover:bg-muted/60"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Themes */}
              <section>
                <div className="mb-3 flex items-center gap-2 text-primary">
                  <Layers className="h-4 w-4" />
                  <span className="text-sm font-bold">Themes</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {allTags.map((tag) => {
                    const isActive = activeTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() =>
                          setActiveTags((s) =>
                            isActive ? s.filter((t) => t !== tag) : [...s, tag]
                          )
                        }
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/70 text-muted-foreground hover:bg-accent/60 hover:text-accent-foreground"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </section>

              <Button
                className="w-full rounded-2xl shadow-lg shadow-primary/20"
                onClick={() => setIsFiltersOpen(false)}
              >
                Apply Filters
              </Button>
              <button
                onClick={() => {
                  setAge("all");
                  setTier("all");
                  setQ("");
                  setActiveTags([]);
                }}
                className="w-full text-xs font-medium text-muted-foreground hover:text-primary"
              >
                Reset all
              </button>
            </div>
          </div>
        </aside>

        {/* Main results */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <header className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-secondary">
                Browse
              </p>
              <h1 className="font-serif text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
                Search Results
              </h1>
              <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                Showing
                <span className="font-bold text-foreground">{matchCount}</span>
                safe matches
                {q && (
                  <>
                    for
                    <span className="rounded-md bg-accent px-2 py-0.5 font-bold text-accent-foreground">
                      "{q}"
                    </span>
                  </>
                )}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-muted-foreground">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-border bg-card px-4 py-2 pr-8 text-sm font-bold text-primary outline-none focus:ring-2 focus:ring-primary/20"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </header>

          {/* Category pills */}
          <div className="mb-8 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const active = cat === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => {
                    setCat(c.key);
                    setActiveTags([]);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/60 text-primary hover:bg-accent/60"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Results grid */}
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border border-border bg-card p-12 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 text-muted-foreground">
                <Search className="h-6 w-6 opacity-50" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold">Nothing matches your filters</h3>
              <p className="mx-auto mb-6 max-w-sm text-sm text-muted-foreground">
                Try removing a filter or two — the perfect pick may be one tweak away.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setAge("all");
                  setTier("all");
                  setQ("");
                  setActiveTags([]);
                }}
                className="rounded-full"
              >
                Clear filters
              </Button>
            </motion.div>
          ) : (
            <div
              className={`grid gap-6 ${
                cat === "places" || cat === "activities"
                  ? "sm:grid-cols-2 xl:grid-cols-3"
                  : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((item, i) => (
                  <ResultCard key={item.id} item={item} index={i} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function ResultCard({ item, index }: { item: Item; index: number }) {
  const safety = (10 - avgConcern(item.safetyScores) * 1.8).toFixed(1);
  const top3 = (
    Object.entries(item.safetyScores) as [keyof Item["safetyScores"], number][]
  )
    .filter(([k]) =>
      ["positiveMessages", "roleModels", "violence", "language", "scariness", "consumerism"].includes(k)
    )
    .slice(0, 3);

  const PRETTY: Record<string, string> = {
    positiveMessages: "Values",
    roleModels: "Models",
    violence: "Violence",
    language: "Language",
    scariness: "Suspense",
    consumerism: "Ads",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.25, 1, 0.5, 1] as const }}
    >
      <Link href={item.href}>
        <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[2rem] bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div
            className={`relative w-full overflow-hidden ${
              item.aspect === "4/3" ? "aspect-[4/3]" : "aspect-[2/3]"
            }`}
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div
                className="h-full w-full"
                style={{
                  background: `linear-gradient(135deg, hsl(${(item.seed * 47) % 360} 60% 80%), hsl(${
                    (item.seed * 47 + 60) % 360
                  } 70% 70%))`,
                }}
              />
            )}
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-primary backdrop-blur-md">
                Ages {item.ageRecommendation}+
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-[11px] font-bold text-secondary-foreground shadow-md">
                <ShieldCheck className="h-3 w-3" /> {safety}
              </span>
            </div>
            <button
              onClick={(e) => e.preventDefault()}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 backdrop-blur-md transition-opacity hover:bg-white group-hover:opacity-100"
              aria-label="Save"
            >
              <Bookmark className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <h3 className="mb-1 font-serif text-base font-bold leading-tight text-primary line-clamp-1">
              {item.title}
            </h3>
            <p className="mb-4 text-xs font-medium text-muted-foreground line-clamp-1">
              {item.subtitle}
            </p>

            <div className="mt-auto flex items-center gap-2">
              <div className="-space-x-1 flex">
                {[0, 1, 2].map((i) => (
                  <ShieldCheck
                    key={i}
                    className="h-3.5 w-3.5 text-secondary"
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-bold text-secondary">
                Guardian Verified
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {top3.map(([k, v]) => {
                const tone = scoreTone(k as string, Number(v));
                return (
                  <div
                    key={k as string}
                    className={`flex flex-col items-center rounded-xl px-2 py-2 text-center ${
                      tone === "good"
                        ? "bg-secondary/10"
                        : tone === "warn"
                        ? "bg-accent/40"
                        : tone === "bad"
                        ? "bg-destructive/10"
                        : "bg-muted/60"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
                      {PRETTY[k as string] ?? (k as string)}
                    </span>
                    <span
                      className={`text-xs font-extrabold ${
                        tone === "good"
                          ? "text-secondary"
                          : tone === "warn"
                          ? "text-accent-foreground"
                          : tone === "bad"
                          ? "text-destructive"
                          : "text-foreground"
                      }`}
                    >
                      {v}/5
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
