import './styles.scss';
// import CanvasWriter from './CanvasWriter';
import GIFWriter from './GIFWriter';
import CanvasWriter from './CanvasWriter';

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
  t_font: document.getElementById('font'),
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
  p_width: document.getElementById('pageWidth'),
  p_height: document.getElementById('pageHeight'),

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
  const p_width = document.getElementById('pageWidth');
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
    randomOpacity: false,
    overwrite: false,
    lineHeight: 0.9,
    letterSpacing: 1,
  };
  const options = {
    // fonts: [
    //   {
    //     name: 'Roboto Mono',
    //     url: 'https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap',
    //   },
    // ],
    callbacks: {
      onImage: (dataURL) => {
        const img = new Image();
        img.src = dataURL;
        document.body.append(img);
        const a = document.createElement('a');
        a.download = 'myPicture.png';
        a.href = img.src;
        a.textContent = 'download the pic';
        document.body.appendChild(a);
      },
      onGif: (objectURL) => {
        const img = new Image();
        img.src = objectURL;
        document.body.append(img);
        const a = document.createElement('a');

        a.download = 'myGif.gif';
        a.href = img.src;
        a.textContent = 'download the gif';
        document.body.appendChild(a);
      },
      onVideo: (objectURL) => {
        const vid = document.createElement('video');
        vid.src = objectURL;
        vid.controls = true;
        document.body.appendChild(vid);
        const a = document.createElement('a');
        a.download = 'myvideo.mp4';
        a.href = vid.src;
        a.textContent = 'download the video';
        document.body.appendChild(a);
      },
    },
  };
  const Gwriter = new GIFWriter({
    elements: DOMElements,
    presets,
    options,
  });

  addZoomHandler();

  console.log(Gwriter);
}

main();
