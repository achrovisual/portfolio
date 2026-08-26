import type { Metadata } from "next";
import { Lexend, Source_Serif_4 } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "../styles/globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://achrovisual.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Gino",
    template: "%s | Gino",
  },
  description:
    "I'm Gino (@achrovisual) — a DevOps engineer and UI designer. I build reliable cloud platforms, bare-metal networks, and intuitive digital experiences.",
  keywords: [
    "Gino",
    "achrovisual",
    "DevOps",
    "UI/UX Design",
    "Platform Engineering",
    "Kubernetes",
    "AWS",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Gino (@achrovisual)" }],
  creator: "Gino",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Gino",
    description:
      "I'm Gino (@achrovisual) — a DevOps engineer and UI designer. I build reliable cloud platforms, bare-metal networks, and intuitive digital experiences.",
    url: baseUrl,
    siteName: "Gino Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gino",
    description:
      "I'm Gino (@achrovisual) — a DevOps engineer and UI designer. I build reliable cloud platforms, bare-metal networks, and intuitive digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lexend.variable} ${sourceSerif.variable}`}>
      <body className="h-[100svh] flex flex-col overflow-hidden font-sans">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden snap-y snap-mandatory">
          <div className="max-w-7xl mx-auto py-8 h-full flex flex-col">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
