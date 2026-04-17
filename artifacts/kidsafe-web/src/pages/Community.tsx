import { Link } from "wouter";
import { motion } from "framer-motion";
import { MessageSquarePlus, Heart, MessageCircle, Clock } from "lucide-react";
import { threads } from "@/data/community";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["All", "Films & TV", "Books & Reading", "Tweens & Teens", "Daily Life", "Places & Activities"];

export default function Community() {
  return (
    <div className="container mx-auto px-4 py-12 pb-24">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">Community</p>
          <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">Parent forum</h1>
          <p className="mt-2 max-w-xl text-base text-muted-foreground">Calm, kind conversations between real parents. No screaming, no judgment — just shared wisdom.</p>
        </div>
        <Button className="rounded-full self-start md:self-end"><MessageSquarePlus className="mr-2 h-4 w-4" /> Start a discussion</Button>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map(c => (
          <button key={c} className="rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary hover:text-primary">{c}</button>
        ))}
      </div>

      <div className="grid gap-4">
        {threads.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={`/community/${t.id}`}>
              <article className="group rounded-2xl border bg-card p-6 transition-all hover-elevate">
                <div className="mb-2 flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-accent px-2.5 py-0.5 font-medium text-accent-foreground">{t.category}</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" /> {t.lastActivity}</span>
                </div>
                <h3 className="font-serif text-xl font-bold leading-snug group-hover:text-primary md:text-2xl">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{t.content}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {t.replies}</span>
                    <span className="inline-flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {t.likes}</span>
                  </div>
                  <span className="text-xs font-medium text-foreground">by {t.author}</span>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
