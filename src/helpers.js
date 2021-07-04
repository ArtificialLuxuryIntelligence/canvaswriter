function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Number(Math.floor(Math.random() * (max - min + 1)) + min);
}
function getRandomArbitrary(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

function hex2rgba(hex, a) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);

  return `rgba(${r},${g},${b},${a})`;
}

const clamp = (a, b, c) => Math.max(b, Math.min(c, a));

export { hex2rgba, getRandomArbitrary, getRandomInt, clamp };
