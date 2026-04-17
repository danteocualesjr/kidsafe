import { useRoute, Link } from "wouter";
import { ArrowLeft, Bookmark, Share2, Gamepad2, MessageSquare, ShoppingCart, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";
import { getGame, games } from "@/data/games";
import { AgeBadge } from "@/components/AgeBadge";
import { SafetyScore } from "@/components/SafetyScore";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import NotFound from "./not-found";

const MULTI_LABEL: Record<string, string> = {
  single: "Single player",
  local: "Local co-op",
  online: "Online multiplayer",
  both: "Local & online",
};

export default function GameDetail() {
  const [, params] = useRoute("/game/:id");
  const game = params ? getGame(params.id) : undefined;
  if (!game) return <NotFound />;

  const similar = game.similarSaferIds
    .map(id => games.find(g => g.id === id))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <div className="pb-32 bg-background">
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-accent/20 via-background to-background pt-8 pb-16 md:pt-12 md:pb-20">
        <div className="container mx-auto px-6 relative z-10">
          <Link href="/browse" className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to browse
          </Link>

          <div className="grid gap-12 lg:grid-cols-[340px_1fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="overflow-hidden rounded-[2rem] border-4 border-card shadow-2xl shadow-primary/10 max-w-sm"
            >
              <img src={game.coverUrl} alt={game.title} className="w-full aspect-[3/4] object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <AgeBadge age={game.ageRecommendation} />
                {game.genres.map(g => (
                  <span key={g} className="rounded-full bg-card border border-border/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground shadow-sm">{g}</span>
                ))}
              </div>

              <h1 className="font-serif text-5xl font-bold leading-tight md:text-6xl tracking-tight">{game.title}</h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
                <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> {game.year}</span>
                <span className="inline-flex items-center gap-2"><Gamepad2 className="h-4 w-4" /> {game.developer}</span>
                <span className="inline-flex items-center gap-2"><Users className="h-4 w-4" /> {MULTI_LABEL[game.multiplayer]}</span>
              </div>

              <p className="max-w-3xl text-xl leading-relaxed text-foreground/80 font-medium pt-2">{game.description}</p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="rounded-full px-8 text-base font-bold shadow-lg shadow-primary/20"><Bookmark className="mr-2 h-5 w-5" /> Save game</Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 text-base font-bold border-2"><Share2 className="mr-2 h-5 w-5" /> Share</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto grid gap-16 px-6 pt-16 lg:grid-cols-[1fr_340px]">
        <div className="space-y-16">
          <section>
            <h2 className="mb-8 font-serif text-4xl font-bold">Safety analysis</h2>
            <SafetyScore scores={game.safetyScores} />
          </section>

          <section className="rounded-[2.5rem] border border-amber-200/50 bg-gradient-to-br from-amber-50 to-orange-50/30 p-8 md:p-12 shadow-xl shadow-amber-500/5">
            <h2 className="mb-6 font-serif text-3xl font-bold text-amber-950">What parents need to know</h2>
            <p className="text-xl leading-relaxed text-amber-900/90 font-medium">{game.whatParentsNeedToKnow}</p>
          </section>

          <section>
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="font-serif text-4xl font-bold">Parent reviews</h2>
              <span className="text-xl font-bold text-muted-foreground bg-accent/50 px-4 py-1 rounded-full">{game.parentReviews.length}</span>
            </div>
            <div className="grid gap-6">
              {game.parentReviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </section>

          {game.kidReviews.length > 0 && (
            <section>
              <div className="mb-8 flex items-baseline justify-between">
                <h2 className="font-serif text-4xl font-bold">Kid reviews</h2>
                <span className="text-xl font-bold text-muted-foreground bg-accent/50 px-4 py-1 rounded-full">{game.kidReviews.length}</span>
              </div>
              <div className="grid gap-6">
                {game.kidReviews.map(r => <ReviewCard key={r.id} review={r} />)}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-8">
          <div className="sticky top-32 space-y-6">
            <div className="rounded-[2rem] border border-border/40 bg-card p-7 shadow-xl shadow-primary/5 space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">At a glance</h3>
              <div className="space-y-3 text-sm font-medium">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    <div className="font-bold text-foreground">{game.hasChat ? "Open chat" : "No open chat"}</div>
                    <div className="text-muted-foreground text-xs mt-0.5">{game.hasChat ? "Players can message each other in-game." : "No text or voice chat with strangers."}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShoppingCart className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    <div className="font-bold text-foreground">{game.hasInAppPurchases ? "In-app purchases" : "No purchases"}</div>
                    <div className="text-muted-foreground text-xs mt-0.5">{game.hasInAppPurchases ? "Real-money currency or items inside the game." : "One-time purchase, no extras."}</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/40 pt-5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Platforms</h4>
                <div className="flex flex-wrap gap-2">
                  {game.platforms.map(p => (
                    <span key={p} className="rounded-full bg-background border border-border/50 px-3 py-1 text-xs font-bold text-foreground">{p}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/40 bg-card p-7 shadow-xl shadow-primary/5">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">Themes & Tags</h3>
              <div className="flex flex-wrap gap-2">
                {game.tags.map(t => (
                  <span key={t} className="rounded-full border border-border/50 bg-background px-3 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-default">#{t}</span>
                ))}
              </div>
            </div>

            {similar.length > 0 && (
              <div className="rounded-[2rem] border border-border/40 bg-card p-7 shadow-xl shadow-primary/5">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">Safer alternatives</h3>
                <div className="space-y-3">
                  {similar.map(s => (
                    <Link key={s.id} href={`/game/${s.id}`} className="flex items-center gap-4 rounded-2xl p-2 -m-2 hover:bg-accent/40 transition-colors group">
                      <img src={s.coverUrl} alt={s.title} className="h-16 w-12 object-cover rounded-lg shadow-md" />
                      <div className="min-w-0">
                        <div className="font-bold text-foreground truncate group-hover:text-primary transition-colors">{s.title}</div>
                        <div className="text-xs text-muted-foreground truncate">Ages {s.ageRecommendation}+</div>
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
