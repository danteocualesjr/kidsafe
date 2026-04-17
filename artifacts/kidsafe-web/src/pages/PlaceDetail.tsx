import { useRoute, Link } from "wouter";
import { ArrowLeft, MapPin } from "lucide-react";
import { getPlace } from "@/data/places";
import { AgeBadge } from "@/components/AgeBadge";
import { SafetyScore } from "@/components/SafetyScore";
import { ReviewCard } from "@/components/ReviewCard";
import { PosterPlaceholder } from "@/components/PosterPlaceholder";
import NotFound from "./not-found";

export default function PlaceDetail() {
  const [, params] = useRoute("/place/:id");
  const place = params ? getPlace(params.id) : undefined;
  if (!place) return <NotFound />;
  return (
    <div className="pb-24">
      <section className="border-b bg-gradient-to-br from-accent/30 via-background to-background">
        <div className="container mx-auto px-4 pt-8 pb-12">
          <Link href="/browse" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to browse
          </Link>
          <PosterPlaceholder title={place.name} seed={place.name.length} aspect="3/1" className="mb-8" />
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <AgeBadge age={place.ageRecommendation} />
            <span className="rounded-full bg-card border px-3 py-1 text-xs font-medium text-muted-foreground">{place.category}</span>
          </div>
          <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl">{place.name}</h1>
          <div className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {place.location}</div>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground/80">{place.description}</p>
        </div>
      </section>
      <div className="container mx-auto px-4 pt-12 space-y-12">
        <SafetyScore scores={place.safetyScores} />
        <section className="rounded-2xl border bg-gradient-to-br from-amber-50 to-card p-6">
          <h2 className="mb-3 font-serif text-2xl font-bold">What parents need to know</h2>
          <p className="text-base leading-relaxed">{place.whatParentsNeedToKnow}</p>
        </section>
        <section>
          <h2 className="mb-5 font-serif text-2xl font-bold">Parent reviews</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {place.parentReviews.map(r => <ReviewCard key={r.id} review={r} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
