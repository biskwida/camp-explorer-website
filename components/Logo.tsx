import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";

type LogoProps = {
  className?: string;
  /** Pixel height of the rendered logo. */
  height?: number;
  priority?: boolean;
};

export function Logo({
  className = "",
  height = 36,
  priority = false,
}: LogoProps) {
  // Source aspect ratio is 2667 × 1061 ≈ 2.51 : 1
  const width = Math.round(height * 2.51);

  return (
    <Link
      href="/"
      className={`group inline-flex items-center transition-opacity hover:opacity-85 ${className}`}
      aria-label="Camp Explorer — Home"
    >
      <Image
        src="/logo.png"
        alt="Camp Explorer"
        width={width}
        height={height}
        priority={priority}
      />
    </Link>
  );
}
