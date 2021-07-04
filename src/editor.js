// Text

import { clone } from './helpers';
import cloneDeep from 'lodash.clonedeep';

export default class Editor {
  constructor() {
    this.paper = null;
    this.cursorIndex = 0;
    this.history = [];
    this.removedHistory = []; //undo functionality
    //options
    this.overwrite = false;
    this.maxHistory = 100;
    this.init();
  }

  init() {}

  // Exposed methods --------------------------------------------

  connect(paper) {
    this.paper = paper;
  }
  //Handle adding entries
  handleKeyInput(key, options = {}) {
    this.updateHistory(key, options);
    this.updateRemovedHistory(key);
    this.updateCursor(key, this.overwrite);

    //
  }
  undo() {
    //TODO: set the cursor index in the Editor...
    let history = [...this.history];

    if (history.length >= 1) {
      let removed = history.pop();

      this.history = history;

      if (removed) {
        this.removedHistory.push(removed);
        this.cursorIndex = removed.cursorIndex;
      }
    }
  }
  redo() {
    let removedHistory = [...this.removedHistory];
    let removed = removedHistory.pop();
    this.removedHistory = removedHistory;
    if (removed) {
      this.addToHistory(removed);
      this.cursorIndex = removed.cursorIndex;
    }
  }
  getCurrentEntry() {
    if (this.overwrite) {
      return this.getEntry(this.cursorIndex);
    } else {
      return this.getEntry(this.nextCursorIndex());
    }
  }
  getEntry(index) {
    //returns top letter of stack in top history entry
    // NOTE: if there is a paper instance connected, then it will also load in the style of that letter

    let last = this.getLastHistory();
    let group = last.groups[index];
    let entry = group?.getLastEntry();

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
  //Handle cursor movement
  incrCursor() {
    let last = this.getLastHistory().groups;
    if (this.cursorIndex === null) {
      this.cursorIndex = 0;
      return;
    }
    if (this.overwrite) {
      if (this.cursorIndex < last.length) {
        //?
        this.cursorIndex++;
      } else {
        return;
      }
    }
    if (!this.overwrite) {
      if (this.cursorIndex < last.length - 1) {
        //?
        this.cursorIndex++;
      } else {
        return;
      }
    }
  }
  decrCursor() {
    if (this.cursorIndex === 0) {
      if (this.overwrite) {
        this.cursorIndex = 0;
      } else {
        this.cursorIndex = null;
      }
    } else if (this.cursorIndex > 0) {
      this.cursorIndex--;
    }
  }

  nextCursorIndex() {
    let last = this.getLastHistory().groups;
    if (this.cursorIndex === null) {
      return 0;
    }
    if (this.overwrite) {
      if (this.cursorIndex < last.length) {
        //?
        return this.cursorIndex + 1;
      } else {
        return;
      }
    }
    if (!this.overwrite) {
      if (this.cursorIndex < last.length - 1) {
        //?
        return this.cursorIndex + 1;
      } else {
        return;
      }
    }
  }

  getLastHistory() {
    let last = this.history[this.history.length - 1] || new HistoryState();
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
    //get last history item
    let prevText = this.getLastHistory();

    //clone last state..
    let text = cloneDeep(prevText);
    // let text = Object.assign({}, prevText);
    // Object.setPrototypeOf(text, HistoryState.prototype);

    let entryGroup;
    let entry = new Entry(key, {});
    if (this.paper) {
      entry.setStyles(this.paper.createEntryStyles(entry));
    }

    // Handle delete
    if (key === 'Backspace') {
      if (this.overwrite) {
        this.updateHistory('ArrowLeft', options);
        return;
      } else {
        if (this.cursorIndex === null) {
          return;
        }
        text.remove(this.cursorIndex);
        this.addToHistory(text);
      }
      return;
    }

    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      this.addToHistory(text);
      return;
    }

    if (key.length === 1 || key === 'Enter') {
      // continue
    } else {
      //don't handle other keys (e.g shift/esc/ctrl)
      return;
    }

    //Handle ctrl, shift etc?

    // Add to history
    if (!text.groups.length) {
      // is empty
      entryGroup = new EntryGroup(entry);
      text.insert(entryGroup, 0);
      this.addToHistory(text);
      return;
    } else {
      if (this.overwrite) {
        // Add entry to group at current index
        entryGroup = text.groups[this.cursorIndex];
        if (entryGroup) {
          console.log(entryGroup);
          entryGroup.add(entry);
          text.replace(entryGroup, this.cursorIndex);
        } else {
          entryGroup = new EntryGroup(entry);
          text.insert(entryGroup, this.cursorIndex + 1);
        }
        this.addToHistory(text);
      } else {
        // Insert entry in entrygroup at next index
        entryGroup = new EntryGroup(entry);
        text.insert(entryGroup, this.cursorIndex + 1);
        this.addToHistory(text);
      }
    }
  }
  updateRemovedHistory(key) {
    // you can't redo if you have add new letters

    if (this.overwrite) {
      if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Backspace') {
        return;
      }
      this.removedHistory = [];
    }
    if (!this.overwrite) {
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        return;
      }
      this.removedHistory = [];
    }
  }
  // update cursor valuesa
  updateCursor(key, overwrite) {
    const updateLastHistoryCursor = () => {
      let last = this.getLastHistory();
      last.removeAllCursors();
      //see below for fix required

      if (last.groups.length && last.groups[this.cursorIndex]) {
        // console.log('item at index');
        last.groups[this.cursorIndex].cursor = true;

        if (overwrite) {
          if (
            key === 'ArrowLeft' ||
            key === 'ArrowRight' ||
            key === 'Backspace'
          ) {
            last.cursorMovement = true;
          }
          if (key.length === 1) {
            last.cursorMovement = false;
          }
        }
        if (!overwrite) {
          if (key === 'ArrowLeft' || key === 'ArrowRight') {
            last.cursorMovement = true;
          }
          if (key.length === 1) {
            last.cursorMovement = false;
          }
        }
      } else {
        // // console.log('no item at index');
        // if (!overwrite) {
        //   //   this.updateCursor(key, overwrite);
        // }
        // //add extra space at end?
        // //FIX: currently adds too many
        // if (overwrite) {
        //   console.log('no', last.groups[this.cursorIndex - 1]);
        //   //nothing at cursor index
        //   //   last.insert(new EntryGroup(new Entry(' ', {})), this.cursorIndex);
        //   //   last.groups[this.cursorIndex].cursor = true;
        // }
      }

      last.cursorIndex = this.cursorIndex;
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
  }
  //sets cursor true in correct location of text
}

