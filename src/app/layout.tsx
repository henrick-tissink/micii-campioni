import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getNavigation, getSiteSettings } from "@/lib/contentful/queries";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://miciicampioni.ro"
  ),
  title: {
    default: "Micii Campioni - Primul club de educatie acvatica din Romania",
    template: "%s | Micii Campioni",
  },
  description:
    "Clubul Micii Campioni - educatie acvatica pentru bebelusi si copii, Metoda Sultana, cursuri prenatale Lamaze din 2001. Fondatoare Georgeta Sultana.",
  keywords: [
    "educatie acvatica",
    "inot bebelusi",
    "Metoda Sultana",
    "Micii Campioni",
    "cursuri inot copii",
    "Bucuresti",
    "Lamaze",
    "cursuri prenatale",
    "kinetoterapie copii",
  ],
  authors: [{ name: "Clubul Micii Campioni" }],
  creator: "Georgeta Sultana",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "Micii Campioni",
    title: "Micii Campioni - Primul club de educatie acvatica din Romania",
    description:
      "Educatie acvatica pentru bebelusi si copii, Metoda Sultana, cursuri prenatale Lamaze din 2001.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@MiciiCampioni1",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [headerNav, siteSettings] = await Promise.all([
    getNavigation("header"),
    getSiteSettings(),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://miciicampioni.ro";

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Clubul Micii Campioni",
    alternateName: "Micii Campioni",
    url: siteUrl,
    logo: siteSettings?.logo?.url
      ? siteSettings.logo.url.startsWith("//")
        ? `https:${siteSettings.logo.url}`
        : siteSettings.logo.url
      : `${siteUrl}/images/logos/logo-micii-campioni.png`,
    foundingDate: "2001",
    founder: {
      "@type": "Person",
      name: "Georgeta Sultana",
    },
    description:
      "Primul club de educatie acvatica din Romania, dedicat dezvoltarii armonioase a copiilor prin intermediul apei.",
    address: siteSettings?.address
      ? {
          "@type": "PostalAddress",
          streetAddress: siteSettings.address,
          addressLocality: "Bucuresti",
          addressCountry: "RO",
        }
      : undefined,
    telephone: siteSettings?.phone,
    email: siteSettings?.email,
    sameAs: [
      siteSettings?.facebookUrl,
      siteSettings?.instagramUrl,
      siteSettings?.twitterUrl,
    ].filter(Boolean),
  };

  return (
    <html lang="ro">
      <body
        className={`${plusJakarta.variable} ${inter.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <a href="#main-content" className="skip-link">
          Salt la conținut principal
        </a>
        <Header navigation={headerNav} siteSettings={siteSettings} />
        <main id="main-content">{children}</main>
        <Footer navigation={headerNav} siteSettings={siteSettings} />
      </body>
    </html>
  );
}
