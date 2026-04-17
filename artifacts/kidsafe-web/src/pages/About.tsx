import { motion } from "framer-motion";
import { ShieldCheck, Heart, Users, BookOpen, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import heroImg from "@assets/generated_images/generated_image_2.png";

const VALUES = [
  { icon: ShieldCheck, title: "Honest, not alarmist", body: "We don't fear-monger. We give you the specifics so you can decide." },
  { icon: Heart, title: "Respectful of kids", body: "Children deserve thoughtful media — we celebrate the gentle as much as we flag the rough." },
  { icon: Users, title: "Built with parents", body: "Every score is verified by a real parent reviewer. Our community is the soul of KidSafe." },
  { icon: BookOpen, title: "Books, places, and beyond", body: "We don't stop at film. Reading recommendations, places, and activities matter equally." },
];

const PROCESS = [
  { step: "01", title: "Editorial first watch", body: "A KidSafe editor watches, reads, or visits and writes a draft analysis across our 8-criteria framework." },
  { step: "02", title: "Parent panel review", body: "A panel of 5–7 parents from our community independently scores the same content. Discrepancies flag a re-review." },
  { step: "03", title: "Continuous community input", body: "Once published, parent reviews are weighted into the score. Things change — and so does our analysis." },
];

export default function About() {
  return (
    <div className="pb-24">
      <section className="border-b bg-gradient-to-br from-accent/30 via-background to-background">
        <div className="container mx-auto grid gap-10 px-4 pt-16 pb-16 md:grid-cols-2 md:items-center md:gap-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Our mission</p>
            <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
              Make family media decisions <span className="text-primary">calmer</span>.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground max-w-md">
              KidSafe was founded by two parents tired of generic ratings, gut-wrenching trailers, and the constant background hum of "is this okay for them?" We built the tool we wished existed.
            </p>
            <Link href="/signup"><Button size="lg" className="rounded-full">Start free</Button></Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
            <img src={heroImg} alt="Family on a movie night" className="aspect-[4/3] w-full rounded-3xl border object-cover shadow-xl shadow-primary/10" />
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-10 max-w-2xl font-serif text-3xl font-bold tracking-tight md:text-4xl">What we believe</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div key={v.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="rounded-2xl border bg-card p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
                <h3 className="font-serif text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-10">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">How we review</p>
          <h2 className="max-w-2xl font-serif text-3xl font-bold tracking-tight md:text-4xl">Our three-step process</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {PROCESS.map((p, i) => (
            <motion.div key={p.step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="rounded-2xl border bg-card p-6">
              <div className="font-serif text-3xl font-bold text-primary">{p.step}</div>
              <h3 className="mt-3 font-serif text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="overflow-hidden rounded-3xl border bg-gradient-to-br from-primary via-primary/95 to-secondary p-12 text-primary-foreground md:p-16">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <Sparkles className="h-8 w-8 opacity-90" />
              <h2 className="mt-4 font-serif text-3xl font-bold leading-tight md:text-5xl">Join the calmest corner of the parenting internet.</h2>
              <p className="mt-3 max-w-xl opacity-90">Free to start. No ads. No outrage. Just thoughtful, useful guidance.</p>
            </div>
            <Link href="/signup"><Button size="lg" variant="secondary" className="rounded-full">Create free account</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
