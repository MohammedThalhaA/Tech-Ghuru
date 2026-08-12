import React from 'react';

const LogoMarquee: React.FC = () => {
  const logos = [
    'sai.jpeg',
    'dhara.jpeg',
    'divine.jpeg',
    'mithra.jpeg'
  ];

  return (
    <div className="wrapper container" suppressHydrationWarning>
      <div className="marquee" data-speed="60" suppressHydrationWarning>
        <div className="marquee__ctn" suppressHydrationWarning>
          <div className="marquee__track" suppressHydrationWarning>
            {logos.map((logo, i) => (
              <div key={`track1-${i}`} className="marquee__item">
                <img src={`/img/vendor/${logo}`} alt="LOGO" />
              </div>
            ))}
          </div>
          <div className="marquee__track" aria-hidden="true" suppressHydrationWarning>
            {logos.map((logo, i) => (
              <div key={`track2-${i}`} className="marquee__item">
                <img src={`/img/vendor/${logo}`} alt="LOGO" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoMarquee;
