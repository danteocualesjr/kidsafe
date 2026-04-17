import { useMemo, useState } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { films } from "@/data/dummy";
import { FilmCard } from "@/components/FilmCard";
import { useColors } from "@/hooks/useColors";
import { avgConcern } from "@/lib/safety";

const AGE_GROUPS = [
  { key: "all", label: "All ages", min: 0, max: 99 },
  { key: "toddler", label: "Toddlers 0–4", min: 0, max: 4 },
  { key: "kid", label: "Kids 5–8", min: 5, max: 8 },
  { key: "tween", label: "Tweens 9–12", min: 9, max: 12 },
];

const TIERS = [
  { key: "all", label: "Any safety", maxAvg: 5 },
  { key: "low", label: "Low concern", maxAvg: 1 },
  { key: "mod", label: "Moderate", maxAvg: 2.5 },
];

export default function BrowseScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [age, setAge] = useState("all");
  const [tier, setTier] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const ag = AGE_GROUPS.find(a => a.key === age)!;
    const ti = TIERS.find(t => t.key === tier)!;
    return films.filter(f =>
      f.ageRecommendation >= ag.min && f.ageRecommendation <= ag.max &&
      avgConcern(f.safetyScores) <= ti.maxAvg &&
      (q.trim() === "" || f.title.toLowerCase().includes(q.toLowerCase()))
    );
  }, [age, tier, q]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 110 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingHorizontal: 20, paddingBottom: 16 }}>
        <Text style={{ fontSize: 11, color: colors.primary, letterSpacing: 1, fontFamily: "Inter_600SemiBold" }}>BROWSE</Text>
        <Text style={{ fontSize: 30, fontFamily: "Inter_700Bold", color: colors.foreground, marginTop: 2, lineHeight: 36 }}>Find what fits</Text>

        <View style={[styles.search, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="search" size={16} color={colors.mutedForeground} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search by title..."
            placeholderTextColor={colors.mutedForeground}
            style={{ flex: 1, color: colors.foreground, fontFamily: "Inter_400Regular", fontSize: 14 }}
          />
        </View>
      </View>

      <Text style={{ fontSize: 11, color: colors.mutedForeground, letterSpacing: 1, fontFamily: "Inter_600SemiBold", marginLeft: 20, marginTop: 4, marginBottom: 8 }}>AGE GROUP</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
        {AGE_GROUPS.map(a => {
          const active = age === a.key;
          return (
            <Pressable key={a.key} onPress={() => setAge(a.key)} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primary : colors.card }}>
              <Text style={{ color: active ? "#fff" : colors.foreground, fontFamily: "Inter_500Medium", fontSize: 12 }}>{a.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Text style={{ fontSize: 11, color: colors.mutedForeground, letterSpacing: 1, fontFamily: "Inter_600SemiBold", marginLeft: 20, marginTop: 16, marginBottom: 8 }}>SAFETY</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
        {TIERS.map(t => {
          const active = tier === t.key;
          return (
            <Pressable key={t.key} onPress={() => setTier(t.key)} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primary : colors.card }}>
              <Text style={{ color: active ? "#fff" : colors.foreground, fontFamily: "Inter_500Medium", fontSize: 12 }}>{t.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={{ paddingHorizontal: 20, marginTop: 24, marginBottom: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 13, color: colors.mutedForeground }}>{filtered.length} results</Text>
      </View>
      <View style={{ paddingHorizontal: 14, flexDirection: "row", flexWrap: "wrap" }}>
        {filtered.length === 0 ? (
          <View style={{ width: "100%", padding: 32, alignItems: "center" }}>
            <Feather name="search" size={32} color={colors.mutedForeground} />
            <Text style={{ fontSize: 16, fontFamily: "Inter_700Bold", color: colors.foreground, marginTop: 12 }}>Nothing matches yet</Text>
            <Text style={{ fontSize: 13, color: colors.mutedForeground, marginTop: 4, textAlign: "center" }}>Try removing a filter or two.</Text>
          </View>
        ) : (
          filtered.map(f => (
            <View key={f.id} style={{ width: "50%", padding: 6 }}>
              <FilmCard film={f} />
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  search: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14, paddingVertical: 12, borderRadius: 999, marginTop: 16, borderWidth: 1 },
});
