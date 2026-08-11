'use client';

import { useEffect, useState } from 'react';

export default function Spinner() {
  // Use null as initial state - renders nothing on server, then decides on client
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // During SSR and before hydration: render the spinner with 'show' class
  // so server and client match on first render
  if (!mounted) {
    return (
      <div
        id="spinner"
        className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
        style={{ zIndex: 9999 }}
      >
        <div className="spinner"></div>
      </div>
    );
  }

  if (!loading) return null;

  return (
    <div
      id="spinner"
      className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      style={{ zIndex: 9999 }}
    >
      <div className="spinner"></div>
    </div>
  );
}
