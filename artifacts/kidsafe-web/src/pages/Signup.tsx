import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Signup() {
  const [, setLocation] = useLocation();
  return (
    <div className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-secondary via-secondary/95 to-emerald-800 p-16 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] mix-blend-overlay"></div>
        <Link href="/" className="inline-flex items-center gap-3 relative z-10">
          <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm"><ShieldCheck className="h-8 w-8 text-white" /></div>
          <span className="font-serif text-4xl font-bold text-white">KidSafe</span>
        </Link>
        <div className="relative z-10 max-w-lg">
          <h2 className="font-serif text-5xl font-bold leading-tight text-white mb-8">Start with a free account.</h2>
          <ul className="space-y-5 text-xl font-medium text-white/90">
            <li className="flex items-center gap-4"><span className="h-2 w-2 rounded-full bg-white opacity-50" /> Add up to 4 kid profiles</li>
            <li className="flex items-center gap-4"><span className="h-2 w-2 rounded-full bg-white opacity-50" /> Personalized weekly picks</li>
            <li className="flex items-center gap-4"><span className="h-2 w-2 rounded-full bg-white opacity-50" /> Save watchlists and reading lists</li>
            <li className="flex items-center gap-4"><span className="h-2 w-2 rounded-full bg-white opacity-50" /> Full community access</li>
          </ul>
        </div>
        <div className="text-sm font-bold uppercase tracking-widest text-white/70 relative z-10">No credit card. Cancel anytime.</div>
      </div>
      
      <div className="flex items-center justify-center px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }} className="w-full max-w-md space-y-10">
          <div className="text-center lg:text-left">
            <h1 className="font-serif text-4xl font-bold tracking-tight">Create account</h1>
            <p className="mt-3 text-lg text-muted-foreground font-medium">Join our community in less than a minute.</p>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); setLocation("/dashboard"); }} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Your name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input type="text" required defaultValue="Alex Parent" className="h-14 w-full rounded-2xl border-2 border-border/50 bg-card pl-12 pr-4 text-base font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input type="email" required defaultValue="alex@example.com" className="h-14 w-full rounded-2xl border-2 border-border/50 bg-card pl-12 pr-4 text-base font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm" />
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
              <Button type="submit" size="lg" className="w-full rounded-full h-14 text-lg font-bold shadow-lg shadow-primary/20">Create free account</Button>
            </div>
          </form>
          
          <p className="text-center text-base font-medium text-muted-foreground">
            Already have an account? <Link href="/login" className="font-bold text-primary hover:underline underline-offset-4 decoration-2">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
