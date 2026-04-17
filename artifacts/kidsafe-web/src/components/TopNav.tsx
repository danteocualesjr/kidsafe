import { Link, useLocation } from "wouter";
import { Search, Menu, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopNav() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span className="font-serif text-3xl font-bold tracking-tight text-foreground">KidSafe</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-2 text-sm font-medium">
            <Link href="/" className={`px-4 py-2 rounded-full transition-all ${location === '/' ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              Home
            </Link>
            <Link href="/browse" className={`px-4 py-2 rounded-full transition-all ${location.startsWith('/browse') ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              Browse
            </Link>
            <Link href="/community" className={`px-4 py-2 rounded-full transition-all ${location.startsWith('/community') ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              Community
            </Link>
            <Link href="/assistant" className={`px-4 py-2 rounded-full transition-all ${location.startsWith('/assistant') ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              Assistant
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search films, books, places..."
              className="h-10 w-72 rounded-full border border-border bg-background/50 pl-10 pr-4 text-sm transition-all focus:w-80 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
            />
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-muted/50 hover:bg-muted">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 rounded-full">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
