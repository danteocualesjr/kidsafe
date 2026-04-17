import { Link } from "wouter";
import { motion } from "framer-motion";
import { MessageSquarePlus, Heart, MessageCircle, Clock, ShieldCheck } from "lucide-react";
import { threads } from "@/data/community";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["All", "Films & TV", "Books & Reading", "Tweens & Teens", "Daily Life", "Places & Activities"];

export default function Community() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-gradient-to-br from-accent/20 via-background to-background pt-16 pb-12 border-b border-border/40">
        <div className="container mx-auto px-6">
          <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Community
              </p>
              <h1 className="font-serif text-5xl font-bold tracking-tight lg:text-7xl">Parent forum</h1>
              <p className="mt-4 text-xl text-muted-foreground font-medium leading-relaxed">
                Calm, kind conversations between real parents. No screaming, no judgment — just shared wisdom.
              </p>
            </div>
            <Button size="lg" className="rounded-full text-base font-bold shadow-lg shadow-primary/20 h-14 px-8 self-start md:self-end">
              <MessageSquarePlus className="mr-2 h-5 w-5" /> Start a discussion
            </Button>
          </header>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 pb-32">
        <div className="mb-10 flex flex-wrap gap-3">
          {CATEGORIES.map((c, i) => (
            <button 
              key={c} 
              className={`rounded-full border-2 px-6 py-3 text-base font-bold transition-all duration-300 ${
                i === 0 
                  ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "border-border/50 bg-card text-muted-foreground hover:border-border hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-6 max-w-4xl">
          {threads.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 1, 0.5, 1] }}>
              <Link href={`/community/${t.id}`}>
                <article className="group rounded-[2.5rem] border border-border/40 bg-card p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20">
                  <div className="mb-4 flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                    <span className="rounded-full bg-accent/60 px-4 py-1.5 text-accent-foreground">{t.category}</span>
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {t.lastActivity}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold leading-tight group-hover:text-primary transition-colors md:text-3xl mb-3">{t.title}</h3>
                  <p className="text-lg font-medium text-muted-foreground line-clamp-2 leading-relaxed">{t.content}</p>
                  
                  <div className="mt-8 flex items-center justify-between pt-6 border-t border-border/40">
                    <div className="flex items-center gap-6 text-sm font-bold text-muted-foreground">
                      <span className="inline-flex items-center gap-2 group-hover:text-foreground transition-colors"><MessageCircle className="h-5 w-5" /> {t.replies} replies</span>
                      <span className="inline-flex items-center gap-2 group-hover:text-rose-500 transition-colors"><Heart className="h-5 w-5" /> {t.likes} likes</span>
                    </div>
                    <span className="text-sm font-bold text-foreground bg-background px-4 py-2 rounded-xl border border-border/50">by {t.author}</span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
