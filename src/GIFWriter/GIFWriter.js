import cloneDeep from 'lodash.clonedeep';
import CanvasWriter from '../CanvasWriter';
import { getRandomInt } from '../helpers';
import GIF from '../gif.js/gif';
import { GIFWriterDefaults } from '../defaultPresets';
import { transcodeBlob } from '../videoTomp4';

// Extends CanvasWriter functionality
export default class GIFWriter extends CanvasWriter {
  constructor({ elements, presets, options }) {
    const GWpresets = Object.assign(GIFWriterDefaults, presets);

    super({ elements, presets, options });
    this.timer = null;
    this.startIndex = 0;
    this.maxStartIndex = null;

    //what to do with the saved image/vid/gif
    this.callbacks = options.callbacks;

    //presets
    this.historyAnimation = GWpresets.historyAnimation;
    this.animationSpeed = GWpresets.animationSpeed; //interval between frames in s
    this.init_gifwriter();
  }

  cancelAnimation() {
    clearTimeout(this.timer);
  }

  getCurrentAnimationType = () => {
    let animationFunction = this.historyAnimation
      ? this.animateHistory
      : this.animateLinear;

    return animationFunction;
  };

  // animates full history (from startIndex)
  animateHistory = (onAnimationEnd, onFrame) => {
    let idx = this.startIndex;
    const { history } = this.editor;

    // set letters visible at random intervals for natural typing effect
    const type = () => {
      clearTimeout(this.timer);
      const speed = this.animationSpeed * 1000;
      const variance = this.animationSpeed * 500;
      const interval = getRandomInt(speed - variance, speed + variance);

      if (idx < history.length) {
        this.timer = setTimeout(() => {
          const historyText = history[idx];
          this.paper.refreshCanvas();
          this.paper.renderText(historyText, historyText.overwrite);
          onFrame && onFrame();
          idx++;
          type();
        }, interval);
      } else {
        this.timer = setTimeout(() => {
          onAnimationEnd && onAnimationEnd();
          clearTimeout(this.timer);
        }, 500); //timeout here otherwise last frame isn't captured
      }
    };
    type();
  };

  // animates last item (from start  -no option for otherwise yet)
  animateLinear = (onAnimationEnd, onFrame) => {
    // let idx = this.startIndex;
    let startIndex = this.startIndex;

    let groupIndex = startIndex;
    let entryIndex = 0;
    let overwrite = false;

    const text = this.editor.getLastHistory();
    // const { overwrite } = text;

    const getNextState = (text, groupIndex, entryIndex) => {
      // =/ it works..
      if (typeof groupIndex === 'boolean') {
        return [false];
      }
      const newText = cloneDeep(text);
      newText.cursorIndex = groupIndex; //this and setting overwrite below keeps the cursor in nice position

      let nextGroupIndex = groupIndex;
      let nextEntryIndex = entryIndex;
      const group = text.groups[groupIndex];
      const { entries } = group;

      const newGroups = cloneDeep(text.groups.slice(0, groupIndex + 1));
      const newEntries = cloneDeep(
        text.groups[groupIndex].entries.slice(0, entryIndex + 1)
      );
      newText.groups = newGroups;
      newText.groups[groupIndex].entries = newEntries;

      if (entryIndex + 1 < entries.length) {
        nextEntryIndex = entryIndex + 1;
        nextGroupIndex = groupIndex;
        overwrite = true;
      } else if (groupIndex + 1 < text.groups.length) {
        nextEntryIndex = 0;
        nextGroupIndex = groupIndex + 1;
        overwrite = false;
      } else {
        nextGroupIndex = false;
        nextEntryIndex = false;
      }

      return [newText, nextGroupIndex, nextEntryIndex];
    };

    // set letters visible at random intervals for natural typing effect
    const type = () => {
      clearTimeout(this.timer);
      const speed = this.animationSpeed * 1000;
      const variance = this.animationSpeed * 500;
      const interval = getRandomInt(speed - variance, speed + variance);
      const next = getNextState(text, groupIndex, entryIndex);
      const [nextText, nextGroupIndex, nextEntryIndex] = next;

      if (nextText) {
        this.timer = setTimeout(() => {
          groupIndex = nextGroupIndex;
          entryIndex = nextEntryIndex;

          this.paper.refreshCanvas();
          this.paper.renderText(nextText, overwrite);
          onFrame && onFrame();

          type();
        }, interval);
      } else {
        this.timer = setTimeout(() => {
          onAnimationEnd && onAnimationEnd();
          clearTimeout(this.timer);
        }, 500); //timeout here otherwise last frame isn't captured
      }
    };
    type();
  };

