import React, { useState, useRef, useEffect } from 'react';
import bgMusic from '../assets/audio/pure-love-304010.mp3';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Auto-play when component mounts
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.log('Autoplay prevented:', error);
        // Autoplay might be blocked by browser, user will need to click
      }
    };

    playAudio();
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop autoPlay>
        <source src={bgMusic} type="audio/mpeg" />
      </audio>

      {/* Floating Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: '#E0115F',
          boxShadow: '0 4px 12px rgba(224, 17, 95, 0.4)'
        }}
        aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? (
          // Pause Icon
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="6" y="4" width="4" height="16" fill="#FFFFFF" />
            <rect x="14" y="4" width="4" height="16" fill="#FFFFFF" />
          </svg>
        ) : (
          // Play Icon
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3" fill="#FFFFFF" />
          </svg>
        )}
      </button>
    </>
  );
};

export default MusicPlayer;

