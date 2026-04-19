import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import {
  Bookmark,
  Share2,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Heart,
  Gamepad2,
  MessageSquare,
  ShoppingCart,
  Users,
  Calendar,
} from "lucide-react";
import { getGame, games } from "@/data/games";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import NotFound from "./not-found";

const MULTI_LABEL: Record<string, string> = {
  single: "Single player",
  local: "Local co-op",
  online: "Online multiplayer",
  both: "Local & online",
};

const SAFETY_LABELS: Record<string, { label: string; note: string }> = {
  violence: { label: "Combat & Violence", note: "Conflict style ranges from playful to cartoon combat." },
  language: { label: "In-Game Language", note: "Refers to text/voice from the game itself, not chat." },
  sexualContent: { label: "Romance & Intimacy", note: "Age-appropriate character interactions only." },
  scariness: { label: "Fear / Tension", note: "Includes jumpscares, monsters, or high-stakes moments." },
  substanceUse: { label: "Substance Use", note: "References to alcohol, smoking, or drug use." },
  consumerism: { label: "Purchases & Ads", note: "Loot boxes, micro-transactions, and promotional content." },
  positiveMessages: { label: "Positive Messages", note: "Encourages teamwork, problem-solving, or curiosity." },
  roleModels: { label: "Role Models", note: "Characters worth admiring or modelling behaviour after." },
};

const POSITIVE = new Set(["positiveMessages", "roleModels"]);

function isHighConcern(key: string, value: number) {
  if (POSITIVE.has(key)) return value <= 2;
  return value >= 4;
}
function isModerate(value: number) {
  return value === 3;
}

