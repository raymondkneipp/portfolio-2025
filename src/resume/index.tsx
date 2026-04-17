import { Document, Page, View } from "@react-pdf/renderer";
import { config } from "@/config";
import { Education } from "./education";
import { Experience } from "./experience";
import { Header } from "./header";
import { Skills } from "./skills";
import { Summary } from "./summary";

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
						marginTop: "0.75in",
						marginHorizontal: "1in",
						marginBottom: "1in",
						display: "flex",
						flexDirection: "column",
						gap: 10,
					}}
				>
					<Header email={email} phone={phone} phoneRaw={phoneRaw} />

					<Summary />

					<Skills />

					<Experience />

					<Education />
				</View>
			</Page>
		</Document>
	);
}
