import LogoMarquee from "@/components/LogoMarquee";
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <>
      








<div className="container-fluid bg-primary py-5 bg-header" style={{'marginBottom': '90px'}}>
<div className="row py-5">
<div className="col-12 pt-lg-5 mt-lg-5 text-center">
<h1 className="display-4 text-white animated zoomIn">About Us</h1>
<a className="h5 text-white" href="">Home</a>
<i className="far fa-circle text-white px-2"></i>
<a className="h5 text-white" href="">About</a>
</div>
</div>
</div>







<div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s" id="about">
<div className="container py-5">
<div className="row g-5">
<div className="col-lg-7">
<div className="section-title position-relative pb-3 mb-5">
<h5 className="fw-bold text-primary text-uppercase">About Us</h5>
<h1 className="mb-0">The Best IT Solutions With Six Years of Experience</h1>
</div>
<p className="mb-4">
                    Tech Ghuru is a leading global IT Solutions company that offers web development, digital marketing, and multimedia services. We are dedicated, passionate service providers offering the best industry practices synced with technology expertise and business domain knowledge to drive the digital revolution.
                </p>
<p>
                    Upgrade your IT Solutions by collaborating with a highly-skilled, experienced, hand-picked team of experts. We ensure your project is in your hands on time at an affordable price.
                </p>
<p>
                    Since day one, we have believed in a mutual win by creating world-class digital solutions. We paved our path in digital transformation through our proficiency in understanding business challenges and professional competence. We constantly strive to help our clients by harnessing the power of digital solutions, analytics, and advanced technologies to scale clients’ businesses.
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
<div className="bg-primary d-flex align-items-center justify-content-center rounded" style={{'width': '60px', 'height': '60px'}}>
<i className="fa fa-phone-alt text-white"></i>
</div>
<div className="ps-4">
<h5 className="mb-2">Call to ask any question</h5>
<h4 className="text-primary mb-0">+918825948859</h4>
</div>
</div>

<a href="/quote">
<button className="btnhover">
<span className="description">
                                Request A Quote
                              </span>
<div className="ocean"></div>
</button>
</a>
</div>
<div className="col-lg-5" style={{'minHeight': '500px'}}>
<div className="position-relative h-100">
<img className="position-absolute w-100 h-100 rounded wow zoomIn" data-wow-delay="0.9s" src="/img/about2.png" style={{'objectFit': 'cover'}}/>
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



















    </>
  );
}
