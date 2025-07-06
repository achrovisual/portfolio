import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientIntroHandler from "./ClientIntroHandler";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${helveticaNeue.variable} h-full`}>
      <body>
        <ClientIntroHandler>{children}</ClientIntroHandler>
      </body>
    </html>
  );
}
