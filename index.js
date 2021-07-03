import './styles.scss';
import Editor from './src/editor';
import Paper from './src/paper';

console.clear();
document.removeEventListener('keydown', handleKeyDown);

let editor = new Editor();
let paper = new Paper('paper');

// editor.overwrite = true;

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

function renderLastText(editor) {
  let last = editor.getLastHistory();
  paper.renderText(last, editor.overwrite);
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
document.addEventListener('keydown', handleKeyDown);
