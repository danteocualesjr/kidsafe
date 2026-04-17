import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [, setLocation] = useLocation();
  return (
    <div className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary via-primary/95 to-primary-foreground p-16 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] mix-blend-overlay"></div>
        <Link href="/" className="inline-flex items-center gap-3 relative z-10">
          <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm"><ShieldCheck className="h-8 w-8 text-white" /></div>
          <span className="font-serif text-4xl font-bold text-white">KidSafe</span>
        </Link>
        <div className="relative z-10 max-w-lg">
          <h2 className="font-serif text-5xl font-bold leading-tight text-white mb-6">Calmer choices for the parents who care most.</h2>
          <p className="text-xl leading-relaxed text-white/90 font-medium">Join 240,000+ families using KidSafe to make confident decisions about what their kids watch, read, and explore.</p>
        </div>
        <div className="text-sm font-bold uppercase tracking-widest text-white/70 relative z-10">© KidSafe — built by parents, for parents.</div>
      </div>
      
      <div className="flex items-center justify-center px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }} className="w-full max-w-md space-y-10">
          <div className="text-center lg:text-left">
            <h1 className="font-serif text-4xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-3 text-lg text-muted-foreground font-medium">Sign in to your KidSafe account.</p>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); setLocation("/dashboard"); }} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input type="email" required defaultValue="parent@kidsafe.app" className="h-14 w-full rounded-2xl border-2 border-border/50 bg-card pl-12 pr-4 text-base font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input type="password" required defaultValue="demopassword" className="h-14 w-full rounded-2xl border-2 border-border/50 bg-card pl-12 pr-4 text-base font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm" />
              </div>
            </div>
            
            <div className="pt-2">
              <Button type="submit" size="lg" className="w-full rounded-full h-14 text-lg font-bold shadow-lg shadow-primary/20">Sign in to KidSafe</Button>
            </div>
          </form>
          
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <div className="h-px flex-1 bg-border/60" /> OR <div className="h-px flex-1 bg-border/60" />
          </div>
          
          <Button variant="outline" size="lg" className="w-full rounded-full h-14 text-base font-bold border-2 shadow-sm">Continue with Google</Button>
          
          <p className="text-center text-base font-medium text-muted-foreground">
            New to KidSafe? <Link href="/signup" className="font-bold text-primary hover:underline underline-offset-4 decoration-2">Create an account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
