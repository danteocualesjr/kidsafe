import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Bookmark, ArrowLeft, BookOpen, Share2 } from "lucide-react";
import { getBook, books } from "@/data/books";
import { AgeBadge } from "@/components/AgeBadge";
import { SafetyScore } from "@/components/SafetyScore";
import { ReviewCard } from "@/components/ReviewCard";
import { PosterPlaceholder } from "@/components/PosterPlaceholder";
import { Button } from "@/components/ui/button";
import NotFound from "./not-found";

export default function BookDetail() {
  const [, params] = useRoute("/book/:id");
  const book = params ? getBook(params.id) : undefined;
  if (!book) return <NotFound />;
  const seed = books.findIndex(b => b.id === book.id);
  const similar = book.similarSaferIds.map(id => books.find(b => b.id === id)).filter(Boolean) as typeof books;

  return (
    <div className="pb-32 bg-background">
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-secondary/20 via-background to-background pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05] mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <Link href="/browse" className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to browse
          </Link>
          <div className="grid gap-12 md:grid-cols-[280px_1fr] md:items-start lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}>
              <div className="overflow-hidden rounded-r-2xl rounded-l-md border-4 border-card shadow-2xl shadow-secondary/15 relative group">
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/20 to-transparent z-10 mix-blend-overlay border-r border-black/10"></div>
                <PosterPlaceholder title={book.title} seed={seed} aspect="2/3" className="w-full h-full" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }} className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <AgeBadge age={book.ageRecommendation} />
                {book.genres.map(g => (
                  <span key={g} className="rounded-full bg-card border border-border/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground shadow-sm">{g}</span>
                ))}
              </div>
              <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight lg:text-7xl">{book.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-base font-medium text-muted-foreground">
                <span className="bg-accent/50 px-3 py-1 rounded-md text-foreground font-bold">By {book.author}</span>
                <span className="inline-flex items-center gap-2"><BookOpen className="h-5 w-5" /> {book.pages} pages</span>
                <span>{book.year}</span>
              </div>
              <p className="max-w-3xl text-xl leading-relaxed text-foreground/80 font-medium">{book.plotSummary}</p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="rounded-full px-8 text-base font-bold shadow-lg shadow-primary/20"><Bookmark className="mr-2 h-5 w-5" /> Save to reading list</Button>
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
            <SafetyScore scores={book.safetyScores} />
          </section>

          <section className="rounded-[2.5rem] border border-amber-200/50 bg-gradient-to-br from-amber-50 to-orange-50/30 p-8 md:p-12 shadow-xl shadow-amber-500/5 relative overflow-hidden">
            <h2 className="mb-6 font-serif text-3xl font-bold text-amber-950 relative z-10">What parents need to know</h2>
            <p className="text-xl leading-relaxed text-amber-900/90 font-medium relative z-10">{book.whatParentsNeedToKnow}</p>
          </section>

          <section>
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="font-serif text-4xl font-bold">Parent reviews</h2>
              <span className="text-xl font-bold text-muted-foreground bg-accent/50 px-4 py-1 rounded-full">{book.parentReviews.length}</span>
            </div>
            <div className="grid gap-6">
              {book.parentReviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </section>

          {book.kidReviews.length > 0 && (
            <section>
              <div className="mb-8 flex items-baseline justify-between">
                <h2 className="font-serif text-4xl font-bold">Kid reviews</h2>
                <span className="text-xl font-bold text-muted-foreground bg-accent/50 px-4 py-1 rounded-full">{book.kidReviews.length}</span>
              </div>
              <div className="grid gap-6">
                {book.kidReviews.map(r => <ReviewCard key={r.id} review={r} />)}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-8">
          <div className="sticky top-32 space-y-8">
            <div className="rounded-[2rem] border border-border/40 bg-card p-8 shadow-xl shadow-primary/5">
              <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-muted-foreground">Themes & Tags</h3>
              <div className="flex flex-wrap gap-2.5">
                {book.tags.map(t => (
                  <span key={t} className="rounded-full border border-border/50 bg-background px-4 py-2 text-sm font-bold text-muted-foreground shadow-sm hover:text-foreground hover:border-primary/50 transition-colors cursor-default">#{t}</span>
                ))}
              </div>
            </div>

            {similar.length > 0 && (
              <div className="rounded-[2.5rem] border border-secondary/30 bg-gradient-to-br from-secondary/5 via-card to-card p-8 shadow-2xl shadow-secondary/5">
                <h3 className="mb-6 font-serif text-2xl font-bold text-foreground">Similar gentle reads</h3>
                <div className="space-y-4">
                  {similar.map((b) => (
                    <Link key={b.id} href={`/book/${b.id}`} className="group flex items-center gap-4 rounded-2xl border border-border/40 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary/10 hover:border-secondary/30">
                      <div className="min-w-0 flex-1">
                        <div className="font-serif text-lg font-bold leading-tight line-clamp-1 group-hover:text-secondary-foreground transition-colors">{b.title}</div>
                        <div className="text-sm font-medium text-muted-foreground mt-1.5">{b.author} <span className="opacity-50 mx-1">•</span> Age {b.ageRecommendation}+</div>
                      </div>
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
