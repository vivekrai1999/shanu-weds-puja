import React from 'react';
import shanu1 from '../assets/images/shanu1.webp';
import ganesha from '../assets/images/ganesha.webp';
import BloomingFlower from '../components/BloomingFlower';
import '../styles/bloomingFlower.css';

const IntroSection = () => {
  return (
    <div 
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
          background: 'linear-gradient(to bottom, rgba(224, 17, 95, 0.95) 0%, rgba(224, 17, 95, 0.85) 25%, rgba(224, 17, 95, 0.7) 50%, rgba(224, 17, 95, 0.85) 75%, rgba(224, 17, 95, 0.95) 100%)'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 pt-4 pb-12">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl mb-12" style={{ fontFamily: "'Rozha One', serif", color: '#FFFFFF' }}>
          शादी का निमंत्रण
        </h1>

        {/* Blooming Flower with Ganesha */}
        <div className="w-full flex justify-center mb-12">
          <BloomingFlower>
            <img src={ganesha} alt="Ganesha" className="w-20 h-20 object-contain" />
          </BloomingFlower>
        </div>

        {/* Groom Sang Bride */}
        <div className="mb-10">
          <p className="text-5xl md:text-6xl lg:text-7xl" style={{ fontFamily: "'Rozha One', serif", color: '#FFFFFF' }}>
            <span>दिव्येश</span>
            <span className="mx-4">संग</span>
            <span>पूजा</span>
          </p>
        </div>

        {/* Day and Date */}
        <div className="text-2xl md:text-3xl" style={{ fontFamily: "'Arya', sans-serif", color: '#FFFFFF' }}>
          <p>रविवार, 30 नवम्बर 2025</p>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;

