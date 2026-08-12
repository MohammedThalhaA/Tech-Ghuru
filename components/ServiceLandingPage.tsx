"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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

const SERVICE_META_MAPPING = {
  web: {
    id: "01",
    title: "Web Developing",
    tagline: "High-performance websites & web applications",
    videoSrc: "/services-video/web-developing.mp4",
    fallbackSrc: "/img/web-development-video.mp4",
    accentColor: "#1E7FD4",
    glowColor: "rgba(30, 127, 212, 0.25)",
    benefits: ["Responsive Design", "SEO Optimized", "Fast Performance", "Secure Development", "Scalable Architecture", "Clean Code"],
    tools: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "AWS"],
    metrics: [
      { label: "Performance", value: "98%" },
      { label: "SEO Score", value: "95/100" },
      { label: "Security", value: "100%" }
    ]
  },
  design: {
    id: "02",
    title: "Product Design",
    tagline: "User-centered designs that create impact",
    videoSrc: "/services-video/product-design.mp4",
    fallbackSrc: "/img/Services/product designgif.gif",
    accentColor: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.25)",
    benefits: ["User Research", "Modern UI/UX", "Interactive Prototypes", "Design Systems", "Mobile-First", "Conversion Focused"],
    tools: ["Figma", "FigJam", "Adobe XD", "Prototyping", "Design System", "UI/UX Audit"],
    metrics: [
      { label: "UX Score", value: "9.6/10" },
      { label: "Design Quality", value: "95%" }
    ]
  },
  content: {
    id: "03",
    title: "Content Writing",
    tagline: "SEO-friendly content that ranks and converts",
    videoSrc: "/services-video/content-writing.mp4",
    fallbackSrc: "/img/portfolio pics/Content-Writing-12.gif",
    accentColor: "#2E9E6B",
    glowColor: "rgba(46, 158, 107, 0.25)",
    benefits: ["SEO Optimized", "Well Researched", "Original Content", "Engaging Copy", "Plagiarism Free", "On-time Delivery"],
    tools: ["SEO Writing", "Keyword Audit", "Google Docs", "Grammarly", "WordPress", "Analytics"],
    metrics: [
      { label: "SEO Score", value: "92%" },
      { label: "Readability", value: "Clear" },
      { label: "Words", value: "1,245" }
    ]
  },
  marketing: {
    id: "04",
    title: "Digital Marketing",
    tagline: "Data-driven strategies that grow your business",
    videoSrc: "/services-video/digital-marketing.mp4",
    fallbackSrc: "/img/Services/digitalmarketgif4.gif",
    accentColor: "#FF8A3D",
    glowColor: "rgba(255, 138, 61, 0.25)",
    benefits: ["SEO Optimization", "Paid Advertising", "Social Funnels", "GA4 Analytics", "Retargeting", "ROAS Target Focus"],
    tools: ["Google Ads", "Meta Ads Manager", "Google Analytics 4", "Semrush", "Tag Manager", "Mailchimp"],
    metrics: [
      { label: "ROAS ROI", value: "5.8x" },
      { label: "Cost Per Lead", value: "Low" }
    ]
  },
  video: {
    id: "05",
    title: "Video Ads & Editing",
    tagline: "High-impact videos that tell your brand story",
    videoSrc: "/services-video/video-ads-editing.mp4",
    fallbackSrc: "/img/Services/videogif.gif",
    accentColor: "#ef4444",
    glowColor: "rgba(239, 68, 68, 0.25)",
    benefits: ["Creative Concepts", "Video Editing", "Motion Graphics", "Social Formats", "High Quality Output", "Fast Turnaround"],
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Cinema 4D", "Audition", "Motion Design"],
    metrics: [
      { label: "Views Index", value: "8.7/10" },
      { label: "Retention", value: "92%" },
      { label: "Watch Time", value: "2.4K h" }
    ]
  },
  consultation: {
    id: "06",
    title: "Consultation",
    tagline: "Strategic guidance for your business growth",
    videoSrc: "/services-video/consultation.mp4",
    fallbackSrc: "/img/Services/services1.gif",
    accentColor: "#08A9E6",
    glowColor: "rgba(8, 169, 230, 0.25)",
    benefits: ["Business Strategy", "Market Research", "Growth Planning", "Risk Analysis", "Actionable Insights", "Long-term Support"],
    tools: ["Market Analysis", "SWOT Audits", "KPI Tracking", "Financial Model", "Process Mapping", "Roadmap Planning"],
    metrics: [
      { label: "Success Rate", value: "98%" },
      { label: "Satisfaction", value: "5 ★" }
    ]
  }
};

