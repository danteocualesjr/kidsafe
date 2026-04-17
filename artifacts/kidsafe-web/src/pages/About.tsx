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

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const } }
};

export default function About() {
  return (
    <div className="pb-24 md:pb-32 bg-background">
      <section className="relative overflow-hidden border-b border-border bg-accent/5 pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="container mx-auto grid gap-12 px-6 md:grid-cols-2 md:items-center lg:gap-20 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="space-y-6 max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3" /> Our mission
            </p>
            <h1 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight lg:text-6xl text-foreground">
              Make family media decisions <span className="text-primary italic">calmer</span>.
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              KidSafe was founded by two parents tired of generic ratings, gut-wrenching trailers, and the constant background hum of "is this okay for them?" We built the tool we wished existed.
            </p>
            <div className="pt-2">
              <Link href="/signup"><Button className="rounded-full px-6 h-10 shadow-sm">Join for free</Button></Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] as const }}>
            <div className="relative aspect-[4/3] rounded-2xl border border-border shadow-xl overflow-hidden">
              <img src={heroImg} alt="Family on a movie night" className="h-full w-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-serif text-3xl font-medium tracking-tight lg:text-5xl text-foreground">What we believe</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div key={v.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.4, delay: i * 0.1 }} className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl font-medium mb-3 text-foreground">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="bg-muted/30 py-20 md:py-28 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary">How we review</p>
            <h2 className="max-w-2xl font-serif text-3xl font-medium tracking-tight lg:text-5xl text-foreground">Our three-step process</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
            {PROCESS.map((p, i) => (
              <motion.div key={p.step} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.4, delay: i * 0.1 }} className="relative group">
                <div className="text-4xl font-serif font-medium text-muted-foreground/30 mb-3 select-none pointer-events-none">{p.step}</div>
                <div>
                  <h3 className="mb-3 font-serif text-xl font-medium text-foreground">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pt-20 md:pt-28">
        <div className="overflow-hidden rounded-3xl border border-border bg-secondary p-10 md:p-16 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] mix-blend-overlay"></div>
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center relative z-10">
            <div>
              <div className="mb-4 flex items-center gap-2 text-secondary-foreground/60">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="font-serif text-3xl font-medium leading-tight lg:text-5xl text-secondary-foreground">Join the calmest corner of the parenting internet.</h2>
              <p className="mt-4 max-w-xl text-base md:text-lg text-secondary-foreground/80 leading-relaxed">Free to start. No ads. No outrage. Just thoughtful, useful guidance.</p>
            </div>
            <div className="pt-2 md:pt-0">
              <Link href="/signup"><Button className="rounded-full px-8 h-12 shadow-sm border border-secondary-foreground/20 text-secondary bg-secondary-foreground hover:bg-secondary-foreground/90">Create free account</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
