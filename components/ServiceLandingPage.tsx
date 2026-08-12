"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, Variants } from 'framer-motion';
import Link from 'next/link';

// Interfaces for the custom data structure
export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export interface WorkflowStep {
  number: string;
  title: string;
  desc: string;
  icon: string;
}

export interface OutcomeCard {
  title: string;
  metric: string;
  desc: string;
  icon: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface ServiceData {
  id: string;
  title: string;
  eyebrow: string;
  tagline: string;
  heroVisualType: 'web' | 'marketing' | 'design' | 'content' | 'video' | 'consultation';
  overview: {
    title: string;
    paragraphs: string[];
    metric: {
      value: string;
      label: string;
    };
  };
  features: Feature[];
  workflow: WorkflowStep[];
  tools: string[];
  whyChooseUs: {
    icon: string;
    title: string;
    desc: string;
  }[];
  outcomes: OutcomeCard[];
  faqs: FAQItem[];
  portfolio: {
    title: string;
    desc: string;
    category: string;
    img: string;
    link: string;
  }[];
}

// Fade-up variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function ServiceLandingPage({ data }: { data: ServiceData }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showcaseStage, setShowcaseStage] = useState(0);

  const overviewRef = useRef(null);
  const isOverviewInView = useInView(overviewRef, { once: true, margin: "-100px" });

