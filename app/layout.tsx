import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naoki Atkins — Portfolio",
  description:
    "Product designer & engineer. Upload a job description to check our match.",
  openGraph: {
    title: "Naoki Atkins — Portfolio",
    description: "Upload a JD to see if we're a fit.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
