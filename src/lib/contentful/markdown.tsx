"use client";

import ReactMarkdown from "react-markdown";
import Link from "next/link";

// =============================================================================
// Markdown Rendering Component
// =============================================================================

interface MarkdownProps {
  content: string;
  className?: string;
}

/**
 * Renders Markdown content with styled components matching the site's design.
 * Use this for all Contentful Long Text fields with Markdown appearance.
 */
export function Markdown({ content, className }: MarkdownProps) {
  if (!content) return null;

  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          // Headings
          h1: ({ children }) => (
            <h1
              className="mb-4 mt-8 font-heading font-bold text-sand-900 dark:text-white tracking-[var(--tracking-section)]"
              style={{ fontSize: "var(--text-section)" }}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              className="mb-4 mt-6 font-heading font-semibold text-sand-900 dark:text-white tracking-[var(--tracking-section)]"
              style={{ fontSize: "var(--text-section)" }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-3 mt-5 font-heading text-xl font-semibold text-sand-900 dark:text-white tracking-[var(--tracking-section)]">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mb-3 mt-4 font-heading text-lg font-semibold text-sand-900">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="mb-2 mt-4 font-heading text-base font-semibold text-sand-900">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="mb-2 mt-4 font-heading text-sm font-semibold text-sand-900">
              {children}
            </h6>
          ),

          // Paragraphs
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="mb-4 ml-6 list-disc space-y-2 marker:text-lagoon-foundation dark:marker:text-lagoon-accent">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 ml-6 list-decimal space-y-2 marker:font-semibold marker:text-lagoon-foundation dark:marker:text-lagoon-accent">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,

          // Text formatting
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          code: ({ children }) => (
            <code className="rounded bg-sand-100 px-1.5 py-0.5 font-mono text-sm">
              {children}
            </code>
          ),

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-2 border-lagoon-foundation pl-6 italic text-sand-700 dark:border-lagoon-accent dark:text-sand-300">
              {children}
            </blockquote>
          ),

          // Horizontal rule
          hr: () => <hr className="my-8 border-t border-sand-200" />,

          // Links
          a: ({ href, children }) => {
            const isExternal =
              href?.startsWith("http") && !href?.includes("miciicampioni.ro");

            if (isExternal) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lagoon-foundation underline underline-offset-2 transition-colors hover:text-lagoon-deep dark:text-lagoon-accent dark:hover:text-lagoon-200"
                >
                  {children}
                </a>
              );
            }

            return (
              <Link
                href={href || "#"}
                className="text-lagoon-foundation underline underline-offset-2 transition-colors hover:text-lagoon-deep dark:text-lagoon-accent dark:hover:text-lagoon-200"
              >
                {children}
              </Link>
            );
          },

          // Tables
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => <thead>{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-sand-200">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="bg-sand-50 px-4 py-3 text-left font-semibold text-sand-900">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-left">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// =============================================================================
// Simple Markdown to Plain Text (for previews/excerpts)
// =============================================================================

/**
 * Strips Markdown formatting and returns plain text.
 * Useful for generating excerpts or meta descriptions.
 */
export function stripMarkdown(markdown: string): string {
  if (!markdown) return "";

  return (
    markdown
      // Remove headers
      .replace(/^#{1,6}\s+/gm, "")
      // Remove bold/italic
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/__([^_]+)__/g, "$1")
      .replace(/_([^_]+)_/g, "$1")
      // Remove links, keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      // Remove images
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
      // Remove inline code
      .replace(/`([^`]+)`/g, "$1")
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, "")
      // Remove blockquotes
      .replace(/^>\s+/gm, "")
      // Remove list markers
      .replace(/^[-*+]\s+/gm, "")
      .replace(/^\d+\.\s+/gm, "")
      // Remove horizontal rules
      .replace(/^[-*_]{3,}\s*$/gm, "")
      // Collapse whitespace
      .replace(/\n{2,}/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}
