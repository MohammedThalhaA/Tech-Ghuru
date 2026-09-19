'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { jobs } from '@/lib/jobs';

const services = [
  { title: 'Web Developing', path: '/services/web-developing', desc: 'Custom website development and apps.' },
  { title: 'Digital Marketing', path: '/services/digital-marketing', desc: 'SEO, SEM, and social media campaigns.' },
  { title: 'Product Design', path: '/services/product-design', desc: 'User experience and user interface layouts.' },
  { title: 'Video Ads & Editing', path: '/services/video-ads', desc: 'Promotional video shoots and post-production.' },
  { title: 'Content Writing', path: '/services/content-writing', desc: 'SEO-driven articles, copy, and scripts.' },
];

const blogs = [
  { id: 'web-developing', title: 'Web Developing', path: '/blog/web-developing', desc: 'Web development planning, coding, and testing.' },
  { id: 'product-design', title: 'Product Design', path: '/blog/product-design', desc: 'Product design from ideation to launch.' },
  { id: 'content-writing', title: 'Content Writing', path: '/blog/content-writing', desc: 'Will AI Replace Writers? What content creators should know.' },
  { id: 'digital-marketing', title: 'Digital Marketing', path: '/blog/digital-marketing', desc: 'The Art and Science of Influencer Marketing.' },
  { id: 'video-ads', title: 'Product Photoshoot', path: '/blog/video-ads', desc: 'Innovative product photography ideas and capture.' },
];

