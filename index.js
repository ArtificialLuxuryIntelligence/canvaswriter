import './styles.scss';
import Editor from './src/editor';
import Paper from './src/paper';

console.clear();

// const controller = new AbortController(); //too new

init();

///

function init() {
  let paper = new Paper('paper');
  let editor = new Editor();
  editor.connect(paper);

  // TODO all controls in here (c,f, addTextConrolListeners)
  const DOMControls = {
    l_rotation_control: document.getElementById('letter-r'),
    l_x_control: document.getElementById('letter-x'),
    l_y_control: document.getElementById('letter-y'),
    l_scale_control: document.getElementById('letter-s'),
    l_color: document.getElementById('letter-color'),
    l_opacity: document.getElementById('letter-o'),

    t_color: document.getElementById('text-color'),
  };
  // console.log(DOMControls);
  const {
    l_rotation_control,
    l_x_control,
    l_y_control,
    l_scale_control,
    l_color,
    l_opacity,
    t_color,
  } = DOMControls;

  const letterControls = {
    l_rotation_control,
    l_x_control,
    l_y_control,
    l_scale_control,
    l_color,
    l_opacity,
  };
  const textControls = { t_color };

  const renderLastText = (editor) => {
    // console.log(editor);
    paper.refreshCanvas();

    let last = editor.getLastHistory();
    paper.renderText(last, editor.overwrite);
  };

  function updateLetterControls(letterControls) {
    let entry = editor.getCurrentEntry();
    if (!entry?.styles) {
      return;
    }

    Object.values(letterControls).forEach((input) => {
      let key = input.dataset.key;

      input.value = entry.styles[key];
    });
  }

  const addLetterControlListeners = (letterControls) => {
    Object.values(letterControls).forEach((input) => {
      function inputHandler(e) {
        let entry = editor.getCurrentEntry();
        if (entry) {
          let key = input.dataset.key;
          let val = e.target.value;
          // console.log(key, val);
          entry.editStyle(input.dataset.key, val);
          renderLastText(editor);
        }
      }
      input.addEventListener('input', inputHandler);
    });
  };

  function addTextControlListeners(textControls) {
    const { t_color } = textControls;

    function handleKeyDown(e) {
      e.preventDefault();
      editor.handleKeyInput(e.key);
      paper.refreshCanvas();
      updateLetterControls(letterControls);

      renderLastText(editor);
    }

    function handleLineHeightRange(e) {
      paper.lineHeight = e.target.value;
      renderLastText(editor);
    }
    function handleLetterSpacingRange(e) {
      paper.letterSpacing = e.target.value;
      renderLastText(editor);
    }

    function handleFontScaleRange(e) {
      paper.fontRatio = e.target.value;
      renderLastText(editor);
    }

    function handleBrokenRange(e) {
      paper.broken = e.target.value;
      renderLastText(editor);
    }

    function handleOverwriteButton() {
      editor.overwrite = !editor.overwrite;
      renderLastText(editor);
    }

    function handleUndoButton() {
      editor.undo();
      let last = editor.getLastHistory();
      // console.log(editor.history);
      // console.log('last', last);
      renderLastText(editor);
    }

    function handleRedoButton() {
      editor.redo();
      renderLastText(editor);
    }

    function handleTextColorInput(e) {
      paper.fontColor = e.target.value;
      console.log(e.target.value);
      renderLastText(editor);
    }

    t_color.value = paper.fontColor;
    t_color.addEventListener('input', handleTextColorInput);

    //redo this
    document
      .getElementById('line-height')
      .addEventListener('input', handleLineHeightRange);

    document
      .getElementById('letter-spacing')
      .addEventListener('input', handleLetterSpacingRange);

    document
      .getElementById('font-scale')
      .addEventListener('input', handleFontScaleRange);

    document
      .getElementById('broken')
      .addEventListener('input', handleBrokenRange);

    document
      .getElementById('overwrite')
      .addEventListener('click', handleOverwriteButton);

    document.getElementById('undo').addEventListener('click', handleUndoButton);

    document.getElementById('redo').addEventListener('click', handleRedoButton);

    document.addEventListener('keydown', handleKeyDown);
  }

  addTextControlListeners(textControls);

  addLetterControlListeners(letterControls);
}
