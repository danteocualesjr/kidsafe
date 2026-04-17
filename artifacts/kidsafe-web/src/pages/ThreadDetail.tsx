import { useRoute, Link } from "wouter";
import { ArrowLeft, Heart, MessageCircle, Send } from "lucide-react";
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
    <div className="container mx-auto max-w-3xl px-4 py-12 pb-24">
      <Link href="/community" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to community
      </Link>
      <div className="mb-2 flex items-center gap-2 text-xs">
        <span className="rounded-full bg-accent px-2.5 py-0.5 font-medium text-accent-foreground">{t.category}</span>
        <span className="text-muted-foreground">{t.lastActivity}</span>
      </div>
      <h1 className="mb-6 font-serif text-3xl font-bold leading-tight md:text-4xl">{t.title}</h1>
      <div className="mb-8 rounded-2xl border bg-card p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${authorGrad} flex items-center justify-center text-white text-sm font-bold`}>{initials(t.author)}</div>
          <div>
            <div className="text-sm font-semibold">{t.author}</div>
            <div className="text-xs text-muted-foreground">Original post</div>
          </div>
        </div>
        <p className="text-base leading-relaxed text-foreground/90">{t.content}</p>
        <div className="mt-5 flex items-center gap-4 text-sm text-muted-foreground border-t pt-4">
          <button className="inline-flex items-center gap-1.5 hover:text-rose-500"><Heart className="h-4 w-4" /> {t.likes}</button>
          <span className="inline-flex items-center gap-1.5"><MessageCircle className="h-4 w-4" /> {t.replies} replies</span>
        </div>
      </div>

      <h2 className="mb-4 font-serif text-xl font-bold">Replies</h2>
      <div className="space-y-3">
        {t.comments.map(c => {
          const grad = GRADIENTS[c.author.charCodeAt(0) % GRADIENTS.length];
          return (
            <article key={c.id} className="rounded-2xl border bg-card p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center text-white text-xs font-bold`}>{initials(c.author)}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{c.author}</div>
                  <div className="text-xs text-muted-foreground">{c.date}</div>
                </div>
                <button className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-500"><Heart className="h-3.5 w-3.5" /> {c.likes}</button>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">{c.content}</p>
            </article>
          );
        })}
      </div>

      <form onSubmit={e => e.preventDefault()} className="mt-8 rounded-2xl border bg-card p-4">
        <textarea
          rows={3}
          placeholder="Add a kind, helpful reply..."
          className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <div className="mt-3 flex justify-between items-center text-xs text-muted-foreground">
          <span>Be kind. Be specific. Cite if you can.</span>
          <Button type="submit" size="sm" className="rounded-full"><Send className="mr-1.5 h-3.5 w-3.5" /> Reply</Button>
        </div>
      </form>
    </div>
  );
}
