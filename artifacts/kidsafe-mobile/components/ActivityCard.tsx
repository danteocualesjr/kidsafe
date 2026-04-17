import { Pressable, View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import * as Haptics from "expo-haptics";
import { Activity } from "@/data/dummy";
import { AgeBadge } from "./AgeBadge";
import { CompactSafety } from "./SafetyMeter";
import { PlaceholderImage } from "./PlaceholderImage";
import { useColors } from "@/hooks/useColors";

export function ActivityCard({ activity, width = 160 }: { activity: Activity; width?: number }) {
  const colors = useColors();
  return (
    <Link href={{ pathname: "/activity/[id]", params: { id: activity.id } }} asChild>
      <Pressable
        onPress={() => Haptics.selectionAsync()}
        style={({ pressed }) => [
          styles.card,
          width !== undefined ? { width } : null,
          { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.9 : 1 },
        ]}
      >
        <View style={styles.coverWrap}>
          <PlaceholderImage title={activity.name} aspectRatio={4 / 3} radius={14} fontSize={28} />
          <View style={styles.ageBadge}>
            <AgeBadge age={activity.ageRecommendation} />
          </View>
        </View>
        <Text style={[styles.title, { color: colors.foreground }]} numberOfLines={1}>{activity.name}</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]} numberOfLines={1}>{activity.category}</Text>
        <View style={{ marginTop: 8 }}>
          <CompactSafety scores={activity.safetyScores} />
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 18, borderWidth: 1, padding: 10 },
  coverWrap: { position: "relative", marginBottom: 10 },
  ageBadge: { position: "absolute", top: 8, right: 8 },
  title: { fontSize: 15, fontFamily: "Inter_700Bold" },
  subtitle: { fontSize: 11, marginTop: 2 },
});
