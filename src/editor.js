// Text

export default class Editor {
  constructor() {
    this.cursorIndex = 0;
    this.history = [];
    this.removedHistory = []; //undo functionality
    this.init();
    //options
    this.overwrite = false;
  }

  init() {}

  //Handle adding entries
  handleKeyInput(key, options = {}) {
    this.updateHistory(key, options);
    this.updateCursor(key, this.overwrite);

    //
  }
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

  //Handle history
  getLastHistory() {
    let last = this.history[this.history.length - 1] || new HistoryState();

    return last;
  }
  removeLastHistory() {
    let removed = this.history.pop();
    this.removeLastHistory.push(removed);
  }
  restoreRemovedHistory() {
    let last = this.removedHistory.unshift();
    this.history.push(last);
  }

  // add new text to history
  updateHistory(key, options) {
    //get last history item
    let text = this.getLastHistory();
    let entryGroup;
    let entry = new Entry(key, {});

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
        this.history.push(text);
      }
      return;
    }

    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      this.history.push(text);
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
      this.history.push(text);
      return;
    } else {
      if (this.overwrite) {
        // Add entry to group at current index
        entryGroup = text.groups[this.cursorIndex];
        if (entryGroup) {
          entryGroup.add(entry);
          text.replace(entryGroup, this.cursorIndex);
        } else {
          entryGroup = new EntryGroup(entry);
          text.insert(entryGroup, this.cursorIndex + 1);
        }
        this.history.push(text);
      } else {
        // Insert entry in entrygroup at next index
        entryGroup = new EntryGroup(entry);
        text.insert(entryGroup, this.cursorIndex + 1);
        this.history.push(text);
      }
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
    const { styles = {} } = options;
    this.key = key;
    this.styles = styles;
  }

  addStyle(key, val) {
    this.styles = { ...this.styles, [key]: val };
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
}

class HistoryState {
  constructor(EntryGroups = []) {
    this.groups = EntryGroups;
    this.cursorMovement = false;
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
