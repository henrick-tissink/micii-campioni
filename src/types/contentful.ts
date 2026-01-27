import type { Document } from "@contentful/rich-text-types";
import type { Asset, Entry, EntrySkeletonType } from "contentful";

// =============================================================================
// Base Types
// =============================================================================

export type ContentfulImage = {
  url: string;
  width: number;
  height: number;
  title: string;
  description?: string;
};

export type ContentfulLink = {
  label: string;
  href: string;
};

// =============================================================================
// Site Settings
// =============================================================================

export interface SiteSettingsSkeleton extends EntrySkeletonType {
  contentTypeId: "siteSettings";
  fields: {
    internalName: string;
    siteName: string;
    tagLine?: string;
    logo: Asset;
    logoWhite?: Asset;
    favicon?: Asset;
    anniversaryText?: string;
    showAnniversaryBanner: boolean;
    phoneNumber: string;
    emailAddress: string;
    address: string;
    location?: { lat: number; lon: number };
    facebookUrl?: string;
    twitterUrl?: string;
    instagramUrl?: string;
    scheduleWeekdays?: string;
    scheduleSaturday?: string;
    scheduleSunday?: string;
    footerCopyright?: string;
    defaultMetaDescription?: string;
  };
}

export type SiteSettings = {
  siteName: string;
  tagline?: string;
  logo: ContentfulImage;
  logoWhite?: ContentfulImage;
  anniversaryText?: string;
  anniversaryActive: boolean;
  phone: string;
  email: string;
  address: string;
  gpsLatitude?: number;
  gpsLongitude?: number;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  scheduleWeekdays?: string;
  scheduleSaturday?: string;
  scheduleSunday?: string;
  footerCopyright?: string;
  defaultMetaDescription?: string;
};

// =============================================================================
// Navigation
// =============================================================================

export type NavigationItem = {
  label: string;
  href: string;
  children?: NavigationItem[];
};

export interface NavigationSkeleton extends EntrySkeletonType {
  contentTypeId: "navigation";
  fields: {
    internalName: string;
    location: "header" | "footer";
    items: NavigationItem[];
  };
}

export type Navigation = {
  location: "header" | "footer";
  items: NavigationItem[];
};

// =============================================================================
// Carousel Slide
// =============================================================================

export interface CarouselSlideSkeleton extends EntrySkeletonType {
  contentTypeId: "carouselSlide";
  fields: {
    internalName: string;
    badge?: string;
    title: string;
    subtitle?: string;
    backgroundImage: Asset;
    ctaText?: string;
    ctaLink?: string;
    order: number;
    active: boolean;
  };
}

export type CarouselSlide = {
  badge?: string;
  title: string;
  subtitle?: string;
  backgroundImage: ContentfulImage;
  ctaText?: string;
  ctaLink?: string;
  order: number;
};

// =============================================================================
// Testimonial
// =============================================================================

export interface TestimonialSkeleton extends EntrySkeletonType {
  contentTypeId: "testimonial";
  fields: {
    authorName: string;
    authorTitle?: string;
    quote: string;
    photo?: Asset;
    featured: boolean;
    order: number;
  };
}

export type Testimonial = {
  authorName: string;
  authorTitle?: string;
  quote: string;
  photo?: ContentfulImage;
  featured: boolean;
  order: number;
};

// =============================================================================
// Team Member
// =============================================================================

export interface TeamMemberSkeleton extends EntrySkeletonType {
  contentTypeId: "teamMember";
  fields: {
    name: string;
    role: string;
    bio?: string; // Markdown
    shortBio?: string;
    photo: Asset;
    certifications?: string[];
    isFounder: boolean;
    order: number;
  };
}

export type TeamMember = {
  name: string;
  role: string;
  bio?: string; // Markdown
  shortBio?: string;
  photo: ContentfulImage;
  certifications?: string[];
  isFounder: boolean;
  order: number;
};

// =============================================================================
// Widget (Sidebar)
// =============================================================================

