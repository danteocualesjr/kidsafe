import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Bot, ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Msg = { id: string; role: "user" | "assistant"; text: string; alert?: string };

const STARTERS = [
  { q: "Is Stranger Things ok for my 10-year-old?", k: "stranger" },
  { q: "Recommend a book about feelings for a 6-year-old", k: "feelings" },
  { q: "Is Disneyland good for toddlers?", k: "disneyland" },
  { q: "How do I talk to my tween about online safety?", k: "online-safety" },
];

const KNOWN_RESPONSES: Record<string, { text: string; alert?: string }> = {
  stranger: {
    text: `Most KidSafe parent reviewers and our editorial team suggest waiting on Stranger Things until at least age 11–12, even for mature kids.

Here's the nuance: the show isn't gratuitous, but it leans heavily on dread and body horror (the Demogorgon, the Mind Flayer, the Vecna sequences in season 4). The scariest moments are extended — they're meant to linger. Several parents in our community have reported sleep disturbances and increased anxiety in kids 10 and under, even those who handle other intense content well.

If you want to bridge the gap, our community recommends:
• "The Treehouse Detectives" — gentle mystery vibes
• "Ocean Song" — peril without dread
• Save Stranger Things for an 11th-birthday watch-along

Want me to suggest a few age-appropriate mystery picks instead?`,
    alert:
      "Common triggers at age 10: extended dread, body horror, and sustained jumpscares. Stranger Things features all three prominently.",
  },
  feelings: {
    text: `For a 6-year-old, two books from our library would be excellent starting points:

"Today My Feelings Are Soup" by Robin Estevez — uses the metaphor of soup ingredients to help kids name complex emotions. Many parents tell us their child started narrating their own feelings in soup terms within a week.

"An Ode to Tomatoes (and Other Things)" by Selma Park — short joyful poems that gently model emotional vocabulary. Beautiful to read aloud at bedtime.

Both have safety scores of 100/100 in our system and zero content concerns.

Want a third pick that addresses a specific feeling — like worry, anger, or change?`,
  },
  disneyland: {
    text: `For toddlers (ages 2–4), Disneyland can be wonderful but requires planning. Here's the honest assessment from our community:

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
    alert:
      "Toddler heads-up: fireworks and Pirates of the Caribbean are common meltdown triggers for kids under 5.",
  },
  "online-safety": {
    text: `The conversation is best framed as a "public street" rather than "stranger danger." Tweens respond well when you treat it as adult-style awareness rather than child-style fear.

A framework many parents in our community have used successfully:

1. The car analogy. "Don't get in a stranger's DM, just like you wouldn't get in their car. Same rules. Same instincts."

2. The newspaper test. "If a screenshot of this conversation ended up on the front page of the school newspaper, would you be okay with that?"

3. Weekly "tech tea." Set aside 20 minutes a week to look at their phone together, not as surveillance but as routine. Start before they have a phone if possible.

4. The 3-second pause. Teach the habit: before sending anything, count to three.

Avoid: scare tactics about kidnappers (rare and erodes trust), surprise inspections (creates secrecy), or banning specific platforms (drives them to private alternatives you don't see).

Need help with a specific concern — group chat drama, screen time limits, or a particular app?`,
  },
};

const GENERIC_RESPONSE = `That's a great question, and KidSafe's community has discussed similar situations. Here's a thoughtful take:

The right answer almost always depends on three things — your child's specific age and temperament, the context of when and where they'll engage with the content, and what conversation you're prepared to have afterward. Generic ratings can be misleading because they treat all kids the same.

A few starting principles our editorial team uses:

• Preview the first 10–15 minutes if it's a film. Tone is set early.
• Co-watch (or co-read) the first time when possible. After that, you have shared vocabulary.
• Trust the slow no. If your gut says "not yet," the content will still be there in six months.
• Watch your child during the experience, not just the screen. Their reaction is more diagnostic than any rating.

Want me to suggest specific titles based on your child's age or interests? Just give me a little more context — age, sensitivities, what they've enjoyed before — and I'll point you to KidSafe-vetted picks.`;

const QUICK_PROMPTS = [
  '"Is Finding Nemo okay for a 4-year-old?"',
  '"Top rated educational books for age 7"',
  '"Best co-op games for siblings ages 6 and 9"',
];

export default function Assistant() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "intro",
      role: "assistant",
      text:
        "Hi! I'm your KidSafe assistant. I've read every parent review, editorial breakdown, and community thread on our platform. Ask me anything — from 'is X okay for my kid' to 'how do I bring this up at dinner'.",
    },
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
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const known = key ? KNOWN_RESPONSES[key] : undefined;
      const reply: Msg = {
        id: Date.now() + "a",
        role: "assistant",
        text: known?.text ?? GENERIC_RESPONSE,
        alert: known?.alert,
      };
      setMessages((m) => [...m, reply]);
      setTyping(false);
    }, 1500);
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background md:h-[calc(100vh-5rem)]">
      {/* Sidebar — quick prompts */}
      <aside className="hidden w-72 shrink-0 flex-col border-r border-border/60 bg-card p-6 lg:flex">
        <div className="mb-6">
          <h2 className="font-serif text-lg font-extrabold tracking-tight text-primary">
            Guardian Controls
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">Refine content safety</p>
        </div>

        <nav className="space-y-1">
          {[
            { label: "Safety Filters" },
            { label: "Age Ranges" },
            { label: "Themes" },
            { label: "Thresholds" },
            { label: "Saved" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-all hover:bg-muted/60 hover:text-primary"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <Button className="mt-6 w-full rounded-2xl shadow-lg shadow-primary/20">
          Apply Filters
        </Button>

        <div className="mt-auto pt-8">
          <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Quick Prompts
            </h3>
            <div className="space-y-2">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p.replace(/^"|"$/g, ""))}
                  className="block w-full rounded-lg bg-card p-2 text-left text-xs font-medium text-primary transition-colors hover:bg-secondary/15"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main chat */}
      <main className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6 lg:px-8">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="mb-1 font-serif text-3xl font-extrabold tracking-tight text-primary">
              KidSafe AI Guide
            </h1>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              <p className="text-sm text-muted-foreground">
                Active &amp; monitoring content safety
              </p>
            </div>
          </div>
          <div className="hidden sm:flex">
            <span className="rounded-full bg-accent px-4 py-2 text-xs font-bold text-accent-foreground">
              Safety Level: Premium
            </span>
          </div>
        </header>

        {/* Conversation */}
        <div ref={scrollRef} className="flex-1 space-y-6 overflow-y-auto pb-32">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "items-start gap-4"}`}
              >
                {m.role === "assistant" && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <Bot className="h-5 w-5" />
                  </div>
                )}

                {m.role === "user" ? (
                  <div className="max-w-[80%] rounded-t-3xl rounded-bl-3xl bg-primary px-6 py-4 text-primary-foreground shadow-sm">
                    <p className="whitespace-pre-line text-sm leading-relaxed">{m.text}</p>
                  </div>
                ) : (
                  <div className="max-w-[85%] space-y-4">
                    <div className="rounded-t-3xl rounded-br-3xl border border-border/60 bg-card px-6 py-5 shadow-sm">
                      <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
                        {m.text}
                      </p>
                      {m.alert && (
                        <div className="mt-4 rounded-xl border border-accent/40 bg-accent/30 p-4">
                          <h4 className="mb-2 flex items-center gap-1 text-xs font-bold text-accent-foreground">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            Guardian Alert
                          </h4>
                          <p className="text-xs italic text-accent-foreground/85">{m.alert}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <Bot className="h-5 w-5" />
              </div>
              <div className="rounded-t-3xl rounded-br-3xl border border-border/60 bg-card px-6 py-5 shadow-sm">
                <div className="flex h-4 items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      className="h-1.5 w-1.5 rounded-full bg-secondary"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {messages.length === 1 && (
            <div className="grid gap-4 pt-6 md:grid-cols-2">
              {STARTERS.map((s, i) => (
                <motion.button
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  key={s.k}
                  onClick={() => send(s.q, s.k)}
                  className="group rounded-2xl border border-border/60 bg-card p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md"
                >
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-secondary">
                    <Sparkles className="h-3 w-3" /> Starter
                  </div>
                  <div className="font-serif text-base font-bold leading-tight text-primary transition-colors group-hover:text-secondary">
                    {s.q}
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="absolute inset-x-4 bottom-4 lg:inset-x-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 rounded-full border border-border/60 bg-card p-2 shadow-xl shadow-primary/5 transition-all focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/15"
          >
            <ShieldCheck className="ml-3 h-5 w-5 shrink-0 text-secondary" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about films, books, games, places…"
              className="flex-1 bg-transparent px-2 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground md:text-base"
            />
            <Button
              type="submit"
              size="icon"
              className="h-11 w-11 shrink-0 rounded-full bg-primary shadow-md"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Responses are illustrative. Always trust your own knowledge of your kid.
          </p>
        </div>
      </main>
    </div>
  );
}
