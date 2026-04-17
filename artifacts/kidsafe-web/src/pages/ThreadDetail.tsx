import { useRoute, Link } from "wouter";
import { ArrowLeft, Heart, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { getThread } from "@/data/community";
import { Button } from "@/components/ui/button";
import NotFound from "./not-found";

const GRADIENTS = ["from-rose-400 to-orange-300","from-emerald-400 to-teal-300","from-violet-400 to-indigo-300","from-amber-400 to-yellow-300","from-sky-400 to-cyan-300"];
const initials = (n: string) => n.split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase();

export default function ThreadDetail() {
  const [, params] = useRoute("/community/:id");
  const t = params ? getThread(params.id) : undefined;
  if (!t) return <NotFound />;
  const authorGrad = GRADIENTS[t.author.charCodeAt(0) % GRADIENTS.length];

  return (
    <div className="bg-background min-h-screen pb-32">
      <div className="border-b border-border/40 bg-gradient-to-br from-accent/20 via-background to-background pt-12 pb-8">
        <div className="container mx-auto max-w-4xl px-6">
          <Link href="/community" className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to community
          </Link>
          
          <div className="mb-6 flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
            <span className="rounded-full bg-accent/60 px-4 py-1.5 text-accent-foreground">{t.category}</span>
            <span className="text-muted-foreground">{t.lastActivity}</span>
          </div>
          <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-8">{t.title}</h1>
          
          <div className="rounded-[2.5rem] border border-border/40 bg-card p-8 md:p-10 shadow-xl shadow-primary/5">
            <div className="mb-6 flex items-center gap-4">
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${authorGrad} flex items-center justify-center text-white text-lg font-bold shadow-sm`}>{initials(t.author)}</div>
              <div>
                <div className="text-lg font-bold flex items-center gap-2">
                  {t.author}
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>
                <div className="text-sm font-medium text-muted-foreground">Original post</div>
              </div>
            </div>
            <p className="text-xl leading-relaxed text-foreground/90 font-medium">{t.content}</p>
            <div className="mt-8 flex items-center gap-6 text-base font-bold text-muted-foreground border-t border-border/40 pt-6">
              <button className="inline-flex items-center gap-2 hover:text-rose-500 transition-colors"><Heart className="h-5 w-5" /> {t.likes} likes</button>
              <span className="inline-flex items-center gap-2"><MessageCircle className="h-5 w-5" /> {t.replies} replies</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-6 pt-16">
        <h2 className="mb-8 font-serif text-3xl font-bold">Replies</h2>
        <div className="space-y-6">
          {t.comments.map(c => {
            const grad = GRADIENTS[c.author.charCodeAt(0) % GRADIENTS.length];
            return (
              <article key={c.id} className="rounded-[2rem] border border-border/40 bg-card p-8 transition-all hover:shadow-md">
                <div className="mb-5 flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center text-white text-base font-bold shadow-sm`}>{initials(c.author)}</div>
                  <div className="flex-1">
                    <div className="text-base font-bold flex items-center gap-2">
                      {c.author}
                      <ShieldCheck className="h-3.5 w-3.5 text-primary opacity-60" />
                    </div>
                    <div className="text-sm font-medium text-muted-foreground mt-0.5">{c.date}</div>
                  </div>
                  <button className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-rose-500 transition-colors bg-background px-4 py-2 rounded-xl border border-border/50"><Heart className="h-4 w-4" /> {c.likes}</button>
                </div>
                <p className="text-lg leading-relaxed text-foreground/90 font-medium">{c.content}</p>
              </article>
            );
          })}
        </div>

        <form onSubmit={e => e.preventDefault()} className="mt-12 rounded-[2rem] border-2 border-primary/20 bg-primary/5 p-6 shadow-inner focus-within:border-primary/50 focus-within:bg-card transition-all duration-300">
          <textarea
            rows={4}
            placeholder="Add a kind, helpful reply..."
            className="w-full resize-none bg-transparent text-lg font-medium outline-none placeholder:text-muted-foreground p-2"
          />
          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-border/40 pt-4">
            <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Be kind. Be specific. Cite if you can.</span>
            <Button type="submit" size="lg" className="rounded-full px-8 text-base font-bold shadow-md shadow-primary/20"><Send className="mr-2 h-4 w-4" /> Post reply</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
