import React, { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import frameLeft from '../assets/images/frame-left.webp';
import frameRight from '../assets/images/frame-right.webp';
import womenLeft from '../assets/images/women-left.webp';
import womenRight from '../assets/images/women-right.webp';
import ganesha from '../assets/images/ganesha.webp';
import BloomingFlower from '../components/BloomingFlower';
import CherryBlossom from '../components/CherryBlossom';
import FlowerGarden from '../components/FlowerGarden';
import Butterflies from '../components/Butterflies';
import '../styles/bloomingFlower.css';
import '../styles/butterfly.css';

gsap.registerPlugin(ScrollTrigger);

const HeroLayout= ({
  topLeft,
  topCenter,
  topRight,
  middleLeft,
  middleCenter,
  middleRight,
  bottomLeft,
  bottomCenter,
  bottomRight,
}) => {
  const sectionRef = useRef(null);
  const omRef = useRef(null);
  const groomRef = useRef(null);
  const sangRef = useRef(null);
  const brideRef = useRef(null);
  const womenLeftRef = useRef(null);
  const womenRightRef = useRef(null);
  const framesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Om Shri Ganeshay Namah
      gsap.from(omRef.current, {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      // Groom section slide from left
      gsap.from(groomRef.current, {
        opacity: 0,
        x: -100,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      // Sang separator scale
      gsap.from(sangRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      // Bride section slide from right
      gsap.from(brideRef.current, {
        opacity: 0,
        x: 100,
        duration: 1,
        delay: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      // Women images fade in
      if (womenLeftRef.current) {
        gsap.from(womenLeftRef.current, {
          opacity: 0,
          x: -50,
          duration: 1.2,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      if (womenRightRef.current) {
        gsap.from(womenRightRef.current, {
          opacity: 0,
          x: 50,
          duration: 1.2,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Frames rotate in
      framesRef.current.forEach((frame, index) => {
        if (frame) {
          gsap.from(frame, {
            opacity: 0,
            rotation: index === 0 ? -90 : 90,
            scale: 0.5,
            duration: 1,
            delay: 1.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="hero-layout-section w-full h-screen relative overflow-hidden bg-white"
    >
      {/* Cherry Blossom Effect */}
      <CherryBlossom />
      
      {/* Decorative Frames - Bottom Only */}
      <div 
        ref={el => framesRef.current[0] = el}
        className="absolute bottom-16 -left-4 z-10"
      >
        <img src={frameLeft} alt="Frame Left" className="h-48 w-auto object-contain rotate-[270deg]" />
      </div>
      <div 
        ref={el => framesRef.current[1] = el}
        className="absolute bottom-16 -right-4 z-10"
      >
        <img src={frameRight} alt="Frame Right" className="h-48 w-auto object-contain rotate-90" />
      </div>

      {/* Main Content Container */}
      <div className="w-full h-full flex flex-col items-center justify-start pt-4 pb-48 md:pt-6 md:pb-40 px-4 relative">
        {/* Om Shree Ganeshay Namah */}
        <div 
          ref={omRef}
          className="w-full text-center mb-12 md:mb-16"
        >
          <p className="text-2xl md:text-3xl" style={{ fontFamily: "'Rozha One', serif", color: '#E0115F' }}>
            ॐ श्री गणेशाय नमः
          </p>
        </div>

        {/* Women Images - Mobile Only */}
        <img 
          ref={womenLeftRef}
          src={womenLeft} 
          alt="Woman Left" 
          className="h-[500px] w-auto absolute left-[-10%] top-[40%] -translate-y-1/2 lg:hidden" 
        />
        <img 
          ref={womenRightRef}
          src={womenRight} 
          alt="Woman Right" 
          className="h-[500px] w-auto absolute right-[-10%] top-[40%] -translate-y-1/2 lg:hidden" 
        />

        {/* Center Content - Names and Parents */}
        <div className="w-full max-w-4xl flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 z-10">
          {/* Groom Section */}
          <div 
            ref={groomRef}
            className="flex flex-col gap-4 w-full lg:w-auto"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold" style={{ color: '#E0115F' }}>दिव्येश</h2>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">सुपौत्र</p>
              <p className="text-sm text-gray-700 mb-1">श्रीमती ग़ुलाबबाई</p>
              <p className="text-sm text-gray-700">स्व. श्री प्रभुदयालजी गौड़</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">सुपुत्र</p>
              <p className="text-sm text-gray-700">श्रीमती रानी - दिनेश गौड़</p>
            </div>
          </div>

          {/* Sang Separator */}
          <div 
            ref={sangRef}
            className="text-center flex items-center gap-4"
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gray-400"></div>
            <p className="text-6xl" style={{ color: '#FFC300', fontFamily: "'Rozha One', serif" }}>संग</p>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gray-400"></div>
          </div>

          {/* Bride Section */}
          <div 
            ref={brideRef}
            className="flex flex-col gap-4 w-full lg:w-auto"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold" style={{ color: '#E0115F' }}>पूजा</h2>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">सुपौत्री</p>
              <p className="text-sm text-gray-700 mb-1">श्रीमती कमलादेवी</p>
              <p className="text-sm text-gray-700">स्व. श्री रामस्वरूपजी शर्मा पटेल सा</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">सुपुत्री</p>
              <p className="text-sm text-gray-700">श्रीमती गीता - श्री सुरेंद्रजी शर्मा</p>
            </div>
          </div>
        </div>
      </div>

      {/* Flower Garden at bottom center */}
      <FlowerGarden />

      {/* Butterflies Container - Bottom area only */}
      <div className="butterfly-container absolute bottom-32 left-0 right-0 h-[150px] overflow-hidden pointer-events-none z-30">
        <Butterflies minY={0} maxY={150} count={5} />
      </div>
    </div>
  );
};

export default HeroLayout;
