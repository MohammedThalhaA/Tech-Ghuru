"use client";

import LogoMarquee from "@/components/LogoMarquee";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { submitQuote } from '@/app/actions/quote';

const EMPTY_FORM = { name: '', email: '', phone: '', companyName: '', service: '', message: '' };

export default function Page() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [fields, setFields] = useState(EMPTY_FORM);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    const formData = new FormData();
    formData.append('name', fields.name);
    formData.append('email', fields.email);
    formData.append('phone', fields.phone);
    formData.append('companyName', fields.companyName);
    formData.append('service', fields.service);
    formData.append('message', fields.message);
    const res = await submitQuote(formData);
    setResult(res);
    setSubmitting(false);
    if (res.success) {
      setFields(EMPTY_FORM);
    }
  };

  return (
    <>
      








<div className="container-fluid bg-primary py-5 bg-headerrr" style={{'marginBottom': '90px'}}>
<div className="row py-5">
<div className="col-12 pt-lg-5 mt-lg-5 text-center">
<h1 className="display-4 text-white animated zoomIn">Reach Us</h1>

</div>
</div>
</div>






<div>


<div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
<div className="container py-5">
<div className="row g-5">
<div className="col-lg-7">
<div className="section-title position-relative pb-3 mb-5">
<h5 className="fw-bold text-primary text-uppercase">Reach Us</h5>
<h1 className="mb-0"> Please Feel Free to Contact Us</h1>
</div>
<div className="row gx-3">
<div className="col-sm-6 wow zoomIn" data-wow-delay="0.2s">
<h5 className="mb-4"><i className="fa fa-reply text-primary me-3"></i>Reply within 24 hours</h5>
</div>
<div className="col-sm-6 wow zoomIn" data-wow-delay="0.4s">
<h5 className="mb-4"><i className="fa-solid fa-phone text-primary me-3"></i>24 hrs telephone support</h5>
</div>
</div>
<p className="mb-4">Ready to elevate your online presence? From dynamic website development to seamless e-commerce solutions, our comprehensive web development services make us the perfect partner for all your digital needs. Whether you need a sleek business website, a captivating portfolio, or a full-scale online store, we have the expertise to deliver a solution tailor-made just for you. Share your vision with us by filling out the form below, and we’ll provide a quote that best fits your budget and requirements. Don’t wait—your next digital success is just a click away!</p>
<div className="d-flex align-items-center mt-2 wow zoomIn" data-wow-delay="0.6s">
<div className="bg-primary d-flex align-items-center justify-content-center rounded" style={{'width': '60px', 'height': '60px'}}>
<i className="fa-solid fa-phone text-white"></i>
</div>
<div className="ps-4">
<h5 className="mb-2">Call to ask any question</h5>
<h4 className="text-primary mb-0">+918825948859</h4>
</div>
</div>
</div>
<div className="col-lg-5">
<div className="bg-primary rounded h-100 d-flex align-items-center p-5 wow zoomIn" data-wow-delay="0.9s">
<form onSubmit={handleFormSubmit}>
<div className="row g-3" id="form">
<div className="col-xl-12">
<input
  className="form-control bg-light border-0"
  id="name" name="name"
  placeholder="Your Name"
  required
  style={{'height': '55px'}}
  type="text"
  value={fields.name}
  onChange={e => setFields(p => ({ ...p, name: e.target.value }))}
/>
</div>
<div className="col-12">
<input
  className="form-control bg-light border-0"
  id="email" name="email"
  placeholder="Your Email"
  required
  style={{'height': '55px'}}
  type="email"
  value={fields.email}
  onChange={e => setFields(p => ({ ...p, email: e.target.value }))}
/>
</div>
<div className="col-12">
<input
  className="form-control bg-light border-0"
  id="phone" name="phone"
  placeholder="Your Phone Number"
  required
  style={{'height': '55px'}}
  type="tel"
  value={fields.phone}
  onChange={e => setFields(p => ({ ...p, phone: e.target.value }))}
/>
</div>
<div className="col-12">
<input
  className="form-control bg-light border-0"
  id="companyName" name="companyName"
  placeholder="Company Name (Optional)"
  style={{'height': '55px'}}
  type="text"
  value={fields.companyName}
  onChange={e => setFields(p => ({ ...p, companyName: e.target.value }))}
/>
</div>
<div className="col-12">
<select
  className="form-select bg-light border-0"
  id="service" name="service"
  required
  style={{'height': '55px'}}
  value={fields.service}
  onChange={e => setFields(p => ({ ...p, service: e.target.value }))}
>
<option value="" disabled>Select A Service</option>
<option value="Web Developing">Web Developing</option>
<option value="Product Design">Product Design</option>
<option value="Content Writing">Content Writing</option>
<option value="Digital Marketing">Digital Marketing</option>
<option value="Video Ads">Video Ads</option>
<option value="Consultation">Consultation</option>
</select>
</div>
<div className="col-12">
<textarea
  className="form-control bg-light border-0"
  id="message" name="message"
  placeholder="Message"
  required
  rows={3}
  value={fields.message}
  onChange={e => setFields(p => ({ ...p, message: e.target.value }))}
/>
</div>
{result && (
  <div className="col-12">
    <div style={{
      padding: '12px 16px',
      borderRadius: '10px',
      backgroundColor: result.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
      border: `1px solid ${result.success ? '#10b981' : '#ef4444'}`,
      color: result.success ? '#065f46' : '#7f1d1d',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    }}>
      <span style={{ fontSize: '18px' }}>{result.success ? '✅' : '❌'}</span>
      <span><strong>{result.success ? 'Success!' : 'Error!'}</strong> {result.message}</span>
    </div>
  </div>
)}
<div className="col-12">
  <button
    className="btn btn-dark w-100 py-3"
    type="submit"
    disabled={submitting}
    style={{ opacity: submitting ? 0.75 : 1 }}
  >
    {submitting ? (
      <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...</>
    ) : 'Request A Quote'}
  </button>
</div>
</div>
</form>
</div>
</div>
</div>
</div>
</div>


<button className="readmorebtn bg-primary text-light fancy-button" style={{'display': 'none'}}>Read More</button>
<div className="hidden-sections row">
<div className="card-scene content-box col-lg-4 flip-card">
<div className="card1 flip-card-inner">

<div className="card-face front flip-card-front">
<h2>App Designing &amp; Developing</h2>
<p className="text-success">Hover to learn more</p>
</div>

<div className="card-face back flip-card-back">
<h3 className="text-center text-primary">What We Do</h3>
<p className="ms-3">We specializes in custom mobile app design and development for iOS and Android platforms. </p>
<ul>
<li>User-Centric</li>
<li>Consistent UI</li>
<li>Responsive &amp; Scalable</li>
</ul>
<a className="fancy-button text-center bg-primary ms-3 me-3" href="#">Get Started</a>
</div>
</div>
</div>
</div>


<LogoMarquee />



















</div>
    </>
  );
}
