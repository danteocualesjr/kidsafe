import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

type Msg = { id: string; role: "user" | "assistant"; text: string };

const STARTERS = [
  { q: "Is Stranger Things ok for my 10-year-old?", k: "stranger" },
  { q: "Recommend a book about feelings for a 6-year-old", k: "feelings" },
  { q: "Is Disneyland good for toddlers?", k: "disneyland" },
  { q: "How do I talk to my tween about online safety?", k: "online-safety" },
];

const KNOWN: Record<string, string> = {
  stranger: "Most KidSafe parent reviewers and our editorial team suggest waiting on Stranger Things until at least age 11–12, even for mature kids.\n\nThe show isn't gratuitous, but leans heavily on dread and body horror. The scariest moments are extended — they linger. Several parents have reported sleep disturbances in kids 10 and under.\n\nGentler alternatives our community recommends: 'The Treehouse Detectives' for mystery vibes, or 'Ocean Song' for peril without dread. Save Stranger Things for an 11th-birthday watch-along.",
  feelings: "Two excellent picks for a 6-year-old:\n\n• 'Today My Feelings Are Soup' by Robin Estevez — uses the metaphor of soup ingredients to help kids name complex emotions.\n\n• 'An Ode to Tomatoes (and Other Things)' by Selma Park — short joyful poems that gently model emotional vocabulary.\n\nBoth have safety scores of 100/100 and zero content concerns. Want a third pick for a specific feeling?",
  disneyland: "For toddlers (2–4), Disneyland can be wonderful with planning.\n\nWhat works: Fantasyland (King Arthur Carrousel), 'It's a Small World', Toon Town's open spaces.\n\nWhat to skip: Adventureland (Pirates can frighten under-5s), most fireworks, and the Haunted Mansion until at least age 6.\n\nPractical tips: Mid-week, mornings only. Rope drop, leave by 1pm. Rider Switch is a lifesaver.",
  "online-safety": "Frame it as 'public street rules' rather than 'stranger danger'. A few approaches that work for our community:\n\n• The car analogy: 'Don't get in a stranger's DM, just like you wouldn't get in their car.'\n\n• Weekly 'tech tea' — 20 minutes a week looking at their phone together. Routine, not surveillance.\n\n• The 3-second pause before sending anything.\n\nAvoid scare tactics about kidnappers and surprise inspections — both erode trust.",
};

const GENERIC = "That's a great question, and KidSafe's community has discussed similar situations. The right answer depends on your child's age, temperament, and the conversation you're prepared to have afterward.\n\nA few principles our editorial team uses: preview the first 10–15 minutes if it's a film, co-watch the first time when possible, and trust the slow no — the content will still be there in six months.\n\nWant me to suggest specific titles? Tell me your child's age and any sensitivities and I'll point you to KidSafe-vetted picks.";

export default function AssistantScreen() {
  const colors = useColors();
  const [messages, setMessages] = useState<Msg[]>([
    { id: "intro", role: "assistant", text: "Hi! I'm your KidSafe assistant. I've read every parent review, editorial breakdown, and community thread. Ask me anything — from 'is X okay for my kid' to 'how do I bring this up at dinner'." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => { scrollRef.current?.scrollToEnd({ animated: true }); }, [messages, typing]);

  function send(text: string, key?: string) {
    if (!text.trim()) return;
    setMessages(m => [...m, { id: String(Date.now()) + "u", role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = key && KNOWN[key] ? KNOWN[key] : GENERIC;
      setMessages(m => [...m, { id: String(Date.now()) + "a", role: "assistant", text: reply }]);
      setTyping(false);
    }, 1300);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView ref={scrollRef} contentContainerStyle={{ padding: 20, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        {messages.map(m => (
          <View key={m.id} style={{ flexDirection: m.role === "user" ? "row-reverse" : "row", alignItems: "flex-start", gap: 8, marginBottom: 14 }}>
            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: m.role === "user" ? colors.secondary : colors.primary, alignItems: "center", justifyContent: "center" }}>
              <Feather name={m.role === "user" ? "user" : "zap"} size={14} color="#fff" />
            </View>
            <View style={{ maxWidth: "82%", padding: 14, borderRadius: 18, backgroundColor: m.role === "user" ? colors.primary : colors.card, borderWidth: m.role === "assistant" ? 1 : 0, borderColor: colors.border }}>
              <Text style={{ color: m.role === "user" ? "#fff" : colors.foreground, fontSize: 14, lineHeight: 21 }}>{m.text}</Text>
            </View>
          </View>
        ))}
        {typing && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
              <Feather name="zap" size={14} color="#fff" />
            </View>
            <View style={{ padding: 14, borderRadius: 18, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, flexDirection: "row", gap: 4 }}>
              {[0, 1, 2].map(i => (
                <View key={i} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary, opacity: 0.6 }} />
              ))}
            </View>
          </View>
        )}
        {messages.length === 1 && (
          <View style={{ marginTop: 8, gap: 8 }}>
            <Text style={{ fontSize: 11, color: colors.mutedForeground, fontFamily: "Inter_600SemiBold", letterSpacing: 1, marginBottom: 4 }}>STARTER QUESTIONS</Text>
            {STARTERS.map(s => (
              <Pressable key={s.k} onPress={() => send(s.q, s.k)}>
                <View style={{ borderRadius: 14, padding: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
                  <Text style={{ fontSize: 14, color: colors.foreground, fontFamily: "Inter_500Medium" }}>{s.q}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24, borderTopWidth: 1, borderColor: colors.border, backgroundColor: colors.background }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask anything..."
            placeholderTextColor={colors.mutedForeground}
            style={{ flex: 1, color: colors.foreground, fontFamily: "Inter_400Regular", fontSize: 14, paddingVertical: 6 }}
            onSubmitEditing={() => send(input)}
          />
          <Pressable onPress={() => send(input)} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
            <Feather name="arrow-up" size={16} color="#fff" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
