import React, { useEffect, useRef, useCallback } from 'react';

const random = (min, max) => {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.random() * (max - min);
};

const randomSign = () => (Math.random() < 0.5 ? 1 : -1);

const now = () => (typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now());

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

const createSVG = (type, parent) => {
  const xmlns = 'http://www.w3.org/2000/svg';
  const node = document.createElementNS(xmlns, type);
  if (parent) {
    parent.appendChild(node);
  }
  return node;
};

class GrassBlade {
  constructor(path, config) {
    const { offset, width, height, minHeight, maxHeight, maxAngle, startAngle } = config;

    this.path = path;
    this.width = random(4, 8);
    this.maxAngle = random(10, maxAngle);
    this.angle = Math.random() * randomSign() * startAngle * Math.PI / 180;
    this.baseAmplitude = random(200, Math.min(500, maxHeight));
    this.targetHeight = random(minHeight, maxHeight);
    this.height = 0;

    const offsetX = 1.5;
    const sx = offset / 2 + random(width - offset);
    const sy = height;

    const csx = sx - offsetX;
    const csy = sy - this.targetHeight / (Math.random() < 0.5 ? 1 : 2);
    const psx = csx;
    const psy = csy;
    const dx = sx + this.width;
    const dy = sy;

    this.coords = [sx, sy, csx, csy, psx, psy, dx, dy];

    this.elapsed = 0;
    this.growing = true;
    this.growStart = now();
    this.growDuration = random(1500, 3500);
    this.swingOffset = random(0, 2000);

    const ambient = 0.85;
    const color = [
      Math.floor(random(16, 48) * ambient),
      Math.floor(random(100, 255) * ambient),
      Math.floor(random(16, 48) * ambient),
    ];

    const initialPath = `M${sx},${sy + 2}h${this.width / 2}h${this.width / 2}z`;
    this.path.setAttribute('fill', `rgb(${color})`);
    this.path.setAttribute('d', initialPath);
  }

  resetGrowth() {
    this.growing = true;
    this.growStart = now();
    this.growDuration = random(1500, 3500);
    this.height = 0;
  }

  update(time) {
    if (this.growing) {
      const progress = Math.min(1, (time - this.growStart) / this.growDuration);
      this.height = this.targetHeight * easeInOut(progress);
      if (progress >= 1) {
        this.growing = false;
        this.elapsed = time;
      }
    }

    const coords = this.coords;
    const swingTime = (time + this.swingOffset) - this.elapsed;
    const tip = Math.sin(swingTime * 0.0007);
    const oscillation = this.maxAngle * Math.cos(swingTime * 0.0002);
    const th = this.angle + Math.PI / 2 + tip * Math.PI / 180 * oscillation;
    const px = coords[0] + this.width + this.height * Math.cos(th);
    const py = coords[1] - this.height * Math.sin(th);

    let d = `M${coords[0]},${coords[1]}`;
    d += `C${coords[0]},${coords[1]},${coords[2]},${coords[3]},${px},${py}`;
    d += `C${px},${py},${coords[4]},${coords[5]},${coords[6]},${coords[7]}z`;
    this.path.setAttribute('d', d);
  }

  destroy() {
    if (this.path && this.path.parentElement) {
      this.path.parentElement.removeChild(this.path);
    }
  }
}

const Grass = ({
  width = 1200,
  height = 600,
  total = 40,
  offset = 400,
  minHeight = 125,
  maxHeight,
  maxAngle = 20,
  startAngle = 40,
  showButton = true,
}) => {
  const stageRef = useRef(null);
  const bladesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const startRef = useRef(now());

  const calculatedMaxHeight = maxHeight || height * 0.8;

  const destroyBlades = () => {
    bladesRef.current.forEach((blade) => blade.destroy());
    bladesRef.current = [];
  };

  const initGrass = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    destroyBlades();
    stage.innerHTML = '';

    for (let i = 0; i < total; i += 1) {
      const path = createSVG('path', stage);
      bladesRef.current.push(
        new GrassBlade(path, {
          offset,
          width,
          height,
          minHeight,
          maxHeight: calculatedMaxHeight,
          maxAngle,
          startAngle,
        }),
      );
    }

    startRef.current = now();
  }, [calculatedMaxHeight, height, maxAngle, minHeight, offset, startAngle, total, width]);

  useEffect(() => {
    initGrass();

    const render = () => {
      const elapsed = now() - startRef.current;
      bladesRef.current.forEach((blade) => blade.update(elapsed));
      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      destroyBlades();
    };
  }, [initGrass]);

  return (
    <div className="grass-wrapper" style={{ height: `${height}px` }}>
      {showButton && (
        <div className="grass-hud">
          <button type="button" className="grass-button" onClick={initGrass}>
            RISE UP
          </button>
        </div>
      )}
      <svg
        id="stage"
        ref={stageRef}
        className="grass-stage"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </div>
  );
};

export default Grass;

