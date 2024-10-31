export function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const generateStars = () => {
  const stars = [];
  const count = 200;
  const random = mulberry32(56781); // Fixed seed for consistency

  for (let i = 0; i < count; i++) {
    stars.push({
      x: random() * window.innerWidth,
      y: random() * window.innerHeight,
      radius: 0.5 + random() * 2.5, // Radius between 0.5 and 3
      opacity: 0.5 + random() * 0.5, // Opacity between 0.5 and 1
    });
  }
  return stars;
};

// Store the generated stars in a constant
export const stars = generateStars();
