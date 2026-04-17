import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Bookmark, Share2, Clock, Calendar, ArrowLeft, ChevronRight, ShieldCheck, PlayCircle } from "lucide-react";
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
    <div className="pb-24 md:pb-32 bg-background">
      <section className="border-b border-border bg-accent/10 pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="container mx-auto px-6">
          <Link href="/browse" className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to browse
          </Link>
          <div className="grid gap-8 md:grid-cols-[240px_1fr] md:items-start lg:gap-12 xl:grid-cols-[300px_1fr]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="aspect-[2/3] overflow-hidden rounded-xl border border-border shadow-md relative group max-w-[240px] md:max-w-none mx-auto">
                <img src={film.posterUrl} alt={film.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-md rounded-full p-3 text-white">
                    <PlayCircle className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <AgeBadge age={film.ageRecommendation} />
                {film.genres.map(g => (
                  <span key={g} className="rounded-full bg-background border border-border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{g}</span>
                ))}
              </div>
              <h1 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight lg:text-6xl">{film.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {film.year}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {film.runtime}</span>
                <span className="bg-muted px-2 py-0.5 rounded text-foreground text-xs">Directed by {film.director}</span>
              </div>
              <p className="max-w-2xl text-base md:text-lg leading-relaxed text-foreground/80">{film.plotSummary}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button className="rounded-full px-6"><Bookmark className="mr-2 h-4 w-4" /> Save</Button>
                <Button variant="outline" className="rounded-full px-6"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto grid gap-12 px-6 pt-12 lg:grid-cols-[1fr_340px]">
        <div className="space-y-12">
          <section>
            <h2 className="mb-6 font-serif text-3xl font-medium">Safety analysis</h2>
            <SafetyScore scores={film.safetyScores} />
          </section>

          <section className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-amber-600" />
              <h2 className="font-serif text-2xl font-medium text-amber-900">What parents need to know</h2>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-amber-800/90">{film.whatParentsNeedToKnow}</p>
          </section>

          <section>
            <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
              <h2 className="font-serif text-2xl font-medium">Parent reviews</h2>
              <span className="text-sm font-medium text-muted-foreground">{film.parentReviews.length} reviews</span>
            </div>
            <div className="grid gap-4">
              {film.parentReviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </section>

          {film.kidReviews.length > 0 && (
            <section>
              <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                <h2 className="font-serif text-2xl font-medium">Kid reviews</h2>
                <span className="text-sm font-medium text-muted-foreground">{film.kidReviews.length} reviews</span>
              </div>
              <div className="grid gap-4">
                {film.kidReviews.map(r => <ReviewCard key={r.id} review={r} />)}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Themes</h3>
              <div className="flex flex-wrap gap-2">
                {film.tags.map(t => (
                  <span key={t} className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground">#{t}</span>
                ))}
              </div>
            </div>
            
            {similar.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Safer alternatives</h3>
                <div className="space-y-3">
                  {similar.map(s => (
                    <Link key={s.id} href={`/film/${s.id}`} className="group flex items-center gap-3 rounded-lg p-2 -mx-2 hover:bg-muted transition-colors">
                      <img src={s.posterUrl} alt={s.title} className="h-16 w-12 rounded bg-muted object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="font-serif text-base font-medium leading-tight truncate group-hover:text-primary transition-colors">{s.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">Age {s.ageRecommendation}+ <span className="opacity-50 mx-1">•</span> {s.runtime}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
