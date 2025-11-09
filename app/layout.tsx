import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YouTube Faceless Channel Automation",
  description: "Automated content creation for US-based faceless YouTube channels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-900 text-white">
        {children}
      </body>
    </html>
  );
}
