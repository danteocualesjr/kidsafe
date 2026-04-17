import { Link } from "wouter";
import { motion } from "framer-motion";
import { Plus, Bookmark, Sparkles, Activity, Settings, Bell, ChevronRight } from "lucide-react";
import { kids, watchlist, recentActivity } from "@/data/kids";
import { films, getFilm } from "@/data/films";
import { FilmCard } from "@/components/FilmCard";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="bg-background min-h-screen pb-32">
      <div className="bg-gradient-to-br from-accent/20 via-background to-background pt-12 pb-8 border-b border-border/40">
        <div className="container mx-auto px-6">
          <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">Your dashboard</p>
              <h1 className="font-serif text-5xl font-bold tracking-tight lg:text-6xl">Welcome back, Alex</h1>
              <p className="mt-3 text-xl text-muted-foreground font-medium">Here's what's happening across your family this week.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-2 bg-card hover:bg-accent/50"><Bell className="h-5 w-5" /></Button>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-2 bg-card hover:bg-accent/50"><Settings className="h-5 w-5" /></Button>
            </div>
          </header>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <section className="mb-20">
          <h2 className="mb-8 font-serif text-3xl font-bold">Kid profiles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {kids.map((k, i) => (
              <motion.div key={k.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, ease: [0.25, 1, 0.5, 1] }} className="rounded-[2rem] border border-border/40 bg-card p-8 transition-all hover:shadow-xl hover:shadow-primary/5">
                <div className="flex items-center gap-4">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${k.avatarColor} flex items-center justify-center text-white text-2xl font-bold shadow-sm`}>{k.name[0]}</div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold">{k.name}</h3>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Age {k.age}</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border/40">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Sensitivities</p>
                  <div className="flex flex-wrap gap-2">
                    {k.sensitivities.map(s => (
                      <span key={s} className="rounded-full bg-accent/60 px-3 py-1.5 text-xs font-bold text-accent-foreground">{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="group rounded-[2rem] border-2 border-dashed border-border/60 bg-card/40 p-8 text-left transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-lg">
              <div className="flex flex-col h-full justify-center items-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"><Plus className="h-8 w-8" /></div>
                <div>
                  <h3 className="font-serif text-xl font-bold">Add a kid</h3>
                  <p className="text-sm font-medium text-muted-foreground mt-1">Personalize their picks</p>
                </div>
              </div>
            </motion.button>
          </div>
        </section>

        <div className="grid gap-16 lg:grid-cols-[1fr_400px]">
          <section className="space-y-20">
            <div>
              <div className="mb-8 flex items-baseline justify-between">
                <div className="flex items-center gap-3">
                  <Bookmark className="h-6 w-6 text-primary" />
                  <h2 className="font-serif text-3xl font-bold">Saved watchlist</h2>
                </div>
                <Link href="/browse" className="text-sm font-bold uppercase tracking-widest text-primary hover:underline underline-offset-4">View all</Link>
              </div>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                {watchlist.map((w, i) => {
                  const film = getFilm(w.filmId);
                  if (!film) return null;
                  return <FilmCard key={w.kidId + w.filmId} film={film} index={i} />;
                })}
              </div>
            </div>

            <div>
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-3xl font-bold">Picked for your family</h2>
              </div>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                {films.slice(6, 9).map((f, i) => <FilmCard key={f.id} film={f} index={i} />)}
              </div>
            </div>
          </section>

          <aside className="space-y-8">
            <div className="sticky top-32 space-y-8">
              <Link href="/assistant" className="block group">
                <div className="rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-8 text-primary-foreground shadow-2xl shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-serif text-3xl font-bold leading-tight mb-3">Ask for this weekend's picks</h3>
                    <p className="text-base text-white/90 font-medium mb-6">The assistant knows your kids' ages and sensitivities.</p>
                    <div className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm bg-white text-primary px-5 py-2.5 rounded-full">
                      Try it now <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
              
              <div className="rounded-[2.5rem] border border-border/40 bg-card p-8 shadow-xl shadow-primary/5">
                <div className="mb-8 flex items-center gap-3">
                  <Activity className="h-6 w-6 text-muted-foreground" />
                  <h3 className="font-serif text-2xl font-bold">Recent activity</h3>
                </div>
                <ul className="space-y-6">
                  {recentActivity.map((a, i) => (
                    <li key={i} className="group relative pl-6 border-l-2 border-border/60 pb-6 last:pb-0 last:border-transparent">
                      <div className="absolute w-3 h-3 bg-muted rounded-full -left-[7px] top-1 group-hover:bg-primary transition-colors"></div>
                      <div className="text-base font-bold leading-snug mb-1">{a.action}</div>
                      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{a.kid} <span className="mx-1">•</span> {a.time}</div>
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
