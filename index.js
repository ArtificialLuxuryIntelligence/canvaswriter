import './styles.scss';
import './src/gif.js/gif';
import CanvasWriter from './src/CanvasWriter';
import GIFWriter from './src/GIFWriter/GIFWriter';
console.clear();

const DOMElements = {
  //letter controls
  l_rotation_control: document.getElementById('letter-r'),
  l_x_control: document.getElementById('letter-x'),
  l_y_control: document.getElementById('letter-y'),
  l_scale_control: document.getElementById('letter-s'),
  l_color: document.getElementById('letter-color'),
  l_opacity: document.getElementById('letter-o'),
  //text controls
  t_color: document.getElementById('text-color'),
  t_line_height: document.getElementById('line-height'),
  t_letter_spacing: document.getElementById('letter-spacing'),
  t_font_scale: document.getElementById('font-scale'),
  t_broken: document.getElementById('broken'),
  t_overwrite: document.getElementById('overwrite'),
  t_undo: document.getElementById('undo'),
  t_redo: document.getElementById('redo'),
  t_key: document, //detects key inputs

  //page controls
  p_color: document.getElementById('page-color'),
  p_width: document.getElementById('page-width'),
  p_height: document.getElementById('page-height'),

  //animation controls
  a_start: document.getElementById('animation-start'),
  a_start2: document.getElementById('animation-start2'),

  a_start_idx: document.getElementById('animation-start-index'),
  a_speed: document.getElementById('animation-speed'),
  // saving controls

  s_record: document.getElementById('record-vid'),
  s_gif: document.getElementById('record-gif'),
  s_image: document.getElementById('save-image'),
  //canvas
  canvas: document.getElementById('paper'),
};

function main() {
  const presets = {
    randomOpacity: true,
  };
  // let canvasWriter = new CanvasWriter({ elements: DOMElements, settings: {} });
  let Gwriter = new GIFWriter({
    elements: DOMElements,
    presets,
    settings: {},
  });
  console.log(Gwriter);
  // console.log(canvasWriter);
}

main();
