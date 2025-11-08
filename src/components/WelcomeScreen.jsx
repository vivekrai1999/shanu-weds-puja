import React from 'react';
import ganesha from '../assets/images/ganesha.webp';
import couplePhoto from '../assets/images/shanu4.webp';
import marigold from '../assets/images/marigold.png';
import CherryBlossom from './CherryBlossom';

const WelcomeScreen = ({ onOpen }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" style={{ backgroundColor: '#DC3545' }}>
      {/* Cherry Blossom Animation */}
      <div className="absolute inset-0">
        <CherryBlossom id="welcome_blossom_container" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Ganesha Image */}
        <div className="mb-6 animate-bounce-slow">
          <img
            src={ganesha}
            alt="Ganesha"
            className="w-24 h-24 mx-auto object-contain ganesha-image"
          />
        </div>

        {/* Heading after Ganesha */}
        <h2
          className="text-4xl md:text-5xl mb-8 animate-fade-in text-white"
          style={{ fontFamily: "'Rozha One', serif" }}
        >
          उत्सव परिणय बंधन का
        </h2>

        {/* Couple Photo with Marigold Frame */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 animate-fade-in-delay">
          {/* Rotating Marigold Background */}
          <div className="absolute inset-0 flex items-center justify-center animate-rotate-slow">
            <img
              src={marigold}
              alt="Marigold"
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Circular Couple Photo */}
          <div className="absolute inset-0 flex items-center justify-center p-12 md:p-16">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <img
                src={couplePhoto}
                alt="Couple"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Couple Names */}
        <p
          className="text-4xl md:text-5xl mb-6 animate-fade-in-delay-2 text-white"
          style={{ fontFamily: "'Rozha One', serif" }}
        >
          दिव्येश संग पूजा
        </p>

        {/* Date */}
        <p
          className="text-xl md:text-2xl mb-10 animate-fade-in-delay-3 text-white"
          style={{ fontFamily: "'Arya', sans-serif" }}
        >
          रविवार, 30 नवम्बर 2025
        </p>

        {/* Open Invitation Button */}
        <button
          onClick={onOpen}
          className="group relative px-12 py-4 text-xl font-bold text-pink-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-pulse-glow bg-white"
          style={{
            fontFamily: "'Arya', sans-serif",
          }}
        >
          <span className="relative z-10 flex items-center gap-3">
            निमंत्रण खोलें
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="animate-bounce"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-pink-200 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        </button>

      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(220, 53, 69, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(220, 53, 69, 0.8);
          }
        }
        
        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .ganesha-image {
          filter: drop-shadow(0 4px 8px rgba(220, 53, 69, 0.3)) 
                  brightness(1.1) 
                  saturate(1.2);
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s backwards;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s backwards;
        }
        
        .animate-fade-in-delay-3 {
          animation: fade-in 1s ease-out 0.9s backwards;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;
