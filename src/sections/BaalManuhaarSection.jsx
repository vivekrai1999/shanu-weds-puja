import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BaalManuhaarSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const quoteRef = useRef(null);

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

      // Quote animation
      gsap.from(quoteRef.current, {
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
      className="w-full pt-8 pb-32 px-4" 
      style={{ backgroundColor: '#FFC300' }}
    >
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl mb-8"
          style={{ fontFamily: "'Rozha One', serif", color: '#DC3545' }}
        >
          बाल मनुहार
        </h2>
      </div>

      {/* Children Names */}
      <div 
        ref={quoteRef}
        className="max-w-4xl mx-auto text-center"
      >
        <p className="text-xl md:text-2xl" style={{ color: '#1A1A1A' }}>
          मितांश, रिधान, जिज्ञासा, निलांशी, नमस्वी, अयांशी, रिशिव, श्री
        </p>
      </div>
    </div>
  );
};

export default BaalManuhaarSection;

