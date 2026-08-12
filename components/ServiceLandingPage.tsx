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
    switch (type) {
      case 'web':
        return (
          <div className="row g-3 h-full">
            {/* Left side: Code panel */}
            <div className="col-6 h-full flex flex-col">
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
            {/* Right side: Browser preview */}
            <div className="col-6 h-full flex flex-col">
              <div className="bg-white border border-gray-200/80 rounded-xl p-3 flex-1 flex flex-col justify-between overflow-hidden relative shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                  <span className="text-[8px] font-bold text-muted-foreground uppercase font-mono select-none">Web Browser Live</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                </div>

                <div className="flex-1 flex flex-col justify-center space-y-2.5">
                  {stage === 0 && (
                    <div className="space-y-2 p-2 border border-dashed border-gray-300 rounded-lg">
                      <div className="w-10 h-2 bg-gray-200 rounded"></div>
                      <div className="w-full h-3 bg-gray-200 rounded"></div>
                    </div>
                  )}
                  {stage === 1 && (
                    <div className="space-y-2 p-2 border border-gray-250 rounded-lg">
                      <div className="flex justify-between">
                        <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="w-full h-4 bg-gray-150 rounded animate-pulse"></div>
                    </div>
                  )}
                  {stage === 2 && (
                    <div className="space-y-2 p-2 border border-blue-200 rounded-lg">
                      <div className="w-16 h-3.5 bg-[#1E7FD4]/20 border border-[#1E7FD4]/40 rounded"></div>
                      <div className="w-full h-5 bg-[#0B1F3A] rounded flex items-center justify-center text-[7px] text-white">Themed Template</div>
                    </div>
                  )}
                  {stage === 3 && (
                    <div className="space-y-2 p-2 border border-blue-300 bg-blue-50/10 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="w-12 h-3 bg-[#1E7FD4] rounded"></div>
                        <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-ping"></div>
                      </div>
                      <p className="text-[7px] text-[#0B1F3A] font-semibold">Running interactive script components</p>
                    </div>
                  )}
                  {stage === 4 && (
                    <div className="p-2 border border-[#2E9E6B]/30 bg-green-50/10 rounded-lg text-center space-y-1.5">
                      <p className="text-[7px] text-[#2E9E6B] font-bold">Speed score: 99/100</p>
                      <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                        <div className="bg-[#2E9E6B] h-full w-[99%]"></div>
                      </div>
                    </div>
                  )}
                  {stage === 5 && (
                    <div className="p-2 border border-[#1E7FD4]/20 bg-blue-50/20 rounded-lg text-center space-y-2">
                      <p className="text-[8px] text-[#0B1F3A] font-extrabold block">AtrioWings Platform Live</p>
                      <button className="btn btn-primary btn-sm rounded-pill py-1 px-3 text-[7px] border-0 bg-[#1E7FD4] shadow-sm select-none">Visit Platform</button>
                    </div>
                  )}
                </div>

                <div className="flex gap-1.5 justify-end text-[7px] text-muted-foreground font-bold">
                  <span>● Responsive</span>
                  <span>● SEO Core</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'design':
        return (
          <div className="bg-white border border-gray-200/80 rounded-xl p-3 h-full flex flex-col justify-between overflow-hidden shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2 font-mono text-[8px] text-muted-foreground">
              <span>Layers / Figma Canvas</span>
              <span>UX Score: 9.6/10</span>
            </div>
            <div className="flex-1 row g-2">
              <div className="col-4 border-r border-gray-150 pr-2">
                <span className="text-[8px] uppercase tracking-wider text-muted-foreground block mb-2 font-bold">LAYERS</span>
                <div className="space-y-1 text-[8px] text-muted-foreground">
                  <div className={`flex items-center gap-1.5 p-1 rounded ${stage >= 0 ? 'text-[#A855F7] font-bold bg-purple-50/50' : ''}`}>
                    <i className="fas fa-file-alt"></i> Header
                  </div>
                  <div className={`flex items-center gap-1.5 p-1 rounded ${stage >= 1 ? 'text-[#A855F7] font-bold bg-purple-50/50' : ''}`}>
                    <i className="fas fa-vector-square"></i> Hero Section
                  </div>
                  <div className={`flex items-center gap-1.5 p-1 rounded ${stage >= 3 ? 'text-[#A855F7] font-bold bg-purple-50/50' : ''}`}>
                    <i className="fas fa-th-large"></i> Feature Cards
                  </div>
                  <div className={`flex items-center gap-1.5 p-1 rounded ${stage >= 5 ? 'text-[#A855F7] font-bold bg-purple-50/50' : ''}`}>
                    <i className="fas fa-server"></i> Footer
                  </div>
                </div>
              </div>
              <div className="col-8 flex flex-col justify-center align-items-center p-2">
                <AnimatePresence mode="wait">
                  {stage === 0 && (
                    <motion.div key="ds0" className="text-center space-y-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-[9px] text-[#0B1F3A] font-bold">01 User Research Insights</p>
                      <span className="bg-purple-100 text-[#A855F7] text-[7px] font-bold px-2 py-0.5 rounded-full">Audience Persona</span>
                    </motion.div>
                  )}
                  {stage === 1 && (
                    <motion.div key="ds1" className="text-center space-y-1.5 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-[9px] text-[#0B1F3A] font-bold">02 User Flow Node Map</p>
                      <div className="flex justify-around items-center gap-1 mt-1">
                        <span className="border border-purple-300 text-[6px] p-1 rounded bg-purple-50">Landing</span>
                        <i className="fas fa-arrow-right text-[8px] text-[#A855F7] animate-pulse"></i>
                        <span className="border border-purple-300 text-[6px] p-1 rounded bg-purple-50">CTA Sign</span>
                      </div>
                    </motion.div>
                  )}
                  {stage === 2 && (
                    <motion.div key="ds2" className="text-center space-y-2 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-[9px] text-[#0B1F3A] font-bold">03 Grayscale Wireframe</p>
                      <div className="border border-dashed border-gray-300 rounded p-2 space-y-1 max-w-[120px] mx-auto bg-gray-50">
                        <div className="w-12 h-2 bg-gray-200 rounded"></div>
                        <div className="w-full h-3.5 bg-gray-200 rounded"></div>
                      </div>
                    </motion.div>
                  )}
                  {stage === 3 && (
                    <motion.div key="ds3" className="text-center space-y-1.5 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-[9px] text-[#0B1F3A] font-bold">04 High-Fidelity UI Design</p>
                      <div className="border border-[#A855F7]/30 bg-purple-50/10 rounded p-2 max-w-[120px] mx-auto shadow-sm">
                        <div className="w-12 h-2 bg-[#A855F7] rounded"></div>
                        <div className="w-full h-4 bg-[#0B1F3A] rounded flex items-center justify-center text-[5px] text-white">Themed UI</div>
                      </div>
                    </motion.div>
                  )}
                  {stage === 4 && (
                    <motion.div key="ds4" className="text-center space-y-1.5 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-[9px] text-[#0B1F3A] font-bold">05 Interactive Prototype</p>
                      <span className="bg-purple-100 text-[#A855F7] text-[7px] font-extrabold px-3 py-1 rounded-full animate-bounce inline-block">
                        Smart Animate Active
                      </span>
                    </motion.div>
                  )}
                  {stage === 5 && (
                    <motion.div key="ds5" className="text-center space-y-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-[9px] text-[#2E9E6B] font-bold">06 Developer Asset Handoff</p>
                      <span className="border border-green-300 text-green-700 bg-green-50 text-[7px] font-bold px-2 py-1 rounded block">
                        Specs Exported Successfully
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="bg-white border border-gray-200/80 rounded-xl p-3 h-full flex flex-col justify-between overflow-hidden shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2 font-mono text-[8px] text-muted-foreground">
              <span>Text Editor View</span>
              <span>SEO Score: {stage >= 4 ? "92%" : "70%"}</span>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div className="bg-gray-50 border border-gray-200/60 rounded p-2.5 flex-1 overflow-hidden font-mono text-[8px] leading-relaxed">
                <AnimatePresence mode="wait">
                  {stage === 0 && (
                    <motion.div key="c0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h6 className="font-bold text-[9px] text-gray-500 mb-1">CLIENT BRIEF OUTLINE</h6>
                      <p>● Target: Tech Startups</p>
                      <p>● Tone: Professional, authoritative</p>
                    </motion.div>
                  )}
                  {stage === 1 && (
                    <motion.div key="c1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h6 className="font-bold text-[9px] text-gray-500 mb-1">KEYWORD AUDIT RESEARCH</h6>
                      <p className="text-green-600">✔ SEO Optimization (High intent)</p>
                      <p className="text-green-600">✔ Lead Generation Funnels</p>
                    </motion.div>
                  )}
                  {stage === 2 && (
                    <motion.div key="c2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h6 className="font-bold text-[9px] text-gray-500 mb-1">ARTICLE OUTLINE HIERARCHY</h6>
                      <p>H1: The Ultimate Guide to Marketing</p>
                      <p className="pl-3">H2: 1. Setup Analytics Tracking</p>
                    </motion.div>
                  )}
                  {stage === 3 && (
                    <motion.div key="c3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h6 className="font-bold text-[9px] text-gray-500 mb-1">ARTICLE DRAFT WRITING</h6>
                      <p className="text-gray-700 font-sans">Digital marketing continues to evolve rapidly. Businesses that adapt early gain a competitive advantage in organic search visibility...</p>
                    </motion.div>
                  )}
                  {stage === 4 && (
                    <motion.div key="c4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h6 className="font-bold text-[9px] text-gray-500 mb-1">SEO BINDINGS APPLIED</h6>
                      <p className="text-green-700 bg-green-50 px-1 rounded inline-block">✔ Keyword density checklist verified</p>
                      <p className="text-green-700 bg-green-50 px-1 rounded inline-block mt-1">✔ Meta tags injected</p>
                    </motion.div>
                  )}
                  {stage === 5 && (
                    <motion.div key="c5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h6 className="font-bold text-[9px] text-[#2E9E6B] mb-1">PUBLICATION CONFIRMED</h6>
                      <p className="text-white bg-[#2E9E6B] px-2 py-0.5 rounded text-center">Live on WordPress CMS</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex gap-2.5 mt-2.5 justify-around text-[7px] text-muted-foreground font-bold border-t border-gray-100 pt-2">
                <span>Words: 1,245</span>
                <span>Originality: 100%</span>
                <span>Plagiarism Free: Yes</span>
              </div>
            </div>
          </div>
        );

      case 'marketing':
        return (
          <div className="bg-white border border-gray-200/80 rounded-xl p-3 h-full flex flex-col justify-between overflow-hidden shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2 font-mono text-[8px] text-muted-foreground">
              <span>Campaign dashboard</span>
              <span>ROAS Target: 5.8x</span>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div className="row g-2 text-center">
                <div className="col-6 bg-[#F8FAFC] border border-gray-150 rounded p-1.5">
                  <span className="text-[7px] text-muted-foreground uppercase block">Clicks</span>
                  <span className="text-xs font-bold text-[#FF8A3D]">{stage >= 3 ? "45.7K" : "20.1K"}</span>
                </div>
                <div className="col-6 bg-[#F8FAFC] border border-gray-150 rounded p-1.5">
                  <span className="text-[7px] text-muted-foreground uppercase block">Conversions</span>
                  <span className="text-xs font-bold text-[#2E9E6B]">{stage >= 4 ? "3.2K" : "1.1K"}</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center p-2">
                <AnimatePresence mode="wait">
                  {stage === 0 && (
                    <motion.div key="m0" className="text-center text-[8px] text-gray-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="font-bold">01 Auditing competitor spend data</p>
                    </motion.div>
                  )}
                  {stage === 1 && (
                    <motion.div key="m1" className="text-center text-[8px] text-gray-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="font-bold">02 Mapping marketing strategy channels</p>
                    </motion.div>
                  )}
                  {stage === 2 && (
                    <motion.div key="m2" className="text-center text-[8px] text-gray-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="font-bold">03 Setting up pixel trackers &amp; Ads Manager</p>
                    </motion.div>
                  )}
                  {stage === 3 && (
                    <motion.div key="m3" className="text-center text-[8px] text-gray-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <span className="bg-[#FF8A3D] text-white px-2 py-0.5 rounded font-extrabold animate-pulse">
                        Campaigns Executing Live
                      </span>
                    </motion.div>
                  )}
                  {stage === 4 && (
                    <motion.div key="m4" className="text-center w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <span className="text-[8px] text-green-600 font-extrabold block">Conversions growth chart drawing</span>
                      <svg className="w-full h-8 mt-1" viewBox="0 0 100 20">
                        <motion.path
                          d="M0,20 Q20,15 40,12 T80,5 T100,2"
                          fill="none"
                          stroke="#2E9E6B"
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5 }}
                        />
                      </svg>
                    </motion.div>
                  )}
                  {stage === 5 && (
                    <motion.div key="m5" className="text-center text-[8px] text-green-700 bg-green-50 border border-green-300 p-1.5 rounded" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="font-bold">06 Funnel optimization: ROAS scaled to 5.8x</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="bg-white border border-gray-200/80 rounded-xl p-3 h-full flex flex-col justify-between overflow-hidden shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2 font-mono text-[8px] text-muted-foreground">
              <span>Video player frame &amp; track timelines</span>
              <span>Views: {stage >= 5 ? "2.4M" : "40K"}</span>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              {/* Media viewer mockup */}
              <div className="bg-black/90 rounded-lg h-[95px] flex items-center justify-center relative overflow-hidden text-center text-white">
                <AnimatePresence mode="wait">
                  {stage === 0 && (
                    <motion.div key="v0" className="text-[8px] p-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-white/50">// Storyboard Concept</p>
                      <div className="w-10 h-6 border border-dashed border-white/20 mx-auto mt-1 flex items-center justify-center">Sketch</div>
                    </motion.div>
                  )}
                  {stage === 1 && (
                    <motion.div key="v1" className="text-[8px] p-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-white/50">// Script voiceover</p>
                      <p className="text-[7px] italic font-serif">&quot;Step into the future of sports gear...&quot;</p>
                    </motion.div>
                  )}
                  {stage === 2 && (
                    <motion.div key="v2" className="text-[8px] p-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-white/50">// Cataloging raw footage assets</p>
                      <div className="flex gap-1 justify-center mt-1">
                        <span className="w-6 h-4 bg-white/10 rounded"></span>
                        <span className="w-6 h-4 bg-white/10 rounded"></span>
                      </div>
                    </motion.div>
                  )}
                  {stage === 3 && (
                    <motion.div key="v3" className="text-[8px] p-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-white/50">// Aligning splits on track layers</p>
                      <p className="text-red-400 font-bold">Cutting clips &amp; synchronizing audio</p>
                    </motion.div>
                  )}
                  {stage === 4 && (
                    <motion.div key="v4" className="text-[8px] p-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-yellow-400 font-bold animate-pulse">✔ Render motion titles overlay</p>
                    </motion.div>
                  )}
                  {stage === 5 && (
                    <motion.div key="v5" className="text-[8px] p-2 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <span className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-1 animate-ping">
                        <i className="fas fa-play text-white text-[8px]"></i>
                      </span>
                      <p className="text-[7px]">Advertisement Video Playing</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Editing timeline tracks mockup */}
              <div className="bg-[#121824] rounded p-2 mt-2 space-y-1 text-[7px] font-mono text-white/50">
                <div className="flex items-center gap-2">
                  <span className="text-[6px] uppercase tracking-wider block w-8">Video:</span>
                  <div className={`h-2.5 rounded flex-1 flex gap-1 ${stage >= 3 ? 'bg-red-900/60' : 'bg-gray-800'}`}>
                    <span className="bg-red-500/80 w-1/3 rounded"></span>
                    <span className="bg-red-500/80 w-1/4 rounded"></span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[6px] uppercase tracking-wider block w-8">Audio:</span>
                  <div className={`h-2.5 rounded flex-1 flex gap-1 ${stage >= 3 ? 'bg-blue-900/60' : 'bg-gray-800'}`}>
                    <span className="bg-blue-500/80 w-1/2 rounded"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'consultation':
        return (
          <div className="bg-white border border-gray-200/80 rounded-xl p-3 h-full flex flex-col justify-between overflow-hidden shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2 font-mono text-[8px] text-muted-foreground">
              <span>Business Analysis Audits</span>
              <span>Growth Roadmap</span>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              {/* Progress parameter bars */}
              <div className="space-y-2 p-1">
                {[
                  { label: "Market Position", value: stage >= 2 ? 85 : 40, col: "#1E7FD4" },
                  { label: "Growth Potential", value: stage >= 4 ? 92 : 30, col: "#A855F7" },
                  { label: "Operations Audit", value: stage >= 1 ? 78 : 20, col: "#2E9E6B" }
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-[7px] font-bold text-muted-foreground mb-0.5">
                      <span>{bar.label}</span>
                      <span>{bar.value}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: bar.col }}
                        initial={{ width: 0 }}
                        animate={{ width: `${bar.value}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Consultation outputs */}
              <div className="bg-[#F8FAFC] border border-gray-150 rounded p-2 text-center text-[8px] text-gray-500 mt-2">
                <AnimatePresence mode="wait">
                  {stage === 0 && (
                    <motion.p key="cn0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      📞 01 Discovery Call Transcription Logging...
                    </motion.p>
                  )}
                  {stage === 1 && (
                    <motion.p key="cn1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      📝 02 Auditor checking operations metrics
                    </motion.p>
                  )}
                  {stage === 2 && (
                    <motion.p key="cn2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      📊 03 Business gap analysis parameters populated
                    </motion.p>
                  )}
                  {stage === 3 && (
                    <motion.p key="cn3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      💡 04 Strategic growth recommendations formatted
                    </motion.p>
                  )}
                  {stage === 4 && (
                    <motion.p key="cn4" className="text-[#1E7FD4] font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      🚀 05 Expansion roadmap milestone mapped
                    </motion.p>
                  )}
                  {stage === 5 && (
                    <motion.p key="cn5" className="text-[#2E9E6B] font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      ✔ 06 Launch monitoring support closed
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        );
    }
  };

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

      {/* 2. OVERVIEW SECTION */}
      <section ref={overviewRef} className="py-20 bg-white overflow-hidden">
        <div className="container px-4">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <motion.div
                className="bg-gradient-to-tr from-[#1E7FD4]/10 to-[#08A9E6]/10 border border-[#1E7FD4]/15 rounded-3xl p-8 text-center relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isOverviewInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#08A9E6]/10 rounded-full blur-2xl"></div>
                <div className="display-4 fw-extrabold text-[#1E7FD4] mb-3">{data.overview.metric.value}</div>
                <p className="text-muted text-xs uppercase tracking-wider font-bold mb-0">{data.overview.metric.label}</p>
              </motion.div>
            </div>

            <div className="col-lg-7">
              <motion.span
                className="text-xs font-bold text-[#2E9E6B] uppercase tracking-widest mb-2.5 block"
                initial="hidden"
                animate={isOverviewInView ? "visible" : "hidden"}
                variants={fadeUp}
              >
                Overview
              </motion.span>
              <motion.h2
                className="display-6 fw-bold text-[#0B1F3A] mb-5"
                style={{ fontFamily: 'var(--font-rubik)' }}
                initial="hidden"
                animate={isOverviewInView ? "visible" : "hidden"}
                variants={fadeUp}
              >
                {data.overview.title}
              </motion.h2>
              <motion.div
                className="space-y-4 text-muted text-sm leading-relaxed"
                initial="hidden"
                animate={isOverviewInView ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                {data.overview.paragraphs.map((p, i) => (
                  <motion.p key={i} variants={fadeUp}>{p}</motion.p>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ANIMATED SERVICE SHOWCASE */}
      <section className="py-20 bg-[#F7F5F0] overflow-hidden">
        <div className="container px-4">
          <div className="section-title text-center max-w-[650px] mx-auto mb-16">
            <h5 className="fw-bold text-[#1E7FD4] uppercase tracking-wider text-sm mb-2">Workflow Showcase</h5>
            <h2 className="display-6 fw-bold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
              Animated Service Delivery Simulation
            </h2>
            <p className="text-muted mt-2">See how we take your project requirements and transform them step-by-step into a premium digital platform.</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="bg-white border border-[#1E7FD4]/10 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
                {/* Accent glow backdrop */}
                <div 
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[80px] -z-10"
                  style={{ 
                    backgroundColor: 
                      data.heroVisualType === 'web' ? 'rgba(30,127,212,0.08)' :
                      data.heroVisualType === 'design' ? 'rgba(168,85,247,0.08)' :
                      data.heroVisualType === 'content' ? 'rgba(46,158,107,0.08)' :
                      data.heroVisualType === 'marketing' ? 'rgba(255,138,61,0.08)' :
                      data.heroVisualType === 'video' ? 'rgba(239,68,68,0.08)' :
                      'rgba(8,169,230,0.08)'
                  }}
                />

                <div className="row g-5 align-items-center">
                  
                  {/* Left: Interactive Workflow Stages */}
                  <div className="col-lg-6">
                    <h4 className="h4 fw-extrabold text-[#0B1F3A] mb-2">
                      Interactive Process Flow
                    </h4>
                    <p className="text-muted text-xs mb-6">
                      Click any stage below to inspect details or watch the simulation run automatically.
                    </p>

                    {/* Timeline steps */}
                    <div className="space-y-4 relative">
                      {/* Vertical line connection */}
                      <div className="absolute left-[17px] top-4 bottom-4 w-0.5 bg-gray-100 z-0"></div>

                      {data.workflow.map((step, idx) => {
                        const isActive = idx === showcaseStage;
                        const accentColor = 
                          data.heroVisualType === 'web' ? '#1E7FD4' :
                          data.heroVisualType === 'design' ? '#A855F7' :
                          data.heroVisualType === 'content' ? '#2E9E6B' :
                          data.heroVisualType === 'marketing' ? '#FF8A3D' :
                          data.heroVisualType === 'video' ? '#ef4444' :
                          '#08A9E6';

                        return (
                          <div 
                            key={step.title} 
                            className="flex items-start gap-4 relative z-10 cursor-pointer"
                            onClick={() => setShowcaseStage(idx)}
                          >
                            <motion.div
                              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border bg-white shrink-0 shadow-sm transition-all"
                              style={{
                                borderColor: isActive ? accentColor : '#E5E7EB',
                                color: isActive ? '#FFFFFF' : '#9CA3AF',
                                backgroundColor: isActive ? accentColor : '#FFFFFF'
                              }}
                              animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                            >
                              {step.number}
                            </motion.div>
                            <div>
                              <h5 
                                className="text-sm font-bold mb-0.5 transition-colors"
                                style={{ color: isActive ? accentColor : '#0B1F3A' }}
                              >
                                {step.title}
                              </h5>
                              <p className="text-muted text-xs mb-0">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Mockup Preview Frame & Metrics */}
                  <div className="col-lg-6">
                    <div className="border border-gray-200/80 rounded-2xl p-4 bg-[#F7FAFD] shadow-inner h-[300px]">
                      
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                          <span className="text-[9px] text-muted-foreground ml-3 font-mono">
                            atriowings.in/{data.heroVisualType}
                          </span>
                        </div>
                        <span className="text-[8px] font-mono text-muted-foreground font-bold tracking-wider">
                          LIVE PREVIEW
                        </span>
                      </div>

                      {/* Display custom HTML dashboard specific to service and active stage */}
                      <div className="h-[210px] overflow-hidden">
                        {renderShowcaseVisual(data.heroVisualType, showcaseStage)}
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES & BENEFITS */}
      <section ref={featuresRef} className="py-20 bg-white overflow-hidden">
        <div className="container px-4">
          <div className="section-title text-center max-w-[650px] mx-auto mb-16">
            <h5 className="fw-bold text-[#1E7FD4] uppercase tracking-wider text-sm mb-2">Features &amp; Benefits</h5>
            <h2 className="display-6 fw-bold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
              Engineered for Maximum Impact
            </h2>
            <p className="text-muted mt-2">Every feature of our work is meticulously structured to optimize user retention, security compliance and visual depth.</p>
          </div>

          <motion.div
            className="row g-4 justify-content-center"
            variants={staggerContainer}
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
          >
            {data.features.map((feature, i) => (
              <motion.div key={i} className="col-lg-4 col-md-6" variants={fadeUp}>
                <div className="service-feature-card group h-full bg-[#F7F5F0]/60 hover:bg-white border border-[#1E7FD4]/10 hover:border-[#2E9E6B]/30 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-[#1E7FD4]/10 rounded-xl flex items-center justify-center text-[#1E7FD4] text-xl mb-4 group-hover:scale-110 transition-transform">
                      <i className={`fas ${feature.icon}`}></i>
                    </div>
                    <h4 className="text-base fw-bold text-[#0B1F3A] mb-2">{feature.title}</h4>
                    <p className="text-muted text-xs leading-relaxed mb-0">{feature.desc}</p>
                  </div>
                </div>
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
            <h5 className="fw-bold text-[#08A9E6] uppercase tracking-wider text-sm mb-2">Our Execution Roadmap</h5>
            <h2 className="display-6 fw-bold text-white" style={{ fontFamily: 'var(--font-rubik)' }}>
              Proven Process Timeline
            </h2>
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
                  stroke="#1E7FD4"
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
                  <div className="w-12 h-12 rounded-full border-2 border-[#1E7FD4] bg-[#0B1F3A] flex items-center justify-center font-bold text-white text-base mb-4 shadow-[0_0_15px_rgba(30,127,212,0.2)]">
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
                <div className="w-9 h-9 rounded-full bg-[#1E7FD4] border-2 border-[#0B1F3A] flex items-center justify-center font-bold text-white text-xs shrink-0">
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
            <h5 className="fw-bold text-[#1E7FD4] uppercase tracking-wider text-sm mb-2">Technology &amp; Stack</h5>
            <h2 className="display-6 fw-bold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
              Industry Standard Toolkits
            </h2>
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
            <h5 className="fw-bold text-[#1E7FD4] uppercase tracking-wider text-sm mb-2">Our Advantage</h5>
            <h2 className="display-6 fw-bold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
              Why AtrioWings?
            </h2>
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
            <h5 className="fw-bold text-[#1E7FD4] uppercase tracking-wider text-sm mb-2">Outcomes</h5>
            <h2 className="display-6 fw-bold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
              Designed For Results
            </h2>
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
              <h5 className="fw-bold text-[#1E7FD4] uppercase tracking-wider text-sm mb-2">Our Portfolio</h5>
              <h2 className="display-6 fw-bold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
                Recent Collaborations
              </h2>
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
              <h5 className="fw-bold text-[#1E7FD4] uppercase tracking-wider text-sm mb-2">FAQ</h5>
              <h2 className="display-6 fw-bold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
                Frequently Asked Questions
              </h2>
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
          <span className="text-xs font-bold text-[#08A9E6] uppercase tracking-widest block mb-3">Get Started Today</span>
          <h2 className="display-5 fw-extrabold mb-4" style={{ fontFamily: 'var(--font-rubik)' }}>Ready to Scale Your Platform?</h2>
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
