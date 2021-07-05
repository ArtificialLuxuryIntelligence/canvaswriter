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
},{"_css_loader":"../../.nvm/versions/node/v12.16.3/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/gif.js/gif.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// gif.js 0.2.0 - https://github.com/jnordberg/gif.js
(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
    module.exports = f();
  } else if (typeof define === 'function' && define.amd) {
    define([], f);
  } else {
    var g;

    if (typeof window !== 'undefined') {
      g = window;
    } else if (typeof global !== 'undefined') {
      g = global;
    } else if (typeof self !== 'undefined') {
      g = self;
    } else {
      g = this;
    }

    g.GIF = f();
  }
})(function () {
  var define, module, exports;
  return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == 'function' && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = 'MODULE_NOT_FOUND', f;
        }

        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }

      return n[o].exports;
    }

    var i = typeof require == 'function' && require;

    for (var o = 0; o < r.length; o++) {
      s(r[o]);
    }

    return s;
  }({
    1: [function (require, module, exports) {
      function EventEmitter() {
        this._events = this._events || {};
        this._maxListeners = this._maxListeners || undefined;
      }

      module.exports = EventEmitter;
      EventEmitter.EventEmitter = EventEmitter;
      EventEmitter.prototype._events = undefined;
      EventEmitter.prototype._maxListeners = undefined;
      EventEmitter.defaultMaxListeners = 10;

      EventEmitter.prototype.setMaxListeners = function (n) {
        if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
        this._maxListeners = n;
        return this;
      };

      EventEmitter.prototype.emit = function (type) {
        var er, handler, len, args, i, listeners;
        if (!this._events) this._events = {};

        if (type === 'error') {
          if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
            er = arguments[1];

            if (er instanceof Error) {
              throw er;
            } else {
              var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
              err.context = er;
              throw err;
            }
          }
        }

        handler = this._events[type];
        if (isUndefined(handler)) return false;

        if (isFunction(handler)) {
          switch (arguments.length) {
            case 1:
              handler.call(this);
              break;

            case 2:
              handler.call(this, arguments[1]);
              break;

            case 3:
              handler.call(this, arguments[1], arguments[2]);
              break;

            default:
              args = Array.prototype.slice.call(arguments, 1);
              handler.apply(this, args);
          }
        } else if (isObject(handler)) {
          args = Array.prototype.slice.call(arguments, 1);
          listeners = handler.slice();
          len = listeners.length;

          for (i = 0; i < len; i++) {
            listeners[i].apply(this, args);
          }
        }

        return true;
      };

      EventEmitter.prototype.addListener = function (type, listener) {
        var m;
        if (!isFunction(listener)) throw TypeError('listener must be a function');
        if (!this._events) this._events = {};
        if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);
        if (!this._events[type]) this._events[type] = listener;else if (isObject(this._events[type])) this._events[type].push(listener);else this._events[type] = [this._events[type], listener];

        if (isObject(this._events[type]) && !this._events[type].warned) {
          if (!isUndefined(this._maxListeners)) {
            m = this._maxListeners;
          } else {
            m = EventEmitter.defaultMaxListeners;
          }

          if (m && m > 0 && this._events[type].length > m) {
            this._events[type].warned = true;
            console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);

            if (typeof console.trace === 'function') {
              console.trace();
            }
          }
        }

        return this;
      };

      EventEmitter.prototype.on = EventEmitter.prototype.addListener;

      EventEmitter.prototype.once = function (type, listener) {
        if (!isFunction(listener)) throw TypeError('listener must be a function');
        var fired = false;

        function g() {
          this.removeListener(type, g);

          if (!fired) {
            fired = true;
            listener.apply(this, arguments);
          }
        }

        g.listener = listener;
        this.on(type, g);
        return this;
      };

      EventEmitter.prototype.removeListener = function (type, listener) {
        var list, position, length, i;
        if (!isFunction(listener)) throw TypeError('listener must be a function');
        if (!this._events || !this._events[type]) return this;
        list = this._events[type];
        length = list.length;
        position = -1;

        if (list === listener || isFunction(list.listener) && list.listener === listener) {
          delete this._events[type];
          if (this._events.removeListener) this.emit('removeListener', type, listener);
        } else if (isObject(list)) {
          for (i = length; i-- > 0;) {
            if (list[i] === listener || list[i].listener && list[i].listener === listener) {
              position = i;
              break;
            }
          }

          if (position < 0) return this;

          if (list.length === 1) {
            list.length = 0;
            delete this._events[type];
          } else {
            list.splice(position, 1);
          }

          if (this._events.removeListener) this.emit('removeListener', type, listener);
        }

        return this;
      };

      EventEmitter.prototype.removeAllListeners = function (type) {
        var key, listeners;
        if (!this._events) return this;

        if (!this._events.removeListener) {
          if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
          return this;
        }

        if (arguments.length === 0) {
          for (key in this._events) {
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
          }

          this.removeAllListeners('removeListener');
          this._events = {};
          return this;
        }

        listeners = this._events[type];

        if (isFunction(listeners)) {
          this.removeListener(type, listeners);
        } else if (listeners) {
          while (listeners.length) {
            this.removeListener(type, listeners[listeners.length - 1]);
          }
        }

        delete this._events[type];
        return this;
      };

      EventEmitter.prototype.listeners = function (type) {
        var ret;
        if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
        return ret;
      };

      EventEmitter.prototype.listenerCount = function (type) {
        if (this._events) {
          var evlistener = this._events[type];
          if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
        }

        return 0;
      };

      EventEmitter.listenerCount = function (emitter, type) {
        return emitter.listenerCount(type);
      };

      function isFunction(arg) {
        return typeof arg === 'function';
      }

      function isNumber(arg) {
        return typeof arg === 'number';
      }

      function isObject(arg) {
        return _typeof(arg) === 'object' && arg !== null;
      }

      function isUndefined(arg) {
        return arg === void 0;
      }
    }, {}],
    2: [function (require, module, exports) {
      var UA, browser, mode, platform, ua;
      ua = navigator.userAgent.toLowerCase();
      platform = navigator.platform.toLowerCase();
      UA = ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, 'unknown', 0];
      mode = UA[1] === 'ie' && document.documentMode;
      browser = {
        name: UA[1] === 'version' ? UA[3] : UA[1],
        version: mode || parseFloat(UA[1] === 'opera' && UA[4] ? UA[4] : UA[2]),
        platform: {
          name: ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0]
        }
      };
      browser[browser.name] = true;
      browser[browser.name + parseInt(browser.version, 10)] = true;
      browser.platform[browser.platform.name] = true;
      module.exports = browser;
    }, {}],
    3: [function (require, module, exports) {
      var EventEmitter,
          GIF,
          browser,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty,
          indexOf = [].indexOf || function (item) {
        for (var i = 0, l = this.length; i < l; i++) {
          if (i in this && this[i] === item) return i;
        }

        return -1;
      },
          slice = [].slice;

      EventEmitter = require('events').EventEmitter;
      browser = require('./browser.coffee');

      GIF = function (superClass) {
        var defaults, frameDefaults;
        extend(GIF, superClass);
        defaults = {
          workerScript: 'gif.worker.js',
          workers: 2,
          repeat: 0,
          background: '#fff',
          quality: 10,
          width: null,
          height: null,
          transparent: null,
          debug: false,
          dither: false
        };
        frameDefaults = {
          delay: 500,
          copy: false
        };

        function GIF(options) {
          var base, key, value;
          this.running = false;
          this.options = {};
          this.frames = [];
          this.freeWorkers = [];
          this.activeWorkers = [];
          this.setOptions(options);

          for (key in defaults) {
            value = defaults[key];

            if ((base = this.options)[key] == null) {
              base[key] = value;
            }
          }
        }

        GIF.prototype.setOption = function (key, value) {
          this.options[key] = value;

          if (this._canvas != null && (key === 'width' || key === 'height')) {
            return this._canvas[key] = value;
          }
        };

        GIF.prototype.setOptions = function (options) {
          var key, results, value;
          results = [];

          for (key in options) {
            if (!hasProp.call(options, key)) continue;
            value = options[key];
            results.push(this.setOption(key, value));
          }

          return results;
        };

        GIF.prototype.addFrame = function (image, options) {
          var frame, key;

          if (options == null) {
            options = {};
          }

          frame = {};
          frame.transparent = this.options.transparent;

          for (key in frameDefaults) {
            frame[key] = options[key] || frameDefaults[key];
          }

          if (this.options.width == null) {
            this.setOption('width', image.width);
          }

          if (this.options.height == null) {
            this.setOption('height', image.height);
          }

          if (typeof ImageData !== 'undefined' && ImageData !== null && image instanceof ImageData) {
            frame.data = image.data;
          } else if (typeof CanvasRenderingContext2D !== 'undefined' && CanvasRenderingContext2D !== null && image instanceof CanvasRenderingContext2D || typeof WebGLRenderingContext !== 'undefined' && WebGLRenderingContext !== null && image instanceof WebGLRenderingContext) {
            if (options.copy) {
              frame.data = this.getContextData(image);
            } else {
              frame.context = image;
            }
          } else if (image.childNodes != null) {
            if (options.copy) {
              frame.data = this.getImageData(image);
            } else {
              frame.image = image;
            }
          } else {
            throw new Error('Invalid image');
          }

          return this.frames.push(frame);
        };

        GIF.prototype.render = function () {
          var i, j, numWorkers, ref;

          if (this.running) {
            throw new Error('Already running');
          }

          if (this.options.width == null || this.options.height == null) {
            throw new Error('Width and height must be set prior to rendering');
          }

          this.running = true;
          this.nextFrame = 0;
          this.finishedFrames = 0;

          this.imageParts = function () {
            var j, ref, results;
            results = [];

            for (i = j = 0, ref = this.frames.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
              results.push(null);
            }

            return results;
          }.call(this);

          numWorkers = this.spawnWorkers();

          if (this.options.globalPalette === true) {
            this.renderNextFrame();
          } else {
            for (i = j = 0, ref = numWorkers; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
              this.renderNextFrame();
            }
          }

          this.emit('start');
          return this.emit('progress', 0);
        };

        GIF.prototype.abort = function () {
          var worker;

          while (true) {
            worker = this.activeWorkers.shift();

            if (worker == null) {
              break;
            }

            this.log('killing active worker');
            worker.terminate();
          }

          this.running = false;
          return this.emit('abort');
        };

        GIF.prototype.spawnWorkers = function () {
          var j, numWorkers, ref, results;
          numWorkers = Math.min(this.options.workers, this.frames.length);
          (function () {
            results = [];

            for (var j = ref = this.freeWorkers.length; ref <= numWorkers ? j < numWorkers : j > numWorkers; ref <= numWorkers ? j++ : j--) {
              results.push(j);
            }

            return results;
          }).apply(this).forEach(function (_this) {
            return function (i) {
              var worker;

              _this.log('spawning worker ' + i);

              worker = new Worker(_this.options.workerScript);

              worker.onmessage = function (event) {
                _this.activeWorkers.splice(_this.activeWorkers.indexOf(worker), 1);

                _this.freeWorkers.push(worker);

                return _this.frameFinished(event.data);
              };

              return _this.freeWorkers.push(worker);
            };
          }(this));
          return numWorkers;
        };

        GIF.prototype.frameFinished = function (frame) {
          var i, j, ref;
          this.log('frame ' + frame.index + ' finished - ' + this.activeWorkers.length + ' active');
          this.finishedFrames++;
          this.emit('progress', this.finishedFrames / this.frames.length);
          this.imageParts[frame.index] = frame;

          if (this.options.globalPalette === true) {
            this.options.globalPalette = frame.globalPalette;
            this.log('global palette analyzed');

            if (this.frames.length > 2) {
              for (i = j = 1, ref = this.freeWorkers.length; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
                this.renderNextFrame();
              }
            }
          }

          if (indexOf.call(this.imageParts, null) >= 0) {
            return this.renderNextFrame();
          } else {
            return this.finishRendering();
          }
        };

        GIF.prototype.finishRendering = function () {
          var data, frame, i, image, j, k, l, len, len1, len2, len3, offset, page, ref, ref1, ref2;
          len = 0;
          ref = this.imageParts;

          for (j = 0, len1 = ref.length; j < len1; j++) {
            frame = ref[j];
            len += (frame.data.length - 1) * frame.pageSize + frame.cursor;
          }

          len += frame.pageSize - frame.cursor;
          this.log('rendering finished - filesize ' + Math.round(len / 1e3) + 'kb');
          data = new Uint8Array(len);
          offset = 0;
          ref1 = this.imageParts;

          for (k = 0, len2 = ref1.length; k < len2; k++) {
            frame = ref1[k];
            ref2 = frame.data;

            for (i = l = 0, len3 = ref2.length; l < len3; i = ++l) {
              page = ref2[i];
              data.set(page, offset);

              if (i === frame.data.length - 1) {
                offset += frame.cursor;
              } else {
                offset += frame.pageSize;
              }
            }
          }

          image = new Blob([data], {
            type: 'image/gif'
          });
          return this.emit('finished', image, data);
        };

        GIF.prototype.renderNextFrame = function () {
          var frame, task, worker;

          if (this.freeWorkers.length === 0) {
            throw new Error('No free workers');
          }

          if (this.nextFrame >= this.frames.length) {
            return;
          }

          frame = this.frames[this.nextFrame++];
          worker = this.freeWorkers.shift();
          task = this.getTask(frame);
          this.log('starting frame ' + (task.index + 1) + ' of ' + this.frames.length);
          this.activeWorkers.push(worker);
          return worker.postMessage(task);
        };

        GIF.prototype.getContextData = function (ctx) {
          return ctx.getImageData(0, 0, this.options.width, this.options.height).data;
        };

        GIF.prototype.getImageData = function (image) {
          var ctx;

          if (this._canvas == null) {
            this._canvas = document.createElement('canvas');
            this._canvas.width = this.options.width;
            this._canvas.height = this.options.height;
          }

          ctx = this._canvas.getContext('2d');
          ctx.setFill = this.options.background;
          ctx.fillRect(0, 0, this.options.width, this.options.height);
          ctx.drawImage(image, 0, 0);
          return this.getContextData(ctx);
        };

        GIF.prototype.getTask = function (frame) {
          var index, task;
          index = this.frames.indexOf(frame);
          task = {
            index: index,
            last: index === this.frames.length - 1,
            delay: frame.delay,
            transparent: frame.transparent,
            width: this.options.width,
            height: this.options.height,
            quality: this.options.quality,
            dither: this.options.dither,
            globalPalette: this.options.globalPalette,
            repeat: this.options.repeat,
            canTransfer: browser.name === 'chrome'
          };

          if (frame.data != null) {
            task.data = frame.data;
          } else if (frame.context != null) {
            task.data = this.getContextData(frame.context);
          } else if (frame.image != null) {
            task.data = this.getImageData(frame.image);
          } else {
            throw new Error('Invalid frame');
          }

          return task;
        };

        GIF.prototype.log = function () {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];

          if (!this.options.debug) {
            return;
          }

          return console.log.apply(console, args);
        };

        return GIF;
      }(EventEmitter);

      module.exports = GIF;
    }, {
      './browser.coffee': 2,
      events: 1
    }]
  }, {}, [3])(3);
});
},{}],"src/CanvasWriter/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hex2rgba = hex2rgba;
exports.getRandomArbitrary = getRandomArbitrary;
exports.getRandomInt = getRandomInt;
exports.clamp = void 0;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Number(Math.floor(Math.random() * (max - min + 1)) + min);
}

