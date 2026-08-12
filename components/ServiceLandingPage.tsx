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

  // Auto-progress showcase animation stage
  useEffect(() => {
    const timer = setInterval(() => {
      setShowcaseStage((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Refs for scroll animations
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

  // Floating Hero Visual Component based on visual type
  const renderHeroVisual = () => {
    switch (data.heroVisualType) {
      case 'web':
        return (
          <div className="relative w-full h-[400px] flex items-center justify-center">
            {/* Main Browser Mockup */}
            <motion.div
              className="absolute w-[80%] bg-[#0B1F3A]/90 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-1.5 px-4 py-3 bg-white/5 border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span className="text-[10px] text-white/40 ml-4 font-mono">atriowings.com/develop</span>
              </div>
              <div className="p-4 font-mono text-[10px] text-[#08A9E6]">
                <p className="text-white/60">// Atriowings Custom Development</p>
                <p className="text-green-400">const company = &quot;Atriowings Technologies&quot;;</p>
                <p>const buildApp = async (req, res) =&gt; &#123;</p>
                <p className="pl-4">const design = await createFigma();</p>
                <p className="pl-4 text-yellow-400">const code = compileReact(design);</p>
                <p className="pl-4">return deployToCloud(code);</p>
                <p>&#125;;</p>
              </div>
            </motion.div>

            {/* Floating Database Node */}
            <motion.div
              className="absolute bottom-6 left-2 w-28 bg-[#1E7FD4] p-3 rounded-lg text-white text-center shadow-lg border border-white/10 z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <i className="fas fa-database text-lg mb-1 block"></i>
              <span className="text-[9px] uppercase font-bold tracking-wider">PostgreSQL</span>
            </motion.div>

            {/* Floating API Node */}
            <motion.div
              className="absolute top-8 right-2 w-28 bg-[#2E9E6B] p-3 rounded-lg text-white text-center shadow-lg border border-white/10 z-20"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <i className="fas fa-network-wired text-lg mb-1 block"></i>
              <span className="text-[9px] uppercase font-bold tracking-wider">Secure API</span>
            </motion.div>

            {/* Floating Wing Logo */}
            <motion.div
              className="absolute top-10 left-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <img src="/img/indexlogo.png" alt="Atriowings logo" className="w-6 h-6 object-contain" />
            </motion.div>
          </div>
        );
      case 'marketing':
        return (
          <div className="relative w-full h-[400px] flex items-center justify-center">
            {/* Analytics Dashboard */}
            <motion.div
              className="absolute w-[80%] bg-[#0B1F3A]/90 border border-white/10 rounded-xl shadow-2xl p-4 z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                <span className="text-white font-bold text-xs">Analytics Dashboard</span>
                <span className="bg-green-500/20 text-green-400 text-[9px] px-2 py-0.5 rounded-full font-bold">LIVE</span>
              </div>
              <div className="flex gap-2 items-end h-28 px-2 border-b border-white/5 pb-2">
                {[40, 65, 50, 85, 70, 95, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-[#1E7FD4] to-[#08A9E6] rounded-t-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-3 text-[10px] text-white/50">
                <span>Impressions: +150%</span>
                <span className="text-green-400">CTR: 4.8%</span>
              </div>
            </motion.div>

            {/* Campaign metrics widget */}
            <motion.div
              className="absolute bottom-6 right-2 w-32 bg-[#FF8A3D] p-3 rounded-lg text-white shadow-lg border border-white/10 z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-[9px] uppercase tracking-wider text-white/80">ROI Status</div>
              <div className="text-lg font-bold">5.8x Growth</div>
              <div className="text-[8px] text-white/80">Google/Meta Ads</div>
            </motion.div>

            {/* Floating SEO badge */}
            <motion.div
              className="absolute top-6 left-2 w-28 bg-[#2E9E6B] p-2.5 rounded-lg text-white text-center shadow-lg border border-white/10 z-20"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            >
              <i className="fas fa-search-location text-lg mb-1 block"></i>
              <span className="text-[9px] uppercase font-bold tracking-wider">SEO Rank #1</span>
            </motion.div>
          </div>
        );
      case 'design':
        return (
          <div className="relative w-full h-[400px] flex items-center justify-center">
            {/* Design canvas */}
            <motion.div
              className="absolute w-[80%] bg-[#0B1F3A]/90 border border-white/10 rounded-xl shadow-2xl p-4 z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <span className="text-white font-bold text-xs">Figma Workspace</span>
                <span className="text-white/40 text-[9px] font-mono">1200 x 800</span>
              </div>
              <div className="relative h-28 border border-dashed border-white/10 rounded flex items-center justify-center overflow-hidden bg-white/2">
                {/* Artboard visual */}
                <div className="w-[60%] h-[80%] bg-[#1E7FD4]/10 rounded border border-[#1E7FD4]/30 flex flex-col justify-between p-2">
                  <div className="w-8 h-2 bg-[#1E7FD4] rounded"></div>
                  <div className="w-full h-4 bg-white/5 rounded"></div>
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-3 bg-[#2E9E6B] rounded"></div>
                    <div className="w-4 h-4 bg-white/10 rounded-full"></div>
                  </div>
                </div>
                {/* Figma Cursor Animation */}
                <motion.div
                  className="absolute"
                  animate={{
                    x: [-30, 20, -10, -30],
                    y: [20, -10, 40, 20]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <i className="fas fa-mouse-pointer text-[#08A9E6] text-sm drop-shadow-md"></i>
                  <span className="bg-[#08A9E6] text-white text-[8px] font-bold px-1 py-0.5 rounded ml-2">UI Designer</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Artboard properties palette */}
            <motion.div
              className="absolute bottom-6 left-2 w-32 bg-[#A855F7] p-3 rounded-lg text-white shadow-lg border border-white/10 z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[9px] uppercase tracking-wider text-white/80">Typography</span>
              <div className="text-sm font-bold font-sans">Rubik Bold</div>
              <div className="text-[8px] text-white/80">32px / tracking-tight</div>
            </motion.div>
          </div>
        );
      case 'content':
        return (
          <div className="relative w-full h-[400px] flex items-center justify-center">
            {/* Editor visual */}
            <motion.div
              className="absolute w-[80%] bg-[#0B1F3A]/90 border border-white/10 rounded-xl shadow-2xl p-4 z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-1.5 mb-4 border-b border-white/5 pb-2">
                <i className="fas fa-file-alt text-yellow-500 text-xs"></i>
                <span className="text-white font-bold text-xs">SEO Blog Draft</span>
              </div>
              <div className="space-y-2 font-serif text-[10px] text-white/70">
                <p className="h-2 bg-[#1E7FD4]/20 rounded w-[40%]"></p>
                <p className="border-l-2 border-[#1E7FD4] pl-2 py-0.5 italic">&quot;In the digital landscape, original content acts as a powerful catalyst for lead generation and search visibility...&quot;</p>
                <div className="space-y-1.5 pt-2">
                  <p className="h-1.5 bg-white/10 rounded w-full"></p>
                  <p className="h-1.5 bg-white/10 rounded w-[90%]"></p>
                  <p className="h-1.5 bg-white/10 rounded w-[95%]"></p>
                </div>
              </div>
            </motion.div>

            {/* Keyword tag cloud */}
            <motion.div
              className="absolute bottom-6 right-2 w-32 bg-[#FF8A3D] p-3 rounded-lg text-white shadow-lg border border-white/10 z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[9px] uppercase tracking-wider text-white/80">Focus Keywords</span>
              <div className="flex flex-wrap gap-1 mt-1">
                <span className="bg-white/20 text-[7px] px-1 py-0.2 rounded font-mono">SEO</span>
                <span className="bg-white/20 text-[7px] px-1 py-0.2 rounded font-mono">B2B Content</span>
                <span className="bg-white/20 text-[7px] px-1 py-0.2 rounded font-mono">Copywriting</span>
              </div>
            </motion.div>
          </div>
        );
      case 'video':
        return (
          <div className="relative w-full h-[400px] flex items-center justify-center">
            {/* Video player screen */}
            <motion.div
              className="absolute w-[80%] bg-[#0B1F3A]/90 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-40 bg-gradient-to-br from-[#0B1F3A] to-[#1E7FD4]/40 flex items-center justify-center">
                <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/40 text-[9px] text-white px-2 py-0.5 rounded-full font-mono">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                  <span>00:14 / 00:30</span>
                </div>
                <motion.div
                  className="w-12 h-12 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fas fa-play text-white text-base ml-1"></i>
                </motion.div>
              </div>
              <div className="p-3 bg-black/20 border-t border-white/5 flex gap-1 font-mono text-[8px] text-white/50">
                <div className="flex-1 bg-white/5 h-2 rounded overflow-hidden">
                  <motion.div className="bg-[#ef4444] h-full" animate={{ width: ['0%', '100%'] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
                </div>
              </div>
            </motion.div>

            {/* Timeline element */}
            <motion.div
              className="absolute bottom-4 left-2 w-32 bg-[#ef4444] p-2.5 rounded-lg text-white shadow-lg border border-white/10 z-20"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <i className="fas fa-film text-sm mb-1 block"></i>
              <span className="text-[9px] uppercase font-bold tracking-wider">Render Output</span>
              <div className="text-[8px] text-white/80">ProRes 422 HQ / 60 FPS</div>
            </motion.div>
          </div>
        );
      case 'consultation':
        return (
          <div className="relative w-full h-[400px] flex items-center justify-center">
            {/* Roadmap layout */}
            <motion.div
              className="absolute w-[80%] bg-[#0B1F3A]/90 border border-white/10 rounded-xl shadow-2xl p-4 z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-1.5 mb-4 border-b border-white/5 pb-2">
                <span className="text-white font-bold text-xs">Strategy Roadmap</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#2E9E6B] flex items-center justify-center text-[10px] text-white font-bold">1</div>
                  <div className="flex-1">
                    <div className="h-2 bg-[#2E9E6B]/30 rounded w-[60%] mb-1"></div>
                    <div className="h-1.5 bg-white/5 rounded w-full"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1E7FD4] flex items-center justify-center text-[10px] text-white font-bold">2</div>
                  <div className="flex-1">
                    <div className="h-2 bg-[#1E7FD4]/30 rounded w-[80%] mb-1"></div>
                    <div className="h-1.5 bg-white/5 rounded w-[90%]"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Growth node */}
            <motion.div
              className="absolute bottom-6 right-2 w-32 bg-[#2E9E6B] p-3 rounded-lg text-white shadow-lg border border-white/10 z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[9px] uppercase tracking-wider text-white/80">Audit Status</span>
              <div className="text-sm font-bold">Optimized Setup</div>
              <div className="text-[8px] text-white/80">Digital Workflow Built</div>
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#F7F5F0] overflow-x-hidden">
      
      {/* 1. HERO BANNER */}
      <section className="relative bg-gradient-to-b from-[#0B1F3A] to-[#0f2d54] text-white pt-28 pb-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,127,212,0.18),rgba(255,255,255,0))]"></div>
        <div className="container relative z-10 px-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <motion.span
                className="inline-block bg-[#1E7FD4]/20 border border-[#1E7FD4]/40 text-[#08A9E6] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {data.eyebrow}
              </motion.span>
              
              <motion.h1
                className="display-4 fw-bold mb-4"
                style={{ fontFamily: 'var(--font-rubik)', lineHeight: 1.15, color: '#ffffff' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {data.title.split(' ').map((word, index) => {
                  const isAccent = word.toLowerCase() === "experience" || word.toLowerCase() === "experiences" || word.toLowerCase() === "business" || word.toLowerCase() === "forward" || word.toLowerCase() === "growth" || word.toLowerCase() === "speed" || word.toLowerCase() === "design" || word.toLowerCase() === "marketing" || word.toLowerCase() === "writing" || word.toLowerCase() === "consultation" || word.toLowerCase() === "editing";
                  return (
                    <span key={index} style={{ color: isAccent ? '#08A9E6' : '#ffffff' }} className={isAccent ? "text-[#08A9E6]" : "text-white"}>
                      {word}{" "}
                    </span>
                  );
                })}
              </motion.h1>

              <motion.p
                className="lead text-white/70 mb-5 max-w-[500px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {data.tagline}
              </motion.p>

              <motion.div
                className="d-flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link href="/quote" className="btn btn-primary btn-lg rounded-pill px-4 py-2.5 shadow-lg border-0 bg-gradient-to-r from-[#1E7FD4] to-[#08A9E6]">
                  Start Your Project <i className="fas fa-arrow-right ms-2 text-xs"></i>
                </Link>
                <Link href="/portfolio" className="btn btn-outline-light btn-lg rounded-pill px-4 py-2.5 border-white/20 hover:bg-white/5">
                  Explore Our Work
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
      <section ref={overviewRef} className="py-20 bg-white">
        <div className="container px-4">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={isOverviewInView ? "visible" : "hidden"}
              >
                <h5 className="fw-bold text-[#1E7FD4] uppercase tracking-wider text-sm mb-2">The Overview</h5>
                <h2 className="display-6 fw-bold text-[#0B1F3A] leading-tight mb-4" style={{ fontFamily: 'var(--font-rubik)' }}>
                  {data.overview.title}
                </h2>
                
                {/* Metric Card */}
                <div className="bg-[#F7F5F0] border border-[#1E7FD4]/10 rounded-2xl p-4 mt-5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1E7FD4]/15 rounded-xl flex items-center justify-center text-[#1E7FD4] text-xl">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold text-[#0B1F3A] mb-0">{data.overview.metric.value}</h5>
                    <small className="text-muted">{data.overview.metric.label}</small>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="col-lg-7">
              <motion.div
                className="space-y-4"
                variants={staggerContainer}
                initial="hidden"
                animate={isOverviewInView ? "visible" : "hidden"}
              >
                {data.overview.paragraphs.map((para, i) => (
                  <motion.p key={i} className="lead text-[#4a5568]" style={{ fontSize: '16px' }} variants={fadeUp}>
                    {para}
                  </motion.p>
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
              {/* Interactive Showcase Panel */}
              <div className="bg-white border border-[#1E7FD4]/15 rounded-3xl shadow-xl overflow-hidden p-4 md:p-6 relative">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#f59e0b]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#10b981]"></span>
                    <span className="text-xs text-muted-foreground font-mono ml-4">Atriowings Build Stage Simulation</span>
                  </div>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3].map((stage) => (
                      <button
                        key={stage}
                        className={`text-[10px] font-bold px-3 py-1 rounded-full border transition-all ${
                          showcaseStage === stage
                            ? 'bg-[#1E7FD4] text-white border-transparent'
                            : 'bg-gray-50 text-gray-500 border-gray-200'
                        }`}
                        onClick={() => setShowcaseStage(stage)}
                      >
                        {['1. Wireframe', '2. UI Design', '3. Code', '4. Live Output'][stage]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animated Body Content Area */}
                <div className="relative h-[320px] bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 p-4">
                  <AnimatePresence mode="wait">
                    {showcaseStage === 0 && (
                      <motion.div
                        key="stage0"
                        className="w-full max-w-[450px] border-2 border-dashed border-gray-300 rounded-xl p-4 space-y-4 flex flex-col justify-between h-[200px]"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="w-16 h-4 bg-gray-200 rounded"></div>
                          <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="w-full h-3 bg-gray-200 rounded"></div>
                          <div className="w-[80%] h-3 bg-gray-200 rounded"></div>
                        </div>
                        <div className="w-24 h-8 bg-gray-200 rounded self-end"></div>
                      </motion.div>
                    )}

                    {showcaseStage === 1 && (
                      <motion.div
                        key="stage1"
                        className="w-full max-w-[450px] bg-[#0B1F3A] border border-white/10 rounded-xl p-4 space-y-4 flex flex-col justify-between h-[200px] shadow-lg text-white"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="w-16 h-4 bg-[#1E7FD4] rounded"></div>
                          <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="w-full h-3 bg-white/10 rounded"></div>
                          <div className="w-[80%] h-3 bg-white/10 rounded"></div>
                        </div>
                        <div className="w-24 h-8 bg-[#08A9E6] rounded self-end"></div>
                      </motion.div>
                    )}

                    {showcaseStage === 2 && (
                      <motion.div
                        key="stage2"
                        className="w-full max-w-[450px] bg-[#0c1322] border border-white/5 rounded-xl p-4 h-[200px] shadow-lg text-green-400 font-mono text-xs flex flex-col justify-between"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div>
                          <p className="text-white/40">// Compiling system variables</p>
                          <p>import &#123; createWidget &#125; from &apos;atriowings-core&apos;;</p>
                          <p className="text-yellow-400">const service = new createWidget(&#123;</p>
                          <p className="pl-4">engine: &quot;Vite/Next.js&quot;,</p>
                          <p className="pl-4">render: &quot;SSR&quot;,</p>
                          <p className="pl-4">responsive: true</p>
                          <p className="text-yellow-400">&#125;);</p>
                        </div>
                        <span className="text-white/50 text-[10px] self-end">Compilation success</span>
                      </motion.div>
                    )}

                    {showcaseStage === 3 && (
                      <motion.div
                        key="stage3"
                        className="w-full max-w-[450px] bg-white border border-gray-100 rounded-xl p-4 space-y-4 flex flex-col justify-between h-[200px] shadow-2xl relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs text-[#0B1F3A]">Platform Live</span>
                          <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg text-green-700 text-xs flex justify-between items-center">
                          <span>Performance Index: 100% Speed Score</span>
                          <i className="fas fa-check-circle text-base"></i>
                        </div>
                        <button className="btn btn-primary btn-sm rounded-pill self-end bg-[#1E7FD4] border-0 px-4">Visit Platform</button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Floating Tags */}
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm border border-gray-100 text-[10px] text-[#0B1F3A] font-bold px-3 py-1 rounded-full shadow-sm">
                    <i className="fas fa-check text-green-500 mr-1.5"></i> Responsive
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm border border-gray-100 text-[10px] text-[#0B1F3A] font-bold px-3 py-1 rounded-full shadow-sm">
                    <i className="fas fa-check text-green-500 mr-1.5"></i> SEO Optimized
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES & BENEFITS */}
      <section ref={featuresRef} className="py-20 bg-white">
        <div className="container px-4">
          <div className="section-title text-center max-w-[650px] mx-auto mb-16">
            <h5 className="fw-bold text-[#1E7FD4] uppercase tracking-wider text-sm mb-2">Features &amp; Benefits</h5>
            <h2 className="display-6 fw-bold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
              Engineered for Maximum Impact
            </h2>
            <p className="text-muted mt-2">Every feature of our service is designed to solve real business hurdles and optimize output performance.</p>
          </div>

          <motion.div
            className="row g-4 justify-content-center"
            variants={staggerContainer}
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
          >
            {data.features.map((feature, i) => (
              <motion.div key={i} className="col-md-6 col-lg-4" variants={fadeUp}>
                <div className="service-feature-card group h-full bg-[#F7F5F0]/60 hover:bg-white border border-[#1E7FD4]/10 hover:border-[#2E9E6B]/30 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-[#1E7FD4]/10 rounded-xl flex items-center justify-center text-[#1E7FD4] text-xl mb-4 group-hover:scale-110 transition-transform">
                      <i className={`fas ${feature.icon}`}></i>
                    </div>
                    <h4 className="h5 fw-bold text-[#0B1F3A] mb-3">{feature.title}</h4>
                    <p className="text-muted text-[13px] leading-relaxed mb-4">{feature.desc}</p>
                  </div>
                  <div className="text-[#1E7FD4] text-xs font-bold flex items-center gap-1">
                    Learn More <i className="fas fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. INTERACTIVE WORKFLOW */}
      <section ref={workflowRef} className="py-20 bg-[#0B1F3A] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_120%,rgba(30,127,212,0.15),rgba(255,255,255,0))]"></div>
        <div className="container relative z-10 px-4">
          <div className="section-title text-center max-w-[650px] mx-auto mb-20">
            <h5 className="fw-bold text-[#08A9E6] uppercase tracking-wider text-sm mb-2" style={{ color: '#08A9E6' }}>Our Process</h5>
            <h2 className="display-6 fw-bold" style={{ fontFamily: 'var(--font-rubik)', color: '#ffffff' }}>
              How We Bring Your Project to Life
            </h2>
            <p className="text-white/60 mt-2">A structured, flight-path inspired methodology that guarantees alignment and delivery precision.</p>
          </div>

          {/* Desktop Workflow Line */}
          <div className="hidden lg:block relative py-10 mb-10">
            {/* SVG Connecting Flight Path */}
            <svg className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2" viewBox="0 0 1000 10" fill="none" preserveAspectRatio="none">
              <motion.path
                d="M 0,5 L 1000,5"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="4"
              />
              <motion.path
                d="M 0,5 L 1000,5"
                stroke="url(#gradient-line)"
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={isWorkflowInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1E7FD4" />
                  <stop offset="100%" stopColor="#2E9E6B" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glowing path point */}
            {isWorkflowInView && (
              <motion.div
                className="absolute top-1/2 left-0 w-4 h-4 rounded-full bg-[#2E9E6B] shadow-[0_0_12px_rgba(46,158,107,0.8)] -translate-y-1/2 -translate-x-1/2 z-20"
                animate={{
                  left: ["0%", "100%"]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            <div className="flex justify-between relative z-10">
              {data.workflow.map((step, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center text-center w-40"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isWorkflowInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                >
                  <div className="w-12 h-12 rounded-full border-2 border-[#1E7FD4] bg-[#0B1F3A] flex items-center justify-center font-bold text-white text-base mb-4 shadow-[0_0_15px_rgba(30,127,212,0.2)]">
                    {step.number}
                  </div>
                  <h5 className="fw-bold mb-2" style={{ color: '#ffffff' }}>{step.title}</h5>
                  <p className="text-white/60 text-[11px] leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Vertical Workflow */}
          <div className="lg:hidden relative border-l-2 border-white/10 pl-6 space-y-10 py-4 ml-2">
            {data.workflow.map((step, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={isWorkflowInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="absolute top-0 -left-[38px] w-6 h-6 rounded-full bg-[#1E7FD4] border-2 border-[#0B1F3A] flex items-center justify-center font-bold text-white text-[10px]">
                  {step.number}
                </div>
                <h5 className="fw-bold mb-1" style={{ color: '#ffffff' }}>{step.title}</h5>
                <p className="text-white/60 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. TECHNOLOGY / TOOLS */}
      <section ref={toolsRef} className="py-20 bg-white">
        <div className="container px-4">
          <div className="section-title text-center max-w-[650px] mx-auto mb-16">
            <h5 className="fw-bold text-[#1E7FD4] uppercase tracking-wider text-sm mb-2">Technology &amp; Stack</h5>
            <h2 className="display-6 fw-bold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
              Built With the Right Tools
            </h2>
            <p className="text-muted mt-2">We leverage industry-leading technologies to guarantee performance, scaling capacity, and product longevity.</p>
          </div>

          <motion.div
            className="flex flex-wrap justify-center gap-3.5"
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
      <section ref={whyChooseRef} className="py-20 bg-[#F7F5F0]">
        <div className="container px-4">
          <div className="section-title text-center max-w-[650px] mx-auto mb-16">
            <h5 className="fw-bold text-[#1E7FD4] uppercase tracking-wider text-sm mb-2">Our Advantage</h5>
            <h2 className="display-6 fw-bold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
              Why Businesses Choose Atriowings
            </h2>
            <p className="text-muted mt-2">We blend development rigor, marketing intelligence, and product-design focus to create outstanding results.</p>
          </div>

          <motion.div
            className="row g-4"
            variants={staggerContainer}
            initial="hidden"
            animate={isWhyChooseInView ? "visible" : "hidden"}
          >
            {data.whyChooseUs.map((item, i) => (
              <motion.div key={i} className="col-md-6" variants={fadeUp}>
                <div className="bg-white border border-[#1E7FD4]/10 rounded-2xl p-5 flex gap-4 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#2E9E6B]/10 flex items-center justify-center text-[#2E9E6B] text-xl shrink-0">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div>
                    <h5 className="fw-bold text-[#0B1F3A] mb-2">{item.title}</h5>
                    <p className="text-muted text-[13px] leading-relaxed mb-0">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. RESULTS / OUTCOMES */}
      <section ref={outcomesRef} className="py-20 bg-white">
        <div className="container px-4">
          <div className="section-title text-center max-w-[650px] mx-auto mb-16">
            <h5 className="fw-bold text-[#1E7FD4] uppercase tracking-wider text-sm mb-2">Outcomes</h5>
            <h2 className="display-6 fw-bold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
              Designed for Real Business Outcomes
            </h2>
            <p className="text-muted mt-2">We set concrete project goals to ensure maximum return on investment for your organization.</p>
          </div>

          <motion.div
            className="row g-4 justify-content-center"
            variants={staggerContainer}
            initial="hidden"
            animate={isOutcomesInView ? "visible" : "hidden"}
          >
            {data.outcomes.map((outcome, i) => (
              <motion.div key={i} className="col-md-6 col-lg-4" variants={fadeUp}>
                <div className="bg-[#F7F5F0]/60 border border-[#1E7FD4]/10 rounded-2xl p-5 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] uppercase font-bold text-muted tracking-wider">Target Objective</span>
                      <i className={`fas ${outcome.icon} text-[#FF8A3D] text-lg`}></i>
                    </div>
                    <h4 className="h5 fw-bold text-[#0B1F3A] mb-2">{outcome.title}</h4>
                    <p className="text-muted text-[13px] leading-relaxed mb-4">{outcome.desc}</p>
                  </div>
                  <div className="border-t border-[#1E7FD4]/10 pt-3 text-xs text-[#0B1F3A] font-bold">
                    {outcome.metric}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. PORTFOLIO / PROJECT SHOWCASE */}
      <section ref={portfolioRef} className="py-20 bg-[#F7F5F0]">
        <div className="container px-4">
          <div className="section-title text-center max-w-[650px] mx-auto mb-16">
            <h5 className="fw-bold text-[#1E7FD4] uppercase tracking-wider text-sm mb-2">Our Portfolio</h5>
            <h2 className="display-6 fw-bold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
              See What We Can Build
            </h2>
            <p className="text-muted mt-2">A small highlight of core projects launched under this category.</p>
          </div>

          <motion.div
            className="row g-5"
            variants={staggerContainer}
            initial="hidden"
            animate={isPortfolioInView ? "visible" : "hidden"}
          >
            {data.portfolio.map((proj, i) => (
              <motion.div key={i} className="col-lg-6" variants={fadeUp}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-md group hover:shadow-xl transition-shadow duration-300">
                  <div className="relative overflow-hidden h-[240px] md:h-[280px]">
                    <img
                      src={proj.img}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#0B1F3A]/80 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {proj.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="fw-bold text-[#0B1F3A] mb-2">{proj.title}</h4>
                    <p className="text-muted text-sm mb-4 leading-relaxed">{proj.desc}</p>
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#1E7FD4] text-sm font-bold flex items-center gap-1.5"
                    >
                      View Live Website <i className="fas fa-external-link-alt text-[10px]"></i>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="section-title text-center max-w-[650px] mx-auto mb-16">
            <h5 className="fw-bold text-[#1E7FD4] uppercase tracking-wider text-sm mb-2">FAQ</h5>
            <h2 className="display-6 fw-bold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-muted mt-2">Clear and direct answers regarding project timelines, scopes, and technologies.</p>
          </div>

          <div className="max-w-[700px] mx-auto space-y-3">
            {data.faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50/50">
                <button
                  className="w-full px-5 py-4 text-left font-bold text-[#0B1F3A] flex justify-between items-center transition-colors hover:bg-gray-100/40"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <i className={`fas ${activeFaq === i ? 'fa-chevron-up' : 'fa-chevron-down'} text-[#1E7FD4] text-xs`}></i>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-white"
                    >
                      <div className="px-5 py-4 text-sm text-[#4a5568] leading-relaxed border-t border-gray-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0B1F3A] to-[#1E7FD4] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_100%,rgba(8,169,230,0.15),rgba(255,255,255,0))]"></div>
        <div className="container relative z-10 px-4 text-center">
          <div className="max-w-[650px] mx-auto">
            <h2 className="display-5 fw-bold mb-4" style={{ fontFamily: 'var(--font-rubik)', color: '#ffffff' }}>
              Ready to Build Something Great?
            </h2>
            <p className="lead text-white/70 mb-5">
              Let&apos;s discuss your {data.title} project and find the right digital solution for your business goals.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link href="/quote" className="btn btn-light btn-lg rounded-pill px-5 py-3 font-bold text-[#0B1F3A] shadow-lg border-0 hover:bg-gray-100 animate-pulse">
                Get a Quote <i className="fas fa-arrow-right ms-2 text-xs"></i>
              </Link>
              <Link href="/contact" className="btn btn-outline-light btn-lg rounded-pill px-5 py-3 border-white/20 hover:bg-white/5">
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
