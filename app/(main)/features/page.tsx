"use client";

import Link from 'next/link';
import Image from 'next/image';
import { submitContact } from '@/app/actions/contact';

export default function Page() {
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
      








<div className="container-fluid bg-primary py-5 bg-header" style={{'marginBottom': '90px'}}>
<div className="row py-5">
<div className="col-12 pt-lg-5 mt-lg-5 text-center">
<h1 className="display-4 text-white animated zoomIn">Features</h1>
<a className="h5 text-white" href="index.jsp">Home</a>
<i className="far fa-circle text-white px-2"></i>
<a className="h5 text-white" href="">Features</a>
</div>
</div>
</div>






<div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
<div className="container py-5">
<div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{'maxWidth': '600px'}}>
<h5 className="fw-bold text-primary text-uppercase">Why Choose Us</h5>
<h1 className="mb-0">We Are Here to Grow Your Business Exponentially</h1>
</div>
<div className="row g-5">
<div className="col-lg-4">
<div className="row g-5">
<div className="col-12 wow zoomIn" data-wow-delay="0.2s">
<div className="bg-primary rounded d-flex align-items-center justify-content-center mb-3" style={{'width': '60px', 'height': '60px'}}>
<i className="fa fa-cubes text-white" style={{'fontSize': '35px'}}></i>
</div>
<h4>Best In Industry</h4>
<p className="mb-0">We are proud to offer a wide range of web developing and digital marketing services to build brand recognition and ultimately serve your customers well.</p>
</div>
<div className="col-12 wow zoomIn" data-wow-delay="0.6s">
<div className="bg-primary rounded d-flex align-items-center justify-content-center mb-3" style={{'width': '60px', 'height': '60px'}}>
<i className="fa fa-award text-white" style={{'fontSize': '35px'}}></i>
</div>
<h4>Award Winning</h4>
<p className="mb-0">We are proud to offer a wide range of web developing and digital marketing services to build brand recognition and ultimately serve your customers well.</p>
</div>
<div className="col-12 wow zoomIn" data-wow-delay="0.6s">
<div className="bg-primary rounded d-flex align-items-center justify-content-center mb-3" style={{'width': '60px', 'height': '60px'}}>
<i className="fa fa-users text-white" style={{'fontSize': '35px'}}></i>
</div>
<h4>Happy Clients</h4>
<p className="mb-0">We are proud to offer a wide range of web developing and digital marketing services to build brand recognition and ultimately serve your customers well.</p>
</div>
</div>
</div>
<div className="col-lg-4 wow zoomIn" data-wow-delay="0.9s" style={{'minHeight': '350px'}}>
<div className="position-relative h-100">
<img className="position-absolute w-100 h-100 rounded wow zoomIn" data-wow-delay="0.1s" src="img\vendor\staff.jpg" style={{'objectFit': 'cover'}}/>
</div>
</div>
<div className="col-lg-4">
<div className="row g-5">
<div className="col-12 wow zoomIn" data-wow-delay="0.4s">
<div className="bg-primary rounded d-flex align-items-center justify-content-center mb-3" style={{'width': '60px', 'height': '60px'}}>
<i className="fa fa-users-cog text-white" style={{'fontSize': '35px'}}></i>
</div>
<h4>Professional Staff</h4>
<p className="mb-0">We are proud to offer a wide range of web developing and digital marketing services to build brand recognition and ultimately serve your customers well.</p>
</div>
<div className="col-12 wow zoomIn" data-wow-delay="0.8s">
<div className="bg-primary rounded d-flex align-items-center justify-content-center mb-3" style={{'width': '60px', 'height': '60px'}}>
<i className="fa fa-phone-alt text-white" style={{'fontSize': '35px'}}></i>
</div>
<h4>24/7 Support</h4>
<p className="mb-0">We are proud to offer a wide range of web developing and digital marketing services to build brand recognition and ultimately serve your customers well. </p>
</div>
<div className="col-12 wow zoomIn" data-wow-delay="0.6s">
<div className="bg-primary rounded d-flex align-items-center justify-content-center mb-3" style={{'width': '60px', 'height': '60px'}}>
<i className="fa fa-check text-white" style={{'fontSize': '35px'}}></i>
</div>
<h4>100% Success Rate</h4>
<p className="mb-0">We are proud to offer a wide range of web developing and digital marketing services to build brand recognition and ultimately serve your customers well.</p>
</div>
</div>
<a className="btn btn-primary py-3 px-5 mt-3 wow zoomIn" data-wow-delay="0.9s" href="#Contact">Contact Us</a>
</div>
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
<a className="btn btn-primary py-3 px-5 mt-3 wow zoomIn" data-wow-delay="0.9s" href="#Contact">Request A Quote</a>
</div>
<div className="col-lg-5" style={{'minHeight': '500px'}}>
<div className="position-relative h-100">
<img className="position-absolute w-100 h-100 rounded wow zoomIn" data-wow-delay="0.9s" src="/img/about.jpg" style={{'objectFit': 'cover'}}/>
</div>
</div>
</div>
</div>
</div>