export interface WidgetSkeleton extends EntrySkeletonType {
  contentTypeId: "widget";
  fields: {
    internalName: string;
    title: string;
    icon?: Asset;
    content?: string; // Markdown
    widgetType: "info" | "highlight" | "cta" | "contact";
    ctaText?: string;
    ctaLink?: string;
  };
}

export type Widget = {
  title: string;
  icon?: ContentfulImage;
  content?: string; // Markdown
  widgetType: "info" | "highlight" | "cta" | "contact";
  ctaText?: string;
  ctaLink?: string;
};

// =============================================================================
// Page
// =============================================================================

export interface PageSkeleton extends EntrySkeletonType {
  contentTypeId: "page";
  fields: {
    title: string;
    slug: string;
    metaTitle?: string;
    metaDescription?: string;
    heroImage?: Asset;
    heroImageAlt?: string;
    content: Document;
    sidebarWidgets?: Entry<WidgetSkeleton>[];
    parentPage?: Entry<PageSkeleton>;
    showInSitemap: boolean;
    publishedAt?: string;
  };
}

export type Page = {
  title: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  heroImage?: ContentfulImage;
  heroImageAlt?: string;
  content: Document;
  sidebarWidgets?: Widget[];
  parentSlug?: string;
  parentTitle?: string;
  showInSitemap: boolean;
};

// =============================================================================
// Service Tab
// =============================================================================

export interface ServiceTabSkeleton extends EntrySkeletonType {
  contentTypeId: "serviceTab";
  fields: {
    title: string;
    content: string; // Markdown
    order: number;
  };
}

export type ServiceTab = {
  title: string;
  content: string; // Markdown
  order: number;
};

// =============================================================================
// Age Group
// =============================================================================

export interface AgeGroupSkeleton extends EntrySkeletonType {
  contentTypeId: "ageGroup";
  fields: {
    name: string;
    ageRange: string;
    duration?: string;
    description?: string; // Markdown
    psychologicalDevelopment?: string; // Markdown
    objectives?: string; // Markdown
    icon?: Asset;
    color?: string;
    order: number;
  };
}

export type AgeGroup = {
  name: string;
  ageRange: string;
  duration?: string;
  description?: string; // Markdown
  psychologicalDevelopment?: string; // Markdown
  objectives?: string; // Markdown
  icon?: ContentfulImage;
  color?: string;
  order: number;
};

// =============================================================================
// Service
// =============================================================================

export interface ServiceSkeleton extends EntrySkeletonType {
  contentTypeId: "service";
  fields: {
    title: string;
    slug: string;
    shortDescription: string;
    icon?: Asset;
    heroImage?: Asset;
    content: Document;
    metaTitle?: string;
    metaDescription?: string;
    tabs?: Entry<ServiceTabSkeleton>[];
    ageGroups?: Entry<AgeGroupSkeleton>[];
    sidebarWidgets?: Entry<WidgetSkeleton>[];
    relatedServices?: Entry<ServiceSkeleton>[];
    order: number;
    featured: boolean;
  };
}

export type Service = {
  title: string;
  slug: string;
  shortDescription: string;
  icon?: ContentfulImage;
  heroImage?: ContentfulImage;
  content: Document;
  metaTitle?: string;
  metaDescription?: string;
  tabs?: ServiceTab[];
  ageGroups?: AgeGroup[];
  sidebarWidgets?: Widget[];
  relatedServices?: { title: string; slug: string }[];
  order: number;
  featured: boolean;
};

// =============================================================================
// Course Module
// =============================================================================

export interface CourseModuleSkeleton extends EntrySkeletonType {
  contentTypeId: "courseModule";
  fields: {
    title: string;
    subtitle?: string;
    sessions?: string;
    instructor?: Entry<TeamMemberSkeleton>;
    content: string; // Markdown
    objectives?: string; // Markdown
    order: number;
  };
}

export type CourseModule = {
  title: string;
  subtitle?: string;
  sessions?: string;
  instructor?: { name: string; role: string; photo?: ContentfulImage };
  content: string; // Markdown
  objectives?: string; // Markdown
  order: number;
};

