import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { WorkExperience } from "@/components/work-experience";
import { Education } from "@/components/education";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { getContactInfo } from "@/resume/contact-info";

export const Route = createFileRoute("/")({
  component: App,
  loader: async () => await getContactInfo(),
});

function App() {
  const contactInfo = Route.useLoaderData();

  return (
    <>
      <Hero email={contactInfo.email} />
      <Projects />
      <WorkExperience />
      <Education />
      <Skills />
      <Contact email={contactInfo.email} />
    </>
  );
}
