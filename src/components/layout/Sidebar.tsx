import { Phone, Mail, Info, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Markdown } from "@/lib/contentful/markdown";
import type { Widget } from "@/types/contentful";

// =============================================================================
// Types
// =============================================================================

export interface SidebarProps {
  widgets: Widget[];
  className?: string;
}

// =============================================================================
// Component
// =============================================================================

export function Sidebar({ widgets, className }: SidebarProps) {
  if (!widgets || widgets.length === 0) return null;

  return (
    <div className={cn("sticky top-24 space-y-6", className)}>
      {widgets.map((widget, index) => (
        <WidgetCard key={`${widget.title}-${index}`} widget={widget} />
      ))}
    </div>
  );
}

// =============================================================================
// Widget Card
// =============================================================================

interface WidgetCardProps {
  widget: Widget;
}

function WidgetCard({ widget }: WidgetCardProps) {
  const { title, content, widgetType, ctaText, ctaLink } = widget;

  // Style variants based on widget type
  const variants = {
    info: {
      bg: "bg-white",
      iconBg: "bg-lagoon-100",
      iconColor: "text-lagoon-600",
      Icon: Info,
    },
    highlight: {
      bg: "bg-lagoon-50",
      iconBg: "bg-lagoon-500",
      iconColor: "text-white",
      Icon: Star,
    },
    cta: {
      bg: "bg-gradient-to-br from-lagoon-500 to-lagoon-600",
      iconBg: "bg-white/20",
      iconColor: "text-white",
      Icon: ArrowRight,
    },
    contact: {
      bg: "bg-coral-50",
      iconBg: "bg-coral-500",
      iconColor: "text-white",
      Icon: Phone,
    },
  };

  const variant = variants[widgetType] || variants.info;
  const isCta = widgetType === "cta";

  return (
    <Card
      variant="default"
      padding="md"
      className={cn(variant.bg, isCta && "border-0")}
    >
      {/* Header */}
      <div className="mb-4 flex items-start gap-3">
        <div
          className={cn(
            "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl",
            variant.iconBg
          )}
        >
          <variant.Icon className={cn("h-5 w-5", variant.iconColor)} />
        </div>
        <h3
          className={cn(
            "pt-2 font-heading text-lg font-semibold",
            isCta ? "text-white" : "text-sand-900"
          )}
        >
          {title}
        </h3>
      </div>

      {/* Content */}
      {content && (
        <div
          className={cn(
            "prose prose-sm max-w-none",
            isCta ? "text-white" : ""
          )}
        >
          <Markdown content={content} />
        </div>
      )}

      {/* CTA Button */}
      {ctaText && ctaLink && (
        <div className="mt-4">
          <Button
            href={ctaLink}
            variant={isCta ? "outline" : "primary"}
            size="sm"
            fullWidth
            className={
              isCta ? "border-white/30 text-white hover:bg-white/10" : ""
            }
          >
            {ctaText}
          </Button>
        </div>
      )}
    </Card>
  );
}

// =============================================================================
// Contact Widget (standalone)
// =============================================================================

interface ContactWidgetProps {
  phone?: string;
  email?: string;
  className?: string;
}

export function ContactWidget({ phone, email, className }: ContactWidgetProps) {
  if (!phone && !email) return null;

  return (
    <Card variant="default" padding="md" className={cn("bg-lagoon-50", className)}>
      <h3 className="mb-4 font-heading text-lg font-semibold text-sand-900">
        Contactează-ne
      </h3>
      <div className="space-y-3">
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-3 text-sand-600 transition-colors hover:text-lagoon-600"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lagoon-100">
              <Phone className="h-5 w-5 text-lagoon-600" />
            </div>
            <span>{phone}</span>
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 text-sand-600 transition-colors hover:text-lagoon-600"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lagoon-100">
              <Mail className="h-5 w-5 text-lagoon-600" />
            </div>
            <span>{email}</span>
          </a>
        )}
      </div>
      <div className="mt-4">
        <Button href="/contact" fullWidth>
          Trimite un mesaj
        </Button>
      </div>
    </Card>
  );
}
