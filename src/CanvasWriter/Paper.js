// Render a history state of editor

import { initAlphaNumStyles } from './alphaNumStyles';
import { clamp, getRandomArbitrary, hex2rgba } from '../helpers';
import { paperDefaults } from '../defaultPresets';

export default class Paper {
  // probably shouldn't mix _ and # but the _values are exposed thru getters...

  #grid = {
    X: 1,
    y: 1,
  };

  #ANStyles = initAlphaNumStyles({ broken: this._broken });
  #padding = { x: 0, y: 0 }; //maybe make accessible
  #fontSize = 1;

  constructor(canvas, presets = {}) {
    const options = Object.assign(paperDefaults, presets);

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this._dimensions = options.dimensions;
    this._lineHeight = options.lineHeight;
    this._letterSpacing = options.letterSpacing;
    this._fontRatio = options.fontRatio;
    this._broken = options.broken;
    this._fontColor = options.fontColor;
    this.randomOpacity = options.randomOpacity;
    this.pageColor = options.pageColor;
    this.init_paper();
  }

  init_paper() {
    this.#ANStyles = initAlphaNumStyles({ broken: this._broken });
    this.refreshCanvas();

    this.renderText(null, true);
    // this.refreshCanvas();
  }
  // Exposed variables (controls) --------------------------------------------

  get lineHeight() {
    return this._lineHeight;
  }
  get letterSpacing() {
    return this._letterSpacing;
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

  // ---End exposed variables

  // Exposed methods --------------------------------------------

  //renders monospace text
  // renderText(historyText, overwrite = false) {
  //   let { w, h } = this._dimensions;
  //   let width = w - this.#padding.x * 2;
  //   let height = h - this.#padding.y * 2;
  //   // let lw = width / this.#grid.x;
  //   let lw = this.#fontSize;

  //   let idx = 0;
  //   let cursorNext = false;
  //   let cursorRendered = false;

  //   if (!historyText) {
  //     let c1 = this.#padding.x + (0 * width) / this.#grid.x;
  //     let c2 = this.#padding.y + (0 * height) / this.#grid.y;
  //     this.drawLetter('_', c1, c2);
  //     return;
  //   }

  //   if (historyText.cursorIndex === null) {
  //     let c1 = this.#padding.x + (0 * width) / this.#grid.x;
  //     let c2 = this.#padding.y + (0 * height) / this.#grid.y;
  //     this.drawLetter('_', c1, c2);
  //     cursorRendered = true;
  //   }

  //   let i, j;

  //   //TODO add layers?
  //   // do the below loop once for every layer -starting from bottom?
  //   // add layer:1 to styles
  //   // if layer ===currentl layer then render it..

  //   for (i = 0; i < this.#grid.y; i++) {
  //     for (j = 0; j < this.#grid.x; j++) {
  //       let group = historyText?.groups[idx];

  //       let c1 = this.#padding.x + (j * width) / this.#grid.x;
  //       let c2 = this.#padding.y + (i * height) / this.#grid.y;

  //       //debug

  //       // this.ctx.beginPath();
  //       // this.ctx.arc(c1, c2, 20 / 2, 0, 2 * Math.PI);
  //       // this.ctx.stroke();

  //       //

  //       let entries = group?.entries;
  //       if (entries && entries.length) {
  //         entries.forEach((entry) => {
  //           if (entry.key.length === 1) {
  //             //is a single character
  //             this.drawLetter(
  //               entry.key,
  //               c1,
  //               c2,
  //               entry.styles,
  //               entry.editedStyles
  //             );
  //           } else if (entry.key === 'Enter') {
  //             i++;
  //             j = -1;
  //           }
  //         });

  //         if (cursorNext) {
  //           this.drawLetter('_', c1, c2);
  //           cursorRendered = true;
  //           cursorNext = false;
  //         }

  //         //TODO - dont' use group.cursor, use historyText.cursorIndex (then remove group.cursor everywhere..)

  //         // if (historyText.cursorIndex === idx) {
  //         //   this.drawLetter('_', c1, c2);
  //         //   cursorRendered = true;
  //         // }
  //         if (historyText.cursorIndex === idx) {
  //           if (overwrite) {
  //             this.drawLetter('_', c1, c2);
  //             cursorRendered = true;
  //           } else {
  //             //non-overwrite: render cursor at next positiondd
  //             cursorNext = true;
  //           }
  //         }
  //       }

  //       if (!group && !cursorRendered) {
  //         this.drawLetter('_', c1, c2);
  //         cursorRendered = true;
  //         break;
  //       }

  //       idx++;
  //     }
  //     let group = historyText?.groups[idx];

  //     if (!group) {
  //       //stops loop from continuing to end if no more letters
  //       //bug: doesn't put cursor on next line => removed break
  //       // break;
  //     }
  //   }

  //   // if (!cursorRendered) {
  //   //   // if()
  //   //   let c1 = this.#padding.x + (j * width) / (this.#grid.x);
  //   //   let c2 = this.#padding.y + (i * height) / (this.#grid.y);
  //   //   this.drawLetter('_', c1, c2);
  //   // }
  // }

  //TODO: renders non monospace texts
  // requires the canvas method to calc letter widths etc
  // can have drawletter function return the calc width of the letter?

  renderText(historyText, overwrite = false) {
    let { w, h } = this._dimensions;
    let width = w - this.#padding.x * 2;
    let height = h - this.#padding.y * 2;
    // let lw = width / this.#grid.x;
    let lw = this.#fontSize;

    let idx = 0;
    let cursorNext = false;
    let cursorRendered = false;

    let addedWidth = 0;

    if (!historyText) {
      let c1 = this.#padding.x + (0 * width) / this.#grid.x;
      let c2 = this.#padding.y + (0 * height) / this.#grid.y;
      this.drawLetter('_', c1, c2);
      return;
    }

    //unused?
    if (historyText.cursorIndex === null) {
      let c1 = this.#padding.x + (0 * width) / this.#grid.x;
      let c2 = this.#padding.y + (0 * height) / this.#grid.y;
      this.drawLetter('_', c1, c2);
      cursorRendered = true;
      // return;
    }

    let i;

    for (i = 0; i < this.#grid.y; i++) {
      let group = historyText?.groups[idx];
      if (!group && !cursorRendered) {
        let c1 = this.#padding.x + (0 * width) / this.#grid.x;
        let c2 = this.#padding.y + (i * height) / this.#grid.y;
        this.drawLetter('_', c1, c2);
        return;
      }
      // if (i >= 1) {
      //   //skip first loop to allow for above cursors
      let addedWidth = 0;
      // }
      // while (addedWidth < 100) {
      while (addedWidth < width) {
        if (idx > historyText.groups.length) {
          break;
        }
        let group = historyText?.groups[idx];

        // console.log('Loop', idx, addedWidth, group);

        let c1 = this.#padding.x + addedWidth;
        let c2 = this.#padding.y + (i * height) / this.#grid.y;

        //debug

        // this.ctx.beginPath();
        // this.ctx.arc(c1, c2, 20 / 2, 0, 2 * Math.PI);
        // this.ctx.fillStyle = 'tomato';
        // this.ctx.fill();

        //

        let entries = group?.entries;
        if (entries && entries.length) {
          let groupAddedWidth = 0;
          entries.forEach((entry) => {
            if (entry.key.length === 1) {
              //is a single character
              let l = this.drawLetter(
                entry.key,
                c1,
                c2,
                entry.styles,
                entry.editedStyles
              );
              if (l.width > groupAddedWidth) {
                groupAddedWidth = l.width;
              }
            } else if (entry.key === 'Enter') {
              i++;
              addedWidth = 0;
            }
          });
          addedWidth += groupAddedWidth * this.letterSpacing;

          if (cursorNext) {
            let l = this.drawLetter('_', c1, c2);
            // addedWidth += l.width;
            cursorRendered = true;
            cursorNext = false;
          }

          if (historyText.cursorIndex === idx) {
            if (overwrite) {
              let l = this.drawLetter('_', c1, c2);
              // addedWidth += l.width;
              cursorRendered = true;
            } else {
              //non-overwrite: render cursor at next positiondd
              cursorNext = true;
            }
          }

          if (!group && !cursorRendered) {
            let l = this.drawLetter('_', c1, c2);
            // addedWidth += l.width * this.letterSpacing;
            cursorRendered = true;
            console.log('breaking');

            // break;
          }
          if (!group) {
            idx++;

            // break;
          }
        }

        if (!group && !cursorRendered) {
          this.drawLetter('_', c1, c2);
          cursorRendered = true;
          break;
        }

        idx++;
        // console.log('end');
        // break;
      }
    }
  }

  refreshCanvas() {
    // recallibarate all variables and repaint
    // called by most setters (like a react dep array kinda thing)

    this.canvas.width = this._dimensions.w;
    this.canvas.height = this._dimensions.h;
    // console.log(this.canvas.clientHeight);
    // this.canvas.width =
    //   this.canvas.height * (this.canvas.clientWidth / this.canvas.clientHeight);

    this.#fontSize = (this._fontRatio * this._dimensions.w) / 20;
    // this.setPadding(this.#fontSize, this.#fontSize);

    let clampedPaddingX = clamp(
      this.#fontSize / 3,
      this._dimensions.w / 12,
      this._dimensions.w / 10
    );

    this.setPadding(clampedPaddingX, this.#fontSize);

    this.#grid = {
      x:
        (this._dimensions.w - 2 * this.#padding.x) /
        (this._letterSpacing * this.#fontSize),
      y:
        (this._dimensions.h - 2 * this.#padding.y) /
        (this._lineHeight * this.#fontSize),
      // y: this._dimensions.h / this.#fontSize,
    };

    // this.ctx.clearRect(0, 0, this._dimensions.width, this._dimensions.heighth);
    this.ctx.fillStyle = this.pageColor;
    this.ctx.fillRect(0, 0, this._dimensions.w, this._dimensions.h);
  }

  // ---End exposed methods --------------------------------------------

  drawLetter(letter, x, y, styles, editedStyles) {
    // this.ctx.textAlign = 'center'; //NOTE only for MONO [not even needed there becaus letters already centred]

    this.ctx.textBaseline = 'middle';
    // this.ctx.font = `${this.#fontSize}px JetBrains Mono`;
    this.ctx.font = `${this.#fontSize}px Roboto Mono`;
    // this.ctx.font = `${this.#fontSize}px Ariel`; //non mono test font

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
        // color = this._fontColor,
        color = styles.color,
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
      return this.ctx.measureText(letter);
    } else {
      // this.ctx.font = `${this.#fontSize}px serif`;

      this.ctx.fillText(letter, x, y);
      return this.ctx.measureText(letter);
    }

    //restore (ctx.restore /save is more CPU intensive apparently)
  }

  createEntryStyles(entry) {
    let a;
    if (this.randomOpacity) {
      a = getRandomArbitrary(0.6, 0.96);
    } else {
      a = 1;
    }
    return {
      ...this.getANStyles(entry.key),
      color: this.fontColor,
      opacity: a,
    };
  }

  updateEntryStyles(entry) {
    //update the color
    return {
      ...entry.styles,
      // color: this.fontColor,
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
        let c1 = this.#padding.x + (i * width) / this.#grid.x;
        let c2 = this.#padding.y + (j * height) / this.#grid.y;

        // if (i === 5 && j === 3) {
        //   this.drawLetter('l', c1, c2);
        // }
        // if (i === 6 && j === 3) {
        //   this.drawLetter('y', c1, c2);
        // }
        this.ctx.beginPath();
        this.ctx.arc(c1, c2, lw / 2, 0, 2 * Math.PI);
        this.ctx.stroke();
      }
    }
  }
}
