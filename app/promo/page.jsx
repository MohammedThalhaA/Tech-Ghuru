"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Local dataset for the 6 services matching the showcase cards of third image
const showcaseServices = [
  {
    id: "01",
    title: "Web Developing",
    tagline: "High-performance websites & web applications",
    desc: "Robust, secure and lightning-fast web engineering built to scale your conversions.",
    accentColor: "#1E7FD4",
    glowColor: "rgba(30, 127, 212, 0.25)",
    videoSrc: "/img/web-development-video.mp4",
    visualType: "web",
    workflow: [
      { number: "01", title: "Discovery", desc: "Analyzing target audience and core requirements." },
      { number: "02", title: "Wireframe", desc: "Structuring UI layout boxes." },
      { number: "03", title: "UI Design", desc: "Applying colored themes and UI mockups." },
      { number: "04", title: "Development", desc: "Writing clean React and backend code." },
      { number: "05", title: "Testing", desc: "Auditing page loading speed and security." },
      { number: "06", title: "Launch", desc: "Production compilation and deployment." }
    ],
    tools: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "AWS"],
    metrics: [
      { label: "Performance", value: "98%" },
      { label: "SEO Score", value: "95/100" },
      { label: "Security", value: "100%" }
    ],
    link: "/services/web-developing"
  },
  {
    id: "02",
    title: "Product Design",
    tagline: "User-centered designs that create impact",
    desc: "Engaging and intuitive digital prototyping focused on user experience and brand loyalty.",
    accentColor: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.25)",
    videoSrc: "/img/Services/product designgif.gif",
    visualType: "design",
    workflow: [
      { number: "01", title: "Research", desc: "Interviews and persona modeling." },
      { number: "02", title: "User Flow", desc: "Mapping visual interaction pathways." },
      { number: "03", title: "Wireframe", desc: "Designing low-fidelity screens." },
      { number: "04", title: "UI Design", desc: "Constructing final colored UI themes." },
      { number: "05", title: "Prototype", desc: "Wiring screen connectors." },
      { number: "06", title: "Handoff", desc: "Exporting development assets." }
    ],
    tools: ["Figma", "FigJam", "Adobe XD", "Prototyping", "Design System", "UI/UX Audit"],
    metrics: [
      { label: "UX Score", value: "9.6/10" },
      { label: "Design Quality", value: "95%" }
    ],
    link: "/services/product-design"
  },
  {
    id: "03",
    title: "Content Writing",
    tagline: "SEO-friendly content that ranks and converts",
    desc: "Compelling copywriting and research-based articles that establish industry authority.",
    accentColor: "#2E9E6B",
    glowColor: "rgba(46, 158, 107, 0.25)",
    videoSrc: "/img/portfolio pics/Content-Writing-12.gif",
    visualType: "content",
    workflow: [
      { number: "01", title: "Brief", desc: "Defining target audience and keywords goal." },
      { number: "02", title: "Research", desc: "Auditing competitor search volume keywords." },
      { number: "03", title: "Outline", desc: "Structuring header tags and section goals." },
      { number: "04", title: "Writing", desc: "Drafting high-quality paragraphs." },
      { number: "05", title: "SEO Optimize", desc: "Validating keyword density." },
      { number: "06", title: "Publish", desc: "Exporting copy to WordPress live." }
    ],
    tools: ["SEO Writing", "Keyword Audit", "Google Docs", "Grammarly", "WordPress", "Analytics"],
    metrics: [
      { label: "SEO Score", value: "92%" },
      { label: "Readability", value: "Clear" },
      { label: "Words", value: "1,245" }
    ],
    link: "/services/content-writing"
  },
  {
    id: "04",
    title: "Digital Marketing",
    tagline: "Data-driven strategies that grow your business",
    desc: "Targeted advertising and sales funnels designed to maximize conversion ROI and brand awareness.",
    accentColor: "#FF8A3D",
    glowColor: "rgba(255, 138, 61, 0.25)",
    videoSrc: "/img/Services/digitalmarketgif4.gif",
    visualType: "marketing",
    workflow: [
      { number: "01", title: "Audit", desc: "Auditing competitor spend data." },
      { number: "02", title: "Strategy", desc: "Mapping target marketing channels." },
      { number: "03", title: "Campaign Setup", desc: "Setting pixel tracking codes." },
      { number: "04", title: "Execution", desc: "Launching Facebook and Google ad platforms." },
      { number: "05", title: "Analytics", desc: "Monitoring leads count." },
      { number: "06", title: "Optimization", desc: "Scaling target campaign ROAS." }
    ],
    tools: ["Google Ads", "Meta Ads", "SEO", "Analytics", "Email Marketing", "Remarketing"],
    metrics: [
      { label: "ROI Target", value: "4.6x ROAS" },
      { label: "Conversions", value: "Excellent" }
    ],
    link: "/services/digital-marketing"
  },
  {
    id: "05",
    title: "Video Ads & Editing",
    tagline: "High-impact videos that tell your brand story",
    desc: "Stunning animation reels, product video ads, and color-graded clips tailored to social platforms.",
    accentColor: "#ef4444",
    glowColor: "rgba(239, 68, 68, 0.25)",
    videoSrc: "/img/Services/videogif.gif",
    visualType: "video",
    workflow: [
      { number: "01", title: "Concept", desc: "Drafting script storyboards." },
      { number: "02", title: "Script", desc: "Writing voiceover text dialogues." },
      { number: "03", title: "Shoot", desc: "Collecting assets and raw clips." },
      { number: "04", title: "Editing", desc: "Splitting timelines and sound tracks." },
      { number: "05", title: "Motion Graphics", desc: "Applying overlay titles." },
      { number: "06", title: "Final Video", desc: "Production rendering and delivery." }
    ],
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Motion Graphics", "Color Grading", "Sound Design"],
    metrics: [
      { label: "Output Quality", value: "8.7/10" },
      { label: "Retention Rate", value: "92%" }
    ],
    link: "/services/video-ads"
  },
  {
    id: "06",
    title: "Consultation",
    tagline: "Strategic guidance for your business growth",
    desc: "Integrative roadmaps, operation audits, and project scoping coordinates led by engineering leads.",
    accentColor: "#08A9E6",
    glowColor: "rgba(8, 169, 230, 0.25)",
    videoSrc: "/img/Services/services1.gif",
    visualType: "consultation",
    workflow: [
      { number: "01", title: "Discovery Call", desc: "Logging initial scope parameters." },
      { number: "02", title: "Business Audit", desc: "Auditing system operations." },
      { number: "03", title: "Analysis", desc: "Populating operational metrics gaps." },
      { number: "04", title: "Recommendations", desc: "Drafting growth recommendations." },
      { number: "05", title: "Roadmap", desc: "Mapping engineering scale timeline." },
      { number: "06", title: "Support", desc: "Coordinating post-delivery checkups." }
    ],
    tools: ["Business Strategy", "Market Research", "Growth Planning", "Risk Analysis", "Action Plan", "Long-term Support"],
    metrics: [
      { label: "Success Rate", value: "98%" },
      { label: "Action Roadmap", value: "Verified" }
    ],
    link: "/consolation"
  }
];

