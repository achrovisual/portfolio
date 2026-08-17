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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lexend.variable} ${sourceSerif.variable}`}>
      <body className="h-screen flex flex-col overflow-hidden font-sans">
        <Header />
        <main className="flex-1 overflow-y-auto snap-y snap-mandatory">
          <div className="max-w-7xl mx-auto py-8 h-full flex flex-col">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
