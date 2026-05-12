import {
  documentToReactComponents,
  type Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS, type Document } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

// =============================================================================
// Rich Text Rendering Options
// =============================================================================

const defaultOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => (
      <strong className="font-semibold">{text}</strong>
    ),
    [MARKS.ITALIC]: (text: ReactNode) => <em className="italic">{text}</em>,
    [MARKS.UNDERLINE]: (text: ReactNode) => (
      <span className="underline underline-offset-2">{text}</span>
    ),
    [MARKS.CODE]: (text: ReactNode) => (
      <code className="rounded bg-sand-100 px-1.5 py-0.5 font-mono text-sm">
        {text}
      </code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="mb-4 mt-8 font-heading text-3xl font-bold text-sand-900 md:text-4xl">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="mb-4 mt-6 font-heading text-2xl font-semibold text-sand-900 md:text-3xl">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="mb-3 mt-5 font-heading text-xl font-semibold text-sand-900 md:text-2xl">
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <h4 className="mb-3 mt-4 font-heading text-lg font-semibold text-sand-900">
        {children}
      </h4>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <h5 className="mb-2 mt-4 font-heading text-base font-semibold text-sand-900">
        {children}
      </h5>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <h6 className="mb-2 mt-4 font-heading text-sm font-semibold text-sand-900">
        {children}
      </h6>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 marker:text-lagoon-500">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 marker:font-semibold marker:text-lagoon-600">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li className="pl-1">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote className="my-6 rounded-r-xl border-l-4 border-lagoon-500 bg-lagoon-50 px-6 py-4 italic text-lagoon-800">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-t border-sand-200" />,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { file, title, description } = node.data.target.fields;
      const url = file?.url?.startsWith("//") ? `https:${file.url}` : file?.url;
      const width = file?.details?.image?.width || 800;
      const height = file?.details?.image?.height || 600;

      if (!url) return null;

      return (
        <figure className="my-6">
          <Image
            src={url}
            alt={description || title || ""}
            width={width}
            height={height}
            className="rounded-2xl"
          />
          {description && (
            <figcaption className="mt-2 text-center text-sm text-sand-500">
              {description}
            </figcaption>
          )}
        </figure>
      );
    },
    [BLOCKS.TABLE]: (node, children) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <tbody>{children}</tbody>
        </table>
      </div>
    ),
    [BLOCKS.TABLE_ROW]: (node, children) => (
      <tr className="border-b border-sand-200">{children}</tr>
    ),
    [BLOCKS.TABLE_CELL]: (node, children) => (
      <td className="px-4 py-3 text-left">{children}</td>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (node, children) => (
      <th className="bg-sand-50 px-4 py-3 text-left font-semibold text-sand-900">
        {children}
      </th>
    ),
    [INLINES.HYPERLINK]: (node, children) => {
      const href = node.data.uri as string;
      const isExternal =
        href.startsWith("http") && !href.includes("miciicampioni.ro");

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lagoon-600 underline underline-offset-2 transition-colors hover:text-lagoon-700"
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={href}
          className="text-lagoon-600 underline underline-offset-2 transition-colors hover:text-lagoon-700"
        >
          {children}
        </Link>
      );
    },
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
      const slug = node.data.target.fields?.slug;
      if (!slug) return <span>{children}</span>;

      return (
        <Link
          href={`/${slug}`}
          className="text-lagoon-600 underline underline-offset-2 transition-colors hover:text-lagoon-700"
        >
          {children}
        </Link>
      );
    },
  },
};

// =============================================================================
// Rich Text Component
// =============================================================================

interface RichTextProps {
  content: Document;
  className?: string;
  options?: Options;
  /** When true, render Contentful HEADING_1 nodes as h2 — use when the
   * surrounding page already provides an h1 via SectionHero/PageLayout. */
  demoteH1?: boolean;
}

export function RichText({ content, className, options, demoteH1 }: RichTextProps) {
  const baseOptions: Options = demoteH1
    ? {
        ...defaultOptions,
        renderNode: {
          ...defaultOptions.renderNode,
          [BLOCKS.HEADING_1]: (_node, children) => (
            <h2 className="mb-4 mt-6 font-heading text-2xl font-semibold text-sand-900 md:text-3xl">
              {children}
            </h2>
          ),
        },
      }
    : defaultOptions;

  const mergedOptions = options
    ? { ...baseOptions, ...options }
    : baseOptions;

  return (
    <div className={className}>
      {documentToReactComponents(content, mergedOptions)}
    </div>
  );
}

// =============================================================================
// Simple Text Extraction (for previews)
// =============================================================================

export function extractTextFromRichText(document: Document): string {
  let text = "";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function extractFromNode(node: any): void {
    if ("value" in node && typeof node.value === "string") {
      text += node.value;
    }
    if ("content" in node && Array.isArray(node.content)) {
      node.content.forEach(extractFromNode);
    }
  }

  document.content.forEach(extractFromNode);
  return text.trim();
}
