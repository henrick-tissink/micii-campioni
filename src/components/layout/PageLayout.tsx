import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TreatedImage } from "@/components/ui/TreatedImage";
import { SIZES } from "@/lib/contentful/image";
import { Sidebar } from "./Sidebar";
import type { Widget, ContentfulImage } from "@/types/contentful";

// =============================================================================
// Types
// =============================================================================

export interface Breadcrumb {
  label: string;
  href: string;
}

export interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  heroImage?: ContentfulImage;
  heroImageAlt?: string;
  breadcrumbs?: Breadcrumb[];
  sidebarWidgets?: Widget[];
  className?: string;
}

// =============================================================================
// Component
// =============================================================================

export function PageLayout({
  children,
  title,
  subtitle,
  heroImage,
  heroImageAlt,
  breadcrumbs,
  sidebarWidgets,
  className,
}: PageLayoutProps) {
  const hasSidebar = sidebarWidgets && sidebarWidgets.length > 0;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://miciicampioni.ro";

  const breadcrumbJsonLd =
    breadcrumbs && breadcrumbs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Acasă", item: siteUrl },
            ...breadcrumbs.map((crumb, i) => ({
              "@type": "ListItem" as const,
              position: i + 2,
              name: crumb.label,
              item: `${siteUrl}${crumb.href}`,
            })),
          ],
        }
      : null;

  return (
    <>
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
      )}

      {/* Hero Section — TreatedImage + .hero-overlay */}
      <section className="relative min-h-[400px] overflow-hidden bg-lagoon-foundation">
        {heroImage && (
          <TreatedImage
            src={heroImage.url}
            alt={heroImageAlt || heroImage.title || title}
            fill
            sizes={SIZES.hero}
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 hero-overlay" />
        <Container className="relative z-10 flex min-h-[400px] flex-col justify-center py-16">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-1 text-sm text-lagoon-100/80">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-white"
                  >
                    Acasă
                  </Link>
                </li>
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.href} className="flex items-center gap-1">
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    {index === breadcrumbs.length - 1 ? (
                      <span aria-current="page" className="text-white">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="transition-colors hover:text-white"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="max-w-3xl">
            <h1
              className="font-heading font-bold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]"
              style={{
                fontSize: "var(--text-section)",
                letterSpacing: "var(--tracking-section)",
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 max-w-2xl text-xl leading-relaxed text-lagoon-100/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
                {subtitle}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Section background="white" spacing="xl">
        <div
          className={cn(
            "grid gap-12",
            hasSidebar ? "lg:grid-cols-3" : "mx-auto max-w-4xl",
            className
          )}
        >
          {/* Main Content Column */}
          <div className={cn(hasSidebar && "lg:col-span-2")}>
            {children}
          </div>

          {/* Sidebar */}
          {hasSidebar && (
            <aside className="lg:col-span-1">
              <Sidebar widgets={sidebarWidgets} />
            </aside>
          )}
        </div>
      </Section>
    </>
  );
}

// =============================================================================
// Simple Hero variant for section landing pages
// =============================================================================

export interface SectionHeroProps {
  title: string;
  subtitle?: string;
  heroImage?: ContentfulImage;
  children?: React.ReactNode;
}

export function SectionHero({
  title,
  subtitle,
  heroImage,
  children,
}: SectionHeroProps) {
  return (
    <section className="relative min-h-[400px] overflow-hidden bg-lagoon-foundation md:min-h-[440px]">
      {heroImage && (
        <TreatedImage
          src={heroImage.url}
          alt={heroImage.title || title}
          fill
          sizes={SIZES.hero}
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 hero-overlay" />
      <Container className="relative z-10 flex min-h-[400px] flex-col items-center justify-center py-16 text-center md:min-h-[440px]">
        <h1
          className="font-heading font-bold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]"
          style={{
            fontSize: "var(--text-section)",
            letterSpacing: "var(--tracking-section)",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-lagoon-100/90 md:text-xl [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
            {subtitle}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
