import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import type { Navigation as NavigationType, SiteSettings } from "@/types/contentful";

// =============================================================================
// Types
// =============================================================================

export interface FooterProps {
  navigation?: NavigationType | null;
  siteSettings?: SiteSettings | null;
}

const CURSURI = [
  { label: "Metoda Sultana", href: "/servicii#metoda-sultana" },
  { label: "Educație acvatică", href: "/servicii#educatie-acvatica" },
  { label: "Joacă acvatică", href: "/servicii#joaca-acvatica" },
  { label: "Inițiere înot", href: "/servicii#initiere-inot" },
  { label: "Gravide", href: "/servicii#gravide" },
  { label: "Școala Părinților", href: "/servicii#scoala-parintilor" },
];

// =============================================================================
// Subcomponent
// =============================================================================

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mono-eyebrow mb-[18px] font-medium text-lagoon-accent">{title}</h3>
      <ul className="m-0 flex list-none flex-col gap-[11px] p-0">
        {items.map((i) => (
          <li key={i.label} className="text-sm">
            <Link href={i.href} className="link-underline text-white/[0.78]">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// =============================================================================
// Component
// =============================================================================

export function Footer({ navigation, siteSettings }: FooterProps) {
  const year = new Date().getFullYear();
  const phone = siteSettings?.phone || "+40 722 310 052";
  const email = siteSettings?.email || "clubulmiciicampioni@yahoo.com";

  const navItems =
    navigation?.items && navigation.items.length > 0
      ? navigation.items
      : [
          { label: "Acasă", href: "/" },
          { label: "Despre noi", href: "/despre-noi" },
          { label: "Metoda", href: "/concept" },
          { label: "Cursuri", href: "/servicii" },
          { label: "Galerie", href: "/galerie" },
          { label: "Asociația", href: "/asociatia" },
          { label: "Contact", href: "/contact" },
        ];

  return (
    <footer className="texture-grain relative overflow-hidden bg-lagoon-deep pb-8 pt-[72px] text-white/70">
      <Container className="relative">
        <div className="mb-14 grid gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Image
              src="/images/logos/logo-micii-campioni-white.png"
              alt="Micii Campioni"
              width={208}
              height={52}
              style={{ width: "auto" }}
              className="h-[52px]"
            />
            <p className="mt-6 max-w-[340px] text-sm leading-relaxed">
              Primul Club de Educație Acvatică din România. Metoda Sultana — singura
              metodologie acreditată pentru educație acvatică timpurie.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Badge variant="credential">COR · 342215</Badge>
              <Badge variant="credential">EST · 2001</Badge>
            </div>
            <p
              className="display mt-8 max-w-[320px] italic leading-tight text-lagoon-accent"
              style={{ fontSize: 28 }}
            >
              Apa nu se cucerește, se înțelege.
            </p>
          </div>

          <FooterCol title="NAVIGAȚIE" items={navItems} />
          <FooterCol title="CURSURI" items={CURSURI} />
          <FooterCol
            title="CONTACT"
            items={[
              { label: phone, href: `tel:${phone.replace(/\s/g, "")}` },
              { label: email, href: `mailto:${email}` },
              { label: "București · Sector 1", href: "/contact" },
              { label: siteSettings?.address || "Str. Strabuna nr. 26", href: "/contact" },
            ]}
          />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[var(--tracking-mono)] text-white/45">
          <span>© {year} Clubul Micii Campioni · Toate drepturile rezervate</span>
          <div className="flex gap-7">
            <Link href="/termeni-conditii" className="text-inherit no-underline hover:text-white">
              Termeni
            </Link>
            <Link
              href="/politica-confidentialitate"
              className="text-inherit no-underline hover:text-white"
            >
              Confidențialitate
            </Link>
          </div>
          <span className="text-coral-refined">Designed with care for little swimmers</span>
        </div>
      </Container>
    </footer>
  );
}
