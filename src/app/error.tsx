"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console in development
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-white dark:bg-night-900">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-coral-100">
            <AlertTriangle className="h-10 w-10 text-coral-600" />
          </div>

          <h1
            className="mb-4 font-heading font-bold text-sand-900 dark:text-white"
            style={{
              fontSize: "var(--text-section)",
              letterSpacing: "var(--tracking-section)",
              lineHeight: 1.1,
            }}
          >
            Oops! Ceva nu a mers bine
          </h1>

          <p className="mb-8 text-lg text-sand-600">
            Ne pare rău, a apărut o eroare neașteptată. Te rugăm să încerci din nou
            sau să revii la pagina principală.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button onClick={reset} variant="primary">
              <RefreshCw className="mr-2 h-4 w-4" />
              Încearcă din nou
            </Button>
            <Button href="/" variant="outline">
              <Home className="mr-2 h-4 w-4" />
              Pagina principală
            </Button>
          </div>

          {process.env.NODE_ENV === "development" && error.digest && (
            <p className="mt-8 text-sm text-sand-400">
              Error digest: {error.digest}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
