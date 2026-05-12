import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center">
      <Container className="text-center">
        <div className="mx-auto max-w-md">
          {/* Decorative 404 */}
          <div className="mb-8">
            <span className="font-heading text-8xl font-bold text-lagoon-foundation/20 md:text-9xl">
              404
            </span>
          </div>

          <h1
            className="font-heading font-bold text-sand-900 dark:text-white"
            style={{
              fontSize: "var(--text-section)",
              letterSpacing: "var(--tracking-section)",
              lineHeight: 1.1,
            }}
          >
            Pagină negăsită
          </h1>

          <p className="mt-4 text-lg text-sand-600">
            Ne pare rău, dar pagina pe care o cauți nu există sau a fost mutată.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/">Înapoi Acasă</Button>
            <Button href="/contact" variant="outline">
              Contactează-ne
            </Button>
          </div>

          {/* Helpful links */}
          <div className="mt-12 border-t border-sand-200 pt-8">
            <p className="mb-4 text-sm text-sand-600 dark:text-sand-400">
              Poate te interesează:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/servicii"
                className="text-lagoon-foundation transition-colors hover:text-lagoon-deep"
              >
                Cursuri
              </Link>
              <Link
                href="/despre-noi"
                className="text-lagoon-foundation transition-colors hover:text-lagoon-deep"
              >
                Despre Noi
              </Link>
              <Link
                href="/contact"
                className="text-lagoon-foundation transition-colors hover:text-lagoon-deep"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
