import React, { useRef } from 'react';
import { useScrollAnimator } from '../hooks/useScrollAnimator';

const VenueSection = () => {
  const sectionRef = useRef(null);
  useScrollAnimator(sectionRef, { threshold: 0.2 });

  return (
    <div 
      ref={sectionRef}
      className="w-full pt-8 pb-32 px-4" 
      style={{ backgroundColor: '#FFC300' }}
    >
      {/* Section Heading */}
      <div className="text-center mb-6">
        <h2 
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "'Rozha One', serif", color: '#DC3545' }}
          data-animate="fade-down"
        >
          प्रीतिभोज
        </h2>
      </div>

      {/* Content */}
      <div 
        className="max-w-4xl mx-auto text-center"
        data-animate="fade-up"
        data-animate-delay="150ms"
      >
        <div className="space-y-6">
          {/* Venue Details */}
          <div>
            <p className="text-2xl md:text-3xl mb-4" style={{ color: '#1A1A1A', fontFamily: "'Rozha One', serif" }}>
              सेठीया मैरिज गार्डन रतलाम
            </p>
            <a
              href="https://maps.app.goo.gl/CmjuX7MwLk5Ec8Wh8"
              target="_blank"
              rel="noopener noreferrer"
              data-offline-disabled="true"
              className="inline-flex items-center gap-2 mt-3 px-6 py-3 text-base text-white rounded-full transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#DC3545' }}
            >
              स्थान देखें
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-bounce-diagonal"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueSection;