class Entry {
  constructor(key, options) {
    const { styles = null } = options;
    this.key = key;
    this.styles = styles;
    this.editedStyles = false;
  }

  setStyles(styles) {
    this.styles = styles;
  }
  editStyle(key, val) {
    this.styles = { ...this.styles, [key]: val };
    this.editedStyles = true;
  }
}

class EntryGroup {
  constructor(Entry = null) {
    this.cursor = false; //default false
    this.entries = Entry ? [Entry] : [];
  }

  add(Entry) {
    this.entries = [...this.entries, Entry];
  }
  getLastEntry() {
    return this.entries.slice(-1)[0];
  }
}

class HistoryState {
  constructor(EntryGroups = []) {
    this.groups = EntryGroups;
    this.cursorMovement = false;
    this.cursorIndex = null;
  }

  add(Group) {
    this.groups = [...this.groups, Group];
  }

  insert(Group, index) {
    // console.log("insert index", index);
    this.groups.splice(index, 0, Group);
  }
  replace(Group, index) {
    // console.log("insert index", index);
    this.groups.splice(index, 1, Group);
  }
  remove(index) {
    this.groups.splice(index, 1);
  }
  removeAllCursors() {
    this.groups = this.groups.map((eg) => {
      eg.cursor = false;
      return eg;
    });
  }
}

const initHist = {
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
