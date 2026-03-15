import { Underline } from "@/components/underline";
import { config } from "@/config";

export function Skills() {
  return (
    <section className="py-20 container flex flex-col gap-6 items-start">
      <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter relative">
        Skills
        <Underline />
      </h2>

      <div className="flex flex-col gap-8 self-stretch">
        {config.skills.map((group) => (
          <div key={group.group} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {group.group}
            </h3>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {group.items.map((skill, index) => (
                <li key={index} className="flex items-center gap-2">
                  <skill.icon
                    className="w-6 h-6 text-primary"
                    aria-label={skill.name}
                  />
                  <span className="text-lg font-light">{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
