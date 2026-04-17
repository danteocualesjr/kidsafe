import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  ChevronRight,
  Film as FilmIcon,
  BookOpen,
  MapPin,
  Gamepad2,
  Palette,
  ShieldCheck,
  Sparkles,
  Quote,
  MessageSquare,
} from "lucide-react";
import { films } from "@/data/films";
import { books } from "@/data/books";
import { tips } from "@/data/tips";
import { threads } from "@/data/community";
import { ContentCard } from "@/components/ContentCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CATEGORIES = [
  { key: "films", label: "Films", icon: FilmIcon, href: "/browse?cat=films" },
  { key: "books", label: "Books", icon: BookOpen, href: "/browse?cat=books" },
  { key: "games", label: "Games", icon: Gamepad2, href: "/browse?cat=games" },
  { key: "places", label: "Places", icon: MapPin, href: "/browse?cat=places" },
  { key: "activities", label: "Activities", icon: Palette, href: "/browse?cat=activities" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function Home() {
  const [activeCat, setActiveCat] = useState("films");
  const featureFilm = films[0];
  const sideFilms = films.slice(1, 5);
  const newBooks = books.slice(0, 4);
  const tipOfDay = tips[0];
  const recentThreads = threads.slice(0, 3);

  return (
    <div className="space-y-24 pb-24 md:space-y-32 md:pb-32">
      {/* Hero — editorial, centered, glassy search */}
      <section className="relative pt-12 md:pt-20">
        <div className="container mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm mb-8"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Trusted by 240,000+ parents
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-4xl font-extrabold leading-[1.05] tracking-tight text-primary md:text-6xl lg:text-7xl"
            >
              Discovery <span className="italic font-extrabold text-secondary">Simplified</span>,
              <br className="hidden md:block" /> Safety Guaranteed.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Honest, detailed safety scores for films, books, games, places, and activities. Make
              confident parenting choices in seconds.
            </motion.p>

            <motion.div variants={fadeUp} className="relative mx-auto mt-10 max-w-3xl">
              <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-secondary/30 to-primary/20 opacity-40 blur-lg" aria-hidden />
              <form
                onSubmit={(e) => e.preventDefault()}
                className="relative flex h-16 items-center gap-2 rounded-[2rem] border border-border/60 bg-card p-2 shadow-xl shadow-primary/5 md:h-20"
              >
                <Search className="ml-4 h-5 w-5 shrink-0 text-muted-foreground md:h-6 md:w-6" />
                <input
                  type="search"
                  placeholder="Search films, books, games, places…"
                  className="h-full flex-1 bg-transparent px-2 text-base font-medium text-foreground placeholder:text-muted-foreground/70 outline-none md:text-lg"
                />
                <Button
                  type="submit"
                  className="hidden h-full rounded-[1.5rem] px-7 text-sm font-bold md:inline-flex"
                >
                  Search
                </Button>
              </form>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-2.5">
              {CATEGORIES.map((c) => {
                const Icon = c.icon;
                const active = activeCat === c.key;
                return (
                  <Link key={c.key} href={c.href}>
                    <button
                      onClick={() => setActiveCat(c.key)}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                        active
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "bg-muted/60 text-primary hover:bg-accent/60"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {c.label}
                    </button>
                  </Link>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trending Bento Grid */}
      <section className="container mx-auto px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary mb-2">
              Trending now
            </p>
            <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Curated safety-first picks
            </h2>
          </div>
          <Link
            href="/browse"
            className="group inline-flex items-center gap-1 text-sm font-bold text-secondary transition-all hover:gap-2"
          >
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-4 md:auto-rows-[220px]">
          {/* Feature Card */}
          <Link
            href={`/film/${featureFilm.id}`}
            className="group relative col-span-1 overflow-hidden rounded-[2rem] bg-card md:col-span-2 md:row-span-2"
          >
            <img
              src={featureFilm.posterUrl}
              alt={featureFilm.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-8">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-[11px] font-bold text-secondary-foreground">
                  <ShieldCheck className="h-3 w-3" /> Guardian Verified
                </span>
                <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                  Ages {featureFilm.ageRecommendation}+
                </span>
              </div>
              <h3 className="font-serif text-2xl font-extrabold leading-tight text-white md:text-3xl">
                {featureFilm.title}
              </h3>
              <p className="mt-2 line-clamp-2 max-w-md text-sm text-white/85 md:text-base">
                {featureFilm.plotSummary}
              </p>
              <div className="mt-5">
                <span className="inline-flex items-center gap-2 rounded-2xl bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-md transition-transform group-hover:scale-105">
                  Open review <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>

          {/* Smaller Cards */}
          {sideFilms.map((f, i) => (
            <Link
              key={f.id}
              href={`/film/${f.id}`}
              className="group relative col-span-1 overflow-hidden rounded-[1.5rem] bg-card md:row-span-1"
            >
              <img
                src={f.posterUrl}
                alt={f.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-secondary/95 px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">
                    Ages {f.ageRecommendation}+
                  </span>
                  {i === 0 && (
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
                      New
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-base font-bold leading-tight text-white line-clamp-1">
                  {f.title}
                </h3>
                <p className="mt-0.5 text-[11px] font-medium text-white/75 line-clamp-1">
                  {f.year} · {f.genres[0]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tip of the day */}
      <section className="container mx-auto px-6">
        <div className="overflow-hidden rounded-[2rem] bg-primary text-primary-foreground">
          <div className="grid items-stretch lg:grid-cols-[1fr_400px]">
            <div className="flex flex-col justify-center p-10 md:p-16">
              <div className="mb-7 inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">
                <Quote className="h-3 w-3" />
                Tip of the day
              </div>
              <h3 className="mb-5 max-w-2xl font-serif text-2xl font-extrabold leading-[1.2] text-white md:text-4xl">
                {tipOfDay.title}
              </h3>
              <p className="mb-7 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
                {tipOfDay.body}
              </p>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
                — {tipOfDay.author}
              </p>
            </div>

            <div className="flex flex-col justify-center border-t border-white/10 bg-black/15 p-10 md:p-12 lg:border-l lg:border-t-0">
              <div className="mb-6 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground/60">
                More from KidSafe
              </div>
              <ul className="space-y-6">
                {tips.slice(1, 4).map((t) => (
                  <li key={t.id} className="group cursor-pointer">
                    <span className="mb-1 block font-serif text-lg font-bold text-white transition-colors group-hover:text-accent">
                      {t.title}
                    </span>
                    <p className="line-clamp-2 text-sm leading-relaxed text-primary-foreground/70">
                      {t.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="container mx-auto px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary mb-2">
              Books we love
            </p>
            <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Reading for every feeling
            </h2>
          </div>
          <Link
            href="/browse?cat=books"
            className="group inline-flex items-center gap-1 text-sm font-bold text-secondary transition-all hover:gap-2"
          >
            See all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4">
          {newBooks.map((b, i) => (
            <ContentCard
              key={b.id}
              index={i}
              data={{
                id: b.id,
                href: `/book/${b.id}`,
                title: b.title,
                subtitle: `${b.author} · ${b.pages}p`,
                ageRecommendation: b.ageRecommendation,
                safetyScores: b.safetyScores,
                seed: i + 1,
              }}
            />
          ))}
        </div>
      </section>

      {/* Community + Assistant */}
      <section className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary mb-2">
                Community
              </p>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                Real conversations
              </h2>
            </div>

            <div className="space-y-4">
              {recentThreads.map((t) => (
                <Link key={t.id} href={`/community/${t.id}`}>
                  <article className="group rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-8">
                    <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em]">
                      <span className="rounded-full bg-accent px-2.5 py-0.5 text-accent-foreground">
                        {t.category}
                      </span>
                      <span className="text-muted-foreground">{t.lastActivity}</span>
                    </div>
                    <h3 className="mb-2 font-serif text-xl font-bold leading-snug transition-colors group-hover:text-secondary">
                      {t.title}
                    </h3>
                    <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {t.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <MessageSquare className="h-3.5 w-3.5" /> {t.replies}
                        </span>
                        <span>{t.likes} likes</span>
                      </div>
                      <span className="text-xs font-medium text-foreground">by {t.author}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center sm:text-left">
              <Link
                href="/community"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-2.5 text-sm font-bold transition-colors hover:bg-accent/40"
              >
                Visit the parent forum
              </Link>
            </div>
          </div>

          <aside className="lg:mt-24">
            <div className="sticky top-24 rounded-2xl border border-secondary/20 bg-secondary/5 p-8 text-center sm:text-left">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mb-3 font-serif text-2xl font-extrabold leading-tight text-foreground">
                Not sure what's right for your kid?
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                Ask anything. Our AI assistant has read every review on KidSafe and gives nuanced,
                personalized guidance.
              </p>
              <Link href="/assistant">
                <Button className="w-full rounded-full sm:w-auto lg:w-full">Ask the Assistant</Button>
              </Link>
              <ul className="mx-auto mt-6 max-w-[240px] space-y-3 text-left text-xs font-medium text-muted-foreground sm:mx-0 lg:mx-auto">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-secondary">•</span> Personalized to your child's age
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-secondary">•</span> Cites actual parent reviews
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-secondary">•</span> Suggests gentle alternatives
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
