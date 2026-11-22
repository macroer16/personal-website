import type { Metadata, Viewport } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/caveat/500.css";
import { site } from "@/data/site";
import "./globals.css";

const description =
  "Victor Benson — Computer Science student at the University of Westminster and AWS Certified Solutions Architect, based in London.";

// SEO and social previews (Open Graph + Twitter card).
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

export const viewport: Viewport = { themeColor: "#f5f2ea" };

// Apply the saved theme before the first paint so the colours never flash.
const themeScript = `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative">{children}</body>
    </html>
  );
}