const trendingKeywords = ['Web Developing', 'Product Design', 'Digital Marketing', 'React Developer', 'SEO'];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener for sticky header animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 45);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = (path: string) => {
    const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));
    return `custom-nav-link ${isActive ? 'active' : ''}`;
  };

  const getLinkStyle = (path: string) => {
    const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));
    return { color: isActive ? '#F97316' : '#1e293b' };
  };

  // Live filter results
  const q = searchQuery.toLowerCase().trim();
  const filteredServices = q ? services.filter(s => s.title.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)) : [];
  const filteredJobs = q ? jobs.filter(j => j.title.toLowerCase().includes(q) || j.desc.toLowerCase().includes(q) || j.dept.toLowerCase().includes(q)) : [];
  const filteredBlogs = q ? blogs.filter(b => b.title.toLowerCase().includes(q) || b.desc.toLowerCase().includes(q)) : [];

  return (
    <div className="container-fluid position-relative p-0">
      <style dangerouslySetInnerHTML={{ __html: `
        /* Custom animated underline for header links */
        .custom-nav-link {
          position: relative;
          font-weight: 700 !important;
          font-size: 15px !important;
          margin-left: 24px;
          padding: 28px 0;
          text-decoration: none;
          display: inline-block;
          font-family: "Nunito", sans-serif;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .custom-nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 3px;
          bottom: 18px;
          left: 50%;
          background-color: #F97316;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: translateX(-50%) scaleX(0);
          border-radius: 4px;
          box-shadow: 0 0 8px rgba(249, 115, 22, 0.5);
        }
        .custom-nav-link:hover::after,
        .custom-nav-link.active::after {
          width: 100%;
          transform: translateX(-50%) scaleX(1);
        }
        .custom-nav-link:hover {
          color: #F97316 !important;
          transform: translateY(-2px);
        }
        .custom-nav-link.active {
          color: #F97316 !important;
        }
        
        /* Sticky bar animation classes (Capsule Floating layout) */
        .sticky-header-container {
          position: fixed !important;
          top: 15px !important;
          left: 5% !important;
          right: 5% !important;
          width: 90% !important;
          margin: 0 auto;
          border-radius: 50px !important;
          background: #ffffff !important;
          border: 1px solid rgba(249, 115, 22, 0.18) !important;
          box-shadow: 0 12px 35px rgba(249, 115, 22, 0.08) !important;
          animation: slideDown 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          z-index: 1000;
          padding: 10px 30px !important;
        }
        
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        /* Spacing overrides for links in sticky state */
        .sticky-header-container .custom-nav-link {
          padding: 16px 0 !important;
        }
        .sticky-header-container .custom-nav-link::after {
          bottom: 8px !important;
        }
        
        /* Toggle button style */
        .navbar-toggler:focus {
          box-shadow: none !important;
        }

        /* Mobile layout enhancements for collapsed menu */
        @media (max-width: 1199.98px) {
          .custom-nav-link::after {
            display: none !important;
          }
          .custom-nav-link {
            padding: 12px 15px !important;
            margin-left: 0 !important;
            display: block !important;
            border-radius: 8px;
            transition: background-color 0.2s ease, color 0.2s ease;
          }
          .custom-nav-link:hover,
          .custom-nav-link.active {
            background-color: rgba(249, 115, 22, 0.05) !important;
            transform: none !important;
          }
          .navbar-collapse {
            margin-top: 15px;
            padding-bottom: 10px;
          }
        }
      ` }} />

      <nav 
        className={`navbar navbar-expand-xl navbar-dark px-5 py-3 py-xl-0 ${isScrolled ? 'sticky-header-container' : ''}`} 
        style={{ 
          backgroundColor: '#ffffff',
          transition: 'all 0.3s ease-in-out',
          borderBottom: isScrolled ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
          zIndex: 1000
        }}
      >
        <Link href="/" className="navbar-brand p-0 anand" style={{ display: 'flex', alignItems: 'center' }}>
          <h1 className="m-0" style={{ display: 'flex', alignItems: 'center' }}>
            <Image 
              src="/Tech Ghuru logo.png" 
              alt="Tech Ghuru Logo" 
              width={160} 
              height={48} 
              priority
              style={{ 
                width: '160px', 
                height: 'auto', 
                objectFit: 'contain',
                mixBlendMode: 'multiply'
              }} 
            />
          </h1>
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          style={{ border: 'none', outline: 'none' }}
        >
          <span className="fa fa-bars" style={{ color: '#091E3E', fontSize: '22px' }}></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <Link href="/" className={getLinkClass('/')} style={getLinkStyle('/')}>Home</Link>
            <Link href="/about" className={getLinkClass('/about')} style={getLinkStyle('/about')}>About Us</Link>
            <Link href="/services" className={getLinkClass('/services')} style={getLinkStyle('/services')}>Services</Link>
            <Link href="/portfolio" className={getLinkClass('/portfolio')} style={getLinkStyle('/portfolio')}>Portfolio</Link>
            <Link href="/blog" className={getLinkClass('/blog')} style={getLinkStyle('/blog')}>Blogs</Link>
            <Link href="/careers" className={getLinkClass('/careers')} style={getLinkStyle('/careers')}>Careers</Link>
            <Link href="/contact" className={getLinkClass('/contact')} style={getLinkStyle('/contact')}>Contact Us</Link>
          </div>
          
          {/* Animated Search Icon Trigger */}
          <motion.button 
            type="button" 
            className="btn text-primary ms-3 d-flex align-items-center justify-content-center"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSearchQuery('');
              setIsSearchOpen(true);
            }}
            style={{ 
              cursor: 'pointer', 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%',
              background: 'rgba(249, 115, 22, 0.08)',
              border: 'none',
              outline: 'none'
            }}
          >
            <i className="fa fa-search" style={{ fontSize: '15px' }}></i>
          </motion.button>
          
          <Link href="/quote" className="fancy-button bg-primary text-light ms-xl-5">
            Let's talk
          </Link>
        </div>
      </nav>

      {/* ── Dynamic Search Overlay Modal ── */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(9, 30, 62, 0.92)',
              backdropFilter: 'blur(10px)',
              zIndex: 10050,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '24px',
              paddingTop: '12vh',
            }}
          >
            <motion.div 
              initial={{ opacity: 0, y: -40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: '100%', maxWidth: '680px', position: 'relative' }}
            >
              {/* Row: Input + Close Button */}
              <div className="d-flex align-items-center gap-3">
                {/* Glowing Input Box */}
                <div style={{ position: 'relative', flexGrow: 1 }}>
                  <input
                    type="text"
                    placeholder="Type to search services, jobs, or blogs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '18px 24px',
                      paddingLeft: '56px',
                      fontSize: '18px',
                      borderRadius: '50px',
                      border: '2px solid rgba(249, 115, 22, 0.5)',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#fff',
                      outline: 'none',
                      boxShadow: '0 0 25px rgba(249, 115, 22, 0.3)',
                      transition: 'all 0.3s ease-in-out',
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 35px rgba(249, 115, 22, 0.55)';
                      e.target.style.borderColor = '#49200B';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = '0 0 25px rgba(249, 115, 22, 0.3)';
                      e.target.style.borderColor = 'rgba(249, 115, 22, 0.5)';
                    }}
                  />
                  <i 
                    className="fa fa-search" 
                    style={{ 
                      position: 'absolute', left: '22px', top: '50%', 
                      transform: 'translateY(-50%)', color: '#49200B', 
                      fontSize: '18px' 
                    }}
                  />
                </div>

                {/* Animated Close Button */}
                <motion.button 
                  onClick={() => setIsSearchOpen(false)}
                  whileHover={{ scale: 1.12, rotate: 90 }}
                  whileTap={{ scale: 0.92 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1.5px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    outline: 'none',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  }}
                >
                  <i className="fas fa-times" style={{ fontSize: '20px' }}></i>
                </motion.button>
              </div>

              {/* Trending Badges Row */}
              <div className="mt-3 d-flex align-items-center flex-wrap gap-2 text-white ps-2" style={{ fontSize: '13px' }}>
                <span style={{ color: '#94a3b8', fontWeight: 600 }}>
                  <i className="fas fa-fire me-1 text-danger"></i> Trending:
                </span>
                {trendingKeywords.map(keyword => (
                  <motion.button
                    key={keyword}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchQuery(keyword)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#cbd5e1',
                      borderRadius: '20px',
                      padding: '5px 14px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      outline: 'none',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e: any) => {
                      e.currentTarget.style.background = 'rgba(249, 115, 22, 0.15)';
                      e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.4)';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e: any) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = '#cbd5e1';
                    }}
                  >
                    {keyword}
                  </motion.button>
                ))}
              </div>

              {/* Live Search Results */}
              {searchQuery.trim().length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: '24px',
                    background: '#fff',
                    borderRadius: '20px',
                    maxHeight: '58vh',
                    overflowY: 'auto',
                    boxShadow: '0 25px 60 rgba(0,0,0,0.3)',
                    padding: '24px',
                  }}
                >
                  {filteredServices.length === 0 && filteredJobs.length === 0 && filteredBlogs.length === 0 ? (
                    <div className="text-center py-4 text-muted" style={{ fontSize: '14.5px' }}>
                      No results found for "<strong>{searchQuery}</strong>"
                    </div>
                  ) : (
                    <div>
                      {/* Services group */}
                      {filteredServices.length > 0 && (
                        <div className="mb-4">
                          <h6 className="text-uppercase fw-bold text-primary mb-2" style={{ fontSize: '11px', letterSpacing: '1px' }}>Services</h6>
                          <div className="list-group list-group-flush">
                            {filteredServices.map(item => (
                              <Link 
                                key={item.path} 
                                href={item.path} 
                                onClick={() => setIsSearchOpen(false)}
                                className="list-group-item list-group-item-action px-0 border-0 d-flex justify-content-between align-items-center"
                              >
                                <div className="pe-3">
                                  <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>{item.title}</div>
                                  <div className="text-muted" style={{ fontSize: '12px' }}>{item.desc}</div>
                                </div>
                                <i className="fas fa-chevron-right text-muted" style={{ fontSize: '10px' }} />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Careers group */}
                      {filteredJobs.length > 0 && (
                        <div className="mb-4">
                          <h6 className="text-uppercase fw-bold text-success mb-2" style={{ fontSize: '11px', letterSpacing: '1px' }}>Open Positions</h6>
                          <div className="list-group list-group-flush">
                            {filteredJobs.map(item => (
                              <Link 
                                key={item.id} 
                                href={`/careers/${item.id}`} 
                                onClick={() => setIsSearchOpen(false)}
                                className="list-group-item list-group-item-action px-0 border-0 d-flex justify-content-between align-items-center"
                              >
                                <div className="pe-3">
                                  <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>{item.title}</div>
                                  <div className="text-muted" style={{ fontSize: '12px' }}>{item.dept} &bull; {item.location}</div>
                                </div>
                                <i className="fas fa-chevron-right text-muted" style={{ fontSize: '10px' }} />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Blogs group */}
                      {filteredBlogs.length > 0 && (
                        <div>
                          <h6 className="text-uppercase fw-bold text-info mb-2" style={{ fontSize: '11px', letterSpacing: '1px' }}>Blogs</h6>
                          <div className="list-group list-group-flush">
                            {filteredBlogs.map(item => (
                              <Link 
                                key={item.path} 
                                href={item.path} 
                                onClick={() => setIsSearchOpen(false)}
                                className="list-group-item list-group-item-action px-0 border-0 d-flex justify-content-between align-items-center"
                              >
                                <div className="pe-3">
                                  <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>{item.title}</div>
                                  <div className="text-muted" style={{ fontSize: '12px' }}>{item.desc}</div>
                                </div>
                                <i className="fas fa-chevron-right text-muted" style={{ fontSize: '10px' }} />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
