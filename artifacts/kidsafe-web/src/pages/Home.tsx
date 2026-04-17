import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search, Sparkles, MessageSquare, ArrowRight, Quote, ShieldCheck, Film as FilmIcon, BookOpen, MapPin, Palette } from "lucide-react";
import { films } from "@/data/films";
import { books } from "@/data/books";
import { tips } from "@/data/tips";
import { threads } from "@/data/community";
import { FilmCard } from "@/components/FilmCard";
import { ContentCard } from "@/components/ContentCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import heroImg from "@assets/generated_images/generated_image_1.png";

const CATEGORIES = [
  { key: "films", label: "Films", icon: FilmIcon },
  { key: "books", label: "Books", icon: BookOpen },
  { key: "places", label: "Places", icon: MapPin },
  { key: "activities", label: "Activities", icon: Palette },
];

export default function Home() {
  const [activeCat, setActiveCat] = useState("films");
  const trendingFilms = films.slice(0, 6);
  const newBooks = books.slice(0, 4);
  const tipOfDay = tips[0];
  const recentThreads = threads.slice(0, 3);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent/40 via-background to-background">
        <div className="container mx-auto grid gap-10 px-4 pt-16 pb-12 md:grid-cols-2 md:items-center md:gap-16 md:pt-24 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Trusted by 240,000+ parents
            </div>
            <h1 className="font-serif text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Know what's <span className="text-primary">truly safe</span> for your kids.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground md:max-w-md">
              KidSafe gives you honest, detailed safety scores for every film, book, place, and activity. Make confident choices in seconds, not hours.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); }}
              className="flex w-full max-w-lg items-center gap-2 rounded-full border bg-card p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-primary/30"
            >
              <Search className="ml-3 h-5 w-5 text-muted-foreground" />
              <input
                placeholder="Search any film, book, or place..."
                className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button type="submit" className="rounded-full">Search</Button>
            </form>
            <div className="flex flex-wrap gap-2 pt-1">
              {CATEGORIES.map(c => {
                const Icon = c.icon;
                const active = activeCat === c.key;
                return (
                  <button
                    key={c.key}
                    onClick={() => setActiveCat(c.key)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${active ? "border-primary bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {c.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
            <div className="relative overflow-hidden rounded-3xl border shadow-2xl shadow-primary/10">
              <img src={heroImg} alt="Family enjoying time together" className="aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
                <div className="flex items-center gap-3 rounded-2xl bg-card/95 p-4 backdrop-blur">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                    <ShieldCheck className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Today's pick</div>
                    <div className="font-serif text-lg font-bold">Starlight Dreamers</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border bg-card p-4 shadow-xl md:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">8 criteria</div>
                  <div className="text-sm font-semibold">Safety breakdown</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Films */}
      <section className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">Trending in films</p>
            <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">What parents are watching this week</h2>
          </div>
          <Link href="/browse" className="hidden text-sm font-medium text-primary hover:underline md:flex md:items-center md:gap-1">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {trendingFilms.map((f, i) => <FilmCard key={f.id} film={f} index={i} />)}
        </div>
      </section>

      {/* Tip of the day */}
      <section className="container mx-auto px-4">
        <div className="overflow-hidden rounded-3xl border bg-gradient-to-br from-secondary/20 via-card to-card p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
                <Quote className="h-3.5 w-3.5" />
                Tip of the day
              </div>
              <h3 className="font-serif text-2xl font-bold leading-tight md:text-3xl">{tipOfDay.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">{tipOfDay.body}</p>
              <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">— {tipOfDay.author}</p>
            </div>
            <div className="rounded-2xl border bg-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">More from KidSafe</div>
              <ul className="mt-3 space-y-3">
                {tips.slice(1, 4).map(t => (
                  <li key={t.id} className="text-sm">
                    <span className="font-medium">{t.title}</span>
                    <p className="mt-0.5 text-muted-foreground line-clamp-2">{t.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="container mx-auto px-4">
        <div className="mb-8">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">Books we love</p>
          <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">Reading for every age and feeling</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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

      {/* Community */}
      <section className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">Community</p>
                <h2 className="font-serif text-3xl font-bold tracking-tight">Real conversations from real parents</h2>
              </div>
              <Link href="/community" className="text-sm font-medium text-primary hover:underline">
                Visit forum
              </Link>
            </div>
            <div className="space-y-3">
              {recentThreads.map(t => (
                <Link key={t.id} href={`/community/${t.id}`}>
                  <article className="group rounded-2xl border bg-card p-5 transition-all hover-elevate">
                    <div className="mb-2 flex items-center gap-2 text-xs">
                      <span className="rounded-full bg-accent px-2 py-0.5 font-medium text-accent-foreground">{t.category}</span>
                      <span className="text-muted-foreground">{t.lastActivity}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold leading-snug group-hover:text-primary">{t.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{t.content}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{t.replies} replies</span>
                      <span>{t.likes} hearts</span>
                      <span>by {t.author}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
          <aside>
            <div className="sticky top-24 rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-card p-6">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                <MessageSquare className="h-3.5 w-3.5" />
                AI Assistant
              </div>
              <h3 className="font-serif text-xl font-bold leading-tight">Not sure what's right for your kid?</h3>
              <p className="mt-2 text-sm text-muted-foreground">Ask anything. Our assistant has read every review on KidSafe and gives nuanced, personalized guidance.</p>
              <Link href="/assistant">
                <Button className="mt-5 w-full rounded-full">Ask the Assistant</Button>
              </Link>
              <ul className="mt-5 space-y-2 text-xs text-muted-foreground">
                <li>· Personalized to your child's age</li>
                <li>· Cites parent reviews</li>
                <li>· Suggests gentle alternatives</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
