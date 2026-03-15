import { Text, View } from "@react-pdf/renderer";
import { config } from "@/config";

export function Skills() {
	return (
		<>
			<Text
				style={{
					fontWeight: "bold",
					textDecoration: "underline",
					fontSize: 12,
				}}
			>
				Skills
			</Text>

			<View style={{ display: "flex", flexDirection: "column", gap: 3 }}>
				{config.skills.map((group) => (
					<View
						key={group.group}
						style={{
							display: "flex",
							flexDirection: "row",
							gap: 2,
							alignItems: "flex-start",
						}}
					>
						<Text style={{ fontWeight: "bold", minWidth: 60 }}>
							{group.group}:
						</Text>
						<Text>{group.items.map((s) => s.name).join(", ")}</Text>
					</View>
				))}
			</View>
		</>
	);
}
