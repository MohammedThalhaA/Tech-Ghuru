"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Mockup video/GIF mapping for services
const SERVICES_DATA = [
  {
    id: "01",
    title: "Web Developing",
    tagline: "High-performance websites & web applications",
    desc: "Robust, secure and lightning-fast web engineering built to scale your conversions.",
    accentColor: "#1E7FD4",
    glowColor: "rgba(30, 127, 212, 0.25)",
    videoSrc: "/services-video/web-developing.mp4",
    fallbackSrc: "/img/web-development-video.mp4",
    workflow: ["Discovery", "Wireframe", "UI Design", "Development", "Testing", "Launch"],
    benefits: ["Responsive Design", "SEO Optimized", "Fast Performance", "Secure Development", "Scalable Architecture", "Clean Code"],
    tools: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "AWS"],
    metrics: [
      { label: "Performance", value: "98%" },
      { label: "SEO Score", value: "95/100" },
      { label: "Security", value: "100%" }
    ],
    slug: "web-developing"
  },
  {
    id: "02",
    title: "Product Design",
    tagline: "User-centered designs that create impact",
    desc: "Engaging and intuitive digital prototyping focused on user experience and brand loyalty.",
    accentColor: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.25)",
    videoSrc: "/services-video/product-design.mp4",
    fallbackSrc: "/img/Services/product designgif.gif",
    workflow: ["Research", "User Flow", "Wireframe", "UI Design", "Prototype", "Handoff"],
    benefits: ["User Research", "Modern UI/UX", "Interactive Prototypes", "Design Systems", "Mobile-First", "Conversion Focused"],
    tools: ["Figma", "FigJam", "Adobe XD", "Prototyping", "Design System", "UI/UX Audit"],
    metrics: [
      { label: "UX Score", value: "9.6/10" },
      { label: "Design Quality", value: "95%" }
    ],
    slug: "product-design"
  },
  {
    id: "03",
    title: "Content Writing",
    tagline: "SEO-friendly content that ranks and converts",
    desc: "Compelling copywriting and research-based articles that establish industry authority.",
    accentColor: "#2E9E6B",
    glowColor: "rgba(46, 158, 107, 0.25)",
    videoSrc: "/services-video/content-writing.mp4",
    fallbackSrc: "/img/portfolio pics/Content-Writing-12.gif",
    workflow: ["Brief", "Research", "Outline", "Writing", "SEO Optimize", "Publish"],
    benefits: ["SEO Optimized", "Well Researched", "Original Content", "Engaging Copy", "Plagiarism Free", "On-time Delivery"],
    tools: ["SEO Writing", "Keyword Audit", "Google Docs", "Grammarly", "WordPress", "Analytics"],
    metrics: [
      { label: "SEO Score", value: "92%" },
      { label: "Readability", value: "Clear" },
      { label: "Words", value: "1,245" }
    ],
    slug: "content-writing"
  },
  {
    id: "04",
    title: "Digital Marketing",
    tagline: "Data-driven strategies that grow your business",
    desc: "Targeted campaigns, ad funnels, and search engine optimization designed to maximize ROAS.",
    accentColor: "#FF8A3D",
    glowColor: "rgba(255, 138, 61, 0.25)",
    videoSrc: "/services-video/digital-marketing.mp4",
    fallbackSrc: "/img/Services/digitalmarketgif4.gif",
    workflow: ["Audit", "Strategy", "Campaign Setup", "Execution", "Analytics", "Optimization"],
    benefits: ["SEO Optimization", "Paid Advertising", "Social Funnels", "GA4 Analytics", "Retargeting", "ROAS Target Focus"],
    tools: ["Google Ads", "Meta Ads Manager", "Google Analytics 4", "Semrush", "Tag Manager", "Mailchimp"],
    metrics: [
      { label: "ROAS ROI", value: "5.8x" },
      { label: "Cost Per Lead", value: "Low" }
    ],
    slug: "digital-marketing"
  },
  {
    id: "05",
    title: "Video Ads & Editing",
    tagline: "High-impact videos that tell your brand story",
    desc: "Stunning motion graphics and video layouts styled to seize attention and drive sales.",
    accentColor: "#ef4444",
    glowColor: "rgba(239, 68, 68, 0.25)",
    videoSrc: "/services-video/video-ads-editing.mp4",
    fallbackSrc: "/img/Services/videogif.gif",
    workflow: ["Concept", "Script", "Shoot/Source", "Editing", "Motion Graphics", "Final Video"],
    benefits: ["Creative Concepts", "Video Editing", "Motion Graphics", "Social Formats", "High Quality Output", "Fast Turnaround"],
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Cinema 4D", "Audition", "Motion Design"],
    metrics: [
      { label: "Views Index", value: "8.7/10" },
      { label: "Retention", value: "92%" },
      { label: "Watch Time", value: "2.4K h" }
    ],
    slug: "video-ads"
  },
  {
    id: "06",
    title: "Consultation",
    tagline: "Strategic guidance for your business growth",
    desc: "Rigorous market research, operations audit, and actionable blueprints to scale value.",
    accentColor: "#08A9E6",
    glowColor: "rgba(8, 169, 230, 0.25)",
    videoSrc: "/services-video/consultation.mp4",
    fallbackSrc: "/img/Services/services1.gif",
    workflow: ["Discovery Call", "Business Audit", "Analysis", "Recommendations", "Roadmap", "Support"],
    benefits: ["Business Strategy", "Market Research", "Growth Planning", "Risk Analysis", "Actionable Insights", "Long-term Support"],
    tools: ["Market Analysis", "SWOT Audits", "KPI Tracking", "Financial Model", "Process Mapping", "Roadmap Planning"],
    metrics: [
      { label: "Success Rate", value: "98%" },
      { label: "Satisfaction", value: "5 ★" }
    ],
    slug: "consultation"
  }
];

