import Image, { type ImageProps } from "next/image";
import { placeholderImages } from "@/lib/content/experiences";
import fs from "node:fs";
import path from "node:path";

type SmartImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

/**
 * Renders a Next.js Image with automatic fallback to a curated Unsplash placeholder
 * when the local file at /public/images/... doesn't exist yet.
 *
 * Once you drop a real file at the same path, the placeholder is bypassed automatically.
 */
export function SmartImage({ src, alt, ...rest }: SmartImageProps) {
  const localPath = path.join(process.cwd(), "public", src);
  const localExists = fs.existsSync(localPath);
  const finalSrc = localExists ? src : placeholderImages[src] ?? src;

  return <Image src={finalSrc} alt={alt} {...rest} />;
}
