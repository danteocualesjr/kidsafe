import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Film as FilmIcon, BookOpen, MapPin, Palette } from "lucide-react";
import { films } from "@/data/films";
import { books } from "@/data/books";
import { places } from "@/data/places";
import { activities } from "@/data/activities";
import { ContentCard } from "@/components/ContentCard";
import { avgConcern } from "@/lib/format";
import { Button } from "@/components/ui/button";

type Cat = "films" | "books" | "places" | "activities";

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
  { key: "newest", label: "Recently added" },
];

const CATEGORIES: { key: Cat; label: string; icon: any }[] = [
  { key: "films", label: "Films", icon: FilmIcon },
  { key: "books", label: "Books", icon: BookOpen },
  { key: "places", label: "Places", icon: MapPin },
  { key: "activities", label: "Activities", icon: Palette },
];

export default function Browse() {
  const [cat, setCat] = useState<Cat>("films");
  const [age, setAge] = useState("all");
  const [tier, setTier] = useState("all");
  const [sort, setSort] = useState("trending");
  const [q, setQ] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const allItems = useMemo(() => {
    if (cat === "films") return films.map((f, i) => ({
      id: f.id, href: `/film/${f.id}`, title: f.title, subtitle: `${f.year} · ${f.genres.slice(0, 2).join(", ")}`,
      imageUrl: f.posterUrl, ageRecommendation: f.ageRecommendation, safetyScores: f.safetyScores, tags: f.tags, seed: i,
    }));
    if (cat === "books") return books.map((b, i) => ({
      id: b.id, href: `/book/${b.id}`, title: b.title, subtitle: `${b.author} · ${b.pages}p`,
      ageRecommendation: b.ageRecommendation, safetyScores: b.safetyScores, tags: b.tags, seed: i + 1,
    }));
    if (cat === "places") return places.map((p, i) => ({
      id: p.id, href: `/place/${p.id}`, title: p.name, subtitle: `${p.location} · ${p.category}`, aspect: "4/3",
      ageRecommendation: p.ageRecommendation, safetyScores: p.safetyScores, tags: p.tags, seed: i + 2,
    }));
    return activities.map((a, i) => ({
      id: a.id, href: `/activity/${a.id}`, title: a.name, subtitle: a.category, aspect: "4/3",
      ageRecommendation: a.ageRecommendation, safetyScores: a.safetyScores, tags: a.tags, seed: i + 3,
    }));
  }, [cat]);

  const allTags = useMemo(() => Array.from(new Set(allItems.flatMap(i => i.tags))).slice(0, 14), [allItems]);

  const filtered = useMemo(() => {
    const ag = AGE_GROUPS.find(a => a.key === age)!;
    const ti = SAFETY_TIERS.find(t => t.key === tier)!;
    let items = allItems.filter(it => it.ageRecommendation >= ag.min && it.ageRecommendation <= ag.max);
    if (ti.maxAvg !== undefined) items = items.filter(it => avgConcern(it.safetyScores) <= ti.maxAvg);
    if (q.trim()) items = items.filter(it => it.title.toLowerCase().includes(q.toLowerCase()) || it.subtitle.toLowerCase().includes(q.toLowerCase()));
    if (activeTags.length) items = items.filter(it => activeTags.every(t => it.tags.includes(t)));
    if (sort === "youngest") items = [...items].sort((a, b) => a.ageRecommendation - b.ageRecommendation);
    else if (sort === "oldest") items = [...items].sort((a, b) => b.ageRecommendation - a.ageRecommendation);
    else if (sort === "trending") items = [...items].sort((a, b) => avgConcern(a.safetyScores) - avgConcern(b.safetyScores));
    return items;
  }, [allItems, age, tier, sort, q, activeTags]);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">Browse</p>
        <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">Find exactly what your family needs</h1>
        <p className="mt-2 text-base text-muted-foreground">Filter by age group, safety level, and themes that matter to you.</p>
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map(c => {
          const Icon = c.icon;
          const active = cat === c.key;
          return (
            <button
              key={c.key}
              onClick={() => { setCat(c.key); setActiveTags([]); }}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${active ? "border-primary bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
            >
              <Icon className="h-4 w-4" />
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside>
          <div className="sticky top-24 space-y-6 rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              Filters
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search by title..."
                className="h-10 w-full rounded-full border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Age group</h3>
              <div className="space-y-1.5">
                {AGE_GROUPS.map(a => (
                  <button key={a.key} onClick={() => setAge(a.key)} className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-all ${age === a.key ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}>{a.label}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Safety</h3>
              <div className="space-y-1.5">
                {SAFETY_TIERS.map(t => (
                  <button key={t.key} onClick={() => setTier(t.key)} className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-all ${tier === t.key ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}>{t.label}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Themes</h3>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map(tag => {
                  const isActive = activeTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => setActiveTags(s => isActive ? s.filter(t => t !== tag) : [...s, tag])}
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all ${isActive ? "border-primary bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:text-foreground"}`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-full" onClick={() => { setAge("all"); setTier("all"); setQ(""); setActiveTags([]); }}>
              Reset filters
            </Button>
          </div>
        </aside>
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filtered.length}</span> results
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort by</span>
              <select value={sort} onChange={e => setSort(e.target.value)} className="rounded-full border bg-card px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/30">
                {SORT_OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
              </select>
            </div>
          </div>
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border bg-card p-12 text-center">
              <h3 className="font-serif text-xl font-bold">Nothing matches yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">Try removing a filter or two — the perfect pick may be just one tweak away.</p>
            </motion.div>
          ) : (
            <div className={`grid gap-4 ${cat === "places" || cat === "activities" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
              {filtered.map((item, i) => <ContentCard key={item.id} data={item} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
