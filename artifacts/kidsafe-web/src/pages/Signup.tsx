import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Signup() {
  const [, setLocation] = useLocation();
  return (
    <div className="grid min-h-[calc(100vh-4rem)] md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-secondary via-secondary/90 to-primary p-12 text-secondary-foreground">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded-lg"><ShieldCheck className="h-5 w-5" /></div>
          <span className="font-serif text-2xl font-bold">KidSafe</span>
        </Link>
        <div>
          <h2 className="font-serif text-4xl font-bold leading-tight">Start with a free account.</h2>
          <ul className="mt-6 space-y-3 text-base opacity-90">
            <li>· Add up to 4 kid profiles</li>
            <li>· Personalized weekly picks</li>
            <li>· Save watchlists and reading lists</li>
            <li>· Full community access</li>
          </ul>
        </div>
        <div className="text-sm opacity-80">No credit card. Cancel anytime.</div>
      </div>
      <div className="flex items-center justify-center px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-6">
          <div>
            <h1 className="font-serif text-3xl font-bold">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Takes less than a minute.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setLocation("/dashboard"); }} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input type="text" required defaultValue="Alex Parent" className="h-11 w-full rounded-xl border bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input type="email" required defaultValue="alex@example.com" className="h-11 w-full rounded-xl border bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input type="password" required defaultValue="demopassword" className="h-11 w-full rounded-xl border bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <Button type="submit" className="w-full rounded-full">Create account</Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
