import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "../components/PostHogProvider";

import { SCThemeProvider } from "@/components/theme-provider";

import { SCConsentBanner } from "@/components/internal/sccookiebanner";
import { SCFooter } from "@/components/internal/scfooter";
import { SCNavbar } from "@/components/internal/scnavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScribbleLabApp",
  description:
    "A powerful note-taking and productivity tool to boost your creativity and learning.",
  openGraph: {
    title: "ScribbleLabApp",
    description:
      "A powerful note-taking and productivity tool to boost your creativity and learning.",
    url: "https://scribblelabapp.pages.dev/",
    images: [
      {
        url: "https://scribblelabapp.pages.dev/og.png",
        width: 1200,
        height: 630,
        alt: "ScribbleLabApp Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScribbleLabApp",
    description:
      "A powerful note-taking and productivity tool to boost your creativity and learning.",
    images: ["https://scribblelabapp.pages.dev/og.png"],
    site: "@scribblelabapp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SCThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SCNavbar />
          <PostHogProvider>{children}</PostHogProvider>
          <SCConsentBanner />
          <SCFooter />
        </SCThemeProvider>
      </body>
    </html>
  );
}
