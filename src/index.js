import './styles.scss';
// import CanvasWriter from './CanvasWriter';
import GIFWriter from './GIFWriter';

const DOMElements = {
  // canvas
  canvas: document.getElementById('paper'),

  // letter controls
  l_rotation_control: document.getElementById('letter-r'),
  l_x_control: document.getElementById('letter-x'),
  l_y_control: document.getElementById('letter-y'),
  l_scale_control: document.getElementById('letter-s'),
  l_color: document.getElementById('letter-color'),
  l_opacity: document.getElementById('letter-o'),

  // text controls
  t_color: document.getElementById('text-color'),
  t_line_height: document.getElementById('line-height'),
  t_letter_spacing: document.getElementById('letter-spacing'),
  t_font_scale: document.getElementById('font-scale'),
  t_broken: document.getElementById('broken'),
  t_rand_opacity: document.getElementById('random-opacity'),

  t_overwrite: document.getElementById('overwrite'),
  t_undo: document.getElementById('undo'),
  t_redo: document.getElementById('redo'),
  t_reset: document.getElementById('reset'),

  t_key: document, // detects key inputs

  // page controls
  p_color: document.getElementById('page-color'),
  p_width: document.getElementById('page-width'),
  p_height: document.getElementById('page-height'),

  // animation controls
  a_start: document.getElementById('animation-start'),
  a_history_toggle: document.getElementById('animate-history-toggle'),
  a_start_idx: document.getElementById('animation-start-index'),
  a_speed: document.getElementById('animation-speed'),
  // saving controls

  s_record: document.getElementById('record-vid'),
  s_gif: document.getElementById('record-gif'),
  s_image: document.getElementById('save-image'),
};

function addZoomHandler() {
  const zoomRange = document.getElementById('zoom');
  const p_width = document.getElementById('page-width');
  const canvas = document.getElementById('paper');

  const updateZoom = (canvasWidth, zoomValue) => {
    canvas.style.width = `${(canvasWidth * zoomValue) / 100}px`;
  };

  const handleZoomRange = (e) => {
    updateZoom(p_width.value, e.target.value);
    // canvas.style.width = `${(canvas.width * e.target.value) / 100}px`;
  };

  const handlePageWidthRange = (e) => {
    updateZoom(e.target.value, zoomRange.value);

    // canvas.style.width = `${(canvas.width * e.target.value) / 100}px`;
  };

  zoomRange.addEventListener('input', handleZoomRange);
  p_width.addEventListener('input', handlePageWidthRange);
}

function main() {
  const presets = {
    //cf. defaults
    // randomOpacity: true,
    // overwrite: false,
    // lineHeight: 0.1,
  };
  const Gwriter = new GIFWriter({
    elements: DOMElements,
    presets,
    settings: {},
  });
  addZoomHandler();

  console.log(Gwriter);
}

main();
