import { Text, View } from "@react-pdf/renderer";

export function Bullet(props: { children: string }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Text>&bull;</Text>
      <Text style={{ flex: 1 }}>{props.children}</Text>
    </View>
  );
}
