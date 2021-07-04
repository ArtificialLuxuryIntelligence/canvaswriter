import './styles.scss';
import Editor from './src/editor';
import Paper from './src/paper';

console.clear();

// const controller = new AbortController(); //too new

let paper = new Paper('paper');
console.log('pp', paper);
let editor = new Editor();
editor.connect(paper);

const DOMControls = {
  l_rotation_control: document.getElementById('letter-r'),
  l_x_control: document.getElementById('letter-x'),
  l_y_control: document.getElementById('letter-y'),
  l_scale_control: document.getElementById('letter-s'),
};
// console.log(DOMControls);

const renderLastText = (editor) => {
  // console.log(editor);
  paper.refreshCanvas();

  let last = editor.getLastHistory();
  paper.renderText(last, editor.overwrite);
};

function updateLetterControls() {
  let entry = editor.getCurrentEntry();

  if (!entry?.styles) {
    return;
  }

  Object.values(DOMControls).forEach((input) => {
    let key = input.dataset.key;

    input.value = entry.styles[key];
  });
}

const addLetterControlListeners = (DOMControls) => {
  const { l_rotation_control, l_x_control, l_y_control, l_scale_control } =
    DOMControls;

  Object.values(DOMControls).forEach((input) => {
    function inputHandler(e) {
      let entry = editor.getCurrentEntry();
      if (entry) {
        let key = input.dataset.key;
        let val = e.target.value;
        console.log(key, val);
        entry.editStyle(input.dataset.key, val);
        renderLastText(editor);
      }
    }
    input.addEventListener('input', inputHandler);
  });
};

function addTextControlListeners() {
  function handleKeyDown(e) {
    e.preventDefault();
    // console.log(e.key);
    editor.handleKeyInput(e.key);
    paper.refreshCanvas();
    updateLetterControls();

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
    console.log(editor.history);
    console.log('last', last);
    renderLastText(editor);
  }

  function handleRedoButton() {
    editor.redo();
    renderLastText(editor);
  }

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

addTextControlListeners(DOMControls);

addLetterControlListeners(DOMControls);
