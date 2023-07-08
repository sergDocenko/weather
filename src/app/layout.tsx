import { Metadata } from "next";
import "./globals.css";
import "./variables.css";
import { Inter } from "next/font/google";


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
      <body>
            
        {children}
      </body>
    </html>
  );
}
