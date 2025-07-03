import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";

const helveticaNeue = localFont({
  // https://typography.fandom.com/wiki/Helvetica_Neue
  // https://www.cdnfonts.com/helvetica-neue-5.font
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
  title: "Eugenio Pastoral",
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
      <body className="antialiased flex flex-col min-h-screen min-w-[1024px]">
        <Navbar />

        <main className="flex flex-grow flex-col overflow-y-auto overflow-x-hidden pt-[5.5rem]">
          {children}
        </main>
      </body>
    </html>
  );
}
