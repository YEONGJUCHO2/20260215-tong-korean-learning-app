import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Modern sans-serif font
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { AuthProvider } from '@/lib/firebase/auth';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TONG (통) — Speak Korean. 말이 통하다.",
  description: "Learn Korean through K-Culture with native teachers. Conversation-focused lessons, RPG gamification, and AI-powered materials.",
  keywords: ["Korean learning", "K-POP", "K-Drama", "language tutoring", "한국어", "TONG"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={outfit.variable}>
      <body className="font-outfit antialiased min-h-screen text-gray-900 relative overflow-x-hidden selection:bg-purple-200 selection:text-purple-900">

        {/* Global Background Orbs - Stitch Style (Light Mode) */}
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[120px] animate-orb opacity-60" />
          <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-[100px] animate-orb [animation-delay:-5s] opacity-60" />
          <div className="absolute top-[30%] left-[40%] w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[80px] animate-orb [animation-delay:-10s] opacity-50" />
        </div>

        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 container-width relative z-10">
                {children}
              </main>
              {/* Footer is temporarily commented out or needs styling update */}
              {/* <Footer /> */}
            </div>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
