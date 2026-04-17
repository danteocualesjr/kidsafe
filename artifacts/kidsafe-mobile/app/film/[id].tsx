import { ScrollView, View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { getFilm } from "@/data/dummy";
import { AgeBadge } from "@/components/AgeBadge";
import { FullSafety } from "@/components/SafetyMeter";
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

export default function FilmDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const film = getFilm(id);
  const colors = useColors();
  if (!film) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
        <Text style={{ color: colors.foreground }}>Film not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "" }} />
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", paddingTop: 8 }}>
          <View style={styles.posterShadow}>
            <Image source={film.poster} style={styles.poster} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
            <AgeBadge age={film.ageRecommendation} />
            {film.genres.map(g => (
              <View key={g} style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
                <Text style={{ fontSize: 11, color: colors.mutedForeground, fontFamily: "Inter_500Medium" }}>{g}</Text>
              </View>
            ))}
          </View>
          <Text style={{ fontSize: 28, fontFamily: "Inter_700Bold", color: colors.foreground, lineHeight: 34 }}>{film.title}</Text>
          <Text style={{ fontSize: 13, color: colors.mutedForeground, marginTop: 6 }}>{film.year} · {film.runtime} · Directed by {film.director}</Text>
          <Text style={{ fontSize: 15, color: colors.foreground, marginTop: 14, lineHeight: 23 }}>{film.plotSummary}</Text>

          <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
            <Pressable
              onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}
              style={({ pressed }) => [{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 13, borderRadius: 999, backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 }]}
            >
              <Feather name="bookmark" size={16} color="#fff" />
              <Text style={{ color: "#fff", fontFamily: "Inter_600SemiBold", fontSize: 14 }}>Save</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 13, paddingHorizontal: 20, borderRadius: 999, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, opacity: pressed ? 0.85 : 1 }]}>
              <Feather name="share-2" size={16} color={colors.foreground} />
            </Pressable>
          </View>

          <View style={{ marginTop: 28 }}>
            <FullSafety scores={film.safetyScores} />
          </View>

          <View style={{ marginTop: 20, padding: 18, borderRadius: 20, backgroundColor: "#fef3c7", borderWidth: 1, borderColor: "#fde68a" }}>
            <Text style={{ fontSize: 11, fontFamily: "Inter_600SemiBold", color: "#92400e", letterSpacing: 1, marginBottom: 6 }}>WHAT PARENTS NEED TO KNOW</Text>
            <Text style={{ fontSize: 14, color: "#78350f", lineHeight: 21 }}>{film.whatParentsNeedToKnow}</Text>
          </View>

          <Text style={{ marginTop: 28, marginBottom: 12, fontSize: 18, fontFamily: "Inter_700Bold", color: colors.foreground }}>Parent reviews</Text>
          <View style={{ gap: 12 }}>
            {film.parentReviews.map((r, i) => (
              <View key={i} style={{ borderRadius: 18, padding: 16, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Avatar name={r.author} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 13, fontFamily: "Inter_600SemiBold", color: colors.foreground }}>{r.author}</Text>
                    <Text style={{ fontSize: 11, color: colors.mutedForeground }}>{r.date} · Verified parent</Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: 1 }}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Feather key={idx} name="star" size={11} color={idx < r.rating ? "#f59e0b" : colors.border} />
                    ))}
                  </View>
                </View>
                <Text style={{ fontSize: 13, color: colors.foreground, lineHeight: 20, marginTop: 10 }}>{r.text}</Text>
              </View>
            ))}
          </View>

          <Text style={{ marginTop: 28, marginBottom: 12, fontSize: 18, fontFamily: "Inter_700Bold", color: colors.foreground }}>Tags</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {film.tags.map(t => (
              <View key={t} style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: colors.accent }}>
                <Text style={{ fontSize: 12, color: colors.accentForeground, fontFamily: "Inter_500Medium" }}>#{t}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  posterShadow: { borderRadius: 18, shadowColor: "#000", shadowOpacity: 0.18, shadowRadius: 20, shadowOffset: { width: 0, height: 8 }, elevation: 6 },
  poster: { width: 200, aspectRatio: 2 / 3, borderRadius: 18 },
});
