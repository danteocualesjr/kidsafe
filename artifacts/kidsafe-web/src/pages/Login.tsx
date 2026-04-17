import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [, setLocation] = useLocation();
  return (
    <div className="grid min-h-[calc(100vh-4rem)] md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-primary via-primary/90 to-secondary p-12 text-primary-foreground">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded-lg"><ShieldCheck className="h-5 w-5" /></div>
          <span className="font-serif text-2xl font-bold">KidSafe</span>
        </Link>
        <div>
          <h2 className="font-serif text-4xl font-bold leading-tight">Calmer choices for the parents who care most.</h2>
          <p className="mt-4 max-w-md text-lg opacity-90">Join 240,000+ families using KidSafe to make confident decisions about what their kids watch, read, and explore.</p>
        </div>
        <div className="text-sm opacity-80">© KidSafe — built by parents, for parents.</div>
      </div>
      <div className="flex items-center justify-center px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-6">
          <div>
            <h1 className="font-serif text-3xl font-bold">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to your KidSafe account.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setLocation("/dashboard"); }} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input type="email" required defaultValue="parent@kidsafe.app" className="h-11 w-full rounded-xl border bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input type="password" required defaultValue="demopassword" className="h-11 w-full rounded-xl border bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <Button type="submit" className="w-full rounded-full">Sign in</Button>
          </form>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
          </div>
          <Button variant="outline" className="w-full rounded-full">Continue with Google</Button>
          <p className="text-center text-sm text-muted-foreground">
            New to KidSafe? <Link href="/signup" className="font-semibold text-primary hover:underline">Create an account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
