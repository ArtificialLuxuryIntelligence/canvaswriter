export default class Paper {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.dimensions = { w: 300, h: 400 };
    this.fontRatio = 1;
    this.lineHeight = 1;
    this.letterSpacing = -0.34; //[-1,1]

    //hidden variables this.__blah to do
    this.padding = { x: 0, y: 0 };
    this.fontSize = 1;
    this.grid = {
      X: 1,
      y: 1,
    };

    this.init();
  }

  init() {
    this.setDimensions(600, 400);
    this.refreshCanvas();
    this.renderText(null, true);
    // this.refreshCanvas();
  }

  drawDots() {
    let { w, h } = this.dimensions;
    let width = w - this.padding.x * 2;
    let height = h - this.padding.y * 2;
    let lw = width / this.grid.x;
    // let lh = height / this.grid.y;

    for (let i = 0; i < this.grid.x; i++) {
      for (let j = 0; j < this.grid.y; j++) {
        let c1 = this.padding.x + (i * width) / (this.grid.x - 1);
        let c2 = this.padding.y + (j * height) / (this.grid.y - 1);

        if (i === 5 && j === 3) {
          this.drawLetter('l', lw, c1, c2);
        }
        if (i === 6 && j === 3) {
          this.drawLetter('y', lw, c1, c2);
        }
        this.ctx.beginPath();
        this.ctx.arc(c1, c2, lw / 2, 0, 2 * Math.PI);
        this.ctx.stroke();
      }
    }
  }

  drawLetter(letter, fontSize, x, y) {
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = `${fontSize}px monospace`;

    this.ctx.fillText(letter, x, y);
  }

  renderText(historyText, overwrite = false) {
    let { w, h } = this.dimensions;
    let width = w - this.padding.x * 2;
    let height = h - this.padding.y * 2;
    // let lw = width / this.grid.x;
    let lw = this.fontSize;
    console.log('lheight', lw);
    let lh = height / this.grid.y;

    let idx = 0;
    let cursorNext = false;
    let cursorRendered = false;

    if (!historyText) {
      console.log('ht', historyText);
      console.log();
      console.log('empty');
      let c1 = this.padding.x + (0 * width) / (this.grid.x - 1);
      let c2 = this.padding.y + (0 * height) / (this.grid.y - 1);
      this.drawLetter('_', lw, c1, c2);
      return;
    }
    let i, j;

    for (i = 0; i < this.grid.y; i++) {
      for (j = 0; j < this.grid.x; j++) {
        let group = historyText?.groups[idx];

        let c1 = this.padding.x + (j * width) / (this.grid.x - 1);
        let c2 = this.padding.y + (i * height) / (this.grid.y - 1);

        let entries = group?.entries;
        if (entries && entries.length) {
          entries.forEach((entry) => {
            if (entry.key.length === 1) {
              this.drawLetter(entry.key, lw, c1, c2);
            } else if (entry.key === 'Enter') {
              i++;
              j = -1;
            }
          });

          if (cursorNext) {
            this.drawLetter('_', lw, c1, c2);
            cursorRendered = true;
            cursorNext = false;
          }
          if (group.cursor) {
            if (overwrite) {
              this.drawLetter('_', lw, c1, c2);
              cursorRendered = true;
            } else {
              cursorNext = true;
            }
          }
        }

        if (!group && !cursorRendered) {
          this.drawLetter('_', lw, c1, c2);
          cursorRendered = true;

          break;
        }

        idx++;
      }
      let group = historyText?.groups[idx];

      if (!group) {
        // this.drawLetter('_', lw, c1, c2);
        break;
      }
    }

    if (!cursorRendered) {
      console.log('none', i, j);
      let c1 = this.padding.x + (j * width) / (this.grid.x - 1);
      let c2 = this.padding.y + (i * height) / (this.grid.y - 1);
      this.drawLetter('_', lw, c1, c2);
    }
  }

  //canvas dims
  setDimensions(w, h) {
    this.dimensions = { w, h };
  }
  setPadding(x, y) {
    this.padding = { x, y };
  }

  refreshCanvas() {
    // recallibarate all variables and repaint
    // if dimensions/lineheight/fontRatio changed

    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.heighth);
    this.canvas.width = this.dimensions.w;
    this.canvas.height = this.dimensions.h;
    this.setPadding(this.dimensions.w / 12, this.dimensions.h / 8);
    this.fontSize = (this.fontRatio * this.dimensions.h) / 10;
    this.grid = {
      x:
        this.dimensions.w /
        (this.letterSpacing * this.fontSize + this.fontSize),
      y: this.dimensions.h / (this.lineHeight * this.fontSize),
    };
  }
}
