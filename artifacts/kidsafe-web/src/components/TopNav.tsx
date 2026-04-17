import { Link, useLocation } from "wouter";
import { Search, Menu, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopNav() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-6">
        <div className="flex items-center gap-8 lg:gap-12">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">KidSafe</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1.5 text-sm font-medium">
            {[
              { href: "/", label: "Home" },
              { href: "/browse", label: "Browse" },
              { href: "/community", label: "Community" },
              { href: "/assistant", label: "Assistant" }
            ].map(({ href, label }) => {
              const active = href === "/" ? location === "/" : location.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    active 
                      ? 'bg-foreground text-background font-semibold' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="h-9 w-64 rounded-full border border-border bg-card pl-9 pr-4 text-sm transition-all focus:w-72 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
            />
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-muted/50 hover:bg-muted">
              <User className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9 rounded-full">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
