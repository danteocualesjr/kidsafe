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
  { key: "newest", label: "Recently added" },
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
    <div className="bg-gradient-to-br from-background via-background to-accent/5 min-h-[calc(100vh-5rem)]">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <header className="mb-12 max-w-3xl">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">Browse</p>
          <h1 className="font-serif text-5xl font-bold tracking-tight lg:text-6xl text-foreground">Find exactly what your family needs.</h1>
          <p className="mt-4 text-xl text-muted-foreground font-medium leading-relaxed">Filter by age group, safety level, and themes that matter to you.</p>
        </header>

        <div className="mb-10 flex flex-wrap gap-3">
          {CATEGORIES.map(c => {
            const Icon = c.icon;
            const active = cat === c.key;
            return (
              <button
                key={c.key}
                onClick={() => { setCat(c.key); setActiveTags([]); }}
                className={`inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-base font-bold transition-all duration-300 ${
                  active 
                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "border-border/50 bg-card text-muted-foreground hover:border-border hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
          <aside className="lg:block">
            <div className="lg:hidden mb-4">
              <Button onClick={() => setIsFiltersOpen(!isFiltersOpen)} variant="outline" className="w-full rounded-2xl h-14 text-base font-bold">
                <SlidersHorizontal className="mr-2 h-5 w-5" /> 
                {isFiltersOpen ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>
            
            <div className={`${isFiltersOpen ? "block" : "hidden"} lg:block sticky top-28 space-y-8 rounded-[2.5rem] border border-border/50 bg-card/80 backdrop-blur-xl p-8 shadow-2xl shadow-primary/5`}>
              <div className="flex items-center gap-3 text-base font-bold uppercase tracking-widest text-foreground border-b border-border/40 pb-4">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
                Filters
              </div>
              
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                <input
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="Search by title..."
                  className="h-12 w-full rounded-2xl border-2 border-border/50 bg-background/50 pl-12 pr-4 text-base font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
              </div>
              
              <div>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Age group</h3>
                <div className="space-y-2">
                  {AGE_GROUPS.map(a => (
                    <button 
                      key={a.key} 
                      onClick={() => setAge(a.key)} 
                      className={`block w-full rounded-xl px-4 py-3 text-left text-base font-medium transition-all ${
                        age === a.key 
                          ? "bg-primary/10 text-primary font-bold shadow-sm ring-1 ring-primary/20" 
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Safety</h3>
                <div className="space-y-2">
                  {SAFETY_TIERS.map(t => (
                    <button 
                      key={t.key} 
                      onClick={() => setTier(t.key)} 
                      className={`block w-full rounded-xl px-4 py-3 text-left text-base font-medium transition-all ${
                        tier === t.key 
                          ? "bg-primary/10 text-primary font-bold shadow-sm ring-1 ring-primary/20" 
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Themes</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => {
                    const isActive = activeTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => setActiveTags(s => isActive ? s.filter(t => t !== tag) : [...s, tag])}
                        className={`rounded-full border-2 px-3 py-1.5 text-xs font-bold transition-all ${
                          isActive 
                            ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                            : "border-border/40 bg-background text-muted-foreground hover:border-border hover:text-foreground"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full rounded-xl h-12 text-base font-bold border-2" 
                onClick={() => { setAge("all"); setTier("all"); setQ(""); setActiveTags([]); }}
              >
                Reset filters
              </Button>
            </div>
          </aside>
          
          <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-6">
              <div className="text-base text-muted-foreground font-medium">
                <span className="font-bold text-foreground text-lg mr-1">{filtered.length}</span> results found
              </div>
              <div className="flex items-center gap-3 text-base">
                <span className="text-muted-foreground font-medium">Sort by</span>
                <select 
                  value={sort} 
                  onChange={e => setSort(e.target.value)} 
                  className="rounded-xl border-2 border-border/50 bg-card px-4 py-2.5 text-base font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 cursor-pointer shadow-sm"
                >
                  {SORT_OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
                </select>
              </div>
            </div>
            
            {filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[3rem] border border-border/50 bg-card p-16 text-center shadow-xl shadow-primary/5">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-accent/50 text-muted-foreground mb-6">
                  <Search className="h-10 w-10 opacity-50" />
                </div>
                <h3 className="font-serif text-3xl font-bold mb-4">Nothing matches your filters</h3>
                <p className="text-lg text-muted-foreground max-w-md mx-auto font-medium">Try removing a filter or two — the perfect pick may be just one tweak away.</p>
                <Button 
                  onClick={() => { setAge("all"); setTier("all"); setQ(""); setActiveTags([]); }}
                  className="mt-8 rounded-full h-12 px-8 text-base font-bold"
                >
                  Clear all filters
                </Button>
              </motion.div>
            ) : (
              <div className={`grid gap-6 ${cat === "places" || cat === "activities" ? "sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
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
