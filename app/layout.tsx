import { UserDataProvider } from "@/contexts/UserDataContext";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Head from "next/head";
import Script from "next/script";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const poppins = localFont({
  src: "./fonts/Poppins.woff2",
  variable: "--font-poppins",
  weight: "400",
  preload: false,
});
const raleway = localFont({
  src: "./fonts/Raleway.woff2",
  variable: "--font-raleway",
  weight: "100 900",
});

const opensans = localFont({
  src: "./fonts/Open Sans.woff2",
  variable: "--font-open-sans",
  weight: "100 800",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://EasyTechpro.reactbd.org"),
  title: {
    template: "%s | EasyTech - Premium Online Shopping",
    default: "EasyTech - Your Trusted Online Shopping Destination",
  },
  description:
    "Discover amazing products at EasyTech, your trusted online shopping destination for quality items and exceptional customer service. Shop electronics, fashion, home goods and more with fast delivery.",
  keywords: [
    "online shopping",
    "e-commerce",
    "buy online",
    "shop online",
    "electronics",
    "fashion",
    "home goods",
    "deals",
    "discounts",
    "EasyTech",
  ],
  authors: [{ name: "EasyTech" }],
  creator: "EasyTech",
  publisher: "EasyTech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://EasyTechpro.reactbd.org",
    siteName: "EasyTech",
    title: "EasyTech - Your Trusted Online Shopping Destination",
    description:
      "Discover amazing products at EasyTech, your trusted online shopping destination for quality items and exceptional customer service.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EasyTech Online Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyTech - Your Trusted Online Shopping Destination",
    description:
      "Discover amazing products at EasyTech, your trusted online shopping destination for quality items and exceptional customer service.",
    images: ["/og-image.jpg"],
    creator: "@EasyTech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // Add other verification codes as needed
  },
  alternates: {
    canonical: "https://EasyTechpro.reactbd.org",
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const GADSENSE_CLIENT_ID = "ca-pub-6542623777003381"; // Define it once
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <meta name="google-adsense-account" content={GADSENSE_CLIENT_ID} />
        </Head>
        <body
          className={`${poppins.variable} ${raleway.variable} ${opensans.variable} antialiased`}
        >
          <UserDataProvider>{children}</UserDataProvider>

          <Toaster
            position="bottom-right"
            richColors
            closeButton
            toastOptions={{
              style: {
                background: "#ffffff",
                color: "#1f2937",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
              },
              className: "sonner-toast",
            }}
          />

          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GADSENSE_CLIENT_ID}`}
            strategy="beforeInteractive"
          />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