// =============================================================================
// Timeline Event
// =============================================================================

export interface TimelineEventSkeleton extends EntrySkeletonType {
  contentTypeId: "timelineEvent";
  fields: {
    year: string;
    title?: string;
    description: string;
    image?: Asset;
    order: number;
  };
}

export type TimelineEvent = {
  year: string;
  title?: string;
  description: string;
  image?: ContentfulImage;
  order: number;
};

// =============================================================================
// Conference
// =============================================================================

export interface ConferenceSkeleton extends EntrySkeletonType {
  contentTypeId: "conference";
  fields: {
    title: string;
    year: string;
    location?: string;
    description?: string;
    isInternational: boolean;
    order: number;
  };
}

export type Conference = {
  title: string;
  year: string;
  location?: string;
  description?: string;
  isInternational: boolean;
  order: number;
};

// =============================================================================
// Project
// =============================================================================

export interface ProjectSkeleton extends EntrySkeletonType {
  contentTypeId: "project";
  fields: {
    title: string;
    slug?: string;
    description: string; // Markdown
    objectives?: string; // Markdown
    results?: string; // Markdown
    image?: Asset;
    status: "active" | "completed" | "upcoming";
    order: number;
  };
}

export type Project = {
  title: string;
  slug?: string;
  description: string; // Markdown
  objectives?: string; // Markdown
  results?: string; // Markdown
  image?: ContentfulImage;
  status: "active" | "completed" | "upcoming";
  order: number;
};

// =============================================================================
// Certificate
// =============================================================================

export interface CertificateSkeleton extends EntrySkeletonType {
  contentTypeId: "certificate";
  fields: {
    title: string;
    issuingBody?: string;
    date?: string;
    image: Asset;
    description?: string;
    order: number;
  };
}

export type Certificate = {
  title: string;
  issuingBody?: string;
  date?: string;
  image: ContentfulImage;
  description?: string;
  order: number;
};

// =============================================================================
// Press Clipping
// =============================================================================

export interface PressClippingSkeleton extends EntrySkeletonType {
  contentTypeId: "pressClipping";
  fields: {
    title?: string;
    publication?: string;
    date?: string;
    image: Asset;
    link?: string;
    excerpt?: string;
    order: number;
  };
}

export type PressClipping = {
  title?: string;
  publication?: string;
  date?: string;
  image: ContentfulImage;
  link?: string;
  excerpt?: string;
  order: number;
};

// =============================================================================
// Gallery
// =============================================================================

export interface GallerySkeleton extends EntrySkeletonType {
  contentTypeId: "gallery";
  fields: {
    title: string;
    slug: string;
    description?: string;
    date?: string;
    coverImage: Asset;
    images: Asset[];
    featured: boolean;
    order: number;
  };
}

export type Gallery = {
  title: string;
  slug: string;
  description?: string;
  date?: string;
  coverImage: ContentfulImage;
  images: ContentfulImage[];
  featured: boolean;
  order: number;
};

// =============================================================================
// FAQ
// =============================================================================

export interface FAQSkeleton extends EntrySkeletonType {
  contentTypeId: "faq";
  fields: {
    question: string;
    answer: string; // Markdown
    category?: "general" | "programs" | "safety" | "pricing" | "other";
    order: number;
  };
}

export type FAQ = {
  question: string;
  answer: string; // Markdown
  category?: "general" | "programs" | "safety" | "pricing" | "other";
  order: number;
};

// =============================================================================
// Partner
// =============================================================================

export interface PartnerSkeleton extends EntrySkeletonType {
  contentTypeId: "partner";
  fields: {
    name: string;
    logo: Asset;
    website?: string;
    partnerType: "partner" | "sponsor" | "endorsement";
    description?: string;
    active: boolean;
    order: number;
  };
}

export type Partner = {
  name: string;
  logo: ContentfulImage;
  website?: string;
  partnerType: "partner" | "sponsor" | "endorsement";
  description?: string;
  active: boolean;
  order: number;
};
