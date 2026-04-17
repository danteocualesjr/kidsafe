import { ScrollView, View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { threads } from "@/data/dummy";
import { useColors } from "@/hooks/useColors";

const CATEGORIES = ["All", "Films & TV", "Books", "Tweens & Teens", "Daily Life", "Places"];

export default function CommunityScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 110 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingHorizontal: 20, paddingBottom: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
        <View>
          <Text style={{ fontSize: 11, color: colors.primary, letterSpacing: 1, fontFamily: "Inter_600SemiBold" }}>COMMUNITY</Text>
          <Text style={{ fontSize: 30, fontFamily: "Inter_700Bold", color: colors.foreground, marginTop: 2, lineHeight: 36 }}>Forum</Text>
        </View>
        <Pressable style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
          <Feather name="edit-3" size={18} color="#fff" />
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8, paddingBottom: 8 }}>
        {CATEGORIES.map((c, i) => (
          <View key={c} style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1, borderColor: i === 0 ? colors.primary : colors.border, backgroundColor: i === 0 ? colors.primary : colors.card }}>
            <Text style={{ fontSize: 12, fontFamily: "Inter_500Medium", color: i === 0 ? "#fff" : colors.foreground }}>{c}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={{ paddingHorizontal: 20, marginTop: 16, gap: 10 }}>
        {threads.map(t => (
          <Link key={t.id} href={`/thread/${t.id}` as any} asChild>
            <Pressable>
              <View style={{ borderRadius: 18, padding: 16, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, backgroundColor: colors.accent }}>
                    <Text style={{ fontSize: 10, color: colors.accentForeground, fontFamily: "Inter_600SemiBold" }}>{t.category}</Text>
                  </View>
                  <Text style={{ fontSize: 11, color: colors.mutedForeground }}>· {t.lastActivity}</Text>
                </View>
                <Text style={{ fontSize: 16, fontFamily: "Inter_700Bold", color: colors.foreground, lineHeight: 22 }}>{t.title}</Text>
                <Text style={{ fontSize: 13, color: colors.mutedForeground, marginTop: 4 }} numberOfLines={2}>{t.content}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                  <View style={{ flexDirection: "row", gap: 16 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                      <Feather name="message-circle" size={12} color={colors.mutedForeground} />
                      <Text style={{ fontSize: 11, color: colors.mutedForeground }}>{t.replies}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                      <Feather name="heart" size={12} color={colors.mutedForeground} />
                      <Text style={{ fontSize: 11, color: colors.mutedForeground }}>{t.likes}</Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: 11, color: colors.foreground, fontFamily: "Inter_500Medium" }}>by {t.author}</Text>
                </View>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}
