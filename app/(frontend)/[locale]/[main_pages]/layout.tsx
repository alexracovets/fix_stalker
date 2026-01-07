"use client";

import { LayoutPDA } from "@templates";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <LayoutPDA>{children}</LayoutPDA>;
}
