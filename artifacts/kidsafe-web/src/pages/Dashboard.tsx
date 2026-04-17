import { Link } from "wouter";
import { motion } from "framer-motion";
import { Plus, Bookmark, Sparkles, Activity, Settings, Bell } from "lucide-react";
import { kids, watchlist, recentActivity } from "@/data/kids";
import { films, getFilm } from "@/data/films";
import { FilmCard } from "@/components/FilmCard";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-12 pb-24">
      <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">Your dashboard</p>
          <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">Welcome back, Alex</h1>
          <p className="mt-2 text-base text-muted-foreground">Here's what's happening across your family this week.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="rounded-full"><Bell className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon" className="rounded-full"><Settings className="h-4 w-4" /></Button>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="mb-4 font-serif text-2xl font-bold">Kid profiles</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kids.map((k, i) => (
            <motion.div key={k.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${k.avatarColor} flex items-center justify-center text-white text-xl font-bold`}>{k.name[0]}</div>
                <div>
                  <h3 className="font-serif text-lg font-bold">{k.name}</h3>
                  <p className="text-xs text-muted-foreground">Age {k.age}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Sensitivities</p>
                <div className="flex flex-wrap gap-1.5">
                  {k.sensitivities.map(s => (
                    <span key={s} className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border-2 border-dashed bg-card/40 p-5 text-left transition-all hover:border-primary hover:bg-card">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary"><Plus className="h-6 w-6" /></div>
              <div>
                <h3 className="font-serif text-lg font-bold">Add a kid</h3>
                <p className="text-xs text-muted-foreground">Personalize their picks</p>
              </div>
            </div>
          </motion.button>
        </div>
      </section>

      <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold">Saved watchlist</h2>
            <Bookmark className="h-5 w-5 text-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
            {watchlist.map((w, i) => {
              const film = getFilm(w.filmId);
              if (!film) return null;
              return <FilmCard key={w.kidId + w.filmId} film={film} index={i} />;
            })}
          </div>

          <div className="mt-12">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="font-serif text-2xl font-bold">Picked for your family</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {films.slice(6, 10).map((f, i) => <FilmCard key={f.id} film={f} index={i} />)}
            </div>
          </div>
        </section>

        <aside>
          <div className="sticky top-24 space-y-6">
            <div className="rounded-2xl border bg-card p-5">
              <div className="mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <h3 className="font-serif text-lg font-bold">Recent activity</h3>
              </div>
              <ul className="space-y-3">
                {recentActivity.map((a, i) => (
                  <li key={i} className="border-b last:border-0 pb-3 last:pb-0">
                    <div className="text-sm font-medium leading-snug">{a.action}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{a.kid} · {a.time}</div>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/assistant">
              <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-card p-5 transition-all hover-elevate cursor-pointer">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                  <Sparkles className="h-3 w-3" /> Try this
                </div>
                <h3 className="font-serif text-lg font-bold leading-tight">Ask the assistant for this weekend's picks</h3>
                <p className="mt-2 text-sm text-muted-foreground">It knows your kids' ages and sensitivities.</p>
              </div>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
