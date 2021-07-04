function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Number(Math.floor(Math.random() * (max - min + 1)) + min);
}
function getRandomArbitrary(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

const clamp = (a, b, c) => Math.max(b, Math.min(c, a));

export { getRandomArbitrary, getRandomInt, clamp };
