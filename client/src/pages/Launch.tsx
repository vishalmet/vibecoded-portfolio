"use client";

import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";
// import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PiStarFourFill } from "react-icons/pi";
// import { Navbar } from "@/components/Navbar";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Launch() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -150, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: 12 }}
          transition={{
            duration: 2.4,
            delay: 0.3,
            ease: [0.23, 0.86, 0.39, 0.96],
            opacity: { duration: 1.2 },
          }}
          className="absolute left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        >
          <motion.div
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              width: 600,
              height: 140,
            }}
            className="relative"
          >
            <div
              className={cn(
                "absolute inset-0 rounded-full",
                "bg-gradient-to-r to-transparent from-indigo-500/[0.15]",
                "backdrop-blur-[2px] border-2 border-white/[0.15]",
                "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                "after:absolute after:inset-0 after:rounded-full",
                "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
              )}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -150, rotate: 15 }}
          animate={{ opacity: 1, y: 0, rotate: -15 }}
          transition={{
            duration: 2.4,
            delay: 0.5,
            ease: [0.23, 0.86, 0.39, 0.96],
            opacity: { duration: 1.2 },
          }}
          className="absolute right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        >
          <motion.div
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              width: 500,
              height: 120,
            }}
            className="relative"
          >
            <div
              className={cn(
                "absolute inset-0 rounded-full",
                "bg-gradient-to-r to-transparent from-rose-500/[0.15]",
                "backdrop-blur-[2px] border-2 border-white/[0.15]",
                "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                "after:absolute after:inset-0 after:rounded-full",
                "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
              )}
            />
          </motion.div>
        </motion.div>

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8"
          >
            <span className="text-sm text-white/60 tracking-wide flex items-center gap-2">
              Web3 Frontend Developer
              <Circle className="h-2 w-2 fill-rose-500/80" />
              MERN Stack Developer
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.7,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                Hi, I'm Vishal Aakash
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-3xl sm:text-5xl md:text-7xl text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300"
                )}
              >
                I Build Digital Experiences
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.9,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Crafting exceptional digital experiences through innovative design and cutting-edge technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1.1,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="flex gap-1 justify-center items-center group"
          >
            <div className="bg-black border border-white/[0.15] md:text-xl rounded-xl hover:border-white/30 hover:scale-105 text-white p-2 shadow-xs flexx justify-center items-center group-hover:bg-amber-500/10 group-hover:scale-105 opacity-80">
              <PiStarFourFill />
            </div>
            <Button
              className=" "
            >
              Resume
            </Button>
            {/* <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white transition-colors duration-300"
            >
              Get In Touch
            </a> */}
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}
