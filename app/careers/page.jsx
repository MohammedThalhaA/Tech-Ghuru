'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { submitJobApplication } from '@/app/actions/career';
import { jobs } from '@/lib/jobs';

// Count-up helper component for stats
const CounterNumber = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;
    const totalMiliseconds = 1600;
    const stepTime = Math.max(Math.floor(totalMiliseconds / end), 12);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};



export default function CareersPage() {
  const shouldReduceMotion = useReducedMotion();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  // Application Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    linkedin: '',
    portfolio: '',
    coverLetter: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // Read search term from URL query parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const query = params.get('search');
      if (query) {
        setSearchTerm(query);
      }
    }
  }, []);

  const openModal = (job) => {
    setSelectedJob(job);
    setFormState({
      fullName: '',
      email: '',
      phone: '',
      experience: '',
      linkedin: '',
      portfolio: '',
      coverLetter: ''
    });
    setResumeFile(null);
    setSubmitResult(null);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
    document.body.style.overflow = '';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds the 5MB limit.');
        e.target.value = null;
        return;
      }
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (!['.pdf', '.doc', '.docx'].includes(ext)) {
        alert('Allowed formats: PDF, DOC, DOCX.');
        e.target.value = null;
        return;
      }
      setResumeFile(file);
    }
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      alert('Please upload your resume file.');
      return;
    }
    setSubmitting(true);
    setSubmitResult(null);
    const fd = new FormData();
    fd.append('fullName', formState.fullName);
    fd.append('email', formState.email);
    fd.append('phone', formState.phone);
    fd.append('position', selectedJob.title);
    fd.append('experience', formState.experience);
    fd.append('linkedin', formState.linkedin);
    fd.append('portfolio', formState.portfolio);
    fd.append('coverLetter', formState.coverLetter);
    fd.append('resume', resumeFile);

    const result = await submitJobApplication(fd);
    setSubmitResult(result);
    setSubmitting(false);
    if (result.success) {
      setFormState({
        fullName: '',
        email: '',
        phone: '',
        experience: '',
        linkedin: '',
        portfolio: '',
        coverLetter: ''
      });
      setResumeFile(null);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === "All" || job.dept === selectedDept;
    const matchesLocation = selectedLocation === "All" || job.location.includes(selectedLocation);
    const matchesType = selectedType === "All" || job.type === selectedType;
    return matchesSearch && matchesDept && matchesLocation && matchesType;
  });

  // Animation variants
  const faderVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const wordContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const roleCardVariants = {
    hidden: { 
      opacity: 0, 
      x: shouldReduceMotion ? 0 : -60, // left to right
      y: shouldReduceMotion ? 0 : -40  // top to bottom
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 70, 
        damping: 15,
        duration: 0.8
      } 
    }
  };

  const staggerContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  const planeVariants = {
    hidden: { x: "10%", opacity: 0, rotate: 0 },
    visible: {
      x: "90%",
      opacity: [0, 1, 1, 0],
      rotate: [0, 0, 0, 0],
      transition: { 
        duration: 1.8, 
        ease: "easeInOut",
        times: [0, 0.1, 0.9, 1]
      }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: { 
        delay: i * 0.35, 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }
    })
  };

  return (
    <>
      <link href="/css/style.css" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .bg-light-primary {
          background-color: rgba(6, 163, 218, 0.08);
        }
        .careers-badge {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(6, 163, 218, 0.1);
          color: #06a3da;
          border: 1px solid rgba(6, 163, 218, 0.2);
          border-radius: 50px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }
        .hero-floating-circle {
          position: absolute;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          z-index: 10;
        }
        .careers-stat-card {
          background: white;
          border-radius: 16px;
          padding: 20px 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
          border: 1px solid #f1f5f9;
          text-align: center;
          transition: transform 200ms ease;
        }
        .careers-stat-card:hover {
          transform: translateY(-4px);
        }
        .careers-stat-icon {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(6, 163, 218, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px auto;
          font-size: 16px;
          color: #06a3da;
        }
        .careers-why-card {
          background: white;
          border-radius: 16px;
          padding: 30px 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
          border: 1.5px solid #f1f5f9;
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
          height: 100%;
        }
        .careers-why-card:hover {
          transform: translateY(-4px);
          border-color: #2E9E6B !important;
          box-shadow: 0 4px 15px rgba(46, 158, 107, 0.15) !important;
        }
        .careers-why-icon {
          width: 55px;
          height: 55px;
          border-radius: 12px;
          background: rgba(6, 163, 218, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          color: #06a3da;
          margin-bottom: 20px;
          transition: background-color 180ms ease, color 180ms ease;
        }
        .careers-why-card:hover .careers-why-icon {
          background-color: rgba(46, 158, 107, 0.1);
          color: #2E9E6B;
        }
        .careers-life-photo {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .careers-life-photo:hover {
          transform: scale(1.03) !important;
        }
        .careers-position-card {
          background: white;
          border-radius: 20px;
          padding: 35px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
          border: 1.5px solid #f1f5f9;
          transition: border-color 250ms ease, box-shadow 250ms ease;
          height: 100%;
          position: relative;
        }
        .careers-position-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          margin-bottom: 20px;
        }
        .careers-step-card {
          background: white;
          border-radius: 20px;
          padding: 30px 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          border: 1px solid #f1f5f9;
          text-align: center;
          z-index: 2;
          position: relative;
          height: 100%;
        }
        .careers-step-circle {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: white;
          border: 3px solid #06a3da;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 800;
          color: #06a3da;
          margin: -58px auto 20px auto;
          box-shadow: 0 5px 15px rgba(6, 163, 218, 0.15);
          z-index: 10;
          position: relative;
        }
        .careers-step-icon {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(6, 163, 218, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px auto;
          font-size: 16px;
          color: #06a3da;
        }
        .careers-perk-card {
          background: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.02);
          border: 1px solid #f1f5f9;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          transition: transform 200ms ease, box-shadow 200ms ease;
          height: 100%;
        }
        .careers-perk-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.05);
        }
        .careers-perk-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(6, 163, 218, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #06a3da;
          flex-shrink: 0;
        }
        @keyframes textGlowPulse {
          0%   { text-shadow: 0 0 0px rgba(6, 163, 218, 0);    color: #091E3E; }
          50%  { text-shadow: 0 0 20px rgba(6, 163, 218, 0.45); color: #06a3da; }
          100% { text-shadow: 0 0 0px rgba(6, 163, 218, 0);    color: #091E3E; }
        }
        @keyframes textOpacityPulse {
          0%   { opacity: 0.75; color: #06a3da; }
          50%  { opacity: 1;    color: #0dcaf0; }
          100% { opacity: 0.75; color: #06a3da; }
        }
        .glow-pulse-text {
          animation: textGlowPulse 4s infinite ease-in-out;
        }
        .opacity-pulse-text {
          animation: textOpacityPulse 3s infinite ease-in-out;
        }
        .careers-hero-section {
          padding-top: 100px !important;
        }
        @media (min-width: 992px) {
          .careers-hero-section {
            padding-top: 150px !important;
          }
        }
        @media (max-width: 576px) {
          .careers-perk-card {
            flex-direction: column !important;
            gap: 12px !important;
            padding: 20px !important;
            align-items: flex-start !important;
          }
          .careers-stat-card {
            padding: 12px 6px !important;
          }
          .careers-stat-card h3 {
            font-size: 1.25rem !important;
          }
          .careers-stat-card p {
            font-size: 11px !important;
          }
          .careers-why-card {
            padding: 20px !important;
          }
          .careers-position-card {
            padding: 24px !important;
          }
          .careers-step-card {
            padding: 24px 16px !important;
          }
          .careers-badge {
            padding: 6px 12px !important;
            font-size: 11px !important;
            margin-bottom: 12px !important;
          }
        }

        /* Floating animations & Interactive details */
        @keyframes floatEffect {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .floating-hero-image {
          animation: floatEffect 6s ease-in-out infinite;
        }
        .floating-badge-1 {
          animation: floatEffect 4.5s ease-in-out infinite;
        }
        .floating-badge-2 {
          animation: floatEffect 5.2s ease-in-out infinite alternate;
        }
        .glass-badge {
          background: rgba(255, 255, 255, 0.75) !important;
          backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(255, 255, 255, 0.5) !important;
          border-radius: 16px !important;
          padding: 12px 18px !important;
          box-shadow: 0 8px 32px rgba(6, 163, 218, 0.1) !important;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 20;
          transition: all 0.3s ease;
        }
        .glass-badge:hover {
          transform: scale(1.05) translateY(-3px) !important;
          box-shadow: 0 12px 40px rgba(6, 163, 218, 0.15) !important;
          background: rgba(255, 255, 255, 0.85) !important;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @media (max-width: 575.98px) {
          .glass-badge {
            padding: 8px 12px !important;
          }
          .floating-badge-1 {
            left: 5px !important;
            top: 10px !important;
          }
          .floating-badge-2 {
            right: 5px !important;
            bottom: 10px !important;
          }
        }
      ` }} />

      <Topbar />
      <Navbar />

      <main style={{ backgroundColor: '#F1F4F8' }}>
        
        {/* Section 1: HERO */}
        <section className="careers-hero-section py-5 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f4f8 0%, #ffffff 100%)', minHeight: '92vh', display: 'flex', alignItems: 'center', paddingTop: '150px' }}>
          {/* Animated decorative shapes */}
          <div className="position-absolute d-none d-lg-block" style={{ width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6, 163, 218, 0.05) 0%, transparent 70%)', top: '-100px', right: '-100px' }} />
          <div className="position-absolute d-none d-lg-block" style={{ width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(46, 158, 107, 0.04) 0%, transparent 70%)', bottom: '-50px', left: '-50px' }} />

          <div className="container position-relative z-3">
            <div className="row align-items-center g-5">
              
              {/* Left Column Text Content */}
              <div className="col-lg-6">
                
                {/* Eyebrow Label */}
                <motion.span 
                  className="careers-badge"
                  variants={faderVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                >
                  Careers at Atriowings
                </motion.span>

                {/* Headline Staggered word-by-word */}
                <motion.h1 
                  className="display-4 fw-extrabold text-dark mb-4" 
                  style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1.15 }}
                  variants={wordContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {["Build", "Your", "Future", "With", "Atriowings"].map((word, i) => {
                    const isAtriowings = word === "Atriowings";
                    return (
                      <motion.span
                        key={i}
                        variants={wordVariants}
                        className={isAtriowings ? "text-primary" : ""}
                        style={{ display: "inline-block", marginRight: "12px" }}
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </motion.h1>

                {/* Description Fades Up */}
                <motion.p 
                  className="lead text-muted mb-4"
                  style={{ fontSize: '1.15rem' }}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.55, duration: 0.6 }}
                >
                  Join a passionate team of innovators, creators and problem solvers. Let's build technology that empowers businesses and touches millions of lives.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div 
                  className="d-flex flex-wrap gap-3 mb-5"
                  variants={staggerContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.a 
                    href="#open-positions" 
                    className="btn btn-primary py-3 px-4 rounded-pill fw-bold text-white shadow-sm"
                    variants={fadeUpVariants}
                    transition={{ delay: 0.75 }}
                  >
                    View Open Positions <i className="fas fa-arrow-right ms-2"></i>
                  </motion.a>
                  
                  <motion.a 
                    href="#closing-cta" 
                    className="btn btn-outline-primary py-3 px-4 rounded-pill fw-bold border-2"
                    variants={fadeUpVariants}
                    transition={{ delay: 0.85 }}
                  >
                    Send Your Resume <i className="far fa-paper-plane ms-2"></i>
                  </motion.a>
                </motion.div>

                {/* Stats Row */}
                <div className="row g-4">
                  {[
                    { value: "50", label: "Team Members", suffix: "+", icon: "fa-user-friends" },
                    { value: "25", label: "Projects Delivered", suffix: "+", icon: "fa-briefcase" },
                    { value: "5", label: "Countries Served", suffix: "+", icon: "fa-globe" },
                    { value: "100", label: "Passion & Dedication", suffix: "%", icon: "fa-shield-alt" }
                  ].map((stat, idx) => (
                    <div key={idx} className="col-6 col-sm-3">
                      <div className="careers-stat-card">
                        <div className="careers-stat-icon"><i className={`fas ${stat.icon}`}></i></div>
                        <h4 className="fw-bold mb-1 text-dark" style={{ fontFamily: 'var(--font-rubik)' }}>
                          <CounterNumber value={stat.value} suffix={stat.suffix} />
                        </h4>
                        <small className="text-muted d-block" style={{ fontSize: '11px', lineHeight: 1.2 }}>{stat.label}</small>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column Tech Illustration */}
              <div className="col-lg-6 position-relative text-center">
                
                {/* Floating Vector Lines & Icons */}
                <motion.div 
                  className="hero-floating-circle d-none d-lg-flex"
                  style={{ top: '10%', right: '15%' }}
                  animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <i className="fas fa-desktop"></i>
                </motion.div>

                <motion.div 
                  className="hero-floating-circle d-none d-lg-flex"
                  style={{ top: '35%', left: '5%' }}
                  animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <i className="fas fa-code text-success" style={{ color: '#2E9E6B' }}></i>
                </motion.div>

                <motion.div 
                  className="hero-floating-circle d-none d-lg-flex"
                  style={{ bottom: '20%', right: '10%' }}
                  animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <i className="fas fa-database text-warning"></i>
                </motion.div>

                <motion.div 
                  className="hero-floating-circle d-none d-lg-flex"
                  style={{ bottom: '45%', right: '0%' }}
                  animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <i className="fas fa-lightbulb text-info"></i>
                </motion.div>

                {/* Main Illustration Photo Wrapper */}
                <div className="position-relative d-inline-block floating-hero-image" style={{ maxWidth: '90%', zIndex: 5 }}>
                  
                  {/* Glassmorphic Badge 1 */}
                  <div 
                    className="glass-badge position-absolute floating-badge-1" 
                    style={{ top: '30px', left: '-30px' }}
                  >
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '36px', height: '36px' }}>
                      <i className="fas fa-users" style={{ fontSize: '15px' }}></i>
                    </div>
                    <div className="text-start">
                      <span className="fw-extrabold text-dark d-block" style={{ fontSize: '14px', fontWeight: 800 }}>50+</span>
                      <small className="text-muted" style={{ fontSize: '10px' }}>Team Innovators</small>
                    </div>
                  </div>

                  {/* Glassmorphic Badge 2 */}
                  <div 
                    className="glass-badge position-absolute floating-badge-2" 
                    style={{ bottom: '30px', right: '-20px' }}
                  >
                    <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '36px', height: '36px', backgroundColor: '#06a3da' }}>
                      <i className="fas fa-paper-plane" style={{ fontSize: '14px' }}></i>
                    </div>
                    <div className="text-start">
                      <span className="fw-extrabold text-dark d-block" style={{ fontSize: '14px', fontWeight: 800 }}>Submit Your CV</span>
                      <small className="text-muted" style={{ fontSize: '10px' }}>Future Opportunities</small>
                    </div>
                  </div>

                  <motion.div
                    className="rounded-4 overflow-hidden shadow-lg border border-5 border-white bg-white"
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3, duration: 0.8 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                    style={{ display: 'block' }}
                  >
                    <Image 
                      src="/img/career-hero.jpg" 
                      alt="Atriowings Team Collaborating" 
                      width={500} 
                      height={375} 
                      priority
                      className="img-fluid"
                      style={{ display: 'block', height: 'auto', objectFit: 'cover' }}
                    />
                  </motion.div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Section 2: WHY JOIN ATRIOWINGS? */}
        <section className="py-5 bg-white position-relative" style={{ borderTop: '1px solid #f1f5f9' }}>
          <div className="container py-5">
            
            <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
              <motion.h5 
                className="fw-bold text-primary text-uppercase mb-2 opacity-pulse-text"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Why Atriowings
              </motion.h5>
              <motion.h2 
                className="display-5 fw-bold text-dark mb-0 glow-pulse-text"
                style={{ fontFamily: 'var(--font-nunito)' }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Why Join Atriowings?
              </motion.h2>
              {/* Animated Underline based on website theme */}
              <div className="position-relative mx-auto mt-3" style={{ width: '150px', height: '6px' }}>
                <motion.div 
                  className="position-absolute top-0 start-50 translate-middle-x bg-primary" 
                  style={{ height: '5px', borderRadius: '3px', width: '100%', originX: 0.5 }}
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
                      "0 0 4px #fff, 0 0 10px #06a3da",
                      "0 0 1px #fff, 0 0 2px #06a3da",
                      "0 0 4px #fff, 0 0 10px #06a3da"
                    ]
                  }}
                  transition={{
                    left: { duration: 4, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              </div>
            </div>

            {/* Staggered grid cards */}
            <motion.div 
              className="row g-4"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {[
                { title: "Growth & Learning", desc: "Continuous learning opportunities to upgrade your skills and grow with the company.", icon: "fa-rocket" },
                { title: "Collaborative Culture", desc: "Work with supportive and friendly team members who value teamwork.", icon: "fa-users" },
                { title: "Innovative Environment", desc: "Explore new ideas, modern technologies and create impactful solutions.", icon: "fa-lightbulb" },
                { title: "Meaningful Impact", desc: "Work on projects that create real value for businesses and communities.", icon: "fa-bullseye" },
                { title: "Recognition", desc: "Your efforts and achievements are recognized and celebrated.", icon: "fa-trophy" },
                { title: "Work-Life Balance", desc: "We believe in balance and provide a flexible and positive work environment.", icon: "fa-balance-scale" }
              ].map((card, idx) => (
                <div key={idx} className="col-lg-4 col-md-6">
                  <motion.div 
                    className="careers-why-card"
                    variants={{
                      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 35 },
                      visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
                    }}
                  >
                    <div className="careers-why-icon"><i className={`fas ${card.icon}`}></i></div>
                    <h4 className="fw-bold mb-3 text-dark" style={{ fontFamily: 'var(--font-rubik)' }}>{card.title}</h4>
                    <p className="text-muted mb-0">{card.desc}</p>
                  </motion.div>
                </div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* Section 3: LIFE AT ATRIOWINGS */}
        <section className="py-5 position-relative overflow-hidden" style={{ backgroundColor: '#F1F4F8' }}>
          <div className="container py-5">
            <div className="row align-items-center g-5">
              
              {/* Left text column */}
              <div className="col-lg-4">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainerVariants}
                >
                  <motion.h5 
                    className="fw-bold text-primary text-uppercase mb-2 opacity-pulse-text" 
                    variants={fadeUpVariants}
                  >
                    Our Culture
                  </motion.h5>
                  <motion.h2 
                    className="display-5 fw-bold text-dark mb-4 glow-pulse-text" 
                    style={{ fontFamily: 'var(--font-nunito)' }} 
                    variants={fadeUpVariants}
                  >
                    Life at Atriowings
                  </motion.h2>
                  <motion.p className="text-muted mb-4 lead" style={{ fontSize: '1.05rem' }} variants={fadeUpVariants}>
                    We believe great work happens when great people work together in a positive, inspiring, and fun environment.
                  </motion.p>
                  <motion.a 
                    href="#open-positions" 
                    className="btn btn-outline-primary py-3 px-4 rounded-pill fw-bold border-2" 
                    variants={fadeUpVariants}
                  >
                    Explore Culture <i className="fas fa-arrow-right ms-2"></i>
                  </motion.a>
                </motion.div>
              </div>

              {/* Right photos strip */}
              <div className="col-lg-8">
                <div className="row g-3">
                  {[
                    { src: "/img/life-1.jpg", alt: "Team collaborating in office", delay: 0 },
                    { src: "/img/life-2.jpg", alt: "Relaxing in office lounge", delay: 0.1 },
                    { src: "/img/life-3.jpg", alt: "Playing office foosball", delay: 0.2 },
                    { src: "/img/life-4.jpg", alt: "Team outdoor group photo", delay: 0.3 }
                  ].map((photo, idx) => {
                    const isOdd = idx % 2 === 0;
                    return (
                      <div key={idx} className="col-sm-6">
                        <motion.div
                          className="careers-life-photo"
                          initial={{ 
                            opacity: 0, 
                            x: shouldReduceMotion ? 0 : (isOdd ? -40 : 40) 
                          }}
                          whileInView={{ 
                            opacity: 1, 
                            x: 0,
                            transition: { type: "spring", stiffness: 70, damping: 15, delay: photo.delay }
                          }}
                          viewport={{ once: true }}
                        >
                          <Image 
                            src={photo.src}
                            alt={photo.alt}
                            width={400}
                            height={300}
                            loading="lazy"
                            className="img-fluid w-100"
                            style={{ objectFit: 'cover', height: '220px', display: 'block' }}
                          />
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 4: OPEN POSITIONS */}
        <section id="open-positions" className="py-5 bg-white position-relative">
          <div className="container py-5">
            
            <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
              <motion.h5 
                className="fw-bold text-primary text-uppercase mb-2 opacity-pulse-text"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Join Us
              </motion.h5>
              <motion.h2 
                className="display-5 fw-bold text-dark mb-0 glow-pulse-text" 
                style={{ fontFamily: 'var(--font-nunito)' }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Open Positions
              </motion.h2>
              {/* Animated Underline based on website theme */}
              <div className="position-relative mx-auto mt-3" style={{ width: '150px', height: '6px' }}>
                <motion.div 
                  className="position-absolute top-0 start-50 translate-middle-x bg-primary" 
                  style={{ height: '5px', borderRadius: '3px', width: '100%', originX: 0.5 }}
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
                      "0 0 4px #fff, 0 0 10px #06a3da",
                      "0 0 1px #fff, 0 0 2px #06a3da",
                      "0 0 4px #fff, 0 0 10px #06a3da"
                    ]
                  }}
                  transition={{
                    left: { duration: 4, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              </div>
            </div>

            {/* Advanced Search & Filtering panel */}
            <div className="row g-3 mb-5 justify-content-center align-items-center">
              <div className="col-lg-4 col-md-6">
                <div className="position-relative">
                  <input 
                    type="text" 
                    className="form-control rounded-pill border-2" 
                    placeholder="Search jobs, skills or roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ borderColor: '#e2e8f0', paddingLeft: '45px', paddingTop: '12px', paddingBottom: '12px' }}
                  />
                  <i className="fas fa-search position-absolute text-muted" style={{ left: '20px', top: '50%', transform: 'translateY(-50%)' }}></i>
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <select 
                  className="form-select py-3 rounded-pill border-2" 
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  style={{ borderColor: '#e2e8f0' }}
                >
                  <option value="All">All Departments</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Product Design">Product Design</option>
                  <option value="Video Ads & Editing">Video Ads & Editing</option>
                  <option value="Content Writing">Content Writing</option>
                  <option value="Consultation">Consultation</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-6">
                <select 
                  className="form-select py-3 rounded-pill border-2" 
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  style={{ borderColor: '#e2e8f0' }}
                >
                  <option value="All">All Locations</option>
                  <option value="Chennai">Chennai, India</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-6">
                <select 
                  className="form-select py-3 rounded-pill border-2" 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={{ borderColor: '#e2e8f0' }}
                >
                  <option value="All">All Job Types</option>
                  <option value="Full Time">Full Time</option>
                </select>
              </div>
            </div>

            {/* Staggered role cards list */}
            {filteredJobs.length > 0 ? (
              <motion.div 
                key={`${selectedDept}-${selectedLocation}-${selectedType}-${searchTerm}`}
                className="row g-4"
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {filteredJobs.map((job) => (
                  <div key={job.id} className="col-lg-6">
                    <motion.div 
                      className="careers-position-card"
                      variants={roleCardVariants}
                      whileHover={{ 
                        y: -8, 
                        scale: 1.02,
                        boxShadow: '0 20px 40px rgba(6, 163, 218, 0.12)',
                        borderColor: '#06a3da'
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20 
                      }}
                    >
                      <div className="d-flex flex-column flex-sm-row align-items-start gap-3 gap-sm-4">
                        <div className="careers-position-icon text-white" style={{ backgroundColor: job.color, flexShrink: 0 }}>
                          <i className={`fas ${job.icon}`}></i>
                        </div>
                        <div className="flex-grow-1">
                          <h4 className="fw-bold mb-2 text-dark" style={{ fontFamily: 'var(--font-rubik)' }}>{job.title}</h4>
                          <div className="d-flex flex-wrap gap-3 mb-3 text-muted" style={{ fontSize: '13px' }}>
                            <span><i className="fas fa-briefcase me-1"></i> {job.dept}</span>
                            <span>•</span>
                            <span><i className="fas fa-clock me-1"></i> {job.type}</span>
                            <span>•</span>
                            <span><i className="fas fa-map-marker-alt me-1"></i> {job.location}</span>
                          </div>
                          <p className="text-muted mb-4">{job.desc}</p>
                          <div className="d-flex align-items-center mt-3 w-100">
                            <Link 
                              href={`/careers/${job.id}`} 
                              className="btn btn-primary w-100 rounded-pill py-2 text-white fw-bold border-0 shadow-sm text-center"
                              style={{ fontSize: '13.5px', transition: 'all 0.3s ease' }}
                            >
                              View Role Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-5 border rounded-4 bg-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <i className="fas fa-info-circle text-muted mb-3" style={{ fontSize: '32px' }}></i>
                <h4 className="fw-bold text-dark">No open roles found matching your search.</h4>
                <p className="text-muted">Feel free to submit your resume below for future consideration!</p>
              </motion.div>
            )}

            <div className="text-center mt-5">
              <button 
                onClick={() => openModal({
                  title: 'General Application',
                  dept: 'General',
                  type: 'Full Time',
                  location: 'Chennai, India',
                  color: '#06a3da',
                  icon: 'fa-envelope-open'
                })}
                className="btn btn-outline-primary py-3 px-5 rounded-pill fw-bold border-2"
                style={{ cursor: 'pointer' }}
              >
                Submit General Application
              </button>
            </div>

          </div>
        </section>

        {/* Section 5: OUR HIRING PROCESS */}
        <section className="py-5 position-relative overflow-hidden" style={{ backgroundColor: '#F1F4F8' }}>
          <div className="container py-5">
            
            <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
              <motion.h5 
                className="fw-bold text-primary text-uppercase mb-2 opacity-pulse-text"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Our Pipeline
              </motion.h5>
              <motion.h2 
                className="display-5 fw-bold text-dark mb-0 glow-pulse-text" 
                style={{ fontFamily: 'var(--font-nunito)' }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Our Hiring Process
              </motion.h2>
              {/* Animated Underline based on website theme */}
              <div className="position-relative mx-auto mt-3" style={{ width: '150px', height: '6px' }}>
                <motion.div 
                  className="position-absolute top-0 start-50 translate-middle-x bg-primary" 
                  style={{ height: '5px', borderRadius: '3px', width: '100%', originX: 0.5 }}
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
                      "0 0 4px #fff, 0 0 10px #06a3da",
                      "0 0 1px #fff, 0 0 2px #06a3da",
                      "0 0 4px #fff, 0 0 10px #06a3da"
                    ]
                  }}
                  transition={{
                    left: { duration: 4, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              </div>
            </div>

            {/* Connector Timeline Layout */}
            <motion.div 
              className="position-relative mt-5 pt-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
            >
              
              {/* Timeline SVG connecting paths */}
              {/* Desktop Horizontal Line */}
              <svg className="d-none d-lg-block position-absolute w-100" viewBox="0 0 1000 100" preserveAspectRatio="none" style={{ top: '35px', left: 0, height: '40px', zIndex: 0 }}>
                <motion.path
                  d="M 100 50 L 900 50"
                  fill="none"
                  stroke="#06a3da"
                  strokeWidth="3"
                  strokeDasharray="8,8"
                  variants={pathVariants}
                />
              </svg>
              
              {/* Animated paper plane along path */}
              <motion.div
                className="position-absolute d-none d-lg-block"
                style={{ top: '25px', left: 0, zIndex: 1, color: '#06a3da', fontSize: '18px' }}
                variants={planeVariants}
              >
                <i className="fas fa-paper-plane" style={{ transform: 'rotate(45deg)' }}></i>
              </motion.div>

              {/* Mobile Vertical Line */}
              <svg className="d-block d-lg-none position-absolute h-100" viewBox="0 0 100 1000" preserveAspectRatio="none" style={{ top: '0px', left: '50%', transform: 'translateX(-50%)', width: '30px', height: '90%', zIndex: 0 }}>
                <motion.path
                  d="M 50 50 L 50 950"
                  fill="none"
                  stroke="#06a3da"
                  strokeWidth="3"
                  strokeDasharray="8,8"
                  variants={pathVariants}
                />
              </svg>

              {/* Step Cards Row */}
              <div className="row g-5 position-relative z-index-2">
                {[
                  { step: "01", title: "Apply", desc: "Submit your application or resume through our careers portal.", icon: "fa-paper-plane" },
                  { step: "02", title: "Review", desc: "Our team reviews your profile and experience carefully.", icon: "fa-file-invoice" },
                  { step: "03", title: "Interview", desc: "Selected candidates participate in technical and HR interviews.", icon: "fa-comments" },
                  { step: "04", title: "Selection", desc: "Successful candidates receive an offer to join our team.", icon: "fa-handshake" },
                  { step: "05", title: "Welcome Aboard", desc: "Kickstart your journey with Atriowings and grow with us!", icon: "fa-rocket" }
                ].map((item, idx) => (
                  <div key={idx} className="col-lg col-md-12 mb-5 mb-lg-0">
                    <motion.div 
                      className="careers-step-card"
                      custom={idx}
                      variants={circleVariants}
                    >
                      <div className="careers-step-circle">{item.step}</div>
                      <div className="careers-step-icon"><i className={`fas ${item.icon}`}></i></div>
                      <h4 className="fw-bold mb-3 text-dark" style={{ fontFamily: 'var(--font-rubik)' }}>{item.title}</h4>
                      <p className="text-muted mb-0" style={{ fontSize: '13.5px', lineHeight: 1.4 }}>{item.desc}</p>
                    </motion.div>
                  </div>
                ))}
              </div>

            </motion.div>

          </div>
        </section>

        {/* Section 6: PERKS & BENEFITS */}
        <section className="py-5 bg-white position-relative">
          <div className="container py-5">
            
            <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
              <motion.h5 
                className="fw-bold text-primary text-uppercase mb-2 opacity-pulse-text"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Our Perks
              </motion.h5>
              <motion.h2 
                className="display-5 fw-bold text-dark mb-0 glow-pulse-text" 
                style={{ fontFamily: 'var(--font-nunito)' }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Perks & Benefits
              </motion.h2>
              {/* Animated Underline based on website theme */}
              <div className="position-relative mx-auto mt-3" style={{ width: '150px', height: '6px' }}>
                <motion.div 
                  className="position-absolute top-0 start-50 translate-middle-x bg-primary" 
                  style={{ height: '5px', borderRadius: '3px', width: '100%', originX: 0.5 }}
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
                      "0 0 4px #fff, 0 0 10px #06a3da",
                      "0 0 1px #fff, 0 0 2px #06a3da",
                      "0 0 4px #fff, 0 0 10px #06a3da"
                    ]
                  }}
                  transition={{
                    left: { duration: 4, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              </div>
            </div>

            <motion.div 
              className="row g-4"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {[
                { title: "Learning & Development", desc: "Workshops, courses and certifications to support your career growth.", icon: "fa-graduation-cap" },
                { title: "Flexible Environment", desc: "Flexible working hours and options for remote work/hybrid setup.", icon: "fa-clock" },
                { title: "Health & Wellness", desc: "Comprehensive health insurance plans and active wellness programs.", icon: "fa-heartbeat" },
                { title: "Career Growth", desc: "Clear promotion paths and opportunities to transition into leadership roles.", icon: "fa-chart-line" },
                { title: "Modern Workspace", desc: "Work in a modern, creative space equipped with high-end tools.", icon: "fa-laptop-code" },
                { title: "Fun & Events", desc: "Regular team outings, celebratory parties, and year-round events.", icon: "fa-birthday-cake" }
              ].map((perk, idx) => (
                <div key={idx} className="col-lg-4 col-md-6">
                  <motion.div 
                    className="careers-perk-card"
                    variants={fadeUpVariants}
                  >
                    <div className="careers-perk-icon"><i className={`fas ${perk.icon}`}></i></div>
                    <div>
                      <h5 className="fw-bold mb-2 text-dark" style={{ fontFamily: 'var(--font-rubik)' }}>{perk.title}</h5>
                      <p className="text-muted mb-0" style={{ fontSize: '13.5px', lineHeight: 1.4 }}>{perk.desc}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* Section 7: CLOSING CTA — Premium Redesign */}
        <section id="closing-cta" className="py-4 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #020817 0%, #071428 50%, #0c1e3d 100%)' }}>
          
          {/* Animated ambient glow orbs */}
          <div className="position-absolute" style={{ width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6, 163, 218, 0.12) 0%, transparent 70%)', top: '-200px', left: '-100px', filter: 'blur(40px)' }} />
          <div className="position-absolute" style={{ width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%)', bottom: '-150px', right: '-80px', filter: 'blur(40px)' }} />
          <div className="position-absolute" style={{ width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)', top: '50%', left: '40%', filter: 'blur(30px)' }} />

          {/* Grid dot pattern overlay */}
          <div className="position-absolute inset-0" style={{
            backgroundImage: 'radial-gradient(rgba(6, 163, 218, 0.15) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            width: '100%',
            height: '100%',
            top: 0, left: 0,
            opacity: 0.4
          }} />

          <div className="container py-3 position-relative" style={{ zIndex: 3 }}>
            <div className="row align-items-center g-5">

              {/* Left Column */}
              <div className="col-lg-7 text-white">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainerVariants}
                >
                  {/* Badges row */}
                  <motion.div variants={fadeUpVariants} className="d-flex align-items-center gap-2 mb-4 flex-wrap">
                    <motion.span
                      className="badge rounded-pill px-3 py-2 fw-bold text-uppercase"
                      style={{ backgroundColor: 'rgba(6, 163, 218, 0.15)', color: '#00E5FF', border: '1px solid rgba(6, 163, 218, 0.3)', fontSize: '11px' }}
                      animate={{ boxShadow: ['0 0 0px rgba(0,229,255,0)', '0 0 14px rgba(0,229,255,0.4)', '0 0 0px rgba(0,229,255,0)'] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      <i className="fas fa-paper-plane me-1"></i> Submit Your CV
                    </motion.span>
                    <motion.span
                      className="badge rounded-pill px-3 py-2 fw-bold text-uppercase"
                      style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)', fontSize: '11px' }}
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                    >
                      <i className="fas fa-clock me-1"></i> Future Opportunities
                    </motion.span>
                    <span className="badge rounded-pill px-3 py-2 fw-bold text-uppercase" style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.25)', fontSize: '11px' }}>
                      <i className="fas fa-fire me-1"></i> Trending Roles
                    </span>
                  </motion.div>

                  {/* Headline */}
                  <motion.h2
                    className="fw-extrabold mb-4"
                    style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, color: 'white', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
                    variants={fadeUpVariants}
                  >
                    We're Always Looking<br />
                    For <span style={{ background: 'linear-gradient(90deg, #06a3da, #00E5FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Amazing People!</span>
                  </motion.h2>

                  <motion.p className="lead mb-4" style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7 }} variants={fadeUpVariants}>
                    If you don't find a role that fits your skills, send us your resume. We'll reach out to you as soon as the right opportunity comes up.
                  </motion.p>

                  {/* Live stat pills */}
                  <motion.div variants={fadeUpVariants} className="d-flex flex-wrap gap-3 mb-5">
                    {[
                      { icon: 'fa-users', label: '50+ Team Members', color: '#06a3da' },
                      { icon: 'fa-map-marker-alt', label: 'Chennai, India', color: '#10b981' },
                      { icon: 'fa-briefcase', label: 'Multiple Departments', color: '#a78bfa' }
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', fontSize: '13px' }}
                        whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.07)' }}
                        transition={{ duration: 0.2 }}
                      >
                        <i className={`fas ${stat.icon}`} style={{ color: stat.color }}></i>
                        <span className="text-white-50">{stat.label}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Trending Skills badges */}
                  <motion.div variants={fadeUpVariants} className="mb-5">
                    <p className="text-white-50 fw-semibold mb-2" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      <i className="fas fa-fire text-danger me-1"></i> In-demand skills we hire for:
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      {['React.js', 'Next.js', 'Node.js', 'UI/UX Design', 'Digital Marketing', 'SEO'].map((skill, i) => (
                        <motion.span
                          key={i}
                          className="badge rounded-pill px-3 py-2"
                          style={{ background: 'rgba(6, 163, 218, 0.1)', color: '#67e8f9', border: '1px solid rgba(6, 163, 218, 0.2)', fontSize: '11px', fontWeight: 600 }}
                          whileHover={{ scale: 1.1, background: 'rgba(6, 163, 218, 0.25)' }}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.3 }}
                          viewport={{ once: true }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* CTA Button with glow */}
                  <motion.div variants={fadeUpVariants} style={{ display: 'inline-block' }}>
                    <motion.div
                      animate={shouldReduceMotion ? {} : {
                        boxShadow: ['0 0 0px rgba(6,163,218,0)', '0 0 30px rgba(6,163,218,0.5)', '0 0 0px rgba(6,163,218,0)']
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ borderRadius: '50px', display: 'inline-block' }}
                    >
                      <Link
                        href="/contact?subject=Resume Submission – General Application"
                        className="btn btn-primary py-3 px-5 rounded-pill fw-bold text-white border-0 d-inline-flex align-items-center gap-2"
                        style={{ fontSize: '15px', background: 'linear-gradient(135deg, #06a3da, #0284c7)' }}
                      >
                        <i className="fas fa-paper-plane"></i> Send Your Resume
                        <i className="fas fa-arrow-right" style={{ fontSize: '12px' }}></i>
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Column — animated card */}
              <div className="col-lg-5 text-center">
                <motion.div
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.15 }}
                  className="position-relative d-inline-block"
                  style={{ width: '100%', maxWidth: '340px' }}
                >
                  {/* Floating orbit ring */}
                  <motion.div
                    className="position-absolute rounded-circle"
                    style={{
                      width: '340px', height: '340px',
                      border: '1px dashed rgba(6, 163, 218, 0.25)',
                      top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 0
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="position-absolute rounded-circle"
                    style={{
                      width: '260px', height: '260px',
                      border: '1px dashed rgba(0, 229, 255, 0.15)',
                      top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 0
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Floating paper planes */}
                  <motion.div
                    className="position-absolute text-info"
                    style={{ top: '-30px', left: '5%', fontSize: '22px', zIndex: 2 }}
                    animate={shouldReduceMotion ? {} : { y: [0, -14, 0], x: [0, 8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <i className="fas fa-paper-plane" style={{ transform: 'rotate(-25deg)', color: '#00E5FF' }}></i>
                  </motion.div>
                  <motion.div
                    className="position-absolute text-primary"
                    style={{ bottom: '-20px', right: '10%', fontSize: '18px', zIndex: 2 }}
                    animate={shouldReduceMotion ? {} : { y: [0, 10, 0], x: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  >
                    <i className="fas fa-paper-plane" style={{ transform: 'rotate(15deg)', color: '#06a3da' }}></i>
                  </motion.div>

                  {/* Glassmorphic email card */}
                  <div
                    onClick={() => openModal({
                      title: 'General Application',
                      dept: 'General',
                      type: 'Full Time',
                      location: 'Chennai, India',
                      color: '#06a3da',
                      icon: 'fa-envelope-open'
                    })}
                    style={{ cursor: 'pointer', position: 'relative', zIndex: 1 }}
                  >
                    <motion.div
                      className="rounded-5 p-5 shadow-lg"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(24px)',
                        margin: '0 auto'
                      }}
                      whileHover={{
                        scale: 1.04,
                        borderColor: 'rgba(6, 163, 218, 0.5)',
                        backgroundColor: 'rgba(6, 163, 218, 0.06)',
                        boxShadow: '0 0 40px rgba(6, 163, 218, 0.2)'
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      {/* Animated email icon */}
                      <motion.div
                        className="mb-4"
                        style={{ fontSize: '72px', color: '#06a3da' }}
                        animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <i className="far fa-envelope-open"></i>
                      </motion.div>

                      <h5 className="fw-bold text-white mb-2" style={{ fontSize: '16px' }}>info@atriowings.in</h5>
                      <p className="text-muted mb-3" style={{ fontSize: '13px', lineHeight: 1.5 }}>
                        Drop us a line and let's build something incredible together.
                      </p>

                      {/* Animated CTA tag */}
                      <motion.div
                        className="d-inline-flex align-items-center gap-1 px-3 py-2 rounded-pill"
                        style={{ background: 'rgba(6, 163, 218, 0.15)', border: '1px solid rgba(6, 163, 218, 0.3)' }}
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <span style={{ fontSize: '12px', color: '#06a3da', fontWeight: 700 }}>Click to apply</span>
                        <i className="fas fa-arrow-right ms-1" style={{ fontSize: '10px', color: '#06a3da' }}></i>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ── Application Modal ── */}
      <AnimatePresence>
        {modalOpen && selectedJob && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            style={{
              position: 'fixed', inset: 0, zIndex: 9998,
              background: 'rgba(9, 30, 62, 0.65)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            {/* Modal Panel */}
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: '560px',
                maxHeight: '90vh',
                overflowY: 'auto',
                background: '#fff', borderRadius: '20px',
                boxShadow: '0 30px 80px rgba(6,163,218,0.18)',
                padding: '36px 32px', position: 'relative',
              }}
            >
              <div>
                {/* Close button */}
                <button
                  onClick={closeModal}
                  style={{
                    position: 'absolute', top: '16px', right: '18px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '20px', color: '#94a3b8', lineHeight: 1,
                  }}
                  aria-label="Close"
                >
                  <i className="fas fa-times"></i>
                </button>

                {/* Header */}
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    backgroundColor: selectedJob.color, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', color: '#fff', flexShrink: 0,
                  }}>
                    <i className={`fas ${selectedJob.icon}`}></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0 text-dark" style={{ fontSize: '17px' }}>{selectedJob.title}</h5>
                    <span className="text-muted" style={{ fontSize: '13px' }}>
                      <i className="fas fa-briefcase me-1"></i>{selectedJob.dept} &nbsp;•&nbsp;
                      <i className="fas fa-map-marker-alt me-1"></i>{selectedJob.location}
                    </span>
                  </div>
                </div>

                {/* Success state */}
                {submitResult?.success ? (
                  <div className="text-center py-3">
                    <div style={{ fontSize: '52px', color: '#10b981', marginBottom: '12px' }}>
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <h5 className="fw-bold text-dark mb-2">Application Submitted!</h5>
                    <p className="text-muted mb-4" style={{ fontSize: '14px' }}>{submitResult.message}</p>
                    <button onClick={closeModal} className="btn btn-primary rounded-pill px-4">
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplicationSubmit}>
                    {submitResult && !submitResult.success && (
                      <div className="alert alert-danger py-2 mb-3" style={{ fontSize: '13px', borderRadius: '10px' }}>
                        <i className="fas fa-exclamation-circle me-2"></i>{submitResult.message}
                      </div>
                    )}
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label fw-semibold mb-1" style={{ fontSize: '13px', color: '#374151' }}>Full Name *</label>
                        <input
                          type="text" required
                          className="form-control rounded-3"
                          placeholder="Your full name"
                          value={formState.fullName}
                          onChange={e => setFormState(p => ({ ...p, fullName: e.target.value }))}
                          style={{ borderColor: '#e2e8f0', padding: '10px 14px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold mb-1" style={{ fontSize: '13px', color: '#374151' }}>Email Address *</label>
                        <input
                          type="email" required
                          className="form-control rounded-3"
                          placeholder="you@email.com"
                          value={formState.email}
                          onChange={e => setFormState(p => ({ ...p, email: e.target.value }))}
                          style={{ borderColor: '#e2e8f0', padding: '10px 14px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold mb-1" style={{ fontSize: '13px', color: '#374151' }}>Phone Number *</label>
                        <input
                          type="tel" required
                          className="form-control rounded-3"
                          placeholder="+91 9876543210"
                          value={formState.phone}
                          onChange={e => setFormState(p => ({ ...p, phone: e.target.value }))}
                          style={{ borderColor: '#e2e8f0', padding: '10px 14px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold mb-1" style={{ fontSize: '13px', color: '#374151' }}>Applying For</label>
                        <input
                          type="text" readOnly
                          className="form-control rounded-3"
                          value={selectedJob.title}
                          style={{ borderColor: '#e2e8f0', padding: '10px 14px', backgroundColor: '#f8fafc', color: '#06a3da', fontWeight: 600 }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold mb-1" style={{ fontSize: '13px', color: '#374151' }}>Years of Experience *</label>
                        <input
                          type="text" required
                          className="form-control rounded-3"
                          placeholder="e.g. 2 Years"
                          value={formState.experience}
                          onChange={e => setFormState(p => ({ ...p, experience: e.target.value }))}
                          style={{ borderColor: '#e2e8f0', padding: '10px 14px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold mb-1" style={{ fontSize: '13px', color: '#374151' }}>LinkedIn Profile URL (Optional)</label>
                        <input
                          type="url"
                          className="form-control rounded-3"
                          placeholder="https://linkedin.com/in/username"
                          value={formState.linkedin}
                          onChange={e => setFormState(p => ({ ...p, linkedin: e.target.value }))}
                          style={{ borderColor: '#e2e8f0', padding: '10px 14px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold mb-1" style={{ fontSize: '13px', color: '#374151' }}>Portfolio/GitHub URL (Optional)</label>
                        <input
                          type="url"
                          className="form-control rounded-3"
                          placeholder="https://github.com/username"
                          value={formState.portfolio}
                          onChange={e => setFormState(p => ({ ...p, portfolio: e.target.value }))}
                          style={{ borderColor: '#e2e8f0', padding: '10px 14px' }}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold mb-1" style={{ fontSize: '13px', color: '#374151' }}>Upload Resume (PDF, DOC, DOCX up to 5MB) *</label>
                        <input
                          type="file" required
                          accept=".pdf,.doc,.docx"
                          className="form-control rounded-3"
                          onChange={handleFileChange}
                          style={{ borderColor: '#e2e8f0', padding: '10px 14px' }}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold mb-1" style={{ fontSize: '13px', color: '#374151' }}>Cover Letter / Message *</label>
                        <textarea
                          required rows={3}
                          className="form-control rounded-3"
                          placeholder="Explain why you're a great fit for Atriowings..."
                          value={formState.coverLetter}
                          onChange={e => setFormState(p => ({ ...p, coverLetter: e.target.value }))}
                          style={{ borderColor: '#e2e8f0', padding: '10px 14px', resize: 'none' }}
                        />
                      </div>
                      <div className="col-12 mt-3">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="btn btn-primary w-100 py-3 rounded-pill fw-bold text-white shadow"
                          style={{ fontSize: '15px' }}
                        >
                          {submitting ? (
                            <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Submitting CV...</>
                          ) : (
                            <><i className="fas fa-paper-plane me-2"></i>Submit CV</>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
