import { useRoute, Link } from "wouter";
import { ArrowLeft, Bookmark, Share2, Gamepad2, MessageSquare, ShoppingCart, Calendar, Users, ShieldCheck, ChevronRight } from "lucide-react";
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
    <div className="pb-24 md:pb-32 bg-background">
      <section className="border-b border-border bg-accent/10 pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="container mx-auto px-6">
          <Link href="/browse" className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to browse
          </Link>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start xl:gap-12 xl:grid-cols-[320px_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-xl border border-border shadow-md max-w-[280px] lg:max-w-none mx-auto lg:mx-0"
            >
              <img src={game.coverUrl} alt={game.title} className="w-full aspect-[3/4] object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <AgeBadge age={game.ageRecommendation} />
                {game.genres.map(g => (
                  <span key={g} className="rounded-full bg-background border border-border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{g}</span>
                ))}
              </div>

              <h1 className="font-serif text-4xl font-medium leading-[1.1] md:text-6xl tracking-tight">{game.title}</h1>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {game.year}</span>
                <span className="inline-flex items-center gap-1.5"><Gamepad2 className="h-4 w-4" /> {game.developer}</span>
                <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> {MULTI_LABEL[game.multiplayer]}</span>
              </div>

              <p className="max-w-2xl text-base md:text-lg leading-relaxed text-foreground/80">{game.description}</p>

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
            <SafetyScore scores={game.safetyScores} />
          </section>

          <section className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-amber-600" />
              <h2 className="font-serif text-2xl font-medium text-amber-900">What parents need to know</h2>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-amber-800/90">{game.whatParentsNeedToKnow}</p>
          </section>

          <section>
            <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
              <h2 className="font-serif text-2xl font-medium">Parent reviews</h2>
              <span className="text-sm font-medium text-muted-foreground">{game.parentReviews.length} reviews</span>
            </div>
            <div className="grid gap-4">
              {game.parentReviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </section>

          {game.kidReviews.length > 0 && (
            <section>
              <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                <h2 className="font-serif text-2xl font-medium">Kid reviews</h2>
                <span className="text-sm font-medium text-muted-foreground">{game.kidReviews.length} reviews</span>
              </div>
              <div className="grid gap-4">
                {game.kidReviews.map(r => <ReviewCard key={r.id} review={r} />)}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-xl border border-border bg-card p-5 space-y-5">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">At a glance</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">{game.hasChat ? "Open chat" : "No open chat"}</div>
                    <div className="text-muted-foreground text-xs mt-1">{game.hasChat ? "Players can message each other." : "No text or voice chat with strangers."}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShoppingCart className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">{game.hasInAppPurchases ? "In-app purchases" : "No purchases"}</div>
                    <div className="text-muted-foreground text-xs mt-1">{game.hasInAppPurchases ? "Real-money items inside the game." : "One-time purchase, no extras."}</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Platforms</h4>
                <div className="flex flex-wrap gap-1.5">
                  {game.platforms.map(p => (
                    <span key={p} className="rounded border border-border bg-muted/30 px-2 py-1 text-xs text-foreground">{p}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Themes</h3>
              <div className="flex flex-wrap gap-2">
                {game.tags.map(t => (
                  <span key={t} className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground">#{t}</span>
                ))}
              </div>
            </div>

            {similar.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Safer alternatives</h3>
                <div className="space-y-3">
                  {similar.map(s => (
                    <Link key={s.id} href={`/game/${s.id}`} className="group flex items-center gap-3 rounded-lg p-2 -mx-2 hover:bg-muted transition-colors">
                      <img src={s.coverUrl} alt={s.title} className="h-16 w-12 object-cover rounded border border-border/50" />
                      <div className="min-w-0 flex-1">
                        <div className="font-serif text-base font-medium truncate group-hover:text-primary transition-colors">{s.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Ages {s.ageRecommendation}+</div>
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
