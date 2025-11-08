import React, { useEffect, useRef } from 'react';

const Butterflies = () => {
  const containerRef = useRef(null);
  const butterfliesRef = useRef([]);

  useEffect(() => {
    class Butterfly {
      constructor(container) {
        this.container = container;
        this.x = Math.floor(Math.random() * container.offsetWidth);
        this.y = Math.floor(Math.random() * 200); // Keep them in bottom area
        this.directionX = Math.random() > 0.5;
        this.directionY = Math.random() > 0.5;
        this.domElement = null;
        this.init();
      }

      init() {
        this.domElement = document.createElement('div');
        this.domElement.className = 'butterfly';
        this.domElement.innerHTML = `
          <div class="left-wing">
            <div class="top"></div>
            <div class="bottom"></div>
          </div>
          <div class="right-wing">
            <div class="top"></div>
            <div class="bottom"></div>
          </div>
        `;
        this.container.appendChild(this.domElement);
      }

      moveButterfly() {
        if (!this.domElement || !this.container) return;

        this.domElement.style.transform = `translate3D(${this.x}px, ${this.y}px, 0px) rotate3d(1, 0.5, 0, 110deg)`;

        const randomnumberX = Math.floor(Math.random() * 11);
        const randomnumberY = Math.floor(Math.random() * 11);

        if (randomnumberX > 8) {
          this.directionX = !this.directionX;
        }

        if (randomnumberY > 8) {
          this.directionY = !this.directionY;
        }

        this.x += this.directionX ? 1 : -1;
        this.y += this.directionY ? 1 : -1;

        // Keep butterflies within bounds
        if (this.x < 0) this.x = 0;
        if (this.x > this.container.offsetWidth) this.x = this.container.offsetWidth;
        if (this.y < 0) this.y = 0;
        if (this.y > 200) this.y = 200;
      }

      destroy() {
        if (this.domElement && this.domElement.parentNode) {
          this.domElement.parentNode.removeChild(this.domElement);
        }
      }
    }

    const animate = () => {
      butterfliesRef.current.forEach(butterfly => butterfly.moveButterfly());
      animationFrameId = requestAnimationFrame(animate);
    };

    let animationFrameId;

    const initTimeout = setTimeout(() => {
      if (containerRef.current) {
        // Create 3 butterflies
        for (let i = 0; i < 3; i++) {
          const butterfly = new Butterfly(containerRef.current);
          butterfliesRef.current.push(butterfly);
        }
        animate();
      }
    }, 500);

    return () => {
      clearTimeout(initTimeout);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      butterfliesRef.current.forEach(butterfly => butterfly.destroy());
      butterfliesRef.current = [];
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="butterfly-container"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '200px',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 50
      }}
    />
  );
};

export default Butterflies;

