import { View, Text } from "@react-pdf/renderer";
import { config } from "@/config";
import { dateFormatter } from "@/lib/format";
import { Separator } from "./ui/separator";

export function Education() {
  return (
    <>
      <Text
        style={{
          fontWeight: "bold",
          textDecoration: "underline",
          fontSize: 12,
        }}
      >
        Education
      </Text>

      {config.education.map((education, index) => (
        <View
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
              <Text style={{ fontWeight: "bold" }}>
                {education.institution}
              </Text>
              <Separator />
              <Text>{education.degree}</Text>
            </View>

            <Text>
              {education.endDate > new Date() ? "Expected graduation: " : ""}
              {dateFormatter.format(education.endDate)}
            </Text>
          </View>
        </View>
      ))}
    </>
  );
}
