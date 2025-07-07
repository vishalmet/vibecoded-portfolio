"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PiStarFourFill } from "react-icons/pi";
import { FaExternalLinkAlt, FaBuilding, FaCalendarAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { API_URL } from "@/constant";

gsap.registerPlugin(ScrollTrigger);

const ExperienceCard = ({ experience, index }: { experience: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Show latest (last) role at the top
  const roles = experience.roles || [];
  const latestRole = roles[roles.length - 1];
  const otherRoles = roles.slice(0, -1);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Initial animation
    gsap.fromTo(
      card,
      {
        opacity: 0,
        x: index % 2 === 0 ? -100 : 100,
        scale: 0.9,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      }
    );

    // In-view animation
    ScrollTrigger.create({
      trigger: card,
      start: "top center",
      end: "bottom center",
      onEnter: () => setIsInView(true),
      onLeave: () => setIsInView(false),
      onEnterBack: () => setIsInView(true),
      onLeaveBack: () => setIsInView(false),
    });
  }, [index]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "group relative flex gap-8 p-6 rounded-xl border border-white/[0.15] bg-black/50 backdrop-blur-sm",
        "hover:shadow-amber-500/50 transition-all duration-300",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-500/[0.05] before:to-rose-500/[0.05] before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-500",
        "after:absolute after:top-1/2 after:-translate-y-1/2 after:w-4 after:h-4 after:rounded-full after:bg-amber-500/80",
        index % 2 === 0 ? "after:-right-2" : "after:-left-2"
      )}
      animate={{
        scale: isInView ? 1.02 : 1,
        boxShadow: isInView ? "0 0 30px rgba(245, 158, 11, 0.3)" : "none",
        borderColor: isInView ? "rgba(245, 158, 11, 0.5)" : "rgba(255, 255, 255, 0.15)",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative z-10 flex-1">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/5 p-2">
            <img
              src={experience.logo}
              alt={experience.organization}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">{latestRole.role}</h3>
                <div className="flex items-center gap-2 text-white/60">
                  <FaBuilding className="h-4 w-4" />
                  <span className="text-sm">{experience.organization}</span>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-sm mt-1">
                  <FaCalendarAlt className="h-3 w-3" />
                  <span>{latestRole.startDate} - {latestRole.endDate}</span>
                </div>
                {/* Tags display */}
                {experience.tags && experience.tags.length > 0 && (
                  <TagsDisplay tags={experience.tags} />
                )}
              </div>
              {otherRoles.length > 0 && (
                <Button
                  onClick={toggleExpand}
                  className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
                >
                  {isExpanded ? (
                    <FaChevronUp className="h-4 w-4 text-white/60" />
                  ) : (
                    <FaChevronDown className="h-4 w-4 text-white/60" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        <p className="text-white/60 text-sm mb-4">{latestRole.description}</p>

        {/* Role-level website for latest role */}
        {latestRole.website && (
          <a
            href={latestRole.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mr-3 text-white/60 hover:text-white transition-colors mb-2"
          >
            <FaExternalLinkAlt className="h-4 w-4" />
            <span className="text-sm">Visit Role Website</span>
          </a>
        )}

        {/* Organization website */}
        {experience.website && (
          <a
            href={experience.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <FaExternalLinkAlt className="h-4 w-4" />
            <span className="text-sm">Visit Organization Website</span>
          </a>
        )}

        {isExpanded && otherRoles.length > 0 && (
          <div className="mt-6 space-y-6">
            {otherRoles.map((role: any, roleIndex: number) => (
              <div
                key={roleIndex}
                className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-white/[0.1]"
              >
                <h4 className="text-lg font-semibold text-white mb-1">{role.role}</h4>
                <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
                  <FaCalendarAlt className="h-3 w-3" />
                  <span>{role.startDate} - {role.endDate}</span>
                </div>
                <p className="text-white/60 text-sm">{role.description}</p>
                {/* Role-level website for expanded roles */}
                {role.website && (
                  <a
                    href={role.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-white/60 hover:text-white transition-colors mb-2"
                  >
                    <FaExternalLinkAlt className="h-4 w-4" />
                    <span className="text-sm">Visit Role Website</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

function TagsDisplay({ tags }: { tags: string[] }) {
  const [showAll, setShowAll] = useState(false);
  const visibleTags = showAll ? tags : tags.slice(0, 4);
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {visibleTags.map((tag, i) => (
        <span key={i} className="bg-amber-500/10 text-white px-2 py-1 rounded text-xs">{tag}</span>
      ))}
      {tags.length > 4 && !showAll && (
        <button
          type="button"
          className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
          onClick={() => setShowAll(true)}
        >
          +{tags.length - 4}
        </button>
      )}
      {tags.length > 4 && showAll && (
        <button
          type="button"
          className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
          onClick={() => setShowAll(false)}
        >
          Show less
        </button>
      )}
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/experience`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch experience data');
        return res.json();
      })
      .then(data => {
        setExperiences(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll('.experience-card');
    const timeline = timelineRef.current;
    if (!timeline) return;

    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveCardIndex(index),
        onLeave: () => setActiveCardIndex(null),
        onEnterBack: () => setActiveCardIndex(index),
        onLeaveBack: () => setActiveCardIndex(null),
      });
    });

    // Timeline line animation
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => {
        const progress = self.progress;
        if (timeline) {
          timeline.style.height = `${progress * 100}%`;
        }
      },
    });
  }, [experiences]);

  const timelineColor = useMemo(() => {
    if (activeCardIndex === null) return "rgba(99, 102, 241, 0.3)";
    const colors = [
      "rgba(99, 102, 241, 0.3)",    // indigo
      "rgba(245, 158, 11, 0.5)",    // amber
      "rgba(244, 63, 94, 0.3)",     // rose
    ];
    return colors[activeCardIndex % colors.length];
  }, [activeCardIndex]);

  if (loading) {
    return <div className="text-white text-center py-20">Loading experience...</div>;
  }
  if (error) {
    return <div className="text-red-500 text-center py-20">{error}</div>;
  }

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-[#030303] py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-element absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-500/[0.05] to-transparent rounded-full blur-3xl" />
        <div className="bg-element absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-rose-500/[0.05] to-transparent rounded-full blur-3xl" />
        <div className="bg-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] border border-white/[0.08] px-3 py-1 mb-4">
            <span className="text-xs md:text-sm text-white/60 tracking-wide flex items-center gap-1 md:gap-2">
              Professional Journey
              <PiStarFourFill className="h-3 w-3 text-amber-500/80" />
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Work <span className="text-amber-500">Experience</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A timeline of my professional journey, showcasing my growth and contributions in the tech industry.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Animated timeline line */}
          <motion.div
            ref={timelineRef}
            className="absolute left-1/2 top-0 w-1 -translate-x-1/2"
            style={{
              background: timelineColor,
              boxShadow: `0 0 20px ${timelineColor}`,
              height: "0%",
            }}
          />

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div
                key={experience._id || index}
                className={cn(
                  "relative experience-card",
                  index % 2 === 0 ? "pr-8 md:pr-0 md:pl-8" : "pl-8 md:pl-0 md:pr-8"
                )}
              >
                <ExperienceCard experience={experience} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 