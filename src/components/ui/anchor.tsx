import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Link as TanstackLink, LinkProps } from "@tanstack/react-router";

const anchorVariants = cva(
  "relative font-black underline underline-offset-4 decoration-2 place-self-start transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "text-primary decoration-primary/25 hover:decoration-primary focus-visible:ring-offset-background focus-visible:ring-primary",
        primary:
          "text-primary-foreground decoration-primary-foreground/25 hover:decoration-primary-foreground focus-visible:ring-offset-primary focus-visible:ring-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type InternalLinkProps = {
  to: LinkProps["to"];
  children: React.ReactNode;
  className?: string;
  variant?: VariantProps<typeof anchorVariants>["variant"];
} & Omit<LinkProps, "to">;

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  variant?: VariantProps<typeof anchorVariants>["variant"];
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

type AnchorProps = InternalLinkProps | ExternalLinkProps;

export function Anchor(props: AnchorProps) {
  const { variant, className, ...restProps } = props;
  const sharedClasses = cn(
    anchorVariants({ variant }),
    'before:content-[""] before:absolute before:-inset-y-1 before:-inset-x-1 before:scale-x-0 before:origin-center before:transition-transform before:duration-300 before:ease-out before:skew-x-8 before:-translate-x-0.5 before:-skew-y-2 before:-z-10 before:pointer-events-none',
    "hover:before:scale-x-110",
    variant === "primary"
      ? "before:bg-primary-foreground/20"
      : "before:bg-primary/20",
    className,
  );

  if ("to" in restProps) {
    // Internal navigation
    const { to, children, ...rest } = restProps;
    return (
      <TanstackLink to={to} className={sharedClasses} {...rest}>
        {children}
      </TanstackLink>
    );
  }

  if ("href" in restProps) {
    // External link
    const { href, children, target, rel, ...rest } = restProps;
    return (
      <a
        href={href}
        className={sharedClasses}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        {...rest}
      >
        {children}
      </a>
    );
  }

  // TypeScript ensures we never reach this point
  return null;
}

export { anchorVariants };
