import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Family Flow — Organize the chaos. Protect what matters.",
  description:
    "An AI-inspired family scheduling and activity planning app for overwhelmed parents managing children's school, sports, lessons, appointments, and free time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 lg:py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
