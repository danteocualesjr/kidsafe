import { motion } from "framer-motion";
import { ShieldCheck, Heart, Users, BookOpen, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import heroImg from "@assets/generated_images/generated_image_2.png";

const VALUES = [
  { icon: ShieldCheck, title: "Honest, not alarmist", body: "We don't fear-monger. We give you the specifics so you can decide calmly." },
  { icon: Heart, title: "Respectful of kids", body: "Children deserve thoughtful media — we celebrate the gentle as much as we flag the rough." },
  { icon: Users, title: "Built with parents", body: "Every score is verified by a real parent reviewer. Our community is the soul of KidSafe." },
  { icon: BookOpen, title: "Books, places & more", body: "We don't stop at film. Reading recommendations, places, and activities matter equally." },
];

const PROCESS = [
  { step: "01", title: "Editorial first watch", body: "A KidSafe editor watches, reads, or visits and writes a draft analysis across our 8-criteria framework." },
  { step: "02", title: "Parent panel review", body: "A panel of 5–7 parents from our community independently scores the same content. Discrepancies flag a re-review." },
  { step: "03", title: "Continuous input", body: "Once published, parent reviews are weighted into the score. Things change — and so does our analysis." },
];

export default function About() {
  return (
    <div className="pb-32 bg-background">
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-accent/20 via-background to-accent/5 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="container mx-auto grid gap-16 px-6 md:grid-cols-2 md:items-center lg:gap-24 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }} className="space-y-8">
            <p className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Our mission
            </p>
            <h1 className="font-serif text-5xl font-bold leading-[1.05] tracking-tight lg:text-7xl">
              Make family media decisions <span className="text-primary italic font-serif">calmer</span>.
            </h1>
            <p className="text-xl leading-relaxed text-muted-foreground max-w-lg font-medium">
              KidSafe was founded by two parents tired of generic ratings, gut-wrenching trailers, and the constant background hum of "is this okay for them?" We built the tool we wished existed.
            </p>
            <div className="pt-4">
              <Link href="/signup"><Button size="lg" className="rounded-full px-8 h-14 text-lg font-bold shadow-lg shadow-primary/20">Join for free</Button></Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-[3rem] -rotate-3 scale-[1.02] transform-gpu"></div>
              <img src={heroImg} alt="Family on a movie night" className="relative z-10 aspect-[4/3] w-full rounded-[3rem] border border-border/50 object-cover shadow-2xl shadow-primary/15" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-24 md:py-32">
        <div className="mb-16 max-w-3xl">
          <h2 className="font-serif text-4xl font-bold tracking-tight lg:text-6xl text-foreground">What we believe</h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }} className="rounded-[2.5rem] border border-border/40 bg-card p-10 shadow-xl shadow-primary/5">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/60 text-foreground shadow-inner">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4">{v.title}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground font-medium">{v.body}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="bg-muted/30 py-24 md:py-32 border-y border-border/40">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">How we review</p>
            <h2 className="max-w-3xl font-serif text-4xl font-bold tracking-tight lg:text-6xl">Our three-step process</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {PROCESS.map((p, i) => (
              <motion.div key={p.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }} className="relative group">
                <div className="absolute -left-6 -top-6 text-8xl font-serif font-bold text-primary/10 group-hover:text-primary/20 transition-colors z-0 select-none pointer-events-none">{p.step}</div>
                <div className="relative z-10 pt-4 pr-6">
                  <h3 className="mb-4 font-serif text-3xl font-bold">{p.title}</h3>
                  <p className="text-xl leading-relaxed text-muted-foreground font-medium">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pt-24 md:pt-32">
        <div className="overflow-hidden rounded-[3rem] border border-primary/20 bg-gradient-to-br from-primary via-primary/95 to-primary-foreground p-12 md:p-20 shadow-2xl shadow-primary/20 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center relative z-10">
            <div>
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="font-serif text-4xl font-bold leading-tight lg:text-6xl text-white">Join the calmest corner of the parenting internet.</h2>
              <p className="mt-6 max-w-2xl text-xl font-medium text-white/90 leading-relaxed">Free to start. No ads. No outrage. Just thoughtful, useful guidance.</p>
            </div>
            <div className="pt-6 md:pt-0">
              <Link href="/signup"><Button size="lg" variant="secondary" className="rounded-full px-10 h-16 text-xl font-bold shadow-xl">Create free account</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
