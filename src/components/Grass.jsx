import React, { useEffect, useRef, useState } from 'react';
import { TweenLite, Power1 } from 'gsap';
import 'gsap/MorphSVGPlugin';

// Utility functions
const random = (min, max) => {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.random() * (max - min);
};

const randomSign = () => {
  return Math.random() < 0.5 ? 1 : -1;
};

const createSVG = (type, parent) => {
  const xmlns = "http://www.w3.org/2000/svg";
  const node = document.createElementNS(xmlns, type);
  parent && parent.appendChild(node);
  return node;
};

// Grass blade class
class GrassBlade {
  constructor(path, offset, width, height, minHeight, maxHeight, maxAngle, startAngle) {
    this.path = path;

    this.width = random(4, 8);
    this.height = random(150, maxHeight);
    this.maxAngle = random(10, maxAngle);
    this.angle = Math.random() * randomSign() * startAngle * Math.PI / 180;

    const offsetX = 1.5;

    // Start position
    const sx = offset / 2 + random(width - offset);
    const sy = height;

    // Curvature
    const csx = sx - offsetX;
    const csy = sy - this.height / (Math.random() < 0.5 ? 1 : 2);
    // Parallel point
    const psx = csx;
    const psy = csy;

    const dx = sx + this.width;
    const dy = sy;
    this.coords = [sx, sy, csx, csy, psx, psy, dx, dy];

    this.growing = false;
    this.morphed = true; // Start already morphed - no grow animation

    this.start = performance.now();
    this.elapsed = 0;

    this.height_ = this.height;
    // Keep the original height - no need to change it
    // this.height = random(200, Math.min(500, this.height));

    const ambient = 0.85;

    const color = [
      Math.floor(random(16, 48) * ambient),
      Math.floor(random(100, 255) * ambient),
      Math.floor(random(16, 48) * ambient)
    ];

    // Start with full grass shape instead of small square
    const tip = Math.sin(0);
    const th = this.angle + Math.PI / 2 + tip * Math.PI / 180 * (this.maxAngle * Math.cos(0));
    const px = sx + this.width + this.height * Math.cos(th);
    const py = sy - this.height * Math.sin(th);
    
    let d = `M${sx},${sy}`;
    d += `C${sx},${sy},${csx},${csy},${px},${py}`;
    d += `C${px},${py},${psx},${psy},${dx},${dy}z`;

    TweenLite.set(path, { fill: `rgb(${color})`, attr: { d } });
  }

  rise() {
    this.morphed = true;
    this.growing = false;
    this.elapsed = performance.now() - this.start;
    TweenLite.to(this, random(2.5, 3.5), { height: this.height_, ease: Power1.easeInOut });
  }

  morph(morphSVG) {
    const time = random(1.5, 3.5);
    const delay = random(0.5, 4.5);

    this.growing = true;

    TweenLite.to(this.path, time, { morphSVG, delay, onComplete: () => this.rise() });
  }

  update(time) {
    if (this.growing) return;

    time -= this.elapsed;
    const coords = this.coords;
    const tip = Math.sin(time * 0.0007);
    const th = this.angle + Math.PI / 2 + tip * Math.PI / 180 * (this.maxAngle * Math.cos(time * 0.0002));
    const px = coords[0] + this.width + this.height * Math.cos(th);
    const py = coords[1] - this.height * Math.sin(th);

    let d = `M${coords[0]},${coords[1]}`;
    d += `C${coords[0]},${coords[1]},${coords[2]},${coords[3]},${px},${py}`;
    d += `C${px},${py},${coords[4]},${coords[5]},${coords[6]},${coords[7]}z`;

    if (!this.morphed) {
      this.morph(d);
      this.start = performance.now();
    } else {
      this.path.setAttribute("d", d);
    }
  }

  destroy() {
    TweenLite.killTweensOf(this);
    TweenLite.killTweensOf(this.path);

    if (this.path && this.path.parentElement) {
      this.path.parentElement.removeChild(this.path);
    }
  }
}

// Main Grass component
const Grass = ({
  width = 800,
  height = 600,
  totalBlades = 40,
  offset = 400,
  minHeight = 125,
  maxHeight = null,
  maxAngle = 20,
  startAngle = 40,
  showButton = true,
  buttonText = "RISE UP",
  containerStyle = {},
  buttonStyle = {}
}) => {
  const stageRef = useRef(null);
  const bladesRef = useRef([]);
  const startTimeRef = useRef(performance.now());
  const animationFrameRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const calculatedMaxHeight = maxHeight || height * 0.8;

  const initGrass = () => {
    if (!stageRef.current) return;

    // Destroy existing blades
    bladesRef.current.forEach(blade => blade.destroy());
    bladesRef.current = [];

    // Create new blades
    for (let i = 0; i < totalBlades; i++) {
      const path = createSVG("path", stageRef.current);
      bladesRef.current[i] = new GrassBlade(
        path,
        offset,
        width,
        height,
        minHeight,
        calculatedMaxHeight,
        maxAngle,
        startAngle
      );
    }

    setIsInitialized(true);
  };

  const render = () => {
    const elapsed = performance.now() - startTimeRef.current;

    if (bladesRef.current.length) {
      for (let i = 0; i < totalBlades; i++) {
        bladesRef.current[i]?.update(elapsed);
      }
    }

    animationFrameRef.current = requestAnimationFrame(render);
  };

  useEffect(() => {
    // Set stage dimensions
    if (stageRef.current) {
      TweenLite.set(stageRef.current, { width, height });
    }

    // Initialize grass
    initGrass();

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(render);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      bladesRef.current.forEach(blade => blade.destroy());
      bladesRef.current = [];
    };
  }, [width, height, totalBlades, offset, minHeight, calculatedMaxHeight, maxAngle, startAngle]);

  const handleRiseUp = () => {
    initGrass();
  };

  const defaultContainerStyle = {
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    ...containerStyle
  };

  const defaultStageStyle = {
    position: 'relative',
    width: `${width}px`,
    height: `${height}px`,
    top: '100%',
    left: '50%',
    transform: 'translate(-50%, -100%)'
  };

  const defaultButtonStyle = {
    border: '1px solid rgba(0,0,0,0.2)',
    fontWeight: 'bold',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
    textTransform: 'uppercase',
    transition: 'all 0.5s ease',
    lineHeight: '1.6',
    padding: '8px 18px',
    background: '#FFC107',
    color: '#555',
    cursor: 'pointer',
    ...buttonStyle
  };

  const hudStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '15px',
    zIndex: 10
  };

  return (
    <div style={defaultContainerStyle}>
      {showButton && (
        <div className="hud" style={hudStyle}>
          <button
            onClick={handleRiseUp}
            style={defaultButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'rgba(0,0,0,0.5)';
              e.target.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(0,0,0,0.2)';
              e.target.style.color = '#555';
            }}
          >
            {buttonText}
          </button>
        </div>
      )}
      <svg
        id="stage"
        ref={stageRef}
        style={defaultStageStyle}
      />
    </div>
  );
};

export default Grass;

