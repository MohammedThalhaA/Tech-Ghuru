import type { Metadata } from "next";
import "./globals.css";
import Spinner from "@/components/Spinner";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Atriowings Technologies",
  description:
    "Atriowings Technologies is a leading global IT Solutions company that offers Web development, digital marketing and multimedia services.",
  keywords: "IT Solutions, Web Development, Digital Marketing, Multimedia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <link rel="icon" href="/img/indexlogo.png" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Rubik:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome 6 (includes all FA5 icons) */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        {/* Bootstrap Icons */}
        <link
          href="/css/bootstrap.min.css"
          rel="stylesheet"
        />
        {/* Main Custom Stylesheet */}
        <link
          href="/css/style.css"
          rel="stylesheet"
        />
        {/* Bootstrap Icons CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
          rel="stylesheet"
        />
        {/* Common cursor styles */}
        <link href="/css/cursor.css" rel="stylesheet" />
        {/* Animate.css for WOW.js animations */}
        <link
          href="/lib/animate/animate.min.css"
          rel="stylesheet"
        />
        {/* Owl Carousel CSS */}
        <link
          href="/lib/owlcarousel/assets/owl.carousel.min.css"
          rel="stylesheet"
        />
        {/* jQuery */}
        <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="beforeInteractive" />
        {/* Easing */}
        <Script src="/lib/easing/easing.min.js" strategy="beforeInteractive" />
        {/* WOW.js animations */}
        <Script src="/lib/wow/wow.min.js" strategy="beforeInteractive" />
        {/* Owl Carousel */}
        <Script src="/lib/owlcarousel/owl.carousel.min.js" strategy="beforeInteractive" />
        {/* Counter */}
        <Script src="/lib/counterup/counterup.min.js" strategy="beforeInteractive" />
        {/* Waypoints */}
        <Script src="/lib/waypoints/waypoints.min.js" strategy="beforeInteractive" />
      </head>
      <body>
        <Spinner />
        {children}

        {/* Back to Top Button */}
        <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded back-to-top">
          <i className="bi bi-arrow-up"></i>
        </a>

        {/* Cursor circles - exactly as in original */}
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>

        {/* Bootstrap JS */}
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        {/* Custom cursor */}
        <Script src="/js/cursor.js" strategy="afterInteractive" />
        {/* Main JS */}
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