export default function ServiceLandingPage({ data }: { data: ServiceData }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showcaseStage, setShowcaseStage] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const featuresRef = useRef(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });

  const processRef = useRef(null);
  const isProcessInView = useInView(processRef, { once: true, margin: "-100px" });

  const portfolioRef = useRef(null);
  const isPortfolioInView = useInView(portfolioRef, { once: true, margin: "-100px" });

  // Map helper props based on the visual type
  const meta = SERVICE_META_MAPPING[data.heroVisualType] || SERVICE_META_MAPPING.web;

  // Auto-progress showcase timeline state
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setShowcaseStage(0);
      return;
    }

    const timer = setInterval(() => {
      setShowcaseStage((prev) => (prev + 1) % data.workflow.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [data.workflow.length]);

  // Auto-progress overall delivery process journey map
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 7);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const featureStrips = [
    { title: "Interactive Simulation", desc: "See your project transform step-by-step", icon: "fa-magic", col: "#1E7FD4" },
    { title: "Real-time Preview", desc: "Experience our workflow in action", icon: "fa-eye", col: "#FF8A3D" },
    { title: "Transparent Process", desc: "Clear workflow with complete visibility", icon: "fa-project-diagram", col: "#2E9E6B" },
    { title: "Quality Assured", desc: "Industry best practices at every stage", icon: "fa-shield-alt", col: "#ef4444" },
    { title: "On-time Delivery", desc: "We value your time and deliver on promises", icon: "fa-clock", col: "#08A9E6" }
  ];

  const deliverySteps = [
    { num: "01", name: "Understand", col: "#1E7FD4" },
    { num: "02", name: "Plan", col: "#FF8A3D" },
    { num: "03", name: "Design", col: "#A855F7" },
    { num: "04", name: "Develop", col: "#2E9E6B" },
    { num: "05", name: "Test", col: "#ef4444" },
    { num: "06", name: "Launch", col: "#08A9E6" },
    { num: "07", name: "Support", col: "#10b981" }
  ];

  return (
    <div className="bg-[#F7FAFD] min-vh-100 text-[#0B1F3A] overflow-x-hidden font-sans relative w-full">
      {/* Decorative flying paths */}
      <svg className="absolute top-0 left-0 w-full h-[500px] pointer-events-none z-0 opacity-25" viewBox="0 0 1200 500" fill="none">
        <motion.path
          d="M -100,200 C 300,100 500,400 1300,300"
          stroke="url(#gradient-hero-1)"
          strokeWidth="2.5"
          strokeDasharray="8 8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="gradient-hero-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E7FD4" />
            <stop offset="50%" stopColor="#08A9E6" />
            <stop offset="100%" stopColor="#2E9E6B" />
          </linearGradient>
        </defs>
      </svg>

      {/* Page Intro Banner & Feature strip */}
      <section className="py-20 md:py-28 relative z-10 overflow-hidden">
        <div className="container px-4">
          <div className="row g-5 align-items-center">
            
            {/* Left side text intro */}
            <div className="col-lg-6">
              <span className="inline-block bg-[#1E7FD4]/10 border border-[#1E7FD4]/30 text-[#1E7FD4] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                HOW WE DELIVER EXCELLENCE
              </span>
              <h1 className="display-4 fw-extrabold text-[#0B1F3A] leading-tight mb-4 animate-fade-in" style={{ fontFamily: 'var(--font-rubik)' }}>
                Animated Service <br />
                Delivery <span className="text-[#1E7FD4]">Showcase</span>
              </h1>
              <p className="text-muted text-base md:text-lg leading-relaxed max-w-[520px]">
                Explore how we turn your ideas into powerful digital solutions through our structured, transparent and result-driven process.
              </p>
            </div>

            {/* Right side horizontal grid feature strips */}
            <div className="col-lg-6">
              <div className="flex flex-col gap-3">
                {featureStrips.map((strip, idx) => (
                  <motion.div
                    key={strip.title}
                    className="bg-white border border-[#1E7FD4]/10 rounded-2xl p-4 shadow-sm hover:border-[#1E7FD4]/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4 cursor-default group"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm shrink-0 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: strip.col + '15', color: strip.col }}
                    >
                      <i className={`fas ${strip.icon}`}></i>
                    </div>
                    <div>
                      <h4 className="text-sm fw-bold text-[#0B1F3A] mb-0.5">{strip.title}</h4>
                      <p className="text-muted text-xs mb-0">{strip.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Core Active Showcase Panel for the current service */}
      <section className="py-12 md:py-20 bg-white border-y border-gray-200/50 overflow-hidden">
        <div className="container px-4">
          <div className="bg-white border border-[#1E7FD4]/10 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            {/* Accent glow backdrop */}
            <div 
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[80px] -z-10"
              style={{ backgroundColor: meta.accentColor + '10' }}
            />

            <div className="row g-5 align-items-center">
              {/* Card Left: Content, Workflow & Tools */}
              <div className="col-lg-6 flex flex-col justify-between h-full">
                <div>
                  {/* Badge & Title */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <span 
                      className="font-mono text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: meta.accentColor + '15', color: meta.accentColor }}
                    >
                      {meta.id}
                    </span>
                    <h3 className="h3 fw-extrabold text-[#0B1F3A] mb-0" style={{ fontFamily: 'var(--font-rubik)' }}>
                      {meta.title}
                    </h3>
                  </div>

                  <p className="text-muted text-base mb-6 leading-relaxed">
                    <strong className="text-[#0B1F3A] block mb-1 text-sm font-semibold">{data.title}</strong>
                    {data.tagline}
                  </p>

                  {/* Animated Workflow Strip */}
                  <div className="mb-8">
                    <h5 className="text-[11px] font-bold text-[#0B1F3A]/50 uppercase tracking-widest mb-3.5">
                      Delivery Workflow
                    </h5>
                    <div className="flex items-center justify-between gap-1 overflow-x-auto pb-3 -mx-2 px-2 scrollbar-thin">
                      {data.workflow.map((stage, idx) => {
                        const isActive = idx === showcaseStage;
                        return (
                          <div key={stage.title} className="flex items-center flex-1 min-w-[75px] relative">
                            {/* Connecting track line */}
                            {idx < data.workflow.length - 1 && (
                              <div className="absolute top-[14px] left-[55%] right-0 h-0.5 bg-gray-100 z-0">
                                <motion.div 
                                  className="h-full" 
                                  style={{ backgroundColor: meta.accentColor }}
                                  initial={{ width: "0%" }}
                                  animate={isActive ? { width: "100%" } : { width: "0%" }}
                                  transition={{ duration: 3.0, ease: "linear" }}
                                />
                              </div>
                            )}

                            <div className="flex flex-col items-center z-10 w-full cursor-pointer" onClick={() => setShowcaseStage(idx)}>
                              <motion.div
                                className="w-7.5 h-7.5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all"
                                style={{
                                  borderColor: isActive ? meta.accentColor : '#E5E7EB',
                                  backgroundColor: isActive ? meta.accentColor : '#FFFFFF',
                                  color: isActive ? '#FFFFFF' : '#9CA3AF',
                                  boxShadow: isActive ? `0 0 10px ${meta.glowColor}` : 'none'
                                }}
                                animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                {idx + 1}
                              </motion.div>
                              <span 
                                className="text-[9px] font-bold mt-2 text-center truncate w-full"
                                style={{ color: isActive ? meta.accentColor : '#9CA3AF' }}
                              >
                                {stage.title}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  {/* Technology badges */}
                  <div className="mb-6">
                    <h5 className="text-[10px] font-bold text-[#0B1F3A]/40 uppercase tracking-widest mb-2.5">
                      Technologies / Standards
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {data.tools.map((tool) => (
                        <span 
                          key={tool} 
                          className="bg-[#F7F5F0] border border-gray-200/60 rounded-lg px-2.5 py-1 text-[11px] text-[#0B1F3A] font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Benefit tags checklist */}
                  <div className="row g-2">
                    {meta.benefits.map((benefit) => (
                      <div key={benefit} className="col-sm-6 flex items-center gap-2 text-xs text-[#0B1F3A]/85">
                        <i className="fas fa-check-circle text-[#2E9E6B] text-[13px]"></i>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Right: Device Mockup Demo & Metrics */}
              <div className="col-lg-6">
                <div className="relative border border-gray-200/80 rounded-2xl p-4 bg-[#F7FAFD] shadow-inner overflow-hidden">
                  
                  {/* Mockup shell header */}
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                      <span className="text-[10px] text-muted-foreground ml-3 font-mono select-none">
                        atriowings.in/{data.id}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground font-bold tracking-wider">
                      SAMPLE DEMO
                    </span>
                  </div>

                  {/* Loop Video/GIF Visual demonstration block */}
                  <div className="relative h-[250px] rounded-xl overflow-hidden bg-black/5 flex items-center justify-center shadow-sm">
                    <video
                      src={meta.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to project video or GIF if services-video folder isn't populated
                        const target = e.target as HTMLVideoElement;
                        if (target.src !== meta.fallbackSrc) {
                          target.src = meta.fallbackSrc;
                        }
                      }}
                    />
                    
                    {/* Scanline CRT layout */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-[0.15]" />
                  </div>

                  {/* Metrics overlays */}
                  <div className="flex items-center justify-around gap-2 mt-4 pt-3 border-t border-gray-200/60">
                    {meta.metrics.map((metric) => (
                      <div key={metric.label} className="text-center flex-1">
                        <span className="text-[9px] text-muted-foreground uppercase tracking-wider block">
                          {metric.label}
                        </span>
                        <span 
                          className="text-sm font-extrabold block mt-0.5"
                          style={{ color: meta.accentColor }}
                        >
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Key statistics */}
      <section ref={featuresRef} className="py-20 bg-[#F8FAFC] relative overflow-hidden">
        <div className="container px-4">
          <div className="row g-5">
            
            {/* Left: Why Choose Us block details */}
            <div className="col-lg-7">
              <div className="section-title pb-3 mb-5">
                <span className="text-xs font-bold text-[#2E9E6B] uppercase tracking-widest mb-2 block">
                  ATRIOWINGS GUARANTEES
                </span>
                <h2 className="display-6 fw-extrabold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
                  Why Choose AtrioWings?
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Expert Team", desc: "Skilled professionals with practical experience across frontend development, copywriting and strategy layouts.", icon: "fa-users", col: "#1E7FD4" },
                  { title: "Agile Process", desc: "Flexible, iterative and result-driven milestoning to ensure transparent progression reviews.", icon: "fa-route", col: "#FF8A3D" },
                  { title: "Custom Solutions", desc: "We design code blocks and design prototypes specifically built around your exact commercial needs.", icon: "fa-pencil-ruler", col: "#A855F7" },
                  { title: "Scalable & Secure", desc: "Built with secure API access layers and clean database definitions for long-term growth.", icon: "fa-shield-alt", col: "#2E9E6B" },
                  { title: "Support 24/7", desc: "Dedicated, responsive IT consultants ready to patch, optimize and backup your platforms.", icon: "fa-headset", col: "#08A9E6" }
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    className="bg-white border border-[#1E7FD4]/10 rounded-2xl p-4.5 flex gap-4 shadow-sm hover:border-[#1E7FD4]/30 transition-all"
                    initial={{ opacity: 0, y: 15 }}
                    animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-base"
                      style={{ backgroundColor: item.col + '15', color: item.col }}
                    >
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <div>
                      <h4 className="text-base fw-extrabold text-[#0B1F3A] mb-1">{item.title}</h4>
                      <p className="text-muted text-xs leading-relaxed mb-0">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Key Milestones statistics & Tech strip */}
            <div className="col-lg-5 flex flex-col justify-between">
              <div className="bg-gradient-to-tr from-[#0B1F3A] to-[#1E7FD4] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between h-full min-h-[380px] mb-6">
                
                {/* Decorative overlay curves */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_120%_-20%,rgba(255,255,255,0.1),rgba(255,255,255,0))]"></div>
                
                <div>
                  <h3 className="h4 fw-extrabold mb-6 tracking-wide uppercase text-white/60">Milestones</h3>
                  <div className="row g-4">
                    {[
                      { num: "6+", label: "Core Services" },
                      { num: "150+", label: "Projects Delivered" },
                      { num: "98%", label: "Client Satisfaction" },
                      { num: "5+", label: "Years of Excellence" },
                      { num: "24/7", label: "Support Available" }
                    ].map((stat) => (
                      <div key={stat.label} className="col-6">
                        <span className="display-6 fw-extrabold block text-white">{stat.num}</span>
                        <span className="text-[10px] text-white/70 uppercase tracking-widest block mt-1">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 mt-6">
                  <span className="text-[10px] text-white/50 uppercase tracking-widest block mb-4">
                    TRUSTED BY ENTERPRISES WORLDWIDE
                  </span>
                  {/* Partner logo mock strip */}
                  <div className="flex flex-wrap gap-4 items-center">
                    {["Zapier", "Google", "Microsoft", "AWS", "Meta", "Stripe"].map((logo) => (
                      <span key={logo} className="text-white/60 text-xs font-mono font-bold tracking-wider">
                        {logo}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Technologies stack showcase block */}
              <div className="bg-white border border-[#1E7FD4]/10 rounded-3xl p-6 shadow-sm">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest block mb-3 font-bold">
                  Technologies Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {data.tools.map((tech) => (
                    <span 
                      key={tech} 
                      className="bg-[#F7FAFD] border border-gray-200/60 text-xs text-[#0B1F3A] px-3 py-1.5 rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Portfolio Showcase Section */}
      {data.portfolio && data.portfolio.length > 0 && (
        <section ref={portfolioRef} className="py-20 bg-white border-t border-gray-200/60 overflow-hidden">
          <div className="container px-4">
            <div className="section-title text-center max-w-[650px] mx-auto mb-16">
              <span className="text-xs font-bold text-[#1E7FD4] uppercase tracking-widest mb-2 block">
                OUR PORTFOLIO
              </span>
              <h2 className="display-6 fw-extrabold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
                Recent Work Done
              </h2>
            </div>
            <div className="row g-4">
              {data.portfolio.map((project, idx) => (
                <div key={project.title} className="col-md-6 col-lg-6">
                  <motion.div 
                    className="bg-[#F7FAFD] border border-gray-200/65 rounded-2xl p-4 h-full flex flex-col justify-between hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isPortfolioInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                  >
                    <div>
                      <div className="relative h-[240px] rounded-xl overflow-hidden mb-4 bg-gray-150">
                        <img 
                          src={project.img} 
                          alt={project.title} 
                          className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500" 
                        />
                      </div>
                      <span className="text-[10px] font-bold text-[#1E7FD4] uppercase tracking-wider block mb-1">
                        {project.category}
                      </span>
                      <h4 className="text-base fw-bold text-[#0B1F3A] mb-2">{project.title}</h4>
                      <p className="text-muted text-xs leading-relaxed mb-4">{project.desc}</p>
                    </div>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-outline-primary btn-sm rounded-pill font-bold align-self-start border-[#1E7FD4] text-[#1E7FD4] hover:bg-[#1E7FD4] hover:text-white px-4"
                    >
                      Visit Website <i className="fas fa-external-link-alt text-[9px] ml-1"></i>
                    </a>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="py-20 bg-[#F8FAFC] border-t border-gray-200/60 overflow-hidden">
          <div className="container px-4">
            <div className="section-title text-center max-w-[650px] mx-auto mb-16">
              <span className="text-xs font-bold text-[#1E7FD4] uppercase tracking-widest mb-2 block">
                FAQ
              </span>
              <h2 className="display-6 fw-extrabold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
                Frequently Asked Questions
              </h2>
            </div>
            <div className="max-w-[800px] mx-auto space-y-3">
              {data.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={faq.q} className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
                    <button 
                      className="w-full px-5 py-4 text-left flex items-center justify-between font-bold text-sm text-[#0B1F3A] hover:bg-[#F7FAFD] transition-colors"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
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

      {/* Horizontal Delivery process map */}
      <section ref={processRef} className="py-20 bg-white border-t border-gray-200/60 overflow-hidden">
        <div className="container px-4">
          <div className="section-title text-center max-w-[650px] mx-auto mb-16">
            <span className="text-xs font-bold text-[#1E7FD4] uppercase tracking-widest mb-2 block">
              OUR PROVEN DELIVERY PROCESS
            </span>
            <h2 className="display-6 fw-extrabold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
              From your first idea to a successful launch
            </h2>
          </div>

          <div className="relative py-10">
            {/* SVG Connecting Journey path line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0">
              {isProcessInView && (
                <motion.div
                  className="h-full bg-gradient-to-r from-[#1E7FD4] via-[#A855F7] to-[#10b981]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 7, ease: "easeInOut" }}
                />
              )}
            </div>

            {/* Steps dots row layout */}
            <div className="row relative z-10 g-4 justify-between">
              {deliverySteps.map((step, idx) => {
                const isActive = idx === activeStep;
                return (
                  <div key={step.name} className="col flex flex-col items-center min-w-[100px]">
                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white border-4 border-white shadow-md transition-all"
                      style={{
                        backgroundColor: step.col
                      }}
                      animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.num}
                    </motion.div>
                    <span 
                      className="text-xs fw-extrabold mt-3 text-center transition-colors duration-300"
                      style={{ color: isActive ? step.col : '#0B1F3A' }}
                    >
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA block */}
      <section className="py-20 bg-gradient-to-br from-[#0B1F3A] to-[#1E7FD4] text-white text-center relative overflow-hidden">
        
        {/* Decorative backdrop blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#08A9E6]/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#2E9E6B]/15 rounded-full blur-[100px]" />

        <div className="container relative z-10 px-4">
          <h2 className="display-5 fw-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-rubik)' }}>
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 text-base md:text-lg mb-8 max-w-[500px] mx-auto">
            Let&apos;s build something amazing together.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/contact" 
              className="btn btn-light btn-lg rounded-pill px-5 py-3 font-bold transition-all hover:scale-102 shadow-md hover:bg-gray-50 text-[#1E7FD4]"
            >
              Get a Free Consultation
            </Link>
            <Link 
              href="/portfolio" 
              className="btn btn-outline-light btn-lg rounded-pill px-5 py-3 font-bold transition-all hover:scale-102 border-white/20 hover:bg-white/5 text-white"
            >
              View Our Portfolio
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
