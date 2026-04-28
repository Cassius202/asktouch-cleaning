import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ClientLoader from "@/loader/ClientLoader";
import Header from "../components/header/Header";
import Footer from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const imageUrl = 'https://nsqgfrsugkvsftnffeno.supabase.co/storage/v1/object/public/images/Untitled-2.jpg';

export const metadata: Metadata = {
  title: "Ask Touch | Professional Cleaning & Fumigation in Ibadan, Lagos and Nationwide",
  description: "Expert residential and office cleaning, pest control, and fumigation services. Creating healthy, pest-free spaces across Ibadan and nationwide. Schedule your service today!",
  keywords: ["Cleaning services Ibadan", "Fumigation Lagos", "Pest control Nigeria", "Office cleaning", "Ask Touch"],
  openGraph: {
    title: "Ask Touch | Professional Cleaning & Fumigation",
    description: "Providing premium cleaning and pest control services for homes and offices.",
    url: "https://asktouch-cleaning.vercel.app/",
    siteName: "Ask Touch",
    images: [
      {
        url: imageUrl, // The image you'll design
        width: 1200,
        height: 630,
        alt: "Ask Touch Professional Cleaning Services",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ask Touch | Professional Cleaning & Fumigation",
    description: "Creating healthy, pest-free spaces across Ibadan and Lagos.",
    images: [imageUrl],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      
      <body className="min-h-full flex flex-col">
        <Toaster reverseOrder={false} position="top-center" />
        <Header />
        <ClientLoader>
          {children}
          <Footer />
        </ClientLoader>
      </body>
    </html>
  );
}
