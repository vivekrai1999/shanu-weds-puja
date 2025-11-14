import React, { useRef } from 'react';
import indianGate from '../assets/images/indian-gate.webp';
import couplePhoto from '../assets/images/couple.webp';
import flowerGarland from '../assets/images/flower.webp';
import FlowerGarden from './FlowerGarden';
import Butterflies from './Butterflies';
import CherryBlossom from './CherryBlossom';
import tree from '../assets/svgs/tree.svg';
import { useScrollAnimator } from '../hooks/useScrollAnimator';
import Grass from './Grass';

const WelcomeScreen = ({ onOpen }) => {
  const welcomeRef = useRef(null);
  useScrollAnimator(welcomeRef, { threshold: 0.05 });

  return (
    <div
      ref={welcomeRef}
      className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden"
      style={{ 
        background: 'linear-gradient(to bottom, #fef9e7 0%, #fdebd0 30%, #fce4bb 60%, #fddca8 100%)',
        minHeight: '810px'
        // minHeight: '100vh'
      }}>
      {/* Mobile Only - Decorations */}
      <div className="md:hidden">
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
            
        {/* Flower Garland Decorations - Top */}
        {/* Left side - cascading garlands */}
      <div className="fixed top-0 left-0 garland-sway" style={{ zIndex: 25 }}>
        <img
          src={flowerGarland}
          alt="Flower Garland"
          className="h-[280px] sm:h-[330px] md:h-[380px] w-auto object-contain"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' }}
        />
      </div>
      <div className="fixed left-[17%] garland-sway" style={{ zIndex: 25, top: '0', animationDelay: '0.2s' }}>
        <img
          src={flowerGarland}
          alt="Flower Garland"
          className="h-[210px] sm:h-[250px] md:h-[290px] w-auto object-contain"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' }}
        />
      </div>
      <div className="fixed left-[34%] garland-sway" style={{ zIndex: 25, top: '0', animationDelay: '0.4s' }}>
        <img
          src={flowerGarland}
          alt="Flower Garland"
          className="h-[140px] sm:h-[170px] md:h-[200px] w-auto object-contain"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' }}
        />
      </div>

      {/* Center flower */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 garland-sway" style={{ zIndex: 25, animationDelay: '0.6s' }}>
        <img
          src={flowerGarland}
          alt="Flower Garland"
          className="h-[100px] sm:h-[130px] md:h-[160px] w-auto object-contain"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' }}
        />
      </div>

      {/* Right side - cascading garlands */}
      <div className="fixed top-0 right-0 garland-sway" style={{ zIndex: 25 }}>
        <img
          src={flowerGarland}
          alt="Flower Garland"
          className="h-[280px] sm:h-[330px] md:h-[380px] w-auto object-contain transform scale-x-[-1]"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' }}
        />
      </div>
      <div className="fixed right-[17%] garland-sway" style={{ zIndex: 25, top: '0', animationDelay: '0.2s' }}>
        <img
          src={flowerGarland}
          alt="Flower Garland"
          className="h-[210px] sm:h-[250px] md:h-[290px] w-auto object-contain transform scale-x-[-1]"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' }}
        />
      </div>
      <div className="fixed right-[34%] garland-sway" style={{ zIndex: 25, top: '0', animationDelay: '0.4s' }}>
        <img
          src={flowerGarland}
          alt="Flower Garland"
          className="h-[140px] sm:h-[170px] md:h-[200px] w-auto object-contain transform scale-x-[-1]"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' }}
        />
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="md:hidden">
        {/* Content Container - Mobile */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 text-center flex flex-col gap-8" style={{ zIndex: 60 }}>
          {/* Vivah Nimantran Text */}
          <div data-animate="fade-down">
            <h1 
              className="text-3xl sm:text-5xl"
              style={{ 
                fontFamily: "'Tillana', cursive",
                color: '#8B4513',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
              }}
            >
              विवाह निमंत्रण
            </h1>
          </div>
          
          {/* Names and Button */}
          <div className="flex flex-col items-center gap-4" data-animate="fade-up" data-animate-delay="150ms">
            {/* Couple Names - Mobile */}
            <div className="flex flex-col items-center">
              <p 
                className="text-4xl sm:text-6xl"
                style={{ 
                  fontFamily: "'Rozha One', serif",
                  color: '#8B4513',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                }}
              >
                दिव्येश
              </p>
              <p 
                className="text-2xl sm:text-3xl"
                style={{ 
                  fontFamily: "'Rozha One', serif",
                  color: '#8B4513',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                }}
              >
                संग
              </p>
              <p 
                className="text-4xl sm:text-6xl"
                style={{ 
                  fontFamily: "'Rozha One', serif",
                  color: '#8B4513',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                }}
              >
                पूजा
              </p>
            </div>
            
            {/* Open Invitation Button - Mobile */}
            <button
              onClick={onOpen}
              className="px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg text-white bg-amber-700 hover:bg-amber-800 rounded-full shadow-lg hover:shadow-xl transition-colors duration-300 breathing-btn"
              style={{
                fontFamily: "'Arya', sans-serif"
              }}
              data-animate="fade-up"
              data-animate-delay="280ms"
            >
              निमंत्रण खोलें
            </button>
          </div>
        </div>

        {/* Couple Photo - Mobile */}
        <div className="absolute bottom-[100px] sm:bottom-[120px] left-1/2 -translate-x-1/2 z-30" data-animate="pop-up" data-animate-delay="300ms">
          <img
            src={couplePhoto}
            alt="Couple"
            className="w-[280px] sm:w-[320px] h-auto object-contain float-soft"
            style={{
              maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
            }}
          />
        </div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden md:flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-12 lg:gap-20 px-8">
          {/* Couple Photo - Left */}
          <div>
            <img
              src={couplePhoto}
              alt="Couple"
              className="w-[400px] lg:w-[500px] xl:w-[600px] h-auto object-contain"
            />
          </div>

          {/* Content - Right */}
          <div className="text-center flex flex-col gap-16" data-animate="fade-up">
            {/* Vivah Nimantran Text */}
            <div>
              <h1 
                className="text-7xl lg:text-8xl"
                style={{ 
                  fontFamily: "'Tillana', cursive",
                  color: '#8B4513',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                }}
              >
                विवाह निमंत्रण
              </h1>
            </div>
            
            {/* Names and Button */}
            <div className="flex flex-col items-center gap-6">
              {/* Couple Names - Desktop */}
              <div className="flex flex-col items-center">
                <p 
                  className="text-7xl lg:text-8xl"
                  style={{ 
                    fontFamily: "'Rozha One', serif",
                    color: '#8B4513',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  दिव्येश
                </p>
                <p 
                  className="text-4xl lg:text-5xl"
                  style={{ 
                    fontFamily: "'Rozha One', serif",
                    color: '#8B4513',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  संग
                </p>
                <p 
                  className="text-7xl lg:text-8xl"
                  style={{ 
                    fontFamily: "'Rozha One', serif",
                    color: '#8B4513',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  पूजा
                </p>
              </div>
              
              {/* Open Invitation Button - Desktop */}
              <button
                onClick={onOpen}
                className="px-10 py-4 text-xl text-white bg-amber-700 hover:bg-amber-800 rounded-full shadow-lg hover:shadow-xl transition-colors duration-300 breathing-btn"
                style={{
                  fontFamily: "'Arya', sans-serif"
                }}
                data-animate="fade-up"
                data-animate-delay="200ms"
              >
                निमंत्रण खोलें
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Only - Bottom Decorations */}
      <div className="md:hidden">
        {/* Grass Component - At the bottom */}
        <div className="fixed bottom-0 left-0 right-0" style={{ zIndex: 35 }}>
          <Grass
            width={typeof window !== 'undefined' ? window.innerWidth * 1.5 : 1400}
            height={110}
            total={42}
            offset={200}
            minHeight={100}
            maxHeight={150}
            showButton={false}
          />
        </div>
                
        {/* Flower Garden - Multiple instances at the bottom */}
        <div className="fixed left-0 right-0" style={{ zIndex: 40, bottom: '-80px' }}>
          <div className="relative w-full">
            <FlowerGarden />
          </div>
        </div>

        <div className="fixed left-[15%] -translate-x-1/2" style={{ zIndex: 41, bottom: '-80px' }}>
          <FlowerGarden />
        </div>

        <div className="fixed right-[15%] translate-x-1/2" style={{ zIndex: 41, bottom: '-80px' }}>
          <FlowerGarden />
        </div>

        {/* Butterflies - Flying at the bottom */}
        <div className="butterfly-container fixed left-0 right-0" style={{ zIndex: 50, pointerEvents: 'none', height: '200px', bottom: '-50px', transform: 'scale(0.7)' }}>
          <Butterflies minY={0} maxY={180} count={2} />
        </div>

        {/* Tree - Bottom Left */}
        <div className="fixed tree-sway-left" style={{ zIndex: 38, left: '-160px', bottom: '-100px' }}>
          <img
            src={tree}
            alt="Tree"
            className="h-[360px] sm:h-[440px] w-auto object-contain"
          />
        </div>

        {/* Tree - Bottom Right */}
        <div className="fixed tree-sway-right" style={{ zIndex: 38, right: '-160px', bottom: '-100px' }}>
          <img
            src={tree}
            alt="Tree"
            className="h-[360px] sm:h-[440px] w-auto object-contain transform scale-x-[-1]"
          />
        </div>
      </div>

    </div>
  );
};

export default WelcomeScreen;
