import { Underline } from "@/components/underline";
import { config } from "@/config";

export function Skills() {
  return (
    <section className="py-20 container flex flex-col gap-6 items-start">
      <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter relative">
        Skills
        <Underline />
      </h2>

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-x-12 gap-y-4 self-stretch">
        {config.skills.map((skill, index) => (
          <li key={index} className="flex items-center gap-2">
            <skill.icon
              className="w-6 h-6 text-primary"
              aria-label={skill.name}
            />
            <span className="text-lg font-light">{skill.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
