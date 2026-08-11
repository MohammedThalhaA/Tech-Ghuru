"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div id="header-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`}>
            <img className="w-100 c-img" src="/img/Services/services1.gif" alt="Image" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: '900px' }}>
                <h2 className="display-1 text-white mb-md-4 animated zoomIn">Services</h2>
              </div>
            </div>
          </div>
          <div className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`}>
            <img className="w-100 c-img" src="/img/Services/services2.gif" alt="Image" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: '900px' }}>
                <h2 className="display-1 text-white mb-md-4 animated zoomIn">Services</h2>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" onClick={() => setActiveIndex((prev) => (prev === 0 ? 1 : 0))}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" onClick={() => setActiveIndex((prev) => (prev === 0 ? 1 : 0))}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
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


<div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s" id="services">
<div className="container py-5 servicscontainer">
<div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{'maxWidth': '600px'}}>
<h5 className="fw-bold text-primary text-uppercase">Our Services</h5>
<h1 className="mb-0">Custom IT Solutions for Your Successful Business</h1>
</div>
          <div className="row justify-content-center" style={{ gap: '40px' }}>
            <div className="col-lg-5 col-md-6 col-sm-12 wow slideInUp servicsbgimg" data-wow-delay="0.3s">
              <div className="service-item rounded d-flex flex-column align-items-center justify-content-center text-center bom">
                <div className="service-icon">
                  <i className="fa fa-laptop text-white"></i>
                </div>
                <h4 className="mb-3">Web Developing</h4>
                <p className="m-0 text-dark">Providing comprehensive IT solutions and robust for seamless operations.</p>
                <a className="btn btn-lg btn-primary rounded" href="webdeveloping.html">
                  <i className="bi bi-arrow-right wow slideInDown"></i>
                </a>
              </div>
            </div>
            
            <div className="col-lg-5 col-md-6 col-sm-12 wow slideInUp digitalservicimg smres" data-wow-delay="0.6s">
              <div className="service-item rounded d-flex flex-column align-items-center justify-content-center text-center">
                <div className="service-icon">
                  <i className="fa fa-calendar-alt text-white"></i>
                </div>
                <h4 className="mb-3">Digital Marketing</h4>
                <p className="m-0 text-dark">Efficiently coordinate digital marketing campaigns with our experienced strategy team.</p>
                <a className="btn btn-lg btn-primary rounded" href="digitalmarketing.html">
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
            
            <div className="col-lg-5 col-md-6 col-sm-12 wow slideInUp socialmediaserviceimg smres" data-wow-delay="0.3s">
              <div className="service-item rounded d-flex flex-column align-items-center justify-content-center text-center">
                <div className="service-icon">
                  <i className="fa fa-briefcase text-white"></i>
                </div>
                <h4 className="mb-3">Product Design</h4>
                <p className="m-0 text-dark">Product design encompasses the entire process of creating a product, from ideation to launch.</p>
                <a className="btn btn-lg btn-primary rounded" href="productdesign.html">
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
            
            <div className="col-lg-5 col-md-6 col-sm-12 wow slideInUp seoservicesimg smres" data-wow-delay="0.6s">
              <div className="service-item rounded d-flex flex-column align-items-center justify-content-center text-center">
                <div className="service-icon">
                  <i className="fa fa-users text-white"></i>
                </div>
                <h4 className="mb-3">Video Ads &amp; Editing</h4>
                <p className="m-0 text-dark">We create eye-catching video ads that grab attention and drive results.</p>
                <a className="btn btn-lg btn-primary rounded" href="./videoadsphotos.html">
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
            
            <div className="col-lg-5 col-md-6 col-sm-12 wow slideInUp contentserviceimg smres" data-wow-delay="0.6s">
              <div className="service-item rounded d-flex flex-column align-items-center justify-content-center text-center">
                <div className="service-icon">
                  <i className="fas fa-pen text-white"></i>
                </div>
                <h4 className="mb-3">Content Writting</h4>
                <p className="m-0 text-dark">We create eye-catching video ads that grab attention and drive results.</p>
                <a className="btn btn-lg btn-primary rounded" href="./contetnwriting.html">
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
            
            <div className="col-lg-5 col-md-6 col-sm-12 wow slideInUp consultationserimg smres" data-wow-delay="0.6s">
              <div className="service-item rounded d-flex flex-column align-items-center justify-content-center text-center">
                <div className="service-icon">
                  <i className="fas fa-headset text-white"></i>
                </div>
                <h4 className="mb-3">Consultation</h4>
                <p className="m-0 text-dark">We create eye-catching video ads that grab attention and drive results.</p>
                <a className="btn btn-lg btn-primary rounded" href="./consolation.html">
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

</div>
</div>


<div className="wrapper container">
<div className="marquee" data-speed="60">
<div className="marquee__ctn">
<div className="marquee__track">
<div className="marquee__item">
<img alt="LOGO" src="./img/vendor/brand1.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="./img/vendor/brand3.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/brand4.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/mcars.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/newsghru.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/school.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/sissers.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/uelogo.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/blessence.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/miniso poster logo.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/PRS LOGO.png"/>
</div>
</div>
<div aria-hidden="true" className="marquee__track">
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/sivajisons.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/joysontrust.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/spacemedia.png"/>
</div>

<div className="marquee__item">
<img alt="LOGO" src="img/vendor/meera filngs.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/digitalghru.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/newbrand2.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/newbrand3.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/newbrand4.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/newbrand5.png"/>
</div>
<div className="marquee__item">
<img alt="LOGO" src="img/vendor/vasanth.png"/>
</div>
</div>
</div>
</div>
</div>



















    </>
  );
}
