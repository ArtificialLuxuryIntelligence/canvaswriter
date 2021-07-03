import './styles.scss';
import Editor from './src/editor';
import Paper from './src/paper';

console.clear();
document.removeEventListener('keydown', handleKeyDown);

let editor = new Editor();
let paper = new Paper('paper');

editor.overwrite = true;

function handleKeyDown(e) {
  e.preventDefault();
  // console.log(e.key);
  editor.handleKeyInput(e.key);
  let last = editor.history[editor.history.length - 1];
  paper.refreshCanvas();
  last && paper.renderText(last, editor.overwrite);
  console.log(last.groups.map((e) => e.entries[0].key));
  // console.log(editor.cursorIndex);
}

document.addEventListener('keydown', handleKeyDown);
