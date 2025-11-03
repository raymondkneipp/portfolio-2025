import { View, Text, Link } from "@react-pdf/renderer";
import { config } from "@/config";
import { dateFormatter, linkFormatter } from "@/lib/format";
import { styles } from "./styles";
import { Separator } from "./ui/separator";
import { Bullet } from "./ui/bullet";

export function Experience() {
  return (
    <>
      <Text
        style={{
          fontWeight: "bold",
          textDecoration: "underline",
          fontSize: 12,
        }}
      >
        Work Experience
      </Text>

      {config.workExperience.map((experience, index) => (
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
              <Text style={{ fontWeight: "bold" }}>{experience.position}</Text>
              <Separator />
              <Text>{experience.company}</Text>
            </View>

            <Text>
              {dateFormatter.format(experience.startDate)} -{" "}
              {typeof experience.endDate === "string"
                ? experience.endDate
                : dateFormatter.format(experience.endDate)}
            </Text>
          </View>
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
              <Text style={{ fontStyle: "italic" }}>{experience.location}</Text>

              {experience.url && (
                <>
                  <Separator />
                  <Link style={styles.link} src={experience.url}>
                    {linkFormatter(experience.url)}
                  </Link>
                </>
              )}
            </View>
          </View>

          {experience.bullets.map((bullet, index) => (
            <Bullet key={index}>{bullet}</Bullet>
          ))}
        </View>
      ))}
    </>
  );
}
