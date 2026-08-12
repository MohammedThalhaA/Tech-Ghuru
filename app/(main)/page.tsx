import LogoMarquee from "@/components/LogoMarquee";
import Link from 'next/link';

export default function Page() {
  return (
    <>
      {/* Navbar & Carousel Start */}
      <div className="container-fluid position-relative p-0">

        <div id="header-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="w-100 min-vh-100 navimgres" src="/img/Frame 1 (3).png" alt="Image" />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: '900px' }}>
                  <h1 className="display-1 text-white mb-md-4 animated zoomIn">Atriowings Technologies </h1>
                  <h5 className="text-white mb-3 animated slideInDown">
                    Atriowings Technologies is a leading global IT Solutions company that offers Web development, digital marketing and multimedia services.
                  </h5>
                  <Link href="/contact" className="btn btn-outline-light py-md-3 px-md-5 animated slideInRight mt-5">Contact Us</Link>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img className="w-100 min-vh-100 navimgres" src="/img/Frame 1 (3).png" alt="Image" />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: '900px' }}>
                  <h1 className="display-1 text-white mb-md-4 animated zoomIn">Atriowings Technologies</h1>
                  <h5 className="text-white mb-3 animated slideInDown">
                    Atriowings Technologies is a leading global IT Solutions company that offers Web development, digital marketing and multimedia services.
                  </h5>
                  <Link href="/contact" className="btn btn-outline-light py-md-3 px-md-5 animated slideInRight">Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Navbar & Carousel End */}

      {/* Full Screen Search Start */}
      <div className="modal fade" id="searchModal" tabIndex={-1}>
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content" style={{ background: 'rgba(9, 30, 62, .7)' }}>
            <div className="modal-header border-0">
              <button type="button" className="btn bg-white btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex align-items-center justify-content-center">
              <div className="input-group" style={{ maxWidth: '600px' }}>
                <input type="text" className="form-control bg-transparent border-primary p-3" placeholder="Type search keyword" />
                <button className="btn btn-primary px-4"><i className="bi bi-search"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Full Screen Search End */}

      {/* Facts Start */}
      <div className="container-fluid facts py-5 pt-lg-0 counter-section">
        <div className="container py-5 pt-lg-0">
          <div className="row gx-0">
            <div className="col-lg-4 wow zoomIn" data-wow-delay="0.1s">
              <div className="bg-primary shadow d-flex align-items-center justify-content-center p-4" style={{ height: '150px' }}>
                <div className="bg-white d-flex align-items-center justify-content-center rounded mb-2" style={{ width: '60px', height: '60px' }}>
                  <i className="fa fa-users text-primary"></i>
                </div>
                <div className="ps-4">
                  <h5 className="text-white mb-0">Happy Clients</h5>
                  <h1 className="text-white mb-0 counter" data-target="100">0</h1>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow zoomIn" data-wow-delay="0.3s">
              <div className="bg-light shadow d-flex align-items-center justify-content-center p-4" style={{ height: '150px' }}>
                <div className="bg-primary d-flex align-items-center justify-content-center rounded mb-2" style={{ width: '60px', height: '60px' }}>
                  <i className="fa fa-check text-white"></i>
                </div>
                <div className="ps-4">
                  <h5 className="text-primary mb-0">Projects Done</h5>
                  <h1 className="counter" data-target="100">0</h1>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow zoomIn" data-wow-delay="0.6s">
              <div className="bg-primary shadow d-flex align-items-center justify-content-center p-4" style={{ height: '150px' }}>
                <div className="bg-white d-flex align-items-center justify-content-center rounded mb-2" style={{ width: '60px', height: '60px' }}>
                  <i className="fa fa-award text-primary"></i>
                </div>
                <div className="ps-4">
                  <h5 className="text-white mb-0">Win Awards</h5>
                  <h1 className="text-white mb-0 counter" data-target="10">0</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Facts End */}

      {/* About Start */}
      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s" id="about">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-7">
              <div className="section-title position-relative pb-3 mb-5">
                <h5 className="fw-bold text-primary text-uppercase">About Us</h5>
                <h1 className="mb-0">The Best IT Solutions With Six Years of Experience</h1>
              </div>
              <p className="mb-4">
                AtrioWings Technologies is a leading global IT Solutions company that offers web development, digital marketing, and multimedia services. We are dedicated, passionate service providers offering the best industry practices synced with technology expertise and business domain knowledge to drive the digital revolution.
              </p>
              <p>
                Upgrade your IT Solutions by collaborating with a highly-skilled, experienced, hand-picked team of experts. We ensure your project is in your hands on time at an affordable price.
              </p>
              <p>
                Since day one, we have believed in a mutual win by creating world-class digital solutions. We paved our path in digital transformation through our proficiency in understanding business challenges and professional competence. We constantly strive to help our clients by harnessing the power of digital solutions, analytics, and advanced technologies to scale clients&apos; businesses.
              </p>
              <div className="row g-0 mb-3">
                <div className="col-sm-6 wow zoomIn" data-wow-delay="0.2s">
                  <h5 className="mb-3"><i className="fa fa-check text-primary me-3"></i>Award Winning</h5>
                  <h5 className="mb-3"><i className="fa fa-check text-primary me-3"></i>Professional Staff</h5>
                </div>
                <div className="col-sm-6 wow zoomIn" data-wow-delay="0.4s">
                  <h5 className="mb-3"><i className="fa fa-check text-primary me-3"></i>24/7 Support</h5>
                  <h5 className="mb-3"><i className="fa fa-check text-primary me-3"></i>Fair Prices</h5>
                </div>
              </div>
              <div className="d-flex align-items-center mb-4 wow fadeIn" data-wow-delay="0.6s">
                <div className="bg-primary d-flex align-items-center justify-content-center rounded" style={{ width: '60px', height: '60px' }}>
                  <i className="fa fa-phone-alt text-white"></i>
                </div>
                <div className="ps-4">
                  <h5 className="mb-2">Call to ask any question</h5>
                  <h4 className="text-primary mb-0">+918825948859</h4>
                </div>
              </div>
              <Link href="/quote">
                <button className="btnhover">
                  <span className="description">Request A Quote</span>
                  <div className="ocean"></div>
                </button>
              </Link>
            </div>
            <div className="col-lg-5" style={{ minHeight: '500px' }}>
              <div className="position-relative h-100">
                <img className="position-absolute w-100 h-75 rounded wow zoomIn" data-wow-delay="0.9s" src="/img/Home1.png" style={{ objectFit: 'cover' }} alt="About" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

      {/* Flip card (hidden section - same as original) */}
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
              <p className="ms-3">We specializes in custom mobile app design and development for iOS and Android platforms.</p>
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

      {/* Why Choose Us Start */}
      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container py-5">
          <div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
            <h5 className="fw-bold text-primary text-uppercase">Why Choose Us</h5>
            <h1 className="mb-0">We Are Here to Grow Your Business Exponentially</h1>
          </div>
          <div className="row g-5">
            <div className="col-lg-4">
              <div className="row g-5">
                <div className="col-12 wow zoomIn whychoose-boxshadow mb-4" data-wow-delay="0.2s">
                  <div className="bg-primary rounded d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="fa fa-cubes text-white" style={{ fontSize: '35px' }}></i>
                  </div>
                  <h4>Best In Industry</h4>
                  <p className="mb-0 pb-4">We are proud to offer a wide range of web developing and digital marketing services to build brand recognition and ultimately serve your customers well.</p>
                </div>
                <div className="col-12 wow zoomIn whychoose-boxshadow mb-4" data-wow-delay="0.6s">
                  <div className="bg-primary rounded d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="fa fa-award text-white" style={{ fontSize: '35px' }}></i>
                  </div>
                  <h4>Award Winning</h4>
                  <p className="mb-0 pb-4">We are proud to offer a wide range of web developing and digital marketing services to build brand recognition and ultimately serve your customers well.</p>
                </div>
                <div className="col-12 wow zoomIn whychoose-boxshadow mb-4" data-wow-delay="0.6s">
                  <div className="bg-primary rounded d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="fa fa-users text-white" style={{ fontSize: '35px' }}></i>
                  </div>
                  <h4>Happy Clients</h4>
                  <p className="mb-0 pb-4">We are proud to offer a wide range of web developing and digital marketing services to build brand recognition and ultimately serve your customers well.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow zoomIn" data-wow-delay="0.9s" style={{ minHeight: '350px' }}>
              <div className="position-relative h-100 border border-none">
                <img className="position-absolute w-100 h-100 rounded wow zoomIn" data-wow-delay="0.1s" src="/img/Whychooseus.jpg" style={{ objectFit: 'cover' }} alt="Why Choose Us" />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row g-5">
                <div className="col-12 wow zoomIn whychoose-boxshadow mb-4" data-wow-delay="0.4s">
                  <div className="bg-primary rounded d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="fa fa-users-cog text-white" style={{ fontSize: '35px' }}></i>
                  </div>
                  <h4>Professional Staff</h4>
                  <p className="mb-0 pb-4">We are proud to offer a wide range of web developing and digital marketing services to build brand recognition and ultimately serve your customers well.</p>
                </div>
                <div className="col-12 wow zoomIn whychoose-boxshadow mb-4" data-wow-delay="0.8s">
                  <div className="bg-primary rounded d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="fa fa-phone-alt text-white" style={{ fontSize: '35px' }}></i>
                  </div>
                  <h4>24/7 Support</h4>
                  <p className="mb-0 pb-4">We are proud to offer a wide range of web developing and digital marketing services to build brand recognition and ultimately serve your customers well.</p>
                </div>
                <div className="col-12 wow zoomIn whychoose-boxshadow mb-4" data-wow-delay="0.6s">
                  <div className="bg-primary rounded d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="fa fa-check text-white" style={{ fontSize: '35px' }}></i>
                  </div>
                  <h4>100% Success Rate</h4>
                  <p className="mb-0 pb-4">We are proud to offer a wide range of web developing and digital marketing services to build brand recognition and ultimately serve your customers well.</p>
                </div>
              </div>
              <Link href="/contact" className="btn btn-primary py-3 px-5 mt-3 wow zoomIn" data-wow-delay="0.9s">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
      {/* Why Choose Us End */}

      {/* Services Start */}
      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s" id="services">
        <div className="container py-5 servicscontainer">
          <div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
            <h5 className="fw-bold text-primary text-uppercase">Our Services</h5>
            <h1 className="mb-0">Custom IT Solutions for Your Successful Business</h1>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-lg-5 col-md-6 col-sm-12 wow slideInLeft servicsbgimg" data-wow-delay="0.3s">
              <div className="service-item rounded d-flex flex-column align-items-center justify-content-center text-center bom">
                <div className="service-icon">
                  <i className="fa fa-laptop text-white"></i>
                </div>
                <h4 className="mb-3">Web Developing</h4>
                <p className="m-0 text-dark">Providing comprehensive IT solutions and robust for seamless operations.</p>
                <Link href="/services/web-developing" className="btn btn-lg btn-primary rounded">
                  <i className="bi bi-arrow-right wow slideInDown"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 wow slideInRight digitalservicimg smres" data-wow-delay="0.6s">
              <div className="service-item rounded d-flex flex-column align-items-center justify-content-center text-center">
                <div className="service-icon">
                  <i className="fa fa-calendar-alt text-white"></i>
                </div>
                <h4 className="mb-3">Digital Marketing</h4>
                <p className="m-0 text-dark">Efficiently coordinate digital marketing campaigns with our experienced strategy team.</p>
                <Link href="/services/digital-marketing" className="btn btn-lg btn-primary rounded">
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 wow slideInLeft socialmediaserviceimg smres" data-wow-delay="0.3s">
              <div className="service-item rounded d-flex flex-column align-items-center justify-content-center text-center">
                <div className="service-icon">
                  <i className="fa fa-briefcase text-white"></i>
                </div>
                <h4 className="mb-3">Product Design</h4>
                <p className="m-0 text-dark">Product design encompasses the entire process of creating a product, from ideation to launch.</p>
                <Link href="/services/content-writing" className="btn btn-lg btn-primary rounded">
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 wow slideInRight seoservicesimg smres" data-wow-delay="0.6s">
              <div className="service-item rounded d-flex flex-column align-items-center justify-content-center text-center">
                <div className="service-icon">
                  <i className="fa fa-users text-white"></i>
                </div>
                <h4 className="mb-3">Video Ads &amp; Editing</h4>
                <p className="m-0 text-dark">We create eye-catching video ads that grab attention and drive results.</p>
                <Link href="/services/video-ads" className="btn btn-lg btn-primary rounded">
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Services End */}

      {/* Blog Start */}
      <div id="Blog">
        <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
          <div className="container py-5">
            <div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
              <h5 className="fw-bold text-primary text-uppercase">Latest Blogs</h5>
              <h1 className="mb-0">Read The Latest Articles from Our Blog Post</h1>
            </div>
            <div className="row g-5 latestblogresponsive">
              <div className="col-md-6 col-lg-4 wow slideInUp" data-wow-delay="0.3s">
                <div className="blog-item bg-light rounded radius overflow-hidden">
                  <div className="blog-img position-relative overflow-hidden">
                    <Link href="/blog/web-developing">
                      <img className="img-fluid" src="/img/Services/webdesiging2.jpg" style={{ height: '230px', width: '400px' }} alt="Web Developing Blog" />
                    </Link>
                    <Link className="position-absolute top-0 start-0 bg-primary text-white rounded-end mt-5 py-2 px-4" href="/blog/web-developing">Web Developing</Link>
                  </div>
                  <div className="p-4">
                    <div className="d-flex mb-3">
                      <small className="me-3"><i className="far fa-user text-primary me-2"></i>Anand</small>
                      <small><i className="far fa-calendar-alt text-primary me-2"></i>01 Mar, 2024</small>
                    </div>
                    <h5 className="mb-3"><b>Web Developing</b></h5>
                    <p>Web development is a multifaceted process that involves planning, designing, coding, and testing.</p>
                    <Link className="text-uppercase" href="/blog/web-developing">Read More <i className="bi bi-arrow-right"></i></Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 wow slideInUp" data-wow-delay="0.6s">
                <div className="blog-item bg-light rounded overflow-hidden radius2">
                  <div className="blog-img position-relative overflow-hidden">
                    <Link href="/blog/product-design">
                      <img className="img-fluid" src="/img/Services/product3.jpg" style={{ height: '230px', width: '400px' }} alt="Product Design Blog" />
                    </Link>
                    <Link className="position-absolute top-0 start-0 bg-primary text-white rounded-end mt-5 py-2 px-4" href="/blog/product-design">Product Design</Link>
                  </div>
                  <div className="p-4">
                    <div className="d-flex mb-3">
                      <small className="me-3"><i className="far fa-user text-primary me-2"></i>Subash</small>
                      <small><i className="far fa-calendar-alt text-primary me-2"></i>03 Mar, 2024</small>
                    </div>
                    <h5 className="mb-3"><b>Product Design</b></h5>
                    <p>Product design encompasses the entire process of creating a product, from ideation to launch.</p>
                    <Link className="text-uppercase" href="/blog/product-design">Read More <i className="bi bi-arrow-right"></i></Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 wow slideInUp" data-wow-delay="0.9s">
                <div className="blog-item bg-light rounded overflow-hidden radius">
                  <div className="blog-img position-relative overflow-hidden">
                    <Link href="/blog/content-writing">
                      <img className="img-fluid" src="/img/Services/contentwriting2.avif" style={{ height: '230px', width: '400px' }} alt="Content Writing Blog" />
                    </Link>
                    <Link className="position-absolute top-0 start-0 bg-primary text-white rounded-end mt-5 py-2 px-4" href="/blog/content-writing">Content Writing</Link>
                  </div>
                  <div className="p-4">
                    <div className="d-flex mb-3">
                      <small className="me-3"><i className="far fa-user text-primary me-2"></i>Karthik</small>
                      <small><i className="far fa-calendar-alt text-primary me-2"></i>07 Mar, 2024</small>
                    </div>
                    <h5 className="mb-3"><b>Content Writing</b></h5>
                    <p>Will AI Replace Writers?: What Today&apos;s Content Creators and Digital Marketers Should Know.</p>
                    <Link className="text-uppercase" href="/blog/content-writing">Read More <i className="bi bi-arrow-right"></i></Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 wow slideInUp" data-wow-delay="0.6s">
                <div className="blog-item bg-light rounded overflow-hidden radius2">
                  <div className="blog-img position-relative overflow-hidden">
                    <Link href="/blog/digital-marketing">
                      <img className="img-fluid" src="/img/Services/digitalmarketing2.jpg" style={{ height: '230px', width: '400px' }} alt="Digital Marketing Blog" />
                    </Link>
                    <Link className="position-absolute top-0 start-0 bg-primary text-white rounded-end mt-5 py-2 px-4" href="/blog/digital-marketing">Digital Marketing</Link>
                  </div>
                  <div className="p-4">
                    <div className="d-flex mb-3">
                      <small className="me-3"><i className="far fa-user text-primary me-2"></i>Anitha</small>
                      <small><i className="far fa-calendar-alt text-primary me-2"></i>10 Mar, 2024</small>
                    </div>
                    <h5 className="mb-3"><b>Digital Marketing</b></h5>
                    <p>Identifies services through which having ready office supplies, stationery, gift items, and uniforms is critical to business operation.</p>
                    <Link className="text-uppercase" href="/blog/digital-marketing">Read More <i className="bi bi-arrow-right"></i></Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 wow slideInUp" data-wow-delay="0.1s">
                <div className="blog-item bg-light rounded overflow-hidden radius">
                  <div className="blog-img position-relative overflow-hidden">
                    <Link href="/blog/video-ads">
                      <img className="img-fluid" src="/img/Services/product photoshoot.jpg" style={{ height: '230px', width: '400px' }} alt="Video Ads Blog" />
                    </Link>
                    <Link className="position-absolute top-0 start-0 bg-primary text-white rounded-end mt-5 py-2 px-4" href="/blog/video-ads">Product Photoshoot</Link>
                  </div>
                  <div className="p-4">
                    <div className="d-flex mb-3">
                      <small className="me-3"><i className="far fa-user text-primary me-2"></i>Shyam</small>
                      <small><i className="far fa-calendar-alt text-primary me-2"></i>10 Mar, 2024</small>
                    </div>
                    <h5 className="mb-3"><b>Product Photoshoot</b></h5>
                    <p>In the ever-evolving realm of product photography, innovative and creative ideas for capturing product images.</p>
                    <Link className="text-uppercase" href="/blog/video-ads">Read More <i className="bi bi-arrow-right"></i></Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 wow slideInUp" data-wow-delay="0.6s">
                <div className="blog-item bg-light rounded overflow-hidden radius2">
                  <div className="blog-img position-relative overflow-hidden">
                    <Link href="/blog/branding">
                      <img className="img-fluid" src="/img/Services/d.manpower.jpg" style={{ height: '230px', width: '400px' }} alt="Branding Blog" />
                    </Link>
                    <Link className="position-absolute top-0 start-0 bg-primary text-white rounded-end mt-5 py-2 px-4" href="/blog/branding">Digital Marketing</Link>
                  </div>
                  <div className="p-4">
                    <div className="d-flex mb-3">
                      <small className="me-3"><i className="far fa-user text-primary me-2"></i>Yadesh</small>
                      <small><i className="far fa-calendar-alt text-primary me-2"></i>12 Jan, 2023</small>
                    </div>
                    <h5 className="mb-3"><b>Digital Marketing</b></h5>
                    <p>In India&apos;s bustling digital market, staying ahead is crucial. Mastering top-tier link strategies is key to success.</p>
                    <Link className="text-uppercase" href="/blog/branding">Read More <i className="bi bi-arrow-right"></i></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Blog End */}

      {/* Vendor/Client Logos Marquee */}
      <LogoMarquee />

      {/* Fixed message icon */}
      <div className="fixed-panel">
        <div className="icon-container">
          <div className="tooltip-wrapper">
            <div className="tooltip-box tooltip-right">Message</div>
            <i className="fas fa-comment-dots main-icon" id="messageIcon" title="Message"></i>
          </div>
        </div>
      </div>
    </>
  );
}
