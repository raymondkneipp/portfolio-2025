import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo(props: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 166.113 76.898"
      role="img"
      aria-labelledby="logo-title"
      className={cn("h-10", props.className)}
    >
      <title id="logo-title">Raymond Kneipp Logo</title>
      <path
        d="M0 0v27.744l48.076 48.962h27.24L59.11 60.201c14.445-11.344 17.007-20.164 16.537-32.654C75.177 15.057 61.353 0 45.74 0H25.583Zm90.797 0v26.574L116.888 0Zm48.075 0L90.797 50.325v26.573h26.091l-13.14-13.382 11.416-11.627 23.708 24.817h27.241l-37.658-38.353L166.113 0ZM18.895 19.244h25.583c5.503 0 11.665 6.573 11.742 11.959.078 5.385-2.503 12.479-12.784 13.035zM0 50.134v26.572h26.092z"
        fill="currentColor"
      />
    </svg>
  );
}
