import React, { useEffect, useRef } from 'react';

const Butterflies = ({ minY = 0, maxY = 200, count = 5 }) => {
  const containerRef = useRef(null);
  const butterfliesRef = useRef([]);

  useEffect(() => {
    // Find the parent container
    const container = document.querySelector('.butterfly-container');
    if (!container) {
      console.error('Butterfly container not found');
      return;
    }

    const colors = ['#E0115F', '#FFC300', '#FF1493', '#FFD700', '#FF69B4', '#FFA500', '#DC143C'];

    class Butterfly {
      constructor(index) {
        const containerWidth = container.offsetWidth;
        const containerHeight = maxY;
        
        // Evenly distribute butterflies horizontally
        const spacing = containerWidth / (count + 1);
        this.x = spacing * (index + 1);
        
        // Position in upper half of container with slight variation
        const upperHalfHeight = containerHeight * 0.5;
        this.y = minY + Math.floor(Math.random() * upperHalfHeight);
        
        this.minY = minY;
        this.maxY = containerHeight - 20;
        this.minX = 0;
        this.maxX = containerWidth - 80;
        this.directionX = Math.random() > 0.5;
        this.directionY = Math.random() > 0.5;
        this.domElement = null;
        this.speed = 0.3 + Math.random() * 0.3;
        this.container = container;
        this.color = colors[index % colors.length];
        this.init();
      }

      init() {
        this.domElement = document.createElement('div');
        this.domElement.className = 'butterfly butterfly-small';
        this.domElement.style.left = '0px';
        this.domElement.style.top = '0px';
        this.domElement.innerHTML = `<div class="left-wing"><div class="top" style="background: ${this.color}; box-shadow: 0 2px 6px ${this.color}40;"></div><div class="bottom" style="background: ${this.color}; box-shadow: 0 2px 6px ${this.color}40;"></div></div><div class="right-wing"><div class="top" style="background: ${this.color}; box-shadow: 0 2px 6px ${this.color}40;"></div><div class="bottom" style="background: ${this.color}; box-shadow: 0 2px 6px ${this.color}40;"></div></div>`;
        this.container.appendChild(this.domElement);
      }

      moveButterfly() {
        if (!this.domElement) return;

        this.domElement.style.transform = `translate3D(${this.x}px, ${this.y}px, 0px) rotate3d(1, 0.5, 0, 110deg)`;
        
        const randomnumberX = Math.floor(Math.random() * 11);
        const randomnumberY = Math.floor(Math.random() * 11);

        if (randomnumberX > 8) {
          this.directionX = !this.directionX;
        }

        if (randomnumberY > 8) {
          this.directionY = !this.directionY;
        }

        if (this.directionX) {
          this.x += this.speed;
        } else {
          this.x -= this.speed;
        }

        if (this.directionY) {
          this.y += this.speed;
        } else {
          this.y -= this.speed;
        }

        // Update maxX based on container width
        const containerWidth = this.container.offsetWidth;
        this.maxX = containerWidth - 80;

        // Keep within bounds
        if (this.x < this.minX) {
          this.x = this.minX;
          this.directionX = true;
        }
        if (this.x > this.maxX) {
          this.x = this.maxX;
          this.directionX = false;
        }

        if (this.y < this.minY) {
          this.y = this.minY;
          this.directionY = true;
        }
        if (this.y > this.maxY) {
          this.y = this.maxY;
          this.directionY = false;
        }
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
      for (let i = 0; i < count; i++) {
        const butterfly = new Butterfly(i);
        butterfliesRef.current.push(butterfly);
      }
      animate();
    }, 500);

    return () => {
      clearTimeout(initTimeout);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      butterfliesRef.current.forEach(butterfly => butterfly.destroy());
      butterfliesRef.current = [];
    };
  }, [minY, maxY, count]);

  return null;
};

export default Butterflies;
