import { Text, View, Link } from "@react-pdf/renderer";
import { config } from "@/config";
import { linkFormatter } from "@/lib/format";
import { styles } from "./styles";
import { Separator } from "./ui/separator";

type HeaderProps = {
  email: string;
  phone: string;
  phoneRaw: string;
};

export function Header({ email, phone, phoneRaw }: HeaderProps) {
  return (
    <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>
          {config.firstName} {config.lastName}
        </Text>

        <Separator />

        <Text>{config.headline}</Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>{config.location}</Text>
          <Separator />
          <Link style={styles.link} src={`tel:${phoneRaw}`}>
            {phone}
          </Link>
          <Separator />
          <Link style={styles.link} src={`mailto:${email}`}>
            {email}
          </Link>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link style={styles.link} src={config.socials.linkedin}>
            {linkFormatter(config.socials.linkedin)}
          </Link>
          <Separator />
          <Link style={styles.link} src={config.socials.github}>
            {linkFormatter(config.socials.github)}
          </Link>
          <Separator />
          <Link style={styles.link} src={config.socials.website}>
            {linkFormatter(config.socials.website)}
          </Link>
        </View>
      </View>
    </View>
  );
}
