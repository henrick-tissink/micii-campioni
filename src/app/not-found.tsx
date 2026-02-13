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
            <span className="font-heading text-8xl font-bold text-lagoon-200 md:text-9xl">
              404
            </span>
          </div>

          <h1 className="font-heading text-3xl font-bold text-sand-900 md:text-4xl">
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
            <p className="mb-4 text-sm text-sand-500">
              Poate te interesează:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/servicii"
                className="text-lagoon-600 hover:text-lagoon-700"
              >
                Cursuri
              </Link>
              <Link
                href="/despre-noi"
                className="text-lagoon-600 hover:text-lagoon-700"
              >
                Despre Noi
              </Link>
              <Link
                href="/contact"
                className="text-lagoon-600 hover:text-lagoon-700"
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
