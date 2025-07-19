import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientIntroHandler from "./ClientIntroHandler";
import logger from "@/lib/logger";
import { getCorrelationId } from "@/lib/correlation";
const helveticaNeue = localFont({
  src: [
    {
      path: "../../public/fonts/HelveticaNeueRoman.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeueMedium.otf",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-helvetica-neue",
});

export const metadata: Metadata = {
  title: {
    default: "Eugenio Pastoral",
    template: "%s | Eugenio Pastoral",
  },
  description:
    "I'm Gino, a DevOps Engineer and UI Designer. Explore my portfolio for projects blending technical innovation with creative design.",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "DevOps Engineer",
    "UI Designer",
    "Portfolio",
    "Gino",
    "Eugenio Pastoral",
    "achrovisual",
  ],
  authors: [{ name: "Eugenio Pastoral" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const correlationId = await getCorrelationId();

  const layoutLogger = logger.child({ correlationId, module: "RootLayout" });
  layoutLogger.info("RootLayout rendering started.");

  return (
    <html lang="en" className={`${helveticaNeue.variable} h-full`}>
      <head>
        <meta name="x-correlation-id" content={correlationId} />
      </head>
      <body>
        <ClientIntroHandler>{children}</ClientIntroHandler>
      </body>
    </html>
  );
}