  const featuresRef = useRef(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });

  const workflowRef = useRef(null);
  const isWorkflowInView = useInView(workflowRef, { once: true, margin: "-100px" });

  const toolsRef = useRef(null);
  const isToolsInView = useInView(toolsRef, { once: true, margin: "-100px" });

  const whyChooseRef = useRef(null);
  const isWhyChooseInView = useInView(whyChooseRef, { once: true, margin: "-100px" });

  const outcomesRef = useRef(null);
  const isOutcomesInView = useInView(outcomesRef, { once: true, margin: "-100px" });

  const portfolioRef = useRef(null);
  const isPortfolioInView = useInView(portfolioRef, { once: true, margin: "-100px" });

  // Auto-progress showcase stage
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setShowcaseStage(3); // Static active state
      return;
    }

    const timer = setInterval(() => {
      setShowcaseStage((prev) => (prev + 1) % data.workflow.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [data.workflow.length]);

  const renderHeroVisual = () => {
    switch (data.heroVisualType) {
      case 'web':
        return (
          <div className="relative w-full h-[420px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-45 pointer-events-none" />
            <div className="absolute w-[220px] h-[220px] bg-gradient-to-tr from-[#1E7FD4]/20 to-[#08A9E6]/20 rounded-full blur-[80px] -z-10" />

            <motion.div
              className="absolute w-[85%] bg-[#0B1F3A]/95 border border-white/10 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.55),0_0_50px_rgba(8,169,230,0.3)] overflow-hidden z-10"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                  <span className="text-[10px] text-white/45 ml-4 font-mono select-none">atriowings.in/web-developing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FD4] animate-pulse"></span>
                  <span className="text-[9px] text-white/45 uppercase tracking-wider font-bold">● RENDER VIDEO</span>
                </div>
              </div>

              <div className="relative h-[210px] bg-black/60 overflow-hidden flex items-center justify-center">
                <video
                  src="/img/web-development-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-20 opacity-25" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-4 left-1 bg-[#1E7FD4]/90 backdrop-blur-md px-3.5 py-3 rounded-2xl text-white shadow-lg border border-white/10 z-20 flex items-center gap-3"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-lg">
                <i className="fas fa-database text-white"></i>
              </div>
              <div>
                <span className="text-[8px] uppercase tracking-wider text-white/60 font-bold block">DATABASE</span>
                <span className="text-[10px] font-bold block">PostgreSQL Config</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-6 right-1 bg-[#2E9E6B]/90 backdrop-blur-md px-3.5 py-3 rounded-2xl text-white shadow-lg border border-white/10 z-20 flex items-center gap-3"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-lg">
                <i className="fas fa-shield-alt text-white animate-pulse"></i>
              </div>
              <div>
                <span className="text-[8px] uppercase tracking-wider text-white/60 font-bold block">SECURITY</span>
                <span className="text-[10px] font-bold block">Secure API Auth</span>
              </div>
            </motion.div>
          </div>
        );
      case 'marketing':
        return (
          <div className="relative w-full h-[420px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-45 pointer-events-none" />
            <div className="absolute w-[220px] h-[220px] bg-gradient-to-tr from-[#FF8A3D]/20 to-[#08A9E6]/20 rounded-full blur-[80px] -z-10" />

            <motion.div
              className="absolute w-[85%] bg-[#0B1F3A]/95 border border-white/10 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.55),0_0_50px_rgba(255,138,61,0.25)] overflow-hidden z-10"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                  <span className="text-[10px] text-white/45 ml-4 font-mono select-none">atriowings.in/digital-marketing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A3D] animate-pulse"></span>
                  <span className="text-[9px] text-white/45 uppercase tracking-wider font-bold">● RENDER GIF</span>
                </div>
              </div>

              <div className="relative h-[210px] bg-[#0c1322] overflow-hidden flex items-center justify-center">
                <img
                  src="/img/Services/digitalmarketgif4.gif"
                  className="w-full h-full object-cover"
                  alt="Marketing visual"
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-20 opacity-25" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-4 left-1 bg-[#FF8A3D]/95 backdrop-blur-md px-3.5 py-3 rounded-2xl text-white shadow-lg border border-white/10 z-20 flex flex-col"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[8px] uppercase tracking-wider text-white/60 font-bold block">CAMPAIGN ROI</span>
              <span className="text-[14px] font-extrabold block">5.8x ROAS</span>
            </motion.div>

            <motion.div
              className="absolute top-6 right-1 bg-[#2E9E6B]/90 backdrop-blur-md px-3.5 py-3 rounded-2xl text-white shadow-lg border border-white/10 z-20 flex items-center gap-3"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-lg">
                <i className="fas fa-bullseye text-white"></i>
              </div>
              <div>
                <span className="text-[8px] uppercase tracking-wider text-white/60 font-bold block">TARGETING</span>
                <span className="text-[10px] font-bold block">Lead Funnels Set</span>
              </div>
            </motion.div>
          </div>
        );
      case 'design':
        return (
          <div className="relative w-full h-[420px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-45 pointer-events-none" />
            <div className="absolute w-[220px] h-[220px] bg-gradient-to-tr from-[#A855F7]/20 to-[#08A9E6]/20 rounded-full blur-[80px] -z-10" />

            <motion.div
              className="absolute w-[85%] bg-[#0B1F3A]/95 border border-white/10 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.55),0_0_50px_rgba(168,85,247,0.25)] overflow-hidden z-10"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                  <span className="text-[10px] text-white/45 ml-4 font-mono select-none">Figma Workspace - product-design</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse"></span>
                  <span className="text-[9px] text-white/45 uppercase tracking-wider font-bold">● FigJam Live</span>
                </div>
              </div>

              <div className="relative h-[210px] bg-[#0c1322] overflow-hidden flex items-center justify-center">
                <img
                  src="/img/Services/product designgif.gif"
                  className="w-full h-full object-cover"
                  alt="Design visual"
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-20 opacity-25" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-4 left-1 bg-[#A855F7]/95 backdrop-blur-md px-3.5 py-3 rounded-2xl text-white shadow-lg border border-white/10 z-20 flex flex-col"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[8px] uppercase tracking-wider text-white/60 font-bold block">UX GRADE</span>
              <span className="text-[14px] font-extrabold block">A+ Gold Score</span>
            </motion.div>

            <motion.div
              className="absolute top-6 right-1 bg-[#1E7FD4]/90 backdrop-blur-md px-3.5 py-2.5 rounded-2xl text-white shadow-lg border border-white/10 z-20 flex items-center gap-3"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <span className="w-2 h-2 rounded-full bg-[#2E9E6B]"></span>
              <span className="w-2 h-2 rounded-full bg-[#08A9E6]"></span>
              <div>
                <span className="text-[10px] font-bold block">Interactive Canvas</span>
              </div>
            </motion.div>
          </div>
        );
      case 'content':
        return (
          <div className="relative w-full h-[420px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-45 pointer-events-none" />
            <div className="absolute w-[220px] h-[220px] bg-gradient-to-tr from-[#2E9E6B]/20 to-[#08A9E6]/20 rounded-full blur-[80px] -z-10" />

            <motion.div
              className="absolute w-[85%] bg-[#0B1F3A]/95 border border-white/10 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.55),0_0_50px_rgba(8,169,230,0.25)] overflow-hidden z-10"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                  <span className="text-[10px] text-white/45 ml-4 font-mono select-none">atriowings.in/content-editor</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E9E6B] animate-pulse"></span>
                  <span className="text-[9px] text-white/45 uppercase tracking-wider font-bold">● Content Active</span>
                </div>
              </div>

              <div className="relative h-[210px] bg-[#0c1322] overflow-hidden flex items-center justify-center">
                <img
                  src="/img/portfolio pics/Content-Writing-12.gif"
                  className="w-full h-full object-cover"
                  alt="Content writing visual"
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-20 opacity-25" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-4 left-1 bg-[#2E9E6B]/95 backdrop-blur-md px-3.5 py-3 rounded-2xl text-white shadow-lg border border-white/10 z-20 flex items-center gap-3"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-sm">
                <i className="fas fa-spell-check"></i>
              </div>
              <div>
                <span className="text-[8px] uppercase tracking-wider text-white/60 font-bold block">VERIFIED</span>
                <span className="text-[10px] font-bold block">100% Original</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-6 right-1 bg-[#FF8A3D]/95 backdrop-blur-md px-3.5 py-3 rounded-2xl text-white shadow-lg border border-white/10 z-20 flex flex-col"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <span className="text-[8px] uppercase tracking-wider text-white/60 font-bold block">ENGAGEMENT INDEX</span>
              <span className="text-[10px] font-bold block">High Interaction</span>
            </motion.div>
          </div>
        );
      case 'video':
        return (
          <div className="relative w-full h-[420px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-45 pointer-events-none" />
            <div className="absolute w-[220px] h-[220px] bg-gradient-to-tr from-[#ef4444]/20 to-[#08A9E6]/20 rounded-full blur-[80px] -z-10" />

            <motion.div
              className="absolute w-[85%] bg-[#0B1F3A]/95 border border-white/10 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.55),0_0_50px_rgba(239,68,68,0.25)] overflow-hidden z-10"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                  <span className="text-[10px] text-white/45 ml-4 font-mono select-none">atriowings.in/video-studio</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse"></span>
                  <span className="text-[9px] text-white/45 uppercase tracking-wider font-bold">● RENDER TIMELINE</span>
                </div>
              </div>

              <div className="relative h-[210px] bg-[#0c1322] overflow-hidden flex items-center justify-center">
                <img
                  src="/img/Services/videogif.gif"
                  className="w-full h-full object-cover"
                  alt="Video ads visual"
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-20 opacity-25" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-4 left-1 bg-[#ef4444]/95 backdrop-blur-md px-3.5 py-3 rounded-2xl text-white shadow-lg border border-white/10 z-20 flex items-center gap-3.5"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-lg">
                <i className="fas fa-film text-white"></i>
              </div>
              <div>
                <span className="text-[8px] uppercase tracking-wider text-white/60 font-bold block">OUTPUT QUALITY</span>
                <span className="text-[10px] font-bold block">UltraHD 4K Layout</span>
              </div>
            </motion.div>
          </div>
        );
      case 'consultation':
        return (
          <div className="relative w-full h-[420px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-45 pointer-events-none" />
            <div className="absolute w-[220px] h-[220px] bg-gradient-to-tr from-[#08A9E6]/20 to-[#2E9E6B]/20 rounded-full blur-[80px] -z-10" />

            <motion.div
              className="absolute w-[85%] bg-[#0B1F3A]/95 border border-white/10 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.55),0_0_50px_rgba(8,169,230,0.25)] overflow-hidden z-10"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                  <span className="text-[10px] text-white/45 ml-4 font-mono select-none">atriowings.in/consultation-flow</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#08A9E6] animate-pulse"></span>
                  <span className="text-[9px] text-white/45 uppercase tracking-wider font-bold">● Analysis Active</span>
                </div>
              </div>

              <div className="relative h-[210px] bg-[#0c1322] overflow-hidden flex items-center justify-center">
                <img
                  src="/img/Services/services1.gif"
                  className="w-full h-full object-cover"
                  alt="Consultation visual"
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-20 opacity-25" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-4 left-1 bg-[#2E9E6B]/95 backdrop-blur-md px-3.5 py-3 rounded-2xl text-white shadow-lg border border-white/10 z-20 flex flex-col"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[8px] uppercase tracking-wider text-white/60 font-bold block">SUCCESS SATISFACTION</span>
              <span className="text-[14px] font-extrabold block">98% Rating</span>
            </motion.div>
          </div>
        );
    }
  };

  const renderShowcaseVisual = (type: string, stage: number) => {
    // Stage-specific media mapping
    let mediaSrc = "";
    let isVideo = false;

    if (type === 'web') {
      if (stage === 0) mediaSrc = "/img/Services/services1.gif";
      else if (stage === 1) mediaSrc = "/img/portfolio pics/Plane Loop.gif";
      else if (stage === 2) mediaSrc = "/img/Services/product designgif.gif";
      else if (stage === 3) {
        mediaSrc = "/img/web-development-video.mp4";
        isVideo = true;
      }
      else if (stage === 4) mediaSrc = "/img/wedeveloping gif.gif";
      else mediaSrc = "/img/portfolio pics/Responsive  Website Animation (1).gif";
    }
    else if (type === 'design') {
      if (stage === 0) mediaSrc = "/img/Services/services2.gif";
      else if (stage === 1) mediaSrc = "/img/portfolio pics/Plane Loop.gif";
      else if (stage === 2) mediaSrc = "/img/wedeveloping gif.gif";
      else if (stage === 3) mediaSrc = "/img/Services/product designgif.gif";
      else if (stage === 4) mediaSrc = "/img/portfolio pics/Responsive  Website Animation (1).gif";
      else mediaSrc = "/img/Services/webdevelopimg gif2.gif";
    }
    else if (type === 'content') {
      if (stage === 0) mediaSrc = "/img/Services/servics.gif";
      else if (stage === 1) mediaSrc = "/img/Services/services1.gif";
      else if (stage === 2) mediaSrc = "/img/portfolio pics/Plane Loop.gif";
      else if (stage === 3) mediaSrc = "/img/portfolio pics/Content-Writing-12.gif";
      else if (stage === 4) mediaSrc = "/img/Services/digitalmarketgif1.gif";
      else mediaSrc = "/img/portfolio pics/Responsive  Website Animation (1).gif";
    }
    else if (type === 'marketing') {
      if (stage === 0) mediaSrc = "/img/Services/services2.gif";
      else if (stage === 1) mediaSrc = "/img/Services/servics.gif";
      else if (stage === 2) mediaSrc = "/img/Services/digitalmarketgif1.gif";
      else if (stage === 3) mediaSrc = "/img/Services/digitalmarketgif2.gif";
      else if (stage === 4) mediaSrc = "/img/Services/digitalmarketgif3.gif";
      else mediaSrc = "/img/Services/digitalmarketgif4.gif";
    }
    else if (type === 'video') {
      if (stage === 0) mediaSrc = "/img/Services/services1.gif";
      else if (stage === 1) mediaSrc = "/img/portfolio pics/Content-Writing-12.gif";
      else if (stage === 2) mediaSrc = "/img/portfolio pics/download.gif";
      else if (stage === 3) mediaSrc = "/img/Services/videogif.gif";
      else if (stage === 4) mediaSrc = "/img/wedeveloping gif.gif";
      else mediaSrc = "/img/Services/videogif.gif";
    }
    else {
      if (stage === 0) mediaSrc = "/img/Services/services1.gif";
      else if (stage === 1) mediaSrc = "/img/Services/services2.gif";
      else if (stage === 2) mediaSrc = "/img/Services/servics.gif";
      else if (stage === 3) mediaSrc = "/img/Services/product designgif.gif";
      else if (stage === 4) mediaSrc = "/img/portfolio pics/Plane Loop.gif";
      else mediaSrc = "/img/portfolio pics/Responsive  Website Animation (1).gif";
    }

    switch (type) {
      case 'web':
        return (
          <div className="row g-3 h-full">
            <div className="col-5 h-full flex flex-col">
              <div className="bg-[#081225] border border-white/5 rounded-xl p-3 flex-1 font-mono text-[9px] text-blue-400 overflow-hidden leading-relaxed">
                <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  <span className="text-white/40 text-[8px]">index.tsx</span>
                </div>
                <AnimatePresence mode="wait">
                  {stage === 0 && (
                    <motion.div key="st0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-white/40">// 01 Discover Stage</p>
                      <p className="text-yellow-300">const targetAudience = &quot;Global Users&quot;;</p>
                      <p className="text-yellow-300">const pagesNeeded = [&quot;Home&quot;, &quot;Dashboard&quot;];</p>
                      <p className="text-green-400">console.log(&quot;Analyzing target logs...&quot;);</p>
                    </motion.div>
                  )}
                  {stage === 1 && (
                    <motion.div key="st1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-white/40">// 02 Wireframe Outline</p>
                      <p className="text-yellow-300">import &#123; SkeletonCard &#125; from &apos;ui&apos;;</p>
                      <p className="text-purple-300">&lt;div className=&quot;grid-cols-3&quot;&gt;</p>
                      <p className="pl-3 text-purple-300">&lt;SkeletonCard h=&#123;300&#125; /&gt;</p>
                      <p className="text-purple-300">&lt;/div&gt;</p>
                    </motion.div>
                  )}
                  {stage === 2 && (
                    <motion.div key="st2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-white/40">// 03 UI Design Mockup</p>
                      <p className="text-yellow-300">const themeConfig = &#123;</p>
                      <p className="pl-3">primary: &quot;#1E7FD4&quot;,</p>
                      <p className="pl-3">background: &quot;#0B1F3A&quot;,</p>
                      <p className="pl-3">glow: &quot;rgba(30,127,212,0.4)&quot;</p>
                      <p className="text-yellow-300">&#125;;</p>
                    </motion.div>
                  )}
                  {stage === 3 && (
                    <motion.div key="st3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-white/40">// 04 Active React Code</p>
                      <p className="text-yellow-300">const [data, setData] = useState(null);</p>
                      <p className="text-yellow-300">useEffect(() =&gt; &#123;</p>
                      <p className="pl-3 text-green-300">fetchAPI().then(res =&gt; setData(res));</p>
                      <p className="text-yellow-300">&#125;, []);</p>
                    </motion.div>
                  )}
                  {stage === 4 && (
                    <motion.div key="st4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-white/40">// 05 Testing Pipeline</p>
                      <p className="text-green-300">describe(&apos;Performance Audit&apos;, () =&gt; &#123;</p>
                      <p className="pl-3">it(&apos;loads under 1.5s&apos;, () =&gt; &#123;</p>
                      <p className="pl-6 text-yellow-300">expect(page.loadTime).toBeLessThan(1500);</p>
                      <p className="pl-3">&#125;);</p>
                      <p className="text-green-300">&#125;);</p>
                    </motion.div>
                  )}
                  {stage === 5 && (
                    <motion.div key="st5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-[#2E9E6B]">// 06 Launch Success Log</p>
                      <p className="text-white">STATUS: BUILD SUCCESSFUL</p>
                      <p className="text-white">PRERENDERED ROUTE: /services</p>
                      <p className="text-[#08A9E6]">Vercel Deploy: Live on main branch</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            {/* Right side: Video player */}
            <div className="col-7 h-full flex flex-col">
              <div className="relative h-[190px] rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-md">
                {isVideo ? (
                  <video
                    src={mediaSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={mediaSrc}
                    className="w-full h-full object-cover"
                    alt="Showcase simulation"
                  />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-[0.12]" />
              </div>
            </div>
          </div>
        );

      case 'design':
        return (
          <div className="row g-3 h-full">
            <div className="col-4 h-full">
              <div className="bg-[#0c1322] border border-white/5 rounded-xl p-2.5 h-[190px] text-white/50 text-[8px] overflow-hidden">
                <span className="text-[7px] uppercase tracking-wider text-muted-foreground block mb-2 font-bold font-mono">LAYERS / FigJam</span>
                <div className="space-y-1">
                  <div className={`p-1 rounded ${stage >= 0 ? 'text-purple-400 font-bold bg-purple-50/10' : ''}`}>✔ Research Flow</div>
                  <div className={`p-1 rounded ${stage >= 2 ? 'text-purple-400 font-bold bg-purple-50/10' : ''}`}>✔ Wireframes</div>
                  <div className={`p-1 rounded ${stage >= 3 ? 'text-purple-400 font-bold bg-purple-50/10' : ''}`}>✔ Colorful UI</div>
                  <div className={`p-1 rounded ${stage >= 4 ? 'text-purple-400 font-bold bg-purple-50/10' : ''}`}>✔ Smart Animate</div>
                </div>
              </div>
            </div>
            <div className="col-8 h-full">
              <div className="relative h-[190px] rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-md">
                <img
                  src={mediaSrc}
                  className="w-full h-full object-cover"
                  alt="Design simulation"
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-[0.12]" />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full">
            <div className="relative h-[190px] rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-md">
              <img
                src={mediaSrc}
                className="w-full h-full object-cover"
                alt="Showcase simulation"
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-[0.12]" />
            </div>
          </div>
        );
    }
  };

  const accentCol =
    data.heroVisualType === 'web' ? '#1E7FD4' :
    data.heroVisualType === 'design' ? '#A855F7' :
    data.heroVisualType === 'content' ? '#2E9E6B' :
    data.heroVisualType === 'marketing' ? '#FF8A3D' :
    data.heroVisualType === 'video' ? '#ef4444' : '#08A9E6';

  const cardBorder = `1.5px solid ${accentCol}33`;
  const cardShadow = `0 25px 80px -15px ${accentCol}1f, 0 2px 6px rgba(0,0,0,0.05)`;
  const gradientTop = `linear-gradient(90deg, transparent, ${accentCol}, transparent)`;
  const gradientProgress = `linear-gradient(90deg, ${accentCol}, ${accentCol}99)`;

  return (
    <div className="bg-[#F7F5F0] overflow-x-hidden w-full relative">
      
      {/* 1. HERO BANNER */}
      <section className="relative bg-gradient-to-b from-[#0B1F3A] to-[#0f2d54] text-white pt-28 pb-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,127,212,0.18),rgba(255,255,255,0))]"></div>
        <div className="container relative z-10 px-4 overflow-hidden">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <motion.span
                className="inline-block bg-[#1E7FD4]/20 border border-[#1E7FD4]/40 text-[#08A9E6] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {data.eyebrow}
              </motion.span>
              <motion.h1
                className="display-4 fw-extrabold text-white mb-4 tracking-tight leading-tight"
                style={{ fontFamily: 'var(--font-rubik)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                {data.title}
              </motion.h1>
              <motion.p
                className="text-white/70 text-base md:text-lg mb-8 leading-relaxed max-w-[500px]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {data.tagline}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="btn btn-primary btn-lg rounded-pill px-5 py-3 font-bold transition-all hover:scale-102 hover:shadow-lg flex items-center gap-3 w-fit"
                  style={{ backgroundColor: '#1E7FD4', borderColor: '#1E7FD4' }}
                >
                  Get Started <i className="fas fa-arrow-right text-xs"></i>
                </Link>
              </motion.div>
            </div>

            <div className="col-lg-6">
              {renderHeroVisual()}
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW SECTION — HOVER + GLOW UPGRADED */}
      <section ref={overviewRef} className="py-24 bg-white overflow-hidden relative">
        {/* Soft ambient background blobs */}
        <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-[#1E7FD4]/4 rounded-full blur-[100px] pointer-events-none -z-0" />
        <div className="absolute bottom-0 right-0 w-[280px] h-[280px] bg-[#2E9E6B]/4 rounded-full blur-[80px] pointer-events-none -z-0" />

        <div className="container px-4 relative z-10">
          <div className="row g-5 align-items-center">

            {/* ── LEFT: Premium Metric Card ── */}
            <div className="col-lg-5">
              <motion.div
                className="group relative rounded-[28px] p-10 text-center overflow-hidden cursor-default select-none"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={isOverviewInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeOut" }}
                whileHover={{ scale: 1.025, y: -4 }}
                style={{
                  background: `linear-gradient(135deg, ${accentCol}0a 0%, ${accentCol}16 50%, ${accentCol}06 100%)`,
                  border: `1.5px solid ${accentCol}25`,
                  boxShadow: `0 8px 32px ${accentCol}12`
                }}
              >
                {/* Hover glow ring — animates to full opacity on hover */}
                <motion.div
                  className="absolute inset-0 rounded-[28px] pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    boxShadow: `0 0 0 2px ${accentCol}40, 0 0 40px ${accentCol}20, 0 0 80px ${accentCol}10`
                  }}
                />

                {/* Animated pulsing ring */}
                <motion.div
                  className="absolute inset-0 rounded-[28px] pointer-events-none"
                  animate={{
                    boxShadow: [
                      `0 0 0 0px ${accentCol}22`,
                      `0 0 0 12px ${accentCol}00`
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                />

                {/* Background glow orb — expands on hover */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width: 200,
                    height: 200,
                    backgroundColor: accentCol,
                    filter: 'blur(60px)'
                  }}
                />

                {/* Floating sparkle dots */}
                {[
                  { top: '12%', left: '10%', delay: 0 },
                  { top: '20%', right: '8%', delay: 0.6 },
                  { bottom: '18%', left: '14%', delay: 1.2 },
                  { bottom: '12%', right: '12%', delay: 1.8 }
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: 6, height: 6,
                      backgroundColor: accentCol,
                      opacity: 0.4,
                      ...pos
                    }}
                    animate={{
                      scale: [1, 1.6, 1],
                      opacity: [0.25, 0.6, 0.25]
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      delay: pos.delay,
                      ease: "easeInOut"
                    }}
                  />
                ))}

                {/* Metric value with glow on hover */}
                <motion.div
                  className="relative z-10 mb-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span
                    className="display-3 fw-extrabold block leading-none"
                    style={{
                      color: accentCol,
                      textShadow: `0 0 30px ${accentCol}40, 0 0 60px ${accentCol}20`
                    }}
                  >
                    {data.overview.metric.value}
                  </span>
                </motion.div>

                {/* Label */}
                <p className="relative z-10 text-xs uppercase tracking-widest font-extrabold mb-5"
                  style={{ color: `${accentCol}90` }}
                >
                  {data.overview.metric.label}
                </p>

                {/* Verified badge */}
                <motion.div
                  className="relative z-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-white text-[10px] font-extrabold uppercase tracking-widest"
                  style={{ backgroundColor: accentCol }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.06 }}
                >
                  <i className="fas fa-check-circle text-white/80"></i>
                  AtrioWings Verified Result
                </motion.div>

                {/* Bottom shimmer bar */}
                <div className="relative z-10 mt-5 h-1 rounded-full overflow-hidden" style={{ background: `${accentCol}18` }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${accentCol}, transparent)` }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.8 }}
                  />
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Text content with animated highlights ── */}
            <div className="col-lg-7">
              <motion.span
                className="text-xs font-extrabold uppercase tracking-widest mb-3 block d-flex align-items-center gap-2"
                style={{ color: '#2E9E6B' }}
                initial="hidden"
                animate={isOverviewInView ? "visible" : "hidden"}
                variants={fadeUp}
              >
                <motion.span
                  className="inline-block w-5 h-0.5 rounded-full"
                  style={{ backgroundColor: '#2E9E6B' }}
                  initial={{ scaleX: 0 }}
                  animate={isOverviewInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                Overview
              </motion.span>

              {/* Heading — full color change + glow on hover */}
              <motion.h2
                className="fw-extrabold mb-5 transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-rubik)',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)',
                  lineHeight: 1.18,
                  color: '#0B1F3A',
                  cursor: 'default'
                }}
                initial="hidden"
                animate={isOverviewInView ? "visible" : "hidden"}
                variants={fadeUp}
                whileHover={{
                  color: accentCol,
                  textShadow: `0 0 28px ${accentCol}35, 0 0 55px ${accentCol}15`,
                  x: 4
                }}
                transition={{ duration: 0.25 }}
              >
                {data.overview.title}
              </motion.h2>

              {/* Animated underline that reveals on inView */}
              <motion.div
                className="mb-5 h-0.5 rounded-full"
                style={{ background: `linear-gradient(90deg, ${accentCol}, ${accentCol}30, transparent)` }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={isOverviewInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              />

              <motion.div
                className="text-muted leading-relaxed mb-8"
                style={{ fontSize: 'clamp(0.82rem, 1.5vw, 0.95rem)' }}
                initial="hidden"
                animate={isOverviewInView ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                {data.overview.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    variants={fadeUp}
                    className="mb-3 rounded-xl px-3 py-2 cursor-pointer"
                    style={{
                      borderLeft: `3px solid transparent`,
                      transition: 'border-color 0.2s'
                    }}
                    whileHover={{
                      color: accentCol,
                      background: accentCol + '0a',
                      borderColor: accentCol + '60',
                      x: 6,
                      scale: 1.01,
                      boxShadow: `inset 0 0 0 1px ${accentCol}15, 0 4px 16px ${accentCol}10`
                    }}
                    whileTap={{
                      color: accentCol,
                      background: accentCol + '14',
                      borderColor: accentCol,
                      scale: 0.99,
                      boxShadow: `inset 0 0 0 1px ${accentCol}30, 0 2px 12px ${accentCol}20`
                    }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                  >
                    {p}
                  </motion.p>
                ))}
              </motion.div>

              {/* Glowing stat chips row — enhanced hover color change */}
              <motion.div
                className="d-flex flex-wrap gap-2 gap-sm-3"
                initial="hidden"
                animate={isOverviewInView ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                {[
                  { icon: 'fa-bolt', label: 'Fast Delivery', col: accentCol },
                  { icon: 'fa-shield-alt', label: 'Quality Assured', col: '#2E9E6B' },
                  { icon: 'fa-chart-line', label: 'ROI Driven', col: '#FF8A3D' }
                ].map((chip) => (
                  <motion.div
                    key={chip.label}
                    variants={fadeUp}
                    className="d-inline-flex align-items-center gap-2 rounded-pill px-3 px-sm-4 py-2 text-xs font-bold cursor-default"
                    style={{
                      background: chip.col + '0f',
                      border: `1.5px solid ${chip.col}25`,
                      color: '#374151',
                      fontSize: 'clamp(10px, 1.2vw, 13px)'
                    }}
                    whileHover={{
                      scale: 1.08,
                      color: chip.col,
                      background: chip.col + '18',
                      boxShadow: `0 6px 24px ${chip.col}30`,
                      borderColor: chip.col + '70'
                    }}
                    transition={{ duration: 0.18 }}
                  >
                    <motion.span
                      className="w-6 h-6 rounded-full d-flex align-items-center justify-content-center text-white"
                      style={{ backgroundColor: chip.col, fontSize: 10, minWidth: 24 }}
                      whileHover={{ rotate: 15, scale: 1.15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <i className={`fas ${chip.icon}`}></i>
                    </motion.span>
                    {chip.label}
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ANIMATED SERVICE SHOWCASE — PREMIUM REDESIGN */}
      <section className="py-24 bg-gradient-to-br from-[#F7F5F0] via-[#EFF6FF] to-[#F0FDF4] overflow-hidden relative">
        {/* Floating background orbs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#1E7FD4]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-[#2E9E6B]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container px-4 relative z-10">
          {/* Glow Pulse CSS injection */}
          <style>{`
            @keyframes textGlowPulseShowcase {
              0%   { text-shadow: 0 0 0px ${accentCol}00;    color: #0B1F3A; }
              50%  { text-shadow: 0 0 20px ${accentCol}60; color: ${accentCol}; }
              100% { text-shadow: 0 0 0px ${accentCol}00;    color: #0B1F3A; }
            }
            @keyframes textGlowPulseShowcaseWhite {
              0%   { text-shadow: 0 0 0px ${accentCol}00;    color: #FFFFFF; }
              50%  { text-shadow: 0 0 20px ${accentCol}60; color: ${accentCol}; }
              100% { text-shadow: 0 0 0px ${accentCol}00;    color: #FFFFFF; }
            }
            .glow-pulse-showcase {
              animation: textGlowPulseShowcase 4s infinite ease-in-out;
            }
            .glow-pulse-showcase-white {
              animation: textGlowPulseShowcaseWhite 4s infinite ease-in-out;
            }
          `}</style>

          {/* Section Header */}
          <motion.div
            className="text-center max-w-[700px] mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border text-[11px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-full mb-3 shadow-sm"
              style={{ borderColor: `${accentCol}33`, color: accentCol }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentCol }}></span>
              Live Workflow Showcase
            </span>
            <h2 className="display-6 fw-extrabold mb-0 glow-pulse-showcase" style={{ fontFamily: 'var(--font-rubik)' }}>
              Animated Service Delivery Simulation
            </h2>
            
            {/* Animated Underline with glowing dot */}
            <div className="position-relative mx-auto mt-4 mb-4" style={{ width: '150px', height: '6px' }}>
              <motion.div 
                className="position-absolute top-0 start-50 translate-middle-x" 
                style={{ height: '5px', borderRadius: '3px', width: '100%', originX: 0.5, backgroundColor: accentCol }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.div 
                className="position-absolute top-0 bg-white" 
                style={{ width: '8px', height: '5px', borderRadius: '2px', left: 0 }}
                animate={{ 
                  left: ['0%', '94%', '0%'],
                  opacity: [1, 0.4, 1],
                  boxShadow: [
                    `0 0 4px #fff, 0 0 10px ${accentCol}`,
                    `0 0 1px #fff, 0 0 2px ${accentCol}`,
                    `0 0 4px #fff, 0 0 10px ${accentCol}`
                  ]
                }}
                transition={{
                  left: { duration: 4, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 4, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 4, repeat: Infinity, ease: "linear" }
                }}
              />
            </div>

            <p className="text-muted leading-relaxed">
              Watch how we transform your requirements into a premium digital product — step by step, in real time.
            </p>
          </motion.div>

          {/* Main Showcase Card */}
          <div className="row justify-content-center">
            <div className="col-xl-11 col-lg-12">
              <motion.div
                className="relative rounded-[28px] overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                  background: 'rgba(255,255,255,0.72)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: cardBorder,
                  boxShadow: cardShadow
                }}
              >
                {/* Gradient top-border accent */}
                <div
                  className="absolute top-0 left-0 w-full h-1 z-20"
                  style={{
                    background: gradientTop
                  }}
                />

                {/* Floating particle dots */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full opacity-30 pointer-events-none"
                    style={{
                      backgroundColor:
                        data.heroVisualType === 'web' ? '#1E7FD4' :
                        data.heroVisualType === 'design' ? '#A855F7' :
                        data.heroVisualType === 'content' ? '#2E9E6B' :
                        data.heroVisualType === 'marketing' ? '#FF8A3D' :
                        data.heroVisualType === 'video' ? '#ef4444' :
                        '#08A9E6',
                      top: `${15 + i * 12}%`,
                      right: `${3 + (i % 3) * 4}%`,
                    }}
                    animate={{ y: [0, -12, 0], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  />
                ))}

                <div className="p-5 p-md-7 p-lg-8">

                  {/* Card header row */}
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-6">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${
                            data.heroVisualType === 'web' ? '#1E7FD4, #08A9E6' :
                            data.heroVisualType === 'design' ? '#A855F7, #7C3AED' :
                            data.heroVisualType === 'content' ? '#2E9E6B, #10b981' :
                            data.heroVisualType === 'marketing' ? '#FF8A3D, #F97316' :
                            data.heroVisualType === 'video' ? '#ef4444, #dc2626' :
                            '#08A9E6, #0284c7'
                          })`
                        }}
                      >
                        <i className={`fas fa-${
                          data.heroVisualType === 'web' ? 'code' :
                          data.heroVisualType === 'design' ? 'pen-nib' :
                          data.heroVisualType === 'content' ? 'file-alt' :
                          data.heroVisualType === 'marketing' ? 'chart-bar' :
                          data.heroVisualType === 'video' ? 'film' :
                          'handshake'
                        }`}></i>
                      </div>
                      <div>
                        <h3 className="h5 fw-extrabold text-[#0B1F3A] mb-0 leading-tight">{data.title}</h3>
                        <p className="text-muted text-xs mb-0 mt-0.5">{data.tagline}</p>
                      </div>
                    </div>
                    {/* Live badge */}
                    <span className="inline-flex items-center gap-1.5 bg-[#2E9E6B]/10 border border-[#2E9E6B]/25 text-[#2E9E6B] text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2E9E6B] animate-pulse"></span>
                      Live Simulation
                    </span>
                  </div>

                  {/* Horizontal Timeline */}
                  <div className="relative mb-8">
                    {/* Progress track */}
                    <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-100 z-0 rounded-full">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${
                            data.heroVisualType === 'web' ? '#1E7FD4, #08A9E6' :
                            data.heroVisualType === 'design' ? '#A855F7, #7C3AED' :
                            data.heroVisualType === 'content' ? '#2E9E6B, #10b981' :
                            data.heroVisualType === 'marketing' ? '#FF8A3D, #F97316' :
                            data.heroVisualType === 'video' ? '#ef4444, #F97316' :
                            '#08A9E6, #1E7FD4'
                          })`
                        }}
                        animate={{ width: `${((showcaseStage) / (data.workflow.length - 1)) * 100}%` }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                    </div>

                    <div className="d-flex justify-content-between position-relative" style={{ zIndex: 1 }}>
                      {data.workflow.map((step, idx) => {
                        const isActive = idx === showcaseStage;
                        const isPast = idx < showcaseStage;
                        const accentColor =
                          data.heroVisualType === 'web' ? '#1E7FD4' :
                          data.heroVisualType === 'design' ? '#A855F7' :
                          data.heroVisualType === 'content' ? '#2E9E6B' :
                          data.heroVisualType === 'marketing' ? '#FF8A3D' :
                          data.heroVisualType === 'video' ? '#ef4444' : '#08A9E6';
                        return (
                          <div
                            key={step.title}
                            className="d-flex flex-column align-items-center cursor-pointer"
                            style={{ minWidth: 0, flex: 1 }}
                            onClick={() => setShowcaseStage(idx)}
                          >
                            <motion.div
                              className="rounded-full flex items-center justify-center font-bold text-[10px] border-2 shadow-sm cursor-pointer"
                              style={{
                                width: 32, height: 32,
                                borderColor: isActive || isPast ? accentColor : '#E5E7EB',
                                color: isActive ? '#FFFFFF' : isPast ? accentColor : '#9CA3AF',
                                backgroundColor: isActive ? accentColor : isPast ? accentColor + '18' : '#FFFFFF',
                                boxShadow: isActive ? `0 0 0 4px ${accentColor}22, 0 4px 12px ${accentColor}40` : 'none'
                              }}
                              animate={isActive ? { scale: [1, 1.15, 1.1] } : { scale: 1 }}
                              transition={{ duration: 0.4 }}
                            >
                              {isPast ? <i className="fas fa-check text-[8px]" style={{ color: accentColor }}></i> : step.number}
                            </motion.div>
                            <AnimatePresence mode="wait">
                              {isActive && (
                                <motion.span
                                  key={step.title}
                                  className="text-[8px] sm:text-[9px] font-extrabold mt-2 text-center block"
                                  style={{ color: accentColor, maxWidth: 70 }}
                                  initial={{ opacity: 0, y: 4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {step.title}
                                </motion.span>
                              )}
                              {!isActive && (
                                <motion.span
                                  key={step.title + '-idle'}
                                  className="text-[8px] font-bold mt-2 text-center block text-gray-400 truncate"
                                  style={{ maxWidth: 60 }}
                                >
                                  {step.title}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step description callout */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={showcaseStage}
                      className="rounded-xl px-4 py-3 mb-6 d-flex align-items-center gap-3"
                      style={{
                        background: `${
                          data.heroVisualType === 'web' ? '#1E7FD4' :
                          data.heroVisualType === 'design' ? '#A855F7' :
                          data.heroVisualType === 'content' ? '#2E9E6B' :
                          data.heroVisualType === 'marketing' ? '#FF8A3D' :
                          data.heroVisualType === 'video' ? '#ef4444' : '#08A9E6'
                        }0f`,
                        border: `1px solid ${
                          data.heroVisualType === 'web' ? '#1E7FD4' :
                          data.heroVisualType === 'design' ? '#A855F7' :
                          data.heroVisualType === 'content' ? '#2E9E6B' :
                          data.heroVisualType === 'marketing' ? '#FF8A3D' :
                          data.heroVisualType === 'video' ? '#ef4444' : '#08A9E6'
                        }20`
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs shrink-0 font-bold"
                        style={{
                          backgroundColor:
                            data.heroVisualType === 'web' ? '#1E7FD4' :
                            data.heroVisualType === 'design' ? '#A855F7' :
                            data.heroVisualType === 'content' ? '#2E9E6B' :
                            data.heroVisualType === 'marketing' ? '#FF8A3D' :
                            data.heroVisualType === 'video' ? '#ef4444' : '#08A9E6'
                        }}
                      >
                        {data.workflow[showcaseStage]?.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-extrabold text-[#0B1F3A] block">{data.workflow[showcaseStage]?.title}</span>
                        <span className="text-[10px] text-gray-500 block truncate">{data.workflow[showcaseStage]?.desc}</span>
                      </div>
                      <div className="d-flex gap-1">
                        {data.workflow.map((_, i) => (
                          <motion.div
                            key={i}
                            className="rounded-full cursor-pointer"
                            style={{
                              width: i === showcaseStage ? 16 : 5,
                              height: 5,
                              backgroundColor: i === showcaseStage ? (
                                data.heroVisualType === 'web' ? '#1E7FD4' :
                                data.heroVisualType === 'design' ? '#A855F7' :
                                data.heroVisualType === 'content' ? '#2E9E6B' :
                                data.heroVisualType === 'marketing' ? '#FF8A3D' :
                                data.heroVisualType === 'video' ? '#ef4444' : '#08A9E6'
                              ) : '#E5E7EB'
                            }}
                            onClick={() => setShowcaseStage(i)}
                            animate={{ width: i === showcaseStage ? 16 : 5 }}
                            transition={{ duration: 0.3 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Main preview panel + metrics */}
                  <div className="row g-4 align-items-stretch mb-6">

                    {/* Video / mockup preview */}
                    <div className="col-lg-8 col-md-7">
                      <div
                        className="rounded-2xl overflow-hidden h-100"
                        style={{
                          background: '#0A1628',
                          border: '1px solid rgba(255,255,255,0.06)',
                          minHeight: 260
                        }}
                      >
                        {/* Browser chrome bar */}
                        <div className="d-flex align-items-center justify-content-between px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}>
                          <div className="d-flex align-items-center gap-2">
                            <span className="rounded-circle" style={{ width: 9, height: 9, background: '#ef4444', opacity: 0.8, display: 'inline-block' }}></span>
                            <span className="rounded-circle" style={{ width: 9, height: 9, background: '#f59e0b', opacity: 0.8, display: 'inline-block' }}></span>
                            <span className="rounded-circle" style={{ width: 9, height: 9, background: '#22c55e', opacity: 0.8, display: 'inline-block' }}></span>
                            <span className="text-white/40 ms-2" style={{ fontSize: 9, fontFamily: 'monospace' }}>atriowings.in/{data.heroVisualType}</span>
                          </div>
                          <span className="d-flex align-items-center gap-1" style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            <span className="rounded-circle" style={{ width: 6, height: 6, backgroundColor: '#22c55e', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
                            LIVE PREVIEW
                          </span>
                        </div>

                        {/* Video preview area with AnimatePresence crossfade */}
                        <div className="position-relative overflow-hidden" style={{ height: 220 }}>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={`${data.heroVisualType}-${showcaseStage}`}
                              className="w-100 h-100 position-absolute inset-0"
                              initial={{ opacity: 0, scale: 1.04 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.97 }}
                              transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                              {renderShowcaseVisual(data.heroVisualType, showcaseStage)}
                            </motion.div>
                          </AnimatePresence>

                          {/* Gradient overlay at bottom */}
                          <div className="position-absolute bottom-0 start-0 w-100" style={{ height: 60, background: 'linear-gradient(to top, rgba(10,22,40,0.7), transparent)', zIndex: 5, pointerEvents: 'none' }} />

                          {/* Step badge overlay */}
                          <div className="position-absolute bottom-0 start-0 m-3" style={{ zIndex: 10 }}>
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={showcaseStage}
                                className="d-inline-flex align-items-center gap-2 rounded-pill px-3 py-1 text-white"
                                style={{
                                  background: 'rgba(0,0,0,0.55)',
                                  backdropFilter: 'blur(12px)',
                                  fontSize: 10,
                                  fontWeight: 700,
                                  border: '1px solid rgba(255,255,255,0.1)'
                                }}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <span
                                  className="rounded-circle"
                                  style={{
                                    width: 7, height: 7, display: 'inline-block',
                                    backgroundColor:
                                      data.heroVisualType === 'web' ? '#1E7FD4' :
                                      data.heroVisualType === 'design' ? '#A855F7' :
                                      data.heroVisualType === 'content' ? '#2E9E6B' :
                                      data.heroVisualType === 'marketing' ? '#FF8A3D' :
                                      data.heroVisualType === 'video' ? '#ef4444' : '#08A9E6'
                                  }}
                                ></span>
                                Step {data.workflow[showcaseStage]?.number} · {data.workflow[showcaseStage]?.title}
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Metrics panel */}
                    <div className="col-lg-4 col-md-5">
                      <div className="bg-white border border-gray-100 rounded-2xl p-4 h-100 d-flex flex-column justify-content-between" style={{ minHeight: 260 }}>
                        <div>
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-gray-400 block mb-3">Live Metrics</span>
                          {(() => {
                            const metricMap: Record<string, { label: string; value: string; col: string; icon: string }[]> = {
                              web: [
                                { label: "Performance", value: "98%", col: "#1E7FD4", icon: "fa-bolt" },
                                { label: "SEO Score", value: "95/100", col: "#08A9E6", icon: "fa-search" },
                                { label: "Security", value: "100%", col: "#2E9E6B", icon: "fa-shield-alt" }
                              ],
                              design: [
                                { label: "UX Score", value: "9.6/10", col: "#A855F7", icon: "fa-star" },
                                { label: "Accessibility", value: "AA+", col: "#08A9E6", icon: "fa-universal-access" },
                                { label: "Design Quality", value: "95%", col: "#2E9E6B", icon: "fa-paint-brush" }
                              ],
                              content: [
                                { label: "SEO Score", value: "92%", col: "#2E9E6B", icon: "fa-search" },
                                { label: "Readability", value: "Clear", col: "#FF8A3D", icon: "fa-book-open" },
                                { label: "Word Count", value: "1,250+", col: "#1E7FD4", icon: "fa-align-left" }
                              ],
                              marketing: [
                                { label: "ROI Target", value: "4.6x", col: "#FF8A3D", icon: "fa-chart-line" },
                                { label: "CTR Rate", value: "8.4%", col: "#1E7FD4", icon: "fa-mouse-pointer" },
                                { label: "Conversions", value: "Excellent", col: "#2E9E6B", icon: "fa-bullseye" }
                              ],
                              video: [
                                { label: "Output Quality", value: "4K UHD", col: "#ef4444", icon: "fa-film" },
                                { label: "Retention Rate", value: "92%", col: "#A855F7", icon: "fa-eye" },
                                { label: "Render Speed", value: "Fast", col: "#FF8A3D", icon: "fa-tachometer-alt" }
                              ],
                              consultation: [
                                { label: "Success Rate", value: "98%", col: "#08A9E6", icon: "fa-chart-pie" },
                                { label: "ROI Impact", value: "+35%", col: "#2E9E6B", icon: "fa-arrow-up" },
                                { label: "Action Plan", value: "Verified", col: "#1E7FD4", icon: "fa-check-circle" }
                              ]
                            };
                            const stats = metricMap[data.heroVisualType] || metricMap.web;
                            return (
                              <div className="d-flex flex-column gap-3">
                                {stats.map((stat, i) => (
                                  <motion.div
                                    key={stat.label}
                                    className="d-flex align-items-center gap-3 p-2.5 rounded-xl"
                                    style={{ background: stat.col + '08', border: `1px solid ${stat.col}18` }}
                                    initial={{ opacity: 0, x: 15 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12, duration: 0.4 }}
                                  >
                                    <div
                                      className="rounded-lg flex items-center justify-center text-white shrink-0"
                                      style={{ width: 30, height: 30, backgroundColor: stat.col, fontSize: 11 }}
                                    >
                                      <i className={`fas ${stat.icon}`}></i>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">{stat.label}</span>
                                      <span className="font-extrabold block leading-tight" style={{ fontSize: 14, color: stat.col }}>{stat.value}</span>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            );
                          })()}
                        </div>

                        {/* Mini autoplay controls */}
                        <div className="d-flex align-items-center justify-content-between mt-3 pt-2 border-top border-gray-100">
                          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Auto-play</span>
                          <div className="d-flex gap-1.5">
                            {data.workflow.map((_, i) => (
                              <div
                                key={i}
                                onClick={() => setShowcaseStage(i)}
                                className="rounded-full cursor-pointer"
                                style={{
                                  width: i === showcaseStage ? 18 : 6,
                                  height: 6,
                                  transition: 'all 0.3s',
                                  backgroundColor: i === showcaseStage ? (
                                    data.heroVisualType === 'web' ? '#1E7FD4' :
                                    data.heroVisualType === 'design' ? '#A855F7' :
                                    data.heroVisualType === 'content' ? '#2E9E6B' :
                                    data.heroVisualType === 'marketing' ? '#FF8A3D' :
                                    data.heroVisualType === 'video' ? '#ef4444' : '#08A9E6'
                                  ) : '#E5E7EB'
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trending Feature Chips row */}
                  <div className="border-top border-gray-100 pt-5 mb-5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block mb-3">Trending Features</span>
                    <div className="d-flex flex-wrap gap-2">
                      {(() => {
                        const featChips: Record<string, string[]> = {
                          web: ["⚡ Turbopack Build", "🔍 AI SEO Audit", "🛡 Zero-Trust Security", "📱 Mobile-First Layout", "🚀 Edge Deployment", "🌐 PWA Ready"],
                          design: ["🎨 Auto-Layout Figma", "🧠 AI-Generated Mockups", "♿ WCAG Accessibility", "✨ Micro-interactions", "🔄 Design System", "💡 UX Heatmaps"],
                          content: ["🤖 AI-Assisted Drafts", "📈 Topical Authority", "🔑 Keyword Clustering", "📝 Schema Markup", "🌍 Multi-Language", "📊 Content Analytics"],
                          marketing: ["📣 Omnichannel Ads", "🎯 Lookalike Audiences", "📊 Real-Time ROAS", "🤖 AI Bid Strategy", "💬 Retargeting Funnels", "🛒 Conversion Tracking"],
                          video: ["🎬 4K HDR Output", "🎵 Sound Design", "✨ Motion Graphics", "🎨 Color Grading", "📱 Vertical Shorts", "🔄 Revision Rounds"],
                          consultation: ["🗺 Growth Roadmap", "📊 KPI Dashboard", "🔍 Tech Stack Audit", "💼 Market Research", "🤝 Weekly Check-ins", "📋 Action Plans"]
                        };
                        const chips = featChips[data.heroVisualType] || featChips.web;
                        const accentColor =
                          data.heroVisualType === 'web' ? '#1E7FD4' :
                          data.heroVisualType === 'design' ? '#A855F7' :
                          data.heroVisualType === 'content' ? '#2E9E6B' :
                          data.heroVisualType === 'marketing' ? '#FF8A3D' :
                          data.heroVisualType === 'video' ? '#ef4444' : '#08A9E6';
                        return chips.map((chip, i) => (
                          <motion.span
                            key={chip}
                            className="inline-flex align-items-center rounded-pill px-3 py-1.5 text-[11px] font-bold cursor-default"
                            style={{
                              background: accentColor + '0c',
                              border: `1px solid ${accentColor}20`,
                              color: '#374151'
                            }}
                            initial={{ opacity: 0, scale: 0.85 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.07, duration: 0.35, type: "spring", stiffness: 200 }}
                            whileHover={{ scale: 1.05, borderColor: accentColor + '50' }}
                          >
                            {chip}
                          </motion.span>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* Technology stack badges */}
                  <div className="border-top border-gray-100 pt-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block mb-3">Technologies Used</span>
                    <div className="d-flex flex-wrap gap-2">
                      {data.tools.map((tech, i) => {
                        const accentColor =
                          data.heroVisualType === 'web' ? '#1E7FD4' :
                          data.heroVisualType === 'design' ? '#A855F7' :
                          data.heroVisualType === 'content' ? '#2E9E6B' :
                          data.heroVisualType === 'marketing' ? '#FF8A3D' :
                          data.heroVisualType === 'video' ? '#ef4444' : '#08A9E6';
                        return (
                          <motion.span
                            key={tech}
                            className="inline-block rounded-lg text-[10px] font-bold px-3 py-1.5"
                            style={{
                              background: '#F7FAFD',
                              border: '1px solid #E5E7EB',
                              color: '#0B1F3A'
                            }}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06, duration: 0.3 }}
                            whileHover={{ borderColor: accentColor + '50', color: accentColor }}
                          >
                            {tech}
                          </motion.span>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES & BENEFITS — ROLE ACCENT THEME & INTERACTIVE ANIMATIONS */}
      <section ref={featuresRef} className="py-24 bg-white overflow-hidden relative">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none -z-0"
          style={{ background: `linear-gradient(90deg, ${accentCol}0c, transparent, ${accentCol}04)` }}
        />
        
        <div className="container px-4 relative z-10">
          <div className="section-title text-center max-w-[650px] mx-auto mb-16">
            <motion.h5
              className="fw-bold uppercase tracking-wider text-sm mb-2.5 block"
              style={{ color: accentCol }}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Features &amp; Benefits
            </motion.h5>
            <h2 className="display-6 fw-extrabold mb-0 glow-pulse-showcase" style={{ fontFamily: 'var(--font-rubik)' }}>
              Engineered for Maximum Impact
            </h2>

            {/* Animated Underline with glowing dot */}
            <div className="position-relative mx-auto mt-4 mb-4" style={{ width: '150px', height: '6px' }}>
              <motion.div 
                className="position-absolute top-0 start-50 translate-middle-x" 
                style={{ height: '5px', borderRadius: '3px', width: '100%', originX: 0.5, backgroundColor: accentCol }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.div 
                className="position-absolute top-0 bg-white" 
                style={{ width: '8px', height: '5px', borderRadius: '2px', left: 0 }}
                animate={{ 
                  left: ['0%', '94%', '0%'],
                  opacity: [1, 0.4, 1],
                  boxShadow: [
                    `0 0 4px #fff, 0 0 10px ${accentCol}`,
                    `0 0 1px #fff, 0 0 2px ${accentCol}`,
                    `0 0 4px #fff, 0 0 10px ${accentCol}`
                  ]
                }}
                transition={{
                  left: { duration: 4, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 4, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 4, repeat: Infinity, ease: "linear" }
                }}
              />
            </div>

            <p className="text-muted mt-2">Every feature of our work is meticulously structured to optimize user retention, security compliance and visual depth.</p>
          </div>

          <motion.div
            className="row g-4 justify-content-center"
            variants={staggerContainer}
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
          >
            {data.features.map((feature, i) => (
              <motion.div
                key={i}
                className="col-lg-4 col-md-6"
                variants={fadeUp}
              >
                <motion.div
                  className="group h-full rounded-2xl p-5 flex flex-col justify-between cursor-pointer select-none transition-all duration-300"
                  style={{
                    background: 'rgba(247, 245, 240, 0.55)',
                    border: '1.5px solid rgba(30, 127, 212, 0.15)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.025,
                    background: 'rgba(255, 255, 255, 1)',
                    borderColor: 'rgba(30, 127, 212, 0.5)',
                    boxShadow: '0 20px 40px -15px rgba(30, 127, 212, 0.22), 0 4px 12px rgba(0,0,0,0.04)'
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <div>
                    {/* Glowing Icon Wrapper */}
                    <motion.div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 transition-all duration-300"
                      style={{
                        backgroundColor: 'rgba(30, 127, 212, 0.1)',
                        color: '#1E7FD4'
                      }}
                      whileHover={{
                        scale: 1.12,
                        rotate: 8,
                        backgroundColor: '#1E7FD4',
                        color: '#FFFFFF',
                        boxShadow: '0 8px 20px -4px rgba(30, 127, 212, 0.6)'
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <i className={`fas ${feature.icon}`}></i>
                    </motion.div>

                    {/* Card Title */}
                    <h4
                      className="text-base fw-extrabold text-[#0B1F3A] mb-2 transition-colors duration-300 group-hover:text-[var(--hover-title-color)]"
                      style={{
                        '--hover-title-color': '#1E7FD4'
                      } as React.CSSProperties}
                    >
                      {feature.title}
                    </h4>

                    {/* Card Description */}
                    <p className="text-muted text-xs leading-relaxed mb-0">{feature.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. INTERACTIVE WORKFLOW */}
      <section ref={workflowRef} className="py-20 bg-[#0B1F3A] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_120%_-20%,rgba(30,127,212,0.14),rgba(255,255,255,0))]"></div>
        <div className="container px-4 relative z-10">
          <div className="section-title text-center max-w-[650px] mx-auto mb-16">
            <motion.h5 
              className="fw-bold uppercase tracking-wider text-sm mb-2.5 block"
              style={{ color: accentCol }}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Execution Roadmap
            </motion.h5>
            <h2 className="display-6 fw-bold mb-0 glow-pulse-showcase-white" style={{ fontFamily: 'var(--font-rubik)' }}>
              Proven Process Timeline
            </h2>

            {/* Animated Underline with glowing dot (white) */}
            <div className="position-relative mx-auto mt-4 mb-4" style={{ width: '150px', height: '6px' }}>
              <motion.div 
                className="position-absolute top-0 start-50 translate-middle-x" 
                style={{ height: '5px', borderRadius: '3px', width: '100%', originX: 0.5, backgroundColor: accentCol }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.div 
                className="position-absolute top-0 bg-white" 
                style={{ width: '8px', height: '5px', borderRadius: '2px', left: 0 }}
                animate={{ 
                  left: ['0%', '94%', '0%'],
                  opacity: [1, 0.4, 1],
                  boxShadow: [
                    `0 0 4px #fff, 0 0 10px ${accentCol}`,
                    `0 0 1px #fff, 0 0 2px ${accentCol}`,
                    `0 0 4px #fff, 0 0 10px ${accentCol}`
                  ]
                }}
                transition={{
                  left: { duration: 4, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 4, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 4, repeat: Infinity, ease: "linear" }
                }}
              />
            </div>

            <p className="text-white/60 mt-2">A structured journey from first requirements audit to post-launch optimization support.</p>
          </div>

          {/* Desktop Workflow Line */}
          <div className="hidden lg:block relative py-10 mb-10 overflow-hidden">
            <svg className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2" viewBox="0 0 1000 10" fill="none" preserveAspectRatio="none">
              <motion.path
                d="M 0,5 L 1000,5"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />
              {isWorkflowInView && (
                <motion.path
                  d="M 0,5 L 1000,5"
                  stroke={accentCol}
                  strokeWidth="3.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />
              )}
            </svg>

            {isWorkflowInView && (
              <motion.div
                className="absolute top-1/2 left-0 w-4 h-4 rounded-full bg-[#2E9E6B] shadow-[0_0_12px_rgba(46,158,107,0.8)] -translate-y-1/2 -translate-x-1/2 z-20"
                animate={{ left: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              />
            )}

            <div className="row relative z-10 justify-between">
              {data.workflow.map((step, i) => (
                <div key={i} className="col flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 bg-[#0B1F3A] flex items-center justify-center font-bold text-white text-base mb-4"
                    style={{ borderColor: accentCol, boxShadow: `0 0 15px ${accentCol}33` }}
                  >
                    {step.number}
                  </div>
                  <h5 className="text-xs fw-bold mb-1 text-center">{step.title}</h5>
                  <p className="text-white/50 text-[10px] text-center max-w-[130px] line-clamp-2">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Workflow Steps */}
          <div className="lg:hidden space-y-8 relative">
            <div className="absolute left-[17px] top-4 bottom-4 w-0.5 bg-white/10 z-0"></div>
            {data.workflow.map((step, i) => (
              <div key={i} className="flex gap-4 relative z-10">
                <div className="w-9 h-9 rounded-full border-2 border-[#0B1F3A] flex items-center justify-center font-bold text-white text-xs shrink-0"
                  style={{ backgroundColor: accentCol }}
                >
                  {step.number}
                </div>
                <div>
                  <h5 className="text-xs font-bold mb-1">{step.title}</h5>
                  <p className="text-white/60 text-[10px] leading-relaxed mb-0">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TECHNOLOGY / TOOLS */}
      <section ref={toolsRef} className="py-20 bg-white overflow-hidden">
        <div className="container px-4">
          <div className="section-title text-center max-w-[650px] mx-auto mb-16">
            <motion.h5 
              className="fw-bold uppercase tracking-wider text-sm mb-2.5 block"
              style={{ color: accentCol }}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Technology &amp; Stack
            </motion.h5>
            <h2 className="display-6 fw-bold mb-0 glow-pulse-showcase" style={{ fontFamily: 'var(--font-rubik)' }}>
              Industry Standard Toolkits
            </h2>

            {/* Animated Underline with glowing dot */}
            <div className="position-relative mx-auto mt-4 mb-4" style={{ width: '150px', height: '6px' }}>
              <motion.div 
                className="position-absolute top-0 start-50 translate-middle-x" 
                style={{ height: '5px', borderRadius: '3px', width: '100%', originX: 0.5, backgroundColor: accentCol }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.div 
                className="position-absolute top-0 bg-white" 
                style={{ width: '8px', height: '5px', borderRadius: '2px', left: 0 }}
                animate={{ 
                  left: ['0%', '94%', '0%'],
                  opacity: [1, 0.4, 1],
                  boxShadow: [
                    `0 0 4px #fff, 0 0 10px ${accentCol}`,
                    `0 0 1px #fff, 0 0 2px ${accentCol}`,
                    `0 0 4px #fff, 0 0 10px ${accentCol}`
                  ]
                }}
                transition={{
                  left: { duration: 4, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 4, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 4, repeat: Infinity, ease: "linear" }
                }}
              />
            </div>

            <p className="text-muted mt-2">We build and compile applications strictly adhering to reliable modern framework standards.</p>
          </div>

          <motion.div
            className="flex flex-wrap justify-center gap-3 md:gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate={isToolsInView ? "visible" : "hidden"}
          >
            {data.tools.map((tool, i) => (
              <motion.div
                key={i}
                className="bg-[#F7F5F0] border border-[#1E7FD4]/10 rounded-xl px-4 py-2.5 text-[#0B1F3A] font-bold text-sm shadow-sm flex items-center gap-2 cursor-default hover:border-[#1E7FD4]/40 hover:-translate-y-0.5 transition-all"
                variants={fadeUp}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#08A9E6]"></span>
                {tool}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. WHY CHOOSE ATRIOWINGS */}
      <section ref={whyChooseRef} className="py-20 bg-[#F7F5F0] overflow-hidden">
        <div className="container px-4">
          <div className="section-title text-center max-w-[650px] mx-auto mb-16">
            <motion.h5 
              className="fw-bold uppercase tracking-wider text-sm mb-2.5 block"
              style={{ color: accentCol }}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Advantage
            </motion.h5>
            <h2 className="display-6 fw-bold mb-0 glow-pulse-showcase" style={{ fontFamily: 'var(--font-rubik)' }}>
              Why AtrioWings?
            </h2>

            {/* Animated Underline with glowing dot */}
            <div className="position-relative mx-auto mt-4 mb-4" style={{ width: '150px', height: '6px' }}>
              <motion.div 
                className="position-absolute top-0 start-50 translate-middle-x" 
                style={{ height: '5px', borderRadius: '3px', width: '100%', originX: 0.5, backgroundColor: accentCol }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.div 
                className="position-absolute top-0 bg-white" 
                style={{ width: '8px', height: '5px', borderRadius: '2px', left: 0 }}
                animate={{ 
                  left: ['0%', '94%', '0%'],
                  opacity: [1, 0.4, 1],
                  boxShadow: [
                    `0 0 4px #fff, 0 0 10px ${accentCol}`,
                    `0 0 1px #fff, 0 0 2px ${accentCol}`,
                    `0 0 4px #fff, 0 0 10px ${accentCol}`
                  ]
                }}
                transition={{
                  left: { duration: 4, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 4, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 4, repeat: Infinity, ease: "linear" }
                }}
              />
            </div>

            <p className="text-muted mt-2">What sets Atriowings apart is our dedication to execution metrics, custom development, and reliable client communication pipelines.</p>
          </div>

          <div className="row g-4">
            {data.whyChooseUs.map((item, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="bg-[#F7F5F0]/60 border border-[#1E7FD4]/10 rounded-2xl p-5 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#2E9E6B]/10 flex items-center justify-center text-[#2E9E6B] text-base mb-4">
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <h4 className="text-sm fw-bold text-[#0B1F3A] mb-2">{item.title}</h4>
                    <p className="text-muted text-xs leading-relaxed mb-0">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. RESULTS / OUTCOMES */}
      <section ref={outcomesRef} className="py-20 bg-white overflow-hidden">
        <div className="container px-4">
          <div className="section-title text-center max-w-[650px] mx-auto mb-16">
            <motion.h5 
              className="fw-bold uppercase tracking-wider text-sm mb-2.5 block"
              style={{ color: accentCol }}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Outcomes
            </motion.h5>
            <h2 className="display-6 fw-bold mb-0 glow-pulse-showcase" style={{ fontFamily: 'var(--font-rubik)' }}>
              Designed For Results
            </h2>

            {/* Animated Underline with glowing dot */}
            <div className="position-relative mx-auto mt-4 mb-4" style={{ width: '150px', height: '6px' }}>
              <motion.div 
                className="position-absolute top-0 start-50 translate-middle-x" 
                style={{ height: '5px', borderRadius: '3px', width: '100%', originX: 0.5, backgroundColor: accentCol }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.div 
                className="position-absolute top-0 bg-white" 
                style={{ width: '8px', height: '5px', borderRadius: '2px', left: 0 }}
                animate={{ 
                  left: ['0%', '94%', '0%'],
                  opacity: [1, 0.4, 1],
                  boxShadow: [
                    `0 0 4px #fff, 0 0 10px ${accentCol}`,
                    `0 0 1px #fff, 0 0 2px ${accentCol}`,
                    `0 0 4px #fff, 0 0 10px ${accentCol}`
                  ]
                }}
                transition={{
                  left: { duration: 4, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 4, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 4, repeat: Infinity, ease: "linear" }
                }}
              />
            </div>

            <p className="text-muted mt-2">We construct architectures intended to scale organic search positions, loading speeds and business queries.</p>
          </div>

          <motion.div
            className="row g-4"
            variants={staggerContainer}
            initial="hidden"
            animate={isOutcomesInView ? "visible" : "hidden"}
          >
            {data.outcomes.map((outcome, i) => (
              <motion.div key={i} className="col-lg-4 col-md-6" variants={fadeUp}>
                <div className="bg-[#F7F5F0] border border-[#1E7FD4]/10 rounded-2xl p-6 h-full flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="w-11 h-11 bg-[#1E7FD4]/10 rounded-xl flex items-center justify-center text-[#1E7FD4] text-lg mb-4">
                      <i className={`fas ${outcome.icon}`}></i>
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest block mb-1 font-bold">{outcome.metric}</span>
                    <h4 className="text-base fw-bold text-[#0B1F3A] mb-2">{outcome.title}</h4>
                    <p className="text-muted text-xs leading-relaxed mb-0">{outcome.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. PORTFOLIO / PROJECT SHOWCASE */}
      {data.portfolio && data.portfolio.length > 0 && (
        <section ref={portfolioRef} className="py-20 bg-[#F7F5F0] overflow-hidden">
          <div className="container px-4">
            <div className="section-title text-center max-w-[650px] mx-auto mb-16">
              <motion.h5 
                className="fw-bold uppercase tracking-wider text-sm mb-2.5 block"
                style={{ color: accentCol }}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Our Portfolio
              </motion.h5>
              <h2 className="display-6 fw-bold mb-0 glow-pulse-showcase" style={{ fontFamily: 'var(--font-rubik)' }}>
                Recent Collaborations
              </h2>

              {/* Animated Underline with glowing dot */}
              <div className="position-relative mx-auto mt-4 mb-4" style={{ width: '150px', height: '6px' }}>
                <motion.div 
                  className="position-absolute top-0 start-50 translate-middle-x" 
                  style={{ height: '5px', borderRadius: '3px', width: '100%', originX: 0.5, backgroundColor: accentCol }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <motion.div 
                  className="position-absolute top-0 bg-white" 
                  style={{ width: '8px', height: '5px', borderRadius: '2px', left: 0 }}
                  animate={{ 
                    left: ['0%', '94%', '0%'],
                    opacity: [1, 0.4, 1],
                    boxShadow: [
                      `0 0 4px #fff, 0 0 10px ${accentCol}`,
                      `0 0 1px #fff, 0 0 2px ${accentCol}`,
                      `0 0 4px #fff, 0 0 10px ${accentCol}`
                    ]
                  }}
                  transition={{
                    left: { duration: 4, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 4, repeat: Infinity, ease: "linear" },
                    boxShadow: { duration: 4, repeat: Infinity, ease: "linear" }
                  }}
                />
              </div>

              <p className="text-muted mt-2">Explore live examples of digital platforms, travel portals and corporate layouts successfully launched by our engineering team.</p>
            </div>

            <div className="row g-4">
              {data.portfolio.map((project, i) => (
                <div key={i} className="col-lg-6 col-md-6">
                  <motion.div
                    className="bg-white border border-[#1E7FD4]/10 rounded-3xl p-5 h-full flex flex-col justify-between shadow-sm hover:shadow-lg transition-all"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isPortfolioInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                  >
                    <div>
                      <div className="relative h-[250px] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                        <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                        <div className="absolute top-4 left-4 bg-[#0B1F3A]/80 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {project.category}
                        </div>
                      </div>
                      <h4 className="text-lg fw-bold text-[#0B1F3A] mb-2">{project.title}</h4>
                      <p className="text-muted text-xs leading-relaxed mb-4">{project.desc}</p>
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm rounded-pill font-bold align-self-start border-[#1E7FD4] text-[#1E7FD4] hover:bg-[#1E7FD4] hover:text-white px-4 py-2 text-xs flex items-center gap-2"
                    >
                      Visit Website <i className="fas fa-external-link-alt text-[9px]"></i>
                    </a>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. FAQ SECTION */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="py-20 bg-white overflow-hidden">
          <div className="container px-4">
            <div className="section-title text-center max-w-[650px] mx-auto mb-16">
              <motion.h5 
                className="fw-bold uppercase tracking-wider text-sm mb-2.5 block"
                style={{ color: accentCol }}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                FAQ
              </motion.h5>
              <h2 className="display-6 fw-bold mb-0 glow-pulse-showcase" style={{ fontFamily: 'var(--font-rubik)' }}>
                Frequently Asked Questions
              </h2>

              {/* Animated Underline with glowing dot */}
              <div className="position-relative mx-auto mt-4 mb-4" style={{ width: '150px', height: '6px' }}>
                <motion.div 
                  className="position-absolute top-0 start-50 translate-middle-x" 
                  style={{ height: '5px', borderRadius: '3px', width: '100%', originX: 0.5, backgroundColor: accentCol }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <motion.div 
                  className="position-absolute top-0 bg-white" 
                  style={{ width: '8px', height: '5px', borderRadius: '2px', left: 0 }}
                  animate={{ 
                    left: ['0%', '94%', '0%'],
                    opacity: [1, 0.4, 1],
                    boxShadow: [
                      `0 0 4px #fff, 0 0 10px ${accentCol}`,
                      `0 0 1px #fff, 0 0 2px ${accentCol}`,
                      `0 0 4px #fff, 0 0 10px ${accentCol}`
                    ]
                  }}
                  transition={{
                    left: { duration: 4, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 4, repeat: Infinity, ease: "linear" },
                    boxShadow: { duration: 4, repeat: Infinity, ease: "linear" }
                  }}
                />
              </div>

              <p className="text-muted mt-2">Get answers to standard questions regarding our execution milestones, post-launch updates and integrations.</p>
            </div>

            <div className="max-w-[750px] mx-auto space-y-3">
              {data.faqs.map((faq, i) => {
                const isOpen = activeFaq === i;
                return (
                  <div key={i} className="bg-white border border-[#1E7FD4]/10 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
                    <button
                      className="w-full px-5 py-4 text-left flex items-center justify-between font-bold text-sm text-[#0B1F3A] hover:bg-gray-50/50"
                      onClick={() => setActiveFaq(isOpen ? null : i)}
                    >
                      <span>{faq.q}</span>
                      <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs text-muted-foreground ml-4`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-5 pb-5 text-xs text-muted-foreground leading-relaxed border-t border-gray-100 pt-3">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 11. FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0B1F3A] to-[#1E7FD4] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_120%,rgba(8,169,230,0.18),rgba(255,255,255,0))]"></div>
        <div className="container relative z-10 px-4 text-center">
          <motion.span 
            className="text-xs font-bold uppercase tracking-widest block mb-3"
            style={{ color: accentCol }}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get Started Today
          </motion.span>
          <h2 className="display-5 fw-extrabold mb-0 glow-pulse-showcase-white" style={{ fontFamily: 'var(--font-rubik)' }}>
            Ready to Scale Your Platform?
          </h2>

          {/* Animated Underline with glowing dot (white CTA version) */}
          <div className="position-relative mx-auto mt-4 mb-5" style={{ width: '150px', height: '6px' }}>
            <motion.div 
              className="position-absolute top-0 start-50 translate-middle-x" 
              style={{ height: '5px', borderRadius: '3px', width: '100%', originX: 0.5, backgroundColor: accentCol }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.div 
              className="position-absolute top-0 bg-white" 
              style={{ width: '8px', height: '5px', borderRadius: '2px', left: 0 }}
              animate={{ 
                left: ['0%', '94%', '0%'],
                opacity: [1, 0.4, 1],
                boxShadow: [
                  `0 0 4px #fff, 0 0 10px ${accentCol}`,
                  `0 0 1px #fff, 0 0 2px ${accentCol}`,
                  `0 0 4px #fff, 0 0 10px ${accentCol}`
                ]
              }}
              transition={{
                left: { duration: 4, repeat: Infinity, ease: "linear" },
                opacity: { duration: 4, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 4, repeat: Infinity, ease: "linear" }
              }}
            />
          </div>

          <p className="text-white/70 max-w-[500px] mx-auto text-sm leading-relaxed mb-8">Contact our strategy team to receive an operational audit, custom wireframes, and project timeline quotes.</p>
          <div className="flex flex-wrap gap-3.5 justify-center">
            <Link
              href="/contact"
              className="btn btn-light btn-lg rounded-pill px-5 py-3 font-bold transition-all hover:scale-102 hover:shadow-lg text-[#1E7FD4]"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/portfolio"
              className="btn btn-outline-light btn-lg rounded-pill px-5 py-3 font-bold transition-all hover:scale-102 border-white/20 hover:bg-white/5 text-white"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
