// Text

import cloneDeep from 'lodash.clonedeep';
import HistoryState from './HistoryState';
import Entry from './Entry';
import EntryGroup from './EntryGroup';
import { editorDefaults } from '../../defaultPresets';

export default class Editor {
  constructor(presets = {}) {
    const options = Object.assign(editorDefaults, presets);

    this.paper = null;
    this.cursorIndex = 0;

    this.removedHistory = []; // undo functionality
    this.history = options.history;
    // options
    this._overwrite = options.overwrite;
    this.maxHistory = options.maxHistory;
    this.init_editor();
  }

  init_editor() {}

  get overwrite() {
    return this._overwrite;
  }

  set overwrite(val) {
    this._overwrite = val;

    if (val === true && this.cursorIndex === null) {
      this.cursorIndex = 0;
    }
  }

  // Exposed methods --------------------------------------------

  connect(paper) {
    this.paper = paper;
  }

  // Handle adding entries
  handleKeyInput(key, options = {}) {
    this.updateHistory(key, options);
    this.updateRemovedHistory(key);
    this.updateCursor(key, this._overwrite);

    //
  }

  undo = () => {
    const history = [...this.history];
    const removed = history.pop();
    this.history = history;
    if (removed) {
      this.removedHistory.push(removed);
      this.cursorIndex = removed.cursorIndex - 1;
    }
  };

  redo() {
    const removedHistory = [...this.removedHistory];
    const removed = removedHistory.pop();
    this.removedHistory = removedHistory;
    if (removed) {
      this.addToHistory(removed);
      this.cursorIndex = removed.cursorIndex;
    }
  }

  reset() {
    this.cursorIndex = 0;
    this.history = [];
  }

  getCurrentEntry() {
    // TODO refresh styles if it hasn't been edited (styles get init_editoriated at creation but not updated if global styles are changed i.e.wonk/textcol is changed)
    let entry;
    if (this._overwrite) {
      entry = this.getEntry(this.cursorIndex);
    } else {
      entry = this.getEntry(this.nextCursorIndex());
    }

    if (entry && !entry.editedStyles) {
      entry.setStyles(this.paper.updateEntryStyles(entry));
    }
    return entry;
  }

  getEntry(index) {
    // returns top letter of stack in top history entry
    // NOTE: if there is a paper instance connected, then it will also load in the style of that letter

    const last = this.getLastHistory();
    const group = last.groups[index];
    const entry = group?.getLastEntry();

    // if (entry) {
    //   if (!entry.styles) {
    //     entry.setStyles({
    //       ...this.paper.getANStyles(entry.key),
    //       color: this.paper.fontColor,
    //     });
    //   }
    //   // console.log(paper);
    // }

    return entry;
  }

  // Internals --------------------------------------------
  // Handle cursor movement
  incrCursor() {
    const last = this.getLastHistory().groups;
    if (this.cursorIndex === null) {
      this.cursorIndex = 0;
      return;
    }
    if (this._overwrite) {
      if (this.cursorIndex < last.length) {
        // ?
        this.cursorIndex++;
      } else {
        return;
      }
    }
    if (!this._overwrite) {
      if (this.cursorIndex < last.length - 1) {
        // ?
        this.cursorIndex++;
      } else {
      }
    }
  }

  decrCursor() {
    if (this.cursorIndex === 0) {
      if (this._overwrite) {
        this.cursorIndex = 0;
      } else {
        this.cursorIndex = null;
      }
    } else if (this.cursorIndex > 0) {
      this.cursorIndex--;
    }
  }

  nextCursorIndex() {
    const last = this.getLastHistory().groups;
    if (this.cursorIndex === null) {
      return 0;
    }
    if (this._overwrite) {
      if (this.cursorIndex < last.length + 1) {
        // ?
        return this.cursorIndex + 1;
      }
      return;
    }
    if (!this._overwrite) {
      if (this.cursorIndex < last.length) {
        return this.cursorIndex + 1;
      }
    }
  }

  getLastHistory() {
    const last = this.history[this.history.length - 1] || new HistoryState();
    return last;
  }

  addToHistory(historyItem) {
    if (this.history.length === this.maxHistory) {
      this.history.splice(0, 1);
    }
    this.history.push(historyItem);
  }

  // add new text to history
  updateHistory(key, options) {
    // console.log(this.cursorIndex);
    // get last history item
    const prevText = this.getLastHistory();

    // clone last state..
    const text = cloneDeep(prevText);

    let entryGroup;
    const entry = new Entry(key, {});
    if (this.paper) {
      entry.setStyles(this.paper.createEntryStyles(entry));
    }

    // Handle delete
    if (key === 'Backspace') {
      if (this._overwrite) {
        this.updateHistory('ArrowLeft', options);
        return;
      }
      if (this.cursorIndex === null) {
        return;
      }
      text.remove(this.cursorIndex);
      this.addToHistory(text);

      return;
    }

    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      this.addToHistory(text);
      return;
    }

