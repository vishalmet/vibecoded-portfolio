"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PiStarFourFill } from "react-icons/pi";
import { FaExternalLinkAlt, FaBuilding, FaCalendarAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Sample experience data with multiple roles in same organization
const experiences = [
  {
    id: 1,
    roles: [
      {
        role: "Senior Web3 Frontend Developer",
        description: "Leading the development of DeFi platforms and implementing advanced Web3 features. Mentoring junior developers and setting technical standards.",
        startDate: "Jan 2024",
        endDate: "Present",
      },
      {
        role: "Web3 Frontend Developer",
        description: "Developed and maintained frontend applications for decentralized finance (DeFi) platforms. Implemented Web3.js integration and smart contract interactions.",
        startDate: "Jan 2023",
        endDate: "Dec 2023",
      }
    ],
    organization: "Blockchain Solutions Inc.",
    logo: "/experience/blockchain-solutions.png",
    website: "https://blockchainsolutions.com",
  },
  {
    id: 2,
    roles: [
      {
        role: "Senior React Developer",
        description: "Led the frontend development team in building enterprise-level React applications. Implemented advanced state management and performance optimizations.",
        startDate: "Mar 2021",
        endDate: "Dec 2022",
      },
      {
        role: "React Developer",
        description: "Developed and maintained React applications, implemented new features, and optimized performance.",
        startDate: "Jun 2020",
        endDate: "Feb 2021",
      }
    ],
    organization: "Tech Innovations Ltd",
    logo: "/experience/tech-innovations.png",
    website: "https://techinnovations.com",
  },
  {
    id: 3,
    roles: [
      {
        role: "Full Stack Developer",
        description: "Developed full-stack applications using MERN stack. Implemented RESTful APIs and real-time features using WebSocket.",
        startDate: "Jun 2019",
        endDate: "Feb 2021",
      }
    ],
    organization: "Digital Creations",
    logo: "/experience/digital-creations.png",
  },
];

const ExperienceCard = ({ experience, index }: { experience: typeof experiences[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

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
  }, [index]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative flex gap-8 p-6 rounded-xl border border-white/[0.15] bg-black/50 backdrop-blur-sm",
        "hover:shadow-amber-500/50 transition-all duration-300",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-500/[0.05] before:to-rose-500/[0.05] before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-500",
        "after:absolute after:top-1/2 after:-translate-y-1/2 after:w-4 after:h-4 after:rounded-full after:bg-amber-500/80",
        index % 2 === 0 ? "after:-right-2" : "after:-left-2"
      )}
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
                <h3 className="text-xl font-semibold text-white mb-1">{experience.roles[0].role}</h3>
                <div className="flex items-center gap-2 text-white/60">
                  <FaBuilding className="h-4 w-4" />
                  <span className="text-sm">{experience.organization}</span>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-sm mt-1">
                  <FaCalendarAlt className="h-3 w-3" />
                  <span>{experience.roles[0].startDate} - {experience.roles[0].endDate}</span>
                </div>
              </div>
              {experience.roles.length > 1 && (
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

        <p className="text-white/60 text-sm mb-4">{experience.roles[0].description}</p>

        {experience.website && (
          <a
            href={experience.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <FaExternalLinkAlt className="h-4 w-4" />
            <span className="text-sm">Visit Website</span>
          </a>
        )}

        {isExpanded && experience.roles.length > 1 && (
          <div className="mt-6 space-y-6">
            {experience.roles.slice(1).map((role, roleIndex) => (
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Experience() {
  const titleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const container = containerRef.current;
    if (!title || !container) return;

    // Title animation
    gsap.fromTo(
      title,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Background elements animation
    const bgElements = container.querySelectorAll(".bg-element");
    bgElements.forEach((element, index) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-[#030303] py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-element absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-500/[0.05] to-transparent rounded-full blur-3xl" />
        <div className="bg-element absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-rose-500/[0.05] to-transparent rounded-full blur-3xl" />
        <div className="bg-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div ref={titleRef} className="mb-16 text-center">
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
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/[0.1] -translate-x-1/2" />

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className={cn(
                  "relative",
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