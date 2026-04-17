import { Link } from "wouter";
import { motion } from "framer-motion";
import { MessageSquarePlus, Heart, MessageCircle, Clock, ShieldCheck } from "lucide-react";
import { threads } from "@/data/community";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["All", "Films & TV", "Books & Reading", "Tweens & Teens", "Daily Life", "Places & Activities"];

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const } }
};

export default function Community() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-accent/10 pt-12 pb-10 border-b border-border">
        <div className="container mx-auto px-6">
          <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3" /> Community
              </p>
              <h1 className="font-serif text-4xl font-medium tracking-tight lg:text-5xl text-foreground">Parent forum</h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Calm, kind conversations between real parents. No screaming, no judgment — just shared wisdom.
              </p>
            </div>
            <Button className="rounded-full shadow-sm h-10 px-6 self-start md:self-end">
              <MessageSquarePlus className="mr-2 h-4 w-4" /> Start a discussion
            </Button>
          </header>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 pb-24">
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c, i) => (
            <button 
              key={c} 
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                i === 0 
                  ? "bg-foreground text-background" 
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-4 max-w-3xl">
          {threads.map((t, i) => (
            <motion.div key={t.id} variants={fadeUp} initial="hidden" animate="show" transition={{ delay: i * 0.05 }}>
              <Link href={`/community/${t.id}`}>
                <article className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-md hover:border-border/80">
                  <div className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
                    <span className="rounded border border-border bg-muted/50 px-2 py-0.5 text-foreground/80">{t.category}</span>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" /> {t.lastActivity}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-medium leading-snug group-hover:text-primary transition-colors mb-2 text-foreground">{t.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{t.content}</p>
                  
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 group-hover:text-foreground transition-colors"><MessageCircle className="h-4 w-4" /> {t.replies} replies</span>
                      <span className="inline-flex items-center gap-1.5 group-hover:text-rose-500 transition-colors"><Heart className="h-4 w-4" /> {t.likes} likes</span>
                    </div>
                    <span className="text-xs font-medium text-foreground bg-muted/30 px-2.5 py-1 rounded border border-border/50">by {t.author}</span>
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
