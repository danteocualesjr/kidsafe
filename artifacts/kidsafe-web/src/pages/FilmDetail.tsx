import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Bookmark, Share2, Clock, Calendar, ArrowLeft, ChevronRight, PlayCircle, ShieldCheck } from "lucide-react";
import { getFilm, films } from "@/data/films";
import { AgeBadge } from "@/components/AgeBadge";
import { SafetyScore } from "@/components/SafetyScore";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import NotFound from "./not-found";

export default function FilmDetail() {
  const [, params] = useRoute("/film/:id");
  const film = params ? getFilm(params.id) : undefined;
  if (!film) return <NotFound />;

  const similar = film.similarSaferIds.map(id => films.find(f => f.id === id)).filter(Boolean) as typeof films;

  return (
    <div className="pb-32 bg-background">
      {/* Hero with poster + meta */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-accent/40 via-background to-background pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <Link href="/browse" className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to browse
          </Link>
          <div className="grid gap-12 md:grid-cols-[320px_1fr] md:items-start lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}>
              <div className="aspect-[2/3] overflow-hidden rounded-3xl border-4 border-card shadow-2xl shadow-primary/15 relative group">
                <img src={film.posterUrl} alt={film.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-md rounded-full p-4 text-white shadow-lg">
                    <PlayCircle className="h-10 w-10" />
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }} className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <AgeBadge age={film.ageRecommendation} />
                {film.genres.map(g => (
                  <span key={g} className="rounded-full bg-card border border-border/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground shadow-sm">{g}</span>
                ))}
              </div>
              <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight lg:text-7xl">{film.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-base font-medium text-muted-foreground">
                <span className="inline-flex items-center gap-2"><Calendar className="h-5 w-5" /> {film.year}</span>
                <span className="inline-flex items-center gap-2"><Clock className="h-5 w-5" /> {film.runtime}</span>
                <span className="bg-accent/50 px-3 py-1 rounded-md text-foreground">Directed by {film.director}</span>
              </div>
              <p className="max-w-3xl text-xl leading-relaxed text-foreground/80 font-medium">{film.plotSummary}</p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="rounded-full px-8 text-base font-bold shadow-lg shadow-primary/20"><Bookmark className="mr-2 h-5 w-5" /> Save to watchlist</Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 text-base font-bold border-2"><Share2 className="mr-2 h-5 w-5" /> Share</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto grid gap-16 px-6 pt-16 lg:grid-cols-[1fr_400px]">
        <div className="space-y-16">
          <section>
            <h2 className="mb-8 font-serif text-4xl font-bold">Safety analysis</h2>
            <SafetyScore scores={film.safetyScores} />
          </section>

          <section className="rounded-[2.5rem] border border-amber-200/50 bg-gradient-to-br from-amber-50 to-orange-50/30 p-8 md:p-12 shadow-xl shadow-amber-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck className="h-32 w-32 text-amber-500" />
            </div>
            <h2 className="mb-6 font-serif text-3xl font-bold text-amber-950 relative z-10">What parents need to know</h2>
            <p className="text-xl leading-relaxed text-amber-900/90 font-medium relative z-10">{film.whatParentsNeedToKnow}</p>
          </section>

          <section>
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="font-serif text-4xl font-bold">Parent reviews</h2>
              <span className="text-xl font-bold text-muted-foreground bg-accent/50 px-4 py-1 rounded-full">{film.parentReviews.length}</span>
            </div>
            <div className="grid gap-6">
              {film.parentReviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </section>

          {film.kidReviews.length > 0 && (
            <section>
              <div className="mb-8 flex items-baseline justify-between">
                <h2 className="font-serif text-4xl font-bold">Kid reviews</h2>
                <span className="text-xl font-bold text-muted-foreground bg-accent/50 px-4 py-1 rounded-full">{film.kidReviews.length}</span>
              </div>
              <div className="grid gap-6">
                {film.kidReviews.map(r => <ReviewCard key={r.id} review={r} />)}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-8">
          <div className="sticky top-32 space-y-8">
            <div className="rounded-[2rem] border border-border/40 bg-card p-8 shadow-xl shadow-primary/5">
              <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-muted-foreground">Themes & Tags</h3>
              <div className="flex flex-wrap gap-2.5">
                {film.tags.map(t => (
                  <span key={t} className="rounded-full border border-border/50 bg-background px-4 py-2 text-sm font-bold text-muted-foreground shadow-sm hover:text-foreground hover:border-primary/50 transition-colors cursor-default">#{t}</span>
                ))}
              </div>
            </div>
            
            <div className="rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card p-8 shadow-2xl shadow-primary/5">
              <h3 className="mb-6 font-serif text-2xl font-bold text-foreground">Safer alternatives</h3>
              <div className="space-y-4">
                {similar.map(s => (
                  <Link key={s.id} href={`/film/${s.id}`} className="group flex items-center gap-4 rounded-2xl border border-border/40 bg-card p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
                    <img src={s.posterUrl} alt={s.title} className="h-20 w-14 rounded-xl object-cover shadow-sm" />
                    <div className="min-w-0 flex-1">
                      <div className="font-serif text-lg font-bold leading-tight line-clamp-1 group-hover:text-primary transition-colors">{s.title}</div>
                      <div className="text-sm font-medium text-muted-foreground mt-1">Age {s.ageRecommendation}+ <span className="opacity-50 mx-1">•</span> {s.runtime}</div>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/50 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors mr-1">
                      <ChevronRight className="h-4 w-4 shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6 rounded-xl border-2 font-bold h-12">View more alternatives</Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
