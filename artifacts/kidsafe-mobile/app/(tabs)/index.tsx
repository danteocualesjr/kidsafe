import { ScrollView, View, Text, Image, Pressable, StyleSheet, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { films, heroImage, threads } from "@/data/dummy";
import { FilmCard } from "@/components/FilmCard";
import { useColors } from "@/hooks/useColors";

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 110 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingHorizontal: 20, paddingBottom: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
              <Feather name="shield" size={16} color="#fff" />
            </View>
            <Text style={{ fontSize: 22, fontFamily: "Inter_700Bold", color: colors.foreground }}>KidSafe</Text>
          </View>
          <Link href="/assistant" asChild>
            <Pressable hitSlop={10}>
              <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" }}>
                <Feather name="zap" size={16} color={colors.primary} />
              </View>
            </Pressable>
          </Link>
        </View>

        <Text style={{ fontSize: 32, fontFamily: "Inter_700Bold", color: colors.foreground, lineHeight: 38 }}>
          Know what's <Text style={{ color: colors.primary }}>truly safe</Text>
        </Text>
        <Text style={{ fontSize: 32, fontFamily: "Inter_700Bold", color: colors.foreground, lineHeight: 38 }}>for your kids.</Text>
        <Text style={{ fontSize: 14, color: colors.mutedForeground, marginTop: 10, lineHeight: 20 }}>
          Honest, detailed safety scores for every film, book, place, and activity.
        </Text>

        <View style={[styles.search, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="search" size={16} color={colors.mutedForeground} />
          <TextInput
            placeholder="Search any film, book, or place..."
            placeholderTextColor={colors.mutedForeground}
            style={{ flex: 1, color: colors.foreground, fontFamily: "Inter_400Regular", fontSize: 14 }}
          />
        </View>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ borderRadius: 24, overflow: "hidden", marginBottom: 24, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
          <Image source={heroImage} style={{ width: "100%", height: 220 }} />
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 11, color: colors.primary, letterSpacing: 1, fontFamily: "Inter_600SemiBold" }}>FEATURED</Text>
            <Text style={{ fontSize: 18, fontFamily: "Inter_700Bold", color: colors.foreground, marginTop: 4 }}>This week's editor pick</Text>
            <Text style={{ fontSize: 13, color: colors.mutedForeground, marginTop: 4 }}>Slow, heartfelt films perfect for sensitive viewers ages 5–8.</Text>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
        <View>
          <Text style={{ fontSize: 11, color: colors.primary, letterSpacing: 1, fontFamily: "Inter_600SemiBold" }}>TRENDING</Text>
          <Text style={{ fontSize: 22, fontFamily: "Inter_700Bold", color: colors.foreground, marginTop: 2 }}>Films parents love</Text>
        </View>
        <Link href="/browse" asChild>
          <Pressable hitSlop={10}>
            <Text style={{ color: colors.primary, fontSize: 13, fontFamily: "Inter_600SemiBold" }}>See all</Text>
          </Pressable>
        </Link>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingBottom: 4 }}>
        {films.slice(0, 6).map(f => <FilmCard key={f.id} film={f} />)}
      </ScrollView>

      <View style={{ paddingHorizontal: 20, marginTop: 32, marginBottom: 12 }}>
        <Text style={{ fontSize: 11, color: colors.primary, letterSpacing: 1, fontFamily: "Inter_600SemiBold" }}>TIP OF THE DAY</Text>
        <Text style={{ fontSize: 22, fontFamily: "Inter_700Bold", color: colors.foreground, marginTop: 2 }}>Preview the first 15 minutes</Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ borderRadius: 20, padding: 18, backgroundColor: colors.accent, borderWidth: 1, borderColor: colors.border }}>
          <Feather name="message-circle" size={20} color={colors.primary} />
          <Text style={{ fontSize: 15, color: colors.foreground, marginTop: 8, lineHeight: 22 }}>
            Most films set their tone in the opening sequence. If the first fifteen minutes raise red flags, the rest probably will too.
          </Text>
          <Text style={{ fontSize: 11, color: colors.mutedForeground, marginTop: 10, fontFamily: "Inter_500Medium" }}>— Dr. Lina Marsh, KidSafe Editorial</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 32, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
        <View>
          <Text style={{ fontSize: 11, color: colors.primary, letterSpacing: 1, fontFamily: "Inter_600SemiBold" }}>COMMUNITY</Text>
          <Text style={{ fontSize: 22, fontFamily: "Inter_700Bold", color: colors.foreground, marginTop: 2 }}>Real conversations</Text>
        </View>
        <Link href="/community" asChild>
          <Pressable hitSlop={10}>
            <Text style={{ color: colors.primary, fontSize: 13, fontFamily: "Inter_600SemiBold" }}>Forum</Text>
          </Pressable>
        </Link>
      </View>
      <View style={{ paddingHorizontal: 20, gap: 10 }}>
        {threads.slice(0, 3).map(t => (
          <Link key={t.id} href={{ pathname: "/thread/[id]", params: { id: t.id } }} asChild>
            <Pressable>
              <View style={{ borderRadius: 18, padding: 16, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, backgroundColor: colors.accent }}>
                    <Text style={{ fontSize: 10, color: colors.accentForeground, fontFamily: "Inter_600SemiBold" }}>{t.category}</Text>
                  </View>
                  <Text style={{ fontSize: 11, color: colors.mutedForeground }}>{t.lastActivity}</Text>
                </View>
                <Text style={{ fontSize: 15, fontFamily: "Inter_700Bold", color: colors.foreground, lineHeight: 21 }}>{t.title}</Text>
                <Text style={{ fontSize: 13, color: colors.mutedForeground, marginTop: 4 }} numberOfLines={2}>{t.content}</Text>
                <View style={{ flexDirection: "row", gap: 12, marginTop: 10 }}>
                  <Text style={{ fontSize: 11, color: colors.mutedForeground }}>{t.replies} replies</Text>
                  <Text style={{ fontSize: 11, color: colors.mutedForeground }}>{t.likes} hearts</Text>
                </View>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  search: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14, paddingVertical: 12, borderRadius: 999, marginTop: 18, borderWidth: 1 },
});
