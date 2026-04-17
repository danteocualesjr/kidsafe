import { Link, useLocation } from "wouter";
import { Search, Menu, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopNav() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-white p-1.5 rounded-lg">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-foreground">KidSafe</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link href="/" className={`px-3 py-2 rounded-md transition-colors ${location === '/' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}>
              Home
            </Link>
            <Link href="/browse" className={`px-3 py-2 rounded-md transition-colors ${location.startsWith('/browse') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}>
              Browse
            </Link>
            <Link href="/community" className={`px-3 py-2 rounded-md transition-colors ${location.startsWith('/community') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}>
              Community
            </Link>
            <Link href="/assistant" className={`px-3 py-2 rounded-md transition-colors ${location.startsWith('/assistant') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}>
              AI Assistant
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search films, books..."
              className="h-9 w-64 rounded-full border border-input bg-background pl-9 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
