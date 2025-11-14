import React, { useRef } from 'react';
import radha from '../assets/svgs/radha.svg';
import { useScrollAnimator } from '../hooks/useScrollAnimator';

const BaalManuhaarSection = () => {
  const sectionRef = useRef(null);
  useScrollAnimator(sectionRef, { threshold: 0.2 });

  return (
    <div 
      ref={sectionRef}
      className="w-full pt-8 pb-32 px-4 relative" 
      style={{ backgroundColor: '#FFC300' }}
    >
      {/* Radha SVG Background - Mobile Only */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none lg:hidden"
        style={{
          backgroundImage: `url(${radha})`,
          backgroundSize: '65%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Section Heading */}
      <div className="text-center mb-10 relative z-10">
        <h2 
          className="text-4xl md:text-5xl mb-8"
          style={{ fontFamily: "'Rozha One', serif", color: '#DC3545' }}
          data-animate="fade-down"
        >
          बाल मनुहार
        </h2>
      </div>

      {/* Children Names */}
      <div className="max-w-4xl mx-auto text-center relative z-10" data-animate="fade-up" data-animate-delay="150ms">
        <p className="text-xl md:text-2xl" style={{ color: '#1A1A1A' }}>
          मितांश, रिधान, जिज्ञासा, निलांशी, नमस्वी, अयांशी, रिशिव, श्री
        </p>
      </div>
    </div>
  );
};

export default BaalManuhaarSection;

