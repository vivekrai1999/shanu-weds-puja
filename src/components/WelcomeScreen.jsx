import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import indianGate from '../assets/images/indian-gate.webp';
import couplePhoto from '../assets/images/couple.webp';
import Grass from './Grass';
import FlowerGarden from './FlowerGarden';
import Butterflies from './Butterflies';
import CherryBlossom from './CherryBlossom';
import tree from '../assets/svgs/tree.svg';

const WelcomeScreen = ({ onOpen }) => {
  const coupleRef = useRef(null);
  const headingRef = useRef(null);
  const namesRef = useRef(null);
  const buttonRef = useRef(null);
  const treeLeftRef = useRef(null);
  const treeRightRef = useRef(null);

  useEffect(() => {
    // Floating animation for couple photo
    if (coupleRef.current) {
      gsap.to(coupleRef.current, {
        y: -15,
        duration: 2.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true
      });
    }

    // Tree swaying animations
    if (treeLeftRef.current) {
      gsap.to(treeLeftRef.current, {
        rotation: -3,
        transformOrigin: 'bottom center',
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    }

    if (treeRightRef.current) {
      gsap.to(treeRightRef.current, {
        rotation: 3,
        transformOrigin: 'bottom center',
        duration: 3.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.5
      });
    }

    // Text animations
    const timeline = gsap.timeline();
    
    if (headingRef.current) {
      gsap.set(headingRef.current, { opacity: 0, y: -30 });
      timeline.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      });
    }

    if (namesRef.current) {
      gsap.set(namesRef.current, { opacity: 0, y: 20 });
      timeline.to(namesRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.5');
    }

    if (buttonRef.current) {
      gsap.set(buttonRef.current, { opacity: 0, scale: 0.8 });
      timeline.to(buttonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }, '-=0.3');
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" style={{ 
        background: 'linear-gradient(to bottom, #fef9e7 0%, #fdebd0 30%, #fce4bb 60%, #fddca8 100%)'
      }}>
      {/* Cherry Blossom Animation */}
      <div className="absolute inset-0" style={{ zIndex: 5 }}>
        <CherryBlossom id="welcome_cherry_blossom" />
      </div>

      {/* Custom Cherry Blossom Styles */}
      <style>{`
        #welcome_cherry_blossom .petal {
          transform: scale(0.6);
        }
      `}</style>

      {/* Indian Gate Frame - Covers entire screen */}
      <div className="absolute inset-0 flex items-start justify-center z-20">
        <img
          src={indianGate}
          alt="Indian Gate"
          className="min-w-full w-auto h-auto object-contain drop-shadow-2xl"
          style={{ 
            transform: 'scale(1.15, 1.0)',
            maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
          }}
        />
      </div>
            
      {/* Vivah Nimantran Text */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 text-center" style={{ zIndex: 60 }}>
        <h1 
          ref={headingRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-amber-800 mb-4"
          style={{ 
            fontFamily: "'Rozha One', serif",
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          विवाह निमंत्रण
        </h1>
        
        {/* Couple Names */}
        <p 
          ref={namesRef}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-900 mb-6"
          style={{ 
            fontFamily: "'Rozha One', serif",
            textShadow: '1px 1px 3px rgba(0,0,0,0.2)'
          }}
        >
          दिव्येश संग पूजा
        </p>
        
        {/* Open Invitation Button */}
        <button
          ref={buttonRef}
          onClick={onOpen}
          className="mt-4 px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg text-white bg-amber-700 hover:bg-amber-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          style={{
            fontFamily: "'Arya', sans-serif"
          }}
        >
          निमंत्रण खोलें
        </button>
      </div>

      {/* Couple Photo - Bottom center, above grass */}
      <div ref={coupleRef} className="absolute bottom-[120px] sm:bottom-[140px] md:bottom-[160px] left-1/2 -translate-x-1/2 z-30">
        <img
          src={couplePhoto}
          alt="Couple"
          className="w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] xl:w-[480px] h-auto object-contain drop-shadow-2xl"
          style={{
            maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
          }}
        />
      </div>

      {/* Grass Component - At the bottom */}
      <div className="absolute bottom-0 left-0 right-0" style={{ zIndex: 35 }}>
        <Grass
          width={typeof window !== 'undefined' ? window.innerWidth * 1.5 : 1800}
          height={100}
          totalBlades={60}
          offset={0}
          maxHeight={120}
          showButton={false}
          containerStyle={{
            height: '100px',
            overflow: 'visible'
          }}
                />
              </div>
              
      {/* Flower Garden - Multiple instances at the bottom */}
      <div className="absolute left-0 right-0" style={{ zIndex: 40, bottom: '-80px' }}>
        <div className="relative w-full">
          <FlowerGarden />
        </div>
      </div>

      <div className="absolute left-[15%] -translate-x-1/2" style={{ zIndex: 41, bottom: '-80px' }}>
        <FlowerGarden />
      </div>

      <div className="absolute right-[15%] translate-x-1/2" style={{ zIndex: 41, bottom: '-80px' }}>
        <FlowerGarden />
      </div>

      {/* Butterflies - Flying at the bottom */}
      <div className="butterfly-container absolute left-0 right-0" style={{ zIndex: 50, pointerEvents: 'none', height: '200px', bottom: '-50px', transform: 'scale(0.7)' }}>
        <Butterflies minY={0} maxY={180} count={2} />
          </div>

      {/* Tree - Bottom Left */}
      <div ref={treeLeftRef} className="absolute" style={{ zIndex: 38, left: '-160px', bottom: '-100px' }}>
        <img
          src={tree}
          alt="Tree"
          className="h-[360px] sm:h-[440px] md:h-[520px] w-auto object-contain"
        />
      </div>

      {/* Tree - Bottom Right */}
      <div ref={treeRightRef} className="absolute" style={{ zIndex: 38, right: '-160px', bottom: '-100px' }}>
        <img
          src={tree}
          alt="Tree"
          className="h-[360px] sm:h-[440px] md:h-[520px] w-auto object-contain transform scale-x-[-1]"
        />
      </div>

    </div>
  );
};

export default WelcomeScreen;
