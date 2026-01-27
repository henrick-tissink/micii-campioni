import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Navigation as NavigationType, SiteSettings } from "@/types/contentful";

// =============================================================================
// Types
// =============================================================================

export interface FooterProps {
  navigation?: NavigationType | null;
  siteSettings?: SiteSettings | null;
}

// =============================================================================
// Component
// =============================================================================

export function Footer({ navigation, siteSettings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const navItems = navigation?.items || [];

  // Group navigation items for footer columns
  const mainLinks = navItems.slice(0, Math.ceil(navItems.length / 2));
  const secondaryLinks = navItems.slice(Math.ceil(navItems.length / 2));

  return (
    <footer className="bg-sand-900 text-sand-300">
      {/* Main footer content */}
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              {siteSettings?.logo ? (
                <Image
                  src={siteSettings.logo.url}
                  alt={siteSettings.logo.title || "Micii Campioni"}
                  width={160}
                  height={40}
                  className="h-10 w-auto brightness-0 invert"
                />
              ) : (
                <span className="font-heading text-xl font-bold text-white">
                  Micii Campioni
                </span>
              )}
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              {siteSettings?.tagline ||
                "Primul club de educație acvatică din România, oferind cursuri de înot pentru copii de toate vârstele."}
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-4">
              {siteSettings?.facebookUrl && (
                <a
                  href={siteSettings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-sand-400 transition-colors hover:bg-sand-800 hover:text-white"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {siteSettings?.instagramUrl && (
                <a
                  href={siteSettings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-sand-400 transition-colors hover:bg-sand-800 hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {siteSettings?.twitterUrl && (
                <a
                  href={siteSettings.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-sand-400 transition-colors hover:bg-sand-800 hover:text-white"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation columns */}
          <div>
            <h3 className="mb-4 font-heading font-semibold text-white">
              Navigare
            </h3>
            <ul className="space-y-2">
              {mainLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading font-semibold text-white">
              Informații
            </h3>
            <ul className="space-y-2">
              {secondaryLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/termeni-conditii"
                  className="text-sm transition-colors hover:text-white"
                >
                  Termeni și Condiții
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-confidentialitate"
                  className="text-sm transition-colors hover:text-white"
                >
                  Politica de Confidențialitate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="mb-4 font-heading font-semibold text-white">
              Contact
            </h3>
            <ul className="space-y-3">
              {siteSettings?.phone && (
                <li>
                  <a
                    href={`tel:${siteSettings.phone}`}
                    className="flex items-start gap-3 text-sm transition-colors hover:text-white"
                  >
                    <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-lagoon-400" />
                    {siteSettings.phone}
                  </a>
                </li>
              )}
              {siteSettings?.email && (
                <li>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="flex items-start gap-3 text-sm transition-colors hover:text-white"
                  >
                    <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-lagoon-400" />
                    {siteSettings.email}
                  </a>
                </li>
              )}
              {siteSettings?.address && (
                <li className="flex items-start gap-3 text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-lagoon-400" />
                  <span>{siteSettings.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-sand-800">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 py-6 text-sm md:flex-row">
            <p>
              © {currentYear} Micii Campioni. Toate drepturile rezervate.
            </p>
            <p className="text-sand-500">
              Designed with ❤️ for little swimmers
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
