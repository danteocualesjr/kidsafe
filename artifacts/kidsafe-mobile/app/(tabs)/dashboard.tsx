import { ScrollView, View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { kids, films } from "@/data/dummy";
import { FilmCard } from "@/components/FilmCard";
import { useColors } from "@/hooks/useColors";

const RECENT = [
  { kid: "Ada", action: "Added 'Starlight Dreamers' to watchlist", time: "2 days ago" },
  { kid: "Miles", action: "Marked 'Ocean Song' as watched · 4★", time: "3 days ago" },
  { kid: "June", action: "Saved 'Snow Day Symphony'", time: "Yesterday" },
];

export default function DashboardScreen() {
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
          <Text style={{ fontSize: 11, color: colors.primary, letterSpacing: 1, fontFamily: "Inter_600SemiBold" }}>YOUR DASHBOARD</Text>
          <Text style={{ fontSize: 30, fontFamily: "Inter_700Bold", color: colors.foreground, marginTop: 2, lineHeight: 36 }}>Hi, Alex</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" }}>
            <Feather name="bell" size={16} color={colors.foreground} />
          </Pressable>
          <Pressable style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" }}>
            <Feather name="settings" size={16} color={colors.foreground} />
          </Pressable>
        </View>
      </View>

      <Text style={{ marginLeft: 20, marginTop: 8, fontSize: 16, fontFamily: "Inter_700Bold", color: colors.foreground }}>Kid profiles</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingTop: 12 }}>
        {kids.map(k => (
          <View key={k.id} style={{ width: 200, borderRadius: 20, padding: 16, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <LinearGradient colors={k.gradient} style={{ width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#fff", fontSize: 20, fontFamily: "Inter_700Bold" }}>{k.name[0]}</Text>
              </LinearGradient>
              <View>
                <Text style={{ fontSize: 16, fontFamily: "Inter_700Bold", color: colors.foreground }}>{k.name}</Text>
                <Text style={{ fontSize: 12, color: colors.mutedForeground }}>Age {k.age}</Text>
              </View>
            </View>
            <View style={{ marginTop: 12 }}>
              <Text style={{ fontSize: 10, fontFamily: "Inter_600SemiBold", color: colors.mutedForeground, letterSpacing: 1, marginBottom: 6 }}>SENSITIVITIES</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
                {k.sensitivities.map(s => (
                  <View key={s} style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, backgroundColor: colors.accent }}>
                    <Text style={{ fontSize: 10, color: colors.accentForeground, fontFamily: "Inter_500Medium" }}>{s}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
        <Pressable style={{ width: 200, borderRadius: 20, padding: 16, backgroundColor: "transparent", borderWidth: 2, borderColor: colors.border, borderStyle: "dashed", alignItems: "center", justifyContent: "center" }}>
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.accent, alignItems: "center", justifyContent: "center" }}>
            <Feather name="plus" size={24} color={colors.primary} />
          </View>
          <Text style={{ fontSize: 14, fontFamily: "Inter_700Bold", color: colors.foreground, marginTop: 8 }}>Add a kid</Text>
        </Pressable>
      </ScrollView>

      <Link href="/assistant" asChild>
        <Pressable>
          <View style={{ marginHorizontal: 20, marginTop: 24, borderRadius: 20, padding: 18, backgroundColor: colors.primary }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Feather name="zap" size={18} color="#fff" />
              <Text style={{ color: "#fff", fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1 }}>AI ASSISTANT</Text>
            </View>
            <Text style={{ color: "#fff", fontSize: 18, fontFamily: "Inter_700Bold", marginTop: 8, lineHeight: 24 }}>Ask the assistant for this weekend's picks</Text>
            <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, marginTop: 4 }}>Knows your kids' ages and sensitivities.</Text>
          </View>
        </Pressable>
      </Link>

      <Text style={{ marginLeft: 20, marginTop: 24, fontSize: 16, fontFamily: "Inter_700Bold", color: colors.foreground }}>Saved watchlist</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingTop: 12 }}>
        {films.slice(0, 5).map(f => <FilmCard key={f.id} film={f} />)}
      </ScrollView>

      <Text style={{ marginLeft: 20, marginTop: 24, fontSize: 16, fontFamily: "Inter_700Bold", color: colors.foreground }}>Recent activity</Text>
      <View style={{ paddingHorizontal: 20, marginTop: 12 }}>
        <View style={{ borderRadius: 20, padding: 4, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
          {RECENT.map((a, i) => (
            <View key={i} style={{ paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: i < RECENT.length - 1 ? 1 : 0, borderColor: colors.border }}>
              <Text style={{ fontSize: 14, fontFamily: "Inter_500Medium", color: colors.foreground }}>{a.action}</Text>
              <Text style={{ fontSize: 11, color: colors.mutedForeground, marginTop: 2 }}>{a.kid} · {a.time}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
