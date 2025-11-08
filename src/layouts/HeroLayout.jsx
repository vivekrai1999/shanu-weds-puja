import React, { ReactNode } from 'react';
import frameLeft from '../assets/images/frame-left.webp';
import frameRight from '../assets/images/frame-right.webp';
import womenLeft from '../assets/images/women-left.webp';
import womenRight from '../assets/images/women-right.webp';
import ganesha from '../assets/images/ganesha.webp';
import BloomingFlower from '../components/BloomingFlower';
import CherryBlossom from '../components/CherryBlossom';
import FlowerGarden from '../components/FlowerGarden';
import '../styles/bloomingFlower.css';

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
  return (
    <div 
      className="w-full h-[100dvh] flex flex-col relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFF5F7 0%, #FFE4E1 25%, #FFF9E6 50%, #FFECDB 75%, #FFF5F7 100%)'
      }}
    >
      {/* Cherry Blossom Effect */}
      <CherryBlossom />
      
      {/* First Row - 15% height, 3 equal containers */}
      <div className="flex w-full h-[15%] relative">
        <div className="absolute -top-4 -left-4">
          <img src={frameLeft} alt="Frame Left" className="h-48 w-auto object-contain" />
        </div>
        <div className="w-full h-full flex items-end justify-center">
          <BloomingFlower>
            <img src={ganesha} alt="Ganesha" className="w-20 h-20 object-contain" />
          </BloomingFlower>
        </div>
        <div className="absolute -top-4 -right-4">
          <img src={frameRight} alt="Frame Right" className="h-48 w-auto object-contain" />
        </div>
      </div>

      {/* Second Row - 70% height, 10%-80%-10% split */}
      <div className="flex w-full h-[70%] relative">
          <img src={womenLeft} alt="Woman Left" className="h-full w-auto absolute left-[-18%] bottom-0 lg:hidden" />
        
        <div className="w-[60%] h-full flex items-center justify-center mx-auto">
          {/* Middle Center - 3 Row Flex Container */}
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 w-full">
            {/* Row 1: Groom Name and Parents */}
            <div className="flex flex-col gap-4 w-full">
              {/* Sub-row 1: Groom Name */}
              <div className="text-center">
                <h2 className="text-4xl font-bold" style={{ color: '#E0115F' }}>दिव्येश</h2>
              </div>
              
              {/* Sub-row 2: Supotra (Grandparents) */}
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">सुपौत्र</p>
                <p className="text-sm text-gray-700 mb-1">श्रीमती ग़ुलाबबाई</p>
                <p className="text-sm text-gray-700">स्व. श्री प्रभुदयालजी गौड़</p>
              </div>
              
              {/* Sub-row 3: Suputr (Parents) */}
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">सुपुत्र</p>
                <p className="text-sm text-gray-700">श्रीमती रानी - दिनेश गौड़</p>
              </div>
            </div>

            {/* Row 2: Sang Text */}
            <div className="text-center flex items-center gap-4">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-gray-400"></div>
              <p className="text-6xl" style={{ color: '#FFC300', fontFamily: "'Rozha One', serif" }}>संग</p>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-gray-400"></div>
            </div>

            {/* Row 3: Bride Name and Parents */}
            <div className="flex flex-col gap-4 w-full">
              {/* Sub-row 1: Bride Name */}
              <div className="text-center">
                <h2 className="text-4xl font-bold" style={{ color: '#E0115F' }}>पूजा</h2>
              </div>
              
              {/* Sub-row 2: Supotra (Grandparents) */}
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">सुपौत्री</p>
                <p className="text-sm text-gray-700 mb-1">श्रीमती कमलादेवी</p>
                <p className="text-sm text-gray-700">स्व. श्री रामस्वरूपजी शर्मा पटेल सा</p>
              </div>
              
              {/* Sub-row 3: Suputr (Parents) */}
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">सुपुत्री</p>
                <p className="text-sm text-gray-700">श्रीमती गीता - श्री सुरेंद्रजी शर्मा</p>
              </div>
            </div>
          </div>
        </div>
          <img src={womenRight} alt="Woman Right" className="h-full w-auto absolute right-[-18%] bottom-0 lg:hidden" />
       
      </div>

      {/* Third Row - 15% height, 3 equal containers */}
      <div className="flex w-full h-[15%] relative">
        <div className="absolute -bottom-4 -left-4">
          <img src={frameLeft} alt="Frame Left" className="h-48 w-auto object-contain rotate-[270deg]" />
        </div>
        <div className="w-1/3 h-full flex items-center justify-center">
          {bottomLeft}
        </div>
        <div className="w-1/3 h-full flex items-center justify-center">
          {bottomCenter}
        </div>
        <div className="w-1/3 h-full flex items-center justify-center">
          {bottomRight}
        </div>
        <div className="absolute -bottom-4 -right-4">
          <img src={frameRight} alt="Frame Right" className="h-48 w-auto object-contain rotate-90" />
        </div>
      </div>

      {/* Flower Garden at bottom center */}
      <FlowerGarden />
    </div>
  );
};

export default HeroLayout;
