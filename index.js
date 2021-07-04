import './styles.scss';

import CanvasWriter from './src/CanvasWriter';
console.clear();

// const controller = new AbortController(); //too new

///

const DOMElements = {
  l_rotation_control: document.getElementById('letter-r'),
  l_x_control: document.getElementById('letter-x'),
  l_y_control: document.getElementById('letter-y'),
  l_scale_control: document.getElementById('letter-s'),
  l_color: document.getElementById('letter-color'),
  l_opacity: document.getElementById('letter-o'),
  t_color: document.getElementById('text-color'),
  t_line_height: document.getElementById('line-height'),
  t_letter_spacing: document.getElementById('letter-spacing'),
  t_font_scale: document.getElementById('font-scale'),
  t_broken: document.getElementById('broken'),
  t_overwrite: document.getElementById('overwrite'),
  t_undo: document.getElementById('undo'),
  t_redo: document.getElementById('redo'),
  t_key: document,
  canvas: document.getElementById('paper'),
};

function main() {
  let canvasWriter = new CanvasWriter({ elements: DOMElements, settings: {} });
}

main();