export default function GameDetail() {
  const [, params] = useRoute("/game/:id");
  const game = params ? getGame(params.id) : undefined;
  if (!game) return <NotFound />;

  const similar = game.similarSaferIds
    .map((id) => games.find((g) => g.id === id))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  const scoreEntries = Object.entries(game.safetyScores) as [string, number][];
  const left = scoreEntries.slice(0, 4);
  const right = scoreEntries.slice(4);

  return (
    <div className="bg-background pb-24 md:pb-32">
      {/* Cinematic image hero */}
      <header className="relative flex min-h-[560px] w-full items-end overflow-hidden px-6 pb-16 pt-24 md:min-h-[640px] md:px-12 md:pb-20 md:pt-28 lg:px-20">
        <div className="absolute inset-0 z-0">
          <img src={game.coverUrl} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] as const }}
          className="relative z-10 max-w-3xl"
        >
          <Link
            href="/browse"
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3 w-3" /> Back to browse
          </Link>

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-4 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-secondary-foreground">
              <ShieldCheck className="h-3 w-3" /> KidSafe Certified
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" /> {game.year}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
              <Gamepad2 className="h-3.5 w-3.5" /> {game.developer}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
              <Users className="h-3.5 w-3.5" /> {MULTI_LABEL[game.multiplayer]}
            </span>
          </div>

          <h1 className="mb-6 font-serif text-5xl font-extrabold leading-[0.95] tracking-tight text-primary md:text-7xl lg:text-[5.5rem]">
            {game.title}
          </h1>

          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="rounded-3xl bg-gradient-to-r from-primary to-primary/80 px-7 py-6 text-sm font-bold shadow-lg shadow-primary/20"
            >
              <Gamepad2 className="mr-2 h-4 w-4" /> View Trailer
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-3xl border-border bg-card px-7 py-6 text-sm font-bold"
            >
              <Bookmark className="mr-2 h-4 w-4" /> Add to Library
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="rounded-3xl px-7 py-6 text-sm font-bold"
            >
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </motion.div>
      </header>

      <main className="relative z-10 -mt-10 px-4 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-border/60 bg-card p-7 shadow-sm md:p-9"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/40 text-accent-foreground">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-extrabold tracking-tight text-primary">
                  KidSafe AI Quick Summary
                </h2>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {game.description}
              </p>
            </motion.section>

            <section className="rounded-3xl bg-muted/40 p-7 md:p-9">
              <h2 className="mb-7 font-serif text-3xl font-extrabold tracking-tight text-primary">
                Safety Deep Dive
              </h2>
              <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
                {[left, right].map((col, ci) => (
                  <div key={ci} className="space-y-6">
                    {col.map(([key, value]) => {
                      const meta = SAFETY_LABELS[key];
                      const pct = (value / 5) * 100;
                      const tone = isHighConcern(key, value)
                        ? "destructive"
                        : isModerate(value)
                        ? "accent"
                        : "secondary";
                      return (
                        <div key={key}>
                          <div className="mb-2 flex justify-between">
                            <span className="text-sm font-bold text-foreground">
                              {meta?.label ?? key}
                            </span>
                            <span className="text-sm text-muted-foreground">{value}/5</span>
                          </div>
                          <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                            <div
                              className={`h-full rounded-full ${
                                tone === "destructive"
                                  ? "bg-destructive"
                                  : tone === "accent"
                                  ? "bg-accent"
                                  : "bg-secondary"
                              }`}
                              style={{ width: `${Math.max(pct, 4)}%` }}
                            />
                          </div>
                          {meta?.note && (
                            <p className="mt-2 text-xs text-muted-foreground">{meta.note}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Online safety triad */}
              <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
                <div
                  className={`rounded-2xl border p-4 ${
                    game.hasChat
                      ? "border-destructive/30 bg-destructive/10"
                      : "border-secondary/30 bg-secondary/10"
                  }`}
                >
                  <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]">
                    <MessageSquare className="h-3.5 w-3.5" /> Chat
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {game.hasChat ? "Open chat present" : "No open chat"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {game.hasChat
                      ? "Players can message each other directly."
                      : "No text or voice chat with strangers."}
                  </p>
                </div>
                <div
                  className={`rounded-2xl border p-4 ${
                    game.hasInAppPurchases
                      ? "border-accent/40 bg-accent/20"
                      : "border-secondary/30 bg-secondary/10"
                  }`}
                >
                  <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]">
                    <ShoppingCart className="h-3.5 w-3.5" /> Purchases
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {game.hasInAppPurchases ? "In-app purchases" : "No purchases"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {game.hasInAppPurchases
                      ? "Real-money items inside the game."
                      : "One-time purchase, no extras."}
                  </p>
                </div>
                <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-4">
                  <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]">
                    <Users className="h-3.5 w-3.5" /> Multiplayer
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {MULTI_LABEL[game.multiplayer]}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {game.multiplayer === "single"
                      ? "Solo play only."
                      : "Consider account-level controls for online sessions."}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-accent/40 bg-accent/20 p-7 md:p-9">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-accent-foreground" />
                <h2 className="font-serif text-2xl font-extrabold text-accent-foreground">
                  What parents need to know
                </h2>
              </div>
              <p className="text-base leading-relaxed text-accent-foreground/85 md:text-lg">
                {game.whatParentsNeedToKnow}
              </p>
            </section>

            <section className="space-y-5">
              <div className="flex items-end justify-between">
                <h2 className="font-serif text-3xl font-extrabold tracking-tight text-primary">
                  Community Voice
                </h2>
                <button className="text-sm font-bold text-secondary hover:underline">
                  Read all {game.parentReviews.length + game.kidReviews.length} reviews
                </button>
              </div>

              {game.parentReviews[0] && (
                <div className="rounded-3xl border-l-4 border-accent bg-card p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/15 text-secondary font-bold">
                      {game.parentReviews[0].author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-primary">{game.parentReviews[0].author}</p>
                      <p className="text-xs text-muted-foreground">Parent reviewer</p>
                    </div>
                    <div className="ml-auto rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
                      Top Pick
                    </div>
                  </div>
                  <p className="italic leading-relaxed text-muted-foreground">
                    "{game.parentReviews[0].text}"
                  </p>
                </div>
              )}

              <div className="grid gap-4">
                {game.parentReviews.slice(1).map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>

              {game.kidReviews.length > 0 && (
                <div className="mt-8">
                  <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-extrabold text-primary">
                    <Heart className="h-4 w-4 text-secondary" /> Kid voices
                  </h3>
                  <div className="grid gap-4">
                    {game.kidReviews.map((r) => (
                      <ReviewCard key={r.id} review={r} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-5">
              <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
                <div className="aspect-[3/4] w-full">
                  <img
                    src={game.coverUrl}
                    alt={game.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-secondary">
                    Studio
                  </div>
                  <p className="font-serif text-lg font-bold text-primary">{game.developer}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Platforms
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {game.platforms.map((p) => (
                    <span
                      key={p}
                      className="rounded-md bg-muted/60 px-2.5 py-1 text-xs font-semibold text-foreground"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Themes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-muted/60 px-3 py-1 text-xs font-semibold text-muted-foreground"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {similar.length > 0 && (
                <div className="rounded-2xl border border-border/60 bg-card p-5">
                  <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Safer alternatives
                  </h3>
                  <div className="space-y-3">
                    {similar.map((s) => (
                      <Link
                        key={s.id}
                        href={`/game/${s.id}`}
                        className="group -mx-2 flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted/60"
                      >
                        <img
                          src={s.coverUrl}
                          alt={s.title}
                          className="h-16 w-12 rounded-lg bg-muted object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-serif text-base font-bold leading-tight transition-colors group-hover:text-secondary">
                            {s.title}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            Age {s.ageRecommendation}+ · {s.developer}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
