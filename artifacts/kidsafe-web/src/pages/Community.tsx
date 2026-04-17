import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Heart,
  MessageCircle,
  Clock,
  ArrowRight,
  Film as FilmIcon,
  BookOpen,
  Compass,
  Lightbulb,
  Gamepad2,
} from "lucide-react";
import { threads } from "@/data/community";

const CATEGORIES = [
  "All",
  "Films & TV",
  "Books & Reading",
  "Tweens & Teens",
  "Daily Life",
  "Places & Activities",
];

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const } },
};

export default function Community() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:px-8 md:py-12 lg:px-12">
        {/* Hero header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] as const }}
          className="relative mb-12 overflow-hidden rounded-[2rem] p-8 md:p-12"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-primary to-secondary/80" />
          <div
            className="absolute right-0 top-0 -z-10 h-full w-1/2 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, white 0%, transparent 40%), radial-gradient(circle at 70% 70%, white 0%, transparent 40%)",
            }}
            aria-hidden
          />

          <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="mb-4 inline-block rounded-full bg-secondary/30 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                Community Hub
              </span>
              <h1 className="mb-4 font-serif text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
                Parent-to-parent advice on kids' media.
              </h1>
              <p className="max-w-lg text-base leading-relaxed text-white/85 md:text-lg">
                Join 50,000+ guardians sharing vetted safety reviews on what kids are watching,
                reading, and exploring today.
              </p>
            </div>
            <button className="flex items-center gap-3 rounded-2xl bg-accent px-7 py-4 text-sm font-bold text-accent-foreground shadow-xl shadow-primary/20 transition-transform hover:scale-105 active:scale-95">
              <PlusCircle className="h-5 w-5" fill="currentColor" />
              Ask the Community
            </button>
          </div>
        </motion.header>

        {/* Browse Categories — bento */}
        <section className="mb-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-2xl font-extrabold tracking-tight text-primary md:text-3xl">
              Browse Categories
            </h2>
            <a
              href="#threads"
              className="group flex items-center gap-1 text-sm font-bold text-secondary"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:auto-rows-[180px]">
            {/* Movies & TV — feature */}
            <div className="group relative col-span-1 overflow-hidden rounded-[2rem] bg-card p-7 shadow-sm transition-all hover:shadow-xl md:col-span-2 md:row-span-2">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
              <div
                className="absolute inset-0 -z-10 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, hsl(205 100% 16%), hsl(184 100% 22%))",
                }}
              />
              <div className="relative z-10 flex h-full flex-col justify-end">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-md">
                  <FilmIcon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-serif text-2xl font-extrabold text-white">Films & TV</h3>
                <p className="mb-4 text-sm text-white/80">
                  Rating breakdowns for Netflix, Disney+, and the cinema.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/15 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    12k Posts
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-foreground">
                    Active Now
                  </span>
                </div>
              </div>
            </div>

            {/* Books — wide */}
            <div className="group relative col-span-1 flex items-center gap-6 overflow-hidden rounded-[2rem] border-l-4 border-accent bg-card p-6 shadow-sm transition-all hover:shadow-xl md:col-span-2">
              <div className="flex-1">
                <h3 className="mb-1 font-serif text-xl font-extrabold text-primary">Books</h3>
                <p className="text-sm text-muted-foreground">
                  Age-appropriate reading lists & hidden themes.
                </p>
                <p className="mt-3 text-xs font-bold text-secondary">
                  Trending: "Graphic Novel Safety"
                </p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/40">
                <BookOpen className="h-9 w-9 text-accent-foreground" />
              </div>
            </div>

            {/* Travel & Places */}
            <div className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-[2rem] bg-card p-6 shadow-sm transition-all hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-base font-extrabold text-primary">
                  Travel & Places
                </h3>
                <p className="mt-1 text-[11px] leading-tight text-muted-foreground">
                  Safe destinations & kid-friendly retreats.
                </p>
              </div>
            </div>

            {/* Games */}
            <div className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-[2rem] bg-card p-6 shadow-sm transition-all hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/40 text-accent-foreground">
                <Gamepad2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-base font-extrabold text-primary">Games</h3>
                <p className="mt-1 text-[11px] leading-tight text-muted-foreground">
                  Screen time, multiplayer chat & in-app purchases.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Thread filter pills */}
        <div className="mb-6 flex flex-wrap gap-2" id="threads">
          {CATEGORIES.map((c, i) => (
            <button
              key={c}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                i === 0
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/60 text-primary hover:bg-accent/60"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Threads */}
        <div className="grid max-w-3xl gap-4">
          {threads.map((t, i) => (
            <motion.div
              key={t.id}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/community/${t.id}`}>
                <article className="group rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em]">
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-accent-foreground">
                      {t.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" /> {t.lastActivity}
                    </span>
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-bold leading-snug text-primary transition-colors group-hover:text-secondary">
                    {t.title}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {t.content}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 transition-colors group-hover:text-primary">
                        <MessageCircle className="h-4 w-4" /> {t.replies} replies
                      </span>
                      <span className="inline-flex items-center gap-1.5 transition-colors group-hover:text-rose-500">
                        <Heart className="h-4 w-4" /> {t.likes} likes
                      </span>
                    </div>
                    <span className="rounded-full bg-muted/60 px-3 py-1 text-xs font-medium text-foreground">
                      by {t.author}
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer hint */}
        <div className="mt-12 max-w-3xl rounded-2xl border border-border/60 bg-muted/40 p-6 text-center">
          <Lightbulb className="mx-auto mb-2 h-5 w-5 text-secondary" />
          <p className="text-sm font-medium text-muted-foreground">
            New here? Read the{" "}
            <a className="font-bold text-primary underline" href="#">
              community guidelines
            </a>{" "}
            before posting — kindness keeps this space safe.
          </p>
        </div>
      </div>
    </div>
  );
}
