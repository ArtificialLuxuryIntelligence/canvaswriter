import { getRandomArbitrary } from '../helpers';

let rotationMax = 15;
let translationXMax = 0.25;
let translationYMax = 0.25;

const alphaNums =
  '`1234567890-=qwertyuiop[]asdfghjkl;\'zxcvbnm,./¬!"£$%^&*()+QWERTYUIOP{}~ASDFGHJKL:@ZXCVBNM<>?';

// TODO:
// replaces initAlphaNumStyles so that letters can be added dynamically (and not rely on the above list)
class ANStyles {
  constructor(broken) {
    this.broken = broken;
    this.letters = [];
  }
  getStyles(letter) {}
  genStyles(letter) {}
}
//
const initAlphaNumStyles = (opts = { broken: 0.5 }) => {
  let { broken } = opts;

  let settings = {
    rotation: broken * rotationMax,
    translationX: broken * translationXMax,
    translationY: broken * translationYMax,
  };

  // make options if you want a consistent appearance for certain letters otherwise it's rando:
  let ans = alphaNums.split('');
  let styles = {};
  for (let a of ans) {
    //set as vars

    let rotation = getRandomArbitrary(-settings.rotation, settings.rotation);
    let translationY = getRandomArbitrary(
      -settings.translationY,
      settings.translationY
    );
    let translationX = getRandomArbitrary(
      -settings.translationX,
      settings.translationX
    );

    // styles[a] = {
    //   transform: `rotate(${rotation}deg) translateY(${translationY}em) translateX(${translationX}em)`,
    // };

    styles[a] = {
      rotation,
      x: translationX,
      y: translationY,
      scale: 1,
    };
  }
  return styles;
};

export { initAlphaNumStyles };
