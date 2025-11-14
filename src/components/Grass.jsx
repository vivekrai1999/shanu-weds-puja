import React, { useCallback, useEffect, useRef } from 'react';

const random = (min, max) => {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.random() * (max - min);
};

const createSVG = (type, parent) => {
  const xmlns = 'http://www.w3.org/2000/svg';
  const node = document.createElementNS(xmlns, type);
  if (parent) {
    parent.appendChild(node);
  }
  return node;
};

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

class GrassBlade {
  constructor(path, config) {
    this.path = path;
    this.config = config;

    this.width = random(4, 8);
    this.height = random(config.minHeight, config.maxHeight);
    this.maxAngle = random(10, config.maxAngle);
    this.angle =
      (Math.random() * (Math.random() < 0.5 ? -1 : 1) * config.startAngle * Math.PI) / 180;

    const sx = config.offset / 2 + random(Math.max(0, config.width - config.offset));
    const sy = config.height;
    const csx = sx - 1.5;
    const csy = sy - this.height / (Math.random() < 0.5 ? 1 : 2);
    const psx = csx;
    const psy = csy;
    const dx = sx + this.width;
    const dy = sy;

    this.coords = [sx, sy, csx, csy, psx, psy, dx, dy];

    const ambient = 0.85;
    const color = [
      Math.floor(random(16, 48) * ambient),
      Math.floor(random(100, 255) * ambient),
      Math.floor(random(16, 48) * ambient),
    ];
    this.color = `rgb(${color.join(',')})`;

    this.swaySpeed = random(0.0003, 0.0008);
    this.swayOffset = random(0, Math.PI * 2);
    this.growthProgress = 0;
    this.growthSpeed = random(0.00015, 0.0004);

    this.update(0, 16);
  }

  update(time, delta) {
    if (this.growthProgress < 1) {
      this.growthProgress = Math.min(1, this.growthProgress + this.growthSpeed * delta);
    }

    const easedGrowth = easeOutCubic(this.growthProgress);
    const coords = this.coords;
    const sway = Math.sin(time * this.swaySpeed + this.swayOffset);
    const angle =
      this.angle +
      Math.PI / 2 +
      (sway * Math.PI * (this.maxAngle * easedGrowth)) / 180;
    const px = coords[0] + this.width + (this.height * easedGrowth) * Math.cos(angle);
    const py = coords[1] - (this.height * easedGrowth) * Math.sin(angle);

    let d = `M${coords[0]},${coords[1]}`;
    d += `C${coords[0]},${coords[1]},${coords[2]},${coords[3]},${px},${py}`;
    d += `C${px},${py},${coords[4]},${coords[5]},${coords[6]},${coords[7]}z`;

    this.path.setAttribute('d', d);
    this.path.setAttribute('fill', this.color);
  }

  destroy() {
    if (this.path && this.path.parentElement) {
      this.path.parentElement.removeChild(this.path);
    }
  }
}

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
  buttonText = 'RISE UP',
  containerStyle = {},
  buttonStyle = {},
}) => {
  const stageRef = useRef(null);
  const bladesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);

  const calculatedMaxHeight = maxHeight || height * 0.8;

  const destroyBlades = useCallback(() => {
    bladesRef.current.forEach((blade) => blade.destroy());
    bladesRef.current = [];
  }, []);

  const initGrass = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    destroyBlades();
    stage.innerHTML = '';

    for (let i = 0; i < totalBlades; i += 1) {
      const path = createSVG('path', stage);
      bladesRef.current[i] = new GrassBlade(path, {
        offset,
        width,
        height,
        minHeight,
        maxHeight: calculatedMaxHeight,
        maxAngle,
        startAngle,
      });
    }

    lastTimeRef.current = 0;
  }, [
    calculatedMaxHeight,
    destroyBlades,
    height,
    maxAngle,
    minHeight,
    offset,
    startAngle,
    totalBlades,
    width,
  ]);

  const render = useCallback(
    (time) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      bladesRef.current.forEach((blade) => blade.update(time, delta));
      animationFrameRef.current = requestAnimationFrame(render);
    },
    [],
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (stage) {
      stage.setAttribute('width', width);
      stage.setAttribute('height', height);
      stage.style.width = `${width}px`;
      stage.style.height = `${height}px`;
    }

    initGrass();
    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      destroyBlades();
    };
  }, [destroyBlades, height, initGrass, render, width]);

  const handleRiseUp = () => {
    initGrass();
  };

  const defaultContainerStyle = {
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    ...containerStyle,
  };

  const defaultStageStyle = {
    position: 'relative',
    width: `${width}px`,
    height: `${height}px`,
    top: '100%',
    left: '50%',
    transform: 'translate(-50%, -100%)',
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
    ...buttonStyle,
  };

  const hudStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '15px',
    zIndex: 10,
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
      <svg id="stage" ref={stageRef} style={defaultStageStyle} />
    </div>
  );
};

export default Grass;