  recordVideo(animationFunction) {
    let chunks = []; // here we will store our recorded media chunks (Blobs)
    const stream = this.DOMControls.canvas.captureStream(); // grab our canvas MediaStream
    const rec = new MediaRecorder(stream); // init the recorder
    let lastChunk;
    // every time the recorder has new data, we will store it in our array
    rec.ondataavailable = (e) => {
      chunks.push(e.data);
      lastChunk = e.data;
    };
    // only when the recorder stops, we construct a complete Blob from all the chunks
    // rec.onstop = (e) => exportVid(new Blob(chunks, { type: 'video/webm' }));
    rec.onstop = async (e) => {
      let webmBlob = new Blob(chunks, { type: 'video/webm' });
      console.log('webmblob', webmBlob);
      let fps = parseInt(1 / ((this.animationSpeed * 2) / 3)); // calc min req fps to cover the interval range here [3/2 accounts for variance in animation fn]

      let mp4Blob = await transcodeBlob(webmBlob, fps);

      let objectURL = URL.createObjectURL(mp4Blob);

      this.callbacks.onVideo(objectURL);
      // exportVid(webmBlob);
      // exportVid(mp4Blob);
    };

    // rec.onstop = (e) => {
    //   exportVid(new Blob(chunks, { type: 'video/mp4; codecs="avc1.4d002a"' }));
    // };
    // rec.onstop = (e) => {
    //   console.log(chunks);
    //   exportVid(new Blob(chunks, { type: 'video/webm' }));
    // };
    // rec.onstop = (e) =>
    //   exportVid(new Blob(chunks, { type: 'video/x-msvideo' }));

    // rec.onstop = async (e) => {
    //   let blob = new Blob(chunks, { type: 'video/webm' });
    //   let mp4blob = await transcode(blob);
    //   exportVid(mp4blob);
    // };

    rec.start();
    // setTimeout(() => rec.stop(), 3000); // stop recording in 3s

    function onAnimationEnd() {
      // stop the last frame from being missed..
      rec.stop();
    }

    animationFunction(onAnimationEnd);
  }

  recordGif(animationFunction) {
    console.log('recording gif');
    // https://github.com/jnordberg/gif.js/
    // see dithering / quality
    const gif = new GIF({
      workers: 4,
      workerScript: '/gif.js/gif.worker.js',
      width: this.paper.dimensions.w,
      height: this.paper.dimensions.h,
      // repeat: -1,
    });

    gif.on('finished', (blob) => {
      const img = new Image();
      let objectURL = URL.createObjectURL(blob);
      this.callbacks.onGif(objectURL);
      // img.src = objectURL;
      // document.body.append(img);
    });

    const onAnimationEnd = () => {
      gif.render();
    };

    const onFrame = () => {
      gif.addFrame(this.paper.ctx, {
        copy: true,
        delay: this.animationSpeed * 1000,
      });
    };

    animationFunction(onAnimationEnd, onFrame);
  }

  saveImage() {
    // save as img

    const dataURL = this.DOMControls.canvas.toDataURL('image/png');
    this.callbacks.onImage(dataURL);
  }

  init_gifwriter() {
    this.addGifControlEventListeners(this.DOMControls);
    this.maxStartIndex = this.editor.history.length;

    // //method overwrites

    // const addToHistory = (historyItem) => {
    //   if (this.history.length === this.maxHistory) {
    //     this.history.splice(0, 1);
    //   }
    //   this.history.push(historyItem);

    //   //addition:
    //   this.maxStartIndex = this.history.length;
    //   console.log(this.maxStartIndex);
    // };
  }

  addGifControlEventListeners(DOMControls) {
    const {
      a_start_idx,
      a_start,
      a_history_toggle,
      a_start2,
      a_speed,
      s_record,
      s_image,
      s_gif,
      t_reset,
    } = DOMControls; // etc etc/

    const addControlListeners = () => {
      const handleStartAnimation = (e) => {
        let animationFunction = this.getCurrentAnimationType();
        animationFunction();

        // this.animate();
      };

      const handleToggleHistoryAnimation = (e) => {
        // this.animateHistory();
        let linear = e.target.checked;
        this.historyAnimation = e.target.checked;

        this.startIndex = 0; //start index is different for different animation functions (can be too big for linear if not reset)
        this.syncDOM(this.DOMControls);
      };
      const handleStartIndexRange = (e) => {
        this.startIndex = Number(e.target.value);

        // console.log(this.historyAnimation);
        if (this.historyAnimation) {
          a_start_idx.max = String(this.editor.history.length - 1);
        } else {
          // console.log('max', this.editor.getLastHistory().groups.length - 1);
          a_start_idx.max = String(
            this.editor.getLastHistory().groups.length - 1
          );
        }

        let animationFunction = this.getCurrentAnimationType();
        animationFunction();
      };
      const handleAnimationSpeedRange = (e) => {
        this.animationSpeed = e.target.value;
        let animationFunction = this.getCurrentAnimationType();
        animationFunction();
      };
      const handleStartRecordVideo = (e) => {
        let animationFunction = this.getCurrentAnimationType();
        this.recordVideo(animationFunction);
      };
      const handleStartRecordGif = (e) => {
        let animationFunction = this.getCurrentAnimationType();

        this.recordGif(animationFunction);
      };
      const handleSaveImage = (e) => {
        this.saveImage();
      };

      //additional listeners [element already has one attached]
      const handleResetButton = () => {
        this.startIndex = 0;
        this.syncDOM(this.DOMControls);
        this.renderLastText();
      };

      // animation
      a_start?.addEventListener('click', handleStartAnimation);

      a_history_toggle?.addEventListener('click', handleToggleHistoryAnimation);

      a_start_idx?.addEventListener('input', handleStartIndexRange);
      a_speed?.addEventListener('input', handleAnimationSpeedRange);

      // saving
      s_record?.addEventListener('click', handleStartRecordVideo);
      s_image?.addEventListener('click', handleSaveImage);
      s_gif?.addEventListener('click', handleStartRecordGif);

      // additional
      t_reset?.addEventListener('click', handleResetButton);
    };

    addControlListeners();
    this.syncDOM(DOMControls);
  }
  syncDOM = (DOMControls) => {
    const {
      a_start_idx,
      a_start,
      a_history_toggle,
      a_start2,
      a_speed,
      s_record,
      s_image,
      s_gif,
    } = DOMControls; // etc etc/
    a_start_idx && (a_start_idx.value = this.startIndex);
    a_speed && (a_speed.value = this.animationSpeed);
    a_history_toggle && (a_history_toggle.checked = this.historyAnimation);
  };
}
