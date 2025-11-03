import { Underline } from "@/components/underline";
import { config } from "@/config";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import fadePlugin from "embla-carousel-fade";

export const Route = createFileRoute("/projects")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="container py-20 flex flex-col gap-6 items-start">
      <h1 className="text-6xl md:text-7xl font-black text-foreground tracking-tighter relative">
        Projects
        <Underline />
      </h1>

      <Button variant="ghost" asChild>
        <Link to="/">
          <ArrowLeft /> Back to Home
        </Link>
      </Button>

      <div className="grid lg:grid-cols-2 gap-6">
        {config.projects.map((project, index) => (
          <Card key={index} className="py-0 overflow-hidden">
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
      </div>
      <Button variant="ghost" asChild>
        <Link to="/">
          <ArrowLeft /> Back to Home
        </Link>
      </Button>
    </section>
  );
}
