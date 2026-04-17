import { Pressable, View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import * as Haptics from "expo-haptics";
import { Book } from "@/data/dummy";
import { AgeBadge } from "./AgeBadge";
import { CompactSafety } from "./SafetyMeter";
import { PlaceholderImage } from "./PlaceholderImage";
import { useColors } from "@/hooks/useColors";

export function BookCard({ book, width = 160 }: { book: Book; width?: number }) {
  const colors = useColors();
  return (
    <Link href={{ pathname: "/book/[id]", params: { id: book.id } }} asChild>
      <Pressable
        onPress={() => Haptics.selectionAsync()}
        style={({ pressed }) => [
          styles.card,
          width !== undefined ? { width } : null,
          { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.9 : 1 },
        ]}
      >
        <View style={styles.coverWrap}>
          <PlaceholderImage title={book.title} aspectRatio={2 / 3} radius={14} />
          <View style={styles.ageBadge}>
            <AgeBadge age={book.ageRecommendation} />
          </View>
        </View>
        <Text style={[styles.title, { color: colors.foreground }]} numberOfLines={1}>{book.title}</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]} numberOfLines={1}>{book.author}</Text>
        <View style={{ marginTop: 8 }}>
          <CompactSafety scores={book.safetyScores} />
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
