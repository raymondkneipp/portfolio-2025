import { Underline } from "@/components/underline";
import { Anchor } from "./ui/anchor";

type ContactProps = {
  email: string;
};

export function Contact({ email }: ContactProps) {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container flex flex-col gap-6 items-center text-center">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter relative">
          Contact
          <Underline className="text-primary-foreground" />
        </h2>

        <p className="text-lg max-w-2xl text-balance">
          I would love to hear from you! Please feel free to reach out to me at{" "}
          <Anchor href={`mailto:${email}`} variant="primary">
            {email}
          </Anchor>
        </p>
      </div>
    </section>
  );
}
