import { getClient, parseAsset, parseAssets } from "./client";
import type {
  SiteSettings,
  SiteSettingsSkeleton,
  Navigation,
  NavigationSkeleton,
  CarouselSlide,
  CarouselSlideSkeleton,
  Testimonial,
  TestimonialSkeleton,
  TeamMember,
  TeamMemberSkeleton,
  Widget,
  WidgetSkeleton,
  Page,
  PageSkeleton,
  Service,
  ServiceSkeleton,
  ServiceTab,
  ServiceTabSkeleton,
  AgeGroup,
  AgeGroupSkeleton,
  Gallery,
  GallerySkeleton,
  FAQ,
  FAQSkeleton,
  Partner,
  PartnerSkeleton,
  TimelineEvent,
  TimelineEventSkeleton,
  Conference,
  ConferenceSkeleton,
  Certificate,
  CertificateSkeleton,
  PressClipping,
  PressClippingSkeleton,
  Project,
  ProjectSkeleton,
  CourseModule,
  CourseModuleSkeleton,
} from "@/types/contentful";
import type { Entry, Asset } from "contentful";
import type { Document } from "@contentful/rich-text-types";

// =============================================================================
// Site Settings
// =============================================================================

export async function getSiteSettings(
  preview = false
): Promise<SiteSettings | null> {
  const client = getClient(preview);
  if (!client) return null;

  try {
    const entries = await client.getEntries<SiteSettingsSkeleton>({
      content_type: "siteSettings",
      limit: 1,
      include: 2,
    });

    if (!entries.items.length) return null;

    const item = entries.items[0];
    const location = item.fields.location as { lat: number; lon: number } | undefined;
    return {
      siteName: item.fields.siteName,
      tagline: item.fields.tagLine,
      logo: parseAsset(item.fields.logo as Asset)!,
      logoWhite: parseAsset(item.fields.logoWhite as unknown as Asset | undefined),
      anniversaryText: item.fields.anniversaryText,
      anniversaryActive: item.fields.showAnniversaryBanner,
      phone: item.fields.phoneNumber,
      email: item.fields.emailAddress,
      address: item.fields.address,
      gpsLatitude: location?.lat,
      gpsLongitude: location?.lon,
      facebookUrl: item.fields.facebookUrl,
      twitterUrl: item.fields.twitterUrl,
      instagramUrl: item.fields.instagramUrl,
      scheduleWeekdays: item.fields.scheduleWeekdays,
      scheduleSaturday: item.fields.scheduleSaturday,
      scheduleSunday: item.fields.scheduleSunday,
      footerCopyright: item.fields.footerCopyright,
      defaultMetaDescription: item.fields.defaultMetaDescription,
    };
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

// =============================================================================
// Navigation
// =============================================================================

export async function getNavigation(
  location: "header" | "footer",
  preview = false
): Promise<Navigation | null> {
  const client = getClient(preview);
  if (!client) return null;

  try {
    const entries = await client.getEntries<NavigationSkeleton>({
      content_type: "navigation",
      limit: 1,
      ...({ "fields.location": location } as Record<string, unknown>),
    });

    if (!entries.items.length) return null;

    const item = entries.items[0];
    return {
      location: item.fields.location,
      items: item.fields.items || [],
    };
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return null;
  }
}

// =============================================================================
// Carousel Slides
// =============================================================================

export async function getCarouselSlides(
  preview = false
): Promise<CarouselSlide[]> {
  const client = getClient(preview);
  if (!client) return [];

  try {
    const query: Record<string, unknown> = {
      content_type: "carouselSlide",
      "fields.active": true,
      order: ["fields.order"],
      include: 2,
    };
    const entries = await client.getEntries<CarouselSlideSkeleton>(query);

    return entries.items.map((item) => ({
      badge: item.fields.badge,
      title: item.fields.title,
      subtitle: item.fields.subtitle,
      backgroundImage: parseAsset(item.fields.backgroundImage as Asset)!,
      ctaText: item.fields.ctaText,
      ctaLink: item.fields.ctaLink,
      order: item.fields.order,
    }));
  } catch (error) {
    console.error("Error fetching carousel slides:", error);
    return [];
  }
}

// =============================================================================
// Testimonials
// =============================================================================

export async function getTestimonials(
  featured = false,
  preview = false
): Promise<Testimonial[]> {
  const client = getClient(preview);
  if (!client) return [];

  try {
    const query: Record<string, unknown> = {
      content_type: "testimonial",
      order: ["fields.order"],
      include: 2,
    };

    if (featured) {
      query["fields.featured"] = true;
    }

    const entries = await client.getEntries<TestimonialSkeleton>(query);

    return entries.items.map((item) => ({
      authorName: item.fields.authorName,
      authorTitle: item.fields.authorTitle,
      quote: item.fields.quote,
      photo: item.fields.photo ? parseAsset(item.fields.photo as Asset) : undefined,
      featured: item.fields.featured,
      order: item.fields.order,
    }));
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

// =============================================================================
// Team Members
// =============================================================================

export async function getTeamMembers(preview = false): Promise<TeamMember[]> {
  const client = getClient(preview);
  if (!client) return [];

  try {
    const query: Record<string, unknown> = {
      content_type: "teamMember",
      order: ["fields.order"],
      include: 2,
    };
    const entries = await client.getEntries<TeamMemberSkeleton>(query);

    return entries.items.map((item) => ({
      name: item.fields.name,
      role: item.fields.role,
      bio: item.fields.bio,
      shortBio: item.fields.shortBio,
      photo: parseAsset(item.fields.photo as Asset)!,
      certifications: item.fields.certifications,
      isFounder: item.fields.isFounder,
      order: item.fields.order,
    }));
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

// =============================================================================
// Services
// =============================================================================

export async function getServices(
  featured = false,
  preview = false
): Promise<Service[]> {
  const client = getClient(preview);
  if (!client) return [];

  try {
    const query: Record<string, unknown> = {
      content_type: "service",
      order: ["fields.order"],
      include: 3,
    };

    if (featured) {
      query["fields.featured"] = true;
    }

    const entries = await client.getEntries<ServiceSkeleton>(query);

    return entries.items.map((item) => parseService(item));
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function getServiceBySlug(
  slug: string,
  preview = false
): Promise<Service | null> {
  const client = getClient(preview);
  if (!client) return null;

  try {
    const query: Record<string, unknown> = {
      content_type: "service",
      "fields.slug": slug,
      limit: 1,
      include: 3,
    };
    const entries = await client.getEntries<ServiceSkeleton>(query);

    if (!entries.items.length) return null;

    return parseService(entries.items[0]);
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseService(item: Entry<ServiceSkeleton> | any): Service {
  const fields = item.fields;
  return {
    title: fields.title as unknown as string,
    slug: fields.slug as unknown as string,
    shortDescription: fields.shortDescription as unknown as string,
    icon: fields.icon ? parseAsset(fields.icon as unknown as Asset) : undefined,
    heroImage: fields.heroImage ? parseAsset(fields.heroImage as unknown as Asset) : undefined,
    content: fields.content as unknown as Document,
    metaTitle: fields.metaTitle as unknown as string | undefined,
    metaDescription: fields.metaDescription as unknown as string | undefined,
    tabs: fields.tabs
      ? ((fields.tabs as unknown as Entry<ServiceTabSkeleton>[]).map((tab) => ({
          title: tab.fields.title,
          content: tab.fields.content,
          order: tab.fields.order,
        })) as unknown as ServiceTab[])
      : undefined,
    ageGroups: fields.ageGroups
      ? ((fields.ageGroups as unknown as Entry<AgeGroupSkeleton>[]).map((ag) => ({
          name: ag.fields.name,
          ageRange: ag.fields.ageRange,
          duration: ag.fields.duration,
          description: ag.fields.description,
          psychologicalDevelopment: ag.fields.psychologicalDevelopment,
          objectives: ag.fields.objectives,
          icon: ag.fields.icon ? parseAsset(ag.fields.icon as unknown as Asset) : undefined,
          color: ag.fields.color,
          order: ag.fields.order,
        })) as unknown as AgeGroup[])
      : undefined,
    sidebarWidgets: fields.sidebarWidgets
      ? ((fields.sidebarWidgets as unknown as Entry<WidgetSkeleton>[]).map((w) =>
          parseWidget(w)
        ) as unknown as Widget[])
      : undefined,
    relatedServices: fields.relatedServices
      ? ((fields.relatedServices as unknown as Entry<ServiceSkeleton>[]).map((s) => ({
          title: s.fields.title,
          slug: s.fields.slug,
        })) as unknown as { title: string; slug: string }[])
      : undefined,
    order: fields.order as unknown as number,
    featured: fields.featured as unknown as boolean,
  };
}

// =============================================================================
// Pages
// =============================================================================

export async function getPageBySlug(
  slug: string,
  preview = false
): Promise<Page | null> {
  const client = getClient(preview);
  if (!client) return null;

  try {
    const query: Record<string, unknown> = {
      content_type: "page",
      "fields.slug": slug,
      limit: 1,
      include: 3,
    };
    const entries = await client.getEntries<PageSkeleton>(query);

    if (!entries.items.length) return null;

    const item = entries.items[0];
    const fields = item.fields;
    const parentPage = fields.parentPage as unknown as Entry<PageSkeleton> | undefined;

    return {
      title: fields.title as unknown as string,
      slug: fields.slug as unknown as string,
      metaTitle: fields.metaTitle as unknown as string | undefined,
      metaDescription: fields.metaDescription as unknown as string | undefined,
      heroImage: fields.heroImage ? parseAsset(fields.heroImage as unknown as Asset) : undefined,
      heroImageAlt: fields.heroImageAlt as unknown as string | undefined,
      content: fields.content as unknown as Document,
      sidebarWidgets: fields.sidebarWidgets
        ? ((fields.sidebarWidgets as unknown as Entry<WidgetSkeleton>[]).map((w) =>
            parseWidget(w)
          ) as unknown as Widget[])
        : undefined,
      parentSlug: parentPage?.fields.slug as unknown as string | undefined,
      parentTitle: parentPage?.fields.title as unknown as string | undefined,
      showInSitemap: fields.showInSitemap as unknown as boolean,
    };
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

export async function getAllPageSlugs(preview = false): Promise<string[]> {
  const client = getClient(preview);
  if (!client) return [];

  try {
    const query: Record<string, unknown> = {
      content_type: "page",
      select: ["fields.slug"],
    };
    const entries = await client.getEntries<PageSkeleton>(query);

    return entries.items.map((item) => item.fields.slug as string);
  } catch (error) {
    console.error("Error fetching page slugs:", error);
    return [];
  }
}

export async function getPagesByParentSlug(
  parentSlug: string,
  preview = false
): Promise<Page[]> {
  const client = getClient(preview);
  if (!client) return [];

  try {
    // First get the parent page ID
    const parentQuery: Record<string, unknown> = {
      content_type: "page",
      "fields.slug": parentSlug,
      limit: 1,
    };
    const parentEntries = await client.getEntries<PageSkeleton>(parentQuery);

    if (!parentEntries.items.length) return [];

    const parentId = parentEntries.items[0].sys.id;

    // Then get all pages with this parent
    const query: Record<string, unknown> = {
      content_type: "page",
      "fields.parentPage.sys.id": parentId,
      include: 2,
    };
    const entries = await client.getEntries<PageSkeleton>(query);

    return entries.items.map((item) => {
      const fields = item.fields;
      return {
        title: fields.title as unknown as string,
        slug: fields.slug as unknown as string,
        metaTitle: fields.metaTitle as unknown as string | undefined,
        metaDescription: fields.metaDescription as unknown as string | undefined,
        heroImage: fields.heroImage ? parseAsset(fields.heroImage as unknown as Asset) : undefined,
        heroImageAlt: fields.heroImageAlt as unknown as string | undefined,
        content: fields.content as unknown as Document,
        sidebarWidgets: fields.sidebarWidgets
          ? ((fields.sidebarWidgets as unknown as Entry<WidgetSkeleton>[]).map((w) =>
              parseWidget(w)
            ) as unknown as Widget[])
          : undefined,
        parentSlug: parentSlug,
        parentTitle: parentEntries.items[0].fields.title as unknown as string,
        showInSitemap: fields.showInSitemap as unknown as boolean,
      };
    });
  } catch (error) {
    console.error("Error fetching pages by parent:", error);
    return [];
  }
}

export async function getAllServiceSlugs(preview = false): Promise<string[]> {
  const client = getClient(preview);
  if (!client) return [];

  try {
    const query: Record<string, unknown> = {
      content_type: "service",
      select: ["fields.slug"],
    };
    const entries = await client.getEntries<ServiceSkeleton>(query);

    return entries.items.map((item) => item.fields.slug as string);
  } catch (error) {
    console.error("Error fetching service slugs:", error);
    return [];
  }
}

export async function getAllGallerySlugs(preview = false): Promise<string[]> {
  const client = getClient(preview);
  if (!client) return [];

  try {
    const query: Record<string, unknown> = {
      content_type: "gallery",
      select: ["fields.slug"],
    };
    const entries = await client.getEntries<GallerySkeleton>(query);

    return entries.items.map((item) => item.fields.slug as string);
  } catch (error) {
    console.error("Error fetching gallery slugs:", error);
    return [];
  }
}

// =============================================================================
// Widget Helper
// =============================================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseWidget(item: Entry<WidgetSkeleton> | any): Widget {
  const fields = item.fields;
  return {
    title: fields.title as unknown as string,
    icon: fields.icon ? parseAsset(fields.icon as unknown as Asset) : undefined,
    content: fields.content as unknown as string | undefined, // Markdown
    widgetType: fields.widgetType as unknown as "info" | "highlight" | "cta" | "contact",
    ctaText: fields.ctaText as unknown as string | undefined,
    ctaLink: fields.ctaLink as unknown as string | undefined,
  };
}

// =============================================================================
// Galleries
// =============================================================================

export async function getGalleries(
  featured = false,
  preview = false
): Promise<Gallery[]> {
  const client = getClient(preview);
  if (!client) return [];

  try {
    const query: Record<string, unknown> = {
      content_type: "gallery",
      order: ["-fields.date", "fields.order"],
      include: 2,
    };

    if (featured) {
      query["fields.featured"] = true;
    }

    const entries = await client.getEntries<GallerySkeleton>(query);

    return entries.items.map((item) => ({
      title: item.fields.title,
      slug: item.fields.slug,
      description: item.fields.description,
      date: item.fields.date,
      coverImage: parseAsset(item.fields.coverImage as Asset)!,
      images: parseAssets(item.fields.images as Asset[]),
      featured: item.fields.featured,
      order: item.fields.order,
    }));
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return [];
  }
}

export async function getGalleryBySlug(
  slug: string,
  preview = false
): Promise<Gallery | null> {
  const client = getClient(preview);
  if (!client) return null;

  try {
    const query: Record<string, unknown> = {
      content_type: "gallery",
      "fields.slug": slug,
      limit: 1,
      include: 2,
    };
    const entries = await client.getEntries<GallerySkeleton>(query);

    if (!entries.items.length) return null;

    const item = entries.items[0];
    const fields = item.fields;
    return {
      title: fields.title as unknown as string,
      slug: fields.slug as unknown as string,
      description: fields.description as unknown as string | undefined,
      date: fields.date as unknown as string | undefined,
      coverImage: parseAsset(fields.coverImage as unknown as Asset)!,
      images: parseAssets(fields.images as unknown as Asset[]),
      featured: fields.featured as unknown as boolean,
      order: fields.order as unknown as number,
    };
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return null;
  }
}

// =============================================================================
// FAQ
// =============================================================================

export async function getFAQs(preview = false): Promise<FAQ[]> {
  const client = getClient(preview);
  if (!client) return [];

  try {
    const query: Record<string, unknown> = {
      content_type: "faq",
      order: ["fields.category", "fields.order"],
    };
    const entries = await client.getEntries<FAQSkeleton>(query);

    return entries.items.map((item) => ({
      question: item.fields.question,
      answer: item.fields.answer,
      category: item.fields.category,
      order: item.fields.order,
    }));
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
}

// =============================================================================
// Partners
// =============================================================================

export async function getPartners(preview = false): Promise<Partner[]> {
  const client = getClient(preview);
  if (!client) return [];

  try {
    const query: Record<string, unknown> = {
      content_type: "partner",
      "fields.active": true,
      order: ["fields.order"],
      include: 2,
    };
    const entries = await client.getEntries<PartnerSkeleton>(query);

    return entries.items.map((item) => ({
      name: item.fields.name,
      logo: parseAsset(item.fields.logo as Asset)!,
      website: item.fields.website,
      partnerType: item.fields.partnerType,
      description: item.fields.description,
      active: item.fields.active,
      order: item.fields.order,
    }));
  } catch (error) {
    console.error("Error fetching partners:", error);
    return [];
  }
}

// =============================================================================
// Timeline Events
// =============================================================================

export async function getTimelineEvents(
  preview = false
): Promise<TimelineEvent[]> {
  const client = getClient(preview);
  if (!client) return [];

  try {
    const query: Record<string, unknown> = {
      content_type: "timelineEvent",
      order: ["fields.order"],
      include: 2,
    };
    const entries = await client.getEntries<TimelineEventSkeleton>(query);

    return entries.items.map((item) => ({
      year: item.fields.year,
      title: item.fields.title,
      description: item.fields.description,
      image: item.fields.image ? parseAsset(item.fields.image as Asset) : undefined,
      order: item.fields.order,
    }));
  } catch (error) {
    console.error("Error fetching timeline events:", error);
    return [];
  }
}

// =============================================================================
// Conferences
// =============================================================================

export async function getConferences(preview = false): Promise<Conference[]> {
  const client = getClient(preview);
  if (!client) return [];

  try {
    const query: Record<string, unknown> = {
      content_type: "conference",
      order: ["-fields.year", "fields.order"],
    };
    const entries = await client.getEntries<ConferenceSkeleton>(query);

    return entries.items.map((item) => ({
      title: item.fields.title,
      year: item.fields.year,
      location: item.fields.location,
      description: item.fields.description,
      isInternational: item.fields.isInternational,
      order: item.fields.order,
    }));
  } catch (error) {
    console.error("Error fetching conferences:", error);
    return [];
  }
}

// =============================================================================
// Certificates
// =============================================================================

export async function getCertificates(preview = false): Promise<Certificate[]> {
  const client = getClient(preview);
  if (!client) return [];

  try {
    const query: Record<string, unknown> = {
      content_type: "certificate",
      order: ["fields.order"],
      include: 2,
    };
    const entries = await client.getEntries<CertificateSkeleton>(query);

    return entries.items.map((item) => ({
      title: item.fields.title,
      issuingBody: item.fields.issuingBody,
      date: item.fields.date,
      image: parseAsset(item.fields.image as Asset)!,
      description: item.fields.description,
      order: item.fields.order,
    }));
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return [];
  }
}

// =============================================================================
// Press Clippings
// =============================================================================

export async function getPressClippings(
  preview = false
): Promise<PressClipping[]> {
  const client = getClient(preview);
  if (!client) return [];

  try {
    const query: Record<string, unknown> = {
      content_type: "pressClipping",
      order: ["-fields.date", "fields.order"],
      include: 2,
    };
    const entries = await client.getEntries<PressClippingSkeleton>(query);

    return entries.items.map((item) => ({
      title: item.fields.title,
      publication: item.fields.publication,
      date: item.fields.date,
      image: parseAsset(item.fields.image as Asset)!,
      link: item.fields.link,
      excerpt: item.fields.excerpt,
      order: item.fields.order,
    }));
  } catch (error) {
    console.error("Error fetching press clippings:", error);
    return [];
  }
}

// =============================================================================
// Projects
// =============================================================================

export async function getProjects(preview = false): Promise<Project[]> {
  const client = getClient(preview);
  if (!client) return [];

  try {
    const query: Record<string, unknown> = {
      content_type: "project",
      order: ["fields.order"],
      include: 2,
    };
    const entries = await client.getEntries<ProjectSkeleton>(query);

    return entries.items.map((item) => ({
      title: item.fields.title,
      slug: item.fields.slug,
      description: item.fields.description,
      objectives: item.fields.objectives,
      results: item.fields.results,
      image: item.fields.image ? parseAsset(item.fields.image as Asset) : undefined,
      status: item.fields.status,
      order: item.fields.order,
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// =============================================================================
// Course Modules
// =============================================================================

export async function getCourseModules(
  preview = false
): Promise<CourseModule[]> {
  const client = getClient(preview);
  if (!client) return [];

  try {
    const query: Record<string, unknown> = {
      content_type: "courseModule",
      order: ["fields.order"],
      include: 2,
    };
    const entries = await client.getEntries<CourseModuleSkeleton>(query);

    return entries.items.map((item) => {
      const fields = item.fields;
      const instructor = fields.instructor as unknown as Entry<TeamMemberSkeleton> | undefined;
      return {
        title: fields.title as unknown as string,
        subtitle: fields.subtitle as unknown as string | undefined,
        sessions: fields.sessions as unknown as string | undefined,
        instructor: instructor
          ? {
              name: instructor.fields.name as unknown as string,
              role: instructor.fields.role as unknown as string,
              photo: instructor.fields.photo ? parseAsset(instructor.fields.photo as unknown as Asset) : undefined,
            }
          : undefined,
        content: fields.content as unknown as string, // Markdown
        objectives: fields.objectives as unknown as string | undefined, // Markdown
        order: fields.order as unknown as number,
      };
    }) as CourseModule[];
  } catch (error) {
    console.error("Error fetching course modules:", error);
    return [];
  }
}
