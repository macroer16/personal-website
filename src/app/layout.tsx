import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Cursor from "@/components/Cursor";
import Dock from "@/components/Dock";
import { site } from "@/data/site";
import "./globals.css";

const description =
  "Victor Benson — Computer Science student at the University of Westminster and AWS Certified Solutions Architect. Projects, experience and contact.";

// Full SEO and social-preview metadata (Open Graph + Twitter card).
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s · ${site.name}` },
  description,
  keywords: ["Victor Benson", "Computer Science", "University of Westminster", "AWS", "Software Engineer", "London"],
  authors: [{ name: site.name, url: site.url }],
  openGraph: { type: "website", url: site.url, title: `${site.name} — ${site.role}`, description, siteName: site.name, locale: "en_GB" },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.role}`, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0a0a0a" };

// Applies the saved theme before the page paints, so there's no flash of the wrong colours.
const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.add("light")}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Cursor />
        {children}
        <Dock />
      </body>
    </html>
  );
}
