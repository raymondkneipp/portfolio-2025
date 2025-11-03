import { Text } from "@react-pdf/renderer";
import { config } from "@/config";

export function Summary() {
  return (
    <>
      <Text
        style={{
          fontWeight: "bold",
          textDecoration: "underline",
          fontSize: 12,
        }}
      >
        Professional Summary
      </Text>
      <Text>{config.professionalSummary}</Text>
    </>
  );
}