// Single card timeline simulation player
function ShowcaseCard({ card }) {
  const [showcaseStage, setShowcaseStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowcaseStage((prev) => (prev + 1) % card.workflow.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [card.workflow.length]);

  const renderCardMockup = (type, stage) => {
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
          <div className="row g-2 h-full">
            <div className="col-5 h-full">
              <div className="bg-[#081225] border border-white/5 rounded-xl p-2.5 h-[175px] font-mono text-[7px] text-blue-400 overflow-hidden leading-relaxed">
                <div className="flex items-center gap-1 border-b border-white/5 pb-1 mb-1">
                  <span className="text-[7px] text-white/45">index.tsx</span>
                </div>
                <p className="text-white/40">// Step: {card.workflow[stage]?.title}</p>
                <p className="text-yellow-300">import &#123; createWidget &#125; from &apos;core&apos;;</p>
                <p className="text-purple-300">&lt;div className=&quot;grid&quot;&gt;</p>
                <p className="pl-2 text-white">&lt;Navbar /&gt;</p>
                <p className="pl-2 text-[#08A9E6]">&lt;Hero /&gt;</p>
                <p className="text-purple-300">&lt;/div&gt;</p>
              </div>
            </div>
            <div className="col-7 h-full">
              <div className="relative h-[175px] rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-md">
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
                    alt="Showcase visual"
                  />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-[0.12]" />
              </div>
            </div>
          </div>
        );

      case 'design':
        return (
          <div className="row g-2 h-full">
            <div className="col-4 h-full">
              <div className="bg-[#0c1322] border border-white/5 rounded-xl p-2.5 h-[175px] text-white/50 text-[7px] overflow-hidden">
                <span className="text-[6px] uppercase tracking-wider text-muted-foreground block mb-2 font-bold font-mono">LAYERS / FigJam</span>
                <div className="space-y-1">
                  <div className={`p-1 rounded ${stage >= 0 ? 'text-purple-400 font-bold bg-purple-50/10' : ''}`}>✔ Research</div>
                  <div className={`p-1 rounded ${stage >= 2 ? 'text-purple-400 font-bold bg-purple-50/10' : ''}`}>✔ Wireframes</div>
                  <div className={`p-1 rounded ${stage >= 3 ? 'text-purple-400 font-bold bg-purple-50/10' : ''}`}>✔ High-Fi UI</div>
                  <div className={`p-1 rounded ${stage >= 4 ? 'text-purple-400 font-bold bg-purple-50/10' : ''}`}>✔ Prototypes</div>
                </div>
              </div>
            </div>
            <div className="col-8 h-full">
              <div className="relative h-[175px] rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-md">
                <img
                  src={mediaSrc}
                  className="w-full h-full object-cover"
                  alt="Design visual"
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-[0.12]" />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full">
            <div className="relative h-[175px] rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-md">
              <img
                src={mediaSrc}
                className="w-full h-full object-cover"
                alt="Showcase visual"
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-[0.12]" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="col-lg-6">
      <div className="bg-white border border-[#1E7FD4]/10 rounded-3xl p-5 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between">
        
        {/* Card Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="bg-[#1E7FD4]/10 text-[#1E7FD4] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {card.id}
            </span>
            <h3 className="h5 fw-extrabold text-[#0B1F3A] mt-2 mb-1">{card.title}</h3>
            <p className="text-muted text-[11px] mb-0">{card.tagline}</p>
          </div>
        </div>

        {/* Horizontal Timeline flow */}
        <div className="relative py-3.5 mb-5 border-y border-gray-100/60">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
          <div className="row relative z-10 g-0 justify-between">
            {card.workflow.map((step, idx) => {
              const isActive = idx === showcaseStage;
              return (
                <div 
                  key={step.title} 
                  className="col flex flex-col items-center cursor-pointer"
                  onClick={() => setShowcaseStage(idx)}
                >
                  <div
                    className="w-7.5 h-7.5 rounded-full flex items-center justify-center font-bold text-[9px] border bg-white shadow-sm transition-all"
                    style={{
                      borderColor: isActive ? card.accentColor : '#E5E7EB',
                      color: isActive ? '#FFFFFF' : '#9CA3AF',
                      backgroundColor: isActive ? card.accentColor : '#FFFFFF'
                    }}
                  >
                    {step.number}
                  </div>
                  <span 
                    className="text-[8px] font-bold mt-1 text-center transition-colors block truncate max-w-[65px]"
                    style={{ color: isActive ? card.accentColor : '#0B1F3A' }}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mockup Dashboard */}
        <div className="row g-3 align-items-stretch">
          <div className="col-9">
            <div className="border border-gray-200/80 rounded-2xl p-3 bg-[#F7FAFD] shadow-inner h-full flex flex-col justify-between">
              
              <div className="flex items-center justify-between border-b border-gray-200 pb-1.5 mb-2.5">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  <span className="text-[8px] text-muted-foreground ml-2 font-mono">atriowings.in/{card.visualType}</span>
                </div>
                <span className="text-[7px] font-mono text-muted-foreground font-bold tracking-wider">● LIVE PREVIEW</span>
              </div>

              <div className="h-[180px] overflow-hidden">
                {renderCardMockup(card.visualType, showcaseStage)}
              </div>

            </div>
          </div>

          <div className="col-3 flex flex-col justify-between">
            <div className="bg-white border border-gray-200/70 rounded-xl p-3 shadow-sm h-full flex flex-col justify-around text-center">
              {card.metrics.map((Stat) => (
                <div key={Stat.label} className="border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                  <span className="text-[8px] text-muted-foreground uppercase font-bold tracking-wider block">{Stat.label}</span>
                  <span className="text-sm font-extrabold block mt-0.5" style={{ color: card.accentColor }}>{Stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech stack badges */}
        <div className="border-t border-gray-100 pt-4 mt-5">
          <span className="text-[8px] text-muted-foreground uppercase tracking-wider block mb-2 font-bold font-mono">Technologies</span>
          <div className="flex flex-wrap gap-1.5">
            {card.tools.map((tech) => (
              <span 
                key={tech} 
                className="bg-[#F7FAFD] border border-gray-200/60 text-[9px] text-[#0B1F3A] px-2.5 py-1 rounded font-bold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Link to the details */}
        <div className="mt-4 pt-1 flex justify-end">
          <Link 
            href={card.link}
            className="btn btn-sm rounded-pill font-bold py-1.5 px-4 text-xs transition-all text-white shadow-sm flex items-center gap-1.5 hover:scale-102"
            style={{ backgroundColor: card.accentColor }}
          >
            Explore Landing Flow <i className="fas fa-arrow-right text-[9px]"></i>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function PromoPage() {
  const processRef = useRef(null);
  const isProcessInView = useInView(processRef, { once: true, margin: "-100px" });

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 7);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const deliverySteps = [
    { num: "01", name: "Understand", col: "#1E7FD4" },
    { num: "02", name: "Plan", col: "#FF8A3D" },
    { num: "03", name: "Design", col: "#A855F7" },
    { num: "04", name: "Develop", col: "#2E9E6B" },
    { num: "05", name: "Test", col: "#ef4444" },
    { num: "06", name: "Launch", col: "#08A9E6" },
    { num: "07", name: "Support", col: "#0B1F3A" }
  ];

  return (
    <div className="bg-[#F7F5F0] overflow-x-hidden w-full relative">
      <Topbar />
      <Navbar />

      {/* Hero Banner Showcase Intro */}
      <section className="relative bg-gradient-to-b from-[#0B1F3A] to-[#0f2d54] text-white pt-28 pb-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,127,212,0.18),rgba(255,255,255,0))]"></div>
        <div className="container relative z-10 px-4 text-center">
          <span className="inline-block bg-[#1E7FD4]/20 border border-[#1E7FD4]/40 text-[#08A9E6] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
            PROMOTIONAL SHOWCASE
          </span>
          <h1 className="display-4 fw-extrabold text-white mb-4 tracking-tight leading-tight max-w-[800px] mx-auto" style={{ fontFamily: 'var(--font-rubik)' }}>
            Animated Service Delivery Showcase
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-0 leading-relaxed max-w-[650px] mx-auto">
            Explore how we turn your ideas into powerful digital solutions through our structured, transparent and result-driven process.
          </p>
        </div>
      </section>

      {/* Feature Guarantee Strip */}
      <section className="py-8 bg-white border-y border-gray-150/40">
        <div className="container px-4">
          <div className="flex flex-wrap items-center justify-around gap-6 text-center">
            {[
              { icon: "fa-project-diagram", label: "Interactive Simulation" },
              { icon: "fa-eye", label: "Real-time Preview" },
              { icon: "fa-lock", label: "Transparent Process" },
              { icon: "fa-check-circle", label: "Quality Assured" },
              { icon: "fa-shipping-fast", label: "On-time Delivery" }
            ].map((feat) => (
              <div key={feat.label} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#1E7FD4]/10 flex items-center justify-center text-[#1E7FD4] text-sm">
                  <i className={`fas ${feat.icon}`}></i>
                </div>
                <span className="text-xs font-bold text-[#0B1F3A]">{feat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Symmetrical Grid of 6 cards */}
      <section className="py-20 bg-[#F7F5F0]">
        <div className="container px-4">
          <div className="row g-5">
            {showcaseServices.map((card) => (
              <ShowcaseCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* Supplemental: Why Choose AtrioWings */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="row g-5 align-items-center">
            <div className="col-lg-7">
              <span className="text-xs font-bold text-[#2E9E6B] uppercase tracking-widest mb-2.5 block">Our Advantage</span>
              <h2 className="display-6 fw-bold text-[#0B1F3A] mb-5" style={{ fontFamily: 'var(--font-rubik)' }}>
                Why Choose AtrioWings?
              </h2>
              <div className="row g-4">
                {[
                  { icon: "fa-users", title: "Expert Team", desc: "Skilled professionals with years of design and development experience.", col: "#1E7FD4" },
                  { icon: "fa-cogs", title: "Agile Process", desc: "Flexible workflows tailored to your unique requirements.", col: "#FF8A3D" },
                  { icon: "fa-lightbulb", title: "Custom Solutions", desc: "We build tailored platforms designed to scale your business.", col: "#A855F7" },
                  { icon: "fa-shield-alt", title: "Scalable & Secure", desc: "Industry best practices in secure database configs and code layouts.", col: "#2E9E6B" }
                ].map((item) => (
                  <div key={item.title} className="col-6 flex gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-base"
                      style={{ backgroundColor: item.col + '15', color: item.col }}
                    >
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <div>
                      <h4 className="text-xs fw-extrabold text-[#0B1F3A] mb-1">{item.title}</h4>
                      <p className="text-muted text-[10px] leading-relaxed mb-0">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-5">
              <div className="bg-gradient-to-tr from-[#0B1F3A] to-[#1E7FD4] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[350px]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_120%_-20%,rgba(255,255,255,0.1),rgba(255,255,255,0))]"></div>
                <div>
                  <h3 className="h5 fw-extrabold mb-5 tracking-wide uppercase text-white/60">Milestones</h3>
                  <div className="row g-3">
                    {[
                      { num: "6+", label: "Core Services" },
                      { num: "150+", label: "Projects Delivered" },
                      { num: "98%", label: "Satisfaction Rate" },
                      { num: "5+", label: "Years Excellence" }
                    ].map((stat) => (
                      <div key={stat.label} className="col-6">
                        <span className="text-2xl font-extrabold block text-white">{stat.num}</span>
                        <span className="text-[9px] text-white/70 uppercase tracking-widest block mt-0.5">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-white/10 pt-5 mt-5">
                  <span className="text-[9px] text-white/50 uppercase tracking-widest block mb-3">TRUSTED PARTNERS</span>
                  <div className="flex flex-wrap gap-3 items-center text-[10px] font-bold font-mono text-white/65">
                    <span>Zapier</span>
                    <span>Google</span>
                    <span>Microsoft</span>
                    <span>AWS</span>
                    <span>Meta</span>
                    <span>Stripe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supplemental: Horizontal Delivery Process Map */}
      <section ref={processRef} className="py-20 bg-white border-t border-gray-200/60 overflow-hidden">
        <div className="container px-4">
          <div className="section-title text-center max-w-[650px] mx-auto mb-16">
            <span className="text-xs font-bold text-[#1E7FD4] uppercase tracking-widest mb-2 block">
              OUR PROVEN DELIVERY PROCESS
            </span>
            <h2 className="display-6 fw-extrabold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
              From First Idea to Successful Launch
            </h2>
          </div>

          <div className="relative py-10">
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

            <div className="row relative z-10 g-4 justify-between">
              {deliverySteps.map((step, idx) => {
                const isActive = idx === activeStep;
                return (
                  <div key={step.name} className="col flex flex-col items-center min-w-[90px]">
                    <motion.div
                      className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white border-4 border-white shadow-md transition-all"
                      style={{ backgroundColor: step.col }}
                      animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                    >
                      {step.num}
                    </motion.div>
                    <span 
                      className="text-[10px] font-extrabold mt-3 text-center transition-colors"
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

      {/* Supplemental: Premium CTA block */}
      <section className="py-20 bg-gradient-to-br from-[#0B1F3A] to-[#1E7FD4] text-white text-center relative overflow-hidden">
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

      <Footer />
    </div>
  );
}
