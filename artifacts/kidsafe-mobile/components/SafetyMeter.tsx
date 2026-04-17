import { View, Text, StyleSheet } from "react-native";
import { SafetyScores } from "@/data/dummy";
import { CRITERIA_LABELS, POSITIVE_KEYS, safetyOutOf100, safetyTier, avgConcern } from "@/lib/safety";
import { useColors } from "@/hooks/useColors";

function ScoreDots({ value, color }: { value: number; color: string }) {
  return (
    <View style={{ flexDirection: "row", gap: 4 }}>
      {[0, 1, 2, 3, 4].map(i => (
        <View
          key={i}
          style={{
            height: 8,
            width: 18,
            borderRadius: 4,
            backgroundColor: i < value ? color : "#e6dcd0",
          }}
        />
      ))}
    </View>
  );
}

export function CompactSafety({ scores }: { scores: SafetyScores }) {
  const colors = useColors();
  const score = safetyOutOf100(scores);
  const tier = safetyTier(avgConcern(scores));
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <View style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: tier.bg, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: tier.color, fontSize: 13, fontWeight: "700", fontFamily: "Inter_700Bold" }}>{score}</Text>
      </View>
      <View>
        <Text style={{ fontSize: 10, color: colors.mutedForeground, fontFamily: "Inter_600SemiBold", letterSpacing: 1, textTransform: "uppercase" }}>Safety</Text>
        <Text style={{ fontSize: 13, color: tier.color, fontFamily: "Inter_600SemiBold" }}>{tier.label}</Text>
      </View>
    </View>
  );
}

export function FullSafety({ scores }: { scores: SafetyScores }) {
  const colors = useColors();
  const score = safetyOutOf100(scores);
  const tier = safetyTier(avgConcern(scores));
  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.header, { borderColor: colors.border }]}>
        <View style={{ height: 80, width: 80, borderRadius: 40, backgroundColor: tier.bg, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: tier.color }}>
          <Text style={{ fontSize: 24, fontWeight: "700", color: tier.color, fontFamily: "Inter_700Bold" }}>{score}</Text>
          <Text style={{ fontSize: 8, color: tier.color, fontFamily: "Inter_500Medium", letterSpacing: 1 }}>SAFETY</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 16 }}>
          <View style={{ alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: tier.bg, marginBottom: 6 }}>
            <Text style={{ color: tier.color, fontSize: 11, fontFamily: "Inter_600SemiBold" }}>{tier.label}</Text>
          </View>
          <Text style={{ fontSize: 18, fontFamily: "Inter_700Bold", color: colors.foreground }}>Safety breakdown</Text>
          <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 2 }}>Across 8 criteria</Text>
        </View>
      </View>
      <View style={{ marginTop: 16, gap: 12 }}>
        {(Object.keys(scores) as (keyof SafetyScores)[]).map(key => {
          const inv = (POSITIVE_KEYS as readonly string[]).includes(key);
          const t = safetyTier(scores[key], inv);
          return (
            <View key={key} style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontFamily: "Inter_500Medium", color: colors.foreground }}>{CRITERIA_LABELS[key]}</Text>
                <Text style={{ fontSize: 11, color: t.color, marginTop: 1 }}>{t.label}</Text>
              </View>
              <ScoreDots value={scores[key]} color={t.color} />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 20, borderWidth: 1, padding: 18 },
  header: { flexDirection: "row", alignItems: "center", paddingBottom: 16, borderBottomWidth: 1 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
});
