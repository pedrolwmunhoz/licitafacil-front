import { Link } from "react-router-dom";
import { HOME_HASH_NAV } from "@/content/landing-nav";

const linkClass =
  "text-sm font-semibold shrink-0 whitespace-nowrap text-landing-muted underline-offset-4 transition-colors hover:text-landing-ink hover:underline hover:decoration-2 hover:decoration-landing-cta";

type HomeNavLinksProps = {
  onHashClick: (hash: string) => void;
  className?: string;
  /** mobile: text-base text-left w-full */
  variant?: "desktop" | "mobile";
};

export function HomeNavLinks({ onHashClick, className, variant = "desktop" }: HomeNavLinksProps) {
  const btnClass =
    variant === "mobile"
      ? `text-left text-base font-semibold bg-transparent border-0 p-0 cursor-pointer w-full ${linkClass}`
      : `text-sm font-semibold bg-transparent border-0 p-0 cursor-pointer shrink-0 whitespace-nowrap ${linkClass}`;

  return (
    <>
      {HOME_HASH_NAV.map((link) =>
        "to" in link ? (
          <Link key={link.to} to={link.to} className={variant === "mobile" ? `text-base font-semibold ${linkClass}` : linkClass}>
            {link.label}
          </Link>
        ) : (
          <button
            key={link.hash}
            type="button"
            onClick={() => onHashClick(link.hash)}
            className={btnClass}
          >
            {link.label}
          </button>
        ),
      )}
    </>
  );
}
