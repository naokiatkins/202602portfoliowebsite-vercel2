import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Your Name — Portfolio",
  description:
    "Product designer & engineer. Upload a job description to check our match.",
  openGraph: {
    title: "Your Name — Portfolio",
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
      <body>
        <Nav />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
