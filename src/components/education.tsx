import { Underline } from "@/components/underline";
import { config } from "@/config";
import { dateFormatter } from "@/lib/format";

export function Education() {
  return (
    <section className="py-20 container flex flex-col gap-6 items-start">
      <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter relative">
        Education
        <Underline />
      </h2>

      {config.education.map((education, index) => (
        <article key={index} className="flex flex-col gap-4 mb-8">
          <h3 className="text-xl font-bold">{education.institution}</h3>

          <h4 className="text-lg font-light">{education.degree}</h4>

          <h5 className="text-sm font-light">
            {education.endDate > new Date() ? "Expected graduation: " : ""}
            {dateFormatter.format(education.endDate)}
          </h5>
        </article>
      ))}
    </section>
  );
}
