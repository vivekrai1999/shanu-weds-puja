import confetti from 'canvas-confetti';

/**
 * CONFETTI ANIMATIONS - Based on documented wedding invitation effects
 * This implements the exact same confetti system as documented in CONFETTI_EFFECTS_DOCUMENTATION.md
 */

// Z-index for confetti (should be above most content)
const CONFETTI_Z_INDEX = 1057;

// Helper function for random values in range
const randomInRange = (min, max) => Math.random() * (max - min) + min;

/**
 * 1. BASIC ANIMATION - Bottom Burst
 * Purpose: Quick celebratory burst when invitation opens
 * Timing: Fires instantly (t=0s)
 * Effect: Standard confetti particles shooting upward from bottom
 */
export const basicAnimation = () => {
  confetti({
    origin: { y: 1 },      // Bottom of screen
    zIndex: CONFETTI_Z_INDEX
  });
};

/**
 * 2. OPEN ANIMATION - Falling Hearts
 * Purpose: Romantic heart-shaped petals falling continuously
 * Timing: Starts after 1.5s delay, runs for 15 seconds
 * Effect: Pink heart petals falling from top with drift and rotation
 * 
 * @param {number} until - Duration in seconds (default: 15)
 */
export const openAnimation = (until = 15) => {
  const animationEnd = Date.now() + until * 1000;
  
  // Pink heart colors - 3 shades
  const colors = ['#FFC0CB', '#FF1493', '#C71585'];  // Baby pink, hot pink, medium violet red
  
  // Create custom heart shape
  const heart = confetti.shapeFromPath({
    path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
    matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
  });

  // Animation frame function
  const frame = () => {
    confetti({
      particleCount: 1,
      startVelocity: 0,           // No upward force
      ticks: randomInRange(200, 300),  // Lifespan
      origin: {
        x: Math.random(),         // Random horizontal position
        y: (Math.random() * 0.1) - 0.1  // Start slightly above viewport
      },
      zIndex: CONFETTI_Z_INDEX,
      colors: colors,
      shapes: [heart],
      drift: randomInRange(-0.5, 0.5),    // Horizontal movement
      gravity: randomInRange(0.5, 1),     // Fall speed
      scalar: randomInRange(0.5, 1)       // Size variation
    });

    // Continue animation until time expires
    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };

  // Start the animation loop
  frame();
};

/**
 * 3. TAP-TAP ANIMATION - Interactive Hearts
 * Purpose: Heart burst when user double-taps content
 * Effect: Hearts shoot from both sides of the tapped element
 * 
 * @param {HTMLElement} element - Element to burst from
 * @param {number} duration - Animation duration in ms (default: 50)
 */
export const tapTapAnimation = (element, duration = 50) => {
  if (!element) return;
  
  const rect = element.getBoundingClientRect();
  const x = rect.left / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;
  
  // Hot pink colors
  const colors = ['#FF69B4', '#FF1493'];
  
  // Create heart shape
  const heart = confetti.shapeFromPath({
    path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
    matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
  });

  const end = Date.now() + duration;

  const frame = () => {
    // Burst from left side
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      shapes: [heart],
      origin: { x, y },
      zIndex: CONFETTI_Z_INDEX,
      colors: colors
    });

    // Burst from right side
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      shapes: [heart],
      origin: { x, y },
      zIndex: CONFETTI_Z_INDEX,
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

/**
 * EMOJI BLAST - Interactive Easter Egg Effect
 * Purpose: Fun emoji burst for interactive elements (not part of main wedding animation)
 * Used for: Easter eggs in PeopleSection when clicking on certain names
 * 
 * @param {string} emoji - Any emoji character (default: '🦄')
 * @param {number} scalar - Size multiplier (default: 2)
 */
export const emojiBlast = (emoji = '🦄', scalar = 2) => {
  const emojiShape = confetti.shapeFromText({ text: emoji, scalar });

  const defaults = {
    spread: 360,
    ticks: 90,
    gravity: 0.15,
    decay: 0.94,
    startVelocity: 18,
    shapes: [emojiShape],
    scalar,
    zIndex: CONFETTI_Z_INDEX
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 30
    });

    confetti({
      ...defaults,
      particleCount: 5,
      flat: true
    });

    confetti({
      ...defaults,
      particleCount: 15,
      scalar: scalar / 2,
      shapes: ['circle']
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
};

