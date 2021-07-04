// Render a history state of editor

import { initAlphaNumStyles } from './alphaNumStyles';
import { clamp, getRandomArbitrary, hex2rgba } from './helpers';

const testStyles = { scale: 1.2, rotation: 20, x: 0.1, y: -0.2 };

export default class Paper {
  // probably shouldn't mix _ and # but the _values are exposed thru getters...

  #grid = {
    X: 1,
    y: 1,
  };

  #ANStyles = initAlphaNumStyles({ broken: this._broken });
  #padding = { x: 0, y: 0 }; //maybe make accessible
  #fontSize = 1;

  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');

    this._dimensions = { w: 300, h: 400 };
    this._lineHeight = 1;
    this._letterSpacing = 0.5; //[0,1]
    this._fontRatio = 1;
    this._broken = 0.2;
    this._fontColor = '#500000';

    this.randomOpacity = true;

    //internals [use #?]

    this.init();
  }

  init() {
    this.setDimensions(1200, 800);
    this.refreshCanvas();
    this.#ANStyles = initAlphaNumStyles({ broken: this._broken });

    this.renderText(null, true);
    // this.refreshCanvas();
  }
  // Exposed variables (controls) --------------------------------------------

  get lineHeight() {
    return this._lineHeight;
  }
  get letterSpacing() {
    return this.__letterSpacing;
  }
  get fontRatio() {
    return this._fontRatio;
  }
  get broken() {
    return this._broken;
  }

  get dimensions() {
    return this._dimensions;
  }

  get fontColor() {
    return this._fontColor;
  }

  /**
   * @param {number} val
   */
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
  set broken(val) {
    this._broken = val;
    this.#ANStyles = initAlphaNumStyles({ broken: this._broken });
    this.refreshCanvas();
  }

  set fontColor(val) {
    this._fontColor = val;
    this.refreshCanvas();
  }

  getANStyles(key) {
    return this.#ANStyles[key];
  }
  setDimensions(w, h) {
    this._dimensions = { w, h };
  }
  setPadding(x, y) {
    this.#padding = { x, y };
  }

  // set dimensions(val) {
  //   this._dimensions = val;
  //   this.refreshCanvas();
  // }

  // ---End exposed variables

  // Exposed methods --------------------------------------------

  renderText(historyText, overwrite = false) {
    let { w, h } = this._dimensions;
    let width = w - this.#padding.x * 2;
    let height = h - this.#padding.y * 2;
    // let lw = width / this.#grid.x;
    let lw = this.#fontSize;

    let idx = 0;
    let cursorNext = false;
    let cursorRendered = false;

    if (!historyText) {
      let c1 = this.#padding.x + (0 * width) / (this.#grid.x - 1);
      let c2 = this.#padding.y + (0 * height) / (this.#grid.y - 1);
      this.drawLetter('_', c1, c2);
      return;
    }

    if (historyText.cursorIndex === null) {
      let c1 = this.#padding.x + (0 * width) / (this.#grid.x - 1);
      let c2 = this.#padding.y + (0 * height) / (this.#grid.y - 1);
      this.drawLetter('_', c1, c2);
      cursorRendered = true;
    }

    let i, j;

    for (i = 0; i < this.#grid.y; i++) {
      for (j = 0; j < this.#grid.x - 1; j++) {
        let group = historyText?.groups[idx];

        let c1 = this.#padding.x + (j * width) / (this.#grid.x - 1);
        let c2 = this.#padding.y + (i * height) / (this.#grid.y - 1);

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

                c1,
                c2,
                entry.styles,
                entry.editedStyles
              );
            } else if (entry.key === 'Enter') {
              i++;
              j = -1;
            }
          });

          if (cursorNext) {
            this.drawLetter('_', c1, c2);
            cursorRendered = true;
            cursorNext = false;
          }
          if (group.cursor) {
            if (overwrite) {
              this.drawLetter('_', c1, c2);
              cursorRendered = true;
            } else {
              //non-overwrite: render cursor at next positiondd
              cursorNext = true;
            }
          }
        }

        if (!group && !cursorRendered) {
          this.drawLetter('_', c1, c2);
          cursorRendered = true;

          break;
        }

        idx++;
      }
      let group = historyText?.groups[idx];

      if (!group) {
        // this.drawLetter('_', c1, c2);
        break;
      }
    }

    // if (!cursorRendered) {
    //   // if()
    //   let c1 = this.#padding.x + (j * width) / (this.#grid.x - 1);
    //   let c2 = this.#padding.y + (i * height) / (this.#grid.y - 1);
    //   this.drawLetter('_', c1, c2);
    // }
  }
  refreshCanvas() {
    // recallibarate all variables and repaint
    // called by most setters (like a react dep array kinda thing)

    this.ctx.clearRect(0, 0, this._dimensions.width, this._dimensions.heighth);
    this.canvas.width = this._dimensions.w;
    this.canvas.height = this._dimensions.h;

    this.#fontSize = (this._fontRatio * this._dimensions.h) / 10;
    this.setPadding(this.#fontSize, this.#fontSize);

    let clampedPaddingX = clamp(
      this.#fontSize / 2,
      this._dimensions.w / 14,
      this._dimensions.w / 10
    );

    this.setPadding(clampedPaddingX, this.#fontSize);

    this.#grid = {
      x:
        (this._dimensions.w - 2 * this.#padding.x) /
        (this._letterSpacing * this.#fontSize),
      y: this._dimensions.h / (this._lineHeight * this.#fontSize),
    };
  }

  // ---End exposed methods --------------------------------------------

  drawLetter(letter, x, y, styles, editedStyles) {
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    // this.ctx.font = `${this.#fontSize}px JetBrains Mono`;
    this.ctx.font = `${this.#fontSize}px Roboto Mono`;

    this.ctx.fillStyle = this._fontColor;

    let letterStyles;

    let ANStyles = this.getANStyles(letter);
    if (editedStyles) {
      //custom styles
      letterStyles = styles;
    } else if (ANStyles) {
      //random typewriter styles
      letterStyles = ANStyles;
    }

    if (letterStyles) {
      const {
        scale,
        x: posX,
        y: posY,
        rotation: rot,
        color = this._fontColor,
        opacity = styles.opacity,
      } = letterStyles;
      let scaleX = scale;
      let scaleY = scale;

      //color
      let col;
      col = hex2rgba(color, opacity);

      this.ctx.fillStyle = col;

      //transforms
      this.ctx.setTransform(
        scaleX,
        0,
        0,
        scaleY,
        x + posX * this.#fontSize,
        y + posY * this.#fontSize
      ); // scale and translate in one call
      this.ctx.rotate((rot * Math.PI) / 180);
      this.ctx.fillText(letter, 0, 0);

      //undo transforms
      this.ctx.rotate((-rot * Math.PI) / 180);
      this.ctx.setTransform(1, 0, 0, 1, 1, 1); // scale and translate in one call
    } else {
      this.ctx.fillText(letter, x, y);
    }

    //restore (ctx.restore /save is more CPU intensive apparently)
  }

  createEntryStyles(entry) {
    let a;
    if (this.randomOpacity) {
      a = getRandomArbitrary(0.5, 0.8);
    } else {
      a = 1;
    }
    return {
      ...this.getANStyles(entry.key),
      color: this.fontColor,
      opacity: a,
    };
  }

  // Debug
  drawDots() {
    let { w, h } = this._dimensions;
    let width = w - this.#padding.x * 2;
    let height = h - this.#padding.y * 2;
    let lw = width / this.#grid.x;
    // let lh = height / this.#grid.y;

    for (let i = 0; i < this.#grid.x; i++) {
      for (let j = 0; j < this.#grid.y; j++) {
        let c1 = this.#padding.x + (i * width) / (this.#grid.x - 1);
        let c2 = this.#padding.y + (j * height) / (this.#grid.y - 1);

        if (i === 5 && j === 3) {
          this.drawLetter('l', c1, c2);
        }
        if (i === 6 && j === 3) {
          this.drawLetter('y', c1, c2);
        }
        this.ctx.beginPath();
        this.ctx.arc(c1, c2, lw / 2, 0, 2 * Math.PI);
        this.ctx.stroke();
      }
    }
  }
}
