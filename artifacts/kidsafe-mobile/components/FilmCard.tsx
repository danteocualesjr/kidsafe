import { Pressable, View, Text, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";
import * as Haptics from "expo-haptics";
import { Film } from "@/data/dummy";
import { AgeBadge } from "./AgeBadge";
import { CompactSafety } from "./SafetyMeter";
import { useColors } from "@/hooks/useColors";

export function FilmCard({ film, width = 160 }: { film: Film; width?: number }) {
  const colors = useColors();
  return (
    <Link href={`/film/${film.id}` as any} asChild>
      <Pressable
        onPress={() => Haptics.selectionAsync()}
        style={({ pressed }) => [
          styles.card,
          { width, backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.9 : 1 },
        ]}
      >
        <View style={styles.posterWrap}>
          <Image source={film.poster} style={styles.poster} />
          <View style={styles.ageBadge}>
            <AgeBadge age={film.ageRecommendation} />
          </View>
        </View>
        <Text style={[styles.title, { color: colors.foreground }]} numberOfLines={1}>{film.title}</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]} numberOfLines={1}>{film.year} · {film.genres[0]}</Text>
        <View style={{ marginTop: 8 }}>
          <CompactSafety scores={film.safetyScores} />
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 18, borderWidth: 1, padding: 10 },
  posterWrap: { position: "relative", aspectRatio: 2 / 3, borderRadius: 14, overflow: "hidden", marginBottom: 10 },
  poster: { width: "100%", height: "100%" },
  ageBadge: { position: "absolute", top: 8, right: 8 },
  title: { fontSize: 15, fontFamily: "Inter_700Bold" },
  subtitle: { fontSize: 11, marginTop: 2 },
});
