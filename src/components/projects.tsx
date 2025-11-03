import { Underline } from "./underline";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { config } from "@/config";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Badge } from "./ui/badge";
import { FolderCodeIcon } from "lucide-react";
import { ClientOnly, Link } from "@tanstack/react-router";
import fadePlugin from "embla-carousel-fade";

const PROJECTS_TO_SHOW = 3;

export function Projects() {
  return (
    <section className="py-20 container flex flex-col gap-6 items-start">
      <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter relative">
        Projects
        <Underline />
      </h2>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {config.projects.slice(0, PROJECTS_TO_SHOW).map((project, index) => (
          <Card key={index} className="py-0 overflow-hidden">
            <ClientOnly
              fallback={
                <img
                  src={`screenshots/${project.name.toLowerCase().replaceAll(" ", "-")}/cover.webp`}
                  alt={`${project.name} cover`}
                />
              }
            >
              <Carousel
                className="w-full"
                opts={{ loop: true }}
                plugins={[fadePlugin()]}
              >
                <CarouselContent>
                  <CarouselItem>
                    <img
                      src={`screenshots/${project.name.toLowerCase().replaceAll(" ", "-")}/cover.webp`}
                      alt={`${project.name} cover`}
                    />
                  </CarouselItem>

                  {project.screenshots.map((_, index) => (
                    <CarouselItem key={index}>
                      <img
                        src={`screenshots/${project.name.toLowerCase().replaceAll(" ", "-")}/${index + 1}.webp`}
                        alt={`${project.name} screenshot ${index + 1}`}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </ClientOnly>

            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 flex-1">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-0">
              <ButtonGroup className="w-full">
                <Button
                  size="lg"
                  variant="default"
                  className={cn("rounded-t-none basis-full", {
                    "basis-1/2": project.codeUrl,
                  })}
                  asChild
                >
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Visit
                  </a>
                </Button>
                {project.codeUrl && (
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-t-none basis-1/2"
                    asChild
                  >
                    <a href={project.codeUrl} target="_blank" rel="noreferrer">
                      Code
                    </a>
                  </Button>
                )}
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}

        <Empty className="border border-dashed lg:col-span-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderCodeIcon />
            </EmptyMedia>
            <EmptyTitle>
              {config.projects.length - PROJECTS_TO_SHOW} More Projects
            </EmptyTitle>
            <EmptyDescription>Check out my other projects</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link to="/projects">All Projects</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </section>
  );
}
