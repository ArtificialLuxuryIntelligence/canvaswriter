import './styles.scss';
import Editor from './src/editor';
import Paper from './src/paper';

console.clear();
document.removeEventListener('keydown', handleKeyDown);

let editor = new Editor();
let paper = new Paper('paper');

const renderLastText = (editor) => {
  // console.log(editor);
  paper.refreshCanvas();

  let last = editor.getLastHistory();
  paper.renderText(last, editor.overwrite);
};

function handleKeyDown(e) {
  e.preventDefault();
  // console.log(e.key);
  editor.handleKeyInput(e.key);
  paper.refreshCanvas();
  // let last = editor.getLastHistory();
  // paper.renderText(last, editor.overwrite);
  // console.log(last.groups.map((e) => e.entries[0].key));
  // console.log(editor.cursorIndex);

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
  .getElementById('overwrite')
  .addEventListener('click', handleOverwriteButton);

document.getElementById('undo').addEventListener('click', handleUndoButton);

document.getElementById('redo').addEventListener('click', handleRedoButton);

document.addEventListener('keydown', handleKeyDown);
