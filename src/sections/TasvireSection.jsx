import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import shanu1 from '../assets/images/shanu1.webp';
import shanu2 from '../assets/images/shanu2.webp';
import shanu3 from '../assets/images/shanu3.webp';
import shanu4 from '../assets/images/shanu4.webp';
import shanu5 from '../assets/images/shanu5.webp';
import shanu6 from '../assets/images/shanu6.webp';
import shanu7 from '../assets/images/shanu7.webp';
import shanu8 from '../assets/images/shanu8.webp';

gsap.registerPlugin(ScrollTrigger);

const TasvireSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const carouselRef = useRef(null);

  const images = [
    { src: shanu1, alt: 'तस्वीर 1' },
    { src: shanu2, alt: 'तस्वीर 2' },
    { src: shanu3, alt: 'तस्वीर 3' },
    { src: shanu4, alt: 'तस्वीर 4' },
    { src: shanu5, alt: 'तस्वीर 5' },
    { src: shanu6, alt: 'तस्वीर 6' },
    { src: shanu7, alt: 'तस्वीर 7' },
    { src: shanu8, alt: 'तस्वीर 8' },
  ];

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

      // Carousel animation
      gsap.from(carouselRef.current, {
        opacity: 0,
        y: 50,
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
      className="w-full py-12 px-4" 
      style={{ backgroundColor: '#DC3545' }}
    >
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl"
          style={{ fontFamily: "'Rozha One', serif", color: '#FFFFFF' }}
        >
          तस्वीरें
        </h2>
      </div>

      {/* Carousel */}
      <div ref={carouselRef} className="max-w-4xl mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={0}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          className="mySwiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center h-full w-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Swiper Styles */}
      <style>{`
        .mySwiper {
          width: 100%;
          padding: 0 0 50px 0;
        }

        .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 400px;
          width: 100%;
        }

        @media (max-width: 768px) {
          .swiper-slide {
            height: 300px;
          }
        }

        .swiper-slide img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
        }

        .swiper-pagination-bullet {
          background: #FFC300;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          background: #FFC300;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default TasvireSection;

