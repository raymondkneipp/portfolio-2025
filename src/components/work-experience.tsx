import { Underline } from "@/components/underline";
import { config } from "@/config";
import { dateFormatter, linkFormatter } from "@/lib/format";
import { Anchor } from "./ui/anchor";

export function WorkExperience() {
	return (
		<section className="py-20 container flex flex-col gap-6 items-start">
			<h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter relative">
				Work Experience
				<Underline />
			</h2>

			{config.workExperience.map((experience) => (
				<article key={experience.company} className="flex flex-col gap-4 mb-8">
					<h3 className="text-xl font-bold">
						{experience.position}
						<span className="font-normal text-foreground/80">
							{" "}
							| {experience.company}
						</span>
					</h3>

					{experience.url && (
						<Anchor href={experience.url} target="_blank">
							{linkFormatter(experience.url)}
						</Anchor>
					)}

					<h4 className="text-lg font-light">{experience.location}</h4>
					<h5 className="text-sm font-light">
						{dateFormatter.format(experience.startDate)} -{" "}
						{typeof experience.endDate === "string"
							? experience.endDate
							: dateFormatter.format(experience.endDate)}
					</h5>
					<ul className="list-disc list-inside">
						{experience.bullets.map((bullet) => (
							<li key={bullet}>{bullet}</li>
						))}
					</ul>
				</article>
			))}
		</section>
	);
}
