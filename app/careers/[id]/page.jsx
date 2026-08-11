'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { jobs } from '@/lib/jobs';
import { submitJobApplication } from '@/app/actions/career';

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = parseInt(params.id);
  const job = jobs.find(j => j.id === jobId);

  // Form State
  const [modalOpen, setModalOpen] = useState(false);
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

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  if (!job) {
    return (
      <>
        <Topbar />
        <Navbar />
        <div className="container py-5 text-center my-5">
          <h2 className="fw-bold text-dark">Job Position Not Found</h2>
          <p className="text-muted mb-4">The job role you are looking for does not exist or has been filled.</p>
          <Link href="/careers" className="btn btn-primary rounded-pill px-4 py-2">
            Back to Careers
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const openModal = () => {
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
    document.body.style.overflow = '';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds the 5MB limit.');
        e.target.value = null;
        return;
      }
      // Validate file type
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (!['.pdf', '.doc', '.docx'].includes(ext)) {
        alert('Allowed formats: PDF, DOC, DOCX.');
        e.target.value = null;
        return;
      }
      setResumeFile(file);
    }
  };

  const handleFormSubmit = async (e) => {
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
    fd.append('position', job.title);
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

  return (
    <>
      <Topbar />
      <Navbar />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.95; }
          100% { transform: scale(1.05); opacity: 1; }
        }
        .hover-highlight-item:hover {
          background-color: rgba(6, 163, 218, 0.05) !important;
          border-color: #06a3da !important;
          transform: translateX(4px);
        }
        .fa-paper-plane {
          transition: transform 0.25s ease-in-out !important;
          display: inline-block;
        }
        .btn:hover .fa-paper-plane {
          transform: translate(3px, -3px) rotate(10deg);
        }
      ` }} />

      <main style={{ backgroundColor: '#F1F4F8' }}>
        {/* Banner Section */}
        <div className="container-fluid bg-primary py-5 bg-header" style={{ marginBottom: '60px' }}>
          <div className="row py-5">
            <div className="col-12 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-4 text-white animated zoomIn">{job.title}</h1>
              <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                <Link href="/" className="h5 text-white text-decoration-none">Home</Link>
                <i className="far fa-circle text-white" style={{ fontSize: '8px' }}></i>
                <Link href="/careers" className="h5 text-white text-decoration-none">Careers</Link>
                <i className="far fa-circle text-white" style={{ fontSize: '8px' }}></i>
                <span className="h5 text-white-50">Job Details</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Container */}
        <div className="container py-5">
          <div className="row g-5">
            {/* Left Content Column */}
            <div className="col-lg-8">
              <div className="bg-white rounded-4 p-5 shadow-sm border-0 mb-4">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div style={{
                    width: '60px', height: '60px', borderRadius: '15px',
                    backgroundColor: job.color, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '24px', color: '#fff'
                  }}>
                    <i className={`fas ${job.icon}`}></i>
                  </div>
                  <div>
                    <h2 className="fw-bold mb-1 text-dark" style={{ fontFamily: 'var(--font-rubik)' }}>{job.title}</h2>
                    <p className="text-primary mb-0 fw-semibold d-flex align-items-center gap-2">
                      <span>{job.dept} &nbsp;•&nbsp; {job.type}</span>
                      <span className="badge bg-danger text-white rounded-pill px-2 py-1 d-inline-flex align-items-center gap-1" style={{ fontSize: '10px', fontWeight: 'bold', animation: 'pulse 1.5s infinite alternate' }}>
                        <i className="fas fa-fire"></i> Trending
                      </span>
                    </p>
                  </div>
                </div>

                <hr className="my-4" style={{ opacity: 0.1 }} />

                {/* About the role */}
                <h4 className="fw-bold text-dark mb-3">About The Role</h4>
                <p className="text-muted mb-4" style={{ lineHeight: '1.7', fontSize: '15px' }}>{job.aboutRole}</p>

                {/* Key Responsibilities */}
                <h4 className="fw-bold text-dark mb-3 mt-5">Key Responsibilities</h4>
                <ul className="mb-4 ps-3 text-muted" style={{ lineHeight: '1.8', fontSize: '15px' }}>
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="mb-2">{resp}</li>
                  ))}
                </ul>

                {/* Requirements */}
                <h4 className="fw-bold text-dark mb-3 mt-5">Requirements & Qualifications</h4>
                <ul className="mb-4 ps-3 text-muted" style={{ lineHeight: '1.8', fontSize: '15px' }}>
                  {job.requirements.map((req, i) => (
                    <li key={i} className="mb-2">{req}</li>
                  ))}
                </ul>

                {/* Skills */}
                <h4 className="fw-bold text-dark mb-3 mt-5">Key Skills Required</h4>
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, i) => (
                    <span key={i} className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-semibold" style={{ fontSize: '13px' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sticky Sidebar */}
            <div className="col-lg-4">
              <div className="position-sticky" style={{ top: '100px' }}>
                {/* Trending Careers Card */}
                <motion.div 
                  className="bg-white rounded-4 p-4 shadow-sm border-0 mb-4"
                  whileHover={{ y: -4, boxShadow: '0 15px 40px rgba(6, 163, 218, 0.1)' }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="fw-bold text-dark mb-3"><i className="fas fa-fire text-danger me-2"></i>Trending Roles</h4>
                  <div className="d-flex flex-column gap-2">
                    {jobs.filter(j => j.id !== job.id).slice(0, 3).map((otherJob) => (
                      <Link 
                        key={otherJob.id} 
                        href={`/careers/${otherJob.id}`}
                        className="d-flex align-items-center justify-content-between p-2 rounded text-decoration-none hover-highlight-item"
                        style={{ transition: 'all 0.2s ease', border: '1px solid #f1f5f9' }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <div className="d-flex align-items-center justify-content-center text-white rounded-circle" style={{ width: '30px', height: '30px', backgroundColor: otherJob.color }}>
                            <i className={`fas ${otherJob.icon}`} style={{ fontSize: '12px' }}></i>
                          </div>
                          <div className="text-start">
                            <span className="text-dark fw-bold d-block" style={{ fontSize: '13px' }}>{otherJob.title}</span>
                            <small className="text-muted" style={{ fontSize: '10px' }}>{otherJob.dept}</small>
                          </div>
                        </div>
                        <i className="fas fa-chevron-right text-muted" style={{ fontSize: '10px' }}></i>
                      </Link>
                    ))}
                  </div>
                </motion.div>

                {/* Highlights Card */}
                <motion.div 
                  className="bg-white rounded-4 p-4 shadow-sm border-0 mb-4"
                  whileHover={{ y: -4, boxShadow: '0 15px 40px rgba(6, 163, 218, 0.1)' }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="fw-bold text-dark mb-4">Job Summary</h4>
                  
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <i className="fas fa-briefcase text-primary" style={{ width: '20px', fontSize: '18px' }}></i>
                    <div>
                      <small className="text-muted d-block">Department</small>
                      <strong className="text-dark">{job.dept}</strong>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 mb-3">
                    <i className="fas fa-clock text-primary" style={{ width: '20px', fontSize: '18px' }}></i>
                    <div>
                      <small className="text-muted d-block">Job Type</small>
                      <strong className="text-dark">{job.type}</strong>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 mb-3">
                    <i className="fas fa-map-marker-alt text-primary" style={{ width: '20px', fontSize: '18px' }}></i>
                    <div>
                      <small className="text-muted d-block">Location</small>
                      <strong className="text-dark">{job.location}</strong>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 mb-4">
                    <i className="fas fa-graduation-cap text-primary" style={{ width: '20px', fontSize: '18px' }}></i>
                    <div>
                      <small className="text-muted d-block">Experience</small>
                      <strong className="text-dark">{job.experience}</strong>
                    </div>
                  </div>

                  <button onClick={openModal} className="btn btn-primary w-100 py-3 rounded-pill fw-bold text-white shadow">
                    Submit CV for Future Openings <i className="fas fa-arrow-right ms-2"></i>
                  </button>
                </motion.div>

                {/* Benefits Card */}
                <motion.div 
                  className="bg-white rounded-4 p-4 shadow-sm border-0 mb-4"
                  whileHover={{ y: -4, boxShadow: '0 15px 40px rgba(6, 163, 218, 0.1)' }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="fw-bold text-dark mb-3">Benefits & Perks</h4>
                  <ul className="mb-0 ps-3 text-muted" style={{ lineHeight: '1.7', fontSize: '14px' }}>
                    {job.benefits.map((benefit, i) => (
                      <li key={i} className="mb-2">{benefit}</li>
                    ))}
                  </ul>
                </motion.div>

                {/* Hiring Process Card */}
                <motion.div 
                  className="bg-white rounded-4 p-4 shadow-sm border-0"
                  whileHover={{ y: -4, boxShadow: '0 15px 40px rgba(6, 163, 218, 0.1)' }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="fw-bold text-dark mb-3">Hiring Process</h4>
                  <ol className="mb-0 ps-3 text-muted" style={{ lineHeight: '1.7', fontSize: '14px' }}>
                    {job.hiringProcess.map((step, i) => (
                      <li key={i} className="mb-2">{step}</li>
                    ))}
                  </ol>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Application Modal ── */}
      <AnimatePresence>
        {modalOpen && (
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
                    backgroundColor: job.color, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', color: '#fff', flexShrink: 0,
                  }}>
                    <i className={`fas ${job.icon}`}></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0 text-dark" style={{ fontSize: '17px' }}>Submit CV: {job.title} (Future Openings)</h5>
                    <span className="text-muted" style={{ fontSize: '13px' }}>
                      Fill out the form below to submit your application.
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
                  <form onSubmit={handleFormSubmit}>
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
                          value={job.title}
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
                        <motion.button
                          type="submit"
                          disabled={submitting}
                          className="btn btn-primary w-100 py-3 rounded-pill fw-bold text-white shadow d-flex align-items-center justify-content-center"
                          style={{ fontSize: '15px' }}
                          whileHover={{ 
                            scale: 1.02, 
                            boxShadow: '0 8px 25px rgba(6, 163, 218, 0.3)'
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                        >
                          {submitting ? (
                            <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Submitting CV...</>
                          ) : (
                            <><i className="fas fa-paper-plane me-2"></i>Submit CV</>
                          )}
                        </motion.button>
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
