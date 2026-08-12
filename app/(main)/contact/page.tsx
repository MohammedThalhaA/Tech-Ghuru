"use client";

import LogoMarquee from "@/components/LogoMarquee";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { submitContact } from '@/app/actions/contact';

export default function Page() {
  const [fields, setFields] = useState({ name: '', email: '', mobile: '', message: '' });
  const [subjectVal, setSubjectVal] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const sub = params.get('subject');
      if (sub) {
        setSubjectVal(sub);
      }
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    const formData = new FormData();
    formData.append('name', fields.name);
    formData.append('email', fields.email);
    formData.append('mobile', fields.mobile);
    formData.append('subject', subjectVal);
    formData.append('message', fields.message);
    const res = await submitContact(formData);
    setResult(res);
    setSubmitting(false);
    if (res.success) {
      setFields({ name: '', email: '', mobile: '', message: '' });
      setSubjectVal('');
    }
  };

  return (
    <>
      








<div className="container-fluid bg-primary py-5 bg-header" style={{'marginBottom': '90px'}}>
<div className="row py-5">
<div className="col-12 pt-lg-5 mt-lg-5 text-center">
<h1 className="display-4 text-white animated zoomIn">Contact Us</h1>
<a className="h5 text-white" href="/">Home</a>
<i className="far fa-circle text-white px-2"></i>
<a className="h5 text-white" href="">Contact Us</a>
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


<div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s" id="Contact">
<div className="container py-5">
<div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{'maxWidth': '600px'}}>
<h5 className="fw-bold text-primary text-uppercase">Contact Us</h5>
<h1 className="mb-0">If You Have Any Query, Feel Free To Contact Us</h1>
</div>
<div className="row g-5 mb-5">
<div className="col-lg-4">
<div className="d-flex align-items-center wow fadeIn slideInLeft" data-wow-delay="0.1s">
<div className="bg-primary d-flex align-items-center justify-content-center rounded" style={{'width': '60px', 'height': '60px'}}>
<i className="fa-solid fa-phone text-white"></i>
</div>
<div className="ps-4">
<h5 className="mb-2">Call to ask any question</h5>
<h4 className="text-primary mb-0">+918825948859</h4>
</div>
</div>
</div>
<div className="col-lg-4">
<div className="d-flex align-items-center wow fadeIn" data-wow-delay="0.4s">
<div className="bg-primary d-flex align-items-center justify-content-center rounded" style={{'width': '60px', 'height': '60px'}}>
<i className="fa fa-envelope-open text-white"></i>
</div>
<div className="ps-4">
<h5 className="mb-2">Email to get free quote</h5>
<h4 className="text-primary mb-0">info@atriowings.in</h4>
</div>
</div>
</div>
<div className="col-lg-4">
<div className="d-flex align-items-center wow fadeIn slideInRight" data-wow-delay="0.8s">
<div className="bg-primary d-flex align-items-center justify-content-center rounded" style={{'width': '90px', 'height': '60px'}}>
<i className="fa fa-map-marker-alt text-white"></i>
</div>
<div className="ps-4">
<h5 className="mb-1">Visit our office</h5>
<h6 className="text-primary mb-0">No. 1, Gurudev Complex, 57th St, Venkatraman Nagar, Korattur-600080.</h6>
</div>
</div>
</div>
</div>
<div className="row g-5">
<center><div className="col-lg-6 wow slideInUp" data-wow-delay="0.3s">
<form onSubmit={handleFormSubmit}>
<div className="row g-3">
<div className="col-md-6">
<input
  autoComplete="on"
  className="form-control border-0 bg-light px-4 wow slideInLeft"
  id="name" name="name"
  placeholder="Name" required
  style={{'height': '55px'}}
  type="text"
  value={fields.name}
  onChange={e => setFields(p => ({ ...p, name: e.target.value }))}
/>
</div>
<div className="col-md-6">
<input
  className="form-control border-0 bg-light px-4 wow slideInRight"
  id="email" name="email"
  placeholder="Your Email" required
  style={{'height': '55px'}}
  type="email"
  value={fields.email}
  onChange={e => setFields(p => ({ ...p, email: e.target.value }))}
/>
</div>
<div className="col-md-6">
<input
  autoComplete="on"
  className="form-control border-0 bg-light px-4 wow slideInLeft"
  id="mobile" name="mobile"
  placeholder="Mobile Number" required
  style={{'height': '55px'}}
  type="tel"
  value={fields.mobile}
  onChange={e => setFields(p => ({ ...p, mobile: e.target.value }))}
/>
</div>
<div className="col-md-6">
<input 
  autoComplete="on" 
  className="form-control border-0 bg-light px-4 wow slideInRight" 
  id="subject" 
  name="subject" 
  placeholder="Subject" 
  required 
  style={{'height': '55px'}} 
  type="text"
  value={subjectVal}
  onChange={(e) => setSubjectVal(e.target.value)}
/>
</div>
<div className="col-MD-12">
<textarea
  className="form-control border-0 bg-light px-4 py-3 slideInLeft wow"
  id="message" name="message"
  placeholder="Message" required
  value={fields.message}
  onChange={e => setFields(p => ({ ...p, message: e.target.value }))}
/>
</div>
{result && (
  <div className="col-12">
    <div className={`alert ${result.success ? 'alert-success' : 'alert-danger'} text-start`} role="alert" style={{ borderRadius: '10px' }}>
      <i className={`fas ${result.success ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
      {result.message}
    </div>
  </div>
)}
<div className="col-12">
  <button
    className="btn btn-primary w-100 py-3 wow slideInDown"
    type="submit"
    disabled={submitting}
    style={{ opacity: submitting ? 0.75 : 1 }}
  >
    {submitting ? (
      <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...</>
    ) : 'Submit'}
  </button>
</div>
</div>
</form>
</div>
</center></div>
</div>
</div>



<LogoMarquee />




















    </>
  );
}