function getRandomArbitrary(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

function hex2rgba(hex, a) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);
  return "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(a, ")");
}

var clamp = function clamp(a, b, c) {
  return Math.max(b, Math.min(c, a));
};

exports.clamp = clamp;
},{}],"node_modules/lodash.clonedeep/index.js":[function(require,module,exports) {
var global = arguments[3];

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, true, true);
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = cloneDeep;

},{}],"src/CanvasWriter/Editor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("./helpers");

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Editor = /*#__PURE__*/function () {
  function Editor() {
    var presets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Editor);

    this.paper = null;
    this.cursorIndex = 0;
    this.history = [];
    this.removedHistory = []; //undo functionality
    //options

    this.overwrite = (presets === null || presets === void 0 ? void 0 : presets.overwrite) || false;
    this.maxHistory = (presets === null || presets === void 0 ? void 0 : presets.maxHistory) || 100;
    this.init();
  }

  _createClass(Editor, [{
    key: "init",
    value: function init() {} // Exposed methods --------------------------------------------

  }, {
    key: "connect",
    value: function connect(paper) {
      this.paper = paper;
    } //Handle adding entries

  }, {
    key: "handleKeyInput",
    value: function handleKeyInput(key) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.updateHistory(key, options);
      this.updateRemovedHistory(key);
      this.updateCursor(key, this.overwrite); //
    }
  }, {
    key: "undo",
    value: function undo() {
      //TODO: set the cursor index in the Editor...
      var history = _toConsumableArray(this.history);

      if (history.length >= 1) {
        var removed = history.pop();
        this.history = history;

        if (removed) {
          this.removedHistory.push(removed);
          this.cursorIndex = removed.cursorIndex;
        }
      }
    }
  }, {
    key: "redo",
    value: function redo() {
      var removedHistory = _toConsumableArray(this.removedHistory);

      var removed = removedHistory.pop();
      this.removedHistory = removedHistory;

      if (removed) {
        this.addToHistory(removed);
        this.cursorIndex = removed.cursorIndex;
      }
    }
  }, {
    key: "getCurrentEntry",
    value: function getCurrentEntry() {
      // TODO refresh styles if it hasn't been edited (styles get initiated at creation but not updated if global styles are changed i.e.wonk/textcol is changed)
      var entry;

      if (this.overwrite) {
        entry = this.getEntry(this.cursorIndex);
      } else {
        entry = this.getEntry(this.nextCursorIndex());
      }

      return entry;
    }
  }, {
    key: "getEntry",
    value: function getEntry(index) {
      //returns top letter of stack in top history entry
      // NOTE: if there is a paper instance connected, then it will also load in the style of that letter
      var last = this.getLastHistory();
      var group = last.groups[index];
      var entry = group === null || group === void 0 ? void 0 : group.getLastEntry(); // if (entry) {
      //   if (!entry.styles) {
      //     entry.setStyles({
      //       ...this.paper.getANStyles(entry.key),
      //       color: this.paper.fontColor,
      //     });
      //   }
      //   // console.log(paper);
      // }

      return entry;
    } // Internals --------------------------------------------
    //Handle cursor movement

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
    }
  }, {
    key: "nextCursorIndex",
    value: function nextCursorIndex() {
      var last = this.getLastHistory().groups;

      if (this.cursorIndex === null) {
        return 0;
      }

      if (this.overwrite) {
        if (this.cursorIndex < last.length + 1) {
          //?
          return this.cursorIndex + 1;
        } else {
          return;
        }
      }

      if (!this.overwrite) {
        if (this.cursorIndex < last.length) {
          return this.cursorIndex + 1;
        } else {
          return;
        }
      }
    }
  }, {
    key: "getLastHistory",
    value: function getLastHistory() {
      var last = this.history[this.history.length - 1] || new HistoryState();
      return last;
    }
  }, {
    key: "addToHistory",
    value: function addToHistory(historyItem) {
      if (this.history.length === this.maxHistory) {
        this.history.splice(0, 1);
      }

      this.history.push(historyItem);
    } // add new text to history

  }, {
    key: "updateHistory",
    value: function updateHistory(key, options) {
      // console.log(this.cursorIndex);
      //get last history item
      var prevText = this.getLastHistory(); //clone last state..

      var text = (0, _lodash.default)(prevText);
      var entryGroup;
      var entry = new Entry(key, {});

      if (this.paper) {
        entry.setStyles(this.paper.createEntryStyles(entry));
      } // Handle delete


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

      if (key.length === 1 || key === 'Enter') {// continue
      } else {
        //don't handle other keys (e.g shift/esc/ctrl)
        return;
      } //Handle ctrl, shift etc?
      // Add to history


      if (!this.getCurrentEntry()) {
        // console.log('is empy');
        // is empty
        entryGroup = new EntryGroup(entry); // console.log('nnn', this.nextCursorIndex());

        text.insert(entryGroup, this.nextCursorIndex());
        this.addToHistory(text);
        return;
      } else {
        if (this.overwrite) {
          var n = this.nextCursorIndex(); // console.log('nextov', n);
          // Add entry to group at current index

          entryGroup = text.groups[this.cursorIndex];

          if (entryGroup) {
            entryGroup.add(entry);
            text.replace(entryGroup, this.cursorIndex);
          } else {
            entryGroup = new EntryGroup(entry);
            text.insert(entryGroup, this.nextCursorIndex());
          }

          this.addToHistory(text);
        } else {
          // Insert entry in entrygroup at next index
          entryGroup = new EntryGroup(entry);

          var _n = this.nextCursorIndex(); // console.log('next', n);


          text.insert(entryGroup, this.nextCursorIndex()); // if (this.cursorIndex === null) {
          //   text.insert(entryGroup, this.nextCursorIndex());
          // } else {
          //   text.insert(entryGroup, this.cursorIndex);
          // }

          this.addToHistory(text);
        }
      }
    }
  }, {
    key: "updateRemovedHistory",
    value: function updateRemovedHistory(key) {
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
    } // update cursor and overwrite values

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

        last.cursorIndex = _this.cursorIndex;
      };

      var updateLastHistoryOverwrite = function updateLastHistoryOverwrite() {
        var last = _this.getLastHistory();

        last.overwrite = overwrite;
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
      updateLastHistoryOverwrite();
    } //sets cursor true in correct location of text

  }]);

  return Editor;
}();

