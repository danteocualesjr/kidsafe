import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Bookmark, ArrowLeft, BookOpen, Share2, ShieldCheck, ChevronRight } from "lucide-react";
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
    <div className="pb-24 md:pb-32 bg-background">
      <section className="border-b border-border bg-accent/10 pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="container mx-auto px-6">
          <Link href="/browse" className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to browse
          </Link>
          <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-start lg:gap-12 xl:grid-cols-[280px_1fr]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="overflow-hidden rounded-r-xl rounded-l-sm border border-border shadow-md relative group max-w-[220px] md:max-w-none mx-auto">
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/10 to-transparent z-10 mix-blend-overlay border-r border-black/5"></div>
                <PosterPlaceholder title={book.title} seed={seed} aspect="2/3" className="w-full" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <AgeBadge age={book.ageRecommendation} />
                {book.genres.map(g => (
                  <span key={g} className="rounded-full bg-background border border-border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{g}</span>
                ))}
              </div>
              <h1 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight lg:text-6xl">{book.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
                <span className="text-foreground font-semibold">By {book.author}</span>
                <span className="inline-flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {book.pages} pages</span>
                <span>{book.year}</span>
              </div>
              <p className="max-w-2xl text-base md:text-lg leading-relaxed text-foreground/80">{book.plotSummary}</p>
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
            <SafetyScore scores={book.safetyScores} />
          </section>

          <section className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-amber-600" />
              <h2 className="font-serif text-2xl font-medium text-amber-900">What parents need to know</h2>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-amber-800/90">{book.whatParentsNeedToKnow}</p>
          </section>

          <section>
            <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
              <h2 className="font-serif text-2xl font-medium">Parent reviews</h2>
              <span className="text-sm font-medium text-muted-foreground">{book.parentReviews.length} reviews</span>
            </div>
            <div className="grid gap-4">
              {book.parentReviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </section>

          {book.kidReviews.length > 0 && (
            <section>
              <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                <h2 className="font-serif text-2xl font-medium">Kid reviews</h2>
                <span className="text-sm font-medium text-muted-foreground">{book.kidReviews.length} reviews</span>
              </div>
              <div className="grid gap-4">
                {book.kidReviews.map(r => <ReviewCard key={r.id} review={r} />)}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Themes</h3>
              <div className="flex flex-wrap gap-2">
                {book.tags.map(t => (
                  <span key={t} className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground">#{t}</span>
                ))}
              </div>
            </div>

            {similar.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Similar gentle reads</h3>
                <div className="space-y-3">
                  {similar.map((b) => (
                    <Link key={b.id} href={`/book/${b.id}`} className="group flex items-center justify-between rounded-lg p-2 -mx-2 hover:bg-muted transition-colors">
                      <div className="min-w-0 flex-1 pr-4">
                        <div className="font-serif text-base font-medium leading-tight truncate group-hover:text-primary transition-colors">{b.title}</div>
                        <div className="text-xs text-muted-foreground mt-1 truncate">{b.author} <span className="opacity-50 mx-1">•</span> Age {b.ageRecommendation}+</div>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
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
