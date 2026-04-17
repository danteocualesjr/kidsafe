import { View, Text } from "react-native";

export function AgeBadge({ age }: { age: number }) {
  let label = "Toddler";
  let bg = "#d1fae5"; let color = "#065f46";
  if (age >= 13) { label = "Teen"; bg = "#1e293b"; color = "#fff"; }
  else if (age >= 9) { label = "Tween"; bg = "#e0e7ff"; color = "#3730a3"; }
  else if (age >= 5) { label = "Kid"; bg = "#fef3c7"; color = "#92400e"; }
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, backgroundColor: bg }}>
      <Text style={{ fontSize: 9, fontFamily: "Inter_700Bold", color, opacity: 0.7, letterSpacing: 0.5 }}>{label.toUpperCase()}</Text>
      <Text style={{ fontSize: 10, fontFamily: "Inter_700Bold", color }}>{age}+</Text>
    </View>
  );
}