exports.default = Editor;

var Entry = /*#__PURE__*/function () {
  function Entry(key, options) {
    _classCallCheck(this, Entry);

    var _options$styles = options.styles,
        styles = _options$styles === void 0 ? null : _options$styles;
    this.key = key;
    this.styles = styles;
    this.editedStyles = false;
  }

  _createClass(Entry, [{
    key: "setStyles",
    value: function setStyles(styles) {
      this.styles = styles;
    }
  }, {
    key: "editStyle",
    value: function editStyle(key, val) {
      this.styles = _objectSpread(_objectSpread({}, this.styles), {}, _defineProperty({}, key, val));
      this.editedStyles = true;
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
  }, {
    key: "getLastEntry",
    value: function getLastEntry() {
      return this.entries.slice(-1)[0];
    }
  }]);

  return EntryGroup;
}();

var HistoryState = /*#__PURE__*/function () {
  function HistoryState() {
    _classCallCheck(this, HistoryState);

    this.groups = [];
    this.cursorMovement = false;
    this.cursorIndex = null;
    this.overwrite = null;
  }

  _createClass(HistoryState, [{
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

  return HistoryState;
}();

var initHist = {
  groups: [{
    cursor: false,
    entries: [{
      key: 'h',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'e',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'l',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'l',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'o',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: ' ',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'l',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'o',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'r',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'e',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'm',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: ' ',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'i',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'p',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 's',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'u',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'm',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: ' ',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'b',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'l',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'a',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'h',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: ' ',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'b',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'l',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'a',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'h',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: ' ',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'b',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'i',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'n',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'g',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: ' ',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'o',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: ' ',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'b',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'a',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'n',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: 'g',
      styles: {}
    }]
  }, {
    cursor: false,
    entries: [{
      key: ' ',
      styles: {}
    }]
  }, {
    cursor: true,
    entries: [{
      key: 'o',
      styles: {}
    }]
  }],
  cursorMovement: false
};
},{"./helpers":"src/CanvasWriter/helpers.js","lodash.clonedeep":"node_modules/lodash.clonedeep/index.js"}],"src/CanvasWriter/alphaNumStyles.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAlphaNumStyles = void 0;

var _helpers = require("./helpers");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var alphaNums = '`1234567890-=qwertyuiop[]asdfghjkl;\'zxcvbnm,./¬!"£$%^&*()+QWERTYUIOP{}~ASDFGHJKL:@ZXCVBNM<>?';

var initAlphaNumStyles = function initAlphaNumStyles() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    broken: 0.5
  };
  var broken = opts.broken;
  var rotationMax = 15;
  var translationXMax = 0.25;
  var translationYMax = 0.25;
  var settings = {
    rotation: broken * rotationMax,
    translationX: broken * translationXMax,
    translationY: broken * translationYMax
  }; // make options if you want a consistent appearance for certain letters otherwise it's rando:

  var ans = alphaNums.split('');
  var styles = {};

  var _iterator = _createForOfIteratorHelper(ans),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var a = _step.value;
      //set as vars
      var rotation = (0, _helpers.getRandomArbitrary)(-settings.rotation, settings.rotation);
      var translationY = (0, _helpers.getRandomArbitrary)(-settings.translationY, settings.translationY);
      var translationX = (0, _helpers.getRandomArbitrary)(-settings.translationX, settings.translationX); // styles[a] = {
      //   transform: `rotate(${rotation}deg) translateY(${translationY}em) translateX(${translationX}em)`,
      // };

      styles[a] = {
        rotation: rotation,
        x: translationX,
        y: translationY,
        scale: 1
      };
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return styles;
};

