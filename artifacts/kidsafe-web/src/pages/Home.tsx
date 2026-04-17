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
    <div className="space-y-32 pb-32">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent/20 via-background to-accent/10 pt-8 pb-16 md:pt-16 md:pb-24 border-b border-border/40">
        <div className="container mx-auto grid gap-12 px-6 md:grid-cols-2 md:items-center lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }} className="space-y-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
              <ShieldCheck className="h-4 w-4" />
              Trusted by 240,000+ parents
            </div>
            <h1 className="font-serif text-5xl font-bold leading-[1.05] tracking-tight lg:text-7xl">
              Know what's <span className="text-primary italic font-serif">truly safe</span> for your kids.
            </h1>
            <p className="text-xl leading-relaxed text-muted-foreground md:max-w-lg">
              KidSafe gives you honest, detailed safety scores for every film, book, place, and activity. Make confident choices in seconds, not hours.
            </p>
            
            <div className="pt-2">
              <form
                onSubmit={(e) => { e.preventDefault(); }}
                className="flex w-full max-w-xl items-center gap-3 rounded-full border-2 border-border/50 bg-card p-2 shadow-lg shadow-primary/5 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300"
              >
                <Search className="ml-4 h-5 w-5 text-muted-foreground" />
                <input
                  placeholder="Search any film, book, or place..."
                  className="flex-1 bg-transparent px-2 py-3 text-base outline-none placeholder:text-muted-foreground font-medium text-foreground"
                />
                <Button type="submit" size="lg" className="rounded-full px-8 text-base">Search</Button>
              </form>
              
              <div className="flex flex-wrap gap-2 pt-6">
                {CATEGORIES.map(c => {
                  const Icon = c.icon;
                  const active = activeCat === c.key;
                  return (
                    <button
                      key={c.key}
                      onClick={() => setActiveCat(c.key)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${
                        active 
                          ? "bg-foreground text-background shadow-md" 
                          : "bg-card border border-border/50 text-muted-foreground hover:border-border hover:bg-accent/50 hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }} className="relative hidden md:block">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border/50 shadow-2xl shadow-primary/15">
              <img src={heroImg} alt="Family enjoying time together" className="aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 pt-32">
                <div className="flex items-center gap-4 rounded-3xl bg-card/95 p-5 backdrop-blur-md shadow-xl border border-white/10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 shadow-inner">
                    <ShieldCheck className="h-7 w-7 text-emerald-700" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Today's pick</div>
                    <div className="font-serif text-2xl font-bold">Starlight Dreamers</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-10 top-1/4 rounded-3xl border border-border/50 bg-card/95 p-5 shadow-2xl backdrop-blur-md hidden lg:block animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">8 criteria</div>
                  <div className="text-base font-bold">Safety breakdown</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Films */}
      <section className="container mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Trending in films</p>
            <h2 className="font-serif text-4xl font-bold tracking-tight lg:text-5xl">What parents are watching</h2>
          </div>
          <Link href="/browse" className="inline-flex items-center gap-2 text-base font-semibold text-primary hover:text-primary/80 transition-colors bg-primary/10 px-5 py-2.5 rounded-full">
            See all films <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {trendingFilms.map((f, i) => <FilmCard key={f.id} film={f} index={i} />)}
        </div>
      </section>

      {/* Tip of the day */}
      <section className="container mx-auto px-6">
        <div className="overflow-hidden rounded-[3rem] border border-border/50 bg-gradient-to-br from-secondary/30 via-card to-card p-10 md:p-16 shadow-2xl shadow-primary/5">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px] items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/40 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-secondary-foreground">
                <Quote className="h-4 w-4" />
                Tip of the day
              </div>
              <h3 className="font-serif text-3xl font-bold leading-tight md:text-4xl lg:text-5xl text-foreground">{tipOfDay.title}</h3>
              <p className="text-xl leading-relaxed text-muted-foreground font-medium">{tipOfDay.body}</p>
              <p className="pt-4 text-sm font-bold uppercase tracking-widest text-primary">— {tipOfDay.author}</p>
            </div>
            
            <div className="rounded-[2rem] border border-border/40 bg-background/50 p-8 backdrop-blur-sm shadow-inner">
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">More from KidSafe</div>
              <ul className="space-y-6">
                {tips.slice(1, 4).map(t => (
                  <li key={t.id} className="group cursor-pointer">
                    <span className="font-serif text-xl font-bold group-hover:text-primary transition-colors">{t.title}</span>
                    <p className="mt-2 text-sm font-medium text-muted-foreground line-clamp-2 leading-relaxed">{t.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="container mx-auto px-6">
        <div className="mb-12 space-y-2">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Books we love</p>
          <h2 className="font-serif text-4xl font-bold tracking-tight lg:text-5xl">Reading for every feeling</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
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
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          <div className="space-y-8">
            <div className="mb-2 space-y-2">
              <p className="text-sm font-bold uppercase tracking-widest text-primary">Community</p>
              <h2 className="font-serif text-4xl font-bold tracking-tight lg:text-5xl">Real conversations</h2>
            </div>
            
            <div className="space-y-5">
              {recentThreads.map(t => (
                <Link key={t.id} href={`/community/${t.id}`}>
                  <article className="group rounded-[2rem] border border-border/40 bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20">
                    <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                      <span className="rounded-full bg-accent/50 px-3 py-1 text-accent-foreground">{t.category}</span>
                      <span className="text-muted-foreground">{t.lastActivity}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold leading-snug group-hover:text-primary transition-colors">{t.title}</h3>
                    <p className="mt-3 text-base font-medium text-muted-foreground line-clamp-2 leading-relaxed">{t.content}</p>
                    
                    <div className="mt-6 flex items-center justify-between pt-6 border-t border-border/40">
                      <div className="flex items-center gap-6 text-sm font-semibold text-muted-foreground">
                        <span className="flex items-center gap-2"><MessageSquare className="h-4 w-4" /> {t.replies}</span>
                        <span className="flex items-center gap-2">Hearts: {t.likes}</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">by {t.author}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            
            <Link href="/community" className="inline-flex items-center justify-center w-full rounded-full border-2 border-primary/20 bg-primary/5 px-6 py-4 text-base font-bold text-primary hover:bg-primary/10 transition-colors">
              Visit the parent forum
            </Link>
          </div>
          
          <aside>
            <div className="sticky top-32 rounded-[2.5rem] border border-border/50 bg-gradient-to-br from-primary/15 via-card to-card p-10 shadow-2xl shadow-primary/5">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-3xl font-bold leading-tight mb-4">Not sure what's right for your kid?</h3>
              <p className="text-lg leading-relaxed text-muted-foreground font-medium mb-8">
                Ask anything. Our AI assistant has read every review on KidSafe and gives nuanced, personalized guidance.
              </p>
              
              <Link href="/assistant">
                <Button size="lg" className="w-full rounded-full text-lg h-14 shadow-lg shadow-primary/20">Ask the Assistant</Button>
              </Link>
              
              <ul className="mt-8 space-y-4 text-sm font-medium text-muted-foreground">
                <li className="flex items-start gap-3"><span className="text-primary mt-0.5">•</span> Personalized to your child's age</li>
                <li className="flex items-start gap-3"><span className="text-primary mt-0.5">•</span> Cites actual parent reviews</li>
                <li className="flex items-start gap-3"><span className="text-primary mt-0.5">•</span> Suggests gentle alternatives</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
