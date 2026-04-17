import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Bot, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Msg = { id: string; role: "user" | "assistant"; text: string };

const STARTERS = [
  { q: "Is Stranger Things ok for my 10-year-old?", k: "stranger" },
  { q: "Recommend a book about feelings for a 6-year-old", k: "feelings" },
  { q: "Is Disneyland good for toddlers?", k: "disneyland" },
  { q: "How do I talk to my tween about online safety?", k: "online-safety" },
];

const KNOWN_RESPONSES: Record<string, string> = {
  stranger: `Most KidSafe parent reviewers and our editorial team suggest waiting on Stranger Things until at least age 11–12, even for mature kids.

Here's the nuance: the show isn't gratuitous, but it leans heavily on dread and body horror (the Demogorgon, the Mind Flayer, the Vecna sequences in season 4). The scariest moments are extended — they're meant to linger. Several parents in our community have reported sleep disturbances and increased anxiety in kids 10 and under, even those who handle other intense content well.

If you want to bridge the gap, our community recommends:
• "The Treehouse Detectives" — gentle mystery vibes
• "Ocean Song" — peril without dread
• Save Stranger Things for an 11th-birthday watch-along

Want me to suggest a few age-appropriate mystery picks instead?`,

  feelings: `For a 6-year-old, two books from our library would be excellent starting points:

"Today My Feelings Are Soup" by Robin Estevez — uses the metaphor of soup ingredients to help kids name complex emotions. Many parents tell us their child started narrating their own feelings in soup terms within a week.

"An Ode to Tomatoes (and Other Things)" by Selma Park — short joyful poems that gently model emotional vocabulary. Beautiful to read aloud at bedtime.

Both have safety scores of 100/100 in our system and zero content concerns.

Want a third pick that addresses a specific feeling — like worry, anger, or change?`,

  disneyland: `For toddlers (ages 2–4), Disneyland can be wonderful but requires planning. Here's the honest assessment from our community:

What works well:
• Fantasyland (slow, gentle rides like Casey Jr., King Arthur Carrousel)
• Character meet-and-greets in calmer areas
• "It's a Small World" (especially for sensory-friendly kids)
• Toon Town's open exploration spaces

What to skip with little ones:
• Anything in Adventureland (Pirates can frighten under-5s)
• Most fireworks shows (loud + late = meltdown)
• The Haunted Mansion until at least age 6

Practical tips parents repeat:
• Mid-week visits, mornings only
• Rope drop and leave by 1pm
• Rider Switch is a lifesaver for parents

Want a category-specific guide — like sensory-friendly attractions or dining picks?`,

  "online-safety": `The conversation is best framed as a "public street" rather than "stranger danger." Tweens respond well when you treat it as adult-style awareness rather than child-style fear.

A framework many parents in our community have used successfully:

1. The car analogy. "Don't get in a stranger's DM, just like you wouldn't get in their car. Same rules. Same instincts."

2. The newspaper test. "If a screenshot of this conversation ended up on the front page of the school newspaper, would you be okay with that?"

3. Weekly "tech tea." Set aside 20 minutes a week to look at their phone together, not as surveillance but as routine. Start before they have a phone if possible.

4. The 3-second pause. Teach the habit: before sending anything, count to three.

Avoid: scare tactics about kidnappers (rare and erodes trust), surprise inspections (creates secrecy), or banning specific platforms (drives them to private alternatives you don't see).

Need help with a specific concern — group chat drama, screen time limits, or a particular app?`,
};

const GENERIC_RESPONSE = `That's a great question, and KidSafe's community has discussed similar situations. Here's a thoughtful take:

The right answer almost always depends on three things — your child's specific age and temperament, the context of when and where they'll engage with the content, and what conversation you're prepared to have afterward. Generic ratings can be misleading because they treat all kids the same.

A few starting principles our editorial team uses:

• Preview the first 10–15 minutes if it's a film. Tone is set early.
• Co-watch (or co-read) the first time when possible. After that, you have shared vocabulary.
• Trust the slow no. If your gut says "not yet," the content will still be there in six months.
• Watch your child during the experience, not just the screen. Their reaction is more diagnostic than any rating.

Want me to suggest specific titles based on your child's age or interests? Just give me a little more context — age, sensitivities, what they've enjoyed before — and I'll point you to KidSafe-vetted picks.`;

export default function Assistant() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: "intro", role: "assistant", text: "Hi! I'm your KidSafe assistant. I've read every parent review, editorial breakdown, and community thread on our platform. Ask me anything — from 'is X okay for my kid' to 'how do I bring this up at dinner'." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string, key?: string) {
    if (!text.trim()) return;
    const userMsg: Msg = { id: Date.now() + "u", role: "user", text };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = key && KNOWN_RESPONSES[key] ? KNOWN_RESPONSES[key] : GENERIC_RESPONSE;
      setMessages(m => [...m, { id: Date.now() + "a", role: "assistant", text: reply }]);
      setTyping(false);
    }, 1500);
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-gradient-to-br from-accent/20 via-background to-background">
      <header className="border-b bg-card/80 backdrop-blur">
        <div className="container mx-auto flex items-center gap-3 px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold">KidSafe Assistant</h1>
            <p className="text-xs text-muted-foreground">Trained on every review · Honest, calm, contextual</p>
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-3xl space-y-6 px-4 py-8">
          <AnimatePresence initial={false}>
            {messages.map(m => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Bot className="h-4 w-4" /></div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border"}`}>
                  <p className="whitespace-pre-line text-sm leading-relaxed">{m.text}</p>
                </div>
                {m.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/30 text-secondary-foreground"><User className="h-4 w-4" /></div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Bot className="h-4 w-4" /></div>
              <div className="rounded-2xl border bg-card px-5 py-3.5">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="h-2 w-2 rounded-full bg-primary"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {messages.length === 1 && (
            <div className="grid gap-2 pt-4 sm:grid-cols-2">
              {STARTERS.map(s => (
                <button
                  key={s.k}
                  onClick={() => send(s.q, s.k)}
                  className="rounded-2xl border bg-card p-4 text-left text-sm transition-all hover-elevate"
                >
                  <div className="mb-2 inline-flex items-center gap-1.5 text-xs text-primary"><Sparkles className="h-3 w-3" /> Starter</div>
                  <div className="font-medium">{s.q}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t bg-card/80 backdrop-blur">
        <div className="container mx-auto max-w-3xl px-4 py-4">
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 rounded-full border bg-background p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-primary/30">
            <ShieldCheck className="ml-3 h-4 w-4 text-muted-foreground" />
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything about films, books, or parenting choices..."
              className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <Button type="submit" className="rounded-full"><Send className="h-4 w-4" /></Button>
          </form>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">Responses are illustrative. Always trust your own knowledge of your kid.</p>
        </div>
      </div>
    </div>
  );
}
