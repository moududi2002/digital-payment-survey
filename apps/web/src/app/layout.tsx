import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MFS Fraud Awareness Research Survey",
    template: "%s | MFS Research Survey"
  },
  description:
    "An academic research survey about mobile financial services fraud awareness, perceived risk, trust, and continuance intention among university students in Bangladesh.",
  applicationName: "MFS Research Survey",
  robots: {
    index: false,
    follow: false
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f8fb"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}