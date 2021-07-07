export default class EntryGroup {
  constructor(Entry = null) {
    // this.cursor = false; // default false
    this.entries = Entry ? [Entry] : [];
  }

  add(Entry) {
    this.entries = [...this.entries, Entry];
  }

  getLastEntry() {
    return this.entries.slice(-1)[0];
  }
}
