import { ScrollView, View, Text, TextInput, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { threads } from "@/data/dummy";
import { useColors } from "@/hooks/useColors";

const GRADIENTS = ["#fda4af", "#6ee7b7", "#c4b5fd", "#fcd34d", "#7dd3fc"];

function Avatar({ name }: { name: string }) {
  const c = GRADIENTS[name.charCodeAt(0) % GRADIENTS.length];
  return (
    <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: c, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#fff", fontFamily: "Inter_700Bold", fontSize: 13 }}>{name[0]}</Text>
    </View>
  );
}

const SAMPLE_REPLIES = [
  { author: "Marcus J.", date: "1 hour ago", likes: 18, content: "We waited until 11 with our oldest. Even then, the scariest scenes had her checking under the bed for weeks." },
  { author: "Priya R.", date: "45 min ago", likes: 12, content: "Hard no for us until at least 10. The kids who've watched it earlier in our circle are visibly more anxious. Anecdotal but consistent." },
  { author: "David L.", date: "30 min ago", likes: 9, content: "We compromised by watching the first episode together and talking about the special effects. He decided he wanted to wait." },
];

export default function ThreadScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const t = threads.find(x => x.id === id) || threads[0];
  const colors = useColors();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, backgroundColor: colors.accent }}>
          <Text style={{ fontSize: 10, color: colors.accentForeground, fontFamily: "Inter_600SemiBold" }}>{t.category}</Text>
        </View>
        <Text style={{ fontSize: 11, color: colors.mutedForeground }}>{t.lastActivity}</Text>
      </View>
      <Text style={{ fontSize: 24, fontFamily: "Inter_700Bold", color: colors.foreground, lineHeight: 30, marginBottom: 16 }}>{t.title}</Text>

      <View style={{ borderRadius: 18, padding: 16, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, marginBottom: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <Avatar name={t.author} />
          <View>
            <Text style={{ fontSize: 13, fontFamily: "Inter_600SemiBold", color: colors.foreground }}>{t.author}</Text>
            <Text style={{ fontSize: 11, color: colors.mutedForeground }}>Original post</Text>
          </View>
        </View>
        <Text style={{ fontSize: 14, color: colors.foreground, lineHeight: 22 }}>{t.content}</Text>
        <View style={{ flexDirection: "row", gap: 16, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderColor: colors.border }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Feather name="heart" size={13} color={colors.mutedForeground} />
            <Text style={{ fontSize: 12, color: colors.mutedForeground }}>{t.likes}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Feather name="message-circle" size={13} color={colors.mutedForeground} />
            <Text style={{ fontSize: 12, color: colors.mutedForeground }}>{t.replies} replies</Text>
          </View>
        </View>
      </View>

      <Text style={{ fontSize: 16, fontFamily: "Inter_700Bold", color: colors.foreground, marginBottom: 12 }}>Replies</Text>
      <View style={{ gap: 10 }}>
        {SAMPLE_REPLIES.map((r, i) => (
          <View key={i} style={{ borderRadius: 18, padding: 16, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Avatar name={r.author} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontFamily: "Inter_600SemiBold", color: colors.foreground }}>{r.author}</Text>
                <Text style={{ fontSize: 11, color: colors.mutedForeground }}>{r.date}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Feather name="heart" size={12} color={colors.mutedForeground} />
                <Text style={{ fontSize: 11, color: colors.mutedForeground }}>{r.likes}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 13, color: colors.foreground, lineHeight: 20, marginTop: 10 }}>{r.content}</Text>
          </View>
        ))}
      </View>

      <View style={{ marginTop: 20, borderRadius: 18, padding: 12, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
        <TextInput
          multiline
          placeholder="Add a kind, helpful reply..."
          placeholderTextColor={colors.mutedForeground}
          style={{ minHeight: 70, color: colors.foreground, fontFamily: "Inter_400Regular", fontSize: 14, padding: 4 }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
          <Text style={{ fontSize: 11, color: colors.mutedForeground }}>Be kind. Be specific.</Text>
          <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: colors.primary }}>
            <Feather name="send" size={12} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 12, fontFamily: "Inter_600SemiBold" }}>Reply</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
