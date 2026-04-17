import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Bookmark, Share2, Clock, Calendar, ArrowLeft, ChevronRight } from "lucide-react";
import { getFilm, films } from "@/data/films";
import { AgeBadge } from "@/components/AgeBadge";
import { SafetyScore } from "@/components/SafetyScore";
import { ReviewCard } from "@/components/ReviewCard";
import { FilmCard } from "@/components/FilmCard";
import { Button } from "@/components/ui/button";
import NotFound from "./not-found";

export default function FilmDetail() {
  const [, params] = useRoute("/film/:id");
  const film = params ? getFilm(params.id) : undefined;
  if (!film) return <NotFound />;

  const similar = film.similarSaferIds.map(id => films.find(f => f.id === id)).filter(Boolean) as typeof films;

  return (
    <div className="pb-24">
      {/* Hero with poster + meta */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-accent/30 via-background to-background">
        <div className="container mx-auto px-4 pt-8 pb-12">
          <Link href="/browse" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to browse
          </Link>
          <div className="grid gap-10 md:grid-cols-[280px_1fr] md:items-start lg:gap-12">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="aspect-[2/3] overflow-hidden rounded-2xl border shadow-2xl shadow-primary/10">
                <img src={film.posterUrl} alt={film.title} className="h-full w-full object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <AgeBadge age={film.ageRecommendation} />
                {film.genres.map(g => (
                  <span key={g} className="rounded-full bg-card border px-3 py-1 text-xs font-medium text-muted-foreground">{g}</span>
                ))}
              </div>
              <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl">{film.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {film.year}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {film.runtime}</span>
                <span>Directed by {film.director}</span>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-foreground/80">{film.plotSummary}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button className="rounded-full"><Bookmark className="mr-2 h-4 w-4" /> Save to watchlist</Button>
                <Button variant="outline" className="rounded-full"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto grid gap-10 px-4 pt-12 lg:grid-cols-[1fr_360px]">
        <div className="space-y-12">
          <section>
            <h2 className="mb-5 font-serif text-2xl font-bold">Safety analysis</h2>
            <SafetyScore scores={film.safetyScores} />
          </section>

          <section className="rounded-2xl border bg-gradient-to-br from-amber-50 to-card p-6">
            <h2 className="mb-3 font-serif text-2xl font-bold">What parents need to know</h2>
            <p className="text-base leading-relaxed text-foreground/85">{film.whatParentsNeedToKnow}</p>
          </section>

          <section>
            <h2 className="mb-5 font-serif text-2xl font-bold">Parent reviews <span className="text-base font-normal text-muted-foreground">({film.parentReviews.length})</span></h2>
            <div className="grid gap-4 md:grid-cols-2">
              {film.parentReviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </section>

          <section>
            <h2 className="mb-5 font-serif text-2xl font-bold">Kid reviews <span className="text-base font-normal text-muted-foreground">({film.kidReviews.length})</span></h2>
            <div className="grid gap-4 md:grid-cols-2">
              {film.kidReviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {film.tags.map(t => (
                  <span key={t} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">#{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border bg-gradient-to-br from-secondary/15 via-card to-card p-5">
              <h3 className="mb-3 font-serif text-lg font-bold">Safer alternatives</h3>
              <div className="space-y-3">
                {similar.map(s => (
                  <Link key={s.id} href={`/film/${s.id}`} className="group flex items-center gap-3 rounded-xl border bg-card p-2.5 transition-all hover-elevate">
                    <img src={s.posterUrl} alt={s.title} className="h-16 w-12 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="font-serif text-sm font-bold leading-tight line-clamp-1">{s.title}</div>
                      <div className="text-xs text-muted-foreground">Age {s.ageRecommendation}+ · {s.runtime}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
