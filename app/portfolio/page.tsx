"use client";

import { useState, useEffect } from 'react';
import { submitContact } from '@/app/actions/contact';
import Link from 'next/link';
import Topbar from '@/components/Topbar';

export default function Page() {
  const [current, setCurrent] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [filter, setFilter] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const texts = [
      " Software Development. ",
      " Web Developement. ",
      " Mobile Application.  ",
      " UI/UX Designing.",
      "Digital Marketing.",
      "Video ads & Photoshoot."
    ];
    let textIndex = 0;
    let charIndex = 0;
    let currentText = "";
    let timer: NodeJS.Timeout;

    const typeEffect = () => {
      if (charIndex < texts[textIndex].length) {
        currentText += texts[textIndex].charAt(charIndex);
        setTypingText(currentText);
        charIndex++;
        timer = setTimeout(typeEffect, 70);
      } else {
        timer = setTimeout(() => {
          currentText = "";
          setTypingText("");
          charIndex = 0;
          textIndex = (textIndex + 1) % texts.length;
          typeEffect();
        }, 1000);
      }
    };
    typeEffect();
    return () => clearTimeout(timer);
  }, []);

  // Slideshow interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % 5);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Active section and sticky header detection on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let curSection = "home";
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          curSection = section.getAttribute("id") || "home";
        }
      });
      setActiveSection(curSection);

      if (window.scrollY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await submitContact(formData);
    alert(res.message);
    if (res.success) {
      e.currentTarget.reset();
    }
  };

  return (
    <>
      <Topbar />
      
      <style dangerouslySetInnerHTML={{ __html: `
        /* Force uniform card image height and aspect-ratio covering from the top */
        .card-image img {
          width: 100% !important;
          height: 220px !important;
          object-fit: cover !important;
          object-position: top !important;
          display: block;
        }
        
        /* Responsive Card Container Overrides */
        .card-container {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 30px !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
          max-width: 1320px !important;
          margin: 45px auto 0 auto !important;
        }

        .card {
          width: 100% !important;
          max-width: 420px !important;
          height: auto !important;
          min-height: 350px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          margin: 0 auto !important;
        }

        /* Screen-specific columns for pixel-perfect card layouts */
        @media (min-width: 1350px) {
          .card-container {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 1349.98px) and (min-width: 768px) {
          .card-container {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 767.98px) {
          .card-container {
            grid-template-columns: 1fr !important;
          }
          .card {
            max-width: 340px !important;
          }
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
          border: 1px solid rgba(6, 163, 218, 0.18) !important;
          box-shadow: 0 12px 35px rgba(6, 163, 218, 0.08) !important;
          animation: slideDown 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          z-index: 1000;
          padding: 10px 30px !important;
        }
        
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      ` }} />

      <div className="container-fluid position-relative p-0">
        <nav 
          className={`navbar navbar-expand-lg navbar-dark px-5 py-3 py-lg-0 ${isScrolled ? 'sticky-header-container' : ''}`} 
          style={{ 
            backgroundColor: 'white', 
            padding: '20px 30px !important',
            transition: 'all 0.3s ease-in-out',
            zIndex: 1000,
            borderBottom: isScrolled ? 'none' : '1px solid rgba(0, 0, 0, 0.06)'
          }}
        >
          <a href="/" className="navbar-brand p-0 anand" style={{ display: 'flex', alignItems: 'center' }}>
            <h1 className="m-0" style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="/img/logo.png" 
                alt="Logo" 
                style={{ 
                  width: '160px', 
                  height: 'auto', 
                  objectFit: 'contain',
                  mixBlendMode: 'multiply'
                }} 
              />
            </h1>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="fa fa-bars"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0">
              <a href="#home" className={`nav-item nav-link2 ${activeSection === 'home' ? 'active' : ''}`} style={{ color: activeSection === 'home' ? '#0773bb' : 'black' }}>Home</a>
              <a href="#about" className={`nav-item nav-link2 ${activeSection === 'about' ? 'active' : ''}`}>About Us</a>
              <a href="#services" className={`nav-item nav-link2 ${activeSection === 'services' ? 'active' : ''}`}>Services</a>
              <a href="#Portfolio" className={`nav-item nav-link2 ${activeSection === 'Portfolio' ? 'active' : ''}`}>Portfolio</a>
              <a href="#contact2" className={`nav-item nav-link2 ${activeSection === 'contact2' ? 'active' : ''}`}>Contact Us</a>
            </div>
          </div>
        </nav>

        <section id="home">
          <div className="intro route bg-image" id="home">
            <div className="bg-overlay"></div>
            <div className="intro-content display-table">
              <div className="table-cell">
                <div className="container">
                  <h1 className="intro-title wow slideInDown mb-4" style={{ color: 'white', textAlign: 'center' }}>
                    Atriowings Technologies
                  </h1>
                  <h2 className="wow slideInLeft intro-title2" style={{ color: 'white', fontSize: '30px', textAlign: 'center' }}>What We Do</h2>
                  <div className="typing-wrapper wow slideInRight">
                    <span className="static">High-end solutions for</span>
                    <span className="typing" id="typing">{typingText}</span>
                    <span className="static"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="floating-menu">
          <div className="hover-wrapper">
            <div className="menu-toggle">
              <i className="fas fa-comment-dots"></i>
            </div>
            <div className="menu-items">
              <a className="menu-item3 whatsapp" href="https://wa.me/918825948859" target="_blank" rel="noreferrer">
                <i className="fab fa-whatsapp"></i> WhatsApp
              </a>
              <a className="menu-item3 phone" href="tel:+91 8825948859">
                <i className="fas fa-phone-volume"></i> Call Us
              </a>
              <a className="menu-item3 mail" href="mailto:info@atriowings.in">
                <i className="fas fa-envelope"></i> Email
              </a>
            </div>
          </div>
        </div>

        <section id="about">
          <div className="aboutpadd" id="about">
            <div className="row mt-5 p-5 container aboutus ms-5 wow slideInLeft">
              <div className="col">
                <h1 className="mb-5" style={{ color: '#06a3da' }}>About Us</h1>
                <p>
                  AtrioWings Technologies is a leading global IT Solutions company that offers web development, digital marketing, and multimedia services. We are dedicated, passionate service providers offering the best
                  industry practices synced with technology expertise and business domain knowledge to drive the digital
                  revolution.
                </p>
              </div>
              <div className="col">
                <div className="slideshow">
                  <img alt="Image 1" className={`slide ${current === 0 ? 'active' : ''}`} src="/img/portfolio pics/Responsive  Website Animation (1).gif" />
                  <img alt="Image 2" className={`slide ${current === 1 ? 'active' : ''}`} src="/img/portfolio pics/digital marketing.gif" />
                  <img alt="Image 3" className={`slide ${current === 2 ? 'active' : ''}`} src="/img/portfolio pics/Content-Writing-12.gif" />
                  <img alt="Image 4" className={`slide ${current === 3 ? 'active' : ''}`} src="/img/portfolio pics/download.gif" />
                  <img alt="Image 5" className={`slide ${current === 4 ? 'active' : ''}`} src="/img/portfolio pics/original-f83b70ad377e49bc189e2b2cb231518d.gif" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services">
          <h1 className="text-center servicesh1">Services</h1>
          <div className="mt-5">
            <div className="text-center servicessubheading">
              <h2 className="gradient-text animated-gradient-text2">Developing Services</h2>
            </div>
            <div className="row gap-5 mt-5 servicesrow">
              <div className="box col-lg-3 wow fadeInUp hovereffectservices">
                <div className="overlay"></div>
                <div className="content">
                  <div className="icon2"><i className="fas fa-code"></i></div>
                  <h1>Software Development</h1>
                  <p>"Delivering tailored software solutions with full-stack expertise to bring your ideas to life."</p>
                </div>
              </div>
              <div className="box col-lg-3 wow fadeInUp hovereffectservices">
                <div className="overlay"></div>
                <div className="content">
                  <div className="icon2"><i className="fas fa-laptop-code"></i></div>
                  <h1>Web Development</h1>
                  <p>"Building responsive, visually striking websites that drive engagement from concept to launch."</p>
                </div>
              </div>
              <div className="box col-lg-3 wow fadeInUp hovereffectservices">
                <div className="overlay"></div>
                <div className="content">
                  <div className="icon2"><i className="fas fa-sync-alt"></i></div>
                  <h1>Dynamic Website</h1>
                  <p>"We create dynamic websites with real-time interaction and seamless user experiences."</p>
                </div>
              </div>
              <div className="box wow fadeInUp hovereffectservices">
                <div className="overlay"></div>
                <div className="content">
                  <div className="icon2"><i className="fas fa-globe"></i></div>
                  <h1>Static Website</h1>
                  <p>"Fast, reliable static sites ideal for showcasing your content with simplicity and elegance."</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="text-center servicessubheading">
              <h2 className="gradient-text animated-gradient-text2">Digital Marketing Services</h2>
            </div>
            <div className="row gap-5 servicesrow">
              <div className="box wow fadeInUp hovereffectservices">
                <div className="overlay"></div>
                <div className="content">
                  <div className="icon2"><i className="fas fa-image"></i></div>
                  <h1>Graphic Designing</h1>
                  <p>"Bringing your vision to life with stunning designs that captivate and elevate your brand."</p>
                </div>
              </div>
              <div className="box wow fadeInUp hovereffectservices">
                <div className="overlay"></div>
                <div className="content">
                  <div className="icon2"><i className="fas fa-users-cog"></i></div>
                  <h1>Social Media Management</h1>
                  <p>"We create engaging content, optimize profiles, and boost meaningful interactions."</p>
                </div>
              </div>
              <div className="box wow fadeInUp hovereffectservices">
                <div className="overlay"></div>
                <div className="content">
                  <div className="icon2"><i className="fas fa-bullhorn"></i></div>
                  <h1>Branding &amp; Promotion</h1>
                  <p>"Creating a unique brand image that connects audience and stands out from competitors."</p>
                </div>
              </div>
              <div className="box wow fadeInUp hovereffectservices">
                <div className="overlay"></div>
                <div className="content">
                  <div className="icon2"><i className="fas fa-video"></i></div>
                  <h1>Video ADS &amp; Product</h1>
                  <p>"Attracting customers and boosting sales with stunning, compelling visuals by expert designers."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-section mt-5" id="stats">
          <div className="overlay2"></div>
          <div className="stats-container">
            <div className="stat-box">
              <i className="fas fa-check-circle"></i>
              <h2 className="counter" data-target="450">0</h2>
              <p>WORKS COMPLETED</p>
            </div>
            <div className="stat-box">
              <i className="fas fa-users"></i>
              <h2 className="counter" data-target="15">0</h2>
              <p>EXPERT TEAM MEMBERS</p>
            </div>
            <div className="stat-box">
              <i className="fas fa-smile"></i>
              <h2 className="counter" data-target="550">0</h2>
              <p>HAPPY CLIENTS</p>
            </div>
            <div className="stat-box">
              <i className="fas fa-trophy"></i>
              <h2 className="counter" data-target="36">0</h2>
              <p>AWARDS RECEIVED</p>
            </div>
          </div>
        </section>

        <section id="Portfolio">
          <div className="portfolio-section container" style={{ padding: '60px 15px 0 15px' }}>
            <h1 className="portfolioh1 text-center" style={{ color: '#06a3da', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold' }}>Portfolio</h1>
            <div className="portfolio-filter">
              <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
              <button className={`filter-btn ${filter === 'ecommerce' ? 'active' : ''}`} onClick={() => setFilter('ecommerce')}>E-Commerce</button>
              <button className={`filter-btn ${filter === 'corporate' ? 'active' : ''}`} onClick={() => setFilter('corporate')}>Corporate</button>
              <button className={`filter-btn ${filter === 'health' ? 'active' : ''}`} onClick={() => setFilter('health')}>Health Care</button>
              <button className={`filter-btn ${filter === 'travel' ? 'active' : ''}`} onClick={() => setFilter('travel')}>Travel</button>
              <button className={`filter-btn ${filter === 'education' ? 'active' : ''}`} onClick={() => setFilter('education')}>Education</button>
              <button className={`filter-btn ${filter === 'Marketing' ? 'active' : ''}`} onClick={() => setFilter('Marketing')}>Digital Marketing</button>
              <button className={`filter-btn ${filter === 'media' ? 'active' : ''}`} onClick={() => setFilter('media')}>Media</button>
              <button className={`filter-btn ${filter === 'social' ? 'active' : ''}`} onClick={() => setFilter('social')}>Social Impact</button>
            </div>
            <div className="card-container" style={{ marginTop: '45px' }}>
              {/* Card 1 */}
              <div className={`card wow slideInLeft corporate ${filter !== 'all' && filter !== 'corporate' ? 'hide' : ''}`}>
                <div className="card-image">
                  <img alt="Product 1" src="/img/portfolio pics/Universal Engineering.jpeg" />
                </div>
                <div className="card-content">
                  <p>Corporate</p>
                  <a className="portbtn" href="https://universalengineering.org.in/" style={{ backgroundColor: '#0072ce' }} target="_blank" rel="noreferrer">Visit site →</a>
                </div>
              </div>

              {/* Card 2 */}
              <div className={`card wow slideInUp corporate ${filter !== 'all' && filter !== 'corporate' ? 'hide' : ''}`}>
                <div className="card-image">
                  <img alt="Product 2" className="scissorsimg" src="/img/portfolio pics/React App (2).png" />
                </div>
                <div className="card-content">
                  <p>Corporate</p>
                  <a className="portbtn sissersbtn" href="http://scissorsproperties.com/" target="_blank" rel="noreferrer">Visit site →</a>
                </div>
              </div>

              {/* Card 3 */}
              <div className={`card wow slideInRight health ${filter !== 'all' && filter !== 'health' ? 'hide' : ''}`}>
                <div className="card-image">
                  <img alt="Product 3" src="/img/portfolio pics/Prs dentel.jpeg" />
                </div>
                <div className="card-content">
                  <p>Health Care</p>
                  <a className="portbtn" href="https://prsdentalcare.com/" style={{ backgroundColor: 'rgb(12, 2, 150)' }} target="_blank" rel="noreferrer">Visit site →</a>
                </div>
              </div>

              {/* Card 4 */}
              <div className={`card wow slideInLeft health ${filter !== 'all' && filter !== 'health' ? 'hide' : ''}`}>
                <div className="card-image">
                  <img alt="Product 4" src="/img/portfolio pics/G.j Chid.jpeg" />
                </div>
                <div className="card-content">
                  <p>Health Care</p>
                  <a className="portbtn" href="https://gjshospitals.com/" style={{ backgroundColor: '#00a3c8' }} target="_blank" rel="noreferrer">Visit site →</a>
                </div>
              </div>

              {/* Card 5 */}
              <div className={`card wow slideInUp travel ${filter !== 'all' && filter !== 'travel' ? 'hide' : ''}`}>
                <div className="card-image">
                  <img alt="Product 4" src="/img/portfolio pics/Sivaji sons.jpeg" />
                </div>
                <div className="card-content">
                  <p>Travel</p>
                  <a className="portbtn" href="http://www.sivajison.com/" style={{ backgroundColor: '#0a8a06' }} target="_blank" rel="noreferrer">Visit site →</a>
                </div>
              </div>

              {/* Card 6 */}
              <div className={`card wow slideInRight education ${filter !== 'all' && filter !== 'education' ? 'hide' : ''}`}>
                <div className="card-image">
                  <img alt="Product 4" src="/img/portfolio pics/ghrudev.png" />
                </div>
                <div className="card-content">
                  <p>Education</p>
                  <a className="portbtn ghrudevbtn" href="https://ghurudev.in/" style={{ backgroundColor: '#00a3c8' }} target="_blank" rel="noreferrer">Visit site →</a>
                </div>
              </div>

              {/* Card 7 */}
              <div className={`card wow slideInLeft education ${filter !== 'all' && filter !== 'education' ? 'hide' : ''}`}>
                <div className="card-image">
                  <img alt="Product 4" src="/img/portfolio pics/digitalghru.png" />
                </div>
                <div className="card-content">
                  <p>Education</p>
                  <a className="portbtn digitalbtn" href="https://digitalghuru.in/" style={{ backgroundColor: '#00a3c8' }} target="_blank" rel="noreferrer">Visit site →</a>
                </div>
              </div>

              {/* Card 8 */}
              <div className={`card wow slideInUp health ${filter !== 'all' && filter !== 'health' ? 'hide' : ''}`}>
                <div className="card-image">
                  <img alt="Product 4" src="/img/portfolio pics/yoga.png" />
                </div>
                <div className="card-content">
                  <p>Health Care</p>
                  <a className="portbtn" href="https://healthghuru.com/" style={{ backgroundColor: '#ee7818' }} target="_blank" rel="noreferrer">Visit site →</a>
                </div>
              </div>

              {/* Card 9 */}
              <div className={`card wow slideInRight ecommerce ${filter !== 'all' && filter !== 'ecommerce' ? 'hide' : ''}`}>
                <div className="card-image">
                  <img alt="Product 4" src="/img/portfolio pics/aarions-new.jpg" />
                </div>
                <div className="card-content">
                  <p>E-Commerce</p>
                  <a className="portbtn" href="https://aarions.in/" style={{ backgroundColor: '#d19c97' }} target="_blank" rel="noreferrer">Visit site →</a>
                </div>
              </div>

              {/* Card 10 */}
              <div className={`card wow slideInLeft Marketing ${filter !== 'all' && filter !== 'Marketing' ? 'hide' : ''}`}>
                <div className="card-image">
                  <img alt="Product 1" src="/img/portfolio pics/mini so.png" />
                </div>
                <div className="card-content">
                  <p>Marketing</p>
                  <a className="portbtn" href="#" style={{ backgroundColor: '#e61638' }}>Visit site →</a>
                </div>
              </div>


              {/* Card 12 */}
              <div className={`card wow slideInRight ${filter !== 'all' && filter !== 'corporate' ? 'hide' : ''}`}>
                <div className="card-image">
                  <img alt="Product 3" src="/img/portfolio pics/yakobu.png" />
                </div>
                <div className="card-content">
                  <p>Corporate</p>
                  <a className="portbtn" href="https://yakobu.in/" style={{ backgroundColor: '#00a3c8' }} target="_blank" rel="noreferrer">Visit site →</a>
                </div>
              </div>

              {/* Card 13 */}
              <div className={`card wow slideInLeft Marketing ${filter !== 'all' && filter !== 'Marketing' ? 'hide' : ''}`}>
                <div className="card-image">
                  <img alt="Product 4" src="/img/portfolio pics/blessence.png" />
                </div>
                <div className="card-content">
                  <p>Marketing</p>
                  <a className="portbtn" href="#" style={{ backgroundColor: 'rgb(247, 181, 94)' }}>Visit site →</a>
                </div>
              </div>

              {/* Card 14 */}
              <div className={`card wow slideInUp travel ${filter !== 'all' && filter !== 'travel' ? 'hide' : ''}`}>
                <div className="card-image">
                  <img alt="Product 4" src="/img/portfolio pics/travelhasslefree.com_.png" />
                </div>
                <div className="card-content">
                  <p>Travel</p>
                  <a className="portbtn" href="https://travelhasslefree.com/" style={{ backgroundColor: '#0ea5e9' }} target="_blank" rel="noreferrer">Visit site →</a>
                </div>
              </div>


              {/* Card 19 */}
              <div className={`card wow slideInLeft social ${filter !== 'all' && filter !== 'social' ? 'hide' : ''}`}>
                <div className="card-image">
                  <img alt="Sri Gnana Sai Baba Mandir" src="/img/portfolio pics/srignanasaibabamandir.com_.png" />
                </div>
                <div className="card-content">
                  <p>Social Impact</p>
                  <a className="portbtn" href="https://srignanasaibabamandir.com/" style={{ backgroundColor: '#00a3c8' }} target="_blank" rel="noreferrer">Visit site →</a>
                </div>
              </div>

              {/* Card 20 */}
              <div className={`card wow slideInRight social ${filter !== 'all' && filter !== 'social' ? 'hide' : ''}`}>
                <div className="card-image">
                  <img alt="Dhara Foundations" src="/img/portfolio pics/dharafoundations.com_.png" />
                </div>
                <div className="card-content">
                  <p>Social Impact</p>
                  <a className="portbtn" href="https://dharafoundations.com/" style={{ backgroundColor: '#FF8A3D' }} target="_blank" rel="noreferrer">Visit site →</a>
                </div>
              </div>

              {/* Card 21 */}
              <div className={`card wow slideInLeft media ${filter !== 'all' && filter !== 'media' ? 'hide' : ''}`}>
                <div className="card-image">
                  <img alt="Newsghuru Tamil" src="/img/portfolio pics/newsghuru.in_.png" />
                </div>
                <div className="card-content">
                  <p>Media (Tamil)</p>
                  <a className="portbtn" href="https://newsghuru.in/" style={{ backgroundColor: '#e61638' }} target="_blank" rel="noreferrer">Visit site →</a>
                </div>
              </div>

              {/* Card 22 */}
              <div className={`card wow slideInRight media ${filter !== 'all' && filter !== 'media' ? 'hide' : ''}`}>
                <div className="card-image">
                  <img alt="Newsghuru English" src="/img/portfolio pics/www.newsghuru.com_.png" />
                </div>
                <div className="card-content">
                  <p>Media (English)</p>
                  <a className="portbtn" href="https://www.newsghuru.com/" style={{ backgroundColor: '#10b981' }} target="_blank" rel="noreferrer">Visit site →</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <button className="readmorebtn bg-primary text-light fancy-button" style={{ display: 'none' }}>Read More</button>
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

        <div className="wrapper container mt-5">
          <div className="marquee" data-speed="60">
            <div className="marquee__ctn">
              <div className="marquee__track">
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/newbrand1.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/newbrand2.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/newbrand3.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/newbrand4.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/newbrand5.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/newbrand6.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/mcars.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/newsghru.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/school.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/sissers.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/uelogo.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/blessence.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/miniso poster logo.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/PRS LOGO.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/sivajisons.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/joysontrust.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/spacemedia.png" />
                </div>
                
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/meera filngs.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/digitalghru.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/vasanth.png" />
                </div>
              </div>
              <div aria-hidden="true" className="marquee__track">
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/newbrand1.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/newbrand2.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/newbrand3.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/newbrand4.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/newbrand5.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/newbrand6.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/mcars.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/newsghru.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/school.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/sissers.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/uelogo.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/blessence.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/miniso poster logo.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/PRS LOGO.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/sivajisons.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/joysontrust.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/spacemedia.png" />
                </div>
                
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/meera filngs.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/digitalghru.png" />
                </div>
                <div className="marquee__item">
                  <img alt="LOGO" src="/img/vendor/vasanth.png" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="contact2">
          <div className="paralax-mf footer-paralax bg-image sect-mt4 route" style={{ backgroundImage: 'url(/img/Services/webdesiging1.jpg)' }}>
            <div className="overlay-mf"></div>
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="contact-mf">
                    <div className="box-shadow-full" id="contact">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="title-box-2">
                            <h5 className="title-left">Send Message Us</h5>
                          </div>
                          <div>
                            <form onSubmit={handleFormSubmit}>
                              <div className="row">
                                <div className="col-md-12 mb-3">
                                  <div className="form-group">
                                    <input className="form-control" id="name" name="name" placeholder="Your Name" required type="text" />
                                  </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                  <div className="form-group">
                                    <input className="form-control" id="email" name="email" placeholder="Your Email" required type="email" />
                                  </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                  <div className="form-group">
                                    <input className="form-control" id="mobile" name="mobile" placeholder="Your Mobile Number" required type="tel" />
                                  </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                  <div className="form-group">
                                    <input className="form-control" id="subject" name="subject" placeholder="Subject" required type="text" />
                                  </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                  <div className="form-group">
                                    <textarea className="form-control" id="message" name="message" placeholder="Message" required rows={5}></textarea>
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <button className="button button-a button-big button-rouded fancy-button" id="submit" name="submit" style={{ backgroundColor: '#06a3da' }} type="submit" value="submit">Send Message</button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="title-box-2 pt-4 pt-md-0">
                            <h5 className="title-left">Get in Touch</h5>
                          </div>
                          <div className="more-info">
                            <p className="lead">
                              Get in touch and discuss how we can bring your project to life. We're here for you, offering
                              expert solutions tailo to your business needs.
                            </p>
                            <ul className="list-ico">
                              <li><span className="ion-ios-location"></span>No.1,Gurudev Complex,57th Street,V R Nagar,Korattur,Chennai-600 080.</li>
                              <li><span className="ion-ios-telephone"></span>+918825948859</li>
                              <li><span className="ion-email"></span>info@atriowings.com</li>
                            </ul>
                          </div>
                          <div className="socials">
                            <ul>
                              <li><a href="https://www.facebook.com/people/AtrioWings-Technologies/100082503773842/"><span className="ico-circle"><i className="fab fa-facebook-f" style={{ fontSize: '24px', color: '#1877F2' }}></i></span></a></li>
                              <li><a href="https://www.instagram.com/atriowingstechnologies/"><span className="ico-circle"> <i className="fab fa-instagram" style={{ fontSize: '24px', color: '#E1306C' }}></i></span></a></li>
                              <li><a href="https://x.com/atriowings"><span className="ico-circle"> <i className="fab fa-twitter" style={{ fontSize: '24px', color: '#1DA1F2' }}></i></span></a></li>
                              <li><a href="https://www.linkedin.com/posts/atriowings_atriowings-atriowingstechnologies-business-activity-6910483218567741440-4G05/"><span className="ico-circle"><i className="fab fa-linkedin" style={{ fontSize: '24px', color: '#0077B5' }}></i></span></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer>
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="copyright-box">
                      <p className="copyright text-center">© Copyright <strong>Atriowings Technologies</strong> All Rights Reserved</p>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </section>
        <div className="fixed-panel sidebarinside" style={{ display: 'none' }}>
          <div className="icon-container">
            <div className="tooltip-wrapper">
              <div className="tooltip-box tooltip-right">Message</div>
              <i className="fas fa-comment-dots main-icon" id="messageIcon" title="Message"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
