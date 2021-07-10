import Editor from './Editor/Editor';
import Paper from './Paper';

// Combine Paper and Editor and add controls
export default class CanvasWriter {
  constructor({ elements, settings, presets }) {
    const { canvas, canvas2 = null } = elements;

    this.paper = new Paper(canvas, presets);
    this.editor = new Editor(presets);

    this.DOMControls = elements;
    this.settings = settings;
    // settings not used but leave for now (could be used to autocreate the DOMElements? in a given container?)
    // this would then require all ranges to have min/max [although range:{min:1,max:5,default:4}] might be better
    this.init();
  }

  init() {
    this.editor.connect(this.paper);
    this.addEventListeners(this.DOMControls);
  }

  addEventListeners(DOMControls) {
    const {
      canvas,
      canvas2,
      l_rotation_control = null, //todo // same below to handle for none provided [then filter before looping over in addhandler]
      l_x_control,
      l_y_control,
      l_scale_control,
      l_color,
      l_opacity,
      t_color,
      p_color,
      p_width,
      p_height,
      t_line_height,
      t_letter_spacing,
      t_font_scale,
      t_broken,
      t_rand_opacity,
      t_overwrite,
      t_undo,
      t_redo,
      t_reset,
      t_key = document,
    } = DOMControls; //etc etc/

    const letterControls = {
      l_rotation_control,
      l_x_control,
      l_y_control,
      l_scale_control,
      l_color,
      l_opacity,
    };
    const textControls = {
      t_color,
      p_color,
      p_width,
      p_height,
      t_line_height,
      t_letter_spacing,
      t_font_scale,
      t_broken,
      t_rand_opacity,
      t_overwrite,
      t_undo,
      t_redo,
      t_reset,
      t_key,
    };
    const addLetterControlListeners = (letterControls) => {
      Object.values(letterControls)
        .filter((v) => !!v) //if it exists
        .forEach((input) => {
          const inputHandler = (e) => {
            let entry = this.editor.getCurrentEntry();
            if (entry) {
              let key = input.dataset.key;
              let val = e.target.value;
              // console.log(key, val);
              entry.editStyle(key, val);
              this.renderLastText();
            }
          };
          input.addEventListener('input', inputHandler);
        });
    };
    const addTextControlListeners = (textControls) => {
      const {
        p_color,
        p_width,
        p_height,
        t_color,
        t_line_height,
        t_letter_spacing,
        t_font_scale,
        t_broken,
        t_rand_opacity,

        t_overwrite,
        t_undo,
        t_redo,
        t_reset,

        t_key,
      } = textControls;

      const handleKeyDown = (e) => {
        let key = e.key;
        if (e.key === 'Control') {
          return;
        }
        // adjust input rangesliders with arrows else type
        if (
          document.activeElement.tagName == 'INPUT' &&
          (e.key === 'ArrowLeft' || e.key === 'ArrowRight')
        ) {
          return;
        } else {
          e.preventDefault();
        }

        // if (key === 'v' && e.ctrlKey) { //paste
        //   key = '\ud83d\ude03';
        //   key = 'é';
        // }

        this.cancelAnimation && this.cancelAnimation(); //this is from GIFWriter class...
        this.editor.handleKeyInput(key);
        // this.paper.refreshCanvas();
        this.updateLetterControls(letterControls);
        this.renderLastText();
      };
      const handleLineHeightRange = (e) => {
        this.paper.lineHeight = e.target.value;
        this.renderLastText();
      };
      const handleLetterSpacingRange = (e) => {
        this.paper.letterSpacing = e.target.value;
        this.renderLastText();
      };
      const handleFontScaleRange = (e) => {
        this.paper.fontRatio = e.target.value;
        this.renderLastText();
      };
      const handleBrokenRange = (e) => {
        this.paper.broken = e.target.value;
        this.renderLastText();
      };
      const handleRandOpacityToggle = (e) => {
        console.log('ok');
        this.paper.randomOpacity = e.target.checked;
        console.log(this.paper.randomOpacity);
        // this.renderLastText();
      };
      const handleOverwriteToggle = (e) => {
        this.editor.overwrite = e.target.checked;
        this.renderLastText();
      };
      const handleUndoButton = () => {
        this.editor.undo();
        let last = this.editor.getLastHistory();
        // console.log(this.editor.history);
        // console.log('last', last);
        this.renderLastText();
      };
      const handleRedoButton = () => {
        this.editor.redo();
        this.renderLastText();
      };
      const handleResetButton = () => {
        this.editor.reset();
        this.renderLastText();
      };

      const handleTextColorInput = (e) => {
        this.paper.fontColor = e.target.value;
        // console.log(e.target.value);
        this.renderLastText();
      };
      const handlePageColorInput = (e) => {
        this.paper.pageColor = e.target.value;
        this.renderLastText();
      };
      const handlePageWidthRange = (e) => {
        this.paper.pageWidth = e.target.value;
        this.paper.setDimensions(
          Number(e.target.value),
          this.paper.dimensions.h
        );
        this.renderLastText();
      };

      const handlePageHeightRange = (e) => {
        console.log('han');
        this.paper.setDimensions(
          this.paper.dimensions.w,
          Number(e.target.value)
        );

        this.renderLastText();
      };

      //Add listeners
      p_color?.addEventListener('input', handlePageColorInput);
      p_width?.addEventListener('input', handlePageWidthRange);
      p_height?.addEventListener('input', handlePageHeightRange);
      t_color?.addEventListener('input', handleTextColorInput);
      t_line_height?.addEventListener('input', handleLineHeightRange);
      t_letter_spacing?.addEventListener('input', handleLetterSpacingRange);
      t_font_scale?.addEventListener('input', handleFontScaleRange);
      t_broken?.addEventListener('input', handleBrokenRange);
      t_rand_opacity?.addEventListener('click', handleRandOpacityToggle);
      t_overwrite?.addEventListener('click', handleOverwriteToggle);
      t_undo?.addEventListener('click', handleUndoButton);
      t_redo?.addEventListener('click', handleRedoButton);
      t_reset?.addEventListener('click', handleResetButton);
      t_key?.addEventListener('keydown', handleKeyDown);

      // canvas?.addEventListener('keydown', handleKeyDown);
    };

    // Synchronise the values of sliders/checkboxes to the state
    // Should cover all defaultPresets that have corresponding DOM inputs (for paper and editor)
    const syncDOM = (DOMControls) => {
      const {
        t_color,
        p_color,
        p_width,
        p_height,
        t_line_height,
        t_letter_spacing,
        t_font_scale,
        t_broken,
      } = DOMControls;
      //Paper options
      p_width && (p_width.value = this.paper.dimensions.w);
      p_height && (p_height.value = this.paper.dimensions.h);

      t_line_height && (t_line_height.value = this.paper.lineHeight);
      t_letter_spacing && (t_letter_spacing.value = this.paper.letterSpacing);
      t_font_scale && (t_font_scale.value = this.paper.fontRatio);
      t_broken && (t_broken.value = this.paper.broken);

      t_color && (t_color.value = this.paper.fontColor);
      l_color && (l_color.value = this.paper.fontColor);

      t_rand_opacity && (t_rand_opacity.checked = this.paper.randomOpacity);
      p_color && (p_color.value = this.paper.pageColor);

      // --- output UI
      p_width &&
        (p_width.nextElementSibling.value = this.paper.dimensions.w + 'px');
      p_height &&
        (p_height.nextElementSibling.value = this.paper.dimensions.h + 'px');

      // p_height && (p_height.value = this.paper.dimensions.h);
      // --

      //Editor options
      t_overwrite && (t_overwrite.checked = this.editor.overwrite);
      // console.log(this.paper.randomOpacity);
    };

    addTextControlListeners(textControls);
    addLetterControlListeners(letterControls);
    syncDOM(DOMControls);
  }

  renderLastText = () => {
    this.paper.refreshCanvas();
    let last = this.editor.getLastHistory();
    this.paper.renderText(last, this.editor.overwrite);
  };

  // Sync letter controls to values of current letter
  updateLetterControls = (letterControls) => {
    let entry = this.editor.getCurrentEntry();
    if (!entry?.styles) {
      return;
    }

    Object.values(letterControls)
      .filter((v) => !!v)
      .forEach((input) => {
        let key = input.dataset.key;
        input.value = entry.styles[key];
      });
  };
}
