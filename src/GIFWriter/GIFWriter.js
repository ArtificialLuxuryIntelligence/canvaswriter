import CanvasWriter from '../CanvasWriter';
import { getRandomInt } from '../CanvasWriter/helpers';
import GIF from '../gif.js/gif';

function exportVid(blob) {
  const vid = document.createElement('video');
  vid.src = URL.createObjectURL(blob);
  vid.controls = true;
  document.body.appendChild(vid);
  const a = document.createElement('a');
  a.download = 'myvid.mp4';
  a.href = vid.src;
  a.textContent = 'download the video';
  document.body.appendChild(a);
}

function exportPic(canvas) {
  var image = canvas.toDataURL('image/png');
  console.log(image);
  const img = new Image();
  img.src = image;
  document.body.append(img);
}

// Extends CanvasWriter functionality
export default class GIFWriter extends CanvasWriter {
  constructor(options) {
    super(options);
    this.timer = null;
    this.animationSpeed = 0.1;
    this.startIndex = 0;
    this.init_gifwriter();
  }
  //blah super blah
  //second canvas here (not in paper class)

  //spread into same array in constructor?
  //more dom nodes :
  // - animationstart
  // - speed
  // - etc (see original)
  // - output img/link?

  // onRecorded // onSaved callbacks [probs used to update UI]

  animate = (onAnimationEnd, onFrame) => {
    let idx = this.startIndex;
    let history = this.editor.history;
    console.log(history);

    //set letters visible at random intervals for natural typing effect
    const type = () => {
      clearTimeout(this.timer);
      let speed = this.animationSpeed * 1000;
      let variance = this.animationSpeed * 500;
      let interval = getRandomInt(speed - variance, speed + variance);

      if (idx < history.length) {
        this.timer = setTimeout(() => {
          let historyText = history[idx];
          this.paper.refreshCanvas();
          this.paper.renderText(historyText, historyText.overwrite);
          onFrame && onFrame();
          idx++;
          type();
        }, interval);
      } else {
        clearTimeout(this.timer);
        onAnimationEnd && onAnimationEnd();

        return;
      }
    };
    type();
  };

  record() {
    const chunks = []; // here we will store our recorded media chunks (Blobs)
    const stream = this.DOMControls.canvas.captureStream(); // grab our canvas MediaStream
    const rec = new MediaRecorder(stream); // init the recorder
    // every time the recorder has new data, we will store it in our array
    rec.ondataavailable = (e) => chunks.push(e.data);
    // only when the recorder stops, we construct a complete Blob from all the chunks
    // rec.onstop = (e) => exportVid(new Blob(chunks, { type: 'video/webm' }));
    rec.onstop = (e) => exportVid(new Blob(chunks, { type: 'video/mp4' }));

    rec.start();
    // setTimeout(() => rec.stop(), 3000); // stop recording in 3s

    function onAnimationEnd() {
      setTimeout(() => {
        //stop the last frame from being missed..
        rec.stop();
      }, 200);
    }

    this.animate(onAnimationEnd);
  }

  recordGif() {
    console.log('recording gif');
      // https://github.com/jnordberg/gif.js/
      //see dithering / quality 
    let gif = new GIF({
      workers: 4,
      workerScript: '/gif.js/gif.worker.js',
      width: this.paper.dimensions.w,
      height: this.paper.dimensions.h,
    });

    gif.on('finished', (blob) => {
      const img = new Image();
      img.src = URL.createObjectURL(blob);
      document.body.append(img);
    });

    const onAnimationEnd = () => {
      gif.render();
    };

    const onFrame = () => {
    
      gif.addFrame(this.paper.ctx, { copy: true, delay: 200 });
    };

    this.animate(onAnimationEnd, onFrame);
  }

  saveImage() {
    //save as img
    exportPic(this.DOMControls.canvas);
  }

  init_gifwriter() {
    this.addGifControlEventListeners(this.DOMControls);
  }

  addGifControlEventListeners(DOMControls) {
    const { a_start_idx, a_start, a_speed, s_record, s_image, s_gif } =
      DOMControls; //etc etc/

    const syncInitial = () => {
      a_start_idx && (a_start_idx.value = this.startIndex);
      a_speed && (a_speed.value = this.animationSpeed);
    };

    const addControlListeners = () => {
      const handleStartAnimation = (e) => {
        this.animate();
      };
      const handleStartIndexRange = (e) => {
        this.startIndex = e.target.value;
        this.animate();
      };
      const handleAnimationSpeedRange = (e) => {
        this.animationSpeed = e.target.value;
        this.animate();
      };
      const handleStartRecordVideo = (e) => {
        this.record();
      };
      const handleStartRecordGif = (e) => {
        this.recordGif();
      };
      const handleSaveImage = (e) => {
        this.saveImage();
      };

      //animation
      a_start?.addEventListener('click', handleStartAnimation);
      a_start_idx?.addEventListener('input', handleStartIndexRange);
      a_speed?.addEventListener('input', handleAnimationSpeedRange);

      //saving
      s_record?.addEventListener('click', handleStartRecordVideo);
      s_image?.addEventListener('click', handleSaveImage);
      s_gif?.addEventListener('click', handleStartRecordGif);
    };

    addControlListeners();
    syncInitial();
  }
}
