import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Film as FilmIcon, BookOpen, MapPin, Palette, Gamepad2, type LucideIcon } from "lucide-react";
import { films } from "@/data/films";
import { books } from "@/data/books";
import { places } from "@/data/places";
import { activities } from "@/data/activities";
import { games } from "@/data/games";
import { ContentCard } from "@/components/ContentCard";
import { avgConcern } from "@/lib/format";
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

export default function Browse() {
  const [cat, setCat] = useState<Cat>("films");
  const [age, setAge] = useState("all");
  const [tier, setTier] = useState("all");
  const [sort, setSort] = useState("trending");
  const [q, setQ] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

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
    if (cat === "games") return games.map((g, i) => ({
      id: g.id, href: `/game/${g.id}`, title: g.title, subtitle: `${g.developer} · ${g.platforms.slice(0, 2).join(", ")}`,
      imageUrl: g.coverUrl, ageRecommendation: g.ageRecommendation, safetyScores: g.safetyScores, tags: g.tags, seed: i + 4,
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
    <div className="bg-background min-h-[calc(100vh-5rem)]">
      <div className="container mx-auto px-6 py-10 lg:py-16">
        <header className="mb-10 max-w-2xl">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary">Browse</p>
          <h1 className="font-serif text-4xl font-medium tracking-tight lg:text-5xl text-foreground mb-4">Find exactly what your family needs.</h1>
          <p className="text-base text-muted-foreground">Filter by age group, safety level, and themes that matter to you.</p>
        </header>

        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map(c => {
            const Icon = c.icon;
            const active = cat === c.key;
            return (
              <button
                key={c.key}
                onClick={() => { setCat(c.key); setActiveTags([]); }}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active 
                    ? "bg-foreground text-background" 
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="lg:block">
            <div className="lg:hidden mb-4">
              <Button onClick={() => setIsFiltersOpen(!isFiltersOpen)} variant="outline" className="w-full rounded-lg">
                <SlidersHorizontal className="mr-2 h-4 w-4" /> 
                {isFiltersOpen ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>
            
            <div className={`${isFiltersOpen ? "block" : "hidden"} lg:block sticky top-24 space-y-6 rounded-xl border border-border bg-card p-5 shadow-sm`}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="Search..."
                  className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              
              <div>
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Age group</h3>
                <div className="space-y-1">
                  {AGE_GROUPS.map(a => (
                    <button 
                      key={a.key} 
                      onClick={() => setAge(a.key)} 
                      className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        age === a.key 
                          ? "bg-accent text-accent-foreground font-semibold" 
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Safety</h3>
                <div className="space-y-1">
                  {SAFETY_TIERS.map(t => (
                    <button 
                      key={t.key} 
                      onClick={() => setTier(t.key)} 
                      className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        tier === t.key 
                          ? "bg-accent text-accent-foreground font-semibold" 
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Themes</h3>
                <div className="flex flex-wrap gap-1.5">
                  {allTags.map(tag => {
                    const isActive = activeTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => setActiveTags(s => isActive ? s.filter(t => t !== tag) : [...s, tag])}
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold transition-colors ${
                          isActive 
                            ? "border-primary bg-primary text-primary-foreground" 
                            : "border-border bg-background text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full text-xs text-muted-foreground" 
                onClick={() => { setAge("all"); setTier("all"); setQ(""); setActiveTags([]); }}
              >
                Reset filters
              </Button>
            </div>
          </aside>
          
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground mr-1">{filtered.length}</span> results found
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Sort by</span>
                <select 
                  value={sort} 
                  onChange={e => setSort(e.target.value)} 
                  className="rounded-md border border-border bg-card px-2 py-1 text-sm font-medium outline-none focus:border-primary cursor-pointer"
                >
                  {SORT_OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
                </select>
              </div>
            </div>
            
            {filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-border bg-card p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 text-muted-foreground mb-4">
                  <Search className="h-6 w-6 opacity-50" />
                </div>
                <h3 className="font-serif text-xl font-medium mb-2">Nothing matches your filters</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">Try removing a filter or two — the perfect pick may be just one tweak away.</p>
                <Button 
                  variant="outline"
                  onClick={() => { setAge("all"); setTier("all"); setQ(""); setActiveTags([]); }}
                  className="rounded-full"
                >
                  Clear filters
                </Button>
              </motion.div>
            ) : (
              <div className={`grid gap-4 sm:gap-6 ${cat === "places" || cat === "activities" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
                <AnimatePresence mode="popLayout">
                  {filtered.map((item, i) => (
                    <ContentCard key={item.id} data={item} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
