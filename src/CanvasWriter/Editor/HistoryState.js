export default class HistoryState {
  constructor() {
    this.groups = [];
    this.cursorMovement = false;
    this.cursorIndex = null;
    this._overwrite = null;
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

 
}
