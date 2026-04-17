import { useRoute, Link } from "wouter";
import { ArrowLeft, Bookmark, Share2, ShieldCheck } from "lucide-react";
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
    <div className="pb-24 md:pb-32 bg-background">
      <section className="border-b border-border bg-accent/10 pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="container mx-auto px-6">
          <Link href="/browse" className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to browse
          </Link>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="overflow-hidden rounded-2xl border border-border shadow-md mb-8 max-w-4xl mx-auto md:mx-0">
              <PosterPlaceholder title={activity.name} seed={activity.name.length + 3} aspect="21/9" className="w-full" />
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <AgeBadge age={activity.ageRecommendation} />
              <span className="rounded-full bg-background border border-border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{activity.category}</span>
            </div>
            
            <h1 className="font-serif text-4xl font-medium leading-[1.1] md:text-6xl tracking-tight">{activity.name}</h1>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">{activity.description}</p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <Button className="rounded-full px-6"><Bookmark className="mr-2 h-4 w-4" /> Save</Button>
              <Button variant="outline" className="rounded-full px-6"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto grid gap-12 px-6 pt-12 lg:grid-cols-[1fr_340px]">
        <div className="space-y-12">
          <section>
            <h2 className="mb-6 font-serif text-3xl font-medium">Safety analysis</h2>
            <SafetyScore scores={activity.safetyScores} />
          </section>

          <section className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-amber-600" />
              <h2 className="font-serif text-2xl font-medium text-amber-900">What parents need to know</h2>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-amber-800/90">{activity.whatParentsNeedToKnow}</p>
          </section>

          <section>
            <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
              <h2 className="font-serif text-2xl font-medium">Parent reviews</h2>
              <span className="text-sm font-medium text-muted-foreground">{activity.parentReviews.length} reviews</span>
            </div>
            <div className="grid gap-4">
              {activity.parentReviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </section>
        </div>
        
        <aside className="space-y-6">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Themes</h3>
              <div className="flex flex-wrap gap-2">
                {activity.tags.map(t => (
                  <span key={t} className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground">#{t}</span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
