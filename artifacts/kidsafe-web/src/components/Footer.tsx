import { Link } from "wouter";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card py-12 md:py-16 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-16">
          <div className="space-y-6 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="font-serif text-xl font-semibold tracking-tight text-foreground">KidSafe</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Empowering parents with detailed, objective safety reviews. Making family decisions calmer and easier.
            </p>
          </div>
          
          <div>
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-muted-foreground mb-5">Discover</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/browse" className="text-foreground/80 hover:text-primary transition-colors">Films</Link></li>
              <li><Link href="/browse" className="text-foreground/80 hover:text-primary transition-colors">Books</Link></li>
              <li><Link href="/browse" className="text-foreground/80 hover:text-primary transition-colors">Games</Link></li>
              <li><Link href="/browse" className="text-foreground/80 hover:text-primary transition-colors">Places & Activities</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-muted-foreground mb-5">Community</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/community" className="text-foreground/80 hover:text-primary transition-colors">Parent Forum</Link></li>
              <li><Link href="/assistant" className="text-foreground/80 hover:text-primary transition-colors">AI Assistant</Link></li>
              <li><Link href="/community" className="text-foreground/80 hover:text-primary transition-colors">Guidelines</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-muted-foreground mb-5">About</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/about" className="text-foreground/80 hover:text-primary transition-colors">Our Mission</Link></li>
              <li><Link href="/about" className="text-foreground/80 hover:text-primary transition-colors">How We Review</Link></li>
              <li><span className="text-foreground/80 hover:text-primary transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="text-foreground/80 hover:text-primary transition-colors cursor-pointer">Terms of Service</span></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 md:mt-16 border-t border-border/60 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-medium">
            © {new Date().getFullYear()} KidSafe. All rights reserved.
          </p>
          <div className="text-xs text-muted-foreground font-medium">
            Built by parents, for parents.
          </div>
        </div>
      </div>
    </footer>
  );
}
