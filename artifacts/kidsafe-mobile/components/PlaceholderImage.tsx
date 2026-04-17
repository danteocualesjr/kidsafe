import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const PALETTES: [string, string][] = [
  ["#fda4af", "#fdba74"],
  ["#6ee7b7", "#5eead4"],
  ["#c4b5fd", "#a5b4fc"],
  ["#fcd34d", "#fb923c"],
  ["#7dd3fc", "#a5b4fc"],
  ["#fbbf24", "#f472b6"],
  ["#86efac", "#67e8f9"],
  ["#fda4af", "#c4b5fd"],
];

function seedFor(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function PlaceholderImage({
  title,
  aspectRatio = 2 / 3,
  radius = 14,
  fontSize,
}: {
  title: string;
  aspectRatio?: number;
  radius?: number;
  fontSize?: number;
}) {
  const palette = PALETTES[seedFor(title) % PALETTES.length];
  const initials = title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join("")
    .toUpperCase();
  return (
    <View style={{ aspectRatio, borderRadius: radius, overflow: "hidden" }}>
      <LinearGradient
        colors={palette}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text
          style={{
            fontSize: fontSize ?? 36,
            color: "rgba(255,255,255,0.95)",
            fontFamily: "Inter_700Bold",
            textShadowColor: "rgba(0,0,0,0.12)",
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
          }}
        >
          {initials}
        </Text>
      </LinearGradient>
    </View>
  );
}
