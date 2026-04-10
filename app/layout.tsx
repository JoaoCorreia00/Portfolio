import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "João Correia - Fullstack Developer",
  description: "Portfolio of João Correia, Fullstack Developer specializing in JavaScript, React, Vue.js, Node.js and PHP. Creating scalable web applications with modern technologies.",
  keywords: ["Fullstack Developer", "JavaScript", "React", "Vue.js", "Node.js", "PHP", "TypeScript", "Web Development"],
  authors: [{ name: "João Correia" }],
  creator: "João Correia",
  openGraph: {
    title: "João Correia - Fullstack Developer",
    description: "Portfolio of João Correia, Fullstack Developer specializing in JavaScript, React, Vue.js, Node.js and PHP.",
    url: "https://joaocorreia.dev",
    siteName: "João Correia Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "João Correia - Fullstack Developer",
    description: "Portfolio of João Correia, Fullstack Developer specializing in JavaScript, React, Vue.js, Node.js and PHP.",
    creator: "@joaocorreia00",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
