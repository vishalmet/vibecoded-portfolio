"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PiStarFourFill } from "react-icons/pi";
import { GoNorthStar } from "react-icons/go";
import { FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GitHubCalendar from "react-github-calendar";

gsap.registerPlugin(ScrollTrigger);

// Sample project data - This will be replaced with API data later
const projects = [
    {
        id: 1,
        title: "Vibecode Portfolio",
        description: "A modern portfolio website built with React, TypeScript, and TailwindCSS. Features a beautiful UI with animations and responsive design.",
        image: "/projects/portfolio.png",
        tags: ["React", "TypeScript", "TailwindCSS", "Framer Motion", "TypeScript", "TailwindCSS", "Framer Motion"],
        githubUrl: "https://github.com/vishalmet/vibecoded-portfolio",
        liveUrl: "https://vishal-vibecode.vercel.app",
    },
    {
        id: 2,
        title: "Web3 Marketplace",
        description: "A decentralized marketplace for digital assets built on Ethereum blockchain. Features smart contracts, NFT minting, and secure transactions.",
        image: "/projects/marketplace.png",
        tags: ["Solidity", "Web3.js", "React", "Ethereum"],
        githubUrl: "https://github.com/vishalmet/web3-marketplace",
        liveUrl: "https://web3-marketplace.vercel.app",
    },
    {
        id: 3,
        title: "AI Image Generator",
        description: "An AI-powered image generation platform using Stable Diffusion. Create stunning artwork with custom prompts and style presets.",
        image: "/projects/ai-generator.png",
        tags: ["Python", "React", "Stable Diffusion", "AI"],
        githubUrl: "https://github.com/vishalmet/ai-image-generator",
        liveUrl: "https://ai-image-generator.vercel.app",
    },
    {
        id: 4,
        title: "AI Image Generator",
        description: "An AI-powered image generation platform using Stable Diffusion. Create stunning artwork with custom prompts and style presets.",
        image: "/projects/ai-generator.png",
        tags: ["Python", "React", "Stable Diffusion", "AI"],
        githubUrl: "https://github.com/vishalmet/ai-image-generator",
        liveUrl: "https://ai-image-generator.vercel.app",
    },
    {
        id: 5,
        title: "AI Image Generator",
        description: "An AI-powered image generation platform using Stable Diffusion. Create stunning artwork with custom prompts and style presets.",
        image: "/projects/ai-generator.png",
        tags: ["Python", "React", "Stable Diffusion", "AI"],
        githubUrl: "https://github.com/vishalmet/ai-image-generator",
        liveUrl: "https://ai-image-generator.vercel.app",
    },
    {
        id: 6,
        title: "AI Image Generator",
        description: "An AI-powered image generation platform using Stable Diffusion. Create stunning artwork with custom prompts and style presets.",
        image: "/projects/ai-generator.png",
        tags: ["Python", "React", "Stable Diffusion", "AI"],
        githubUrl: "https://github.com/vishalmet/ai-image-generator",
        liveUrl: "https://ai-image-generator.vercel.app",
    },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        gsap.fromTo(
            card,
            {
                opacity: 0,
                y: 100,
                scale: 0.9,
            },
            {
                opacity: 1,
                y: 0,
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

        // Hover animation
        const handleMouseEnter = () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="group relative overflow-hidden rounded-xl border border-white/[0.15] bg-black/50 backdrop-blur-sm shadow-inner hover:shadow-amber-500/50 transition-all duration-300"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] to-rose-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-48 overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            <div className="relative p-6 z-10">
                <h3 className="mb-2 text-xl font-semibold text-white">{project.title}</h3>
                <p className="mb-4 text-sm text-white/60">{project.description}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-white/[0.08] px-3 py-1 text-xs text-white/60"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors z-20 relative"
                    >
                        <FaGithub className="h-5 w-5" />
                        <span className="text-sm">Source</span>
                    </a>
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors z-20 relative"
                    >
                        <FaExternalLinkAlt className="h-5 w-5" />
                        <span className="text-sm">Live Demo</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default function Projects() {
    const titleRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [showAll, setShowAll] = useState(false);
    const hiddenProjectsRef = useRef<HTMLDivElement>(null);

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

    const toggleShowAll = () => {
        const hiddenProjects = hiddenProjectsRef.current;
        if (!hiddenProjects) return;

        if (!showAll) {
            // Show more animation
            gsap.fromTo(
                hiddenProjects,
                {
                    height: 0,
                    opacity: 0,
                },
                {
                    height: "auto",
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    onComplete: () => {
                        setShowAll(true);
                    },
                }
            );
        } else {
            // Hide animation
            gsap.to(hiddenProjects, {
                height: 0,
                opacity: 0,
                duration: 0.6,
                ease: "power3.in",
                onComplete: () => {
                    setShowAll(false);
                },
            });
        }
    };

    const visibleProjects = projects.slice(0, 3);
    const hiddenProjects = projects.slice(3);

    return (
        <div ref={containerRef} className="relative min-h-screen w-full bg-[#030303] py-10 overflow-hidden">
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
                            Featured Projects
                            <PiStarFourFill className="h-3 w-3 text-amber-500/80" />
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        My Projects
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Here are some of my recent projects. Each project is unique and built with different technologies and frameworks.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {visibleProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                <div
                    ref={hiddenProjectsRef}
                    className="overflow-hidden"
                    style={{ height: showAll ? "auto" : 0 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
                        {hiddenProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index + 3} />
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-12">
                    <Button
                        onClick={toggleShowAll}
                        className="group relative overflow-hidden rounded-full bg-white/[0.03] border border-white/[0.08] px-6 py-3 text-white/60 hover:text-white transition-all duration-300 hover:border-white/30"
                    >
                        <span className="flex items-center gap-2">
                            {showAll ? (
                                <>
                                    Show Less
                                    <FaChevronUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
                                </>
                            ) : (
                                <>
                                    Show More
                                    <FaChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                                </>
                            )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/[0.1] to-rose-500/[0.1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                </div>
            </div>
            <div className=" text-white flex justify-center py-10">
                <GitHubCalendar
                    username="vishalmet"
                    blockSize={10}
                    blockMargin={3}
                    fontSize={16}
                />
            </div>
        </div>
    );
} 