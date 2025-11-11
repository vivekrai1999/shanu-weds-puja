import confetti from 'canvas-confetti';

/**
 * Emoji blast confetti effect
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
    scalar
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

/**
 * Wedding invitation confetti - blasts from bottom with full screen coverage
 * @param {number} duration - Duration in seconds (default: 10)
 */
export const weddingConfetti = (duration = 10) => {
  const colors = ['#FFC300', '#FF5733', '#DC3545', '#FFD700', '#FF69B4', '#FFA500'];

  // Fire from bottom - multiple positions with wide spread
  for (let i = 0; i <= 10; i++) {
    confetti({
      particleCount: 80,
      spread: 120,
      startVelocity: 55,
      origin: { x: i / 10, y: 1.1 },
      colors: colors,
      gravity: 0.4,
      ticks: duration * 60
    });
  }

  // Strong center burst from bottom with 360° spread
  confetti({
    particleCount: 150,
    spread: 360,
    startVelocity: 60,
    origin: { x: 0.5, y: 1.1 },
    colors: colors,
    gravity: 0.4,
    ticks: duration * 60
  });

  // Additional center burst with narrower spread for concentrated effect
  confetti({
    particleCount: 100,
    spread: 90,
    startVelocity: 65,
    origin: { x: 0.5, y: 1.1 },
    colors: colors,
    gravity: 0.4,
    ticks: duration * 60
  });
};

