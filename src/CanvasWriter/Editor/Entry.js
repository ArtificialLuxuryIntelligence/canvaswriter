export default class Entry {
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