    if (key.length === 1 || key === 'Enter') {
      // continue
    } else {
      // don't handle other keys (e.g shift/esc/ctrl)
      return;
    }

    // Handle ctrl, shift etc?

    // Add to history
    if (!this.getCurrentEntry()) {
      // console.log('is empy');
      // is empty
      entryGroup = new EntryGroup(entry);
      // console.log('nnn', this.nextCursorIndex());
      text.insert(entryGroup, this.nextCursorIndex());
      this.addToHistory(text);
    } else if (this._overwrite) {
      const n = this.nextCursorIndex();
      // console.log('nextov', n);
      // Add entry to group at current index
      entryGroup = text.groups[this.cursorIndex];
      if (entryGroup) {
        entryGroup.add(entry);
        text.replace(entryGroup, this.cursorIndex);
      } else {
        entryGroup = new EntryGroup(entry);
        text.insert(entryGroup, this.nextCursorIndex());
      }
      this.addToHistory(text);
    } else {
      // Insert entry in entrygroup at next index
      entryGroup = new EntryGroup(entry);
      const n = this.nextCursorIndex();
      // console.log('next', n);
      text.insert(entryGroup, this.nextCursorIndex());
      // if (this.cursorIndex === null) {
      //   text.insert(entryGroup, this.nextCursorIndex());
      // } else {
      //   text.insert(entryGroup, this.cursorIndex);
      // }

      this.addToHistory(text);
    }
  }

  updateRemovedHistory(key) {
    // you can't redo if you have add new letters

    if (this._overwrite) {
      if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Backspace') {
        return;
      }
      this.removedHistory = [];
    }
    if (!this._overwrite) {
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        return;
      }
      this.removedHistory = [];
    }
  }

  // update cursor and overwrite values
  updateCursor(key, overwrite) {
    const updateLastHistoryCursor = () => {
      const last = this.getLastHistory();
      // last.removeAllCursors();
      // // see below for fix required

      // if (last.groups.length && last.groups[this.cursorIndex]) {
      //   // console.log('item at index');
      //   last.groups[this.cursorIndex].cursor = true;

      //   if (overwrite) {
      //     if (
      //       key === 'ArrowLeft' ||
      //       key === 'ArrowRight' ||
      //       key === 'Backspace'
      //     ) {
      //       last.cursorMovement = true;
      //     }
      //     if (key.length === 1) {
      //       last.cursorMovement = false;
      //     }
      //   }
      //   if (!overwrite) {
      //     if (key === 'ArrowLeft' || key === 'ArrowRight') {
      //       last.cursorMovement = true;
      //     }
      //     if (key.length === 1) {
      //       last.cursorMovement = false;
      //     }
      //   }
      // } else {
      //   // // console.log('no item at index');
      //   // if (!overwrite) {
      //   //   //   this.updateCursor(key, overwrite);
      //   // }
      //   // //add extra space at end?
      //   // //FIX: currently adds too many
      //   // if (overwrite) {
      //   //   console.log('no', last.groups[this.cursorIndex - 1]);
      //   //   //nothing at cursor index
      //   //   //   last.insert(new EntryGroup(new Entry(' ', {})), this.cursorIndex);
      //   //   //   last.groups[this.cursorIndex].cursor = true;
      //   // }
      // }

      last.cursorIndex = this.cursorIndex;
    };

    const updateLastHistoryOverwrite = () => {
      const last = this.getLastHistory();
      last.overwrite = overwrite;
    };

    if (!overwrite) {
      if (key.length === 1 || key === 'Enter' || key === 'ArrowRight') {
        this.incrCursor();
      } else if (key === 'Backspace' || key === 'ArrowLeft') {
        this.decrCursor();
      } else {
        console.log('unhandled key - not moving cursor');
      }
    }

    if (overwrite) {
      if (key.length === 1 || key === 'ArrowRight' || key === 'Enter') {
        this.incrCursor();
      } else if (key === 'Backspace' || key === 'ArrowLeft') {
        this.decrCursor();
      } else {
        console.log("unhandled key or don't move cursor");
      }
    }

    updateLastHistoryCursor();
    updateLastHistoryOverwrite();
  }
  // sets cursor true in correct location of text
}

const init_editorHist = {
  groups: [
    {
      cursor: false,
      entries: [
        {
          key: 'h',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'e',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'l',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'l',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'o',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: ' ',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'l',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'o',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'r',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'e',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'm',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: ' ',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'i',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'p',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 's',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'u',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'm',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: ' ',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'b',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'l',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'a',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'h',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: ' ',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'b',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'l',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'a',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'h',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: ' ',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'b',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'i',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'n',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'g',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: ' ',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'o',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: ' ',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'b',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'a',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'n',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: 'g',
          styles: {},
        },
      ],
    },
    {
      cursor: false,
      entries: [
        {
          key: ' ',
          styles: {},
        },
      ],
    },
    {
      cursor: true,
      entries: [
        {
          key: 'o',
          styles: {},
        },
      ],
    },
  ],
  cursorMovement: false,
};
