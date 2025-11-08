import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VenueSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Content fade in
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="w-full pb-16 px-4" 
      style={{ backgroundColor: '#FFC300' }}
    >
      {/* Section Heading */}
      <div className="text-center mb-6">
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "'Rozha One', serif", color: '#DC3545' }}
        >
          प्रीतिभोज
        </h2>
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="space-y-6">
          {/* Venue Details */}
          <div>
            <p className="text-lg mb-4" style={{ color: '#1A1A1A' }}>
              सेठीया मैरिज गार्डन रतलाम
            </p>
            <a
              href="https://share.google/iH9qmGrdJfB5ISHm9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 px-6 py-3 text-base text-white rounded-full transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#DC3545' }}
            >
              स्थान देखें
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueSection;

