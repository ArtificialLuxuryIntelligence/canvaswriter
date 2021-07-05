import Editor from './Editor';
import Paper from './Paper';

// Combine Paper and Editor functionality
export default class CanvasWriter {
  constructor(options) {
    console.log('options', options);
    const { elements, settings, presets } = options;
    const { canvas, canvas2 = null } = elements;

    this.paper = new Paper(canvas, presets);
    this.editor = new Editor(presets);

    this.DOMControls = elements;
    this.settings = settings;

    this.init();
  }

  init() {
    this.editor.connect(this.paper);
    this.addEventListeners(this.DOMControls);
  }

  addEventListeners(DOMControls) {
    console.log('adding listeners');
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
      t_line_height,
      t_letter_spacing,
      t_font_scale,
      t_broken,
      t_overwrite,
      t_undo,
      t_redo,
      t_key,
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
      t_line_height,
      t_letter_spacing,
      t_font_scale,
      t_broken,
      t_overwrite,
      t_undo,
      t_redo,
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
        t_color,
        t_line_height,
        t_letter_spacing,
        t_font_scale,
        t_broken,
        t_overwrite,
        t_undo,
        t_redo,
        t_key,
      } = textControls;

      const handleKeyDown = (e) => {
        e.preventDefault();
        this.editor.handleKeyInput(e.key);
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
      const handleOverwriteButton = () => {
        this.editor.overwrite = !this.editor.overwrite;
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
      const handleTextColorInput = (e) => {
        this.paper.fontColor = e.target.value;
        console.log(e.target.value);
        this.renderLastText();
      };

      //Add listeners
      t_color?.addEventListener('input', handleTextColorInput);
      t_line_height?.addEventListener('input', handleLineHeightRange);
      t_letter_spacing?.addEventListener('input', handleLetterSpacingRange);
      t_font_scale?.addEventListener('input', handleFontScaleRange);
      t_broken?.addEventListener('input', handleBrokenRange);
      t_overwrite?.addEventListener('click', handleOverwriteButton);
      t_undo?.addEventListener('click', handleUndoButton);
      t_redo?.addEventListener('click', handleRedoButton);
      t_key?.addEventListener('keydown', handleKeyDown);
    };
    const syncInitial = (DOMControls) => {
      const { t_color } = DOMControls;
      //   console.log('tc', t_color);
      t_color && (t_color.value = this.paper.fontColor);
    };

    addTextControlListeners(textControls);
    addLetterControlListeners(letterControls);
    syncInitial(DOMControls);
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
