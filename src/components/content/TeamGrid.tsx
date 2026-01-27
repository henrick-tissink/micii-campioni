"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Markdown } from "@/lib/contentful/markdown";
import type { TeamMember } from "@/types/contentful";

// =============================================================================
// Types
// =============================================================================

export interface TeamGridProps {
  members: TeamMember[];
  className?: string;
}

// =============================================================================
// Component
// =============================================================================

export function TeamGrid({ members, className }: TeamGridProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  if (!members || members.length === 0) return null;

  // Separate founder from other members
  const founder = members.find((m) => m.isFounder);
  const otherMembers = members.filter((m) => !m.isFounder);

  return (
    <>
      <div className={cn("space-y-12", className)}>
        {/* Founder Section */}
        {founder && (
          <div className="mx-auto max-w-2xl">
            <TeamMemberCard
              member={founder}
              variant="featured"
              onClick={() => setSelectedMember(founder)}
            />
          </div>
        )}

        {/* Team Grid */}
        {otherMembers.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherMembers.map((member) => (
              <TeamMemberCard
                key={member.name}
                member={member}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        title={selectedMember?.name || ""}
      >
        {selectedMember && (
          <TeamMemberDetail member={selectedMember} />
        )}
      </Modal>
    </>
  );
}

// =============================================================================
// Team Member Card
// =============================================================================

interface TeamMemberCardProps {
  member: TeamMember;
  variant?: "default" | "featured";
  onClick?: () => void;
}

function TeamMemberCard({
  member,
  variant = "default",
  onClick,
}: TeamMemberCardProps) {
  const isFeatured = variant === "featured";

  return (
    <Card
      variant="default"
      padding="none"
      className={cn(
        "group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-medium",
        isFeatured && "sm:flex"
      )}
      onClick={onClick}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden bg-sand-100",
          isFeatured ? "sm:w-1/2" : "aspect-[4/5]"
        )}
      >
        {member.photo ? (
          <Image
            src={member.photo.url}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full min-h-[300px] items-center justify-center">
            <span className="font-heading text-6xl text-sand-300">
              {member.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Founder badge */}
        {member.isFounder && (
          <Badge
            variant="coral"
            className="absolute left-4 top-4"
          >
            Fondatoare
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className={cn("p-6", isFeatured && "sm:flex sm:flex-1 sm:flex-col sm:justify-center")}>
        <h3 className="font-heading text-xl font-semibold text-sand-900">
          {member.name}
        </h3>
        <p className="mt-1 text-lagoon-600">{member.role}</p>

        {/* Short bio */}
        {member.shortBio && (
          <p className="mt-3 line-clamp-3 text-sand-600">
            {member.shortBio}
          </p>
        )}

        {/* Certifications preview */}
        {member.certifications && member.certifications.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {member.certifications.slice(0, 3).map((cert) => (
              <Badge key={cert} variant="sand" size="sm">
                <Award className="mr-1 h-3 w-3" />
                {cert}
              </Badge>
            ))}
            {member.certifications.length > 3 && (
              <Badge variant="sand" size="sm">
                +{member.certifications.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* View more */}
        <span className="mt-4 inline-block text-sm font-medium text-lagoon-600 group-hover:text-lagoon-700">
          Vezi detalii →
        </span>
      </div>
    </Card>
  );
}

// =============================================================================
// Team Member Detail (for modal)
// =============================================================================

interface TeamMemberDetailProps {
  member: TeamMember;
}

function TeamMemberDetail({ member }: TeamMemberDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header with photo */}
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {member.photo && (
          <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl">
            <Image
              src={member.photo.url}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-heading text-2xl font-semibold text-sand-900">
              {member.name}
            </h3>
            {member.isFounder && (
              <Badge variant="coral" size="sm">
                Fondatoare
              </Badge>
            )}
          </div>
          <p className="mt-1 text-lg text-lagoon-600">{member.role}</p>
        </div>
      </div>

      {/* Bio */}
      {member.bio && (
        <div className="prose max-w-none">
          <Markdown content={member.bio} />
        </div>
      )}

      {/* Certifications */}
      {member.certifications && member.certifications.length > 0 && (
        <div>
          <h4 className="mb-3 font-heading text-lg font-semibold text-sand-900">
            Certificări și Calificări
          </h4>
          <div className="flex flex-wrap gap-2">
            {member.certifications.map((cert) => (
              <Badge key={cert} variant="lagoon">
                <Award className="mr-1 h-3 w-3" />
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Compact Team List (for sidebars)
// =============================================================================

interface CompactTeamListProps {
  members: TeamMember[];
  limit?: number;
  className?: string;
}

export function CompactTeamList({
  members,
  limit = 3,
  className,
}: CompactTeamListProps) {
  const displayedMembers = members.slice(0, limit);

  return (
    <div className={cn("space-y-4", className)}>
      {displayedMembers.map((member) => (
        <div key={member.name} className="flex items-center gap-3">
          {member.photo ? (
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
              <Image
                src={member.photo.url}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lagoon-100">
              <span className="font-heading text-lg text-lagoon-600">
                {member.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h4 className="font-medium text-sand-900">{member.name}</h4>
            <p className="text-sm text-sand-500">{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
