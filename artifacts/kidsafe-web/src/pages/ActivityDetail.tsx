import { useRoute, Link } from "wouter";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { getActivity } from "@/data/activities";
import { AgeBadge } from "@/components/AgeBadge";
import { SafetyScore } from "@/components/SafetyScore";
import { ReviewCard } from "@/components/ReviewCard";
import { PosterPlaceholder } from "@/components/PosterPlaceholder";
import { Button } from "@/components/ui/button";
import NotFound from "./not-found";

export default function ActivityDetail() {
  const [, params] = useRoute("/activity/:id");
  const activity = params ? getActivity(params.id) : undefined;
  if (!activity) return <NotFound />;
  
  return (
    <div className="pb-32 bg-background">
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-accent/20 via-background to-background pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="container mx-auto px-6 relative z-10">
          <Link href="/browse" className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to browse
          </Link>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}>
            <div className="overflow-hidden rounded-[2.5rem] border-4 border-card shadow-2xl shadow-primary/10 mb-10 max-w-5xl">
              <PosterPlaceholder title={activity.name} seed={activity.name.length + 3} aspect="21/9" className="w-full" />
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }} className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <AgeBadge age={activity.ageRecommendation} />
              <span className="rounded-full bg-card border border-border/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground shadow-sm">{activity.category}</span>
            </div>
            
            <h1 className="font-serif text-5xl font-bold leading-tight md:text-7xl tracking-tight">{activity.name}</h1>
            <p className="max-w-3xl text-xl leading-relaxed text-foreground/80 font-medium pt-2">{activity.description}</p>
            
            <div className="flex flex-wrap gap-4 pt-6">
              <Button size="lg" className="rounded-full px-8 text-base font-bold shadow-lg shadow-primary/20"><Bookmark className="mr-2 h-5 w-5" /> Save activity</Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base font-bold border-2"><Share2 className="mr-2 h-5 w-5" /> Share</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto grid gap-16 px-6 pt-16 lg:grid-cols-[1fr_400px]">
        <div className="space-y-16">
          <section>
            <h2 className="mb-8 font-serif text-4xl font-bold">Safety analysis</h2>
            <SafetyScore scores={activity.safetyScores} />
          </section>

          <section className="rounded-[2.5rem] border border-amber-200/50 bg-gradient-to-br from-amber-50 to-orange-50/30 p-8 md:p-12 shadow-xl shadow-amber-500/5">
            <h2 className="mb-6 font-serif text-3xl font-bold text-amber-950">What parents need to know</h2>
            <p className="text-xl leading-relaxed text-amber-900/90 font-medium">{activity.whatParentsNeedToKnow}</p>
          </section>

          <section>
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="font-serif text-4xl font-bold">Parent reviews</h2>
              <span className="text-xl font-bold text-muted-foreground bg-accent/50 px-4 py-1 rounded-full">{activity.parentReviews.length}</span>
            </div>
            <div className="grid gap-6">
              {activity.parentReviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </section>
        </div>
        
        <aside className="space-y-8">
          <div className="sticky top-32 space-y-8">
            <div className="rounded-[2rem] border border-border/40 bg-card p-8 shadow-xl shadow-primary/5">
              <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-muted-foreground">Themes & Tags</h3>
              <div className="flex flex-wrap gap-2.5">
                {activity.tags.map(t => (
                  <span key={t} className="rounded-full border border-border/50 bg-background px-4 py-2 text-sm font-bold text-muted-foreground shadow-sm hover:text-foreground hover:border-primary/50 transition-colors cursor-default">#{t}</span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