exports.initAlphaNumStyles = initAlphaNumStyles;
},{"./helpers":"src/CanvasWriter/helpers.js"}],"src/CanvasWriter/Paper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _alphaNumStyles = require("./alphaNumStyles");

var _helpers = require("./helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var _grid = new WeakMap();

var _ANStyles = new WeakMap();

var _padding = new WeakMap();

var _fontSize = new WeakMap();

var Paper = /*#__PURE__*/function () {
  // probably shouldn't mix _ and # but the _values are exposed thru getters...
  //maybe make accessible
  function Paper(canvas) {
    var presets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Paper);

    _grid.set(this, {
      writable: true,
      value: {
        X: 1,
        y: 1
      }
    });

    _ANStyles.set(this, {
      writable: true,
      value: (0, _alphaNumStyles.initAlphaNumStyles)({
        broken: this._broken
      })
    });

    _padding.set(this, {
      writable: true,
      value: {
        x: 0,
        y: 0
      }
    });

    _fontSize.set(this, {
      writable: true,
      value: 1
    });

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this._dimensions = (presets === null || presets === void 0 ? void 0 : presets.dimensions) || {
      w: 300,
      h: 400
    };
    this._lineHeight = (presets === null || presets === void 0 ? void 0 : presets.lineHeight) || 1;
    this._letterSpacing = (presets === null || presets === void 0 ? void 0 : presets.letterSpacing) || 0.5; //[0,1]

    this._fontRatio = (presets === null || presets === void 0 ? void 0 : presets.fontRatio) || 1;
    this._broken = (presets === null || presets === void 0 ? void 0 : presets.broken) || 0.2;
    this._fontColor = (presets === null || presets === void 0 ? void 0 : presets.fontColor) || '#500000';
    this.randomOpacity = typeof (presets === null || presets === void 0 ? void 0 : presets.randomOpacity) === 'boolean' ? presets.randomOpacity : true; //can't use same method as others with booleans

    this.pageColor = (presets === null || presets === void 0 ? void 0 : presets.pageColor) || '#ffffff';
    this.init();
  }

  _createClass(Paper, [{
    key: "init",
    value: function init() {
      this.setDimensions(800, 400);

      _classPrivateFieldSet(this, _ANStyles, (0, _alphaNumStyles.initAlphaNumStyles)({
        broken: this._broken
      }));

      this.refreshCanvas();
      this.renderText(null, true); // this.refreshCanvas();
    } // Exposed variables (controls) --------------------------------------------

  }, {
    key: "getANStyles",
    value: function getANStyles(key) {
      return _classPrivateFieldGet(this, _ANStyles)[key];
    }
  }, {
    key: "setDimensions",
    value: function setDimensions(w, h) {
      this._dimensions = {
        w: w,
        h: h
      };
    }
  }, {
    key: "setPadding",
    value: function setPadding(x, y) {
      _classPrivateFieldSet(this, _padding, {
        x: x,
        y: y
      });
    } // set dimensions(val) {
    //   this._dimensions = val;
    //   this.refreshCanvas();
    // }
    // ---End exposed variables
    // Exposed methods --------------------------------------------

  }, {
    key: "renderText",
    value: function renderText(historyText) {
      var _this = this;

      var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _this$_dimensions = this._dimensions,
          w = _this$_dimensions.w,
          h = _this$_dimensions.h;
      var width = w - _classPrivateFieldGet(this, _padding).x * 2;
      var height = h - _classPrivateFieldGet(this, _padding).y * 2; // let lw = width / this.#grid.x;

      var lw = _classPrivateFieldGet(this, _fontSize);

      var idx = 0;
      var cursorNext = false;
      var cursorRendered = false;

      if (!historyText) {
        var c1 = _classPrivateFieldGet(this, _padding).x + 0 * width / (_classPrivateFieldGet(this, _grid).x - 1);
        var c2 = _classPrivateFieldGet(this, _padding).y + 0 * height / (_classPrivateFieldGet(this, _grid).y - 1);
        this.drawLetter('_', c1, c2);
        return;
      }

      if (historyText.cursorIndex === null) {
        var _c = _classPrivateFieldGet(this, _padding).x + 0 * width / (_classPrivateFieldGet(this, _grid).x - 1);

        var _c2 = _classPrivateFieldGet(this, _padding).y + 0 * height / (_classPrivateFieldGet(this, _grid).y - 1);

        this.drawLetter('_', _c, _c2);
        cursorRendered = true;
      }

      var i, j; //TODO add layers?
      // do the below loop once for every layer -starting from bottom?
      // add layer:1 to styles
      // if layer ===currentl layer then render it..

      for (i = 0; i < _classPrivateFieldGet(this, _grid).y; i++) {
        var _loop = function _loop() {
          var group = historyText === null || historyText === void 0 ? void 0 : historyText.groups[idx];
          var c1 = _classPrivateFieldGet(_this, _padding).x + j * width / (_classPrivateFieldGet(_this, _grid).x - 1);
          var c2 = _classPrivateFieldGet(_this, _padding).y + i * height / (_classPrivateFieldGet(_this, _grid).y - 1); //debug
          // this.ctx.beginPath();
          // this.ctx.arc(c1, c2, 20 / 2, 0, 2 * Math.PI);
          // this.ctx.stroke();
          //

          var entries = group === null || group === void 0 ? void 0 : group.entries;

          if (entries && entries.length) {
            entries.forEach(function (entry) {
              if (entry.key.length === 1) {
                _this.drawLetter(entry.key, c1, c2, entry.styles, entry.editedStyles);
              } else if (entry.key === 'Enter') {
                i++;
                j = -1;
              }
            });

            if (cursorNext) {
              _this.drawLetter('_', c1, c2);

              cursorRendered = true;
              cursorNext = false;
            } //TODO - dont' use group.cursor, use historyText.cursorIndex (then remove group.cursor everywhere..)
            // if (historyText.cursorIndex === idx) {
            //   this.drawLetter('_', c1, c2);
            //   cursorRendered = true;
            // }


            if (historyText.cursorIndex === idx) {
              if (overwrite) {
                _this.drawLetter('_', c1, c2);

                cursorRendered = true;
              } else {
                //non-overwrite: render cursor at next positiondd
                cursorNext = true;
              }
            }
          }

          if (!group && !cursorRendered) {
            _this.drawLetter('_', c1, c2);

            cursorRendered = true;
            return "break";
          }

          idx++;
        };

        for (j = 0; j < _classPrivateFieldGet(this, _grid).x - 1; j++) {
          var _ret = _loop();

          if (_ret === "break") break;
        }

        var group = historyText === null || historyText === void 0 ? void 0 : historyText.groups[idx];

        if (!group) {
          // this.drawLetter('_', c1, c2);
          break;
        }
      } // if (!cursorRendered) {
      //   // if()
      //   let c1 = this.#padding.x + (j * width) / (this.#grid.x - 1);
      //   let c2 = this.#padding.y + (i * height) / (this.#grid.y - 1);
      //   this.drawLetter('_', c1, c2);
      // }

    }
  }, {
    key: "refreshCanvas",
    value: function refreshCanvas() {
      // recallibarate all variables and repaint
      // called by most setters (like a react dep array kinda thing)
      this.canvas.width = this._dimensions.w;
      this.canvas.height = this._dimensions.h; // console.log(this.canvas.clientHeight);
      // this.canvas.width =
      //   this.canvas.height * (this.canvas.clientWidth / this.canvas.clientHeight);

      _classPrivateFieldSet(this, _fontSize, this._fontRatio * this._dimensions.w / 20);

      this.setPadding(_classPrivateFieldGet(this, _fontSize), _classPrivateFieldGet(this, _fontSize));
      var clampedPaddingX = (0, _helpers.clamp)(_classPrivateFieldGet(this, _fontSize) / 2, this._dimensions.w / 14, this._dimensions.w / 10);
      this.setPadding(clampedPaddingX, _classPrivateFieldGet(this, _fontSize));

      _classPrivateFieldSet(this, _grid, {
        x: (this._dimensions.w - 2 * _classPrivateFieldGet(this, _padding).x) / (this._letterSpacing * _classPrivateFieldGet(this, _fontSize)),
        y: this._dimensions.h / (this._lineHeight * _classPrivateFieldGet(this, _fontSize))
      }); // this.ctx.clearRect(0, 0, this._dimensions.width, this._dimensions.heighth);


      this.ctx.fillStyle = this.pageColor;
      console.log('refresing');
      this.ctx.fillRect(0, 0, this._dimensions.w, this._dimensions.h);
    } // ---End exposed methods --------------------------------------------

  }, {
    key: "drawLetter",
    value: function drawLetter(letter, x, y, styles, editedStyles) {
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle'; // this.ctx.font = `${this.#fontSize}px JetBrains Mono`;

      this.ctx.font = "".concat(_classPrivateFieldGet(this, _fontSize), "px Roboto Mono");
      this.ctx.fillStyle = this._fontColor;
      var letterStyles;
      var ANStyles = this.getANStyles(letter);

      if (editedStyles) {
        //custom styles
        letterStyles = styles;
      } else if (ANStyles) {
        //random typewriter styles
        letterStyles = ANStyles;
      }

      if (letterStyles) {
        var _letterStyles = letterStyles,
            scale = _letterStyles.scale,
            posX = _letterStyles.x,
            posY = _letterStyles.y,
            rot = _letterStyles.rotation,
            _letterStyles$color = _letterStyles.color,
            color = _letterStyles$color === void 0 ? this._fontColor : _letterStyles$color,
            _letterStyles$opacity = _letterStyles.opacity,
            opacity = _letterStyles$opacity === void 0 ? styles.opacity : _letterStyles$opacity;
        var scaleX = scale;
        var scaleY = scale; //color

        var col;
        col = (0, _helpers.hex2rgba)(color, opacity);
        this.ctx.fillStyle = col; //transforms

        this.ctx.setTransform(scaleX, 0, 0, scaleY, x + posX * _classPrivateFieldGet(this, _fontSize), y + posY * _classPrivateFieldGet(this, _fontSize)); // scale and translate in one call

        this.ctx.rotate(rot * Math.PI / 180);
        this.ctx.fillText(letter, 0, 0); //undo transforms

        this.ctx.rotate(-rot * Math.PI / 180);
        this.ctx.setTransform(1, 0, 0, 1, 1, 1); // scale and translate in one call
      } else {
        this.ctx.fillText(letter, x, y);
      } //restore (ctx.restore /save is more CPU intensive apparently)

    }
  }, {
    key: "createEntryStyles",
    value: function createEntryStyles(entry) {
      var a;

      if (this.randomOpacity) {
        a = (0, _helpers.getRandomArbitrary)(0.5, 0.8);
      } else {
        a = 1;
      }

      return _objectSpread(_objectSpread({}, this.getANStyles(entry.key)), {}, {
        color: this.fontColor,
        opacity: a
      });
    } // Debug

  }, {
    key: "drawDots",
    value: function drawDots() {
      var _this$_dimensions2 = this._dimensions,
          w = _this$_dimensions2.w,
          h = _this$_dimensions2.h;
      var width = w - _classPrivateFieldGet(this, _padding).x * 2;
      var height = h - _classPrivateFieldGet(this, _padding).y * 2;

      var lw = width / _classPrivateFieldGet(this, _grid).x; // let lh = height / this.#grid.y;


      for (var i = 0; i < _classPrivateFieldGet(this, _grid).x; i++) {
        for (var j = 0; j < _classPrivateFieldGet(this, _grid).y; j++) {
          var c1 = _classPrivateFieldGet(this, _padding).x + i * width / (_classPrivateFieldGet(this, _grid).x - 1);
          var c2 = _classPrivateFieldGet(this, _padding).y + j * height / (_classPrivateFieldGet(this, _grid).y - 1);

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
  }, {
    key: "lineHeight",
    get: function get() {
      return this._lineHeight;
    },

    /**
     * @param {number} val
     */
    set: function set(val) {
      this._lineHeight = val;
      this.refreshCanvas();
    }
  }, {
    key: "letterSpacing",
    get: function get() {
      return this.__letterSpacing;
    },
    set: function set(val) {
      this._letterSpacing = val;
      this.refreshCanvas();
    }
  }, {
    key: "fontRatio",
    get: function get() {
      return this._fontRatio;
    },
    set: function set(val) {
      this._fontRatio = val;
      this.refreshCanvas();
    }
  }, {
    key: "broken",
    get: function get() {
      return this._broken;
    },
    set: function set(val) {
      this._broken = val;

      _classPrivateFieldSet(this, _ANStyles, (0, _alphaNumStyles.initAlphaNumStyles)({
        broken: this._broken
      }));

      this.refreshCanvas();
    }
  }, {
    key: "dimensions",
    get: function get() {
      return this._dimensions;
    }
  }, {
    key: "fontColor",
    get: function get() {
      return this._fontColor;
    },
    set: function set(val) {
      this._fontColor = val;
      this.refreshCanvas();
    }
  }]);

  return Paper;
}();

exports.default = Paper;
},{"./alphaNumStyles":"src/CanvasWriter/alphaNumStyles.js","./helpers":"src/CanvasWriter/helpers.js"}],"src/CanvasWriter/CanvasWriter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Editor = _interopRequireDefault(require("./Editor"));

var _Paper = _interopRequireDefault(require("./Paper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Combine Paper and Editor functionality
var CanvasWriter = /*#__PURE__*/function () {
  function CanvasWriter(options) {
    var _this = this;

    _classCallCheck(this, CanvasWriter);

    _defineProperty(this, "renderLastText", function () {
      _this.paper.refreshCanvas();

      var last = _this.editor.getLastHistory();

      _this.paper.renderText(last, _this.editor.overwrite);
    });

    _defineProperty(this, "updateLetterControls", function (letterControls) {
      var entry = _this.editor.getCurrentEntry();

      if (!(entry === null || entry === void 0 ? void 0 : entry.styles)) {
        return;
      }

      Object.values(letterControls).filter(function (v) {
        return !!v;
      }).forEach(function (input) {
        var key = input.dataset.key;
        input.value = entry.styles[key];
      });
    });

    console.log('options', options);
    var elements = options.elements,
        settings = options.settings,
        presets = options.presets;
    var canvas = elements.canvas,
        _elements$canvas = elements.canvas2,
        canvas2 = _elements$canvas === void 0 ? null : _elements$canvas;
    this.paper = new _Paper.default(canvas, presets);
    this.editor = new _Editor.default(presets);
    this.DOMControls = elements;
    this.settings = settings;
    this.init();
  }

  _createClass(CanvasWriter, [{
    key: "init",
    value: function init() {
      this.editor.connect(this.paper);
      this.addEventListeners(this.DOMControls);
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners(DOMControls) {
      var _this2 = this;

      console.log('adding listeners');
      var canvas = DOMControls.canvas,
          canvas2 = DOMControls.canvas2,
          _DOMControls$l_rotati = DOMControls.l_rotation_control,
          l_rotation_control = _DOMControls$l_rotati === void 0 ? null : _DOMControls$l_rotati,
          l_x_control = DOMControls.l_x_control,
          l_y_control = DOMControls.l_y_control,
          l_scale_control = DOMControls.l_scale_control,
          l_color = DOMControls.l_color,
          l_opacity = DOMControls.l_opacity,
          t_color = DOMControls.t_color,
          t_page_color = DOMControls.t_page_color,
          t_line_height = DOMControls.t_line_height,
          t_letter_spacing = DOMControls.t_letter_spacing,
          t_font_scale = DOMControls.t_font_scale,
          t_broken = DOMControls.t_broken,
          t_overwrite = DOMControls.t_overwrite,
          t_undo = DOMControls.t_undo,
          t_redo = DOMControls.t_redo,
          t_key = DOMControls.t_key; //etc etc/

      var letterControls = {
        l_rotation_control: l_rotation_control,
        l_x_control: l_x_control,
        l_y_control: l_y_control,
        l_scale_control: l_scale_control,
        l_color: l_color,
        l_opacity: l_opacity
      };
      var textControls = {
        t_color: t_color,
        t_page_color: t_page_color,
        t_line_height: t_line_height,
        t_letter_spacing: t_letter_spacing,
        t_font_scale: t_font_scale,
        t_broken: t_broken,
        t_overwrite: t_overwrite,
        t_undo: t_undo,
        t_redo: t_redo,
        t_key: t_key
      };

      var addLetterControlListeners = function addLetterControlListeners(letterControls) {
        Object.values(letterControls).filter(function (v) {
          return !!v;
        }) //if it exists
        .forEach(function (input) {
          var inputHandler = function inputHandler(e) {
            var entry = _this2.editor.getCurrentEntry();

            if (entry) {
              var key = input.dataset.key;
              var val = e.target.value; // console.log(key, val);

              entry.editStyle(key, val);

              _this2.renderLastText();
            }
          };

          input.addEventListener('input', inputHandler);
        });
      };

      var addTextControlListeners = function addTextControlListeners(textControls) {
        var t_color = textControls.t_color,
            t_page_color = textControls.t_page_color,
            t_line_height = textControls.t_line_height,
            t_letter_spacing = textControls.t_letter_spacing,
            t_font_scale = textControls.t_font_scale,
            t_broken = textControls.t_broken,
            t_overwrite = textControls.t_overwrite,
            t_undo = textControls.t_undo,
            t_redo = textControls.t_redo,
            t_key = textControls.t_key;

        var handleKeyDown = function handleKeyDown(e) {
          e.preventDefault();

          _this2.editor.handleKeyInput(e.key); // this.paper.refreshCanvas();


          _this2.updateLetterControls(letterControls);

          _this2.renderLastText();
        };

        var handleLineHeightRange = function handleLineHeightRange(e) {
          _this2.paper.lineHeight = e.target.value;

          _this2.renderLastText();
        };

        var handleLetterSpacingRange = function handleLetterSpacingRange(e) {
          _this2.paper.letterSpacing = e.target.value;

          _this2.renderLastText();
        };

        var handleFontScaleRange = function handleFontScaleRange(e) {
          _this2.paper.fontRatio = e.target.value;

          _this2.renderLastText();
        };

        var handleBrokenRange = function handleBrokenRange(e) {
          _this2.paper.broken = e.target.value;

          _this2.renderLastText();
        };

        var handleOverwriteButton = function handleOverwriteButton() {
          _this2.editor.overwrite = !_this2.editor.overwrite;

          _this2.renderLastText();
        };

        var handleUndoButton = function handleUndoButton() {
          _this2.editor.undo();

          var last = _this2.editor.getLastHistory(); // console.log(this.editor.history);
          // console.log('last', last);


          _this2.renderLastText();
        };

        var handleRedoButton = function handleRedoButton() {
          _this2.editor.redo();

          _this2.renderLastText();
        };

        var handleTextColorInput = function handleTextColorInput(e) {
          _this2.paper.fontColor = e.target.value;
          console.log(e.target.value);

          _this2.renderLastText();
        };

        var handlePageColorInput = function handlePageColorInput(e) {
          _this2.paper.pageColor = e.target.value;

          _this2.renderLastText();
        }; //Add listeners


        t_color === null || t_color === void 0 ? void 0 : t_color.addEventListener('input', handleTextColorInput);
        t_page_color === null || t_page_color === void 0 ? void 0 : t_page_color.addEventListener('input', handlePageColorInput);
        t_line_height === null || t_line_height === void 0 ? void 0 : t_line_height.addEventListener('input', handleLineHeightRange);
        t_letter_spacing === null || t_letter_spacing === void 0 ? void 0 : t_letter_spacing.addEventListener('input', handleLetterSpacingRange);
        t_font_scale === null || t_font_scale === void 0 ? void 0 : t_font_scale.addEventListener('input', handleFontScaleRange);
        t_broken === null || t_broken === void 0 ? void 0 : t_broken.addEventListener('input', handleBrokenRange);
        t_overwrite === null || t_overwrite === void 0 ? void 0 : t_overwrite.addEventListener('click', handleOverwriteButton);
        t_undo === null || t_undo === void 0 ? void 0 : t_undo.addEventListener('click', handleUndoButton);
        t_redo === null || t_redo === void 0 ? void 0 : t_redo.addEventListener('click', handleRedoButton);
        t_key === null || t_key === void 0 ? void 0 : t_key.addEventListener('keydown', handleKeyDown);
      };

      var syncInitial = function syncInitial(DOMControls) {
        var t_color = DOMControls.t_color,
            t_page_color = DOMControls.t_page_color; //   console.log('tc', t_color);

        t_color && (t_color.value = _this2.paper.fontColor);
        t_page_color && (t_page_color.value = _this2.paper.pageColor);
      };

      addTextControlListeners(textControls);
      addLetterControlListeners(letterControls);
      syncInitial(DOMControls);
    }
  }]);

  return CanvasWriter;
}();

exports.default = CanvasWriter;
},{"./Editor":"src/CanvasWriter/Editor.js","./Paper":"src/CanvasWriter/Paper.js"}],"src/CanvasWriter/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Editor", {
  enumerable: true,
  get: function () {
    return _Editor.default;
  }
});
Object.defineProperty(exports, "Paper", {
  enumerable: true,
  get: function () {
    return _Paper.default;
  }
});
exports.default = void 0;

var _CanvasWriter = _interopRequireDefault(require("./CanvasWriter"));

var _Editor = _interopRequireDefault(require("./Editor"));

var _Paper = _interopRequireDefault(require("./Paper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _CanvasWriter.default;
exports.default = _default;
},{"./CanvasWriter":"src/CanvasWriter/CanvasWriter.js","./Editor":"src/CanvasWriter/Editor.js","./Paper":"src/CanvasWriter/Paper.js"}],"src/GIFWriter/GIFWriter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CanvasWriter2 = _interopRequireDefault(require("../CanvasWriter"));

var _helpers = require("../CanvasWriter/helpers");

var _gif = _interopRequireDefault(require("../gif.js/gif"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function exportVid(blob) {
  var vid = document.createElement('video');
  vid.src = URL.createObjectURL(blob);
  vid.controls = true;
  document.body.appendChild(vid);
  var a = document.createElement('a');
  a.download = 'myvid.mp4';
  a.href = vid.src;
  a.textContent = 'download the video';
  document.body.appendChild(a);
}

function exportPic(canvas) {
  var image = canvas.toDataURL('image/png');
  console.log(image);
  var img = new Image();
  img.src = image;
  document.body.append(img);
} // Extends CanvasWriter functionality


var GIFWriter = /*#__PURE__*/function (_CanvasWriter) {
  _inherits(GIFWriter, _CanvasWriter);

  var _super = _createSuper(GIFWriter);

  function GIFWriter(options) {
    var _this;

    _classCallCheck(this, GIFWriter);

    _this = _super.call(this, options);

    _defineProperty(_assertThisInitialized(_this), "animate", function (onAnimationEnd, onFrame) {
      var idx = _this.startIndex;
      var history = _this.editor.history;
      console.log(history); //set letters visible at random intervals for natural typing effect

      var type = function type() {
        clearTimeout(_this.timer);
        var speed = _this.animationSpeed * 1000;
        var variance = _this.animationSpeed * 500;
        var interval = (0, _helpers.getRandomInt)(speed - variance, speed + variance);

        if (idx < history.length) {
          _this.timer = setTimeout(function () {
            var historyText = history[idx];

            _this.paper.refreshCanvas();

            _this.paper.renderText(historyText, historyText.overwrite);

            onFrame && onFrame();
            idx++;
            type();
          }, interval);
        } else {
          clearTimeout(_this.timer);
          onAnimationEnd && onAnimationEnd();
          return;
        }
      };

      type();
    });

    _this.timer = null;
    _this.animationSpeed = 0.1;
    _this.startIndex = 0;

    _this.init_gifwriter();

    return _this;
  } //blah super blah
  //second canvas here (not in paper class)
  //spread into same array in constructor?
  //more dom nodes :
  // - animationstart
  // - speed
  // - etc (see original)
  // - output img/link?
  // onRecorded // onSaved callbacks [probs used to update UI]


  _createClass(GIFWriter, [{
    key: "record",
    value: function record() {
      var chunks = []; // here we will store our recorded media chunks (Blobs)

      var stream = this.DOMControls.canvas.captureStream(); // grab our canvas MediaStream

      var rec = new MediaRecorder(stream); // init the recorder
      // every time the recorder has new data, we will store it in our array

      rec.ondataavailable = function (e) {
        return chunks.push(e.data);
      }; // only when the recorder stops, we construct a complete Blob from all the chunks
      // rec.onstop = (e) => exportVid(new Blob(chunks, { type: 'video/webm' }));


      rec.onstop = function (e) {
        return exportVid(new Blob(chunks, {
          type: 'video/mp4'
        }));
      };

      rec.start(); // setTimeout(() => rec.stop(), 3000); // stop recording in 3s

      function onAnimationEnd() {
        setTimeout(function () {
          //stop the last frame from being missed..
          rec.stop();
        }, 200);
      }

      this.animate(onAnimationEnd);
    }
  }, {
    key: "recordGif",
    value: function recordGif() {
      var _this2 = this;

      console.log('recording gif'); // https://github.com/jnordberg/gif.js/
      //see dithering / quality 

      var gif = new _gif.default({
        workers: 4,
        workerScript: '/gif.js/gif.worker.js',
        width: this.paper.dimensions.w,
        height: this.paper.dimensions.h
      });
      gif.on('finished', function (blob) {
        var img = new Image();
        img.src = URL.createObjectURL(blob);
        document.body.append(img);
      });

      var onAnimationEnd = function onAnimationEnd() {
        gif.render();
      };

      var onFrame = function onFrame() {
        gif.addFrame(_this2.paper.ctx, {
          copy: true,
          delay: 200
        });
      };

      this.animate(onAnimationEnd, onFrame);
    }
  }, {
    key: "saveImage",
    value: function saveImage() {
      //save as img
      exportPic(this.DOMControls.canvas);
    }
  }, {
    key: "init_gifwriter",
    value: function init_gifwriter() {
      this.addGifControlEventListeners(this.DOMControls);
    }
  }, {
    key: "addGifControlEventListeners",
    value: function addGifControlEventListeners(DOMControls) {
      var _this3 = this;

      var a_start_idx = DOMControls.a_start_idx,
          a_start = DOMControls.a_start,
          a_speed = DOMControls.a_speed,
          s_record = DOMControls.s_record,
          s_image = DOMControls.s_image,
          s_gif = DOMControls.s_gif; //etc etc/

      var syncInitial = function syncInitial() {
        a_start_idx && (a_start_idx.value = _this3.startIndex);
        a_speed && (a_speed.value = _this3.animationSpeed);
      };

      var addControlListeners = function addControlListeners() {
        var handleStartAnimation = function handleStartAnimation(e) {
          _this3.animate();
        };

        var handleStartIndexRange = function handleStartIndexRange(e) {
          _this3.startIndex = e.target.value;

          _this3.animate();
        };

        var handleAnimationSpeedRange = function handleAnimationSpeedRange(e) {
          _this3.animationSpeed = e.target.value;

          _this3.animate();
        };

        var handleStartRecordVideo = function handleStartRecordVideo(e) {
          _this3.record();
        };

        var handleStartRecordGif = function handleStartRecordGif(e) {
          _this3.recordGif();
        };

        var handleSaveImage = function handleSaveImage(e) {
          _this3.saveImage();
        }; //animation


        a_start === null || a_start === void 0 ? void 0 : a_start.addEventListener('click', handleStartAnimation);
        a_start_idx === null || a_start_idx === void 0 ? void 0 : a_start_idx.addEventListener('input', handleStartIndexRange);
        a_speed === null || a_speed === void 0 ? void 0 : a_speed.addEventListener('input', handleAnimationSpeedRange); //saving

        s_record === null || s_record === void 0 ? void 0 : s_record.addEventListener('click', handleStartRecordVideo);
        s_image === null || s_image === void 0 ? void 0 : s_image.addEventListener('click', handleSaveImage);
        s_gif === null || s_gif === void 0 ? void 0 : s_gif.addEventListener('click', handleStartRecordGif);
      };

      addControlListeners();
      syncInitial();
    }
  }]);

  return GIFWriter;
}(_CanvasWriter2.default);

exports.default = GIFWriter;
},{"../CanvasWriter":"src/CanvasWriter/index.js","../CanvasWriter/helpers":"src/CanvasWriter/helpers.js","../gif.js/gif":"src/gif.js/gif.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("./styles.scss");

require("./src/gif.js/gif");

var _CanvasWriter = _interopRequireDefault(require("./src/CanvasWriter"));

var _GIFWriter = _interopRequireDefault(require("./src/GIFWriter/GIFWriter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.clear();
var DOMElements = {
  //letter controls
  l_rotation_control: document.getElementById('letter-r'),
  l_x_control: document.getElementById('letter-x'),
  l_y_control: document.getElementById('letter-y'),
  l_scale_control: document.getElementById('letter-s'),
  l_color: document.getElementById('letter-color'),
  l_opacity: document.getElementById('letter-o'),
  //text controls
  t_color: document.getElementById('text-color'),
  t_page_color: document.getElementById('page-color'),
  t_line_height: document.getElementById('line-height'),
  t_letter_spacing: document.getElementById('letter-spacing'),
  t_font_scale: document.getElementById('font-scale'),
  t_broken: document.getElementById('broken'),
  t_overwrite: document.getElementById('overwrite'),
  t_undo: document.getElementById('undo'),
  t_redo: document.getElementById('redo'),
  t_key: document,
  //detects key inputs
  //animation controls
  a_start: document.getElementById('animation-start'),
  a_start_idx: document.getElementById('animation-start-index'),
  a_speed: document.getElementById('animation-speed'),
  // saving controls
  s_record: document.getElementById('record-vid'),
  s_gif: document.getElementById('record-gif'),
  s_image: document.getElementById('save-image'),
  //canvas
  canvas: document.getElementById('paper')
};

function main() {
  // let canvasWriter = new CanvasWriter({ elements: DOMElements, settings: {} });
  var Gwriter = new _GIFWriter.default({
    elements: DOMElements,
    presets: {
      fontColor: '#200000',
      randomOpacity: true
    },
    settings: {}
  });
  console.log(Gwriter); // console.log(canvasWriter);
}

main();
},{"./styles.scss":"styles.scss","./src/gif.js/gif":"src/gif.js/gif.js","./src/CanvasWriter":"src/CanvasWriter/index.js","./src/GIFWriter/GIFWriter":"src/GIFWriter/GIFWriter.js"}],"../../.nvm/versions/node/v12.16.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "38951" + '/');

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