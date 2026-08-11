'use client';

import Link from 'next/link';

export default function Topbar() {
  return (
    <div className="container-fluid bg-dark px-5 d-none d-xl-block" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .topbar-flex-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 45px;
          width: 100%;
        }
        .topbar-left-info {
          display: flex;
          align-items: center;
          gap: 24px;
          font-size: 13px;
        }
        .topbar-address-text {
          display: inline-block;
          vertical-align: middle;
          white-space: nowrap;
        }
        
        @media (max-width: 1500px) {
          .topbar-left-info {
            font-size: 12px;
            gap: 16px;
          }
        }
        
        @media (max-width: 1350px) {
          .topbar-left-info {
            font-size: 11.5px;
            gap: 12px;
          }
        }
      ` }} />

      <div className="topbar-flex-row">
        {/* Left Side: Address, Phone, Email */}
        <div className="topbar-left-info">
          <span className="text-light" style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
            <i className="fa fa-map-marker-alt me-2" style={{ color: '#38BDF8' }}></i>
            <span className="topbar-address-text" title="No. 1, Gurudev Complex, 57th St, Venkatraman Nagar, Korattur, Chennai - 600 080.">
              No. 1, Gurudev Complex, 57th St, Venkatraman Nagar, Korattur, Chennai - 600 080.
            </span>
          </span>
          <span className="text-light" style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
            <i className="fa-solid fa-phone me-2" style={{ color: '#38BDF8' }}></i>+91 8825948859
          </span>
          <span className="text-light" style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
            <i className="fa fa-envelope-open me-2" style={{ color: '#38BDF8' }}></i>info@atriowings.in
          </span>
        </div>

        {/* Right Side: Social Media Icons */}
        <div className="d-inline-flex align-items-center" style={{ height: '45px' }}>
          <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href="https://x.com/atriowings">
            <i className="fab fa-twitter fw-normal"></i>
          </a>
          <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href="https://www.facebook.com/people/AtrioWings-Technologies/100082503773842/">
            <i className="fab fa-facebook-f fw-normal"></i>
          </a>
          <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href="https://www.linkedin.com/posts/atriowings_atriowings-atriowingstechnologies-business-activity-6910483218567741440-4G05/">
            <i className="fab fa-linkedin-in fw-normal"></i>
          </a>
          <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle" href="https://www.instagram.com/atriowingstechnologies/">
            <i className="fab fa-instagram fw-normal"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
