import { Link } from "wouter";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-white p-1 rounded-lg">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="font-serif text-xl font-bold">KidSafe</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering parents with detailed, objective safety reviews for films, books, and places. Making family decisions calmer and easier.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Discover</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/browse" className="hover:text-primary">All Films</Link></li>
              <li><Link href="/browse" className="hover:text-primary">Books</Link></li>
              <li><Link href="/browse" className="hover:text-primary">Places & Activities</Link></li>
              <li><Link href="/browse" className="hover:text-primary">Trending Now</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/community" className="hover:text-primary">Parent Forum</Link></li>
              <li><Link href="/community" className="hover:text-primary">Tip of the Day</Link></li>
              <li><Link href="/community" className="hover:text-primary">Guidelines</Link></li>
              <li><Link href="/assistant" className="hover:text-primary">AI Assistant</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">Our Mission</Link></li>
              <li><Link href="/about" className="hover:text-primary">How We Review</Link></li>
              <li><Link href="/about" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/about" className="hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} KidSafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
