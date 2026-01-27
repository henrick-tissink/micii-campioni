"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Navigation as NavigationType, SiteSettings } from "@/types/contentful";

// =============================================================================
// Types
// =============================================================================

export interface HeaderProps {
  navigation?: NavigationType | null;
  siteSettings?: SiteSettings | null;
}

// =============================================================================
// Component
// =============================================================================

export function Header({ navigation, siteSettings }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navItems = navigation?.items || [];

  return (
    <>
      {/* Top bar with contact info */}
      <div className="hidden bg-lagoon-600 py-2 text-sm text-white lg:block">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {siteSettings?.phone && (
                <a
                  href={`tel:${siteSettings.phone}`}
                  className="flex items-center gap-2 transition-colors hover:text-lagoon-100"
                >
                  <Phone className="h-4 w-4" />
                  {siteSettings.phone}
                </a>
              )}
              {siteSettings?.email && (
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-lagoon-100"
                >
                  <Mail className="h-4 w-4" />
                  {siteSettings.email}
                </a>
              )}
            </div>
            <div className="text-lagoon-100">
              {siteSettings?.anniversaryActive && siteSettings?.anniversaryText
                ? siteSettings.anniversaryText
                : "Primul Club de Educație Acvatică din România"}
            </div>
          </div>
        </Container>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-300 w-full transition-all duration-200",
          isScrolled
            ? "bg-white/95 shadow-soft backdrop-blur-md"
            : "bg-white"
        )}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500 focus-visible:ring-offset-2"
            >
              {siteSettings?.logo ? (
                <Image
                  src={siteSettings.logo.url}
                  alt={siteSettings.logo.title || "Micii Campioni"}
                  width={180}
                  height={48}
                  className="h-10 w-auto lg:h-12"
                  priority
                />
              ) : (
                <span className="font-heading text-xl font-bold text-lagoon-600">
                  Micii Campioni
                </span>
              )}
            </Link>

            {/* Desktop navigation */}
            <div className="hidden items-center gap-8 lg:flex">
              <ul className="flex items-center gap-6">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "font-medium text-sand-700 transition-colors hover:text-lagoon-600",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500 focus-visible:ring-offset-2"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Button href="/contact" size="sm">
                Contact
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "rounded-lg p-2 text-sand-700 transition-colors hover:bg-sand-100 lg:hidden",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500"
              )}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </nav>
        </Container>

      </header>

      {/* Mobile navigation - outside header to avoid backdrop-filter containing block */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 z-400 bg-white transition-transform duration-300 lg:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Container className="h-full overflow-y-auto py-6">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "block rounded-xl px-4 py-3 font-medium text-sand-700 transition-colors hover:bg-sand-50 hover:text-lagoon-600",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 px-4">
            <Button
              href="/contact"
              fullWidth
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Button>
          </div>

          {/* Mobile contact info */}
          <div className="mt-8 space-y-3 border-t border-sand-200 px-4 pt-6">
            {siteSettings?.phone && (
              <a
                href={`tel:${siteSettings.phone}`}
                className="flex items-center gap-3 text-sand-600"
              >
                <Phone className="h-5 w-5 text-lagoon-500" />
                {siteSettings.phone}
              </a>
            )}
            {siteSettings?.email && (
              <a
                href={`mailto:${siteSettings.email}`}
                className="flex items-center gap-3 text-sand-600"
              >
                <Mail className="h-5 w-5 text-lagoon-500" />
                {siteSettings.email}
              </a>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
