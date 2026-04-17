import { useRoute, Link } from "wouter";
import { ArrowLeft, Heart, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { getThread } from "@/data/community";
import { Button } from "@/components/ui/button";
import NotFound from "./not-found";

const GRADIENTS = [
  "from-primary/80 to-primary/60",
  "from-secondary/80 to-secondary/60",
  "from-blue-500/80 to-blue-400/60",
  "from-amber-500/80 to-amber-400/60",
  "from-emerald-500/80 to-emerald-400/60",
];
const initials = (n: string) => n.split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase();

export default function ThreadDetail() {
  const [, params] = useRoute("/community/:id");
  const t = params ? getThread(params.id) : undefined;
  if (!t) return <NotFound />;
  const authorGrad = GRADIENTS[t.author.charCodeAt(0) % GRADIENTS.length];

  return (
    <div className="bg-background min-h-screen pb-24 md:pb-32">
      <div className="border-b border-border bg-accent/10 pt-10 pb-8">
        <div className="container mx-auto max-w-3xl px-6">
          <Link href="/community" className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to community
          </Link>
          
          <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
            <span className="rounded border border-border bg-background px-2 py-0.5 text-foreground/80">{t.category}</span>
            <span className="text-muted-foreground">{t.lastActivity}</span>
          </div>
          <h1 className="font-serif text-3xl font-medium leading-[1.1] md:text-4xl lg:text-5xl mb-6 text-foreground">{t.title}</h1>
          
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${authorGrad} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>{initials(t.author)}</div>
              <div>
                <div className="text-sm font-medium flex items-center gap-1.5 text-foreground">
                  {t.author}
                  <ShieldCheck className="h-3 w-3 text-primary" />
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">Original post</div>
              </div>
            </div>
            <p className="text-base leading-relaxed text-foreground/90">{t.content}</p>
            <div className="mt-6 flex items-center gap-4 text-sm font-medium text-muted-foreground border-t border-border pt-4">
              <button className="inline-flex items-center gap-1.5 hover:text-rose-500 transition-colors"><Heart className="h-4 w-4" /> {t.likes} likes</button>
              <span className="inline-flex items-center gap-1.5"><MessageCircle className="h-4 w-4" /> {t.replies} replies</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-6 pt-10">
        <h2 className="mb-6 font-serif text-2xl font-medium text-foreground">Replies</h2>
        <div className="space-y-4">
          {t.comments.map(c => {
            const grad = GRADIENTS[c.author.charCodeAt(0) % GRADIENTS.length];
            return (
              <article key={c.id} className="rounded-2xl border border-border bg-card p-5 md:p-6 transition-all hover:shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>{initials(c.author)}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium flex items-center gap-1.5 text-foreground">
                      {c.author}
                      <ShieldCheck className="h-3 w-3 text-primary opacity-60" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{c.date}</div>
                  </div>
                  <button className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-rose-500 transition-colors bg-muted/50 px-2 py-1 rounded-md border border-border"><Heart className="h-3 w-3" /> {c.likes}</button>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">{c.content}</p>
              </article>
            );
          })}
        </div>

        <form onSubmit={e => e.preventDefault()} className="mt-8 rounded-2xl border border-border bg-card p-5 focus-within:border-primary/50 transition-all duration-300">
          <textarea
            rows={3}
            placeholder="Add a kind, helpful reply..."
            className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground p-1 text-foreground"
          />
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border pt-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Be kind. Be specific. Cite if you can.</span>
            <Button type="submit" size="sm" className="rounded-full px-5"><Send className="mr-1.5 h-3 w-3" /> Post reply</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
