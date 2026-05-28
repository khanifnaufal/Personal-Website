import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khanif Naufal Website Portofolio",
  description:
    "Portfolio of Muhammad Khanif Naufal — Full-Stack Developer and Machine Learning/Deep Learning Engineer. Building the future through code and intelligence.",
  keywords: [
    "Muhammad Khanif Naufal",
    "Full-Stack Developer",
    "ML Engineer",
    "Deep Learning",
    "Portfolio",
    "Next.js",
    "React",
    "Three.js",
  ],
  authors: [{ name: "Muhammad Khanif Naufal" }],
  openGraph: {
    title: "Muhammad Khanif Naufal | Full-Stack Developer & ML/DL Engineer",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${jetbrainsMono.variable} ${inter.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (!sessionStorage.getItem('visited_portfolio')) {
                  document.documentElement.classList.add('loading-state');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen overflow-x-clip">{children}</body>
    </html>
  );
}
