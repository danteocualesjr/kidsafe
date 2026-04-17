import { Link } from "wouter";
import { motion } from "framer-motion";
import { Plus, Bookmark, Sparkles, Activity, Settings, Bell, ChevronRight } from "lucide-react";
import { kids, watchlist, recentActivity } from "@/data/kids";
import { films, getFilm } from "@/data/films";
import { FilmCard } from "@/components/FilmCard";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const } }
};

export default function Dashboard() {
  return (
    <div className="bg-background min-h-screen pb-24 md:pb-32">
      <div className="bg-accent/10 pt-10 pb-8 border-b border-border">
        <div className="container mx-auto px-6">
          <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary">Your dashboard</p>
              <h1 className="font-serif text-4xl font-medium tracking-tight lg:text-5xl text-foreground">Welcome back, Alex</h1>
              <p className="mt-2 text-base text-muted-foreground">Here's what's happening across your family this week.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border border-border bg-card hover:bg-muted"><Bell className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border border-border bg-card hover:bg-muted"><Settings className="h-4 w-4" /></Button>
            </div>
          </header>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-medium text-foreground">Kid profiles</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kids.map((k, i) => (
              <motion.div key={k.id} variants={fadeUp} initial="hidden" animate="show" transition={{ delay: i * 0.05 }} className="rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-sm hover:border-border/80 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${k.avatarColor} flex items-center justify-center text-white text-lg font-medium shadow-sm`}>{k.name[0]}</div>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-foreground">{k.name}</h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Age {k.age}</p>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-border">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sensitivities</p>
                  <div className="flex flex-wrap gap-1.5">
                    {k.sensitivities.map(s => (
                      <span key={s} className="rounded border border-border bg-muted/50 px-2 py-0.5 text-[10px] text-foreground/80">{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.button variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }} className="group rounded-2xl border border-dashed border-border bg-transparent p-5 text-left transition-all duration-300 hover:border-primary/50 hover:bg-accent/10 flex flex-col h-full justify-center items-center text-center gap-3 min-h-[160px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors"><Plus className="h-5 w-5" /></div>
              <div>
                <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">Add a kid</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-widest">Personalize picks</p>
              </div>
            </motion.button>
          </div>
        </section>

        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <section className="space-y-16">
            <div>
              <div className="mb-6 flex items-baseline justify-between">
                <div className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-primary" />
                  <h2 className="font-serif text-2xl font-medium text-foreground">Saved watchlist</h2>
                </div>
                <Link href="/browse" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary/80">View all</Link>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {watchlist.map((w, i) => {
                  const film = getFilm(w.filmId);
                  if (!film) return null;
                  return <FilmCard key={w.kidId + w.filmId} film={film} index={i} />;
                })}
              </div>
            </div>

            <div>
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h2 className="font-serif text-2xl font-medium text-foreground">Picked for your family</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {films.slice(6, 9).map((f, i) => <FilmCard key={f.id} film={f} index={i} />)}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <Link href="/assistant" className="block group">
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-foreground transition-all duration-300 hover:bg-primary/10">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-xl font-medium leading-snug mb-2 text-primary">Ask for this weekend's picks</h3>
                  <p className="text-sm text-muted-foreground mb-4">The assistant knows your kids' ages and sensitivities.</p>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                    Try it now <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
              
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-6 flex items-center gap-2 text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  <h3 className="font-serif text-lg font-medium text-foreground">Recent activity</h3>
                </div>
                <ul className="space-y-4">
                  {recentActivity.map((a, i) => (
                    <li key={i} className="group relative pl-4 border-l border-border pb-4 last:pb-0 last:border-transparent">
                      <div className="absolute w-2 h-2 bg-border rounded-full -left-[4.5px] top-1.5 group-hover:bg-primary transition-colors"></div>
                      <div className="text-sm font-medium leading-snug text-foreground mb-0.5">{a.action}</div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{a.kid} <span className="opacity-50 mx-1">•</span> {a.time}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
