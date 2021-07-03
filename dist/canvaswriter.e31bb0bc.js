// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../.nvm/versions/node/v12.16.3/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../.nvm/versions/node/v12.16.3/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../.nvm/versions/node/v12.16.3/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../.nvm/versions/node/v12.16.3/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/editor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Editor = /*#__PURE__*/function () {
  function Editor() {
    _classCallCheck(this, Editor);

    this.cursorIndex = 0;
    this.history = [];
    this.removedHistory = []; //undo functionality

    this.init(); //options

    this.overwrite = false;
  }

  _createClass(Editor, [{
    key: "init",
    value: function init() {} //Handle adding entries

  }, {
    key: "handleKeyInput",
    value: function handleKeyInput(key) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.updateHistory(key, options);
      this.updateCursor(key, this.overwrite); //
    } //Handle cursor movement

  }, {
    key: "incrCursor",
    value: function incrCursor() {
      var last = this.getLastHistory().groups;

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
  }, {
    key: "decrCursor",
    value: function decrCursor() {
      if (this.cursorIndex === 0) {
        if (this.overwrite) {
          this.cursorIndex = 0;
        } else {
          this.cursorIndex = null;
        }
      } else if (this.cursorIndex > 0) {
        this.cursorIndex--;
      }
    } //Handle history

  }, {
    key: "getLastHistory",
    value: function getLastHistory() {
      var last = this.history[this.history.length - 1] || new HistoryText();
      return last;
    }
  }, {
    key: "removeLastHistory",
    value: function removeLastHistory() {
      var removed = this.history.pop();
      this.removeLastHistory.push(removed);
    }
  }, {
    key: "restoreRemovedHistory",
    value: function restoreRemovedHistory() {
      var last = this.removedHistory.unshift();
      this.history.push(last);
    } // add new text to history

  }, {
    key: "updateHistory",
    value: function updateHistory(key, options) {
      //get last history item
      var text = this.getLastHistory();
      var entryGroup;
      var entry = new Entry(key, {}); // Handle delete

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

      if (key.length === 1 || key === 'Enter') {// continue
      } else {
        //don't handle other keys (e.g shift/esc/ctrl)
        return;
      } //Handle ctrl, shift etc?
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
    } // update cursor valuesa

  }, {
    key: "updateCursor",
    value: function updateCursor(key, overwrite) {
      var _this = this;

      var updateLastHistoryCursor = function updateLastHistoryCursor() {
        var last = _this.getLastHistory();

        last.removeAllCursors(); //see below for fix required

        if (last.groups.length && last.groups[_this.cursorIndex]) {
          // console.log('item at index');
          last.groups[_this.cursorIndex].cursor = true;

          if (overwrite) {
            if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Backspace') {
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
        } else {// // console.log('no item at index');
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
    } //sets cursor true in correct location of text

  }]);

  return Editor;
}();

exports.default = Editor;

var Entry = /*#__PURE__*/function () {
  function Entry(key, options) {
    _classCallCheck(this, Entry);

    var _options$styles = options.styles,
        styles = _options$styles === void 0 ? {} : _options$styles;
    this.key = key;
    this.styles = styles;
  }

  _createClass(Entry, [{
    key: "addStyle",
    value: function addStyle(key, val) {
      this.styles = _objectSpread(_objectSpread({}, this.styles), {}, _defineProperty({}, key, val));
    }
  }]);

  return Entry;
}();

var EntryGroup = /*#__PURE__*/function () {
  function EntryGroup() {
    var Entry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, EntryGroup);

    this.cursor = false; //default false

    this.entries = Entry ? [Entry] : [];
  }

  _createClass(EntryGroup, [{
    key: "add",
    value: function add(Entry) {
      this.entries = [].concat(_toConsumableArray(this.entries), [Entry]);
    }
  }]);

  return EntryGroup;
}();

var HistoryText = /*#__PURE__*/function () {
  function HistoryText() {
    var EntryGroups = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, HistoryText);

    this.groups = EntryGroups;
    this.cursorMovement = false;
  }

  _createClass(HistoryText, [{
    key: "add",
    value: function add(Group) {
      this.groups = [].concat(_toConsumableArray(this.groups), [Group]);
    }
  }, {
    key: "insert",
    value: function insert(Group, index) {
      // console.log("insert index", index);
      this.groups.splice(index, 0, Group);
    }
  }, {
    key: "replace",
    value: function replace(Group, index) {
      // console.log("insert index", index);
      this.groups.splice(index, 1, Group);
    }
  }, {
    key: "remove",
    value: function remove(index) {
      this.groups.splice(index, 1);
    }
  }, {
    key: "removeAllCursors",
    value: function removeAllCursors() {
      this.groups = this.groups.map(function (eg) {
        eg.cursor = false;
        return eg;
      });
    }
  }]);

  return HistoryText;
}();
},{}],"src/paper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Paper = /*#__PURE__*/function () {
  function Paper(id) {
    _classCallCheck(this, Paper);

    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.dimensions = {
      w: 300,
      h: 400
    };
    this.fontRatio = 1;
    this.lineHeight = 1;
    this.letterSpacing = -0.34; //[-1,1]
    //hidden variables this.__blah to do

    this.padding = {
      x: 0,
      y: 0
    };
    this.fontSize = 1;
    this.grid = {
      X: 1,
      y: 1
    };
    this.init();
  }

  _createClass(Paper, [{
    key: "init",
    value: function init() {
      this.setDimensions(600, 400);
      this.refreshCanvas();
      this.renderText(null, true); // this.refreshCanvas();
    }
  }, {
    key: "drawDots",
    value: function drawDots() {
      var _this$dimensions = this.dimensions,
          w = _this$dimensions.w,
          h = _this$dimensions.h;
      var width = w - this.padding.x * 2;
      var height = h - this.padding.y * 2;
      var lw = width / this.grid.x; // let lh = height / this.grid.y;

      for (var i = 0; i < this.grid.x; i++) {
        for (var j = 0; j < this.grid.y; j++) {
          var c1 = this.padding.x + i * width / (this.grid.x - 1);
          var c2 = this.padding.y + j * height / (this.grid.y - 1);

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
  }, {
    key: "drawLetter",
    value: function drawLetter(letter, fontSize, x, y) {
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.font = "".concat(fontSize, "px monospace");
      this.ctx.fillText(letter, x, y);
    }
  }, {
    key: "renderText",
    value: function renderText(historyText) {
      var _this = this;

      var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _this$dimensions2 = this.dimensions,
          w = _this$dimensions2.w,
          h = _this$dimensions2.h;
      var width = w - this.padding.x * 2;
      var height = h - this.padding.y * 2; // let lw = width / this.grid.x;

      var lw = this.fontSize;
      console.log('lheight', lw);
      var lh = height / this.grid.y;
      var idx = 0;
      var cursorNext = false;
      var cursorRendered = false;

      if (!historyText) {
        console.log('ht', historyText);
        console.log();
        console.log('empty');
        var c1 = this.padding.x + 0 * width / (this.grid.x - 1);
        var c2 = this.padding.y + 0 * height / (this.grid.y - 1);
        this.drawLetter('_', lw, c1, c2);
        return;
      }

      var i, j;

      for (i = 0; i < this.grid.y; i++) {
        var _loop = function _loop() {
          var group = historyText === null || historyText === void 0 ? void 0 : historyText.groups[idx];
          var c1 = _this.padding.x + j * width / (_this.grid.x - 1);
          var c2 = _this.padding.y + i * height / (_this.grid.y - 1);
          var entries = group === null || group === void 0 ? void 0 : group.entries;

          if (entries && entries.length) {
            entries.forEach(function (entry) {
              if (entry.key.length === 1) {
                _this.drawLetter(entry.key, lw, c1, c2);
              } else if (entry.key === 'Enter') {
                i++;
                j = -1;
              }
            });

            if (cursorNext) {
              _this.drawLetter('_', lw, c1, c2);

              cursorRendered = true;
              cursorNext = false;
            }

            if (group.cursor) {
              if (overwrite) {
                _this.drawLetter('_', lw, c1, c2);

                cursorRendered = true;
              } else {
                cursorNext = true;
              }
            }
          }

          if (!group && !cursorRendered) {
            _this.drawLetter('_', lw, c1, c2);

            cursorRendered = true;
            return "break";
          }

          idx++;
        };

        for (j = 0; j < this.grid.x; j++) {
          var _ret = _loop();

          if (_ret === "break") break;
        }

        var group = historyText === null || historyText === void 0 ? void 0 : historyText.groups[idx];

        if (!group) {
          // this.drawLetter('_', lw, c1, c2);
          break;
        }
      }

      if (!cursorRendered) {
        console.log('none', i, j);

        var _c = this.padding.x + j * width / (this.grid.x - 1);

        var _c2 = this.padding.y + i * height / (this.grid.y - 1);

        this.drawLetter('_', lw, _c, _c2);
      }
    } //canvas dims

  }, {
    key: "setDimensions",
    value: function setDimensions(w, h) {
      this.dimensions = {
        w: w,
        h: h
      };
    }
  }, {
    key: "setPadding",
    value: function setPadding(x, y) {
      this.padding = {
        x: x,
        y: y
      };
    }
  }, {
    key: "refreshCanvas",
    value: function refreshCanvas() {
      // recallibarate all variables and repaint
      // if dimensions/lineheight/fontRatio changed
      this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.heighth);
      this.canvas.width = this.dimensions.w;
      this.canvas.height = this.dimensions.h;
      this.setPadding(this.dimensions.w / 12, this.dimensions.h / 8);
      this.fontSize = this.fontRatio * this.dimensions.h / 10;
      this.grid = {
        x: this.dimensions.w / (this.letterSpacing * this.fontSize + this.fontSize),
        y: this.dimensions.h / (this.lineHeight * this.fontSize)
      };
    }
  }]);

  return Paper;
}();

exports.default = Paper;
},{}],"index.js":[function(require,module,exports) {
"use strict";

require("./styles.scss");

var _editor = _interopRequireDefault(require("./src/editor"));

var _paper = _interopRequireDefault(require("./src/paper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.clear();
document.removeEventListener('keydown', handleKeyDown);
var editor = new _editor.default();
var paper = new _paper.default('paper');
editor.overwrite = true;

function handleKeyDown(e) {
  e.preventDefault(); // console.log(e.key);

  editor.handleKeyInput(e.key);
  var last = editor.history[editor.history.length - 1];
  paper.refreshCanvas();
  last && paper.renderText(last, editor.overwrite);
  console.log(last.groups.map(function (e) {
    return e.entries[0].key;
  })); // console.log(editor.cursorIndex);
}

document.addEventListener('keydown', handleKeyDown);
},{"./styles.scss":"styles.scss","./src/editor":"src/editor.js","./src/paper":"src/paper.js"}],"../../.nvm/versions/node/v12.16.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41693" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.nvm/versions/node/v12.16.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/canvaswriter.e31bb0bc.js.map