import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import shanu1 from '../assets/images/shanu1.webp';
import ganesha from '../assets/images/ganesha.webp';
import marigold from '../assets/images/marigold.webp';

gsap.registerPlugin(ScrollTrigger);

const IntroSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const marigoldRef = useRef(null);
  const namesRef = useRef(null);
  const dateRef = useRef(null);

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
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Marigold scale and fade
      gsap.from(marigoldRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 1.2,
        delay: 0.3,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Names slide in
      gsap.from(namesRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Date fade in
      gsap.from(dateRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="w-full relative overflow-hidden pt-20 pb-12"
    >
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${shanu1})`,
          filter: 'blur(6px)',
          transform: 'scale(1.1)'
        }}
      />

      {/* Gradient Overlay - Primary Pink */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(220, 53, 69, 0.95) 0%, rgba(220, 53, 69, 0.85) 25%, rgba(220, 53, 69, 0.7) 50%, rgba(220, 53, 69, 0.85) 75%, rgba(220, 53, 69, 0.95) 100%)'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center gap-10 px-4 pt-4 pb-12">
        {/* Main Heading */}
        <h1 
          ref={headingRef}
          className="text-5xl md:text-6xl lg:text-7xl" 
          style={{ fontFamily: "'Rozha One', serif", color: '#FFFFFF' }}
        >
          शादी का निमंत्रण
        </h1>

        {/* Marigold with Ganesha */}
        <div 
          ref={marigoldRef}
          className="relative w-40 h-40 md:w-48 md:h-48"
        >
          {/* Rotating Marigold */}
          <img 
            src={marigold} 
            alt="Marigold" 
            className="w-full h-full object-contain animate-rotate-slow"
          />
          {/* Ganesha at Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <img src={ganesha} alt="Ganesha" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
          </div>
        </div>

        {/* Groom Sang Bride */}
        <div 
          ref={namesRef}
          className=""
        >
          <p className="text-5xl md:text-6xl lg:text-7xl" style={{ fontFamily: "'Rozha One', serif", color: '#FFFFFF' }}>
            <span>दिव्येश</span>
            <span className="mx-4">संग</span>
            <span>पूजा</span>
          </p>
        </div>

        {/* Day and Date */}
        <div 
          ref={dateRef}
          className="text-2xl md:text-3xl" 
          style={{ fontFamily: "'Arya', sans-serif", color: '#FFFFFF' }}
        >
          <p>रविवार, 30 नवम्बर 2025</p>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
