import { Link } from "wouter";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-16">
          <div className="space-y-6 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <span className="font-serif text-3xl font-bold tracking-tight text-foreground">KidSafe</span>
            </Link>
            <p className="text-base text-muted-foreground leading-relaxed max-w-sm">
              Empowering parents with detailed, objective safety reviews for films, books, and places. Making family decisions calmer and easier.
            </p>
          </div>
          
          <div>
            <h3 className="font-sans text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-6">Discover</h3>
            <ul className="space-y-4 text-base font-medium">
              <li><Link href="/browse" className="text-foreground/80 hover:text-primary transition-colors">All Films</Link></li>
              <li><Link href="/browse" className="text-foreground/80 hover:text-primary transition-colors">Books</Link></li>
              <li><Link href="/browse" className="text-foreground/80 hover:text-primary transition-colors">Places & Activities</Link></li>
              <li><Link href="/browse" className="text-foreground/80 hover:text-primary transition-colors">Trending Now</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-sans text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-6">Community</h3>
            <ul className="space-y-4 text-base font-medium">
              <li><Link href="/community" className="text-foreground/80 hover:text-primary transition-colors">Parent Forum</Link></li>
              <li><Link href="/community" className="text-foreground/80 hover:text-primary transition-colors">Tip of the Day</Link></li>
              <li><Link href="/community" className="text-foreground/80 hover:text-primary transition-colors">Guidelines</Link></li>
              <li><Link href="/assistant" className="text-foreground/80 hover:text-primary transition-colors">AI Assistant</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-sans text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-6">About</h3>
            <ul className="space-y-4 text-base font-medium">
              <li><Link href="/about" className="text-foreground/80 hover:text-primary transition-colors">Our Mission</Link></li>
              <li><Link href="/about" className="text-foreground/80 hover:text-primary transition-colors">How We Review</Link></li>
              <li><Link href="/about" className="text-foreground/80 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/about" className="text-foreground/80 hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 md:mt-24 border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-medium">
            © {new Date().getFullYear()} KidSafe. All rights reserved.
          </p>
          <div className="text-sm text-muted-foreground font-medium">
            Built by parents, for parents.
          </div>
        </div>
      </div>
    </footer>
  );
}
