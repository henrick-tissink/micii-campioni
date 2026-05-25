"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
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
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = pathname === "/";
  // Transparent chrome only over the home hero, before the user scrolls.
  const overHero = isHome && !isScrolled;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  // Flip chrome to the cream-blur look once the hero scrolls out of view.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape; lock body scroll while open.
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

  const navItems = (navigation?.items || []).filter(
    (item) => item.href !== "/contact"
  );

  const phone = siteSettings?.phone || "+40 722 310 052";
  const email = siteSettings?.email || "clubulmiciicampioni@yahoo.com";

  return (
    <>
      {/* Top contact strip */}
      <div className="hidden bg-lagoon-foundation py-2.5 font-mono text-xs tracking-[0.04em] text-white/85 lg:block dark:bg-night-800 dark:border-b dark:border-night-700">
        <Container>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-5">
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="whitespace-nowrap transition-colors hover:text-white"
              >
                {phone}
              </a>
              <span className="opacity-35">·</span>
              <a
                href={`mailto:${email}`}
                className="whitespace-nowrap transition-colors hover:text-white"
              >
                {email}
              </a>
            </div>
            <div className="whitespace-nowrap text-amber-credential">
              EST · 2001 — 25 ANI
            </div>
          </div>
        </Container>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-300 w-full transition-[background-color,box-shadow] duration-300",
          overHero
            ? "bg-transparent"
            : "bg-cream/95 shadow-[0_1px_0_rgba(7,51,47,0.08)] backdrop-blur-md backdrop-saturate-150 dark:bg-night-900/95 dark:shadow-lg"
        )}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500 focus-visible:ring-offset-2"
              aria-label="Micii Campioni — Acasă"
            >
              <Image
                src={
                  overHero
                    ? "/images/logos/logo-micii-campioni-white.png"
                    : "/images/logos/logo-micii-campioni.png"
                }
                alt="Micii Campioni"
                width={203}
                height={136}
                priority
                className={cn(
                  "h-10 w-auto transition-opacity duration-200 lg:h-11",
                  !overHero && "dark:brightness-0 dark:invert"
                )}
              />
            </Link>

            {/* Desktop navigation */}
            <div className="hidden items-center gap-9 lg:flex">
              <ul className="flex items-center gap-9">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative text-[13.5px] font-medium tracking-[0.01em] transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                        overHero
                          ? "text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.25)] hover:text-white focus-visible:ring-white"
                          : "text-sand-800 hover:text-lagoon-foundation focus-visible:ring-lagoon-foundation dark:text-sand-200 dark:hover:text-lagoon-accent"
                      )}
                    >
                      {isActive(item.href) && (
                        <span
                          aria-hidden="true"
                          className="absolute left-[-14px] top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-coral-refined"
                        />
                      )}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3">
                <ThemeToggle size="sm" />
                <Button
                  href="/contact"
                  size="sm"
                  variant={overHero ? "primary" : "dark"}
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                >
                  Programează
                </Button>
              </div>
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle size="sm" />
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  "rounded-lg p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500",
                  overHero
                    ? "text-white hover:bg-white/10"
                    : "text-sand-700 hover:bg-sand-100 dark:text-sand-300 dark:hover:bg-night-800"
                )}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Închide meniul" : "Deschide meniul"}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Mobile navigation — outside header to avoid backdrop-filter containing block */}
      <motion.div
        className="fixed inset-x-0 top-16 bottom-0 z-400 bg-white dark:bg-night-900 lg:hidden"
        initial={false}
        animate={{ x: isMenuOpen ? 0 : "100%", opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen || undefined}
      >
        <Container className="h-full overflow-y-auto py-6">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "block rounded-xl px-4 py-3 font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500",
                    isActive(item.href)
                      ? "bg-lagoon-50 font-semibold text-lagoon-foundation dark:bg-night-800 dark:text-lagoon-accent"
                      : "text-sand-700 hover:bg-sand-50 hover:text-lagoon-foundation dark:text-sand-300 dark:hover:bg-night-800 dark:hover:text-lagoon-accent"
                  )}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="mt-6 px-4">
            <Button href="/contact" fullWidth onClick={() => setIsMenuOpen(false)}>
              Programează
            </Button>
          </div>

          <div className="mt-8 space-y-3 border-t border-sand-200 px-4 pt-6 dark:border-night-700">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="block font-mono text-sm text-sand-600 dark:text-sand-400"
            >
              {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="block font-mono text-sm text-sand-600 dark:text-sand-400"
            >
              {email}
            </a>
          </div>
        </Container>
      </motion.div>
    </>
  );
}