<div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s" id="services">
<div className="container py-5">
<div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{'maxWidth': '600px'}}>
<h5 className="fw-bold text-primary text-uppercase">Our Services</h5>
<h1 className="mb-0">Custom IT Solutions for Your Successful Business</h1>
</div>
<div className="row g-5">
<div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
<div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
<div className="service-icon">
<i className="fa fa-laptop text-white"></i>
</div>
<h4 className="mb-3">IT Solutions &amp; IT Infrastructure</h4>
                    <p className="m-0">Providing comprehensive IT solutions and robust IT infrastructure services for seamless operations.</p>
                    <a className="btn btn-lg btn-primary rounded" href="/services">
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.6s">
                  <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                    <div className="service-icon">
                      <i className="fa fa-calendar-alt text-white"></i>
                    </div>
                    <h4 className="mb-3">Corporate Events Management</h4>
                    <p className="m-0">Efficiently coordinate corporate events with our experienced management team.</p>
                    <a className="btn btn-lg btn-primary rounded" href="/services">
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.9s">
                  <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                    <div className="service-icon">
                      <i className="fa fa-archive text-white"></i>
                    </div>
                    <h4 className="mb-3">Corporate Supplies</h4>
                    <p className="m-0">Elevate your workplace efficiency with our comprehensive corporate supply services.</p>
                    <a className="btn btn-lg btn-primary rounded" href="/services">
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
                  <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                    <div className="service-icon">
                      <i className="fa fa-briefcase text-white"></i>
                    </div>
                    <h4 className="mb-3">Logistics And Operations Management</h4>
                    <p className="m-0">Optimize your business processes with our expert logistics and operations solutions.</p>
                    <a className="btn btn-lg btn-primary rounded" href="/services">
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.6s">
                  <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                    <div className="service-icon">
                      <i className="fa fa-users text-white"></i>
                    </div>
                    <h4 className="mb-3">Manpower Solutions</h4>
                    <p className="m-0">Unlock the potential of your business with our strategic manpower services.</p>
                    <a className="btn btn-lg btn-primary rounded" href="/services">
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
</div>
<div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.9s">
<div className="position-relative bg-primary rounded h-100 d-flex flex-column align-items-center justify-content-center text-center p-5">
<h3 className="text-white mb-3">Contact Us</h3>
<p className="text-white mb-3">Let's optimize operations for growth together.</p>
<h2 className="text-white mb-0">+918825948859</h2>
<a className="btn btn-lg btn-primary rounded" href="#Contact">
<i className="bi bi-arrow-right"></i>
</a>
</div>
</div>
</div>
</div>
</div>


<div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
<div className="container py-5 mb-5 a">
<div className="bg-white aa">
<div className="owl-carousel vendor-carousel">
<a href="https://www.ghurudev.com/">

<img alt="" height="100" src="img\vendor\brand1.png" style={{'boxShadow': 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}} width="100"/>
</a>
<a href="https://newsghuru.in/">
<img alt="" height="100" src="img\vendor\newbrand5.png" style={{'boxShadow': 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}} width="100"/>
</a>
<a href="https://www.ghurudev.in/">
<img alt="" height="100" src="img\vendor\brand1.png" style={{'boxShadow': 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}} width="100"/>
</a>

<a href="https://www.healthghuru.com/">
<img alt="" height="100" src="img\vendor\brand3.png" style={{'boxShadow': 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}} width="100"/>
</a>

<a href="https://jaysontrust.in/">
<img alt="" height="100" src="img\vendor\brand2.png" style={{'boxShadow': 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}} width="100"/>
</a>

<a href="https://vrtechnology.in/">
<img alt="" height="100" src="img\vendor\vrtech.png" style={{'boxShadow': 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}} width="100"/>
</a>

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
<div className="d-flex align-items-center wow fadeIn" data-wow-delay="0.1s">
<div className="bg-primary d-flex align-items-center justify-content-center rounded" style={{'width': '60px', 'height': '60px'}}>
<i className="fa fa-phone-alt text-white"></i>
</div>
<div className="ps-4">
<h5 className="mb-2">Call to ask any question</h5>
<h4 className="text-primary mb-0">+91 8825948859</h4>
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
<h4 className="text-primary mb-0">info@myyakobu.in</h4>
</div>
</div>
</div>
<div className="col-lg-4">
<div className="d-flex align-items-center wow fadeIn" data-wow-delay="0.8s">
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
<div className="col-lg-6 wow slideInUp" data-wow-delay="0.3s">
<form onSubmit={handleFormSubmit}>
<div className="row g-3">
<div className="col-md-6">
<input autoComplete="on" className="form-control border-0 bg-light px-4" id="name" name="name" placeholder="Name" required style={{'height': '55px'}} type="text"/>
</div>
<div className="col-md-6">
<input className="form-control border-0 bg-light px-4" id="email" name="email" pattern="[^ @]*@[^ @]*" placeholder="Your Email" required style={{'height': '55px'}} type="text"/>
</div>
<div className="col-md-6">
<input autoComplete="on" className="form-control border-0 bg-light px-4" id="mobile" name="mobile" placeholder="Mobile Number" required style={{'height': '55px'}} type="text"/>
</div>
<div className="col-md-6">
<input autoComplete="on" className="form-control border-0 bg-light px-4" id="subject" name="subject" placeholder="Subject" required style={{'height': '55px'}} type="text"/>
</div>
<div className="col-MD-12">
<textarea className="form-control border-0 bg-light px-4 py-3" id="message" name="message" placeholder="Message" required></textarea>
</div>
<div className="col-12">
<input className="btn btn-primary w-100 py-3" name="submit" type="submit" value="Submit"/>
</div>
</div>
</form>
</div>
<div className="col-lg-6 wow slideInUp" data-wow-delay="0.6s">
<iframe allowFullScreen aria-hidden="false" className="position-relative rounded w-100 h-100" frameBorder="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.815722881597!2d80.1842351!3d13.110857599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5263e914698297%3A0x167e1f23f9c8c275!2sYAKOBU%20BUSINESS%20Solutions!5e0!3m2!1sen!2sin!4v1669283367873!5m2!1sen!2sin" style={{'minHeight': '350px', 'border': '0'}} tabIndex={0}></iframe>
</div>
</div>
</div>
</div>






<a className="btn btn-lg btn-primary btn-lg-square rounded back-to-top" href="#"><i className="bi bi-arrow-up"></i></a>











    </>
  );
}
