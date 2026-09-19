'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const [showIcons, setShowIcons] = useState(false);

  return (
    <>
      <div className="container-fluid bg-dark text-light mt-5 wow fadeInUp footercolor" data-wow-delay="0.1s">
        <div className="container">
          <div className="row gx-5">
            {/* Left Column: About (takes col-lg-4 on desktop, full-width on mobile/tablet) */}
            <div className="col-lg-4 col-md-12 footer-about">
              <div className="d-flex flex-column align-items-start justify-content-start text-start h-100 p-4 pt-5 text-light">
                <Link href="/" className="navbar-brand mb-3">
                  <Image 
                    src="/Tech Ghuru logo.png" 
                    alt="Tech Ghuru Logo" 
                    width={300} 
                    height={90} 
                    className="bg-white p-2 rounded"
                    style={{ width: 'auto', height: '80px', objectFit: 'contain' }} 
                  />
                </Link>
                <p className="mb-4 text-light" style={{ lineHeight: '1.6', fontSize: '14.5px' }}>
                  We are proud to offer a wide range of web developing and digital marketing services to build brand recognition and ultimately serve your customers well.
                </p>
                <Link href="/quote" className="btn rounded py-3 px-5 text-light" style={{ backgroundColor: '#F97316', borderColor: '#F97316', fontWeight: 'bold' }}>
                  Reach Us
                </Link>
              </div>
            </div>

            {/* Right Column Wrapper: containing the 3 list columns (takes col-lg-8 on desktop, col-md-12 on tablets) */}
            <div className="col-lg-8 col-md-12">
              <div className="row gx-5">
                {/* Column 2: Get In Touch */}
                <div className="col-lg-4 col-md-4 col-sm-12 pt-5 mb-5">
                  <div className="section-title section-title-sm position-relative pb-3 mb-4">
                    <h3 className="text-light mb-0">Get In Touch</h3>
                  </div>
                  <div className="d-flex mb-2">
                    <i className="bi bi-geo-alt text-primary me-2"></i>
                    <p className="mb-0">No. 1, Gurudev Complex, 57th St, Venkatraman Nagar, Korattur, Chennai, Tamil Nadu 600 080.</p>
                  </div>
                  <div className="d-flex mb-2">
                    <i className="bi bi-envelope-open text-primary me-2"></i>
                    <p className="mb-0">info@techghuru.in</p>
                  </div>
                  <div className="d-flex mb-2">
                    <i className="bi bi-telephone text-primary me-2"></i>
                    <p className="mb-0">+91 8825948859</p>
                  </div>
                  <div className="d-flex mt-4">
                    <a className="btn btn-primary btn-square me-2" href="#">
                      <i className="fab fa-twitter fw-normal"></i>
                    </a>
                    <a className="btn btn-primary btn-square me-2" href="#">
                      <i className="fab fa-facebook-f fw-normal"></i>
                    </a>
                    <a className="btn btn-primary btn-square me-2" href="#">
                      <i className="fab fa-linkedin-in fw-normal"></i>
                    </a>
                    <a className="btn btn-primary btn-square me-2" href="#">
                      <i className="fab fa-instagram fw-normal"></i>
                    </a>
                  </div>
                </div>

                {/* Column 3: Quick Links */}
                <div className="col-lg-4 col-md-4 col-sm-6 pt-5 mb-5">
                  <div className="section-title section-title-sm position-relative pb-3 mb-4">
                    <h3 className="text-light mb-0">Quick Links</h3>
                  </div>
                  <div className="link-animated d-flex flex-column justify-content-start">
                    <Link className="text-light mb-2" href="/"><i className="bi bi-arrow-right text-primary me-2"></i>Home</Link>
                    <Link className="text-light mb-2" href="/about"><i className="bi bi-arrow-right text-primary me-2"></i>About Us</Link>
                    <Link className="text-light mb-2" href="/quote"><i className="bi bi-arrow-right text-primary me-2"></i>Reach Us</Link>
                    <Link className="text-light mb-2" href="/blog"><i className="bi bi-arrow-right text-primary me-2"></i>Blogs</Link>
                    <Link className="text-light mb-2" href="/careers"><i className="bi bi-arrow-right text-primary me-2"></i>Careers</Link>
                    <Link className="text-light" href="/contact"><i className="bi bi-arrow-right text-primary me-2"></i>Contact Us</Link>
                  </div>
                </div>

                {/* Column 4: Services Links */}
                <div className="col-lg-4 col-md-4 col-sm-6 pt-5 mb-5">
                  <div className="section-title section-title-sm position-relative pb-3 mb-4">
                    <h3 className="text-light mb-0">Services Links</h3>
                  </div>
                  <div className="link-animated d-flex flex-column justify-content-start">
                    <Link className="text-light mb-2" href="/services/web-developing"><i className="bi bi-arrow-right text-primary me-2"></i>Web Developing</Link>
                    <Link className="text-light mb-2" href="/services/product-design"><i className="bi bi-arrow-right text-primary me-2"></i>Product Design</Link>
                    <Link className="text-light mb-2" href="/services/content-writing"><i className="bi bi-arrow-right text-primary me-2"></i>Content Writing</Link>
                    <Link className="text-light mb-2" href="/services/digital-marketing"><i className="bi bi-arrow-right text-primary me-2"></i>Digital Marketing</Link>
                    <Link className="text-light mb-2" href="/services/video-ads"><i className="bi bi-arrow-right text-primary me-2"></i>Video ADS & Editing</Link>
                    <Link className="text-light" href="/consolation"><i className="bi bi-arrow-right text-primary me-2"></i>Consultation</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid text-white" style={{ background: '#061429' }}>
        <div className="container text-center">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-center" style={{ height: '75px' }}>
                <p className="mb-0">
                  &copy; <span className="text-white border-bottom">All Rights Reserved by Tech Ghuru</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="fixed-panel">
        <div className="icon-container">
          <div className={`contact-icons ${showIcons ? 'show' : ''}`} id="contactIcons">
            <div className="tooltip-wrapper">
              <div className="tooltip-box tooltip-left">WhatsApp</div>
              <a href="https://wa.me/918825948859" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp icon WhatsAppicon"></i></a>
            </div>
            <div className="tooltip-wrapper">
              <div className="tooltip-box tooltip-left">Phone</div>
              <a href="tel:+918825948859"><i className="fa-solid fa-phone icon"></i></a>
            </div>
            <div className="tooltip-wrapper">
              <div className="tooltip-box tooltip-left">Email</div>
              <a href="mailto:info@techghuru.in"><i className="fas fa-envelope icon"></i></a>
            </div>
          </div>
          <div className="tooltip-wrapper" onClick={() => setShowIcons(!showIcons)}>
            <div className="tooltip-box tooltip-right">Message</div>
            <i 
              className={`fas fa-comment-dots main-icon ${showIcons ? 'rotate' : ''}`} 
              id="messageIcon" 
              title="Message"
              style={{ 
                transform: showIcons ? 'rotate(90deg)' : 'none', 
                transition: 'transform 0.3s ease-in-out' 
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}
