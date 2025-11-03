import { config } from "@/config";
import { Anchor } from "@/components/ui/anchor";

type HeroProps = {
  email: string;
};

export function Hero({ email }: HeroProps) {
  const filename = `${config.firstName}_${config.lastName}_Resume.pdf`;

  return (
    <section className="py-20 container">
      <h1 className="text-6xl md:text-7xl font-black text-foreground tracking-tighter mb-6">
        {config.firstName} {config.lastName}
      </h1>

      <h2 className="text-2xl md:text-3xl mb-4 font-light">
        {config.headline}
      </h2>

      <p className="text-lg mb-8">{config.professionalSummary}</p>

      <div className="flex gap-8 flex-wrap">
        <Anchor href="/resume" download={filename}>
          Resume
        </Anchor>

        <Anchor href={config.socials.github} target="_blank">
          GitHub
        </Anchor>

        <Anchor href={config.socials.linkedin} target="_blank">
          LinkedIn
        </Anchor>

        <Anchor href={`mailto:${email}`}>Email</Anchor>
      </div>
    </section>
  );
}
