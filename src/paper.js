// Render a history state of editor

import { clamp } from './helpers';

const testStyles = { scale: 1.5, rotation: 20, x: 2, y: 0 };

export default class Paper {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.dimensions = { w: 300, h: 400 };
    this._fontRatio = 1;
    this._lineHeight = 1;
    this._letterSpacing = 0.5; //[0,1]

    //hidden variables this.__blah to do
    this.padding = { x: 0, y: 0 }; //maybe make accessible
    this.fontSize = 1;
    this.grid = {
      X: 1,
      y: 1,
    };

    this.init();
  }

  init() {
    this.setDimensions(1200, 800);
    this.refreshCanvas();
    this.renderText(null, true);
    // this.refreshCanvas();
  }

  get lineHeight() {
    return this._lineHeight;
  }
  get letterSpacing() {
    return this.__letterSpacing;
  }
  get fontRatio() {
    return this._fontRatio;
  }

  set lineHeight(val) {
    this._lineHeight = val;
    this.refreshCanvas();
  }
  set letterSpacing(val) {
    this._letterSpacing = val;
    this.refreshCanvas();
  }
  set fontRatio(val) {
    this._fontRatio = val;
    this.refreshCanvas();
  }

  drawLetter(letter, fontSize, x, y, styles) {
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = `${fontSize}px monospace`;
    if (styles) {
      const { scale, x: posX, y: posY, rotation: rot } = styles;
      let scaleX = scale;
      let scaleY = scale;

      // this.ctx.translate(x, y);
      this.ctx.setTransform(scaleX, 0, 0, scaleY, x + posX, y + posY); // scale and translate in one call
      this.ctx.rotate((rot * Math.PI) / 180);

      this.ctx.fillText(letter, 0, 0);

      this.ctx.rotate((-rot * Math.PI) / 180);
      this.ctx.setTransform(1, 0, 0, 1, 1, 1); // scale and translate in one call
      // this.ctx.translate(-x, -y);
    } else {
      this.ctx.fillText(letter, x, y);
    }

    //restore (ctx.restore /save is more CPU intensive apparently)
  }

  renderText(historyText, overwrite = false) {
    let { w, h } = this.dimensions;
    let width = w - this.padding.x * 2;
    let height = h - this.padding.y * 2;
    // let lw = width / this.grid.x;
    let lw = this.fontSize;

    let idx = 0;
    let cursorNext = false;
    let cursorRendered = false;

    if (!historyText) {
      console.log('no text');
      let c1 = this.padding.x + (0 * width) / (this.grid.x - 1);
      let c2 = this.padding.y + (0 * height) / (this.grid.y - 1);
      this.drawLetter('_', lw, c1, c2);
      return;
    }

    if (historyText.cursorIndex === null) {
      console.log('no text');
      let c1 = this.padding.x + (0 * width) / (this.grid.x - 1);
      let c2 = this.padding.y + (0 * height) / (this.grid.y - 1);
      this.drawLetter('_', lw, c1, c2);
      cursorRendered = true;
    }

    let i, j;

    for (i = 0; i < this.grid.y; i++) {
      for (j = 0; j < this.grid.x - 1; j++) {
        let group = historyText?.groups[idx];

        let c1 = this.padding.x + (j * width) / (this.grid.x - 1);
        let c2 = this.padding.y + (i * height) / (this.grid.y - 1);

        //debug

        // this.ctx.beginPath();
        // this.ctx.arc(c1, c2, 20 / 2, 0, 2 * Math.PI);
        // this.ctx.stroke();

        //

        let entries = group?.entries;
        if (entries && entries.length) {
          entries.forEach((entry) => {
            if (entry.key.length === 1) {
              this.drawLetter(
                entry.key,
                lw,
                c1,
                c2,
                entry.key === 'a' ? testStyles : false
              );
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
              //non-overwrite: render cursor at next positiondd
              cursorNext = true;
            }
          }
        }

        if (!group && !cursorRendered) {
          console.log('end cursor');
          console.log(historyText);
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

    // if (!cursorRendered) {
    //   // if()
    //   let c1 = this.padding.x + (j * width) / (this.grid.x - 1);
    //   let c2 = this.padding.y + (i * height) / (this.grid.y - 1);
    //   this.drawLetter('_', lw, c1, c2);
    // }
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

    this.fontSize = (this._fontRatio * this.dimensions.h) / 10;
    this.setPadding(this.fontSize, this.fontSize);

    let clampedPaddingX = clamp(
      this.fontSize / 2,
      this.dimensions.w / 14,
      this.dimensions.w / 10
    );
    console.log(
      clampedPaddingX,
      this.fontSize,
      this.dimensions.w / 14,
      this.dimensions.w / 10
    );

    this.setPadding(clampedPaddingX, this.fontSize);

    this.grid = {
      x:
        (this.dimensions.w - 2 * this.padding.x) /
        (this._letterSpacing * this.fontSize),
      y: this.dimensions.h / (this._lineHeight * this.fontSize),
    };
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
}