// Helper components for the listing page
function ServiceCard({ service }: { service: typeof SERVICES_DATA[0] }) {
  const [activeStage, setActiveStage] = useState(0);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  useEffect(() => {
    // Respect user's preferences-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setActiveStage(3); // Stay on Development/UI Design static highlight
      return;
    }

    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % service.workflow.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [service.workflow.length]);

  return (
    <motion.div
      ref={cardRef}
      className="col-12 mb-5"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white border border-[#1E7FD4]/10 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
        {/* Subtle accent glow backdrops */}
        <div 
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[80px] -z-10 transition-colors"
          style={{ backgroundColor: service.accentColor + '10' }}
        />

        <div className="row g-5 align-items-center">
          {/* Card Left: Content, Workflow & Tools */}
          <div className="col-lg-6 flex flex-col justify-between h-full">
            <div>
              {/* Badge & Title */}
              <div className="flex items-center gap-3.5 mb-4">
                <span 
                  className="font-mono text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: service.accentColor + '15', color: service.accentColor }}
                >
                  {service.id}
                </span>
                <h3 className="h3 fw-extrabold text-[#0B1F3A] mb-0" style={{ fontFamily: 'var(--font-rubik)' }}>
                  {service.title}
                </h3>
              </div>

              <p className="text-muted text-base mb-6 leading-relaxed">
                <strong className="text-[#0B1F3A] block mb-1 text-sm font-semibold">{service.tagline}</strong>
                {service.desc}
              </p>

              {/* Animated Workflow Strip */}
              <div className="mb-8">
                <h5 className="text-[11px] font-bold text-[#0B1F3A]/50 uppercase tracking-widest mb-3.5">
                  Delivery Workflow
                </h5>
                <div className="flex items-center justify-between gap-1 overflow-x-auto pb-3 -mx-2 px-2 scrollbar-thin">
                  {service.workflow.map((stage, idx) => {
                    const isActive = idx === activeStage;
                    return (
                      <div key={stage} className="flex items-center flex-1 min-w-[75px] relative">
                        {/* Connecting track line */}
                        {idx < service.workflow.length - 1 && (
                          <div className="absolute top-[14px] left-[55%] right-0 h-0.5 bg-gray-100 z-0">
                            <motion.div 
                              className="h-full" 
                              style={{ backgroundColor: service.accentColor }}
                              initial={{ width: "0%" }}
                              animate={isActive ? { width: "100%" } : { width: "0%" }}
                              transition={{ duration: 2.8, ease: "linear" }}
                            />
                          </div>
                        )}

                        <div className="flex flex-col items-center z-10 w-full">
                          <motion.div
                            className="w-7.5 h-7.5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all"
                            style={{
                              borderColor: isActive ? service.accentColor : '#E5E7EB',
                              backgroundColor: isActive ? service.accentColor : '#FFFFFF',
                              color: isActive ? '#FFFFFF' : '#9CA3AF',
                              boxShadow: isActive ? `0 0 10px ${service.glowColor}` : 'none'
                            }}
                            animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {idx + 1}
                          </motion.div>
                          <span 
                            className="text-[9px] font-bold mt-2 text-center truncate w-full"
                            style={{ color: isActive ? service.accentColor : '#9CA3AF' }}
                          >
                            {stage}
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
                  {service.tools.map((tool) => (
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
                {service.benefits.map((benefit) => (
                  <div key={benefit} className="col-sm-6 flex items-center gap-2 text-xs text-[#0B1F3A]/85">
                    <i className="fas fa-check-circle text-[#2E9E6B] text-[13px]"></i>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* View detail button */}
              <div className="mt-8">
                <Link 
                  href={service.slug === "consultation" ? "/consolation" : `/services/${service.slug}`}
                  className="btn btn-primary rounded-pill px-5 py-2.5 font-bold transition-all hover:scale-[1.02] shadow-sm flex items-center gap-2 w-fit text-sm"
                  style={{ backgroundColor: '#1E7FD4', borderColor: '#1E7FD4' }}
                >
                  Explore Page <i className="fas fa-arrow-right text-[10px]"></i>
                </Link>
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
                    atriowings.in/{service.slug}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-muted-foreground font-bold tracking-wider">
                  SAMPLE DEMO
                </span>
              </div>

              {/* Loop Video/GIF Visual demonstration block */}
              <div className="relative h-[230px] rounded-xl overflow-hidden bg-black/5 flex items-center justify-center shadow-sm">
                <video
                  src={service.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to project video or GIF if services-video folder isn't populated
                    const target = e.target as HTMLVideoElement;
                    if (target.src !== service.fallbackSrc) {
                      target.src = service.fallbackSrc;
                    }
                  }}
                />
                
                {/* Scanline CRT layout */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-[0.15]" />
              </div>

              {/* Metrics overlays */}
              <div className="flex items-center justify-around gap-2 mt-4 pt-3 border-t border-gray-200/60">
                {service.metrics.map((metric) => (
                  <div key={metric.label} className="text-center flex-1">
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wider block">
                      {metric.label}
                    </span>
                    <span 
                      className="text-sm font-extrabold block mt-0.5"
                      style={{ color: service.accentColor }}
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
    </motion.div>
  );
}

export default function Page() {
  const [activeStep, setActiveStep] = useState(0);
  const featuresRef = useRef(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });

  const processRef = useRef(null);
  const isProcessInView = useInView(processRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 7);
    }, 3000);
    return () => clearInterval(interval);
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
    <div className="bg-[#F7FAFD] min-vh-100 text-[#0B1F3A] overflow-x-hidden font-sans relative">
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
      <section className="py-20 md:py-28 relative z-10">
        <div className="container px-4">
          <div className="row g-5 align-items-center">
            
            {/* Left side text intro */}
            <div className="col-lg-6">
              <span className="inline-block bg-[#1E7FD4]/10 border border-[#1E7FD4]/30 text-[#1E7FD4] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                HOW WE DELIVER EXCELLENCE
              </span>
              <h1 className="display-4 fw-extrabold text-[#0B1F3A] leading-tight mb-4" style={{ fontFamily: 'var(--font-rubik)' }}>
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

      {/* Grid containing the Six Service Showcase Cards */}
      <section className="py-12 md:py-20 bg-white border-y border-gray-200/50">
        <div className="container px-4">
          <div className="section-title text-center max-w-[650px] mx-auto mb-16">
            <span className="text-xs font-bold text-[#1E7FD4] uppercase tracking-widest mb-2 block">
              OUR CORE ROLES
            </span>
            <h2 className="display-6 fw-extrabold text-[#0B1F3A]" style={{ fontFamily: 'var(--font-rubik)' }}>
              Explore Our Expertise
            </h2>
            <p className="text-muted mt-2">
              From coding to consulting, see the exact workflow and technology stacks we deploy to build premium solutions.
            </p>
          </div>

          <div className="row">
            {SERVICES_DATA.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
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
                  ATRIOWINGS GURANTEES
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
                  {["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Figma", "Adobe XD", "Google Ads", "Meta Ads", "SEO", "Analytics", "Premiere Pro", "After Effects"].map((tech) => (
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
