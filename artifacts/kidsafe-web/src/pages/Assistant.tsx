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
    <div className="flex h-[calc(100vh-5rem)] flex-col bg-background">
      <header className="border-b border-border/40 bg-card py-6">
        <div className="container mx-auto flex items-center justify-center gap-4 px-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight">KidSafe Assistant</h1>
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mt-1">Honest, calm, contextual</p>
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-[length:200px_200px] relative">
        <div className="absolute inset-0 bg-background/95 backdrop-blur-[2px] mix-blend-overlay z-0"></div>
        <div className="container mx-auto max-w-4xl space-y-8 px-6 py-12 relative z-10">
          <AnimatePresence initial={false}>
            {messages.map(m => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-inner mt-2"><Bot className="h-5 w-5" /></div>
                )}
                <div className={`max-w-[85%] md:max-w-[75%] rounded-[2rem] px-8 py-6 shadow-md ${
                  m.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-sm" 
                    : "bg-card border border-border/40 rounded-tl-sm"
                }`}>
                  <p className={`whitespace-pre-line text-lg leading-relaxed font-medium ${m.role === 'user' ? 'text-white' : 'text-foreground/90'}`}>{m.text}</p>
                </div>
                {m.role === "user" && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-foreground text-background shadow-lg mt-2"><User className="h-5 w-5" /></div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-inner mt-2"><Bot className="h-5 w-5" /></div>
              <div className="rounded-[2rem] rounded-tl-sm border border-border/40 bg-card px-8 py-6 shadow-sm">
                <div className="flex gap-2">
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      className="h-2.5 w-2.5 rounded-full bg-primary"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {messages.length === 1 && (
            <div className="grid gap-4 pt-12 md:grid-cols-2">
              {STARTERS.map((s, i) => (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  key={s.k}
                  onClick={() => send(s.q, s.k)}
                  className="group rounded-[2rem] border border-border/40 bg-card p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
                >
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/50 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                    <Sparkles className="h-3.5 w-3.5" /> Starter question
                  </div>
                  <div className="font-serif text-xl font-bold leading-tight group-hover:text-primary transition-colors">{s.q}</div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border/40 bg-card py-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] z-20 relative">
        <div className="container mx-auto max-w-4xl px-6">
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-3 rounded-[2rem] border-2 border-border/50 bg-background p-2 shadow-inner focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300">
            <ShieldCheck className="ml-4 h-6 w-6 text-muted-foreground" />
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything about films, books, or parenting choices..."
              className="flex-1 bg-transparent px-3 py-4 text-lg font-medium outline-none placeholder:text-muted-foreground"
            />
            <Button type="submit" size="lg" className="rounded-full h-14 w-14 p-0 shadow-md shadow-primary/20"><Send className="h-5 w-5" /></Button>
          </form>
          <p className="mt-4 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">Responses are illustrative. Always trust your own knowledge of your kid.</p>
        </div>
      </div>
    </div>
  );
}
