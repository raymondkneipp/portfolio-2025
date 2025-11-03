import { Page, View, Document } from "@react-pdf/renderer";
import { config } from "@/config";
import { Header } from "./header";
import { Summary } from "./summary";
import { Experience } from "./experience";
import { Education } from "./education";

type MyResumeProps = {
  email: string;
  phone: string;
  phoneRaw: string;
};

export function MyResume({ email, phone, phoneRaw }: MyResumeProps) {
  return (
    <Document
      title={`${config.firstName} ${config.lastName} | ${config.headline} | Resume`}
    >
      <Page
        size="A4"
        style={{
          flexDirection: "column",
          backgroundColor: "#fff",
          fontSize: 10,
          fontFamily: "Times-Roman",
        }}
      >
        <View
          style={{
            flexGrow: 1,
            margin: "1in",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <Header email={email} phone={phone} phoneRaw={phoneRaw} />

          <Summary />

          <Experience />

          <Education />
        </View>
      </Page>
    </Document>
  );
}
