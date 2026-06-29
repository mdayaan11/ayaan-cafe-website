import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Initialize the Inter font with Latin subsets and define it as a CSS variable.
// This allows using 'font-inter' in Tailwind CSS configuration.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Define metadata for the entire application. This will be merged with page-specific metadata.
export const metadata: Metadata = {
  title: {
    default: "Ayaan Cafe | Authentic Flavors, Unforgettable Moments",
    template: "%s | Ayaan Cafe", // Used for dynamic page titles (e.g., "Menu | Ayaan Cafe")
  },
  description: "Experience the best coffee, delicious food, and a cozy ambiance at Ayaan Cafe. Order online, reserve a table, or explore our menu. Your perfect spot for pickup, delivery, and memorable dining.",
  keywords: [
    "Ayaan Cafe",
    "cafe",
    "coffee shop",
    "restaurant",
    "online ordering",
    "table reservation",
    "menu",
    "food",
    "drinks",
    "bakery",
    "desserts",
    "brunch",
    "lunch",
    "dinner",
    "pickup",
    "delivery",
    "contact",
    "location",
    "about us",
    "blog",
    "news",
  ],
  authors: [{ name: "Ayaan Cafe Team" }],
  creator: "Ayaan Cafe Team",
  publisher: "Ayaan Cafe",
  // Open Graph metadata for social media sharing (e.g., Facebook, LinkedIn)
  openGraph: {
    title: "Ayaan Cafe | Authentic Flavors, Unforgettable Moments",
    description: "Experience the best coffee, delicious food, and a cozy ambiance at Ayaan Cafe. Order online, reserve a table, or explore our menu.",
    url: "https://www.ayaancafe.com", // Replace with your actual domain
    siteName: "Ayaan Cafe",
    images: [
      {
        url: "https://www.ayaancafe.com/og-image.jpg", // Replace with your actual Open Graph image
        width: 1200,
        height: 630,
        alt: "Ayaan Cafe - Delicious Food & Coffee",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Twitter Card metadata for Twitter sharing
  twitter: {
    card: "summary_large_image",
    title: "Ayaan Cafe | Authentic Flavors, Unforgettable Moments",
    description: "Experience the best coffee, delicious food, and a cozy ambiance at Ayaan Cafe.",
    creator: "@AyaanCafe", // Replace with your actual Twitter handle
    images: ["https://www.ayaancafe.com/twitter-image.jpg"], // Replace with your actual Twitter image
  },
  // Viewport settings for responsive design and mobile experience
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false, // Prevents users from zooming, common for web apps
  },
  // Theme color for browser UI (e.g., Android Chrome address bar)
  themeColor: "#6F4E37", // A warm, coffee-like brown color
  // Path to web app manifest for Progressive Web App (PWA) features
  manifest: "/site.webmanifest",
  // Icons for various platforms and devices
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

/**
 * The root layout component for the Ayaan Cafe website.
 * This component wraps all pages and provides the basic HTML structure,
 * global styles, and metadata defined above.
 *
 * @param {Readonly<{ children: React.ReactNode }>} props - The children to be rendered within the layout.
 * @returns {JSX.Element} The root HTML structure of the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        {/* 
          In a full-fledged application, this is where you would typically include global components 
          like a persistent Header, Footer, or various Context/Provider components (e.g., 
          ThemeProvider for dark mode, SessionProvider for authentication, QueryClientProvider for data fetching).
          For this initial basic layout, we are providing the core HTML structure and global styles.
        */}
        {children}
      </body>
    </html>
  );
}
