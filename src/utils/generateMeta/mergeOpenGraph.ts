import type { Metadata } from "next";

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  description: "S.T.A.L.K.E.R. 2 | Heart of Chornobyl",
  images: [
    {
      url: process.env.NEXT_PUBLIC_SERVER_URL
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/default-og.webp`
        : "/default-og.webp",
    },
  ],
  siteName: "S.T.A.L.K.E.R. 2 | Heart of Chornobyl",
  title: "S.T.A.L.K.E.R. 2 | Heart of Chornobyl",
};

export const mergeOpenGraph = (
  og?: Metadata["openGraph"]
): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
