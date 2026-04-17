import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const } }
};

export default function Login() {
  const [, setLocation] = useLocation();
  return (
    <div className="grid min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_560px] bg-background">
      <div className="hidden lg:flex flex-col justify-between bg-secondary p-12 md:p-16 text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
        <Link href="/" className="inline-flex items-center gap-2.5 relative z-10 w-fit">
          <div className="bg-white p-2 rounded-xl shadow-sm text-secondary"><ShieldCheck className="h-6 w-6" /></div>
          <span className="font-serif text-2xl font-medium text-white">KidSafe</span>
        </Link>
        <div className="relative z-10 max-w-md">
          <h2 className="font-serif text-4xl font-medium leading-[1.15] text-white mb-6 md:text-5xl">Calmer choices for the parents who care most.</h2>
          <p className="text-lg leading-relaxed text-white/80">Join 240,000+ families using KidSafe to make confident decisions about what their kids watch, read, and explore.</p>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-white/50 relative z-10">© KidSafe — built by parents, for parents.</div>
      </div>
      
      <div className="flex items-center justify-center p-6 md:p-12 border-l border-border bg-card">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="w-full max-w-sm space-y-8">
          <div className="text-center lg:text-left">
            <Link href="/" className="lg:hidden inline-flex items-center gap-2 justify-center mb-6">
              <div className="bg-secondary p-1.5 rounded-lg text-secondary-foreground"><ShieldCheck className="h-5 w-5" /></div>
              <span className="font-serif text-xl font-medium text-foreground">KidSafe</span>
            </Link>
            <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to your KidSafe account.</p>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); setLocation("/dashboard"); }} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="email" required defaultValue="parent@kidsafe.app" className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="password" required defaultValue="demopassword" className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
            </div>
            
            <div className="pt-2">
              <Button type="submit" className="w-full rounded-full h-11 text-sm font-medium">Sign in to KidSafe</Button>
            </div>
          </form>
          
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
          </div>
          
          <Button variant="outline" className="w-full rounded-full h-11 text-sm font-medium bg-background">Continue with Google</Button>
          
          <p className="text-center text-sm text-muted-foreground">
            New to KidSafe? <Link href="/signup" className="font-medium text-primary hover:underline underline-offset-2 decoration-1">Create an account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
