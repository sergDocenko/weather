import { Metadata } from "next";
import "./globals.css";
import "./variables.css";

export const metadata: Metadata = {
  title: "WEATHER",
  description: "Weather portal",
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
