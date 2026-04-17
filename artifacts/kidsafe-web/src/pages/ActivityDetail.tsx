import { useRoute, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { getActivity } from "@/data/activities";
import { AgeBadge } from "@/components/AgeBadge";
import { SafetyScore } from "@/components/SafetyScore";
import { ReviewCard } from "@/components/ReviewCard";
import { PosterPlaceholder } from "@/components/PosterPlaceholder";
import NotFound from "./not-found";

export default function ActivityDetail() {
  const [, params] = useRoute("/activity/:id");
  const activity = params ? getActivity(params.id) : undefined;
  if (!activity) return <NotFound />;
  return (
    <div className="pb-24">
      <section className="border-b bg-gradient-to-br from-accent/30 via-background to-background">
        <div className="container mx-auto px-4 pt-8 pb-12">
          <Link href="/browse" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to browse
          </Link>
          <PosterPlaceholder title={activity.name} seed={activity.name.length + 3} aspect="3/1" className="mb-8" />
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <AgeBadge age={activity.ageRecommendation} />
            <span className="rounded-full bg-card border px-3 py-1 text-xs font-medium text-muted-foreground">{activity.category}</span>
          </div>
          <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl">{activity.name}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground/80">{activity.description}</p>
        </div>
      </section>
      <div className="container mx-auto px-4 pt-12 space-y-12">
        <SafetyScore scores={activity.safetyScores} />
        <section className="rounded-2xl border bg-gradient-to-br from-amber-50 to-card p-6">
          <h2 className="mb-3 font-serif text-2xl font-bold">What parents need to know</h2>
          <p className="text-base leading-relaxed">{activity.whatParentsNeedToKnow}</p>
        </section>
        <section>
          <h2 className="mb-5 font-serif text-2xl font-bold">Parent reviews</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {activity.parentReviews.map(r => <ReviewCard key={r.id} review={r} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
