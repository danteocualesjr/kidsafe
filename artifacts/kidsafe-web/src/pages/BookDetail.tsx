import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Bookmark, ArrowLeft } from "lucide-react";
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
    <div className="pb-24">
      <section className="border-b bg-gradient-to-br from-accent/30 via-background to-background">
        <div className="container mx-auto px-4 pt-8 pb-12">
          <Link href="/browse" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to browse
          </Link>
          <div className="grid gap-10 md:grid-cols-[240px_1fr] md:items-start">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <PosterPlaceholder title={book.title} seed={seed} aspect="2/3" className="shadow-2xl shadow-primary/10" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <AgeBadge age={book.ageRecommendation} />
                {book.genres.map(g => (
                  <span key={g} className="rounded-full bg-card border px-3 py-1 text-xs font-medium text-muted-foreground">{g}</span>
                ))}
              </div>
              <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl">{book.title}</h1>
              <div className="text-sm text-muted-foreground">By {book.author} · {book.pages} pages · {book.year}</div>
              <p className="max-w-2xl text-base leading-relaxed text-foreground/80">{book.plotSummary}</p>
              <Button className="rounded-full"><Bookmark className="mr-2 h-4 w-4" /> Save to reading list</Button>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto grid gap-10 px-4 pt-12 lg:grid-cols-[1fr_360px]">
        <div className="space-y-12">
          <SafetyScore scores={book.safetyScores} />
          <section className="rounded-2xl border bg-gradient-to-br from-amber-50 to-card p-6">
            <h2 className="mb-3 font-serif text-2xl font-bold">What parents need to know</h2>
            <p className="text-base leading-relaxed">{book.whatParentsNeedToKnow}</p>
          </section>
          <section>
            <h2 className="mb-5 font-serif text-2xl font-bold">Parent reviews</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {book.parentReviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </section>
          {book.kidReviews.length > 0 && (
            <section>
              <h2 className="mb-5 font-serif text-2xl font-bold">Kid reviews</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {book.kidReviews.map(r => <ReviewCard key={r.id} review={r} />)}
              </div>
            </section>
          )}
        </div>
        <aside className="space-y-6">
          <div className="sticky top-24 rounded-2xl border bg-gradient-to-br from-secondary/15 via-card to-card p-5">
            <h3 className="mb-3 font-serif text-lg font-bold">Similar gentle reads</h3>
            <div className="space-y-3">
              {similar.map((b, i) => (
                <Link key={b.id} href={`/book/${b.id}`} className="block rounded-xl border bg-card p-3 transition-all hover-elevate">
                  <div className="font-serif text-sm font-bold line-clamp-1">{b.title}</div>
                  <div className="text-xs text-muted-foreground">{b.author} · Age {b.ageRecommendation}+</div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
