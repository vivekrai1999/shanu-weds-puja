import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // List of all assets to preload
    const assetsToLoad = [
      // Images
      '/src/assets/images/shanu1.webp',
      '/src/assets/images/shanu2.webp',
      '/src/assets/images/shanu3.webp',
      '/src/assets/images/shanu4.webp',
      '/src/assets/images/shanu5.webp',
      '/src/assets/images/shanu6.webp',
      '/src/assets/images/shanu7.webp',
      '/src/assets/images/shanu8.webp',
      '/src/assets/images/frame-left.webp',
      '/src/assets/images/frame-right.webp',
      '/src/assets/images/women-left.webp',
      '/src/assets/images/women-right.webp',
      '/src/assets/images/ganesha.webp',
      '/src/assets/images/marigold.webp',
      // SVGs
      '/src/assets/svgs/mandala.svg',
      // Audio
      '/src/assets/audio/audio.mp3',
    ];

    let loadedCount = 0;
    const totalAssets = assetsToLoad.length;

    const updateProgress = () => {
      loadedCount++;
      const newProgress = Math.round((loadedCount / totalAssets) * 100);
      setProgress(newProgress);

      if (loadedCount === totalAssets) {
        // Add a small delay before showing content for smooth transition
        setTimeout(() => {
          onLoadComplete();
        }, 500);
      }
    };

    // Preload images and SVGs
    assetsToLoad.forEach((src) => {
      if (src.endsWith('.mp3')) {
        // Preload audio
        const audio = new Audio();
        audio.addEventListener('canplaythrough', updateProgress, { once: true });
        audio.addEventListener('error', updateProgress, { once: true });
        audio.src = src;
        audio.load();
      } else {
        // Preload images/SVGs
        const img = new Image();
        img.onload = updateProgress;
        img.onerror = updateProgress;
        img.src = src;
      }
    });
  }, [onLoadComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#DC3545'
      }}
    >
      {/* Loading Content */}
      <div className="text-center px-4">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-8" style={{ fontFamily: "'Rozha One', serif" }}>
          विवाह निमंत्रण
        </h1>

        {/* Couple Names */}
        <p className="text-2xl md:text-3xl text-white mb-12" style={{ fontFamily: "'Rozha One', serif" }}>
          दिव्येश <span style={{ color: '#FFC300' }}>संग</span> पूजा
        </p>

        {/* Rotating Loader */}
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-white border-opacity-30 border-t-white rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

