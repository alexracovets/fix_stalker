import type { Metadata } from "next";
import { Locale } from "payload";

import { mergeOpenGraph } from "./mergeOpenGraph";

interface GenerateMetaArgs {
  title: string;
  description: string;
  image: string | { url?: string | null | undefined } | number;
  slug: string | string[];
  locale?: Locale | string;
}

export const generateMeta = async ({
  title,
  description,
  image,
  slug,
  locale,
}: GenerateMetaArgs): Promise<Metadata> => {
  const ogImage =
    (typeof image === "object" &&
      image !== null &&
      "url" in image &&
      image.url &&
      `${process.env.NEXT_PUBLIC_SERVER_URL}${image.url}`) ||
    (typeof image === "string" && image) ||
    undefined;

  const titleMeta = title || "S.T.A.L.K.E.R. 2 | Heart of Chornobyl";

  const url = Array.isArray(slug) ? slug.join("/") : slug;
  const formattedUrl = locale
    ? `/${locale}${url === "/" ? "" : url.startsWith("/") ? url : `/${url}`}`
    : url;

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
    ),
    description: description,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    openGraph: mergeOpenGraph({
      description: description,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: titleMeta,
      url: formattedUrl,
    }),
    title: titleMeta,
  };
};
