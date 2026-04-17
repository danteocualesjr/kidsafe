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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] as const } }
};

export default function Home() {
  const [activeCat, setActiveCat] = useState("films");
  const trendingFilms = films.slice(0, 6);
  const newBooks = books.slice(0, 4);
  const tipOfDay = tips[0];
  const recentThreads = threads.slice(0, 3);

  return (
    <div className="space-y-24 pb-24 md:space-y-32 md:pb-32">
      {/* Hero */}
      <section className="relative overflow-hidden bg-accent/20 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="container mx-auto grid gap-12 px-6 md:grid-cols-2 md:items-center lg:gap-20 relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-8 max-w-xl">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/10">
              <ShieldCheck className="h-3.5 w-3.5" />
              Trusted by 240,000+ parents
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl font-medium leading-[1.1] tracking-tight lg:text-7xl text-foreground">
              Know what's <span className="text-primary italic">truly safe</span> for your kids.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed text-muted-foreground">
              KidSafe provides honest, detailed safety scores for films, books, and places. Make confident parenting choices in seconds, not hours.
            </motion.p>
            
            <motion.div variants={fadeUp} className="pt-2">
              <form
                onSubmit={(e) => { e.preventDefault(); }}
                className="flex w-full items-center gap-2 rounded-full border border-border bg-background p-1.5 shadow-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all"
              >
                <Search className="ml-3 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search any film, book, or place..."
                  className="flex-1 bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-muted-foreground font-medium text-foreground"
                />
                <Button type="submit" className="rounded-full px-6">Search</Button>
              </form>
              
              <div className="flex flex-wrap gap-2 pt-5">
                {CATEGORIES.map(c => {
                  const Icon = c.icon;
                  const active = activeCat === c.key;
                  return (
                    <button
                      key={c.key}
                      onClick={() => setActiveCat(c.key)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                        active 
                          ? "bg-foreground text-background" 
                          : "bg-background/50 border border-border/50 text-muted-foreground hover:bg-background hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] as const }} className="relative hidden md:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-xl">
              <img src={heroImg} alt="Family enjoying time together" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 pt-24">
                <div className="flex items-center gap-3 rounded-xl bg-background/95 p-3 backdrop-blur-md shadow-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-primary mb-0.5">Today's pick</div>
                    <div className="font-serif text-lg font-medium leading-none">Starlight Dreamers</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Films */}
      <section className="container mx-auto px-6">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Trending in films</p>
            <h2 className="font-serif text-3xl font-medium tracking-tight lg:text-4xl text-foreground">What parents are watching</h2>
          </div>
          <Link href="/browse" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary/80 transition-colors group">
            See all films <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {trendingFilms.map((f, i) => <FilmCard key={f.id} film={f} index={i} />)}
        </div>
      </section>

      {/* Tip of the day */}
      <section className="container mx-auto px-6">
        <div className="overflow-hidden rounded-3xl bg-secondary text-secondary-foreground">
          <div className="grid lg:grid-cols-[1fr_400px] items-stretch">
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <div className="inline-flex self-start items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-8 border border-white/10">
                <Quote className="h-3 w-3" />
                Tip of the day
              </div>
              <h3 className="font-serif text-2xl md:text-4xl font-medium leading-[1.2] text-white mb-6 max-w-2xl">{tipOfDay.title}</h3>
              <p className="text-base md:text-lg leading-relaxed text-secondary-foreground/80 max-w-2xl mb-8">{tipOfDay.body}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-accent">— {tipOfDay.author}</p>
            </div>
            
            <div className="bg-black/10 p-10 md:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-secondary-foreground/60 mb-6">More from KidSafe</div>
              <ul className="space-y-6">
                {tips.slice(1, 4).map(t => (
                  <li key={t.id} className="group cursor-pointer">
                    <span className="font-serif text-lg font-medium text-white group-hover:text-accent transition-colors block mb-2">{t.title}</span>
                    <p className="text-sm text-secondary-foreground/70 line-clamp-2 leading-relaxed">{t.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="container mx-auto px-6">
        <div className="mb-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Books we love</p>
          <h2 className="font-serif text-3xl font-medium tracking-tight lg:text-4xl text-foreground">Reading for every feeling</h2>
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

      {/* Community */}
      <section className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="mb-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Community</p>
              <h2 className="font-serif text-3xl font-medium tracking-tight lg:text-4xl text-foreground">Real conversations</h2>
            </div>
            
            <div className="space-y-4">
              {recentThreads.map(t => (
                <Link key={t.id} href={`/community/${t.id}`}>
                  <article className="group rounded-2xl border border-border/50 bg-card p-6 md:p-8 transition-all duration-300 hover:shadow-md hover:border-border">
                    <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
                      <span className="rounded-sm bg-accent px-2 py-0.5 text-accent-foreground">{t.category}</span>
                      <span className="text-muted-foreground">{t.lastActivity}</span>
                    </div>
                    <h3 className="font-serif text-xl font-medium leading-snug group-hover:text-primary transition-colors mb-2">{t.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-6">{t.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                        <span className="flex items-center gap-1.5"><MessageSquare className="h-3.5 w-3.5" /> {t.replies}</span>
                        <span>{t.likes} likes</span>
                      </div>
                      <span className="text-xs font-medium text-foreground">by {t.author}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            
            <div className="mt-8 text-center sm:text-left">
              <Link href="/community" className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-2.5 text-sm font-bold hover:bg-accent/50 transition-colors">
                Visit the parent forum
              </Link>
            </div>
          </div>
          
          <aside className="lg:mt-24">
            <div className="sticky top-24 rounded-2xl bg-accent/30 p-8 border border-accent/50 text-center sm:text-left">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-2xl font-medium leading-tight mb-3 text-foreground">Not sure what's right for your kid?</h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                Ask anything. Our AI assistant has read every review on KidSafe and gives nuanced, personalized guidance.
              </p>
              
              <Link href="/assistant">
                <Button className="w-full sm:w-auto lg:w-full rounded-full">Ask the Assistant</Button>
              </Link>
              
              <ul className="mt-6 space-y-3 text-xs font-medium text-muted-foreground text-left max-w-[240px] mx-auto sm:mx-0 lg:mx-auto">
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span> Personalized to your child's age</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span> Cites actual parent reviews</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span> Suggests gentle alternatives</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
