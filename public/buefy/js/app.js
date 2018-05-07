/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.5.16
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */


/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
})

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ("development" !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ("development" !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ("development" !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if ("development" !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if ("development" !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ("development" !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    // reset _rendered flag on slots for duplicate slot check
    if (true) {
      for (var key in vm.$slots) {
        // $flow-disable-line
        vm.$slots[key]._rendered = false;
      }
    }

    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (true) {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
}

var builtInComponents = {
  KeepAlive: KeepAlive
}

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.16';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
}

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (true) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (true) {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (true) {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (true) {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (true) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
}

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
]

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
}

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
}

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = {
    value: value.trim()
  };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (true) {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (true) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  if (true) {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
}

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
}

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {}

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
]

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
}

var platformDirectives = {
  model: directive,
  show: show
}

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
}

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (true) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
}

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
}

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        "development" !== 'production' &&
        "development" !== 'test' &&
        isChrome
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if ("development" !== 'production' &&
      "development" !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
}

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (true) {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
}

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
}

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([^]*?)\s+(?:in|of)\s+([^]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (true) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (true) {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (true) {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (true) {
      warn$2(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '');
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (true) {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if ("development" !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if ("development" !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (true) {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$2 = {
  preTransformNode: preTransformNode
}

var modules$1 = [
  klass$1,
  style$1,
  model$2
]

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
}

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  esc: 'Escape',
  tab: 'Tab',
  enter: 'Enter',
  space: ' ',
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  'delete': ['Backspace', 'Delete']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore if */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore if */
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if ("development" !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
}

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if ("development" !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (true) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (true) {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (true) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (true) {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (true) {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

module.exports = Vue;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(5).setImmediate))

/***/ }),

/***/ 44:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(46);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 46:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(50);


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(6);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_buefy__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_buefy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_buefy__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_buefy_lib_buefy_css__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_buefy_lib_buefy_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_buefy_lib_buefy_css__);




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_buefy___default.a);

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

(function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Buefy=t():e.Buefy=t()})(this,function(){return function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=239)}([function(e,t){e.exports=function(e,t,n,i,r){var a,o=e=e||{},s=typeof e.default;"object"!==s&&"function"!==s||(a=e,o=e.default);var l="function"==typeof o?o.options:o;t&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns),i&&(l._scopeId=i);var c;if(r?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},l._ssrRegister=c):n&&(c=n),c){var u=l.functional,d=u?l.render:l.beforeCreate;u?l.render=function(e,t){return c.call(t),d(e,t)}:l.beforeCreate=d?[].concat(d,c):[c]}return{esModule:a,exports:o,options:l}}},function(e,t,n){"use strict";n.d(t,"a",function(){return r});var i={defaultContainerElement:null,defaultIconPack:"mdi",defaultDialogConfirmText:null,defaultDialogCancelText:null,defaultSnackbarDuration:3500,defaultToastDuration:2e3,defaultTooltipType:"is-primary",defaultTooltipAnimated:!1,defaultInputAutocomplete:"on",defaultDateFormatter:null,defaultDateParser:null,defaultDayNames:null,defaultMonthNames:null,defaultFirstDayOfWeek:null,defaultUnselectableDaysOfWeek:null,defaultTimeFormatter:null,defaultTimeParser:null,defaultModalScroll:null,defaultDatepickerMobileNative:!0,defaultTimepickerMobileNative:!0,defaultNoticeQueue:!0};t.b=i;var r=function(e){i=e}},function(e,t,n){"use strict";var i=n(179),r=n.n(i);t.a=r.a},function(e,t,n){e.exports={default:n(133),__esModule:!0}},function(e,t,n){var i=n(37)("wks"),r=n(27),a=n(8).Symbol,o="function"==typeof a;(e.exports=function(e){return i[e]||(i[e]=o&&a[e]||(o?a:r)("Symbol."+e))}).store=i},function(e,t,n){"use strict";function i(e,t){return t.split(".").reduce(function(e,t){return e[t]},e)}function r(e,t,n){if(!e)return-1;if(!n||"function"!=typeof n)return e.indexOf(t);for(var i=0;i<e.length;i++)if(n(e[i],t))return i;return-1}function a(e){void 0!==e.remove?e.remove():e.parentNode.removeChild(e)}function o(e){return e?e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"):e}t.c=i,t.d=r,n.d(t,"b",function(){return s}),t.a=a,t.e=o;var s={Android:function(){return"undefined"!=typeof window&&window.navigator.userAgent.match(/Android/i)},BlackBerry:function(){return"undefined"!=typeof window&&window.navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return"undefined"!=typeof window&&window.navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return"undefined"!=typeof window&&window.navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return"undefined"!=typeof window&&window.navigator.userAgent.match(/IEMobile/i)},any:function(){return s.Android()||s.BlackBerry()||s.iOS()||s.Opera()||s.Windows()}}},function(e,t,n){"use strict";t.__esModule=!0;var i=n(126),r=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=function(e,t,n){return t in e?(0,r.default)(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},function(e,t){var n=e.exports={version:"2.5.3"};"number"==typeof __e&&(__e=n)},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t,n){var i=n(14),r=n(55),a=n(40),o=Object.defineProperty;t.f=n(11)?Object.defineProperty:function(e,t,n){if(i(e),t=a(t,!0),i(n),r)try{return o(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t,n){"use strict";var i=n(1);t.a={props:{size:String,expanded:Boolean,loading:Boolean,rounded:Boolean,icon:String,iconPack:String,autocomplete:String,maxlength:[Number,String]},data:function(){return{isValid:!0,isFocused:!1,newIconPack:this.iconPack||i.b.defaultIconPack}},computed:{parentField:function(){for(var e=this.$parent,t=0;t<3;t++)e&&!e.$data._isField&&(e=e.$parent);return e},statusType:function(){if(this.parentField)return this.parentField.newType},statusMessage:function(){if(this.parentField)return this.parentField.newMessage},iconSize:function(){switch(this.size){case"is-small":return this.size;case"is-medium":return;case"is-large":return"mdi"===this.newIconPack?"is-medium":""}}},methods:{focus:function(){var e=this;void 0!==this.$data._elementRef&&this.$nextTick(function(){return e.$el.querySelector(e.$data._elementRef).focus()})},onBlur:function(e){this.isFocused=!1,this.$emit("blur",e),this.checkHtml5Validity()},onFocus:function(e){this.isFocused=!0,this.$emit("focus",e)},checkHtml5Validity:function(){if(void 0!==this.$refs[this.$data._elementRef]){var e=this.$el.querySelector(this.$data._elementRef),t=null,n=null,i=!0;return e.checkValidity()||(t="is-danger",n=e.validationMessage,i=!1),this.isValid=i,this.parentField&&(this.parentField.type||(this.parentField.newType=t),this.parentField.message||(this.parentField.newMessage=n)),this.isValid}}}}},function(e,t,n){e.exports=!n(18)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,n){e.exports={default:n(131),__esModule:!0}},function(e,t,n){var i=n(19);e.exports=function(e){if(!i(e))throw TypeError(e+" is not an object!");return e}},function(e,t,n){var i=n(9),r=n(21);e.exports=n(11)?function(e,t,n){return i.f(e,t,r(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){var i=n(56),r=n(31);e.exports=function(e){return i(r(e))}},function(e,t,n){var i=n(8),r=n(7),a=n(53),o=n(15),s=function(e,t,n){var l,c,u,d=e&s.F,f=e&s.G,p=e&s.S,h=e&s.P,v=e&s.B,m=e&s.W,y=f?r:r[t]||(r[t]={}),g=y.prototype,b=f?i:p?i[t]:(i[t]||{}).prototype;f&&(n=t);for(l in n)(c=!d&&b&&void 0!==b[l])&&l in y||(u=c?b[l]:n[l],y[l]=f&&"function"!=typeof b[l]?n[l]:v&&c?a(u,i):m&&b[l]==u?function(e){var t=function(t,n,i){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,i)}return e.apply(this,arguments)};return t.prototype=e.prototype,t}(u):h&&"function"==typeof u?a(Function.call,u):u,h&&((y.virtual||(y.virtual={}))[l]=u,e&s.R&&g&&!g[l]&&o(g,l,u)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,e.exports=s},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t){e.exports={}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,n){"use strict";(function(e,n){function i(e){return void 0===e||null===e}function r(e){return void 0!==e&&null!==e}function a(e){return!0===e}function o(e){return!1===e}function s(e){return"string"==typeof e||"number"==typeof e||"symbol"==typeof e||"boolean"==typeof e}function l(e){return null!==e&&"object"==typeof e}function c(e){return"[object Object]"===pi.call(e)}function u(e){return"[object RegExp]"===pi.call(e)}function d(e){var t=parseFloat(String(e));return t>=0&&Math.floor(t)===t&&isFinite(e)}function f(e){return null==e?"":"object"==typeof e?JSON.stringify(e,null,2):String(e)}function p(e){var t=parseFloat(e);return isNaN(t)?e:t}function h(e,t){for(var n=Object.create(null),i=e.split(","),r=0;r<i.length;r++)n[i[r]]=!0;return t?function(e){return n[e.toLowerCase()]}:function(e){return n[e]}}function v(e,t){if(e.length){var n=e.indexOf(t);if(n>-1)return e.splice(n,1)}}function m(e,t){return vi.call(e,t)}function y(e){var t=Object.create(null);return function(n){return t[n]||(t[n]=e(n))}}function g(e,t){function n(n){var i=arguments.length;return i?i>1?e.apply(t,arguments):e.call(t,n):e.call(t)}return n._length=e.length,n}function b(e,t){t=t||0;for(var n=e.length-t,i=new Array(n);n--;)i[n]=e[n+t];return i}function _(e,t){for(var n in t)e[n]=t[n];return e}function w(e){for(var t={},n=0;n<e.length;n++)e[n]&&_(t,e[n]);return t}function k(e,t,n){}function C(e,t){if(e===t)return!0;var n=l(e),i=l(t);if(!n||!i)return!n&&!i&&String(e)===String(t);try{var r=Array.isArray(e),a=Array.isArray(t);if(r&&a)return e.length===t.length&&e.every(function(e,n){return C(e,t[n])});if(r||a)return!1;var o=Object.keys(e),s=Object.keys(t);return o.length===s.length&&o.every(function(n){return C(e[n],t[n])})}catch(e){return!1}}function x(e,t){for(var n=0;n<e.length;n++)if(C(e[n],t))return n;return-1}function S(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}}function D(e){var t=(e+"").charCodeAt(0);return 36===t||95===t}function $(e,t,n,i){Object.defineProperty(e,t,{value:n,enumerable:!!i,writable:!0,configurable:!0})}function A(e){if(!$i.test(e)){var t=e.split(".");return function(e){for(var n=0;n<t.length;n++){if(!e)return;e=e[t[n]]}return e}}}function O(e){return"function"==typeof e&&/native code/.test(e.toString())}function T(e){Ki.target&&Gi.push(Ki.target),Ki.target=e}function M(){Ki.target=Gi.pop()}function P(e){return new Ji(void 0,void 0,void 0,String(e))}function B(e,t){var n=e.componentOptions,i=new Ji(e.tag,e.data,e.children,e.text,e.elm,e.context,n,e.asyncFactory);return i.ns=e.ns,i.isStatic=e.isStatic,i.key=e.key,i.isComment=e.isComment,i.fnContext=e.fnContext,i.fnOptions=e.fnOptions,i.fnScopeId=e.fnScopeId,i.isCloned=!0,t&&(e.children&&(i.children=F(e.children,!0)),n&&n.children&&(n.children=F(n.children,!0))),i}function F(e,t){for(var n=e.length,i=new Array(n),r=0;r<n;r++)i[r]=B(e[r],t);return i}function V(e,t,n){e.__proto__=t}function I(e,t,n){for(var i=0,r=n.length;i<r;i++){var a=n[i];$(e,a,t[a])}}function E(e,t){if(l(e)&&!(e instanceof Ji)){var n;return m(e,"__ob__")&&e.__ob__ instanceof ir?n=e.__ob__:nr.shouldConvert&&!Hi()&&(Array.isArray(e)||c(e))&&Object.isExtensible(e)&&!e._isVue&&(n=new ir(e)),t&&n&&n.vmCount++,n}}function N(e,t,n,i,r){var a=new Ki,o=Object.getOwnPropertyDescriptor(e,t);if(!o||!1!==o.configurable){var s=o&&o.get,l=o&&o.set,c=!r&&E(n);Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){var t=s?s.call(e):n;return Ki.target&&(a.depend(),c&&(c.dep.depend(),Array.isArray(t)&&L(t))),t},set:function(t){var i=s?s.call(e):n;t===i||t!==t&&i!==i||(l?l.call(e,t):n=t,c=!r&&E(t),a.notify())}})}}function j(e,t,n){if(Array.isArray(e)&&d(t))return e.length=Math.max(e.length,t),e.splice(t,1,n),n;if(t in e&&!(t in Object.prototype))return e[t]=n,n;var i=e.__ob__;return e._isVue||i&&i.vmCount?n:i?(N(i.value,t,n),i.dep.notify(),n):(e[t]=n,n)}function R(e,t){if(Array.isArray(e)&&d(t))return void e.splice(t,1);var n=e.__ob__;e._isVue||n&&n.vmCount||m(e,t)&&(delete e[t],n&&n.dep.notify())}function L(e){for(var t=void 0,n=0,i=e.length;n<i;n++)t=e[n],t&&t.__ob__&&t.__ob__.dep.depend(),Array.isArray(t)&&L(t)}function z(e,t){if(!t)return e;for(var n,i,r,a=Object.keys(t),o=0;o<a.length;o++)n=a[o],i=e[n],r=t[n],m(e,n)?c(i)&&c(r)&&z(i,r):j(e,n,r);return e}function H(e,t,n){return n?function(){var i="function"==typeof t?t.call(n,n):t,r="function"==typeof e?e.call(n,n):e;return i?z(i,r):r}:t?e?function(){return z("function"==typeof t?t.call(this,this):t,"function"==typeof e?e.call(this,this):e)}:t:e}function W(e,t){return t?e?e.concat(t):Array.isArray(t)?t:[t]:e}function q(e,t,n,i){var r=Object.create(e||null);return t?_(r,t):r}function Y(e,t){var n=e.props;if(n){var i,r,a,o={};if(Array.isArray(n))for(i=n.length;i--;)"string"==typeof(r=n[i])&&(a=yi(r),o[a]={type:null});else if(c(n))for(var s in n)r=n[s],a=yi(s),o[a]=c(r)?r:{type:r};e.props=o}}function U(e,t){var n=e.inject;if(n){var i=e.inject={};if(Array.isArray(n))for(var r=0;r<n.length;r++)i[n[r]]={from:n[r]};else if(c(n))for(var a in n){var o=n[a];i[a]=c(o)?_({from:a},o):{from:o}}}}function K(e){var t=e.directives;if(t)for(var n in t){var i=t[n];"function"==typeof i&&(t[n]={bind:i,update:i})}}function G(e,t,n){function i(i){var r=rr[i]||sr;l[i]=r(e[i],t[i],n,i)}"function"==typeof t&&(t=t.options),Y(t,n),U(t,n),K(t);var r=t.extends;if(r&&(e=G(e,r,n)),t.mixins)for(var a=0,o=t.mixins.length;a<o;a++)e=G(e,t.mixins[a],n);var s,l={};for(s in e)i(s);for(s in t)m(e,s)||i(s);return l}function J(e,t,n,i){if("string"==typeof n){var r=e[t];if(m(r,n))return r[n];var a=yi(n);if(m(r,a))return r[a];var o=gi(a);if(m(r,o))return r[o];return r[n]||r[a]||r[o]}}function X(e,t,n,i){var r=t[e],a=!m(n,e),o=n[e];if(ee(Boolean,r.type)&&(a&&!m(r,"default")?o=!1:ee(String,r.type)||""!==o&&o!==_i(e)||(o=!0)),void 0===o){o=Q(i,r,e);var s=nr.shouldConvert;nr.shouldConvert=!0,E(o),nr.shouldConvert=s}return o}function Q(e,t,n){if(m(t,"default")){var i=t.default;return e&&e.$options.propsData&&void 0===e.$options.propsData[n]&&void 0!==e._props[n]?e._props[n]:"function"==typeof i&&"Function"!==Z(t.type)?i.call(e):i}}function Z(e){var t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:""}function ee(e,t){if(!Array.isArray(t))return Z(t)===Z(e);for(var n=0,i=t.length;n<i;n++)if(Z(t[n])===Z(e))return!0;return!1}function te(e,t,n){if(t)for(var i=t;i=i.$parent;){var r=i.$options.errorCaptured;if(r)for(var a=0;a<r.length;a++)try{var o=!1===r[a].call(i,e,t,n);if(o)return}catch(e){ne(e,i,"errorCaptured hook")}}ne(e,t,n)}function ne(e,t,n){if(Di.errorHandler)try{return Di.errorHandler.call(null,e,t,n)}catch(e){ie(e,null,"config.errorHandler")}ie(e,t,n)}function ie(e,t,n){if(!Oi&&!Ti||"undefined"==typeof console)throw e;console.error(e)}function re(){cr=!1;var e=lr.slice(0);lr.length=0;for(var t=0;t<e.length;t++)e[t]()}function ae(e){return e._withTask||(e._withTask=function(){ur=!0;var t=e.apply(null,arguments);return ur=!1,t})}function oe(e,t){var n;if(lr.push(function(){if(e)try{e.call(t)}catch(e){te(e,t,"nextTick")}else n&&n(t)}),cr||(cr=!0,ur?or():ar()),!e&&"undefined"!=typeof Promise)return new Promise(function(e){n=e})}function se(e){le(e,vr),vr.clear()}function le(e,t){var n,i,r=Array.isArray(e);if((r||l(e))&&!Object.isFrozen(e)){if(e.__ob__){var a=e.__ob__.dep.id;if(t.has(a))return;t.add(a)}if(r)for(n=e.length;n--;)le(e[n],t);else for(i=Object.keys(e),n=i.length;n--;)le(e[i[n]],t)}}function ce(e){function t(){var e=arguments,n=t.fns;if(!Array.isArray(n))return n.apply(null,arguments);for(var i=n.slice(),r=0;r<i.length;r++)i[r].apply(null,e)}return t.fns=e,t}function ue(e,t,n,r,a){var o,s,l,c;for(o in e)s=e[o],l=t[o],c=mr(o),i(s)||(i(l)?(i(s.fns)&&(s=e[o]=ce(s)),n(c.name,s,c.once,c.capture,c.passive,c.params)):s!==l&&(l.fns=s,e[o]=l));for(o in t)i(e[o])&&(c=mr(o),r(c.name,t[o],c.capture))}function de(e,t,n){function o(){n.apply(this,arguments),v(s.fns,o)}e instanceof Ji&&(e=e.data.hook||(e.data.hook={}));var s,l=e[t];i(l)?s=ce([o]):r(l.fns)&&a(l.merged)?(s=l,s.fns.push(o)):s=ce([l,o]),s.merged=!0,e[t]=s}function fe(e,t,n){var a=t.options.props;if(!i(a)){var o={},s=e.attrs,l=e.props;if(r(s)||r(l))for(var c in a){var u=_i(c);pe(o,l,c,u,!0)||pe(o,s,c,u,!1)}return o}}function pe(e,t,n,i,a){if(r(t)){if(m(t,n))return e[n]=t[n],a||delete t[n],!0;if(m(t,i))return e[n]=t[i],a||delete t[i],!0}return!1}function he(e){for(var t=0;t<e.length;t++)if(Array.isArray(e[t]))return Array.prototype.concat.apply([],e);return e}function ve(e){return s(e)?[P(e)]:Array.isArray(e)?ye(e):void 0}function me(e){return r(e)&&r(e.text)&&o(e.isComment)}function ye(e,t){var n,o,l,c,u=[];for(n=0;n<e.length;n++)o=e[n],i(o)||"boolean"==typeof o||(l=u.length-1,c=u[l],Array.isArray(o)?o.length>0&&(o=ye(o,(t||"")+"_"+n),me(o[0])&&me(c)&&(u[l]=P(c.text+o[0].text),o.shift()),u.push.apply(u,o)):s(o)?me(c)?u[l]=P(c.text+o):""!==o&&u.push(P(o)):me(o)&&me(c)?u[l]=P(c.text+o.text):(a(e._isVList)&&r(o.tag)&&i(o.key)&&r(t)&&(o.key="__vlist"+t+"_"+n+"__"),u.push(o)));return u}function ge(e,t){return(e.__esModule||qi&&"Module"===e[Symbol.toStringTag])&&(e=e.default),l(e)?t.extend(e):e}function be(e,t,n,i,r){var a=Qi();return a.asyncFactory=e,a.asyncMeta={data:t,context:n,children:i,tag:r},a}function _e(e,t,n){if(a(e.error)&&r(e.errorComp))return e.errorComp;if(r(e.resolved))return e.resolved;if(a(e.loading)&&r(e.loadingComp))return e.loadingComp;if(!r(e.contexts)){var o=e.contexts=[n],s=!0,c=function(){for(var e=0,t=o.length;e<t;e++)o[e].$forceUpdate()},u=S(function(n){e.resolved=ge(n,t),s||c()}),d=S(function(t){r(e.errorComp)&&(e.error=!0,c())}),f=e(u,d);return l(f)&&("function"==typeof f.then?i(e.resolved)&&f.then(u,d):r(f.component)&&"function"==typeof f.component.then&&(f.component.then(u,d),r(f.error)&&(e.errorComp=ge(f.error,t)),r(f.loading)&&(e.loadingComp=ge(f.loading,t),0===f.delay?e.loading=!0:setTimeout(function(){i(e.resolved)&&i(e.error)&&(e.loading=!0,c())},f.delay||200)),r(f.timeout)&&setTimeout(function(){i(e.resolved)&&d(null)},f.timeout))),s=!1,e.loading?e.loadingComp:e.resolved}e.contexts.push(n)}function we(e){return e.isComment&&e.asyncFactory}function ke(e){if(Array.isArray(e))for(var t=0;t<e.length;t++){var n=e[t];if(r(n)&&(r(n.componentOptions)||we(n)))return n}}function Ce(e){e._events=Object.create(null),e._hasHookEvent=!1;var t=e.$options._parentListeners;t&&De(e,t)}function xe(e,t,n){n?hr.$once(e,t):hr.$on(e,t)}function Se(e,t){hr.$off(e,t)}function De(e,t,n){hr=e,ue(t,n||{},xe,Se,e),hr=void 0}function $e(e,t){var n={};if(!e)return n;for(var i=0,r=e.length;i<r;i++){var a=e[i],o=a.data;if(o&&o.attrs&&o.attrs.slot&&delete o.attrs.slot,a.context!==t&&a.fnContext!==t||!o||null==o.slot)(n.default||(n.default=[])).push(a);else{var s=o.slot,l=n[s]||(n[s]=[]);"template"===a.tag?l.push.apply(l,a.children||[]):l.push(a)}}for(var c in n)n[c].every(Ae)&&delete n[c];return n}function Ae(e){return e.isComment&&!e.asyncFactory||" "===e.text}function Oe(e,t){t=t||{};for(var n=0;n<e.length;n++)Array.isArray(e[n])?Oe(e[n],t):t[e[n].key]=e[n].fn;return t}function Te(e){var t=e.$options,n=t.parent;if(n&&!t.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(e)}e.$parent=n,e.$root=n?n.$root:e,e.$children=[],e.$refs={},e._watcher=null,e._inactive=null,e._directInactive=!1,e._isMounted=!1,e._isDestroyed=!1,e._isBeingDestroyed=!1}function Me(e,t,n){e.$el=t,e.$options.render||(e.$options.render=Qi),Ie(e,"beforeMount");var i;return i=function(){e._update(e._render(),n)},new Sr(e,i,k,null,!0),n=!1,null==e.$vnode&&(e._isMounted=!0,Ie(e,"mounted")),e}function Pe(e,t,n,i,r){var a=!!(r||e.$options._renderChildren||i.data.scopedSlots||e.$scopedSlots!==fi);if(e.$options._parentVnode=i,e.$vnode=i,e._vnode&&(e._vnode.parent=i),e.$options._renderChildren=r,e.$attrs=i.data&&i.data.attrs||fi,e.$listeners=n||fi,t&&e.$options.props){nr.shouldConvert=!1;for(var o=e._props,s=e.$options._propKeys||[],l=0;l<s.length;l++){var c=s[l];o[c]=X(c,e.$options.props,t,e)}nr.shouldConvert=!0,e.$options.propsData=t}if(n){var u=e.$options._parentListeners;e.$options._parentListeners=n,De(e,n,u)}a&&(e.$slots=$e(r,i.context),e.$forceUpdate())}function Be(e){for(;e&&(e=e.$parent);)if(e._inactive)return!0;return!1}function Fe(e,t){if(t){if(e._directInactive=!1,Be(e))return}else if(e._directInactive)return;if(e._inactive||null===e._inactive){e._inactive=!1;for(var n=0;n<e.$children.length;n++)Fe(e.$children[n]);Ie(e,"activated")}}function Ve(e,t){if(!(t&&(e._directInactive=!0,Be(e))||e._inactive)){e._inactive=!0;for(var n=0;n<e.$children.length;n++)Ve(e.$children[n]);Ie(e,"deactivated")}}function Ie(e,t){var n=e.$options[t];if(n)for(var i=0,r=n.length;i<r;i++)try{n[i].call(e)}catch(n){te(n,e,t+" hook")}e._hasHookEvent&&e.$emit("hook:"+t)}function Ee(){Cr=gr.length=br.length=0,_r={},wr=kr=!1}function Ne(){kr=!0;var e,t;for(gr.sort(function(e,t){return e.id-t.id}),Cr=0;Cr<gr.length;Cr++)e=gr[Cr],t=e.id,_r[t]=null,e.run();var n=br.slice(),i=gr.slice();Ee(),Le(n),je(i),Wi&&Di.devtools&&Wi.emit("flush")}function je(e){for(var t=e.length;t--;){var n=e[t],i=n.vm;i._watcher===n&&i._isMounted&&Ie(i,"updated")}}function Re(e){e._inactive=!1,br.push(e)}function Le(e){for(var t=0;t<e.length;t++)e[t]._inactive=!0,Fe(e[t],!0)}function ze(e){var t=e.id;if(null==_r[t]){if(_r[t]=!0,kr){for(var n=gr.length-1;n>Cr&&gr[n].id>e.id;)n--;gr.splice(n+1,0,e)}else gr.push(e);wr||(wr=!0,oe(Ne))}}function He(e,t,n){Dr.get=function(){return this[t][n]},Dr.set=function(e){this[t][n]=e},Object.defineProperty(e,n,Dr)}function We(e){e._watchers=[];var t=e.$options;t.props&&qe(e,t.props),t.methods&&Xe(e,t.methods),t.data?Ye(e):E(e._data={},!0),t.computed&&Ke(e,t.computed),t.watch&&t.watch!==Ni&&Qe(e,t.watch)}function qe(e,t){var n=e.$options.propsData||{},i=e._props={},r=e.$options._propKeys=[],a=!e.$parent;nr.shouldConvert=a;for(var o in t)(function(a){r.push(a);var o=X(a,t,n,e);N(i,a,o),a in e||He(e,"_props",a)})(o);nr.shouldConvert=!0}function Ye(e){var t=e.$options.data;t=e._data="function"==typeof t?Ue(t,e):t||{},c(t)||(t={});for(var n=Object.keys(t),i=e.$options.props,r=(e.$options.methods,n.length);r--;){var a=n[r];i&&m(i,a)||D(a)||He(e,"_data",a)}E(t,!0)}function Ue(e,t){try{return e.call(t,t)}catch(e){return te(e,t,"data()"),{}}}function Ke(e,t){var n=e._computedWatchers=Object.create(null),i=Hi();for(var r in t){var a=t[r],o="function"==typeof a?a:a.get;i||(n[r]=new Sr(e,o||k,k,$r)),r in e||Ge(e,r,a)}}function Ge(e,t,n){var i=!Hi();"function"==typeof n?(Dr.get=i?Je(t):n,Dr.set=k):(Dr.get=n.get?i&&!1!==n.cache?Je(t):n.get:k,Dr.set=n.set?n.set:k),Object.defineProperty(e,t,Dr)}function Je(e){return function(){var t=this._computedWatchers&&this._computedWatchers[e];if(t)return t.dirty&&t.evaluate(),Ki.target&&t.depend(),t.value}}function Xe(e,t){e.$options.props;for(var n in t)e[n]=null==t[n]?k:g(t[n],e)}function Qe(e,t){for(var n in t){var i=t[n];if(Array.isArray(i))for(var r=0;r<i.length;r++)Ze(e,n,i[r]);else Ze(e,n,i)}}function Ze(e,t,n,i){return c(n)&&(i=n,n=n.handler),"string"==typeof n&&(n=e[n]),e.$watch(t,n,i)}function et(e){var t=e.$options.provide;t&&(e._provided="function"==typeof t?t.call(e):t)}function tt(e){var t=nt(e.$options.inject,e);t&&(nr.shouldConvert=!1,Object.keys(t).forEach(function(n){N(e,n,t[n])}),nr.shouldConvert=!0)}function nt(e,t){if(e){for(var n=Object.create(null),i=qi?Reflect.ownKeys(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}):Object.keys(e),r=0;r<i.length;r++){for(var a=i[r],o=e[a].from,s=t;s;){if(s._provided&&o in s._provided){n[a]=s._provided[o];break}s=s.$parent}if(!s&&"default"in e[a]){var l=e[a].default;n[a]="function"==typeof l?l.call(t):l}}return n}}function it(e,t){var n,i,a,o,s;if(Array.isArray(e)||"string"==typeof e)for(n=new Array(e.length),i=0,a=e.length;i<a;i++)n[i]=t(e[i],i);else if("number"==typeof e)for(n=new Array(e),i=0;i<e;i++)n[i]=t(i+1,i);else if(l(e))for(o=Object.keys(e),n=new Array(o.length),i=0,a=o.length;i<a;i++)s=o[i],n[i]=t(e[s],s,i);return r(n)&&(n._isVList=!0),n}function rt(e,t,n,i){var r,a=this.$scopedSlots[e];if(a)n=n||{},i&&(n=_(_({},i),n)),r=a(n)||t;else{var o=this.$slots[e];o&&(o._rendered=!0),r=o||t}var s=n&&n.slot;return s?this.$createElement("template",{slot:s},r):r}function at(e){return J(this.$options,"filters",e,!0)||ki}function ot(e,t,n,i){var r=Di.keyCodes[t]||n;return r?Array.isArray(r)?-1===r.indexOf(e):r!==e:i?_i(i)!==t:void 0}function st(e,t,n,i,r){if(n)if(l(n)){Array.isArray(n)&&(n=w(n));var a;for(var o in n)(function(o){if("class"===o||"style"===o||hi(o))a=e;else{var s=e.attrs&&e.attrs.type;a=i||Di.mustUseProp(t,s,o)?e.domProps||(e.domProps={}):e.attrs||(e.attrs={})}if(!(o in a)&&(a[o]=n[o],r)){(e.on||(e.on={}))["update:"+o]=function(e){n[o]=e}}})(o)}else;return e}function lt(e,t){var n=this._staticTrees||(this._staticTrees=[]),i=n[e];return i&&!t?Array.isArray(i)?F(i):B(i):(i=n[e]=this.$options.staticRenderFns[e].call(this._renderProxy,null,this),ut(i,"__static__"+e,!1),i)}function ct(e,t,n){return ut(e,"__once__"+t+(n?"_"+n:""),!0),e}function ut(e,t,n){if(Array.isArray(e))for(var i=0;i<e.length;i++)e[i]&&"string"!=typeof e[i]&&dt(e[i],t+"_"+i,n);else dt(e,t,n)}function dt(e,t,n){e.isStatic=!0,e.key=t,e.isOnce=n}function ft(e,t){if(t)if(c(t)){var n=e.on=e.on?_({},e.on):{};for(var i in t){var r=n[i],a=t[i];n[i]=r?[].concat(r,a):a}}else;return e}function pt(e){e._o=ct,e._n=p,e._s=f,e._l=it,e._t=rt,e._q=C,e._i=x,e._m=lt,e._f=at,e._k=ot,e._b=st,e._v=P,e._e=Qi,e._u=Oe,e._g=ft}function ht(e,t,n,i,r){var o=r.options;this.data=e,this.props=t,this.children=n,this.parent=i,this.listeners=e.on||fi,this.injections=nt(o.inject,i),this.slots=function(){return $e(n,i)};var s=Object.create(i),l=a(o._compiled),c=!l;l&&(this.$options=o,this.$slots=this.slots(),this.$scopedSlots=e.scopedSlots||fi),o._scopeId?this._c=function(e,t,n,r){var a=kt(s,e,t,n,r,c);return a&&(a.fnScopeId=o._scopeId,a.fnContext=i),a}:this._c=function(e,t,n,i){return kt(s,e,t,n,i,c)}}function vt(e,t,n,i,a){var o=e.options,s={},l=o.props;if(r(l))for(var c in l)s[c]=X(c,l,t||fi);else r(n.attrs)&&mt(s,n.attrs),r(n.props)&&mt(s,n.props);var u=new ht(n,s,a,i,e),d=o.render.call(null,u._c,u);return d instanceof Ji&&(d.fnContext=i,d.fnOptions=o,n.slot&&((d.data||(d.data={})).slot=n.slot)),d}function mt(e,t){for(var n in t)e[yi(n)]=t[n]}function yt(e,t,n,o,s){if(!i(e)){var c=n.$options._base;if(l(e)&&(e=c.extend(e)),"function"==typeof e){var u;if(i(e.cid)&&(u=e,void 0===(e=_e(u,c,n))))return be(u,t,n,o,s);t=t||{},$t(e),r(t.model)&&wt(e.options,t);var d=fe(t,e,s);if(a(e.options.functional))return vt(e,d,t,n,o);var f=t.on;if(t.on=t.nativeOn,a(e.options.abstract)){var p=t.slot;t={},p&&(t.slot=p)}bt(t);var h=e.options.name||s;return new Ji("vue-component-"+e.cid+(h?"-"+h:""),t,void 0,void 0,void 0,n,{Ctor:e,propsData:d,listeners:f,tag:s,children:o},u)}}}function gt(e,t,n,i){var a={_isComponent:!0,parent:t,_parentVnode:e,_parentElm:n||null,_refElm:i||null},o=e.data.inlineTemplate;return r(o)&&(a.render=o.render,a.staticRenderFns=o.staticRenderFns),new e.componentOptions.Ctor(a)}function bt(e){e.hook||(e.hook={});for(var t=0;t<Or.length;t++){var n=Or[t],i=e.hook[n],r=Ar[n];e.hook[n]=i?_t(r,i):r}}function _t(e,t){return function(n,i,r,a){e(n,i,r,a),t(n,i,r,a)}}function wt(e,t){var n=e.model&&e.model.prop||"value",i=e.model&&e.model.event||"input";(t.props||(t.props={}))[n]=t.model.value;var a=t.on||(t.on={});r(a[i])?a[i]=[t.model.callback].concat(a[i]):a[i]=t.model.callback}function kt(e,t,n,i,r,o){return(Array.isArray(n)||s(n))&&(r=i,i=n,n=void 0),a(o)&&(r=Mr),Ct(e,t,n,i,r)}function Ct(e,t,n,i,a){if(r(n)&&r(n.__ob__))return Qi();if(r(n)&&r(n.is)&&(t=n.is),!t)return Qi();Array.isArray(i)&&"function"==typeof i[0]&&(n=n||{},n.scopedSlots={default:i[0]},i.length=0),a===Mr?i=ve(i):a===Tr&&(i=he(i));var o,s;if("string"==typeof t){var l;s=e.$vnode&&e.$vnode.ns||Di.getTagNamespace(t),o=Di.isReservedTag(t)?new Ji(Di.parsePlatformTagName(t),n,i,void 0,void 0,e):r(l=J(e.$options,"components",t))?yt(l,n,e,i,t):new Ji(t,n,i,void 0,void 0,e)}else o=yt(t,n,e,i);return r(o)?(s&&xt(o,s),o):Qi()}function xt(e,t,n){if(e.ns=t,"foreignObject"===e.tag&&(t=void 0,n=!0),r(e.children))for(var o=0,s=e.children.length;o<s;o++){var l=e.children[o];r(l.tag)&&(i(l.ns)||a(n))&&xt(l,t,n)}}function St(e){e._vnode=null,e._staticTrees=null;var t=e.$options,n=e.$vnode=t._parentVnode,i=n&&n.context;e.$slots=$e(t._renderChildren,i),e.$scopedSlots=fi,e._c=function(t,n,i,r){return kt(e,t,n,i,r,!1)},e.$createElement=function(t,n,i,r){return kt(e,t,n,i,r,!0)};var r=n&&n.data;N(e,"$attrs",r&&r.attrs||fi,null,!0),N(e,"$listeners",t._parentListeners||fi,null,!0)}function Dt(e,t){var n=e.$options=Object.create(e.constructor.options),i=t._parentVnode;n.parent=t.parent,n._parentVnode=i,n._parentElm=t._parentElm,n._refElm=t._refElm;var r=i.componentOptions;n.propsData=r.propsData,n._parentListeners=r.listeners,n._renderChildren=r.children,n._componentTag=r.tag,t.render&&(n.render=t.render,n.staticRenderFns=t.staticRenderFns)}function $t(e){var t=e.options;if(e.super){var n=$t(e.super);if(n!==e.superOptions){e.superOptions=n;var i=At(e);i&&_(e.extendOptions,i),t=e.options=G(n,e.extendOptions),t.name&&(t.components[t.name]=e)}}return t}function At(e){var t,n=e.options,i=e.extendOptions,r=e.sealedOptions;for(var a in n)n[a]!==r[a]&&(t||(t={}),t[a]=Ot(n[a],i[a],r[a]));return t}function Ot(e,t,n){if(Array.isArray(e)){var i=[];n=Array.isArray(n)?n:[n],t=Array.isArray(t)?t:[t];for(var r=0;r<e.length;r++)(t.indexOf(e[r])>=0||n.indexOf(e[r])<0)&&i.push(e[r]);return i}return e}function Tt(e){this._init(e)}function Mt(e){e.use=function(e){var t=this._installedPlugins||(this._installedPlugins=[]);if(t.indexOf(e)>-1)return this;var n=b(arguments,1);return n.unshift(this),"function"==typeof e.install?e.install.apply(e,n):"function"==typeof e&&e.apply(null,n),t.push(e),this}}function Pt(e){e.mixin=function(e){return this.options=G(this.options,e),this}}function Bt(e){e.cid=0;var t=1;e.extend=function(e){e=e||{};var n=this,i=n.cid,r=e._Ctor||(e._Ctor={});if(r[i])return r[i];var a=e.name||n.options.name,o=function(e){this._init(e)};return o.prototype=Object.create(n.prototype),o.prototype.constructor=o,o.cid=t++,o.options=G(n.options,e),o.super=n,o.options.props&&Ft(o),o.options.computed&&Vt(o),o.extend=n.extend,o.mixin=n.mixin,o.use=n.use,xi.forEach(function(e){o[e]=n[e]}),a&&(o.options.components[a]=o),o.superOptions=n.options,o.extendOptions=e,o.sealedOptions=_({},o.options),r[i]=o,o}}function Ft(e){var t=e.options.props;for(var n in t)He(e.prototype,"_props",n)}function Vt(e){var t=e.options.computed;for(var n in t)Ge(e.prototype,n,t[n])}function It(e){xi.forEach(function(t){e[t]=function(e,n){return n?("component"===t&&c(n)&&(n.name=n.name||e,n=this.options._base.extend(n)),"directive"===t&&"function"==typeof n&&(n={bind:n,update:n}),this.options[t+"s"][e]=n,n):this.options[t+"s"][e]}})}function Et(e){return e&&(e.Ctor.options.name||e.tag)}function Nt(e,t){return Array.isArray(e)?e.indexOf(t)>-1:"string"==typeof e?e.split(",").indexOf(t)>-1:!!u(e)&&e.test(t)}function jt(e,t){var n=e.cache,i=e.keys,r=e._vnode;for(var a in n){var o=n[a];if(o){var s=Et(o.componentOptions);s&&!t(s)&&Rt(n,a,i,r)}}}function Rt(e,t,n,i){var r=e[t];!r||i&&r.tag===i.tag||r.componentInstance.$destroy(),e[t]=null,v(n,t)}function Lt(e){for(var t=e.data,n=e,i=e;r(i.componentInstance);)(i=i.componentInstance._vnode)&&i.data&&(t=zt(i.data,t));for(;r(n=n.parent);)n&&n.data&&(t=zt(t,n.data));return Ht(t.staticClass,t.class)}function zt(e,t){return{staticClass:Wt(e.staticClass,t.staticClass),class:r(e.class)?[e.class,t.class]:t.class}}function Ht(e,t){return r(e)||r(t)?Wt(e,qt(t)):""}function Wt(e,t){return e?t?e+" "+t:e:t||""}function qt(e){return Array.isArray(e)?Yt(e):l(e)?Ut(e):"string"==typeof e?e:""}function Yt(e){for(var t,n="",i=0,a=e.length;i<a;i++)r(t=qt(e[i]))&&""!==t&&(n&&(n+=" "),n+=t);return n}function Ut(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}function Kt(e){return Gr(e)?"svg":"math"===e?"math":void 0}function Gt(e){if(!Oi)return!0;if(Jr(e))return!1;if(e=e.toLowerCase(),null!=Xr[e])return Xr[e];var t=document.createElement(e);return e.indexOf("-")>-1?Xr[e]=t.constructor===window.HTMLUnknownElement||t.constructor===window.HTMLElement:Xr[e]=/HTMLUnknownElement/.test(t.toString())}function Jt(e){if("string"==typeof e){var t=document.querySelector(e);return t||document.createElement("div")}return e}function Xt(e,t){var n=document.createElement(e);return"select"!==e?n:(t.data&&t.data.attrs&&void 0!==t.data.attrs.multiple&&n.setAttribute("multiple","multiple"),n)}function Qt(e,t){return document.createElementNS(Ur[e],t)}function Zt(e){return document.createTextNode(e)}function en(e){return document.createComment(e)}function tn(e,t,n){e.insertBefore(t,n)}function nn(e,t){e.removeChild(t)}function rn(e,t){e.appendChild(t)}function an(e){return e.parentNode}function on(e){return e.nextSibling}function sn(e){return e.tagName}function ln(e,t){e.textContent=t}function cn(e,t,n){e.setAttribute(t,n)}function un(e,t){var n=e.data.ref;if(n){var i=e.context,r=e.componentInstance||e.elm,a=i.$refs;t?Array.isArray(a[n])?v(a[n],r):a[n]===r&&(a[n]=void 0):e.data.refInFor?Array.isArray(a[n])?a[n].indexOf(r)<0&&a[n].push(r):a[n]=[r]:a[n]=r}}function dn(e,t){return e.key===t.key&&(e.tag===t.tag&&e.isComment===t.isComment&&r(e.data)===r(t.data)&&fn(e,t)||a(e.isAsyncPlaceholder)&&e.asyncFactory===t.asyncFactory&&i(t.asyncFactory.error))}function fn(e,t){if("input"!==e.tag)return!0;var n,i=r(n=e.data)&&r(n=n.attrs)&&n.type,a=r(n=t.data)&&r(n=n.attrs)&&n.type;return i===a||Qr(i)&&Qr(a)}function pn(e,t,n){var i,a,o={};for(i=t;i<=n;++i)a=e[i].key,r(a)&&(o[a]=i);return o}function hn(e,t){(e.data.directives||t.data.directives)&&vn(e,t)}function vn(e,t){var n,i,r,a=e===ta,o=t===ta,s=mn(e.data.directives,e.context),l=mn(t.data.directives,t.context),c=[],u=[];for(n in l)i=s[n],r=l[n],i?(r.oldValue=i.value,gn(r,"update",t,e),r.def&&r.def.componentUpdated&&u.push(r)):(gn(r,"bind",t,e),r.def&&r.def.inserted&&c.push(r));if(c.length){var d=function(){for(var n=0;n<c.length;n++)gn(c[n],"inserted",t,e)};a?de(t,"insert",d):d()}if(u.length&&de(t,"postpatch",function(){for(var n=0;n<u.length;n++)gn(u[n],"componentUpdated",t,e)}),!a)for(n in s)l[n]||gn(s[n],"unbind",e,e,o)}function mn(e,t){var n=Object.create(null);if(!e)return n;var i,r;for(i=0;i<e.length;i++)r=e[i],r.modifiers||(r.modifiers=ra),n[yn(r)]=r,r.def=J(t.$options,"directives",r.name,!0);return n}function yn(e){return e.rawName||e.name+"."+Object.keys(e.modifiers||{}).join(".")}function gn(e,t,n,i,r){var a=e.def&&e.def[t];if(a)try{a(n.elm,e,n,i,r)}catch(i){te(i,n.context,"directive "+e.name+" "+t+" hook")}}function bn(e,t){var n=t.componentOptions;if(!(r(n)&&!1===n.Ctor.options.inheritAttrs||i(e.data.attrs)&&i(t.data.attrs))){var a,o,s=t.elm,l=e.data.attrs||{},c=t.data.attrs||{};r(c.__ob__)&&(c=t.data.attrs=_({},c));for(a in c)o=c[a],l[a]!==o&&_n(s,a,o);(Bi||Vi)&&c.value!==l.value&&_n(s,"value",c.value);for(a in l)i(c[a])&&(Wr(a)?s.removeAttributeNS(Hr,qr(a)):Lr(a)||s.removeAttribute(a))}}function _n(e,t,n){if(zr(t))Yr(n)?e.removeAttribute(t):(n="allowfullscreen"===t&&"EMBED"===e.tagName?"true":t,e.setAttribute(t,n));else if(Lr(t))e.setAttribute(t,Yr(n)||"false"===n?"false":"true");else if(Wr(t))Yr(n)?e.removeAttributeNS(Hr,qr(t)):e.setAttributeNS(Hr,t,n);else if(Yr(n))e.removeAttribute(t);else{if(Bi&&!Fi&&"TEXTAREA"===e.tagName&&"placeholder"===t&&!e.__ieph){var i=function(t){t.stopImmediatePropagation(),e.removeEventListener("input",i)};e.addEventListener("input",i),e.__ieph=!0}e.setAttribute(t,n)}}function wn(e,t){var n=t.elm,a=t.data,o=e.data;if(!(i(a.staticClass)&&i(a.class)&&(i(o)||i(o.staticClass)&&i(o.class)))){var s=Lt(t),l=n._transitionClasses;r(l)&&(s=Wt(s,qt(l))),s!==n._prevClass&&(n.setAttribute("class",s),n._prevClass=s)}}function kn(e){if(r(e[la])){var t=Bi?"change":"input";e[t]=[].concat(e[la],e[t]||[]),delete e[la]}r(e[ca])&&(e.change=[].concat(e[ca],e.change||[]),delete e[ca])}function Cn(e,t,n){var i=Ir;return function r(){null!==e.apply(null,arguments)&&Sn(t,r,n,i)}}function xn(e,t,n,i,r){t=ae(t),n&&(t=Cn(t,e,i)),Ir.addEventListener(e,t,ji?{capture:i,passive:r}:i)}function Sn(e,t,n,i){(i||Ir).removeEventListener(e,t._withTask||t,n)}function Dn(e,t){if(!i(e.data.on)||!i(t.data.on)){var n=t.data.on||{},r=e.data.on||{};Ir=t.elm,kn(n),ue(n,r,xn,Sn,t.context),Ir=void 0}}function $n(e,t){if(!i(e.data.domProps)||!i(t.data.domProps)){var n,a,o=t.elm,s=e.data.domProps||{},l=t.data.domProps||{};r(l.__ob__)&&(l=t.data.domProps=_({},l));for(n in s)i(l[n])&&(o[n]="");for(n in l){if(a=l[n],"textContent"===n||"innerHTML"===n){if(t.children&&(t.children.length=0),a===s[n])continue;1===o.childNodes.length&&o.removeChild(o.childNodes[0])}if("value"===n){o._value=a;var c=i(a)?"":String(a);An(o,c)&&(o.value=c)}else o[n]=a}}}function An(e,t){return!e.composing&&("OPTION"===e.tagName||On(e,t)||Tn(e,t))}function On(e,t){var n=!0;try{n=document.activeElement!==e}catch(e){}return n&&e.value!==t}function Tn(e,t){var n=e.value,i=e._vModifiers;if(r(i)){if(i.lazy)return!1;if(i.number)return p(n)!==p(t);if(i.trim)return n.trim()!==t.trim()}return n!==t}function Mn(e){var t=Pn(e.style);return e.staticStyle?_(e.staticStyle,t):t}function Pn(e){return Array.isArray(e)?w(e):"string"==typeof e?fa(e):e}function Bn(e,t){var n,i={};if(t)for(var r=e;r.componentInstance;)(r=r.componentInstance._vnode)&&r.data&&(n=Mn(r.data))&&_(i,n);(n=Mn(e.data))&&_(i,n);for(var a=e;a=a.parent;)a.data&&(n=Mn(a.data))&&_(i,n);return i}function Fn(e,t){var n=t.data,a=e.data;if(!(i(n.staticStyle)&&i(n.style)&&i(a.staticStyle)&&i(a.style))){var o,s,l=t.elm,c=a.staticStyle,u=a.normalizedStyle||a.style||{},d=c||u,f=Pn(t.data.style)||{};t.data.normalizedStyle=r(f.__ob__)?_({},f):f;var p=Bn(t,!0);for(s in d)i(p[s])&&va(l,s,"");for(s in p)(o=p[s])!==d[s]&&va(l,s,null==o?"":o)}}function Vn(e,t){if(t&&(t=t.trim()))if(e.classList)t.indexOf(" ")>-1?t.split(/\s+/).forEach(function(t){return e.classList.add(t)}):e.classList.add(t);else{var n=" "+(e.getAttribute("class")||"")+" ";n.indexOf(" "+t+" ")<0&&e.setAttribute("class",(n+t).trim())}}function In(e,t){if(t&&(t=t.trim()))if(e.classList)t.indexOf(" ")>-1?t.split(/\s+/).forEach(function(t){return e.classList.remove(t)}):e.classList.remove(t),e.classList.length||e.removeAttribute("class");else{for(var n=" "+(e.getAttribute("class")||"")+" ",i=" "+t+" ";n.indexOf(i)>=0;)n=n.replace(i," ");n=n.trim(),n?e.setAttribute("class",n):e.removeAttribute("class")}}function En(e){if(e){if("object"==typeof e){var t={};return!1!==e.css&&_(t,ba(e.name||"v")),_(t,e),t}return"string"==typeof e?ba(e):void 0}}function Nn(e){$a(function(){$a(e)})}function jn(e,t){var n=e._transitionClasses||(e._transitionClasses=[]);n.indexOf(t)<0&&(n.push(t),Vn(e,t))}function Rn(e,t){e._transitionClasses&&v(e._transitionClasses,t),In(e,t)}function Ln(e,t,n){var i=zn(e,t),r=i.type,a=i.timeout,o=i.propCount;if(!r)return n();var s=r===wa?xa:Da,l=0,c=function(){e.removeEventListener(s,u),n()},u=function(t){t.target===e&&++l>=o&&c()};setTimeout(function(){l<o&&c()},a+1),e.addEventListener(s,u)}function zn(e,t){var n,i=window.getComputedStyle(e),r=i[Ca+"Delay"].split(", "),a=i[Ca+"Duration"].split(", "),o=Hn(r,a),s=i[Sa+"Delay"].split(", "),l=i[Sa+"Duration"].split(", "),c=Hn(s,l),u=0,d=0;return t===wa?o>0&&(n=wa,u=o,d=a.length):t===ka?c>0&&(n=ka,u=c,d=l.length):(u=Math.max(o,c),n=u>0?o>c?wa:ka:null,d=n?n===wa?a.length:l.length:0),{type:n,timeout:u,propCount:d,hasTransform:n===wa&&Aa.test(i[Ca+"Property"])}}function Hn(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max.apply(null,t.map(function(t,n){return Wn(t)+Wn(e[n])}))}function Wn(e){return 1e3*Number(e.slice(0,-1))}function qn(e,t){var n=e.elm;r(n._leaveCb)&&(n._leaveCb.cancelled=!0,n._leaveCb());var a=En(e.data.transition);if(!i(a)&&!r(n._enterCb)&&1===n.nodeType){for(var o=a.css,s=a.type,c=a.enterClass,u=a.enterToClass,d=a.enterActiveClass,f=a.appearClass,h=a.appearToClass,v=a.appearActiveClass,m=a.beforeEnter,y=a.enter,g=a.afterEnter,b=a.enterCancelled,_=a.beforeAppear,w=a.appear,k=a.afterAppear,C=a.appearCancelled,x=a.duration,D=yr,$=yr.$vnode;$&&$.parent;)$=$.parent,D=$.context;var A=!D._isMounted||!e.isRootInsert;if(!A||w||""===w){var O=A&&f?f:c,T=A&&v?v:d,M=A&&h?h:u,P=A?_||m:m,B=A&&"function"==typeof w?w:y,F=A?k||g:g,V=A?C||b:b,I=p(l(x)?x.enter:x),E=!1!==o&&!Fi,N=Kn(B),j=n._enterCb=S(function(){E&&(Rn(n,M),Rn(n,T)),j.cancelled?(E&&Rn(n,O),V&&V(n)):F&&F(n),n._enterCb=null});e.data.show||de(e,"insert",function(){var t=n.parentNode,i=t&&t._pending&&t._pending[e.key];i&&i.tag===e.tag&&i.elm._leaveCb&&i.elm._leaveCb(),B&&B(n,j)}),P&&P(n),E&&(jn(n,O),jn(n,T),Nn(function(){jn(n,M),Rn(n,O),j.cancelled||N||(Un(I)?setTimeout(j,I):Ln(n,s,j))})),e.data.show&&(t&&t(),B&&B(n,j)),E||N||j()}}}function Yn(e,t){function n(){C.cancelled||(e.data.show||((a.parentNode._pending||(a.parentNode._pending={}))[e.key]=e),h&&h(a),_&&(jn(a,u),jn(a,f),Nn(function(){jn(a,d),Rn(a,u),C.cancelled||w||(Un(k)?setTimeout(C,k):Ln(a,c,C))})),v&&v(a,C),_||w||C())}var a=e.elm;r(a._enterCb)&&(a._enterCb.cancelled=!0,a._enterCb());var o=En(e.data.transition);if(i(o)||1!==a.nodeType)return t();if(!r(a._leaveCb)){var s=o.css,c=o.type,u=o.leaveClass,d=o.leaveToClass,f=o.leaveActiveClass,h=o.beforeLeave,v=o.leave,m=o.afterLeave,y=o.leaveCancelled,g=o.delayLeave,b=o.duration,_=!1!==s&&!Fi,w=Kn(v),k=p(l(b)?b.leave:b),C=a._leaveCb=S(function(){a.parentNode&&a.parentNode._pending&&(a.parentNode._pending[e.key]=null),_&&(Rn(a,d),Rn(a,f)),C.cancelled?(_&&Rn(a,u),y&&y(a)):(t(),m&&m(a)),a._leaveCb=null});g?g(n):n()}}function Un(e){return"number"==typeof e&&!isNaN(e)}function Kn(e){if(i(e))return!1;var t=e.fns;return r(t)?Kn(Array.isArray(t)?t[0]:t):(e._length||e.length)>1}function Gn(e,t){!0!==t.data.show&&qn(t)}function Jn(e,t,n){Xn(e,t,n),(Bi||Vi)&&setTimeout(function(){Xn(e,t,n)},0)}function Xn(e,t,n){var i=t.value,r=e.multiple;if(!r||Array.isArray(i)){for(var a,o,s=0,l=e.options.length;s<l;s++)if(o=e.options[s],r)a=x(i,Zn(o))>-1,o.selected!==a&&(o.selected=a);else if(C(Zn(o),i))return void(e.selectedIndex!==s&&(e.selectedIndex=s));r||(e.selectedIndex=-1)}}function Qn(e,t){return t.every(function(t){return!C(t,e)})}function Zn(e){return"_value"in e?e._value:e.value}function ei(e){e.target.composing=!0}function ti(e){e.target.composing&&(e.target.composing=!1,ni(e.target,"input"))}function ni(e,t){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}function ii(e){return!e.componentInstance||e.data&&e.data.transition?e:ii(e.componentInstance._vnode)}function ri(e){var t=e&&e.componentOptions;return t&&t.Ctor.options.abstract?ri(ke(t.children)):e}function ai(e){var t={},n=e.$options;for(var i in n.propsData)t[i]=e[i];var r=n._parentListeners;for(var a in r)t[yi(a)]=r[a];return t}function oi(e,t){if(/\d-keep-alive$/.test(t.tag))return e("keep-alive",{props:t.componentOptions.propsData})}function si(e){for(;e=e.parent;)if(e.data.transition)return!0}function li(e,t){return t.key===e.key&&t.tag===e.tag}function ci(e){e.elm._moveCb&&e.elm._moveCb(),e.elm._enterCb&&e.elm._enterCb()}function ui(e){e.data.newPos=e.elm.getBoundingClientRect()}function di(e){var t=e.data.pos,n=e.data.newPos,i=t.left-n.left,r=t.top-n.top;if(i||r){e.data.moved=!0;var a=e.elm.style;a.transform=a.WebkitTransform="translate("+i+"px,"+r+"px)",a.transitionDuration="0s"}}var fi=Object.freeze({}),pi=Object.prototype.toString,hi=(h("slot,component",!0),h("key,ref,slot,slot-scope,is")),vi=Object.prototype.hasOwnProperty,mi=/-(\w)/g,yi=y(function(e){return e.replace(mi,function(e,t){return t?t.toUpperCase():""})}),gi=y(function(e){return e.charAt(0).toUpperCase()+e.slice(1)}),bi=/\B([A-Z])/g,_i=y(function(e){return e.replace(bi,"-$1").toLowerCase()}),wi=function(e,t,n){return!1},ki=function(e){return e},Ci="data-server-rendered",xi=["component","directive","filter"],Si=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured"],Di={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:wi,isReservedAttr:wi,isUnknownElement:wi,getTagNamespace:k,parsePlatformTagName:ki,mustUseProp:wi,_lifecycleHooks:Si},$i=/[^\w.$]/,Ai="__proto__"in{},Oi="undefined"!=typeof window,Ti="undefined"!=typeof WXEnvironment&&!!WXEnvironment.platform,Mi=Ti&&WXEnvironment.platform.toLowerCase(),Pi=Oi&&window.navigator.userAgent.toLowerCase(),Bi=Pi&&/msie|trident/.test(Pi),Fi=Pi&&Pi.indexOf("msie 9.0")>0,Vi=Pi&&Pi.indexOf("edge/")>0,Ii=Pi&&Pi.indexOf("android")>0||"android"===Mi,Ei=Pi&&/iphone|ipad|ipod|ios/.test(Pi)||"ios"===Mi,Ni=(Pi&&/chrome\/\d+/.test(Pi),{}.watch),ji=!1;if(Oi)try{var Ri={};Object.defineProperty(Ri,"passive",{get:function(){ji=!0}}),window.addEventListener("test-passive",null,Ri)}catch(e){}var Li,zi,Hi=function(){return void 0===Li&&(Li=!Oi&&void 0!==e&&"server"===e.process.env.VUE_ENV),Li},Wi=Oi&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__,qi="undefined"!=typeof Symbol&&O(Symbol)&&"undefined"!=typeof Reflect&&O(Reflect.ownKeys);zi="undefined"!=typeof Set&&O(Set)?Set:function(){function e(){this.set=Object.create(null)}return e.prototype.has=function(e){return!0===this.set[e]},e.prototype.add=function(e){this.set[e]=!0},e.prototype.clear=function(){this.set=Object.create(null)},e}();var Yi=k,Ui=0,Ki=function(){this.id=Ui++,this.subs=[]};Ki.prototype.addSub=function(e){this.subs.push(e)},Ki.prototype.removeSub=function(e){v(this.subs,e)},Ki.prototype.depend=function(){Ki.target&&Ki.target.addDep(this)},Ki.prototype.notify=function(){for(var e=this.subs.slice(),t=0,n=e.length;t<n;t++)e[t].update()},Ki.target=null;var Gi=[],Ji=function(e,t,n,i,r,a,o,s){this.tag=e,this.data=t,this.children=n,this.text=i,this.elm=r,this.ns=void 0,this.context=a,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=t&&t.key,this.componentOptions=o,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=s,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1},Xi={child:{configurable:!0}};Xi.child.get=function(){return this.componentInstance},Object.defineProperties(Ji.prototype,Xi);var Qi=function(e){void 0===e&&(e="");var t=new Ji;return t.text=e,t.isComment=!0,t},Zi=Array.prototype,er=Object.create(Zi);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(e){var t=Zi[e];$(er,e,function(){for(var n=[],i=arguments.length;i--;)n[i]=arguments[i];var r,a=t.apply(this,n),o=this.__ob__;switch(e){case"push":case"unshift":r=n;break;case"splice":r=n.slice(2)}return r&&o.observeArray(r),o.dep.notify(),a})});var tr=Object.getOwnPropertyNames(er),nr={shouldConvert:!0},ir=function(e){if(this.value=e,this.dep=new Ki,this.vmCount=0,$(e,"__ob__",this),Array.isArray(e)){(Ai?V:I)(e,er,tr),this.observeArray(e)}else this.walk(e)};ir.prototype.walk=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)N(e,t[n],e[t[n]])},ir.prototype.observeArray=function(e){for(var t=0,n=e.length;t<n;t++)E(e[t])};var rr=Di.optionMergeStrategies;rr.data=function(e,t,n){return n?H(e,t,n):t&&"function"!=typeof t?e:H(e,t)},Si.forEach(function(e){rr[e]=W}),xi.forEach(function(e){rr[e+"s"]=q}),rr.watch=function(e,t,n,i){if(e===Ni&&(e=void 0),t===Ni&&(t=void 0),!t)return Object.create(e||null);if(!e)return t;var r={};_(r,e);for(var a in t){var o=r[a],s=t[a];o&&!Array.isArray(o)&&(o=[o]),r[a]=o?o.concat(s):Array.isArray(s)?s:[s]}return r},rr.props=rr.methods=rr.inject=rr.computed=function(e,t,n,i){if(!e)return t;var r=Object.create(null);return _(r,e),t&&_(r,t),r},rr.provide=H;var ar,or,sr=function(e,t){return void 0===t?e:t},lr=[],cr=!1,ur=!1;if(void 0!==n&&O(n))or=function(){n(re)};else if("undefined"==typeof MessageChannel||!O(MessageChannel)&&"[object MessageChannelConstructor]"!==MessageChannel.toString())or=function(){setTimeout(re,0)};else{var dr=new MessageChannel,fr=dr.port2;dr.port1.onmessage=re,or=function(){fr.postMessage(1)}}if("undefined"!=typeof Promise&&O(Promise)){var pr=Promise.resolve();ar=function(){pr.then(re),Ei&&setTimeout(k)}}else ar=or;var hr,vr=new zi,mr=y(function(e){var t="&"===e.charAt(0);e=t?e.slice(1):e;var n="~"===e.charAt(0);e=n?e.slice(1):e;var i="!"===e.charAt(0);return e=i?e.slice(1):e,{name:e,once:n,capture:i,passive:t}}),yr=null,gr=[],br=[],_r={},wr=!1,kr=!1,Cr=0,xr=0,Sr=function(e,t,n,i,r){this.vm=e,r&&(e._watcher=this),e._watchers.push(this),i?(this.deep=!!i.deep,this.user=!!i.user,this.lazy=!!i.lazy,this.sync=!!i.sync):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++xr,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new zi,this.newDepIds=new zi,this.expression="","function"==typeof t?this.getter=t:(this.getter=A(t),this.getter||(this.getter=function(){})),this.value=this.lazy?void 0:this.get()};Sr.prototype.get=function(){T(this);var e,t=this.vm;try{e=this.getter.call(t,t)}catch(e){if(!this.user)throw e;te(e,t,'getter for watcher "'+this.expression+'"')}finally{this.deep&&se(e),M(),this.cleanupDeps()}return e},Sr.prototype.addDep=function(e){var t=e.id;this.newDepIds.has(t)||(this.newDepIds.add(t),this.newDeps.push(e),this.depIds.has(t)||e.addSub(this))},Sr.prototype.cleanupDeps=function(){for(var e=this,t=this.deps.length;t--;){var n=e.deps[t];e.newDepIds.has(n.id)||n.removeSub(e)}var i=this.depIds;this.depIds=this.newDepIds,this.newDepIds=i,this.newDepIds.clear(),i=this.deps,this.deps=this.newDeps,this.newDeps=i,this.newDeps.length=0},Sr.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():ze(this)},Sr.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||l(e)||this.deep){var t=this.value;if(this.value=e,this.user)try{this.cb.call(this.vm,e,t)}catch(e){te(e,this.vm,'callback for watcher "'+this.expression+'"')}else this.cb.call(this.vm,e,t)}}},Sr.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},Sr.prototype.depend=function(){for(var e=this,t=this.deps.length;t--;)e.deps[t].depend()},Sr.prototype.teardown=function(){var e=this;if(this.active){this.vm._isBeingDestroyed||v(this.vm._watchers,this);for(var t=this.deps.length;t--;)e.deps[t].removeSub(e);this.active=!1}};var Dr={enumerable:!0,configurable:!0,get:k,set:k},$r={lazy:!0};pt(ht.prototype);var Ar={init:function(e,t,n,i){if(!e.componentInstance||e.componentInstance._isDestroyed){(e.componentInstance=gt(e,yr,n,i)).$mount(t?e.elm:void 0,t)}else if(e.data.keepAlive){var r=e;Ar.prepatch(r,r)}},prepatch:function(e,t){var n=t.componentOptions;Pe(t.componentInstance=e.componentInstance,n.propsData,n.listeners,t,n.children)},insert:function(e){var t=e.context,n=e.componentInstance;n._isMounted||(n._isMounted=!0,Ie(n,"mounted")),e.data.keepAlive&&(t._isMounted?Re(n):Fe(n,!0))},destroy:function(e){var t=e.componentInstance;t._isDestroyed||(e.data.keepAlive?Ve(t,!0):t.$destroy())}},Or=Object.keys(Ar),Tr=1,Mr=2,Pr=0;(function(e){e.prototype._init=function(e){var t=this;t._uid=Pr++;t._isVue=!0,e&&e._isComponent?Dt(t,e):t.$options=G($t(t.constructor),e||{},t),t._renderProxy=t,t._self=t,Te(t),Ce(t),St(t),Ie(t,"beforeCreate"),tt(t),We(t),et(t),Ie(t,"created"),t.$options.el&&t.$mount(t.$options.el)}})(Tt),function(e){var t={};t.get=function(){return this._data};var n={};n.get=function(){return this._props},Object.defineProperty(e.prototype,"$data",t),Object.defineProperty(e.prototype,"$props",n),e.prototype.$set=j,e.prototype.$delete=R,e.prototype.$watch=function(e,t,n){var i=this;if(c(t))return Ze(i,e,t,n);n=n||{},n.user=!0;var r=new Sr(i,e,t,n);return n.immediate&&t.call(i,r.value),function(){r.teardown()}}}(Tt),function(e){var t=/^hook:/;e.prototype.$on=function(e,n){var i=this,r=this;if(Array.isArray(e))for(var a=0,o=e.length;a<o;a++)i.$on(e[a],n);else(r._events[e]||(r._events[e]=[])).push(n),t.test(e)&&(r._hasHookEvent=!0);return r},e.prototype.$once=function(e,t){function n(){i.$off(e,n),t.apply(i,arguments)}var i=this;return n.fn=t,i.$on(e,n),i},e.prototype.$off=function(e,t){var n=this,i=this;if(!arguments.length)return i._events=Object.create(null),i;if(Array.isArray(e)){for(var r=0,a=e.length;r<a;r++)n.$off(e[r],t);return i}var o=i._events[e];if(!o)return i;if(!t)return i._events[e]=null,i;if(t)for(var s,l=o.length;l--;)if((s=o[l])===t||s.fn===t){o.splice(l,1);break}return i},e.prototype.$emit=function(e){var t=this,n=t._events[e];if(n){n=n.length>1?b(n):n;for(var i=b(arguments,1),r=0,a=n.length;r<a;r++)try{n[r].apply(t,i)}catch(n){te(n,t,'event handler for "'+e+'"')}}return t}}(Tt),function(e){e.prototype._update=function(e,t){var n=this;n._isMounted&&Ie(n,"beforeUpdate");var i=n.$el,r=n._vnode,a=yr;yr=n,n._vnode=e,r?n.$el=n.__patch__(r,e):(n.$el=n.__patch__(n.$el,e,t,!1,n.$options._parentElm,n.$options._refElm),n.$options._parentElm=n.$options._refElm=null),yr=a,i&&(i.__vue__=null),n.$el&&(n.$el.__vue__=n),n.$vnode&&n.$parent&&n.$vnode===n.$parent._vnode&&(n.$parent.$el=n.$el)},e.prototype.$forceUpdate=function(){var e=this;e._watcher&&e._watcher.update()},e.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){Ie(e,"beforeDestroy"),e._isBeingDestroyed=!0;var t=e.$parent;!t||t._isBeingDestroyed||e.$options.abstract||v(t.$children,e),e._watcher&&e._watcher.teardown();for(var n=e._watchers.length;n--;)e._watchers[n].teardown();e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,e.__patch__(e._vnode,null),Ie(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.$vnode&&(e.$vnode.parent=null)}}}(Tt),function(e){pt(e.prototype),e.prototype.$nextTick=function(e){return oe(e,this)},e.prototype._render=function(){var e=this,t=e.$options,n=t.render,i=t._parentVnode;if(e._isMounted)for(var r in e.$slots){var a=e.$slots[r];(a._rendered||a[0]&&a[0].elm)&&(e.$slots[r]=F(a,!0))}e.$scopedSlots=i&&i.data.scopedSlots||fi,e.$vnode=i;var o;try{o=n.call(e._renderProxy,e.$createElement)}catch(t){te(t,e,"render"),o=e._vnode}return o instanceof Ji||(o=Qi()),o.parent=i,o}}(Tt);var Br=[String,RegExp,Array],Fr={name:"keep-alive",abstract:!0,props:{include:Br,exclude:Br,max:[String,Number]},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){var e=this;for(var t in e.cache)Rt(e.cache,t,e.keys)},watch:{include:function(e){jt(this,function(t){return Nt(e,t)})},exclude:function(e){jt(this,function(t){return!Nt(e,t)})}},render:function(){var e=this.$slots.default,t=ke(e),n=t&&t.componentOptions;if(n){var i=Et(n),r=this,a=r.include,o=r.exclude;if(a&&(!i||!Nt(a,i))||o&&i&&Nt(o,i))return t;var s=this,l=s.cache,c=s.keys,u=null==t.key?n.Ctor.cid+(n.tag?"::"+n.tag:""):t.key;l[u]?(t.componentInstance=l[u].componentInstance,v(c,u),c.push(u)):(l[u]=t,c.push(u),this.max&&c.length>parseInt(this.max)&&Rt(l,c[0],c,this._vnode)),t.data.keepAlive=!0}return t||e&&e[0]}},Vr={KeepAlive:Fr};(function(e){var t={};t.get=function(){return Di},Object.defineProperty(e,"config",t),e.util={warn:Yi,extend:_,mergeOptions:G,defineReactive:N},e.set=j,e.delete=R,e.nextTick=oe,e.options=Object.create(null),xi.forEach(function(t){e.options[t+"s"]=Object.create(null)}),e.options._base=e,_(e.options.components,Vr),Mt(e),Pt(e),Bt(e),It(e)})(Tt),Object.defineProperty(Tt.prototype,"$isServer",{get:Hi}),Object.defineProperty(Tt.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),Tt.version="2.5.13";var Ir,Er,Nr=h("style,class"),jr=h("input,textarea,option,select,progress"),Rr=function(e,t,n){return"value"===n&&jr(e)&&"button"!==t||"selected"===n&&"option"===e||"checked"===n&&"input"===e||"muted"===n&&"video"===e},Lr=h("contenteditable,draggable,spellcheck"),zr=h("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),Hr="http://www.w3.org/1999/xlink",Wr=function(e){return":"===e.charAt(5)&&"xlink"===e.slice(0,5)},qr=function(e){return Wr(e)?e.slice(6,e.length):""},Yr=function(e){return null==e||!1===e},Ur={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},Kr=h("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),Gr=h("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),Jr=function(e){return Kr(e)||Gr(e)},Xr=Object.create(null),Qr=h("text,number,password,search,email,tel,url"),Zr=Object.freeze({createElement:Xt,createElementNS:Qt,createTextNode:Zt,createComment:en,insertBefore:tn,removeChild:nn,appendChild:rn,parentNode:an,nextSibling:on,tagName:sn,setTextContent:ln,setAttribute:cn}),ea={create:function(e,t){un(t)},update:function(e,t){e.data.ref!==t.data.ref&&(un(e,!0),un(t))},destroy:function(e){un(e,!0)}},ta=new Ji("",{},[]),na=["create","activate","update","remove","destroy"],ia={create:hn,update:hn,destroy:function(e){hn(e,ta)}},ra=Object.create(null),aa=[ea,ia],oa={create:bn,update:bn},sa={create:wn,update:wn},la="__r",ca="__c",ua={create:Dn,update:Dn},da={create:$n,update:$n},fa=y(function(e){var t={},n=/;(?![^(]*\))/g,i=/:(.+)/;return e.split(n).forEach(function(e){if(e){var n=e.split(i);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}),pa=/^--/,ha=/\s*!important$/,va=function(e,t,n){if(pa.test(t))e.style.setProperty(t,n);else if(ha.test(n))e.style.setProperty(t,n.replace(ha,""),"important");else{var i=ya(t);if(Array.isArray(n))for(var r=0,a=n.length;r<a;r++)e.style[i]=n[r];else e.style[i]=n}},ma=["Webkit","Moz","ms"],ya=y(function(e){if(Er=Er||document.createElement("div").style,"filter"!==(e=yi(e))&&e in Er)return e;for(var t=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<ma.length;n++){var i=ma[n]+t;if(i in Er)return i}}),ga={create:Fn,update:Fn},ba=y(function(e){return{enterClass:e+"-enter",enterToClass:e+"-enter-to",enterActiveClass:e+"-enter-active",leaveClass:e+"-leave",leaveToClass:e+"-leave-to",leaveActiveClass:e+"-leave-active"}}),_a=Oi&&!Fi,wa="transition",ka="animation",Ca="transition",xa="transitionend",Sa="animation",Da="animationend";_a&&(void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend&&(Ca="WebkitTransition",xa="webkitTransitionEnd"),void 0===window.onanimationend&&void 0!==window.onwebkitanimationend&&(Sa="WebkitAnimation",Da="webkitAnimationEnd"));var $a=Oi?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:function(e){return e()},Aa=/\b(transform|all)(,|$)/,Oa=Oi?{create:Gn,activate:Gn,remove:function(e,t){!0!==e.data.show?Yn(e,t):t()}}:{},Ta=[oa,sa,ua,da,ga,Oa],Ma=Ta.concat(aa),Pa=function(e){function t(e){return new Ji(M.tagName(e).toLowerCase(),{},[],void 0,e)}function n(e,t){function n(){0==--n.listeners&&o(e)}return n.listeners=t,n}function o(e){var t=M.parentNode(e);r(t)&&M.removeChild(t,e)}function l(e,t,n,i,o){if(e.isRootInsert=!o,!c(e,t,n,i)){var s=e.data,l=e.children,u=e.tag;r(u)?(e.elm=e.ns?M.createElementNS(e.ns,u):M.createElement(u,e),y(e),p(e,l,t),r(s)&&m(e,t),f(n,e.elm,i)):a(e.isComment)?(e.elm=M.createComment(e.text),f(n,e.elm,i)):(e.elm=M.createTextNode(e.text),f(n,e.elm,i))}}function c(e,t,n,i){var o=e.data;if(r(o)){var s=r(e.componentInstance)&&o.keepAlive;if(r(o=o.hook)&&r(o=o.init)&&o(e,!1,n,i),r(e.componentInstance))return u(e,t),a(s)&&d(e,t,n,i),!0}}function u(e,t){r(e.data.pendingInsert)&&(t.push.apply(t,e.data.pendingInsert),e.data.pendingInsert=null),e.elm=e.componentInstance.$el,v(e)?(m(e,t),y(e)):(un(e),t.push(e))}function d(e,t,n,i){for(var a,o=e;o.componentInstance;)if(o=o.componentInstance._vnode,r(a=o.data)&&r(a=a.transition)){for(a=0;a<O.activate.length;++a)O.activate[a](ta,o);t.push(o);break}f(n,e.elm,i)}function f(e,t,n){r(e)&&(r(n)?n.parentNode===e&&M.insertBefore(e,t,n):M.appendChild(e,t))}function p(e,t,n){if(Array.isArray(t))for(var i=0;i<t.length;++i)l(t[i],n,e.elm,null,!0);else s(e.text)&&M.appendChild(e.elm,M.createTextNode(String(e.text)))}function v(e){for(;e.componentInstance;)e=e.componentInstance._vnode;return r(e.tag)}function m(e,t){for(var n=0;n<O.create.length;++n)O.create[n](ta,e);$=e.data.hook,r($)&&(r($.create)&&$.create(ta,e),r($.insert)&&t.push(e))}function y(e){var t;if(r(t=e.fnScopeId))M.setAttribute(e.elm,t,"");else for(var n=e;n;)r(t=n.context)&&r(t=t.$options._scopeId)&&M.setAttribute(e.elm,t,""),n=n.parent;r(t=yr)&&t!==e.context&&t!==e.fnContext&&r(t=t.$options._scopeId)&&M.setAttribute(e.elm,t,"")}function g(e,t,n,i,r,a){for(;i<=r;++i)l(n[i],a,e,t)}function b(e){var t,n,i=e.data;if(r(i))for(r(t=i.hook)&&r(t=t.destroy)&&t(e),t=0;t<O.destroy.length;++t)O.destroy[t](e);if(r(t=e.children))for(n=0;n<e.children.length;++n)b(e.children[n])}function _(e,t,n,i){for(;n<=i;++n){var a=t[n];r(a)&&(r(a.tag)?(w(a),b(a)):o(a.elm))}}function w(e,t){if(r(t)||r(e.data)){var i,a=O.remove.length+1;for(r(t)?t.listeners+=a:t=n(e.elm,a),r(i=e.componentInstance)&&r(i=i._vnode)&&r(i.data)&&w(i,t),i=0;i<O.remove.length;++i)O.remove[i](e,t);r(i=e.data.hook)&&r(i=i.remove)?i(e,t):t()}else o(e.elm)}function k(e,t,n,a,o){for(var s,c,u,d,f=0,p=0,h=t.length-1,v=t[0],m=t[h],y=n.length-1,b=n[0],w=n[y],k=!o;f<=h&&p<=y;)i(v)?v=t[++f]:i(m)?m=t[--h]:dn(v,b)?(x(v,b,a),v=t[++f],b=n[++p]):dn(m,w)?(x(m,w,a),m=t[--h],w=n[--y]):dn(v,w)?(x(v,w,a),k&&M.insertBefore(e,v.elm,M.nextSibling(m.elm)),v=t[++f],w=n[--y]):dn(m,b)?(x(m,b,a),k&&M.insertBefore(e,m.elm,v.elm),m=t[--h],b=n[++p]):(i(s)&&(s=pn(t,f,h)),c=r(b.key)?s[b.key]:C(b,t,f,h),i(c)?l(b,a,e,v.elm):(u=t[c],dn(u,b)?(x(u,b,a),t[c]=void 0,k&&M.insertBefore(e,u.elm,v.elm)):l(b,a,e,v.elm)),b=n[++p]);f>h?(d=i(n[y+1])?null:n[y+1].elm,g(e,d,n,p,y,a)):p>y&&_(e,t,f,h)}function C(e,t,n,i){for(var a=n;a<i;a++){var o=t[a];if(r(o)&&dn(e,o))return a}}function x(e,t,n,o){if(e!==t){var s=t.elm=e.elm;if(a(e.isAsyncPlaceholder))return void(r(t.asyncFactory.resolved)?D(e.elm,t,n):t.isAsyncPlaceholder=!0);if(a(t.isStatic)&&a(e.isStatic)&&t.key===e.key&&(a(t.isCloned)||a(t.isOnce)))return void(t.componentInstance=e.componentInstance);var l,c=t.data;r(c)&&r(l=c.hook)&&r(l=l.prepatch)&&l(e,t);var u=e.children,d=t.children;if(r(c)&&v(t)){for(l=0;l<O.update.length;++l)O.update[l](e,t);r(l=c.hook)&&r(l=l.update)&&l(e,t)}i(t.text)?r(u)&&r(d)?u!==d&&k(s,u,d,n,o):r(d)?(r(e.text)&&M.setTextContent(s,""),g(s,null,d,0,d.length-1,n)):r(u)?_(s,u,0,u.length-1):r(e.text)&&M.setTextContent(s,""):e.text!==t.text&&M.setTextContent(s,t.text),r(c)&&r(l=c.hook)&&r(l=l.postpatch)&&l(e,t)}}function S(e,t,n){if(a(n)&&r(e.parent))e.parent.data.pendingInsert=t;else for(var i=0;i<t.length;++i)t[i].data.hook.insert(t[i])}function D(e,t,n,i){var o,s=t.tag,l=t.data,c=t.children;if(i=i||l&&l.pre,t.elm=e,a(t.isComment)&&r(t.asyncFactory))return t.isAsyncPlaceholder=!0,!0;if(r(l)&&(r(o=l.hook)&&r(o=o.init)&&o(t,!0),r(o=t.componentInstance)))return u(t,n),!0;if(r(s)){if(r(c))if(e.hasChildNodes())if(r(o=l)&&r(o=o.domProps)&&r(o=o.innerHTML)){if(o!==e.innerHTML)return!1}else{for(var d=!0,f=e.firstChild,h=0;h<c.length;h++){if(!f||!D(f,c[h],n,i)){d=!1;break}f=f.nextSibling}if(!d||f)return!1}else p(t,c,n);if(r(l)){var v=!1;for(var y in l)if(!P(y)){v=!0,m(t,n);break}!v&&l.class&&se(l.class)}}else e.data!==t.text&&(e.data=t.text);return!0}var $,A,O={},T=e.modules,M=e.nodeOps;for($=0;$<na.length;++$)for(O[na[$]]=[],A=0;A<T.length;++A)r(T[A][na[$]])&&O[na[$]].push(T[A][na[$]]);var P=h("attrs,class,staticClass,staticStyle,key");return function(e,n,o,s,c,u){if(i(n))return void(r(e)&&b(e));var d=!1,f=[];if(i(e))d=!0,l(n,f,c,u);else{var p=r(e.nodeType);if(!p&&dn(e,n))x(e,n,f,s);else{if(p){if(1===e.nodeType&&e.hasAttribute(Ci)&&(e.removeAttribute(Ci),o=!0),a(o)&&D(e,n,f))return S(n,f,!0),e;e=t(e)}var h=e.elm,m=M.parentNode(h);if(l(n,f,h._leaveCb?null:m,M.nextSibling(h)),r(n.parent))for(var y=n.parent,g=v(n);y;){for(var w=0;w<O.destroy.length;++w)O.destroy[w](y);if(y.elm=n.elm,g){for(var k=0;k<O.create.length;++k)O.create[k](ta,y);var C=y.data.hook.insert;if(C.merged)for(var $=1;$<C.fns.length;$++)C.fns[$]()}else un(y);y=y.parent}r(m)?_(m,[e],0,0):r(e.tag)&&b(e)}}return S(n,f,d),n.elm}}({nodeOps:Zr,modules:Ma});Fi&&document.addEventListener("selectionchange",function(){var e=document.activeElement;e&&e.vmodel&&ni(e,"input")});var Ba={inserted:function(e,t,n,i){"select"===n.tag?(i.elm&&!i.elm._vOptions?de(n,"postpatch",function(){Ba.componentUpdated(e,t,n)}):Jn(e,t,n.context),e._vOptions=[].map.call(e.options,Zn)):("textarea"===n.tag||Qr(e.type))&&(e._vModifiers=t.modifiers,t.modifiers.lazy||(e.addEventListener("change",ti),Ii||(e.addEventListener("compositionstart",ei),e.addEventListener("compositionend",ti)),Fi&&(e.vmodel=!0)))},componentUpdated:function(e,t,n){if("select"===n.tag){Jn(e,t,n.context);var i=e._vOptions,r=e._vOptions=[].map.call(e.options,Zn);if(r.some(function(e,t){return!C(e,i[t])})){(e.multiple?t.value.some(function(e){return Qn(e,r)}):t.value!==t.oldValue&&Qn(t.value,r))&&ni(e,"change")}}}},Fa={bind:function(e,t,n){var i=t.value;n=ii(n);var r=n.data&&n.data.transition,a=e.__vOriginalDisplay="none"===e.style.display?"":e.style.display;i&&r?(n.data.show=!0,qn(n,function(){e.style.display=a})):e.style.display=i?a:"none"},update:function(e,t,n){var i=t.value;i!==t.oldValue&&(n=ii(n),n.data&&n.data.transition?(n.data.show=!0,i?qn(n,function(){e.style.display=e.__vOriginalDisplay}):Yn(n,function(){e.style.display="none"})):e.style.display=i?e.__vOriginalDisplay:"none")},unbind:function(e,t,n,i,r){r||(e.style.display=e.__vOriginalDisplay)}},Va={model:Ba,show:Fa},Ia={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]},Ea={name:"transition",props:Ia,abstract:!0,render:function(e){var t=this,n=this.$slots.default;if(n&&(n=n.filter(function(e){return e.tag||we(e)}),n.length)){var i=this.mode,r=n[0];if(si(this.$vnode))return r;var a=ri(r);if(!a)return r;if(this._leaving)return oi(e,r);var o="__transition-"+this._uid+"-";a.key=null==a.key?a.isComment?o+"comment":o+a.tag:s(a.key)?0===String(a.key).indexOf(o)?a.key:o+a.key:a.key;var l=(a.data||(a.data={})).transition=ai(this),c=this._vnode,u=ri(c);if(a.data.directives&&a.data.directives.some(function(e){return"show"===e.name})&&(a.data.show=!0),u&&u.data&&!li(a,u)&&!we(u)&&(!u.componentInstance||!u.componentInstance._vnode.isComment)){var d=u.data.transition=_({},l);if("out-in"===i)return this._leaving=!0,de(d,"afterLeave",function(){t._leaving=!1,t.$forceUpdate()}),oi(e,r);if("in-out"===i){if(we(a))return c;var f,p=function(){f()};de(l,"afterEnter",p),de(l,"enterCancelled",p),de(d,"delayLeave",function(e){f=e})}}return r}}},Na=_({tag:String,moveClass:String},Ia);delete Na.mode;var ja={props:Na,render:function(e){for(var t=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),i=this.prevChildren=this.children,r=this.$slots.default||[],a=this.children=[],o=ai(this),s=0;s<r.length;s++){var l=r[s];if(l.tag)if(null!=l.key&&0!==String(l.key).indexOf("__vlist"))a.push(l),n[l.key]=l,(l.data||(l.data={})).transition=o;else;}if(i){for(var c=[],u=[],d=0;d<i.length;d++){var f=i[d];f.data.transition=o,f.data.pos=f.elm.getBoundingClientRect(),n[f.key]?c.push(f):u.push(f)}this.kept=e(t,null,c),this.removed=u}return e(t,null,a)},beforeUpdate:function(){this.__patch__(this._vnode,this.kept,!1,!0),this._vnode=this.kept},updated:function(){var e=this.prevChildren,t=this.moveClass||(this.name||"v")+"-move";e.length&&this.hasMove(e[0].elm,t)&&(e.forEach(ci),e.forEach(ui),e.forEach(di),this._reflow=document.body.offsetHeight,e.forEach(function(e){if(e.data.moved){var n=e.elm,i=n.style;jn(n,t),i.transform=i.WebkitTransform=i.transitionDuration="",n.addEventListener(xa,n._moveCb=function e(i){i&&!/transform$/.test(i.propertyName)||(n.removeEventListener(xa,e),n._moveCb=null,Rn(n,t))})}}))},methods:{hasMove:function(e,t){if(!_a)return!1;if(this._hasMove)return this._hasMove;var n=e.cloneNode();e._transitionClasses&&e._transitionClasses.forEach(function(e){In(n,e)}),Vn(n,t),n.style.display="none",this.$el.appendChild(n);var i=zn(n);return this.$el.removeChild(n),this._hasMove=i.hasTransform}}},Ra={Transition:Ea,TransitionGroup:ja};Tt.config.mustUseProp=Rr,Tt.config.isReservedTag=Jr,Tt.config.isReservedAttr=Nr,Tt.config.getTagNamespace=Kt,Tt.config.isUnknownElement=Gt,_(Tt.options.directives,Va),_(Tt.options.components,Ra),Tt.prototype.__patch__=Oi?Pa:k,Tt.prototype.$mount=function(e,t){return e=e&&Oi?Jt(e):void 0,Me(this,e,t)},Tt.nextTick(function(){Di.devtools&&Wi&&Wi.emit("init",Tt)},0),t.a=Tt}).call(t,n(44),n(167).setImmediate)},function(e,t,n){"use strict";var i=n(180),r=n.n(i);t.a=r.a},function(e,t,n){"use strict";var i=n(189),r=n.n(i);t.a=r.a},function(e,t,n){var i=n(60),r=n(32);e.exports=Object.keys||function(e){return i(e,r)}},function(e,t){t.f={}.propertyIsEnumerable},function(e,t){var n=0,i=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+i).toString(36))}},function(e,t,n){"use strict";var i=n(176),r=n.n(i),a=n(177),o=n.n(a);n.d(t,"a",function(){return r.a}),n.d(t,"b",function(){return o.a})},function(e,t,n){"use strict";var i=n(178),r=n.n(i),a=n(65);n.n(a);t.a=r.a},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t){e.exports=!0},function(e,t){t.f=Object.getOwnPropertySymbols},function(e,t,n){var i=n(9).f,r=n(12),a=n(4)("toStringTag");e.exports=function(e,t,n){e&&!r(e=n?e:e.prototype,a)&&i(e,a,{configurable:!0,value:t})}},function(e,t,n){var i=n(37)("keys"),r=n(27);e.exports=function(e){return i[e]||(i[e]=r(e))}},function(e,t,n){var i=n(8),r=i["__core-js_shared__"]||(i["__core-js_shared__"]={});e.exports=function(e){return r[e]||(r[e]={})}},function(e,t){var n=Math.ceil,i=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?i:n)(e)}},function(e,t,n){var i=n(31);e.exports=function(e){return Object(i(e))}},function(e,t,n){var i=n(19);e.exports=function(e,t){if(!i(e))return e;var n,r;if(t&&"function"==typeof(n=e.toString)&&!i(r=n.call(e)))return r;if("function"==typeof(n=e.valueOf)&&!i(r=n.call(e)))return r;if(!t&&"function"==typeof(n=e.toString)&&!i(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")}},function(e,t,n){var i=n(8),r=n(7),a=n(33),o=n(42),s=n(9).f;e.exports=function(e){var t=r.Symbol||(r.Symbol=a?{}:i.Symbol||{});"_"==e.charAt(0)||e in t||s(t,e,{value:o.f(e)})}},function(e,t,n){t.f=n(4)},function(e,t,n){"use strict";var i=n(154)(!0);n(57)(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=i(t,n),this._i+=e.length,{value:e,done:!1})})},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";var i=n(168),r=n.n(i);t.a=r.a},function(e,t,n){"use strict";var i=n(169),r=n.n(i),a=n(170),o=n.n(a);n.d(t,"a",function(){return r.a}),n.d(t,"b",function(){return o.a})},function(e,t,n){"use strict";var i=n(13),r=n.n(i),a=n(22),o=n(183),s=n.n(o);n.d(t,"a",function(){return s.a}),t.b={open:function(e){var t=void 0,n=void 0;"string"==typeof e&&(t=e);var i={programmatic:!0,content:t};e.parent&&(n=e.parent,delete e.parent);var o=r()(i,e);return new(a.a.extend(s.a))({parent:n,el:document.createElement("div"),propsData:o})}}},function(e,t,n){"use strict";var i=n(185),r=n.n(i);t.a=r.a},function(e,t,n){"use strict";var i=n(6),r=n.n(i),a=n(2);t.a={components:r()({},a.a.name,a.a),props:{active:{type:Boolean,default:!0},title:String,closable:{type:Boolean,default:!0},type:String,hasIcon:Boolean,size:String,iconSize:String},data:function(){return{isActive:this.active}},watch:{active:function(e){this.isActive=e}},computed:{icon:function(){switch(this.type){case"is-info":return"information";case"is-success":return"check-circle";case"is-warning":return"alert";case"is-danger":return"alert-circle";default:return null}}},methods:{close:function(){this.isActive=!1,this.$emit("close"),this.$emit("update:active",!1)}}}},function(e,t,n){"use strict";var i=n(1),r=n(5);t.a={props:{type:{type:String,default:"is-dark"},message:String,duration:Number,queue:{type:Boolean,default:void 0},position:{type:String,default:"is-top",validator:function(e){return["is-top-right","is-top","is-top-left","is-bottom-right","is-bottom","is-bottom-left"].indexOf(e)>-1}},container:String},data:function(){return{isActive:!1,parentTop:null,parentBottom:null,newContainer:this.container||i.b.defaultContainerElement}},computed:{correctParent:function(){switch(this.position){case"is-top-right":case"is-top":case"is-top-left":return this.parentTop;case"is-bottom-right":case"is-bottom":case"is-bottom-left":return this.parentBottom}},transition:function(){switch(this.position){case"is-top-right":case"is-top":case"is-top-left":return{enter:"fadeInDown",leave:"fadeOut"};case"is-bottom-right":case"is-bottom":case"is-bottom-left":return{enter:"fadeInUp",leave:"fadeOut"}}}},methods:{shouldQueue:function(){return!!(void 0!==this.queue?this.queue:i.b.defaultNoticeQueue)&&(this.parentTop.childElementCount>0||this.parentBottom.childElementCount>0)},close:function(){var e=this;clearTimeout(this.timer),this.isActive=!1,setTimeout(function(){e.$destroy(),n.i(r.a)(e.$el)},150)},showNotice:function(){var e=this;if(this.shouldQueue())return void setTimeout(function(){return e.showNotice()},250);this.correctParent.insertAdjacentElement("afterbegin",this.$el),this.isActive=!0,this.indefinite||(this.timer=setTimeout(function(){return e.close()},this.newDuration))},setupContainer:function(){if(this.parentTop=document.querySelector(".notices.is-top"),this.parentBottom=document.querySelector(".notices.is-bottom"),!this.parentTop||!this.parentBottom){this.parentTop||(this.parentTop=document.createElement("div"),this.parentTop.className="notices is-top"),this.parentBottom||(this.parentBottom=document.createElement("div"),this.parentBottom.className="notices is-bottom");var e=document.querySelector(this.newContainer)||document.body;e.appendChild(this.parentTop),e.appendChild(this.parentBottom),this.newContainer&&(this.parentTop.classList.add("has-custom-container"),this.parentBottom.classList.add("has-custom-container"))}}},beforeMount:function(){this.setupContainer()},mounted:function(){this.showNotice()}}},function(e,t,n){e.exports={default:n(130),__esModule:!0}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var r=n(127),a=i(r),o=n(3),s=i(o),l="function"==typeof s.default&&"symbol"==typeof a.default?function(e){return typeof e}:function(e){return e&&"function"==typeof s.default&&e.constructor===s.default&&e!==s.default.prototype?"symbol":typeof e};t.default="function"==typeof s.default&&"symbol"===l(a.default)?function(e){return void 0===e?"undefined":l(e)}:function(e){return e&&"function"==typeof s.default&&e.constructor===s.default&&e!==s.default.prototype?"symbol":void 0===e?"undefined":l(e)}},function(e,t,n){var i=n(135);e.exports=function(e,t,n){if(i(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,i){return e.call(t,n,i)};case 3:return function(n,i,r){return e.call(t,n,i,r)}}return function(){return e.apply(t,arguments)}}},function(e,t,n){var i=n(19),r=n(8).document,a=i(r)&&i(r.createElement);e.exports=function(e){return a?r.createElement(e):{}}},function(e,t,n){e.exports=!n(11)&&!n(18)(function(){return 7!=Object.defineProperty(n(54)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){var i=n(30);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==i(e)?e.split(""):Object(e)}},function(e,t,n){"use strict";var i=n(33),r=n(17),a=n(61),o=n(15),s=n(12),l=n(20),c=n(145),u=n(35),d=n(153),f=n(4)("iterator"),p=!([].keys&&"next"in[].keys()),h=function(){return this};e.exports=function(e,t,n,v,m,y,g){c(n,t,v);var b,_,w,k=function(e){if(!p&&e in D)return D[e];switch(e){case"keys":case"values":return function(){return new n(this,e)}}return function(){return new n(this,e)}},C=t+" Iterator",x="values"==m,S=!1,D=e.prototype,$=D[f]||D["@@iterator"]||m&&D[m],A=!p&&$||k(m),O=m?x?k("entries"):A:void 0,T="Array"==t?D.entries||$:$;if(T&&(w=d(T.call(new e)))!==Object.prototype&&w.next&&(u(w,C,!0),i||s(w,f)||o(w,f,h)),x&&$&&"values"!==$.name&&(S=!0,A=function(){return $.call(this)}),i&&!g||!p&&!S&&D[f]||o(D,f,A),l[t]=A,l[C]=h,m)if(b={values:x?A:k("values"),keys:y?A:k("keys"),entries:O},g)for(_ in b)_ in D||a(D,_,b[_]);else r(r.P+r.F*(p||S),t,b);return b}},function(e,t,n){var i=n(14),r=n(150),a=n(32),o=n(36)("IE_PROTO"),s=function(){},l=function(){var e,t=n(54)("iframe"),i=a.length;for(t.style.display="none",n(141).appendChild(t),t.src="javascript:",e=t.contentWindow.document,e.open(),e.write("<script>document.F=Object<\/script>"),e.close(),l=e.F;i--;)delete l.prototype[a[i]];return l()};e.exports=Object.create||function(e,t){var n;return null!==e?(s.prototype=i(e),n=new s,s.prototype=null,n[o]=e):n=l(),void 0===t?n:r(n,t)}},function(e,t,n){var i=n(60),r=n(32).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return i(e,r)}},function(e,t,n){var i=n(12),r=n(16),a=n(137)(!1),o=n(36)("IE_PROTO");e.exports=function(e,t){var n,s=r(e),l=0,c=[];for(n in s)n!=o&&i(s,n)&&c.push(n);for(;t.length>l;)i(s,n=t[l++])&&(~a(c,n)||c.push(n));return c}},function(e,t,n){e.exports=n(15)},function(e,t,n){var i=n(38),r=Math.min;e.exports=function(e){return e>0?r(i(e),9007199254740991):0}},function(e,t,n){var i=n(138),r=n(4)("iterator"),a=n(20);e.exports=n(7).getIteratorMethod=function(e){if(void 0!=e)return e[r]||e["@@iterator"]||a[i(e)]}},function(e,t,n){n(158);for(var i=n(8),r=n(15),a=n(20),o=n(4)("toStringTag"),s="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),l=0;l<s.length;l++){var c=s[l],u=i[c],d=u&&u.prototype;d&&!d[o]&&r(d,o,c),a[c]=a.Array}},function(e,t,n){var i=n(0)(n(79),null,null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(94),n(216),null,null,null);e.exports=i.exports},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(13),r=n.n(i),a=n(46),o=n(28),s=n(112),l=n(115),c=n(116),u=n(117),d=n(45),f=n(105),p=n(106),h=n(107),v=n(29),m=n(2),y=n(23),g=n(108),b=n(109),_=n(47),w=n(110),k=n(48),C=n(111),x=n(24),S=n(113),D=n(114),$=n(118),A=n(119),O=n(120),T=n(121),M=n(122),P=n(1);n.d(t,"Dialog",function(){return h.a}),n.d(t,"LoadingProgrammatic",function(){return g.b}),n.d(t,"ModalProgrammatic",function(){return _.b}),n.d(t,"Snackbar",function(){return S.a}),n.d(t,"Toast",function(){return O.a});var B={Autocomplete:d.a,Checkbox:a.a,CheckboxButton:a.b,Collapse:f.a,Datepicker:p.a,Dropdown:o.a,DropdownItem:o.b,Field:v.a,Icon:m.a,Input:y.a,Loading:g.a,Message:b.a,Modal:_.a,Notification:w.a,Pagination:k.a,Panel:C.a,Radio:s.a,RadioButton:s.b,Select:x.a,Switch:D.a,TabItem:c.a,Table:l.a,TableColumn:l.b,Tabs:c.b,Tag:u.a,Taglist:u.b,Taginput:$.a,Timepicker:A.a,Tooltip:T.a,Upload:M.a};B.install=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};n.i(P.a)(r()(P.b,t));for(var i in B){var a=B[i];a&&"install"!==i&&e.component(a.name,a)}e.prototype.$dialog=h.a,e.prototype.$loading=g.b,e.prototype.$modal=_.b,e.prototype.$snackbar=S.a,e.prototype.$toast=O.a},t.default=B},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(52),r=n.n(i),a=n(51),o=n.n(a),s=n(6),l=n.n(s),c=n(5),u=n(10),d=n(23);t.default={name:"BAutocomplete",components:l()({},d.a.name,d.a),mixins:[u.a],inheritAttrs:!1,props:{value:[Number,String],data:{type:Array,default:function(){return[]}},field:{type:String,default:"value"},keepFirst:Boolean,clearOnSelect:Boolean,openOnFocus:Boolean},data:function(){return{selected:null,hovered:null,isActive:!1,newValue:this.value,isListInViewportVertically:!0,hasFocus:!1,_isAutocomplete:!0,_elementRef:"input"}},computed:{whiteList:function(){var e=[];if(e.push(this.$refs.input.$el.querySelector("input")),e.push(this.$refs.dropdown),void 0!==this.$refs.dropdown){var t=this.$refs.dropdown.querySelectorAll("*"),n=!0,i=!1,r=void 0;try{for(var a,s=o()(t);!(n=(a=s.next()).done);n=!0){var l=a.value;e.push(l)}}catch(e){i=!0,r=e}finally{try{!n&&s.return&&s.return()}finally{if(i)throw r}}}return e},hasDefaultSlot:function(){return!!this.$scopedSlots.default},hasEmptySlot:function(){return!!this.$slots.empty}},watch:{isActive:function(e){var t=this;e?this.calcDropdownInViewportVertical():(this.$nextTick(function(){return t.setHovered(null)}),setTimeout(function(){t.calcDropdownInViewportVertical()},100))},newValue:function(e){this.$emit("input",e);var t=this.getValue(this.selected);t&&t!==e&&this.setSelected(null,!1),!this.hasFocus||this.openOnFocus&&!e||(this.isActive=!!e)},value:function(e){this.newValue=e,!this.isValid&&this.$refs.input.checkHtml5Validity()},data:function(e){this.keepFirst&&this.selectFirstOption(e)}},methods:{setHovered:function(e){void 0!==e&&(this.hovered=e)},setSelected:function(e){var t=this,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];void 0!==e&&(this.selected=e,this.$emit("select",this.selected),null!==this.selected&&(this.newValue=this.clearOnSelect?"":this.getValue(this.selected)),n&&this.$nextTick(function(){t.isActive=!1}))},selectFirstOption:function(e){var t=this;this.$nextTick(function(){e.length?(t.openOnFocus||""!==t.newValue&&t.hovered!==e[0])&&t.setHovered(e[0]):t.setHovered(null)})},enterPressed:function(){null!==this.hovered&&this.setSelected(this.hovered)},tabPressed:function(){if(null===this.hovered)return void(this.isActive=!1);this.setSelected(this.hovered)},clickedOutside:function(e){this.whiteList.indexOf(e.target)<0&&(this.isActive=!1)},getValue:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(e){var i="object"===(void 0===e?"undefined":r()(e))?n.i(c.c)(e,this.field):e,a="string"==typeof this.newValue?n.i(c.e)(this.newValue):this.newValue,o=new RegExp("("+a+")","gi");return t?i.replace(o,"<b>$1</b>"):i}},calcDropdownInViewportVertical:function(){var e=this;this.$nextTick(function(){if(void 0!==e.$refs.dropdown){var t=e.$refs.dropdown.getBoundingClientRect();e.isListInViewportVertically=t.top>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)}})},keyArrows:function(e){var t="down"===e?1:-1;if(this.isActive){var n=this.data.indexOf(this.hovered)+t;n=n>this.data.length-1?this.data.length:n,n=n<0?0:n,this.setHovered(this.data[n]);var i=this.$refs.dropdown.querySelector(".dropdown-content"),r=i.querySelectorAll(".dropdown-item:not(.is-disabled)")[n];if(!r)return;var a=i.scrollTop,o=i.scrollTop+i.clientHeight-r.clientHeight;r.offsetTop<a?i.scrollTop=r.offsetTop:r.offsetTop>=o&&(i.scrollTop=r.offsetTop-i.clientHeight+r.clientHeight)}else this.isActive=!0},focused:function(e){this.getValue(this.selected)===this.newValue&&this.$el.querySelector("input").select(),this.openOnFocus&&(this.isActive=!0,this.keepFirst&&this.selectFirstOption(this.data)),this.hasFocus=!0,this.$emit("focus",e)},onBlur:function(e){this.hasFocus=!1,this.$emit("blur",e)}},created:function(){"undefined"!=typeof window&&(document.addEventListener("click",this.clickedOutside),window.addEventListener("resize",this.calcDropdownInViewportVertical))},beforeDestroy:function(){"undefined"!=typeof window&&(document.removeEventListener("click",this.clickedOutside),window.removeEventListener("resize",this.calcDropdownInViewportVertical))}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),r=n.n(i);t.default={name:"BCheckbox",props:{value:[String,Number,Boolean,Function,Object,Array,r.a],nativeValue:[String,Number,Boolean,Function,Object,Array,r.a],disabled:Boolean,name:String,size:String,trueValue:{type:[String,Number,Boolean,Function,Object,Array,r.a],default:!0},falseValue:{type:[String,Number,Boolean,Function,Object,Array,r.a],default:!1}},data:function(){return{newValue:this.value}},watch:{value:function(e){this.newValue=e},newValue:function(e){this.$emit("input",e)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),r=n.n(i);t.default={name:"BCheckboxButton",props:{value:[String,Number,Boolean,Function,Object,Array,r.a],nativeValue:[String,Number,Boolean,Function,Object,Array,r.a],disabled:Boolean,name:String,size:String,type:{type:String,default:"is-primary"}},data:function(){return{newValue:this.value}},computed:{checked:function(){return Array.isArray(this.newValue)?this.newValue.indexOf(this.nativeValue)>=0:this.newValue===this.nativeValue}},watch:{value:function(e){this.newValue=e},newValue:function(e){this.$emit("input",e)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"BCollapse",props:{open:{type:Boolean,default:!0},animation:{type:String,default:"fade"}},data:function(){return{isOpen:this.open}},watch:{open:function(e){this.isOpen=e}},methods:{toggle:function(){this.isOpen=!this.isOpen,this.$emit("update:open",this.isOpen),this.$emit(this.isOpen?"open":"close")}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i,r=n(6),a=n.n(r),o=n(10),s=n(5),l=n(1),c=n(28),u=n(23),d=n(29),f=n(24),p=n(2),h=n(173),v=n.n(h);t.default={name:"BDatepicker",components:(i={},a()(i,v.a.name,v.a),a()(i,u.a.name,u.a),a()(i,d.a.name,d.a),a()(i,f.a.name,f.a),a()(i,p.a.name,p.a),a()(i,c.a.name,c.a),a()(i,c.b.name,c.b),i),mixins:[o.a],inheritAttrs:!1,props:{value:Date,dayNames:{type:Array,default:function(){return Array.isArray(l.b.defaultDayNames)?l.b.defaultDayNames:["Su","M","Tu","W","Th","F","S"]}},monthNames:{type:Array,default:function(){return Array.isArray(l.b.defaultMonthNames)?l.b.defaultMonthNames:["January","February","March","April","May","June","July","August","September","October","November","December"]}},firstDayOfWeek:{type:Number,default:function(){return"number"==typeof l.b.defaultFirstDayOfWeek?l.b.defaultFirstDayOfWeek:0}},inline:Boolean,minDate:Date,maxDate:Date,focusedDate:Date,placeholder:String,readonly:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},unselectableDates:Array,unselectableDaysOfWeek:{type:Array,default:function(){return l.b.defaultUnselectableDaysOfWeek}},selectableDates:Array,dateFormatter:{type:Function,default:function(e){return"function"==typeof l.b.defaultDateFormatter?l.b.defaultDateFormatter(e):e.toLocaleDateString()}},dateParser:{type:Function,default:function(e){return"function"==typeof l.b.defaultDateParser?l.b.defaultDateParser(e):new Date(Date.parse(e))}},mobileNative:{type:Boolean,default:function(){return l.b.defaultDatepickerMobileNative}},position:String,events:Array,indicators:{type:String,default:"dots"}},data:function(){var e=this.value||this.focusedDate||new Date;return{dateSelected:this.value,focusedDateData:{month:e.getMonth(),year:e.getFullYear()},_elementRef:"input",_isDatepicker:!0}},computed:{listOfYears:function(){for(var e=this.maxDate?this.maxDate.getFullYear():Math.max((new Date).getFullYear(),this.focusedDateData.year)+3,t=this.minDate?this.minDate.getFullYear():1900,n=[],i=t;i<=e;i++)n.push(i);return n.reverse()},isFirstMonth:function(){return!!this.minDate&&new Date(this.focusedDateData.year,this.focusedDateData.month)<=new Date(this.minDate.getFullYear(),this.minDate.getMonth())},isLastMonth:function(){return!!this.maxDate&&new Date(this.focusedDateData.year,this.focusedDateData.month)>=new Date(this.maxDate.getFullYear(),this.maxDate.getMonth())},isMobile:function(){return this.mobileNative&&s.b.any()}},watch:{dateSelected:function(e){var t=e||new Date;this.focusedDateData={month:t.getMonth(),year:t.getFullYear()},this.$emit("input",e),this.$refs.dropdown&&(this.$refs.dropdown.isActive=!1)},value:function(e){this.dateSelected=e,!this.isValid&&this.$refs.input.checkHtml5Validity()},focusedDate:function(e){e&&(this.focusedDateData={month:e.getMonth(),year:e.getFullYear()})},"focusedDateData.month":function(e){this.$emit("change-month",e)},"focusedDateData.year":function(e){this.$emit("change-year",e)}},methods:{updateSelectedDate:function(e){this.dateSelected=e},onChange:function(e){var t=this.dateParser(e);t&&!isNaN(t)?this.dateSelected=t:(this.dateSelected=null,this.$refs.input.newValue=this.dateSelected)},formatValue:function(e){return e&&!isNaN(e)?this.dateFormatter(e):null},decrementMonth:function(){this.disabled||(this.focusedDateData.month>0?this.focusedDateData.month-=1:(this.focusedDateData.month=11,this.focusedDateData.year-=1))},incrementMonth:function(){this.disabled||(this.focusedDateData.month<11?this.focusedDateData.month+=1:(this.focusedDateData.month=0,this.focusedDateData.year+=1))},formatYYYYMMDD:function(e){var t=new Date(e);if(e&&!isNaN(t)){var n=t.getFullYear(),i=t.getMonth()+1,r=t.getDate();return n+"-"+(i<10?"0":"")+i+"-"+(r<10?"0":"")+r}return""},onChangeNativePicker:function(e){var t=e.target.value;this.dateSelected=t?new Date(t):null}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(174),r=n.n(i);t.default={name:"BDatepickerTable",components:{bDatepickerTableRow:r.a},props:{value:Date,dayNames:Array,monthNames:Array,firstDayOfWeek:Number,events:Array,indicators:String,minDate:Date,maxDate:Date,focused:Object,disabled:Boolean,unselectableDates:Array,unselectableDaysOfWeek:Array,selectableDates:Array},computed:{visibleDayNames:function(){for(var e=[],t=this.firstDayOfWeek;e.length<this.dayNames.length;){var n=this.dayNames[t%this.dayNames.length];e.push(n),t++}return e},hasEvents:function(){return this.events&&this.events.length},eventsInThisMonth:function(){if(!this.events)return[];for(var e=[],t=0;t<this.events.length;t++){var n=this.events[t];n.hasOwnProperty("date")||(n={date:n}),n.hasOwnProperty("type")||(n.type="is-primary"),n.date.getMonth()===this.focused.month&&n.date.getFullYear()===this.focused.year&&e.push(n)}return e}},methods:{updateSelectedDate:function(e){this.$emit("input",e)},weekBuilder:function(e,t,n){for(var i=new Date(n,t),r=[],a=new Date(n,t,e).getDay(),o=a>=this.firstDayOfWeek?a-this.firstDayOfWeek:7-this.firstDayOfWeek+a,s=1,l=0;l<o;l++)r.unshift(new Date(i.getFullYear(),i.getMonth(),e-s)),s++;r.push(new Date(n,t,e));for(var c=1;r.length<7;)r.push(new Date(n,t,e+c)),c++;return r},weeksInThisMonth:function(e,t){for(var n=[],i=new Date(t,e+1,0).getDate(),r=1;r<=i+6;){var a=this.weekBuilder(r,e,t),o=!1;a.forEach(function(t){t.getMonth()===e&&(o=!0)}),o&&n.push(a),r+=7}return n},eventsInThisWeek:function(e,t){if(!this.eventsInThisMonth.length)return[];var n=[],i=[];i=this.weeksInThisMonth(this.focused.month,this.focused.year);for(var r=0;r<i[t].length;r++)for(var a=0;a<this.eventsInThisMonth.length;a++){var o=this.eventsInThisMonth[a].date.getTime();o===i[t][r].getTime()&&n.push(this.eventsInThisMonth[a])}return n}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"BDatepickerTableRow",props:{selectedDate:Date,week:{type:Array,required:!0},month:{type:Number,required:!0},minDate:Date,maxDate:Date,disabled:Boolean,unselectableDates:Array,unselectableDaysOfWeek:Array,selectableDates:Array,events:Array,indicators:String},methods:{selectableDate:function(e){var t=[];if(this.minDate&&t.push(e>=this.minDate),this.maxDate&&t.push(e<=this.maxDate),t.push(e.getMonth()===this.month),this.selectableDates)for(var n=0;n<this.selectableDates.length;n++){var i=this.selectableDates[n];if(e.getDate()===i.getDate()&&e.getFullYear()===i.getFullYear()&&e.getMonth()===i.getMonth())return!0;t.push(!1)}if(this.unselectableDates)for(var r=0;r<this.unselectableDates.length;r++){var a=this.unselectableDates[r];t.push(e.getDate()!==a.getDate()||e.getFullYear()!==a.getFullYear()||e.getMonth()!==a.getMonth())}if(this.unselectableDaysOfWeek)for(var o=0;o<this.unselectableDaysOfWeek.length;o++){var s=this.unselectableDaysOfWeek[o];t.push(e.getDay()!==s)}return t.indexOf(!1)<0},emitChosenDate:function(e){this.disabled||this.selectableDate(e)&&this.$emit("select",e)},eventsDateMatch:function(e){if(!this.events.length)return!1;for(var t=[],n=0;n<this.events.length;n++)this.events[n].date.getDay()===e.getDay()&&t.push(this.events[n]);return!!t.length&&t},classObject:function(e){function t(e,t){return!(!e||!t)&&(e.getDate()===t.getDate()&&e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth())}return{"is-selected":t(e,this.selectedDate),"is-today":t(e,new Date),"is-selectable":this.selectableDate(e)&&!this.disabled,"is-unselectable":!this.selectableDate(e)||this.disabled}}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),r=n.n(i),a=n(2),o=n(47),s=n(1),l=n(5);t.default={name:"BDialog",components:r()({},a.a.name,a.a),extends:o.a,props:{title:String,message:String,icon:String,iconPack:String,hasIcon:Boolean,type:{type:String,default:"is-primary"},size:String,confirmText:{type:String,default:function(){return s.b.defaultDialogConfirmText?s.b.defaultDialogConfirmText:"OK"}},cancelText:{type:String,default:function(){return s.b.defaultDialogCancelText?s.b.defaultDialogCancelText:"Cancel"}},hasInput:Boolean,inputAttrs:{type:Object,default:function(){return{}}},onConfirm:{type:Function,default:function(){}},focusOn:{type:String,default:"confirm"}},data:function(){return{prompt:this.hasInput?this.inputAttrs.value||"":"",isActive:!1,validationMessage:""}},computed:{iconByType:function(){switch(this.type){case"is-info":return"information";case"is-success":return"check-circle";case"is-warning":return"alert";case"is-danger":return"alert-circle";default:return null}},showCancel:function(){return this.cancelOptions.indexOf("button")>=0}},methods:{confirm:function(){var e=this;if(void 0!==this.$refs.input&&!this.$refs.input.checkValidity())return this.validationMessage=this.$refs.input.validationMessage,void this.$nextTick(function(){return e.$refs.input.select()});this.onConfirm(this.prompt),this.close()},close:function(){var e=this;this.isActive=!1,setTimeout(function(){e.$destroy(),n.i(l.a)(e.$el)},150)}},beforeMount:function(){document.body.appendChild(this.$el)},mounted:function(){var e=this;this.isActive=!0,void 0===this.inputAttrs.required&&this.$set(this.inputAttrs,"required",!0),this.$nextTick(function(){e.hasInput?e.$refs.input.focus():"cancel"===e.focusOn&&e.showCancel?e.$refs.cancelButton.focus():e.$refs.confirmButton.focus()})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(51),r=n.n(i),a=n(3),o=n.n(a);t.default={name:"BDropdown",props:{value:{type:[String,Number,Boolean,Object,Array,o.a,Function],default:null},disabled:Boolean,hoverable:Boolean,inline:Boolean,position:{type:String,validator:function(e){return["is-top-right","is-top-left","is-bottom-left"].indexOf(e)>-1}},mobileModal:{type:Boolean,default:!0}},data:function(){return{selected:this.value,isActive:!1,_isDropdown:!0}},computed:{rootClasses:function(){return[this.position,{"is-disabled":this.disabled,"is-hoverable":this.hoverable,"is-inline":this.inline,"is-active":this.isActive||this.inline,"is-mobile-modal":this.isMobileModal}]},isMobileModal:function(){return this.mobileModal&&!this.inline&&!this.hoverable}},watch:{value:function(e){this.selected=e},isActive:function(e){this.$emit("active-change",e)}},methods:{selectItem:function(e){this.selected!==e&&(this.$emit("change",e),this.selected=e),this.$emit("input",e),this.isActive=!1},isInWhiteList:function(e){if(e===this.$refs.dropdownMenu)return!0;if(e===this.$refs.trigger)return!0;if(void 0!==this.$refs.dropdownMenu){var t=this.$refs.dropdownMenu.querySelectorAll("*"),n=!0,i=!1,a=void 0;try{for(var o,s=r()(t);!(n=(o=s.next()).done);n=!0){if(e===o.value)return!0}}catch(e){i=!0,a=e}finally{try{!n&&s.return&&s.return()}finally{if(i)throw a}}}if(void 0!==this.$refs.trigger){var l=this.$refs.trigger.querySelectorAll("*"),c=!0,u=!1,d=void 0;try{for(var f,p=r()(l);!(c=(f=p.next()).done);c=!0){if(e===f.value)return!0}}catch(e){u=!0,d=e}finally{try{!c&&p.return&&p.return()}finally{if(u)throw d}}}return!1},clickedOutside:function(e){this.inline||this.isInWhiteList(e.target)||(this.isActive=!1)},toggle:function(){var e=this;this.disabled||this.hoverable||(this.isActive?this.isActive=!this.isActive:this.$nextTick(function(){e.isActive=!e.isActive}))}},created:function(){"undefined"!=typeof window&&document.addEventListener("click",this.clickedOutside)},beforeDestroy:function(){"undefined"!=typeof window&&document.removeEventListener("click",this.clickedOutside)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),r=n.n(i);t.default={name:"BDropdownItem",props:{value:{type:[String,Number,Boolean,Object,Array,r.a,Function],default:null},separator:Boolean,disabled:Boolean,custom:Boolean,paddingless:Boolean,hasLink:Boolean},computed:{anchorClasses:function(){return{"is-disabled":this.disabled,"is-paddingless":this.paddingless,"is-active":null!==this.value&&this.value===this.$parent.selected}},itemClasses:function(){return{"dropdown-item":!this.hasLink,"is-disabled":this.disabled,"is-paddingless":this.paddingless,"is-active":null!==this.value&&this.value===this.$parent.selected,"has-link":this.hasLink}},isClickable:function(){return!this.separator&&!this.disabled&&!this.custom}},methods:{selectItem:function(){this.isClickable&&(this.$parent.selectItem(this.value),this.$emit("click"))}},created:function(){if(!this.$parent.$data._isDropdown)throw this.$destroy(),new Error("You should wrap bDropdownItem on a bDropdown")}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(65),r=n.n(i);t.default={name:"BField",components:{"b-field-body":r.a},props:{type:String,label:String,labelFor:String,message:[String,Array],grouped:Boolean,groupMultiline:Boolean,position:String,expanded:Boolean,horizontal:Boolean,addons:{type:Boolean,default:!0},customClass:String},data:function(){return{newType:this.type,newMessage:this.message,_isField:!0}},computed:{rootClasses:function(){return[this.newPosition,{"is-expanded":this.expanded,"is-grouped-multiline":this.groupMultiline,"is-horizontal":this.horizontal}]},newPosition:function(){if(void 0!==this.position){var e=this.position.split("-");if(!(e.length<1)){var t=this.grouped?"is-grouped-":"has-addons-";return this.position?t+e[1]:void 0}}},formattedMessage:function(){return this.newMessage&&Array.isArray(this.newMessage)?this.newMessage.filter(function(e){if(e)return e}).join(" <br> "):this.newMessage}},watch:{type:function(e){this.newType=e},message:function(e){this.newMessage=e}},methods:{fieldType:function(){if(this.grouped)return"is-grouped";var e=0;return this.$slots.default&&(e=this.$slots.default.reduce(function(e,t){return t.tag?e+1:e},0)),e>1&&this.addons&&!this.horizontal?"has-addons":void 0}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"BFieldBody",props:{message:{type:[String]},type:{type:[String]}},render:function(e){var t=this;return e("div",{attrs:{class:"field-body"}},this.$slots.default.map(function(n){return n.tag?t.message?e("b-field",{attrs:{message:t.message,type:t.type}},[n]):e("b-field",{},[n]):n}))}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);t.default={name:"BIcon",props:{type:String,pack:String,icon:String,size:String,customSize:String,customClass:String,both:Boolean},data:function(){return{newPack:this.pack||i.b.defaultIconPack}},computed:{newIcon:function(){return this.both?"mdi"===this.newPack?this.newPack+"-"+this.icon:"fa-"+this.getEquivalentIconOf(this.icon):"mdi"===this.newPack?this.newPack+"-"+this.icon:"fa-"+this.icon},newType:function(){if(this.type){var e=this.type.split("-");if(e.length)return"has-text-"+e[1]}},newCustomSize:function(){return this.customSize||this.customSizeByPack},customSizeByPack:function(){var e="mdi"===this.newPack?"mdi-24px":"fa-lg",t="mdi"===this.newPack?"mdi-36px":"fa-2x",n="mdi"===this.newPack?"mdi-48px":"fa-3x";switch(this.size){case"is-small":return;case"is-medium":return t;case"is-large":return n;default:return e}}},methods:{getEquivalentIconOf:function(e){switch(e){case"check":return"check";case"information":return"info-circle";case"check-circle":return"check-circle";case"alert":return"exclamation-triangle";case"alert-circle":return"exclamation-circle";case"arrow-up":return"arrow-up";case"chevron-right":return"angle-right";case"chevron-left":return"angle-left";case"chevron-down":return"angle-down";case"eye":return"eye";case"eye-off":return"eye-slash";case"menu-down":return"caret-down";case"menu-up":return"caret-up";default:return null}}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),r=n.n(i),a=n(2),o=n(1),s=n(10);t.default={name:"BInput",components:r()({},a.a.name,a.a),mixins:[s.a],inheritAttrs:!1,props:{value:[Number,String],type:{type:String,default:"text"},passwordReveal:Boolean,hasCounter:{type:Boolean,default:!0}},data:function(){return{newValue:this.value,newType:this.type,newAutocomplete:this.autocomplete||o.b.defaultInputAutocomplete,isPasswordVisible:!1,_elementRef:"textarea"===this.type?"textarea":"input"}},computed:{rootClasses:function(){return[this.iconPosition,this.size,{"is-expanded":this.expanded,"is-loading":this.loading,"is-clearfix":!this.hasMessage}]},inputClasses:function(){return[this.statusType,this.size,{"is-rounded":this.rounded}]},hasIconRight:function(){return this.passwordReveal||this.loading||this.statusType},iconPosition:function(){return this.icon&&this.hasIconRight?"has-icons-left has-icons-right":!this.icon&&this.hasIconRight?"has-icons-right":this.icon?"has-icons-left":void 0},statusTypeIcon:function(){switch(this.statusType){case"is-success":return"check";case"is-danger":return"alert-circle";case"is-info":return"information";case"is-warning":return"alert"}},hasMessage:function(){return!!this.statusMessage},passwordVisibleIcon:function(){return this.isPasswordVisible?"eye-off":"eye"},valueLength:function(){return this.newValue?this.newValue.length:0}},watch:{value:function(e){this.newValue=e},newValue:function(e){this.$emit("input",e),!this.isValid&&this.checkHtml5Validity()}},methods:{togglePasswordVisibility:function(){var e=this;this.isPasswordVisible=!this.isPasswordVisible,this.newType=this.isPasswordVisible?"text":"password",this.$nextTick(function(){e.$refs.input.focus()})},onInput:function(e){var t=this;this.$nextTick(function(){t.newValue=e.target.value})}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(5),r=n(124);t.default={name:"BLoading",props:{active:Boolean,programmatic:Boolean,container:[Object,Function,r.a],isFullPage:{type:Boolean,default:!0},animation:{type:String,default:"fade"},canCancel:{type:Boolean,default:!1},onCancel:{type:Function,default:function(){}}},data:function(){return{isActive:this.active||!1}},watch:{active:function(e){this.isActive=e}},methods:{cancel:function(){this.canCancel&&this.close()},close:function(){var e=this;this.onCancel.apply(null,arguments),this.$emit("close"),this.$emit("update:active",!1),this.programmatic&&(this.isActive=!1,setTimeout(function(){e.$destroy(),n.i(i.a)(e.$el)},150))},keyPress:function(e){27===e.keyCode&&this.cancel()}},created:function(){"undefined"!=typeof window&&document.addEventListener("keyup",this.keyPress)},beforeMount:function(){this.programmatic&&(this.container?(this.isFullPage=!1,this.container.appendChild(this.$el)):document.body.appendChild(this.$el))},mounted:function(){this.programmatic&&(this.isActive=!0)},beforeDestroy:function(){"undefined"!=typeof window&&document.removeEventListener("keyup",this.keyPress)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(49);t.default={name:"BMessage",mixins:[i.a],data:function(){return{newIconSize:this.iconSize||this.size||"is-large"}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(5),r=n(1);t.default={name:"BModal",props:{active:Boolean,component:[Object,Function],content:String,programmatic:Boolean,props:Object,events:Object,width:{type:[String,Number],default:960},hasModalCard:Boolean,animation:{type:String,default:"zoom-out"},canCancel:{type:[Array,Boolean],default:function(){return["escape","x","outside","button"]}},onCancel:{type:Function,default:function(){}},scroll:{type:String,default:function(){return r.b.defaultModalScroll?r.b.defaultModalScroll:"clip"},validator:function(e){return["clip","keep"].indexOf(e)>=0}}},data:function(){return{isActive:this.active||!1,savedScrollTop:null,newWidth:"number"==typeof this.width?this.width+"px":this.width}},computed:{cancelOptions:function(){return"boolean"==typeof this.canCancel?this.canCancel?["escape","x","outside","button"]:[]:this.canCancel},showX:function(){return this.cancelOptions.indexOf("x")>=0}},watch:{active:function(e){this.isActive=e},isActive:function(){this.handleScroll()}},methods:{handleScroll:function(){if("undefined"!=typeof window){if("clip"===this.scroll)return void document.documentElement.classList.toggle("is-clipped",this.isActive);if(this.savedScrollTop=this.savedScrollTop?this.savedScrollTop:document.documentElement.scrollTop,document.body.classList.toggle("is-noscroll",this.isActive),this.isActive)return void(document.body.style.top="-"+this.savedScrollTop+"px");document.documentElement.scrollTop=this.savedScrollTop,document.body.style.top=null,this.savedScrollTop=null}},cancel:function(e){this.cancelOptions.indexOf(e)<0||(this.onCancel.apply(null,arguments),this.close())},close:function(){var e=this;this.$emit("close"),this.$emit("update:active",!1),this.programmatic&&(this.isActive=!1,setTimeout(function(){e.$destroy(),n.i(i.a)(e.$el)},150))},keyPress:function(e){this.isActive&&27===e.keyCode&&this.cancel("escape")}},created:function(){"undefined"!=typeof window&&document.addEventListener("keyup",this.keyPress)},beforeMount:function(){this.programmatic&&document.body.appendChild(this.$el)},mounted:function(){this.programmatic?this.isActive=!0:this.isActive&&this.handleScroll()},beforeDestroy:function(){"undefined"!=typeof window&&document.removeEventListener("keyup",this.keyPress)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(49);t.default={name:"BNotification",mixins:[i.a]}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),r=n.n(i),a=n(2);t.default={name:"BPagination",components:r()({},a.a.name,a.a),props:{total:[Number,String],perPage:{type:[Number,String],default:20},current:{type:[Number,String],default:1},size:String,simple:Boolean,rounded:Boolean,order:String},computed:{rootClasses:function(){return[this.order,this.size,{"is-simple":this.simple,"is-rounded":this.rounded}]},pageCount:function(){return Math.ceil(this.total/this.perPage)},firstItem:function(){var e=this.current*this.perPage-this.perPage+1;return e>=0?e:0},hasPrev:function(){return this.current>1},hasFirst:function(){return this.current>=3},hasFirstEllipsis:function(){return this.current>=4},hasLast:function(){return this.current<=this.pageCount-2},hasLastEllipsis:function(){return this.current<this.pageCount-2&&this.current<=this.pageCount-3},hasNext:function(){return this.current<this.pageCount},pagesInRange:function(){var e=this;if(!this.simple){for(var t=Math.max(1,this.current-1),n=Math.min(this.current+1,this.pageCount),i=[],r=t;r<=n;r++)(function(t){i.push({number:t,isCurrent:e.current===t,click:function(n){e.current!==t&&(e.$emit("change",t),e.$emit("update:current",t),e.$nextTick(function(){return n.target.focus()}))}})})(r);return i}}},watch:{pageCount:function(e){this.current>e&&this.last()}},methods:{prev:function(){this.hasPrev&&(this.$emit("change",this.current-1),this.$emit("update:current",this.current-1))},first:function(){this.$emit("change",1),this.$emit("update:current",1)},last:function(){this.$emit("change",this.pageCount),this.$emit("update:current",this.pageCount)},next:function(){this.hasNext&&(this.$emit("change",this.current+1),this.$emit("update:current",this.current+1))}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"BPanel",props:{collapsible:{type:Boolean,default:!1},open:{type:Boolean,default:!0},hasCustomTemplate:{type:Boolean,default:!1},header:String,content:String,animation:{type:String,default:"fade"}},data:function(){return{isOpen:this.open}},watch:{open:function(e){this.isOpen=e}},methods:{toggle:function(){this.collapsible&&(this.isOpen=!this.isOpen,this.$emit("update:open",this.isOpen),this.isOpen?this.$emit("open"):this.$emit("close"))}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),r=n.n(i);t.default={name:"BRadio",props:{value:[String,Number,Boolean,Function,Object,Array,r.a],nativeValue:[String,Number,Boolean,Function,Object,Array,r.a],disabled:Boolean,name:String,size:String},data:function(){return{newValue:this.value}},watch:{value:function(e){this.newValue=e},newValue:function(e){e===this.nativeValue&&this.$emit("input",e)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),r=n.n(i);t.default={name:"BRadioButton",props:{value:[String,Number,Boolean,Function,Object,Array,r.a],nativeValue:[String,Number,Boolean,Function,Object,Array,r.a],type:{type:String,default:"is-primary"},disabled:Boolean,name:String,size:String},data:function(){return{newValue:this.value}},watch:{value:function(e){this.newValue=e},newValue:function(e){e===this.nativeValue&&this.$emit("input",e)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),r=n.n(i),a=n(10);t.default={name:"BSelect",mixins:[a.a],inheritAttrs:!1,props:{value:{type:[String,Number,Boolean,Object,Array,r.a,Function],default:null},placeholder:String,multiple:Boolean,nativeSize:[String,Number]},data:function(){return{selected:this.value,_isSelect:!0,_elementRef:"select"}},computed:{spanClasses:function(){return[this.size,this.statusType,{"is-fullwidth":this.expanded,"is-loading":this.loading,"is-multiple":this.multiple,"is-rounded":this.rounded,"is-empty":null===this.selected}]}},watch:{value:function(e){this.selected=e,!this.isValid&&this.checkHtml5Validity()},selected:function(e){this.$emit("input",e),!this.isValid&&this.checkHtml5Validity()}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),r=n(50);t.default={name:"BSnackbar",mixins:[r.a],props:{actionText:{type:String,default:"OK"},onAction:{type:Function,default:function(){}},indefinite:{type:Boolean,default:!1}},data:function(){return{newDuration:this.duration||i.b.defaultSnackbarDuration}},methods:{action:function(){this.onAction(),this.close()}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),r=n.n(i);t.default={name:"BSwitch",props:{value:[String,Number,Boolean,Function,Object,Array,r.a],nativeValue:[String,Number,Boolean,Function,Object,Array,r.a],disabled:Boolean,type:String,name:String,size:String,trueValue:{type:[String,Number,Boolean,Function,Object,Array,r.a],default:!0},falseValue:{type:[String,Number,Boolean,Function,Object,Array,r.a],default:!1}},data:function(){return{newValue:this.value,isMouseDown:!1}},watch:{value:function(e){this.newValue=e},newValue:function(e){this.$emit("input",e)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(128),r=n.n(i),a=n(5),o=n(46),s=n(48),l=n(2),c=n(193),u=n.n(c),d=n(66),f=n.n(d);t.default={name:"BTable",components:{BPagination:s.a,BIcon:l.a,BCheckbox:o.a,BTableMobileSort:u.a,BTableColumn:f.a},props:{data:{type:Array,default:function(){return[]}},columns:{type:Array,default:function(){return[]}},bordered:Boolean,striped:Boolean,narrowed:Boolean,hoverable:Boolean,loading:Boolean,detailed:Boolean,checkable:Boolean,selected:Object,focusable:Boolean,customIsChecked:Function,isRowCheckable:{type:Function,default:function(){return!0}},checkedRows:{type:Array,default:function(){return[]}},mobileCards:{type:Boolean,default:!0},defaultSort:[String,Array],defaultSortDirection:{type:String,default:"asc"},paginated:Boolean,currentPage:{type:Number,default:1},perPage:{type:[Number,String],default:20},paginationSimple:Boolean,paginationSize:String,backendSorting:Boolean,rowClass:{type:Function,default:function(){return""}},openedDetailed:{type:Array,default:function(){return[]}},hasDetailedVisible:{type:Function,default:function(){return!0}},detailKey:{type:String,default:""},backendPagination:Boolean,total:{type:[Number,String],default:0}},data:function(){return{getValueByPath:a.c,newColumns:[].concat(r()(this.columns)),visibleDetailRows:this.openedDetailed,newData:this.data,newDataTotal:this.backendPagination?this.total:this.data.length,newCheckedRows:[].concat(r()(this.checkedRows)),newCurrentPage:this.currentPage,currentSortColumn:{},isAsc:!0,firstTimeSort:!0,_isTable:!0}},computed:{tableClasses:function(){return{"is-bordered":this.bordered,"is-striped":this.striped,"is-narrow":this.narrowed,"has-mobile-cards":this.mobileCards,"is-hoverable":(this.hoverable||this.focusable)&&this.visibleData.length}},visibleData:function(){if(!this.paginated)return this.newData;var e=this.newCurrentPage,t=this.perPage;if(this.newData.length<=t)return this.newData;var n=(e-1)*t,i=parseInt(n,10)+parseInt(t,10);return this.newData.slice(n,i)},isAllChecked:function(){var e=this;return!this.visibleData.filter(function(t){return e.isRowCheckable(t)}).some(function(t){return n.i(a.d)(e.newCheckedRows,t,e.customIsChecked)<0})},hasSortablenewColumns:function(){return this.newColumns.some(function(e){return e.sortable})},columnCount:function(){var e=this.newColumns.length;return e+=this.checkable?1:0,e+=this.detailed?1:0}},watch:{data:function(e){var t=this,n=this.newColumns;this.newColumns=[],this.newData=e,this.$nextTick(function(){t.newColumns.length||(t.newColumns=n)}),this.backendSorting||this.sort(this.currentSortColumn,!0),this.backendPagination||(this.newDataTotal=e.length)},total:function(e){this.backendPagination&&(this.newDataTotal=e)},checkedRows:function(e){this.newCheckedRows=[].concat(r()(e))},columns:function(e){this.newColumns=[].concat(r()(e))},newColumns:function(e){if(e.length&&this.firstTimeSort)this.initSort(),this.firstTimeSort=!1;else if(e.length)for(var t=0;t<e.length;t++)if(e[t].newKey===this.currentSortColumn.newKey){this.currentSortColumn=e[t];break}},openedDetailed:function(e){this.visibleDetailRows=e},currentPage:function(e){this.newCurrentPage=e}},methods:{sortBy:function(e,t,i,o){return i&&"function"==typeof i?[].concat(r()(e)).sort(function(e,t){return i(e,t,o)}):[].concat(r()(e)).sort(function(e,i){var r=n.i(a.c)(e,t),s=n.i(a.c)(i,t);return r||0===r?s||0===s?r===s?0:(r="string"==typeof r?r.toUpperCase():r,s="string"==typeof s?s.toUpperCase():s,o?r>s?1:-1:r>s?-1:1):-1:1})},sort:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e&&e.sortable&&(t||(this.isAsc=e===this.currentSortColumn?!this.isAsc:"desc"!==this.defaultSortDirection.toLowerCase()),this.firstTimeSort||this.$emit("sort",e.field,this.isAsc?"asc":"desc"),this.backendSorting||(this.newData=this.sortBy(this.newData,e.field,e.customSort,this.isAsc)),this.currentSortColumn=e)},isRowChecked:function(e){return n.i(a.d)(this.newCheckedRows,e,this.customIsChecked)>=0},removeCheckedRow:function(e){var t=n.i(a.d)(this.newCheckedRows,e,this.customIsChecked);t>=0&&this.newCheckedRows.splice(t,1)},checkAll:function(){var e=this,t=this.isAllChecked;this.visibleData.forEach(function(n){e.removeCheckedRow(n),t||e.isRowCheckable(n)&&e.newCheckedRows.push(n)}),this.$emit("check",this.newCheckedRows),this.$emit("check-all",this.newCheckedRows),this.$emit("update:checkedRows",this.newCheckedRows)},checkRow:function(e){this.isRowChecked(e)?this.removeCheckedRow(e):this.newCheckedRows.push(e),this.$emit("check",this.newCheckedRows,e),this.$emit("update:checkedRows",this.newCheckedRows)},selectRow:function(e,t){this.$emit("click",e),this.selected!==e&&(this.$emit("select",e,this.selected),this.$emit("update:selected",e))},pageChanged:function(e){this.newCurrentPage=e>0?e:1,this.$emit("page-change",this.newCurrentPage),this.$emit("update:currentPage",this.newCurrentPage)},toggleDetails:function(e){this.isVisibleDetailRow(e)?(this.closeDetailRow(e),this.$emit("details-close",e)):(this.openDetailRow(e),this.$emit("details-open",e)),this.$emit("update:openedDetailed",this.visibleDetailRows)},openDetailRow:function(e){var t=this.handleDetailKey(e);this.visibleDetailRows.push(t)},closeDetailRow:function(e){var t=this.handleDetailKey(e),n=this.visibleDetailRows.indexOf(t);this.visibleDetailRows.splice(n,1)},isVisibleDetailRow:function(e){var t=this.handleDetailKey(e);return this.visibleDetailRows.indexOf(t)>=0},handleDetailKey:function(e){var t=this.detailKey;return t.length?e[t]:e},checkPredefinedDetailedRows:function(){if(this.openedDetailed.length>0&&!this.detailKey.length)throw new Error('If you set a predefined opened-detailed, you must provide an unique key using the prop "detail-key"')},hasCustomFooterSlot:function(){if(this.$slots.footer.length>1)return!0;var e=this.$slots.footer[0].tag;return"th"===e||"td"===e},pressedArrow:function(e){if(this.visibleData.length){var t=this.visibleData.indexOf(this.selected)+e;t=t<0?0:t>this.visibleData.length-1?this.visibleData.length-1:t,this.selectRow(this.visibleData[t])}},focus:function(){this.focusable&&this.$el.querySelector("table").focus()},initSort:function(){var e=this;if(this.defaultSort){var t="",n=this.defaultSortDirection;Array.isArray(this.defaultSort)?(t=this.defaultSort[0],this.defaultSort[1]&&(n=this.defaultSort[1])):t=this.defaultSort,this.newColumns.forEach(function(i){i.field===t&&(e.isAsc="desc"!==n.toLowerCase(),e.sort(i,!0))})}}},mounted:function(){this.checkPredefinedDetailedRows()}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),r=n.n(i);t.default={name:"BTableColumn",props:{label:String,customKey:[String,Number],field:String,meta:[String,Number,Boolean,Function,Object,Array,r.a],width:[Number,String],numeric:Boolean,centered:Boolean,sortable:Boolean,visible:{type:Boolean,default:!0},customSort:Function,internal:Boolean},data:function(){return{newKey:this.customKey||this.label}},computed:{rootClasses:function(){return{"has-text-right":this.numeric&&!this.centered,"has-text-centered":this.centered}}},created:function(){var e=this;if(!this.$parent.$data._isTable)throw this.$destroy(),new Error("You should wrap bTableColumn on a bTable");if(!this.internal){!this.$parent.columns.some(function(t){return t.newKey===e.newKey})&&this.$parent.columns.push(this)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(24),r=n(2);t.default={name:"BTableMobileSort",components:{BSelect:i.a,BIcon:r.a},props:{currentSortColumn:Object,isAsc:Boolean,columns:Array},data:function(){return{mobileSort:this.currentSortColumn}},watch:{mobileSort:function(e){this.currentSortColumn!==e&&this.$emit("sort",e)},currentSortColumn:function(e){this.mobileSort=e}},methods:{sort:function(){this.$emit("sort",this.mobileSort)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"BTabItem",props:{label:String,icon:String,iconPack:String,disabled:Boolean,visible:{type:Boolean,default:!0}},data:function(){return{isActive:!1,transitionName:null}},methods:{activate:function(e,t){this.$parent.animated?this.transitionName=t<e?"slide-next":"slide-prev":this.transitionName=null,this.isActive=!0},deactivate:function(e,t){this.$parent.animated?this.transitionName=t<e?"slide-next":"slide-prev":this.transitionName=null,this.isActive=!1}},created:function(){if(!this.$parent.$data._isTabs)throw this.$destroy(),new Error("You should wrap bTabItem on a bTabs");this.$parent.tabItems.push(this)},updated:function(){this.$emit("updated")},beforeDestroy:function(){var e=this.$parent.tabItems.indexOf(this);e>=0&&this.$parent.tabItems.splice(e,1)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i,r=n(6),a=n.n(r),o=n(2),s=n(123);t.default={name:"BTabs",components:(i={},a()(i,o.a.name,o.a),a()(i,s.a.name,s.a),i),props:{value:[String,Number],expanded:Boolean,type:String,size:String,position:String,animated:{type:Boolean,default:!0}},data:function(){return{activeTab:this.value||0,tabItems:[],contentHeight:0,_isTabs:!0}},computed:{navClasses:function(){return[this.type,this.size,this.position,{"is-fullwidth":this.expanded,"is-toggle-rounded is-toggle":"is-toggle-rounded"===this.type}]}},watch:{value:function(e){this.changeTab(e)},tabItems:function(){this.tabItems.length&&(this.tabItems[this.activeTab].isActive=!0)}},methods:{changeTab:function(e){this.activeTab!==e&&(this.tabItems[this.activeTab].deactivate(this.activeTab,e),this.tabItems[e].activate(this.activeTab,e),this.activeTab=e,this.$emit("change",e))},tabClick:function(e){this.$emit("input",e),this.changeTab(e)}},mounted:function(){this.tabItems.length&&(this.tabItems[this.activeTab].isActive=!0)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"BTag",props:{attached:Boolean,closable:Boolean,type:String,size:String,rounded:Boolean,disabled:Boolean,tabstop:{type:Boolean,default:!0}},methods:{close:function(){this.disabled||this.$emit("close")}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"BTaglist",props:{attached:Boolean}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(52),r=n.n(i),a=n(6),o=n.n(a),s=n(5),l=n(45),c=n(10);t.default={name:"BTaginput",components:o()({},l.a.name,l.a),mixins:[c.a],inheritAttrs:!1,props:{value:{type:Array,default:function(){return[]}},data:{type:Array,default:function(){return[]}},type:String,rounded:{type:Boolean,default:!1},attached:{type:Boolean,default:!1},maxtags:{type:[Number,String],required:!1},field:{type:String,default:"value"},autocomplete:Boolean,disabled:Boolean,confirmKeyCodes:{type:Array,default:function(){return[13,188]}},removeOnKeys:{type:Array,default:function(){return[8]}},allowNew:Boolean},data:function(){return{tags:this.value||[],newTag:"",_elementRef:"input",_isTaginput:!0}},computed:{rootClasses:function(){return{"is-expanded":this.expanded}},containerClasses:function(){return{"is-focused":this.isFocused,"is-focusable":this.hasInput}},valueLength:function(){return this.newTag.trim().length},defaultSlotName:function(){return this.hasDefaultSlot?"default":"dontrender"},emptySlotName:function(){return this.hasEmptySlot?"empty":"dontrender"},hasDefaultSlot:function(){return!!this.$scopedSlots.default},hasEmptySlot:function(){return!!this.$slots.empty},hasInput:function(){return null==this.maxtags||this.tagsLength<this.maxtags},tagsLength:function(){return this.tags.length}},watch:{value:function(e){this.tags=e},newTag:function(e){this.$emit("typing",e.trim())},hasInput:function(){this.hasInput||this.onBlur()}},methods:{addTag:function(e){var t=e||this.newTag.trim();t&&-1===this.tags.indexOf(t)&&(this.tags.push(t),this.$emit("input",this.tags),this.$emit("add",t)),this.newTag=""},getNormalizedTagText:function(e){return"object"===(void 0===e?"undefined":r()(e))?n.i(s.c)(e,this.field):e},customOnBlur:function(e){this.autocomplete||this.addTag(),this.onBlur(e)},onSelect:function(e){var t=this;e&&(this.addTag(e),this.$nextTick(function(){t.newTag=""}))},removeTag:function(e){var t=this.tags.splice(e,1)[0];return this.$emit("input",this.tags),this.$emit("remove",t),t},removeLastTag:function(){this.tagsLength>0&&this.removeTag(this.tagsLength-1)},keydown:function(e){-1===this.removeOnKeys.indexOf(e.keyCode)||this.newTag.length||this.removeLastTag(),this.autocomplete&&!this.allowNew||this.confirmKeyCodes.indexOf(e.keyCode)>=0&&(e.preventDefault(),this.addTag())}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i,r=n(6),a=n.n(r),o=n(10),s=n(5),l=n(1),c=n(28),u=n(23),d=n(29),f=n(24),p=n(2),h="AM",v="PM",m=function(e){return(e<10?"0":"")+e},y=function(e,t){var n=e.getHours(),i=e.getMinutes(),r=!1;return"12"===t.hourFormat&&(r=n<12,n>12?n-=12:0===n&&(n=12)),m(n)+":"+m(i)+("12"===t.hourFormat?" "+(r?h:v):"")},g=function(e,t){if(e){var n=e,i=!1;if("12"===t.hourFormat){var r=e.split(" ");n=r[0],i=r[1]===h}var a=n.split(":"),o=parseInt(a[0],10),s=parseInt(a[1],10);if(isNaN(o)||o<0||o>23||"12"===t.hourFormat&&(o<1||o>12)||isNaN(s)||s<0||s>59)return null;var l=null;return t.dateSelected&&!isNaN(t.dateSelected)?l=new Date(t.dateSelected):(l=new Date,l.setMilliseconds(0),l.setSeconds(0)),l.setMinutes(s),"12"===t.hourFormat&&(i&&12===o?o=0:i||12===o||(o+=12)),l.setHours(o),l}return null};t.default={name:"BTimepicker",components:(i={},a()(i,u.a.name,u.a),a()(i,d.a.name,d.a),a()(i,f.a.name,f.a),a()(i,p.a.name,p.a),a()(i,c.a.name,c.a),a()(i,c.b.name,c.b),i),mixins:[o.a],inheritAttrs:!1,props:{value:Date,inline:Boolean,minTime:Date,maxTime:Date,placeholder:String,readonly:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},hourFormat:{type:String,default:"24",validator:function(e){return"24"===e||"12"===e}},incrementMinutes:{type:Number,default:1},timeFormatter:{type:Function,default:function(e,t){return"function"==typeof l.b.defaultTimeFormatter?l.b.defaultTimeFormatter(e):y(e,t)}},timeParser:{type:Function,default:function(e,t){return"function"==typeof l.b.defaultTimeParser?l.b.defaultTimeParser(e):g(e,t)}},mobileNative:{type:Boolean,default:function(){return l.b.defaultTimepickerMobileNative}},position:String,unselectableTimes:Array},data:function(){return{dateSelected:this.value,hoursSelected:null,minutesSelected:null,meridienSelected:null,_elementRef:"input",_isTimepicker:!0}},computed:{hours:function(){for(var e=[],t=this.isHourFormat24?24:12,n=0;n<t;n++){var i=n,r=i;this.isHourFormat24||(i=n+1,r=i,this.meridienSelected===h?12===i&&(i=0):this.meridienSelected===v&&12!==i&&(i+=12)),e.push({label:m(r),value:i})}return e},minutes:function(){for(var e=[],t=0;t<60;t+=this.incrementMinutes)e.push({label:m(t),value:t});return e},meridiens:function(){return[h,v]},isMobile:function(){return this.mobileNative&&s.b.any()},isHourFormat24:function(){return"24"===this.hourFormat}},watch:{hourFormat:function(e){null!==this.hoursSelected&&(this.meridienSelected=this.hoursSelected>=12?v:h)},dateSelected:function(e){this.$emit("input",e)},value:function(e){this.updateInternalState(e),this.dateSelected=e,!this.isValid&&this.$refs.input.checkHtml5Validity()}},methods:{onMeridienChange:function(e){null!==this.hoursSelected&&(e===v?0===this.hoursSelected?this.hoursSelected=12:this.hoursSelected+=12:e===h&&(12===this.hoursSelected?this.hoursSelected=0:this.hoursSelected-=12)),this.updateDateSelected(this.hoursSelected,this.minutesSelected,e)},onHoursChange:function(e){this.updateDateSelected(parseInt(e,10),this.minutesSelected,this.meridienSelected)},onMinutesChange:function(e){this.updateDateSelected(this.hoursSelected,parseInt(e,10),this.meridienSelected)},updateDateSelected:function(e,t,n){null!=e&&null!=t&&(!this.isHourFormat24&&null!==n||this.isHourFormat24)&&(this.dateSelected&&!isNaN(this.dateSelected)?this.dateSelected=new Date(this.dateSelected):(this.dateSelected=new Date,this.dateSelected.setMilliseconds(0),this.dateSelected.setSeconds(0)),this.dateSelected.setHours(e),this.dateSelected.setMinutes(t))},updateInternalState:function(e){e?(this.hoursSelected=e.getHours(),this.minutesSelected=e.getMinutes(),this.meridienSelected=e.getHours()>=12?v:h):(this.hoursSelected=null,this.minutesSelected=null,this.meridienSelected=h)},isHourDisabled:function(e){var t=this,n=!1;if(this.minTime){var i=this.minTime.getHours();n=e<i}if(this.maxTime&&!n){var r=this.maxTime.getHours();n=e>r}if(this.unselectableTimes&&!n)if(null!==this.minutesSelected){var a=this.unselectableTimes.filter(function(n){return n.getHours()===e&&n.getMinutes()===t.minutesSelected});n=a.length>0}else{var o=this.unselectableTimes.filter(function(t){return t.getHours()===e});n=o.length===this.minutes.length}return n},isMinuteDisabled:function(e){var t=this,n=!1;if(null!==this.hoursSelected){if(this.isHourDisabled(this.hoursSelected))n=!0;else{if(this.minTime){var i=this.minTime.getHours(),r=this.minTime.getMinutes();n=this.hoursSelected===i&&e<r}if(this.maxTime&&!n){var a=this.maxTime.getHours(),o=this.maxTime.getMinutes();n=this.hoursSelected===a&&e>o}}if(this.unselectableTimes&&!n){n=this.unselectableTimes.filter(function(n){return n.getHours()===t.hoursSelected&&n.getMinutes()===e}).length>0}}return n},onChange:function(e){var t=this.timeParser(e,this);this.updateInternalState(t),t&&!isNaN(t)?this.dateSelected=t:(this.dateSelected=null,this.$refs.input.newValue=this.dateSelected)},formatValue:function(e){return e&&!isNaN(e)?this.timeFormatter(e,this):null},close:function(){this.$refs.dropdown&&(this.$refs.dropdown.isActive=!1)},formatHHMMSS:function(e){var t=new Date(e);if(e&&!isNaN(t)){var n=t.getHours(),i=t.getMinutes();return m(n)+":"+m(i)+":00"}return""},onChangeNativePicker:function(e){var t=e.target.value;if(t){this.dateSelected&&!isNaN(this.dateSelected)?this.dateSelected=new Date(this.dateSelected):(this.dateSelected=new Date,this.dateSelected.setMilliseconds(0),this.dateSelected.setSeconds(0));var n=t.split(":");this.dateSelected.setHours(parseInt(n[0],10)),this.dateSelected.setMinutes(parseInt(n[1],10))}else this.dateSelected=null}},mounted:function(){this.updateInternalState(this.value)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),r=n(50);t.default={name:"BToast",mixins:[r.a],data:function(){return{newDuration:this.duration||i.b.defaultToastDuration}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);t.default={name:"BTooltip",props:{active:{type:Boolean,default:!0},type:String,label:String,position:{type:String,default:"is-top",validator:function(e){return["is-top","is-bottom","is-left","is-right"].indexOf(e)>-1}},always:Boolean,animated:Boolean,square:Boolean,dashed:Boolean,multilined:Boolean,size:{type:String,default:"is-medium"}},computed:{newType:function(){return this.type||i.b.defaultTooltipType},newAnimated:function(){return this.animated||i.b.defaultTooltipAnimated}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(10);t.default={name:"BUpload",mixins:[i.a],inheritAttrs:!1,props:{value:{type:Array,default:function(){return[]}},multiple:Boolean,disabled:Boolean,accept:String,dragDrop:Boolean,type:{type:String,default:"is-primary"},native:{type:Boolean,default:!1}},data:function(){return{newValue:this.value||[],dragDropFocus:!1,_elementRef:"input"}},watch:{value:function(e){this.newValue=e,0===this.newValue.length&&(this.$refs.input.value=null),!this.isValid&&!this.dragDrop&&this.checkHtml5Validity()}},methods:{onFileChange:function(e){if(!this.disabled&&!this.loading){this.dragDrop&&this.updateDragDropFocus(!1);var t=e.target.files||e.dataTransfer.files;if(t&&t.length){if(this.multiple)this.native&&(this.newValue=[]);else if(this.dragDrop){if(1!==t.length)return!1;this.newValue=[]}else this.newValue=[];for(var n=0;n<t.length;n++){var i=t[n];this.checkType(i)&&this.newValue.push(i)}}this.$emit("input",this.newValue),!this.dragDrop&&this.checkHtml5Validity()}},updateDragDropFocus:function(e){this.disabled||this.loading||(this.dragDropFocus=e)},checkType:function(e){if(!this.accept)return!0;var t=this.accept.split(",");if(0===t.length)return!0;for(var n=!1,i=0;i<t.length&&!n;i++){var r=t[i].trim();if(r)if("."===r.substring(0,1)){var a=e.name.lastIndexOf(".");a>=0&&e.name.substring(a)===r&&(n=!0)}else e.type.match(r)&&(n=!0)}return n}}}},function(e,t,n){"use strict";var i=n(171),r=n.n(i);t.a=r.a},function(e,t,n){"use strict";var i=n(172),r=n.n(i);t.a=r.a},function(e,t,n){"use strict";function i(e){return new(o.a.extend(l.a))({el:document.createElement("div"),propsData:e})}var r=n(13),a=n.n(r),o=n(22),s=n(175),l=n.n(s);t.a={alert:function(e){var t=void 0;"string"==typeof e&&(t=e);var n={canCancel:!1,message:t};return i(a()(n,e))},confirm:function(e){var t={};return i(a()(t,e))},prompt:function(e){var t={hasInput:!0,confirmText:"Done"};return i(a()(t,e))}}},function(e,t,n){"use strict";var i=n(13),r=n.n(i),a=n(22),o=n(181),s=n.n(o);n.d(t,"a",function(){return s.a}),t.b={open:function(e){var t={programmatic:!0},n=r()(t,e);return new(a.a.extend(s.a))({el:document.createElement("div"),propsData:n})}}},function(e,t,n){"use strict";var i=n(182),r=n.n(i);t.a=r.a},function(e,t,n){"use strict";var i=n(184),r=n.n(i);t.a=r.a},function(e,t,n){"use strict";var i=n(186),r=n.n(i);t.a=r.a},function(e,t,n){"use strict";var i=n(187),r=n.n(i),a=n(188),o=n.n(a);n.d(t,"a",function(){return r.a}),n.d(t,"b",function(){return o.a})},function(e,t,n){"use strict";var i=n(13),r=n.n(i),a=n(22),o=n(190),s=n.n(o);t.a={open:function(e){var t=void 0;"string"==typeof e&&(t=e);var n={type:"is-success",position:"is-bottom-right",message:t},i=r()(n,e);return new(a.a.extend(s.a))({el:document.createElement("div"),propsData:i})}}},function(e,t,n){"use strict";var i=n(191),r=n.n(i);t.a=r.a},function(e,t,n){"use strict";var i=n(192),r=n.n(i),a=n(66),o=n.n(a);n.d(t,"a",function(){return r.a}),n.d(t,"b",function(){return o.a})},function(e,t,n){"use strict";var i=n(195),r=n.n(i),a=n(194),o=n.n(a);n.d(t,"b",function(){return r.a}),n.d(t,"a",function(){return o.a})},function(e,t,n){"use strict";var i=n(196),r=n.n(i),a=n(197),o=n.n(a);n.d(t,"a",function(){return r.a}),n.d(t,"b",function(){return o.a})},function(e,t,n){"use strict";var i=n(198),r=n.n(i);t.a=r.a},function(e,t,n){"use strict";var i=n(199),r=n.n(i);t.a=r.a},function(e,t,n){"use strict";var i=n(13),r=n.n(i),a=n(22),o=n(200),s=n.n(o);t.a={open:function(e){var t=void 0;"string"==typeof e&&(t=e);var n={message:t},i=r()(n,e);return new(a.a.extend(s.a))({el:document.createElement("div"),propsData:i})}}},function(e,t,n){"use strict";var i=n(201),r=n.n(i);t.a=r.a},function(e,t,n){"use strict";var i=n(202),r=n.n(i);t.a=r.a},function(e,t,n){"use strict";t.a={name:"BSlotComponent",props:{component:{type:Object,required:!0},name:{type:String,default:"default"},tag:{type:String,default:"div"},event:{type:String,default:"updated"}},methods:{refresh:function(){this.$forceUpdate()},isVueComponent:function(){return this.component&&this.component._isVue}},created:function(){this.isVueComponent()&&this.component.$on(this.event,this.refresh)},beforeDestroy:function(){this.isVueComponent()&&this.component.$off(this.event,this.refresh)},render:function(e){if(this.isVueComponent()){var t=this.component.$slots[this.name];return e(this.tag,{},t)}}}},function(e,t,n){"use strict";n.d(t,"a",function(){return r});var i="undefined"==typeof window,r=i?Object:window.HTMLElement},function(e,t,n){e.exports={default:n(129),__esModule:!0}},function(e,t,n){e.exports={default:n(132),__esModule:!0}},function(e,t,n){e.exports={default:n(134),__esModule:!0}},function(e,t,n){"use strict";t.__esModule=!0;var i=n(125),r=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return(0,r.default)(e)}},function(e,t,n){n(43),n(157),e.exports=n(7).Array.from},function(e,t,n){n(64),n(43),e.exports=n(156)},function(e,t,n){n(159),e.exports=n(7).Object.assign},function(e,t,n){n(160);var i=n(7).Object;e.exports=function(e,t,n){return i.defineProperty(e,t,n)}},function(e,t,n){n(162),n(161),n(163),n(164),e.exports=n(7).Symbol},function(e,t,n){n(43),n(64),e.exports=n(42).f("iterator")},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t){e.exports=function(){}},function(e,t,n){var i=n(16),r=n(62),a=n(155);e.exports=function(e){return function(t,n,o){var s,l=i(t),c=r(l.length),u=a(o,c);if(e&&n!=n){for(;c>u;)if((s=l[u++])!=s)return!0}else for(;c>u;u++)if((e||u in l)&&l[u]===n)return e||u||0;return!e&&-1}}},function(e,t,n){var i=n(30),r=n(4)("toStringTag"),a="Arguments"==i(function(){return arguments}()),o=function(e,t){try{return e[t]}catch(e){}};e.exports=function(e){var t,n,s;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=o(t=Object(e),r))?n:a?i(t):"Object"==(s=i(t))&&"function"==typeof t.callee?"Arguments":s}},function(e,t,n){"use strict";var i=n(9),r=n(21);e.exports=function(e,t,n){t in e?i.f(e,t,r(0,n)):e[t]=n}},function(e,t,n){var i=n(25),r=n(34),a=n(26);e.exports=function(e){var t=i(e),n=r.f;if(n)for(var o,s=n(e),l=a.f,c=0;s.length>c;)l.call(e,o=s[c++])&&t.push(o);return t}},function(e,t,n){var i=n(8).document;e.exports=i&&i.documentElement},function(e,t,n){var i=n(20),r=n(4)("iterator"),a=Array.prototype;e.exports=function(e){return void 0!==e&&(i.Array===e||a[r]===e)}},function(e,t,n){var i=n(30);e.exports=Array.isArray||function(e){return"Array"==i(e)}},function(e,t,n){var i=n(14);e.exports=function(e,t,n,r){try{return r?t(i(n)[0],n[1]):t(n)}catch(t){var a=e.return;throw void 0!==a&&i(a.call(e)),t}}},function(e,t,n){"use strict";var i=n(58),r=n(21),a=n(35),o={};n(15)(o,n(4)("iterator"),function(){return this}),e.exports=function(e,t,n){e.prototype=i(o,{next:r(1,n)}),a(e,t+" Iterator")}},function(e,t,n){var i=n(4)("iterator"),r=!1;try{var a=[7][i]();a.return=function(){r=!0},Array.from(a,function(){throw 2})}catch(e){}e.exports=function(e,t){if(!t&&!r)return!1;var n=!1;try{var a=[7],o=a[i]();o.next=function(){return{done:n=!0}},a[i]=function(){return o},e(a)}catch(e){}return n}},function(e,t){e.exports=function(e,t){return{value:t,done:!!e}}},function(e,t,n){var i=n(27)("meta"),r=n(19),a=n(12),o=n(9).f,s=0,l=Object.isExtensible||function(){return!0},c=!n(18)(function(){return l(Object.preventExtensions({}))}),u=function(e){o(e,i,{value:{i:"O"+ ++s,w:{}}})},d=function(e,t){if(!r(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!a(e,i)){if(!l(e))return"F";if(!t)return"E";u(e)}return e[i].i},f=function(e,t){if(!a(e,i)){if(!l(e))return!0;if(!t)return!1;u(e)}return e[i].w},p=function(e){return c&&h.NEED&&l(e)&&!a(e,i)&&u(e),e},h=e.exports={KEY:i,NEED:!1,fastKey:d,getWeak:f,onFreeze:p}},function(e,t,n){"use strict";var i=n(25),r=n(34),a=n(26),o=n(39),s=n(56),l=Object.assign;e.exports=!l||n(18)(function(){var e={},t={},n=Symbol(),i="abcdefghijklmnopqrst";return e[n]=7,i.split("").forEach(function(e){t[e]=e}),7!=l({},e)[n]||Object.keys(l({},t)).join("")!=i})?function(e,t){for(var n=o(e),l=arguments.length,c=1,u=r.f,d=a.f;l>c;)for(var f,p=s(arguments[c++]),h=u?i(p).concat(u(p)):i(p),v=h.length,m=0;v>m;)d.call(p,f=h[m++])&&(n[f]=p[f]);return n}:l},function(e,t,n){var i=n(9),r=n(14),a=n(25);e.exports=n(11)?Object.defineProperties:function(e,t){r(e);for(var n,o=a(t),s=o.length,l=0;s>l;)i.f(e,n=o[l++],t[n]);return e}},function(e,t,n){var i=n(26),r=n(21),a=n(16),o=n(40),s=n(12),l=n(55),c=Object.getOwnPropertyDescriptor;t.f=n(11)?c:function(e,t){if(e=a(e),t=o(t,!0),l)try{return c(e,t)}catch(e){}if(s(e,t))return r(!i.f.call(e,t),e[t])}},function(e,t,n){var i=n(16),r=n(59).f,a={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(e){try{return r(e)}catch(e){return o.slice()}};e.exports.f=function(e){return o&&"[object Window]"==a.call(e)?s(e):r(i(e))}},function(e,t,n){var i=n(12),r=n(39),a=n(36)("IE_PROTO"),o=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=r(e),i(e,a)?e[a]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?o:null}},function(e,t,n){var i=n(38),r=n(31);e.exports=function(e){return function(t,n){var a,o,s=String(r(t)),l=i(n),c=s.length;return l<0||l>=c?e?"":void 0:(a=s.charCodeAt(l),a<55296||a>56319||l+1===c||(o=s.charCodeAt(l+1))<56320||o>57343?e?s.charAt(l):a:e?s.slice(l,l+2):o-56320+(a-55296<<10)+65536)}}},function(e,t,n){var i=n(38),r=Math.max,a=Math.min;e.exports=function(e,t){return e=i(e),e<0?r(e+t,0):a(e,t)}},function(e,t,n){var i=n(14),r=n(63);e.exports=n(7).getIterator=function(e){var t=r(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return i(t.call(e))}},function(e,t,n){"use strict";var i=n(53),r=n(17),a=n(39),o=n(144),s=n(142),l=n(62),c=n(139),u=n(63);r(r.S+r.F*!n(146)(function(e){Array.from(e)}),"Array",{from:function(e){var t,n,r,d,f=a(e),p="function"==typeof this?this:Array,h=arguments.length,v=h>1?arguments[1]:void 0,m=void 0!==v,y=0,g=u(f);if(m&&(v=i(v,h>2?arguments[2]:void 0,2)),void 0==g||p==Array&&s(g))for(t=l(f.length),n=new p(t);t>y;y++)c(n,y,m?v(f[y],y):f[y]);else for(d=g.call(f),n=new p;!(r=d.next()).done;y++)c(n,y,m?o(d,v,[r.value,y],!0):r.value);return n.length=y,n}})},function(e,t,n){"use strict";var i=n(136),r=n(147),a=n(20),o=n(16);e.exports=n(57)(Array,"Array",function(e,t){this._t=o(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,n=this._i++;return!e||n>=e.length?(this._t=void 0,r(1)):"keys"==t?r(0,n):"values"==t?r(0,e[n]):r(0,[n,e[n]])},"values"),a.Arguments=a.Array,i("keys"),i("values"),i("entries")},function(e,t,n){var i=n(17);i(i.S+i.F,"Object",{assign:n(149)})},function(e,t,n){var i=n(17);i(i.S+i.F*!n(11),"Object",{defineProperty:n(9).f})},function(e,t){},function(e,t,n){"use strict";var i=n(8),r=n(12),a=n(11),o=n(17),s=n(61),l=n(148).KEY,c=n(18),u=n(37),d=n(35),f=n(27),p=n(4),h=n(42),v=n(41),m=n(140),y=n(143),g=n(14),b=n(19),_=n(16),w=n(40),k=n(21),C=n(58),x=n(152),S=n(151),D=n(9),$=n(25),A=S.f,O=D.f,T=x.f,M=i.Symbol,P=i.JSON,B=P&&P.stringify,F=p("_hidden"),V=p("toPrimitive"),I={}.propertyIsEnumerable,E=u("symbol-registry"),N=u("symbols"),j=u("op-symbols"),R=Object.prototype,L="function"==typeof M,z=i.QObject,H=!z||!z.prototype||!z.prototype.findChild,W=a&&c(function(){return 7!=C(O({},"a",{get:function(){return O(this,"a",{value:7}).a}})).a})?function(e,t,n){var i=A(R,t);i&&delete R[t],O(e,t,n),i&&e!==R&&O(R,t,i)}:O,q=function(e){var t=N[e]=C(M.prototype);return t._k=e,t},Y=L&&"symbol"==typeof M.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof M},U=function(e,t,n){return e===R&&U(j,t,n),g(e),t=w(t,!0),g(n),r(N,t)?(n.enumerable?(r(e,F)&&e[F][t]&&(e[F][t]=!1),n=C(n,{enumerable:k(0,!1)})):(r(e,F)||O(e,F,k(1,{})),e[F][t]=!0),W(e,t,n)):O(e,t,n)},K=function(e,t){g(e);for(var n,i=m(t=_(t)),r=0,a=i.length;a>r;)U(e,n=i[r++],t[n]);return e},G=function(e,t){return void 0===t?C(e):K(C(e),t)},J=function(e){var t=I.call(this,e=w(e,!0));return!(this===R&&r(N,e)&&!r(j,e))&&(!(t||!r(this,e)||!r(N,e)||r(this,F)&&this[F][e])||t)},X=function(e,t){if(e=_(e),t=w(t,!0),e!==R||!r(N,t)||r(j,t)){var n=A(e,t);return!n||!r(N,t)||r(e,F)&&e[F][t]||(n.enumerable=!0),n}},Q=function(e){for(var t,n=T(_(e)),i=[],a=0;n.length>a;)r(N,t=n[a++])||t==F||t==l||i.push(t);return i},Z=function(e){for(var t,n=e===R,i=T(n?j:_(e)),a=[],o=0;i.length>o;)!r(N,t=i[o++])||n&&!r(R,t)||a.push(N[t]);return a};L||(M=function(){if(this instanceof M)throw TypeError("Symbol is not a constructor!");var e=f(arguments.length>0?arguments[0]:void 0),t=function(n){this===R&&t.call(j,n),r(this,F)&&r(this[F],e)&&(this[F][e]=!1),W(this,e,k(1,n))};return a&&H&&W(R,e,{configurable:!0,set:t}),q(e)},s(M.prototype,"toString",function(){return this._k}),S.f=X,D.f=U,n(59).f=x.f=Q,n(26).f=J,n(34).f=Z,a&&!n(33)&&s(R,"propertyIsEnumerable",J,!0),h.f=function(e){return q(p(e))}),o(o.G+o.W+o.F*!L,{Symbol:M});for(var ee="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),te=0;ee.length>te;)p(ee[te++]);for(var ne=$(p.store),ie=0;ne.length>ie;)v(ne[ie++]);o(o.S+o.F*!L,"Symbol",{for:function(e){return r(E,e+="")?E[e]:E[e]=M(e)},keyFor:function(e){if(!Y(e))throw TypeError(e+" is not a symbol!");for(var t in E)if(E[t]===e)return t},useSetter:function(){H=!0},useSimple:function(){H=!1}}),o(o.S+o.F*!L,"Object",{create:G,defineProperty:U,defineProperties:K,getOwnPropertyDescriptor:X,getOwnPropertyNames:Q,getOwnPropertySymbols:Z}),P&&o(o.S+o.F*(!L||c(function(){var e=M();return"[null]"!=B([e])||"{}"!=B({a:e})||"{}"!=B(Object(e))})),"JSON",{stringify:function(e){for(var t,n,i=[e],r=1;arguments.length>r;)i.push(arguments[r++]);if(n=t=i[1],(b(t)||void 0!==e)&&!Y(e))return y(t)||(t=function(e,t){if("function"==typeof n&&(t=n.call(this,e,t)),!Y(t))return t}),i[1]=t,B.apply(P,i)}}),M.prototype[V]||n(15)(M.prototype,V,M.prototype.valueOf),d(M,"Symbol"),d(Math,"Math",!0),d(i.JSON,"JSON",!0)},function(e,t,n){n(41)("asyncIterator")},function(e,t,n){n(41)("observable")},function(e,t){function n(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function r(e){if(u===setTimeout)return setTimeout(e,0);if((u===n||!u)&&setTimeout)return u=setTimeout,setTimeout(e,0);try{return u(e,0)}catch(t){try{return u.call(null,e,0)}catch(t){return u.call(this,e,0)}}}function a(e){if(d===clearTimeout)return clearTimeout(e);if((d===i||!d)&&clearTimeout)return d=clearTimeout,clearTimeout(e);try{return d(e)}catch(t){try{return d.call(null,e)}catch(t){return d.call(this,e)}}}function o(){v&&p&&(v=!1,p.length?h=p.concat(h):m=-1,h.length&&s())}function s(){if(!v){var e=r(o);v=!0;for(var t=h.length;t;){for(p=h,h=[];++m<t;)p&&p[m].run();m=-1,t=h.length}p=null,v=!1,a(e)}}function l(e,t){this.fun=e,this.array=t}function c(){}var u,d,f=e.exports={};(function(){try{u="function"==typeof setTimeout?setTimeout:n}catch(e){u=n}try{d="function"==typeof clearTimeout?clearTimeout:i}catch(e){d=i}})();var p,h=[],v=!1,m=-1;f.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];h.push(new l(e,t)),1!==h.length||v||r(s)},l.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=c,f.addListener=c,f.once=c,f.off=c,f.removeListener=c,f.removeAllListeners=c,f.emit=c,f.prependListener=c,f.prependOnceListener=c,f.listeners=function(e){return[]},f.binding=function(e){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(e){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}},function(e,t,n){(function(e,t){(function(e,n){"use strict";function i(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var i={callback:e,args:t};return c[l]=i,s(l),l++}function r(e){delete c[e]}function a(e){var t=e.callback,i=e.args;switch(i.length){case 0:t();break;case 1:t(i[0]);break;case 2:t(i[0],i[1]);break;case 3:t(i[0],i[1],i[2]);break;default:t.apply(n,i)}}function o(e){if(u)setTimeout(o,0,e);else{var t=c[e];if(t){u=!0;try{a(t)}finally{r(e),u=!1}}}}if(!e.setImmediate){var s,l=1,c={},u=!1,d=e.document,f=Object.getPrototypeOf&&Object.getPrototypeOf(e);f=f&&f.setTimeout?f:e,"[object process]"==={}.toString.call(e.process)?function(){s=function(e){t.nextTick(function(){o(e)})}}():!function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?e.MessageChannel?function(){var e=new MessageChannel;e.port1.onmessage=function(e){o(e.data)},s=function(t){e.port2.postMessage(t)}}():d&&"onreadystatechange"in d.createElement("script")?function(){var e=d.documentElement;s=function(t){var n=d.createElement("script");n.onreadystatechange=function(){o(t),n.onreadystatechange=null,e.removeChild(n),n=null},e.appendChild(n)}}():function(){s=function(e){setTimeout(o,0,e)}}():function(){var t="setImmediate$"+Math.random()+"$",n=function(n){n.source===e&&"string"==typeof n.data&&0===n.data.indexOf(t)&&o(+n.data.slice(t.length))};e.addEventListener?e.addEventListener("message",n,!1):e.attachEvent("onmessage",n),s=function(n){e.postMessage(t+n,"*")}}(),f.setImmediate=i,f.clearImmediate=r}})("undefined"==typeof self?void 0===e?this:e:self)}).call(t,n(44),n(165))},function(e,t,n){(function(e){function i(e,t){this._id=e,this._clearFn=t}var r=Function.prototype.apply;t.setTimeout=function(){return new i(r.call(setTimeout,window,arguments),clearTimeout)},t.setInterval=function(){return new i(r.call(setInterval,window,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(window,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n(166),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(t,n(44))},function(e,t,n){var i=n(0)(n(68),n(232),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(69),n(220),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(70),n(226),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(71),n(227),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(72),n(237),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(73),n(229),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(74),n(234),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(75),n(218),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(76),n(208),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(77),n(212),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(78),n(222),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(80),n(221),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(81),n(233),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(82),n(213),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(83),n(215),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(84),n(236),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(85),n(225),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(86),n(205),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(87),n(217),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(88),n(223),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(89),n(207),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(90),n(211),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(91),n(230),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(92),n(214),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(93),n(219),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(95),n(224),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(96),n(206),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(97),n(235),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(98),n(238),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(99),n(228),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(100),n(231),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(101),n(203),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(102),n(204),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(103),n(209),null,null,null);e.exports=i.exports},function(e,t,n){var i=n(0)(n(104),n(210),null,null,null);e.exports=i.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"timepicker control",class:[e.size,{"is-expanded":e.expanded}]},[!e.isMobile||e.inline?n("b-dropdown",{ref:"dropdown",attrs:{position:e.position,disabled:e.disabled,inline:e.inline}},[e.inline?e._e():n("b-input",e._b({ref:"input",attrs:{slot:"trigger",autocomplete:"off",value:e.formatValue(e.dateSelected),placeholder:e.placeholder,size:e.size,icon:e.icon,"icon-pack":e.iconPack,loading:e.loading,disabled:e.disabled,readonly:e.readonly,rounded:e.rounded},on:{focus:function(t){e.$emit("focus",t)},blur:function(t){e.$emit("blur",t)&&e.checkHtml5Validity()}},nativeOn:{change:function(t){e.onChange(t.target.value)}},slot:"trigger"},"b-input",e.$attrs,!1)),e._v(" "),n("b-dropdown-item",{attrs:{disabled:e.disabled,custom:""}},[n("div",{staticClass:"pagination-list"},[n("b-field",[n("b-select",{attrs:{disabled:e.disabled,placeholder:"00"},nativeOn:{change:function(t){e.onHoursChange(t.target.value)}},model:{value:e.hoursSelected,callback:function(t){e.hoursSelected=t},expression:"hoursSelected"}},e._l(e.hours,function(t){return n("option",{key:t.value,attrs:{disabled:e.isHourDisabled(t.value)},domProps:{value:t.value}},[e._v("\n                            "+e._s(t.label)+"\n                        ")])})),e._v(" "),n("b-select",{attrs:{disabled:e.disabled,placeholder:"00"},nativeOn:{change:function(t){e.onMinutesChange(t.target.value)}},model:{value:e.minutesSelected,callback:function(t){e.minutesSelected=t},expression:"minutesSelected"}},e._l(e.minutes,function(t){return n("option",{key:t.value,attrs:{disabled:e.isMinuteDisabled(t.value)},domProps:{value:t.value}},[e._v("\n                            "+e._s(t.label)+"\n                        ")])})),e._v(" "),e.isHourFormat24?e._e():n("b-select",{attrs:{disabled:e.disabled},nativeOn:{change:function(t){e.onMeridienChange(t.target.value)}},model:{value:e.meridienSelected,callback:function(t){e.meridienSelected=t},expression:"meridienSelected"}},e._l(e.meridiens,function(t){return n("option",{key:t,domProps:{value:t}},[e._v("\n                            "+e._s(t)+"\n                        ")])}))],1)],1),e._v(" "),void 0!==e.$slots.default&&e.$slots.default.length?n("footer",{staticClass:"timepicker-footer"},[e._t("default")],2):e._e()])],1):n("b-input",e._b({ref:"input",attrs:{type:"time",autocomplete:"off",value:e.formatHHMMSS(e.value),placeholder:e.placeholder,size:e.size,icon:e.icon,"icon-pack":e.iconPack,loading:e.loading,max:e.formatHHMMSS(e.maxTime),min:e.formatHHMMSS(e.minTime),disabled:e.disabled,readonly:!1},on:{focus:function(t){e.$emit("focus",t)},blur:function(t){e.$emit("blur",t)&&e.checkHtml5Validity()}},nativeOn:{change:function(t){e.onChangeNativePicker(t)}}},"b-input",e.$attrs,!1))],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{"enter-active-class":e.transition.enter,"leave-active-class":e.transition.leave}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.isActive,expression:"isActive"}],staticClass:"toast",class:[e.type,e.position]},[n("div",{domProps:{innerHTML:e._s(e.message)}})])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pagination",class:e.rootClasses},[n("a",{staticClass:"pagination-previous",attrs:{role:"button",href:"#",disabled:!e.hasPrev},on:{click:function(t){t.preventDefault(),e.prev(t)}}},[n("b-icon",{attrs:{icon:"chevron-left",both:""}})],1),e._v(" "),n("a",{staticClass:"pagination-next",attrs:{role:"button",href:"#",disabled:!e.hasNext},on:{click:function(t){t.preventDefault(),e.next(t)}}},[n("b-icon",{attrs:{icon:"chevron-right",both:""}})],1),e._v(" "),e.simple?e._e():n("ul",{staticClass:"pagination-list"},[e.hasFirst?n("li",[n("a",{staticClass:"pagination-link",attrs:{role:"button",href:"#"},on:{click:function(t){t.preventDefault(),e.first(t)}}},[e._v("\n                1\n            ")])]):e._e(),e._v(" "),e.hasFirstEllipsis?n("li",[n("span",{staticClass:"pagination-ellipsis"},[e._v("…")])]):e._e(),e._v(" "),e._l(e.pagesInRange,function(t){return n("li",{key:t.number},[n("a",{staticClass:"pagination-link",class:{"is-current":t.isCurrent},attrs:{role:"button",href:"#"},on:{click:function(e){e.preventDefault(),t.click(e)}}},[e._v("\n                "+e._s(t.number)+"\n            ")])])}),e._v(" "),e.hasLastEllipsis?n("li",[n("span",{staticClass:"pagination-ellipsis"},[e._v("…")])]):e._e(),e._v(" "),e.hasLast?n("li",[n("a",{staticClass:"pagination-link",attrs:{role:"button",href:"#"},on:{click:function(t){t.preventDefault(),e.last(t)}}},[e._v("\n                "+e._s(e.pageCount)+"\n            ")])]):e._e()],2),e._v(" "),e.simple?n("small",{staticClass:"info"},[e._v("\n        "+e._s(e.firstItem)+"-"+e._s(Math.min(e.current*e.perPage,e.total))+" / "+e._s(e.total)+"\n    ")]):e._e()])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:e.transitionName}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.isActive&&e.visible,expression:"isActive && visible"}],staticClass:"tab-item"},[e._t("default")],2)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"control"},[n("label",{ref:"label",staticClass:"b-radio radio button",class:[e.newValue===e.nativeValue?e.type:null,e.size],attrs:{disabled:e.disabled,tabindex:!e.disabled&&0},on:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key)&&e._k(t.keyCode,"space",32,t.key))return null;t.preventDefault(),e.$refs.label.click()}}},[e._t("default"),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newValue,expression:"newValue"}],attrs:{type:"radio",disabled:e.disabled,name:e.name},domProps:{value:e.nativeValue,checked:e._q(e.newValue,e.nativeValue)},on:{change:function(t){e.newValue=e.nativeValue}}})],2)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"dropdown",class:e.rootClasses},[e.inline?e._e():n("div",{ref:"trigger",staticClass:"dropdown-trigger",attrs:{role:"button"},on:{click:e.toggle}},[e._t("trigger")],2),e._v(" "),n("transition",{attrs:{name:"fade"}},[e.isMobileModal?n("div",{directives:[{name:"show",rawName:"v-show",value:e.isActive,expression:"isActive"}],staticClass:"background"}):e._e()]),e._v(" "),n("transition",{attrs:{name:"fade"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.isActive||e.hoverable||e.inline,expression:"isActive || hoverable || inline"}],ref:"dropdownMenu",staticClass:"dropdown-menu"},[n("div",{staticClass:"dropdown-content"},[e._t("default")],2)])])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("span",{class:[e.newType,e.position,e.size,{tooltip:e.active,"is-square":e.square,"is-animated":e.newAnimated,"is-always":e.always,"is-multiline":e.multilined,"is-dashed":e.dashed}],attrs:{"data-label":e.label}},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",{staticClass:"upload control"},[e.dragDrop?n("div",{staticClass:"upload-draggable",class:[e.type,{"is-loading":e.loading,"is-disabled":e.disabled,"is-hovered":e.dragDropFocus}],on:{dragover:function(t){t.preventDefault(),e.updateDragDropFocus(!0)},dragleave:function(t){t.preventDefault(),e.updateDragDropFocus(!1)},dragenter:function(t){t.preventDefault(),e.updateDragDropFocus(!0)},drop:function(t){t.preventDefault(),e.onFileChange(t)}}},[e._t("default")],2):[e._t("default")],e._v(" "),n("input",e._b({ref:"input",attrs:{type:"file",multiple:e.multiple,accept:e.accept,disabled:e.disabled},on:{change:e.onFileChange}},"input",e.$attrs,!1))],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"control",class:{"is-expanded":e.expanded,"has-icons-left":e.icon}},[n("span",{staticClass:"select",class:e.spanClasses},[n("select",e._b({directives:[{name:"model",rawName:"v-model",value:e.selected,expression:"selected"}],ref:"select",attrs:{multiple:e.multiple,size:e.nativeSize},on:{blur:function(t){e.$emit("blur",t)&&e.checkHtml5Validity()},focus:function(t){e.$emit("focus",t)},change:function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.selected=t.target.multiple?n:n[0]}}},"select",e.$attrs,!1),[e.placeholder?n("option",{attrs:{selected:"",disabled:"",hidden:""},domProps:{value:null}},[e._v("\n                "+e._s(e.placeholder)+"\n            ")]):e._e(),e._v(" "),e._t("default")],2)]),e._v(" "),e.icon?n("b-icon",{staticClass:"is-left",attrs:{icon:e.icon,pack:e.iconPack,size:e.iconSize}}):e._e()],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.separator?n("hr",{staticClass:"dropdown-divider"}):e.custom||e.hasLink?n("div",{class:e.itemClasses,on:{click:e.selectItem}},[e._t("default")],2):n("a",{staticClass:"dropdown-item",class:e.anchorClasses,on:{click:e.selectItem}},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:e.animation}},[e.isActive?n("div",{staticClass:"loading-overlay is-active",class:{"is-full-page":e.isFullPage}},[n("div",{staticClass:"loading-background",on:{click:e.cancel}}),e._v(" "),n("div",{staticClass:"loading-icon"})]):e._e()])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",{ref:"label",staticClass:"switch",class:[e.size,{"is-disabled":e.disabled}],attrs:{disabled:e.disabled,tabindex:!e.disabled&&0},on:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key)&&e._k(t.keyCode,"space",32,t.key))return null;t.preventDefault(),e.$refs.label.click()},mousedown:function(t){e.isMouseDown=!0},mouseup:function(t){e.isMouseDown=!1},mouseout:function(t){e.isMouseDown=!1},blur:function(t){e.isMouseDown=!1}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newValue,expression:"newValue"}],attrs:{type:"checkbox",disabled:e.disabled,name:e.name,"true-value":e.trueValue,"false-value":e.falseValue},domProps:{value:e.nativeValue,checked:Array.isArray(e.newValue)?e._i(e.newValue,e.nativeValue)>-1:e._q(e.newValue,e.trueValue)},on:{click:function(e){e.stopPropagation()},change:function(t){var n=e.newValue,i=t.target,r=i.checked?e.trueValue:e.falseValue;if(Array.isArray(n)){var a=e.nativeValue,o=e._i(n,a);i.checked?o<0&&(e.newValue=n.concat([a])):o>-1&&(e.newValue=n.slice(0,o).concat(n.slice(o+1)))}else e.newValue=r}}}),e._v(" "),n("span",{staticClass:"check",class:[{"is-elastic":e.isMouseDown&&!e.disabled},e.type]}),e._v(" "),n("span",{staticClass:"control-label"},[e._t("default")],2)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"fade"}},[e.isActive?n("article",{staticClass:"message",class:[e.type,e.size]},[e.title?n("header",{staticClass:"message-header"},[n("p",[e._v(e._s(e.title))]),e._v(" "),e.closable?n("button",{staticClass:"delete",attrs:{type:"button"},on:{click:e.close}}):e._e()]):e._e(),e._v(" "),n("section",{staticClass:"message-body"},[n("div",{staticClass:"media"},[e.icon&&e.hasIcon?n("div",{staticClass:"media-left"},[n("b-icon",{class:e.type,attrs:{icon:e.icon,both:"",size:e.newIconSize}})],1):e._e(),e._v(" "),n("div",{staticClass:"media-content"},[e._t("default")],2)])])]):e._e()])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.visible?n("td",{class:e.rootClasses,attrs:{"data-label":e.label}},[n("span",[e._t("default")],2)]):e._e()},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"panel"},[n("div",{staticClass:"panel-heading",class:{"is-collapsible":e.collapsible},on:{click:e.toggle}},[e.header?n("span",{domProps:{innerHTML:e._s(e.header)}}):e._t("header"),e._v(" "),e.collapsible?n("b-icon",{staticClass:"is-pulled-right",attrs:{both:"",icon:e.isOpen?"menu-up":"menu-down"}}):e._e()],2),e._v(" "),n("transition",{attrs:{name:e.animation}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.isOpen,expression:"isOpen"}],staticClass:"panel-content",class:{"panel-block":!e.hasCustomTemplate}},[e.content?n("div",{domProps:{innerHTML:e._s(e.content)}}):e._t("default")],2)])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:e.animation}},[e.isActive?n("div",{staticClass:"dialog modal is-active",class:e.size},[n("div",{staticClass:"modal-background",on:{click:function(t){e.cancel("outside")}}}),e._v(" "),n("div",{staticClass:"modal-card animation-content"},[e.title?n("header",{staticClass:"modal-card-head"},[n("p",{staticClass:"modal-card-title"},[e._v(e._s(e.title))])]):e._e(),e._v(" "),n("section",{staticClass:"modal-card-body",class:{"is-titleless":!e.title,"is-flex":e.hasIcon}},[n("div",{staticClass:"media"},[e.hasIcon?n("div",{staticClass:"media-left"},[n("b-icon",{attrs:{icon:e.icon?e.icon:e.iconByType,pack:e.iconPack,type:e.type,both:!e.icon,size:"is-large"}})],1):e._e(),e._v(" "),n("div",{staticClass:"media-content"},[n("p",{domProps:{innerHTML:e._s(e.message)}}),e._v(" "),e.hasInput?n("div",{staticClass:"field"},[n("div",{staticClass:"control"},[n("input",e._b({directives:[{name:"model",rawName:"v-model",value:e.prompt,expression:"prompt"}],ref:"input",staticClass:"input",class:{"is-danger":e.validationMessage},domProps:{value:e.prompt},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.confirm(t)},input:function(t){t.target.composing||(e.prompt=t.target.value)}}},"input",e.inputAttrs,!1))]),e._v(" "),n("p",{staticClass:"help is-danger"},[e._v(e._s(e.validationMessage))])]):e._e()])])]),e._v(" "),n("footer",{staticClass:"modal-card-foot"},[e.showCancel?n("button",{ref:"cancelButton",staticClass:"button",on:{click:function(t){e.cancel("button")}}},[e._v("\n                    "+e._s(e.cancelText)+"\n                ")]):e._e(),e._v(" "),n("button",{ref:"confirmButton",staticClass:"button",class:e.type,on:{click:e.confirm}},[e._v("\n                    "+e._s(e.confirmText)+"\n                ")])])])]):e._e()])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"b-table",class:{"is-loading":e.loading}},[e.mobileCards&&e.hasSortablenewColumns?n("b-table-mobile-sort",{attrs:{"current-sort-column":e.currentSortColumn,"is-asc":e.isAsc,columns:e.newColumns},on:{sort:function(t){return e.sort(t)}}}):e._e(),e._v(" "),n("div",{staticClass:"table-wrapper"},[n("table",{staticClass:"table",class:e.tableClasses,attrs:{tabindex:!!e.focusable&&0},on:{keydown:[function(t){if(!("button"in t)&&e._k(t.keyCode,"up",38,t.key))return null;t.preventDefault(),e.pressedArrow(-1)},function(t){if(!("button"in t)&&e._k(t.keyCode,"down",40,t.key))return null;t.preventDefault(),e.pressedArrow(1)}]}},[e.newColumns.length?n("thead",[n("tr",[e.detailed?n("th",{attrs:{width:"40px"}}):e._e(),e._v(" "),e.checkable?n("th",{staticClass:"checkbox-cell"},[n("b-checkbox",{attrs:{value:e.isAllChecked},nativeOn:{change:function(t){e.checkAll(t)}}})],1):e._e(),e._v(" "),e._l(e.newColumns,function(t,i){return t.visible||void 0===t.visible?n("th",{key:i,class:{"is-current-sort":e.currentSortColumn===t,"is-sortable":t.sortable},style:{width:t.width+"px"},on:{click:function(n){n.stopPropagation(),e.sort(t)}}},[n("div",{staticClass:"th-wrap",class:{"is-numeric":t.numeric,"is-centered":t.centered}},[e.$scopedSlots.header?e._t("header",null,{column:t,index:i}):[e._v(e._s(t.label))],e._v(" "),n("b-icon",{directives:[{name:"show",rawName:"v-show",value:e.currentSortColumn===t,expression:"currentSortColumn === column"}],class:{"is-desc":!e.isAsc},attrs:{icon:"arrow-up",both:"",size:"is-small"}})],2)]):e._e()})],2)]):e._e(),e._v(" "),e.visibleData.length?n("tbody",[e._l(e.visibleData,function(t,i){return[n("tr",{key:i,class:[e.rowClass(t,i),{"is-selected":t===e.selected,"is-checked":e.isRowChecked(t)}],on:{click:function(n){e.selectRow(t)},dblclick:function(n){e.$emit("dblclick",t)}}},[e.detailed?n("td",[e.hasDetailedVisible(t)?n("a",{attrs:{role:"button"},on:{click:function(n){n.stopPropagation(),e.toggleDetails(t)}}},[n("b-icon",{class:{"is-expanded":e.isVisibleDetailRow(t)},attrs:{icon:"chevron-right",both:""}})],1):e._e()]):e._e(),e._v(" "),e.checkable?n("td",{staticClass:"checkbox-cell"},[n("b-checkbox",{attrs:{disabled:!e.isRowCheckable(t),value:e.isRowChecked(t)},nativeOn:{change:function(n){e.checkRow(t)}}})],1):e._e(),e._v(" "),e.$scopedSlots.default?e._t("default",null,{row:t,index:i}):e._l(e.newColumns,function(i){return n("BTableColumn",e._b({key:i.field,attrs:{internal:""}},"BTableColumn",i,!1),[i.renderHtml?n("span",{domProps:{innerHTML:e._s(e.getValueByPath(t,i.field))}}):[e._v("\n                                    "+e._s(e.getValueByPath(t,i.field))+"\n                                ")]],2)})],2),e._v(" "),e.detailed&&e.isVisibleDetailRow(t)?n("tr",{staticClass:"detail"},[n("td",{attrs:{colspan:e.columnCount}},[n("div",{staticClass:"detail-container"},[e._t("detail",null,{row:t,index:i})],2)])]):e._e()]})],2):n("tbody",[n("tr",{staticClass:"is-empty"},[n("td",{attrs:{colspan:e.columnCount}},[e._t("empty")],2)])]),e._v(" "),void 0!==e.$slots.footer?n("tfoot",[n("tr",{staticClass:"table-footer"},[e.hasCustomFooterSlot()?e._t("footer"):n("th",{attrs:{colspan:e.columnCount}},[e._t("footer")],2)],2)]):e._e()])]),e._v(" "),e.checkable||e.paginated?n("div",{staticClass:"level"},[n("div",{staticClass:"level-left"},[e._t("bottom-left")],2),e._v(" "),n("div",{staticClass:"level-right"},[e.paginated?n("div",{staticClass:"level-item"},[n("b-pagination",{attrs:{total:e.newDataTotal,"per-page":e.perPage,simple:e.paginationSimple,size:e.paginationSize,current:e.newCurrentPage},on:{change:e.pageChanged}})],1):e._e()])]):e._e()],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",{ref:"label",staticClass:"b-checkbox checkbox",class:[e.size,{"is-disabled":e.disabled}],attrs:{disabled:e.disabled,tabindex:!e.disabled&&0},on:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key)&&e._k(t.keyCode,"space",32,t.key))return null;t.preventDefault(),e.$refs.label.click()}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newValue,expression:"newValue"}],attrs:{type:"checkbox",disabled:e.disabled,name:e.name,"true-value":e.trueValue,"false-value":e.falseValue},domProps:{value:e.nativeValue,checked:Array.isArray(e.newValue)?e._i(e.newValue,e.nativeValue)>-1:e._q(e.newValue,e.trueValue)},on:{change:function(t){var n=e.newValue,i=t.target,r=i.checked?e.trueValue:e.falseValue;if(Array.isArray(n)){var a=e.nativeValue,o=e._i(n,a);i.checked?o<0&&(e.newValue=n.concat([a])):o>-1&&(e.newValue=n.slice(0,o).concat(n.slice(o+1)))}else e.newValue=r}}}),e._v(" "),n("span",{staticClass:"check"}),e._v(" "),n("span",{staticClass:"control-label"},[e._t("default")],2)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticClass:"icon",class:[e.newType,e.size]},[n("i",{class:[e.newPack,e.newIcon,e.newCustomSize,e.customClass]})])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"field",class:[e.rootClasses,e.fieldType()]},[e.horizontal?n("div",{staticClass:"field-label is-normal",class:e.customClass},[e.label?n("label",{staticClass:"label",attrs:{for:e.labelFor}},[e._v("\n            "+e._s(e.label)+"\n        ")]):e._e()]):[e.label?n("label",{staticClass:"label",class:e.customClass,attrs:{for:e.labelFor}},[e._v("\n            "+e._s(e.label)+"\n        ")]):e._e()],e._v(" "),e.horizontal?n("b-field-body",{attrs:{message:e.newMessage?e.formattedMessage:"",type:e.newType}},[e._t("default")],2):[e._t("default")],e._v(" "),e.newMessage&&!e.horizontal?n("p",{staticClass:"help",class:e.newType,domProps:{innerHTML:e._s(e.formattedMessage)}}):e._e()],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",{ref:"label",staticClass:"b-radio radio",class:[e.size,{"is-disabled":e.disabled}],attrs:{disabled:e.disabled,tabindex:!e.disabled&&0},on:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key)&&e._k(t.keyCode,"space",32,t.key))return null;t.preventDefault(),e.$refs.label.click()}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newValue,expression:"newValue"}],attrs:{type:"radio",disabled:e.disabled,name:e.name},domProps:{value:e.nativeValue,checked:e._q(e.newValue,e.nativeValue)},on:{change:function(t){e.newValue=e.nativeValue}}}),e._v(" "),n("span",{staticClass:"check"}),e._v(" "),n("span",{staticClass:"control-label"},[e._t("default")],2)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"field table-mobile-sort"},[n("div",{staticClass:"field has-addons"},[n("b-select",{attrs:{expanded:""},model:{value:e.mobileSort,callback:function(t){e.mobileSort=t},expression:"mobileSort"}},e._l(e.columns,function(t,i){return t.sortable?n("option",{key:i,domProps:{value:t}},[e._v("\n                "+e._s(t.label)+"\n            ")]):e._e()})),e._v(" "),n("div",{staticClass:"control"},[n("button",{staticClass:"button is-primary",on:{click:e.sort}},[n("b-icon",{directives:[{name:"show",rawName:"v-show",value:e.currentSortColumn===e.mobileSort,expression:"currentSortColumn === mobileSort"}],class:{"is-desc":!e.isAsc},attrs:{icon:"arrow-up",size:"is-small",both:""}})],1)])],1)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"fade"}},[e.isActive?n("article",{staticClass:"notification",class:e.type},[e.closable?n("button",{staticClass:"delete",attrs:{type:"button"},on:{click:e.close}}):e._e(),e._v(" "),n("div",{staticClass:"media"},[e.icon&&e.hasIcon?n("div",{staticClass:"media-left"},[n("b-icon",{attrs:{icon:e.icon,both:"",size:"is-large"}})],1):e._e(),e._v(" "),n("div",{staticClass:"media-content"},[e._t("default")],2)])]):e._e()])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"control"},[n("label",{ref:"label",staticClass:"b-checkbox checkbox button",class:[e.checked?e.type:null,e.size,{"is-disabled":e.disabled}],attrs:{disabled:e.disabled,tabindex:!e.disabled&&0},on:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key)&&e._k(t.keyCode,"space",32,t.key))return null;t.preventDefault(),e.$refs.label.click()}}},[e._t("default"),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newValue,expression:"newValue"}],attrs:{type:"checkbox",disabled:e.disabled,name:e.name},domProps:{value:e.nativeValue,checked:Array.isArray(e.newValue)?e._i(e.newValue,e.nativeValue)>-1:e.newValue},on:{change:function(t){var n=e.newValue,i=t.target,r=!!i.checked;if(Array.isArray(n)){var a=e.nativeValue,o=e._i(n,a);i.checked?o<0&&(e.newValue=n.concat([a])):o>-1&&(e.newValue=n.slice(0,o).concat(n.slice(o+1)))}else e.newValue=r}}})],2)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"collapse"},[n("div",{staticClass:"collapse-trigger",on:{click:e.toggle}},[e._t("trigger",null,{open:e.isOpen})],2),e._v(" "),n("transition",{attrs:{name:e.animation}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.isOpen,expression:"isOpen"}],staticClass:"collapse-content"},[e._t("default")],2)])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"tags",class:{"has-addons":e.attached}},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"datepicker-table"},[n("header",{staticClass:"datepicker-header"},e._l(e.visibleDayNames,function(t,i){return n("div",{key:i,staticClass:"datepicker-cell"},[e._v("\n            "+e._s(t)+"\n        ")])})),e._v(" "),n("div",{staticClass:"datepicker-body",class:{"has-events":e.hasEvents}},e._l(e.weeksInThisMonth(e.focused.month,e.focused.year),function(t,i){return n("b-datepicker-table-row",{key:i,attrs:{"selected-date":e.value,week:t,month:e.focused.month,"min-date":e.minDate,"max-date":e.maxDate,disabled:e.disabled,"unselectable-dates":e.unselectableDates,"unselectable-days-of-week":e.unselectableDaysOfWeek,"selectable-dates":e.selectableDates,events:e.eventsInThisWeek(t,i),indicators:e.indicators},on:{select:e.updateSelectedDate}})}))])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{"enter-active-class":e.transition.enter,"leave-active-class":e.transition.leave}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.isActive,expression:"isActive"}],staticClass:"snackbar",class:[e.type,e.position]},[n("p",{staticClass:"text"},[e._v(e._s(e.message))]),e._v(" "),e.actionText?n("div",{staticClass:"action",class:e.type,on:{click:e.action}},[n("button",{staticClass:"button is-dark"},[e._v(e._s(e.actionText))])]):e._e()])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"taginput control",class:e.rootClasses},[n("div",{staticClass:"taginput-container",class:[e.statusType,e.size,e.containerClasses],attrs:{disabled:e.disabled},on:{click:function(t){e.hasInput&&e.focus(t)}}},[e._l(e.tags,function(t,i){return n("b-tag",{key:i,attrs:{type:e.type,size:e.size,rounded:e.rounded,attached:e.attached,tabstop:!1,disabled:e.disabled,closable:""},on:{close:function(t){e.removeTag(i)}}},[e._v("\n            "+e._s(e.getNormalizedTagText(t))+"\n        ")])}),e._v(" "),e.hasInput?n("b-autocomplete",e._b({ref:"autocomplete",attrs:{data:e.data,field:e.field,icon:e.icon,"icon-pack":e.iconPack,maxlength:e.maxlength,"has-counter":!1,size:e.size,disabled:e.disabled,loading:e.loading,"keep-first":""},on:{focus:e.onFocus,blur:e.customOnBlur,select:e.onSelect},nativeOn:{keydown:function(t){e.keydown(t)}},scopedSlots:e._u([{key:e.defaultSlotName,fn:function(t){return[e._t("default",null,{option:t.option,index:t.index})]}}]),model:{value:e.newTag,callback:function(t){e.newTag=t},expression:"newTag"}},"b-autocomplete",e.$attrs,!1),[n("template",{slot:e.emptySlotName},[e._t("empty")],2)],2):e._e()],2),e._v(" "),e.maxtags||e.maxlength?n("p",{staticClass:"help counter"},[e.maxlength&&e.valueLength>0?[e._v("\n            "+e._s(e.valueLength)+" / "+e._s(e.maxlength)+"\n        ")]:e.maxtags?[e._v("\n            "+e._s(e.tagsLength)+" / "+e._s(e.maxtags)+"\n        ")]:e._e()],2):e._e()])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"autocomplete control",class:{"is-expanded":e.expanded}},[n("b-input",e._b({ref:"input",attrs:{size:e.size,loading:e.loading,rounded:e.rounded,icon:e.icon,"icon-pack":e.iconPack,maxlength:e.maxlength,autocomplete:"off"},on:{focus:e.focused,blur:e.onBlur},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"esc",27,t.key))return null;t.preventDefault(),e.isActive=!1},keydown:[function(t){if(!("button"in t)&&e._k(t.keyCode,"tab",9,t.key))return null;e.tabPressed(t)},function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;t.preventDefault(),e.enterPressed(t)},function(t){if(!("button"in t)&&e._k(t.keyCode,"up",38,t.key))return null;t.preventDefault(),e.keyArrows("up")},function(t){if(!("button"in t)&&e._k(t.keyCode,"down",40,t.key))return null;t.preventDefault(),e.keyArrows("down")}]},model:{value:e.newValue,callback:function(t){e.newValue=t},expression:"newValue"}},"b-input",e.$attrs,!1)),e._v(" "),n("transition",{attrs:{name:"fade"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.isActive&&(e.data.length>0||e.hasEmptySlot),expression:"isActive && (data.length > 0 || hasEmptySlot)"}],ref:"dropdown",staticClass:"dropdown-menu",class:{"is-opened-top":!e.isListInViewportVertically}},[n("div",{staticClass:"dropdown-content"},[e._l(e.data,function(t,i){return n("a",{key:i,staticClass:"dropdown-item",class:{"is-hovered":t===e.hovered},on:{click:function(n){e.setSelected(t)}}},[e.hasDefaultSlot?e._t("default",null,{option:t,index:i}):n("span",{domProps:{innerHTML:e._s(e.getValue(t,!0))}})],2)}),e._v(" "),0===e.data.length?n("div",{staticClass:"dropdown-item is-disabled"},[e._t("empty")],2):e._e()],2)])])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"control",class:e.rootClasses},["textarea"!==e.type?n("input",e._b({ref:"input",staticClass:"input",class:e.inputClasses,attrs:{type:e.newType,autocomplete:e.newAutocomplete,maxlength:e.maxlength},domProps:{value:e.newValue},on:{input:e.onInput,blur:e.onBlur,focus:e.onFocus}},"input",e.$attrs,!1)):n("textarea",e._b({ref:"textarea",staticClass:"textarea",class:e.inputClasses,attrs:{maxlength:e.maxlength},domProps:{value:e.newValue},on:{input:e.onInput,blur:e.onBlur,focus:e.onFocus}},"textarea",e.$attrs,!1)),e._v(" "),e.icon?n("b-icon",{staticClass:"is-left",attrs:{icon:e.icon,pack:e.iconPack,size:e.iconSize}}):e._e(),e._v(" "),e.loading||!e.passwordReveal&&!e.statusType?e._e():n("b-icon",{staticClass:"is-right",class:{"is-clickable":e.passwordReveal},attrs:{icon:e.passwordReveal?e.passwordVisibleIcon:e.statusTypeIcon,pack:e.iconPack,size:e.iconSize,type:e.passwordReveal?"is-primary":e.statusType,both:""},nativeOn:{click:function(t){e.togglePasswordVisibility(t)}}}),e._v(" "),e.maxlength&&e.hasCounter?n("small",{staticClass:"help counter",class:{"is-invisible":!e.isFocused}},[e._v("\n        "+e._s(e.valueLength)+" / "+e._s(e.maxlength)+"\n    ")]):e._e()],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"datepicker-row"},[e._l(e.week,function(t,i){return[e.selectableDate(t)&&!e.disabled?n("a",{key:i,staticClass:"datepicker-cell",class:[e.classObject(t),{"has-event":e.eventsDateMatch(t)},e.indicators],attrs:{role:"button",href:"#",disabled:e.disabled},on:{click:function(n){n.preventDefault(),e.emitChosenDate(t)},keydown:[function(n){if(!("button"in n)&&e._k(n.keyCode,"enter",13,n.key))return null;n.preventDefault(),e.emitChosenDate(t)},function(n){if(!("button"in n)&&e._k(n.keyCode,"space",32,n.key))return null;n.preventDefault(),e.emitChosenDate(t)}]}},[e._v("\n            "+e._s(t.getDate())+"\n\n            "),e.eventsDateMatch(t)?n("div",{staticClass:"events"},e._l(e.eventsDateMatch(t),function(e,t){return n("div",{key:t,staticClass:"event",class:e.type})})):e._e()]):n("div",{key:i,staticClass:"datepicker-cell",class:e.classObject(t)},[e._v("\n            "+e._s(t.getDate())+"\n        ")])]})],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"b-tabs",class:{"is-fullwidth":e.expanded}},[n("nav",{staticClass:"tabs",class:e.navClasses},[n("ul",e._l(e.tabItems,function(t,i){return n("li",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"tabItem.visible"}],key:i,class:{"is-active":e.activeTab===i,"is-disabled":t.disabled}},[n("a",{on:{click:function(t){e.tabClick(i)}}},[t.$slots.header?[n("b-slot-component",{attrs:{component:t,name:"header",tag:"span",event:"updated"}})]:[t.icon?n("b-icon",{attrs:{icon:t.icon,pack:t.iconPack,size:e.size}}):e._e(),e._v(" "),n("span",[e._v(e._s(t.label))])]],2)])}))]),e._v(" "),n("section",{staticClass:"tab-content"},[e._t("default")],2)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:e.animation}},[e.isActive?n("div",{staticClass:"modal is-active"},[n("div",{staticClass:"modal-background",on:{click:function(t){e.cancel("outside")}}}),e._v(" "),n("div",{staticClass:"animation-content",class:{"modal-content":!e.hasModalCard},style:{maxWidth:e.newWidth}},[e.component?n(e.component,e._g(e._b({tag:"component",on:{close:e.close}},"component",e.props,!1),e.events)):e.content?n("div",{domProps:{innerHTML:e._s(e.content)}}):e._t("default")],2),e._v(" "),e.showX?n("button",{staticClass:"modal-close is-large",attrs:{type:"button"},on:{click:function(t){e.cancel("x")}}}):e._e()]):e._e()])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"datepicker control",class:[e.size,{"is-expanded":e.expanded}]},[!e.isMobile||e.inline?n("b-dropdown",{ref:"dropdown",attrs:{position:e.position,disabled:e.disabled,inline:e.inline}},[e.inline?e._e():n("b-input",e._b({ref:"input",attrs:{slot:"trigger",autocomplete:"off",value:e.formatValue(e.dateSelected),placeholder:e.placeholder,size:e.size,icon:e.icon,"icon-pack":e.iconPack,rounded:e.rounded,loading:e.loading,disabled:e.disabled,readonly:e.readonly},on:{focus:function(t){e.$emit("focus",t)},blur:function(t){e.$emit("blur",t)&&e.checkHtml5Validity()}},nativeOn:{change:function(t){e.onChange(t.target.value)}},slot:"trigger"},"b-input",e.$attrs,!1)),e._v(" "),n("b-dropdown-item",{attrs:{disabled:e.disabled,custom:""}},[n("header",{staticClass:"datepicker-header"},[void 0!==e.$slots.header&&e.$slots.header.length?[e._t("header")]:n("div",{staticClass:"pagination field is-centered"},[e.isFirstMonth||e.disabled?e._e():n("a",{staticClass:"pagination-previous",attrs:{role:"button",href:"#",disabled:e.disabled},on:{click:function(t){t.preventDefault(),e.decrementMonth(t)},keydown:[function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;t.preventDefault(),e.decrementMonth(t)},function(t){if(!("button"in t)&&e._k(t.keyCode,"space",32,t.key))return null;t.preventDefault(),e.decrementMonth(t)}]}},[n("b-icon",{attrs:{icon:"chevron-left",pack:e.iconPack,both:"",type:"is-primary is-clickable"}})],1),e._v(" "),n("a",{directives:[{name:"show",rawName:"v-show",value:!e.isLastMonth&&!e.disabled,expression:"!isLastMonth && !disabled"}],staticClass:"pagination-next",attrs:{role:"button",href:"#",disabled:e.disabled},on:{click:function(t){t.preventDefault(),e.incrementMonth(t)},keydown:[function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;t.preventDefault(),e.incrementMonth(t)},function(t){if(!("button"in t)&&e._k(t.keyCode,"space",32,t.key))return null;t.preventDefault(),e.incrementMonth(t)}]}},[n("b-icon",{attrs:{icon:"chevron-right",pack:e.iconPack,both:"",type:"is-primary is-clickable"}})],1),e._v(" "),n("div",{staticClass:"pagination-list"},[n("b-field",[n("b-select",{attrs:{disabled:e.disabled},model:{value:e.focusedDateData.month,callback:function(t){e.$set(e.focusedDateData,"month",t)},expression:"focusedDateData.month"}},e._l(e.monthNames,function(t,i){return n("option",{key:t,domProps:{value:i}},[e._v("\n                                    "+e._s(t)+"\n                                ")])})),e._v(" "),n("b-select",{attrs:{disabled:e.disabled},model:{value:e.focusedDateData.year,callback:function(t){e.$set(e.focusedDateData,"year",t)},expression:"focusedDateData.year"}},e._l(e.listOfYears,function(t){return n("option",{key:t,domProps:{value:t}},[e._v("\n                                    "+e._s(t)+"\n                                ")])}))],1)],1)])],2),e._v(" "),n("b-datepicker-table",{attrs:{"day-names":e.dayNames,"month-names":e.monthNames,"first-day-of-week":e.firstDayOfWeek,"min-date":e.minDate,"max-date":e.maxDate,focused:e.focusedDateData,disabled:e.disabled,"unselectable-dates":e.unselectableDates,"unselectable-days-of-week":e.unselectableDaysOfWeek,"selectable-dates":e.selectableDates,events:e.events,indicators:e.indicators},on:{close:function(t){e.$refs.dropdown.isActive=!1}},model:{value:e.dateSelected,callback:function(t){e.dateSelected=t},expression:"dateSelected"}}),e._v(" "),void 0!==e.$slots.default&&e.$slots.default.length?n("footer",{staticClass:"datepicker-footer"},[e._t("default")],2):e._e()],1)],1):n("b-input",e._b({ref:"input",attrs:{type:"date",autocomplete:"off",value:e.formatYYYYMMDD(e.value),placeholder:e.placeholder,size:e.size,icon:e.icon,"icon-pack":e.iconPack,loading:e.loading,max:e.formatYYYYMMDD(e.maxDate),min:e.formatYYYYMMDD(e.minDate),disabled:e.disabled,readonly:!1},on:{focus:function(t){e.$emit("focus",t)},blur:function(t){e.$emit("blur",t)&&e.checkHtml5Validity()}},nativeOn:{change:function(t){e.onChangeNativePicker(t)}}},"b-input",e.$attrs,!1))],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.attached&&e.closable?n("div",{staticClass:"tags has-addons"},[n("span",{staticClass:"tag",class:[e.type,e.size,{"is-rounded":e.rounded}]},[e._t("default")],2),e._v(" "),n("a",{staticClass:"tag is-delete",class:[e.size,{"is-rounded":e.rounded}],attrs:{role:"button",tabindex:!!e.tabstop&&0,disabled:e.disabled},on:{click:function(t){e.close()},keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"delete",[8,46],t.key))return null;t.preventDefault(),e.close()}}})]):n("span",{staticClass:"tag",class:[e.type,e.size,{"is-rounded":e.rounded}]},[e._t("default"),e._v(" "),e.closable?n("a",{staticClass:"delete is-small",attrs:{role:"button",disabled:e.disabled,tabindex:!!e.tabstop&&0},on:{click:function(t){e.close()},keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"delete",[8,46],t.key))return null;t.preventDefault(),e.close()}}}):e._e()],2)},staticRenderFns:[]}},function(e,t,n){e.exports=n(67)}])});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(53);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(45)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./buefy.css", function() {
			var newContent = require("!!../../css-loader/index.js!./buefy.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(44)(false);
// imports


// module
exports.push([module.i, ".is-noscroll {\n  position: fixed;\n  overflow-y: hidden;\n  width: 100%;\n  bottom: 0;\n}\n\n@-webkit-keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n.fadeOut {\n  -webkit-animation-name: fadeOut;\n          animation-name: fadeOut;\n}\n\n@-webkit-keyframes fadeOutDown {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n            transform: translate3d(0, 100%, 0);\n  }\n}\n\n@keyframes fadeOutDown {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n            transform: translate3d(0, 100%, 0);\n  }\n}\n\n.fadeOutDown {\n  -webkit-animation-name: fadeOutDown;\n          animation-name: fadeOutDown;\n}\n\n@-webkit-keyframes fadeOutUp {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n            transform: translate3d(0, -100%, 0);\n  }\n}\n\n@keyframes fadeOutUp {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n            transform: translate3d(0, -100%, 0);\n  }\n}\n\n.fadeOutUp {\n  -webkit-animation-name: fadeOutUp;\n          animation-name: fadeOutUp;\n}\n\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n.fadeIn {\n  -webkit-animation-name: fadeIn;\n          animation-name: fadeIn;\n}\n\n@-webkit-keyframes fadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n            transform: translate3d(0, -100%, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n            transform: none;\n  }\n}\n\n@keyframes fadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n            transform: translate3d(0, -100%, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n            transform: none;\n  }\n}\n\n.fadeInDown {\n  -webkit-animation-name: fadeInDown;\n          animation-name: fadeInDown;\n}\n\n@-webkit-keyframes fadeInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n            transform: translate3d(0, 100%, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n            transform: none;\n  }\n}\n\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n            transform: translate3d(0, 100%, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n            transform: none;\n  }\n}\n\n.fadeInUp {\n  -webkit-animation-name: fadeInUp;\n          animation-name: fadeInUp;\n}\n\n/**\r\n * Vue Transitions\r\n */\n.fade-enter-active,\n.fade-leave-active {\n  -webkit-transition: opacity 150ms ease-out;\n  transition: opacity 150ms ease-out;\n}\n\n.fade-enter,\n.fade-leave-to {\n  opacity: 0;\n}\n\n.zoom-in-enter-active,\n.zoom-in-leave-active {\n  -webkit-transition: opacity 150ms ease-out;\n  transition: opacity 150ms ease-out;\n}\n\n.zoom-in-enter-active .animation-content,\n.zoom-in-enter-active .animation-content,\n.zoom-in-leave-active .animation-content,\n.zoom-in-leave-active .animation-content {\n  -webkit-transition: -webkit-transform 150ms ease-out;\n  transition: -webkit-transform 150ms ease-out;\n  transition: transform 150ms ease-out;\n  transition: transform 150ms ease-out, -webkit-transform 150ms ease-out;\n}\n\n.zoom-in-enter,\n.zoom-in-leave-active {\n  opacity: 0;\n}\n\n.zoom-in-enter .animation-content,\n.zoom-in-enter .animation-content,\n.zoom-in-leave-active .animation-content,\n.zoom-in-leave-active .animation-content {\n  -webkit-transform: scale(0.95);\n          transform: scale(0.95);\n}\n\n.zoom-out-enter-active,\n.zoom-out-leave-active {\n  -webkit-transition: opacity 150ms ease-out;\n  transition: opacity 150ms ease-out;\n}\n\n.zoom-out-enter-active .animation-content,\n.zoom-out-enter-active .animation-content,\n.zoom-out-leave-active .animation-content,\n.zoom-out-leave-active .animation-content {\n  -webkit-transition: -webkit-transform 150ms ease-out;\n  transition: -webkit-transform 150ms ease-out;\n  transition: transform 150ms ease-out;\n  transition: transform 150ms ease-out, -webkit-transform 150ms ease-out;\n}\n\n.zoom-out-enter,\n.zoom-out-leave-active {\n  opacity: 0;\n}\n\n.zoom-out-enter .animation-content,\n.zoom-out-enter .animation-content,\n.zoom-out-leave-active .animation-content,\n.zoom-out-leave-active .animation-content {\n  -webkit-transform: scale(1.05);\n          transform: scale(1.05);\n}\n\n.slide-next-enter-active,\n.slide-next-leave-active,\n.slide-prev-enter-active,\n.slide-prev-leave-active {\n  -webkit-transition: -webkit-transform 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n  transition: -webkit-transform 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n  transition: transform 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n  transition: transform 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86), -webkit-transform 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n}\n\n.slide-prev-leave-to, .slide-next-enter {\n  -webkit-transform: translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0);\n  position: absolute;\n  width: 100%;\n}\n\n.slide-prev-enter, .slide-next-leave-to {\n  -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0);\n  position: absolute;\n  width: 100%;\n}\n\n/*! bulma.io v0.6.2 | MIT License | github.com/jgthms/bulma */\n@-webkit-keyframes spinAround {\n  from {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  to {\n    -webkit-transform: rotate(359deg);\n            transform: rotate(359deg);\n  }\n}\n@keyframes spinAround {\n  from {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  to {\n    -webkit-transform: rotate(359deg);\n            transform: rotate(359deg);\n  }\n}\n\n/*! minireset.css v0.0.2 | MIT License | github.com/jgthms/minireset.css */\nhtml,\nbody,\np,\nol,\nul,\nli,\ndl,\ndt,\ndd,\nblockquote,\nfigure,\nfieldset,\nlegend,\ntextarea,\npre,\niframe,\nhr,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 0;\n  padding: 0;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: 100%;\n  font-weight: normal;\n}\n\nul {\n  list-style: none;\n}\n\nbutton,\ninput,\nselect,\ntextarea {\n  margin: 0;\n}\n\nhtml {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n* {\n  -webkit-box-sizing: inherit;\n          box-sizing: inherit;\n}\n\n*:before, *:after {\n  -webkit-box-sizing: inherit;\n          box-sizing: inherit;\n}\n\nimg,\nembed,\nobject,\naudio,\nvideo {\n  max-width: 100%;\n}\n\niframe {\n  border: 0;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n  text-align: left;\n}\n\nhtml {\n  background-color: white;\n  font-size: 16px;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  min-width: 300px;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  text-rendering: optimizeLegibility;\n  -webkit-text-size-adjust: 100%;\n     -moz-text-size-adjust: 100%;\n      -ms-text-size-adjust: 100%;\n          text-size-adjust: 100%;\n}\n\narticle,\naside,\nfigure,\nfooter,\nheader,\nhgroup,\nsection {\n  display: block;\n}\n\nbody,\nbutton,\ninput,\nselect,\ntextarea {\n  font-family: BlinkMacSystemFont, -apple-system, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", sans-serif;\n}\n\ncode,\npre {\n  -moz-osx-font-smoothing: auto;\n  -webkit-font-smoothing: auto;\n  font-family: monospace;\n}\n\nbody {\n  color: #4a4a4a;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n}\n\na {\n  color: #7957d5;\n  cursor: pointer;\n  text-decoration: none;\n}\n\na strong {\n  color: currentColor;\n}\n\na:hover {\n  color: #363636;\n}\n\ncode {\n  background-color: whitesmoke;\n  color: #ff3860;\n  font-size: 0.875em;\n  font-weight: normal;\n  padding: 0.25em 0.5em 0.25em;\n}\n\nhr {\n  background-color: #dbdbdb;\n  border: none;\n  display: block;\n  height: 1px;\n  margin: 1.5rem 0;\n}\n\nimg {\n  height: auto;\n  max-width: 100%;\n}\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  vertical-align: baseline;\n}\n\nsmall {\n  font-size: 0.875em;\n}\n\nspan {\n  font-style: inherit;\n  font-weight: inherit;\n}\n\nstrong {\n  color: #363636;\n  font-weight: 700;\n}\n\npre {\n  -webkit-overflow-scrolling: touch;\n  background-color: whitesmoke;\n  color: #4a4a4a;\n  font-size: 0.875em;\n  overflow-x: auto;\n  padding: 1.25rem 1.5rem;\n  white-space: pre;\n  word-wrap: normal;\n}\n\npre code {\n  background-color: transparent;\n  color: currentColor;\n  font-size: 1em;\n  padding: 0;\n}\n\ntable td,\ntable th {\n  text-align: left;\n  vertical-align: top;\n}\n\ntable th {\n  color: #363636;\n}\n\n.is-clearfix:after {\n  clear: both;\n  content: \" \";\n  display: table;\n}\n\n.is-pulled-left {\n  float: left !important;\n}\n\n.is-pulled-right {\n  float: right !important;\n}\n\n.is-clipped {\n  overflow: hidden !important;\n}\n\n.is-overlay {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.is-size-1 {\n  font-size: 3rem !important;\n}\n\n.is-size-2 {\n  font-size: 2.5rem !important;\n}\n\n.is-size-3 {\n  font-size: 2rem !important;\n}\n\n.is-size-4 {\n  font-size: 1.5rem !important;\n}\n\n.is-size-5 {\n  font-size: 1.25rem !important;\n}\n\n.is-size-6 {\n  font-size: 1rem !important;\n}\n\n.is-size-7 {\n  font-size: 0.75rem !important;\n}\n\n@media screen and (max-width: 768px) {\n  .is-size-1-mobile {\n    font-size: 3rem !important;\n  }\n  .is-size-2-mobile {\n    font-size: 2.5rem !important;\n  }\n  .is-size-3-mobile {\n    font-size: 2rem !important;\n  }\n  .is-size-4-mobile {\n    font-size: 1.5rem !important;\n  }\n  .is-size-5-mobile {\n    font-size: 1.25rem !important;\n  }\n  .is-size-6-mobile {\n    font-size: 1rem !important;\n  }\n  .is-size-7-mobile {\n    font-size: 0.75rem !important;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .is-size-1-tablet {\n    font-size: 3rem !important;\n  }\n  .is-size-2-tablet {\n    font-size: 2.5rem !important;\n  }\n  .is-size-3-tablet {\n    font-size: 2rem !important;\n  }\n  .is-size-4-tablet {\n    font-size: 1.5rem !important;\n  }\n  .is-size-5-tablet {\n    font-size: 1.25rem !important;\n  }\n  .is-size-6-tablet {\n    font-size: 1rem !important;\n  }\n  .is-size-7-tablet {\n    font-size: 0.75rem !important;\n  }\n}\n\n@media screen and (max-width: 1023px) {\n  .is-size-1-touch {\n    font-size: 3rem !important;\n  }\n  .is-size-2-touch {\n    font-size: 2.5rem !important;\n  }\n  .is-size-3-touch {\n    font-size: 2rem !important;\n  }\n  .is-size-4-touch {\n    font-size: 1.5rem !important;\n  }\n  .is-size-5-touch {\n    font-size: 1.25rem !important;\n  }\n  .is-size-6-touch {\n    font-size: 1rem !important;\n  }\n  .is-size-7-touch {\n    font-size: 0.75rem !important;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .is-size-1-desktop {\n    font-size: 3rem !important;\n  }\n  .is-size-2-desktop {\n    font-size: 2.5rem !important;\n  }\n  .is-size-3-desktop {\n    font-size: 2rem !important;\n  }\n  .is-size-4-desktop {\n    font-size: 1.5rem !important;\n  }\n  .is-size-5-desktop {\n    font-size: 1.25rem !important;\n  }\n  .is-size-6-desktop {\n    font-size: 1rem !important;\n  }\n  .is-size-7-desktop {\n    font-size: 0.75rem !important;\n  }\n}\n\n@media screen and (min-width: 1216px) {\n  .is-size-1-widescreen {\n    font-size: 3rem !important;\n  }\n  .is-size-2-widescreen {\n    font-size: 2.5rem !important;\n  }\n  .is-size-3-widescreen {\n    font-size: 2rem !important;\n  }\n  .is-size-4-widescreen {\n    font-size: 1.5rem !important;\n  }\n  .is-size-5-widescreen {\n    font-size: 1.25rem !important;\n  }\n  .is-size-6-widescreen {\n    font-size: 1rem !important;\n  }\n  .is-size-7-widescreen {\n    font-size: 0.75rem !important;\n  }\n}\n\n@media screen and (min-width: 1408px) {\n  .is-size-1-fullhd {\n    font-size: 3rem !important;\n  }\n  .is-size-2-fullhd {\n    font-size: 2.5rem !important;\n  }\n  .is-size-3-fullhd {\n    font-size: 2rem !important;\n  }\n  .is-size-4-fullhd {\n    font-size: 1.5rem !important;\n  }\n  .is-size-5-fullhd {\n    font-size: 1.25rem !important;\n  }\n  .is-size-6-fullhd {\n    font-size: 1rem !important;\n  }\n  .is-size-7-fullhd {\n    font-size: 0.75rem !important;\n  }\n}\n\n.has-text-centered {\n  text-align: center !important;\n}\n\n@media screen and (max-width: 768px) {\n  .has-text-centered-mobile {\n    text-align: center !important;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .has-text-centered-tablet {\n    text-align: center !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 1023px) {\n  .has-text-centered-tablet-only {\n    text-align: center !important;\n  }\n}\n\n@media screen and (max-width: 1023px) {\n  .has-text-centered-touch {\n    text-align: center !important;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .has-text-centered-desktop {\n    text-align: center !important;\n  }\n}\n\n@media screen and (min-width: 1024px) and (max-width: 1215px) {\n  .has-text-centered-desktop-only {\n    text-align: center !important;\n  }\n}\n\n@media screen and (min-width: 1216px) {\n  .has-text-centered-widescreen {\n    text-align: center !important;\n  }\n}\n\n@media screen and (min-width: 1216px) and (max-width: 1407px) {\n  .has-text-centered-widescreen-only {\n    text-align: center !important;\n  }\n}\n\n@media screen and (min-width: 1408px) {\n  .has-text-centered-fullhd {\n    text-align: center !important;\n  }\n}\n\n.has-text-justified {\n  text-align: justify !important;\n}\n\n@media screen and (max-width: 768px) {\n  .has-text-justified-mobile {\n    text-align: justify !important;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .has-text-justified-tablet {\n    text-align: justify !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 1023px) {\n  .has-text-justified-tablet-only {\n    text-align: justify !important;\n  }\n}\n\n@media screen and (max-width: 1023px) {\n  .has-text-justified-touch {\n    text-align: justify !important;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .has-text-justified-desktop {\n    text-align: justify !important;\n  }\n}\n\n@media screen and (min-width: 1024px) and (max-width: 1215px) {\n  .has-text-justified-desktop-only {\n    text-align: justify !important;\n  }\n}\n\n@media screen and (min-width: 1216px) {\n  .has-text-justified-widescreen {\n    text-align: justify !important;\n  }\n}\n\n@media screen and (min-width: 1216px) and (max-width: 1407px) {\n  .has-text-justified-widescreen-only {\n    text-align: justify !important;\n  }\n}\n\n@media screen and (min-width: 1408px) {\n  .has-text-justified-fullhd {\n    text-align: justify !important;\n  }\n}\n\n.has-text-left {\n  text-align: left !important;\n}\n\n@media screen and (max-width: 768px) {\n  .has-text-left-mobile {\n    text-align: left !important;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .has-text-left-tablet {\n    text-align: left !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 1023px) {\n  .has-text-left-tablet-only {\n    text-align: left !important;\n  }\n}\n\n@media screen and (max-width: 1023px) {\n  .has-text-left-touch {\n    text-align: left !important;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .has-text-left-desktop {\n    text-align: left !important;\n  }\n}\n\n@media screen and (min-width: 1024px) and (max-width: 1215px) {\n  .has-text-left-desktop-only {\n    text-align: left !important;\n  }\n}\n\n@media screen and (min-width: 1216px) {\n  .has-text-left-widescreen {\n    text-align: left !important;\n  }\n}\n\n@media screen and (min-width: 1216px) and (max-width: 1407px) {\n  .has-text-left-widescreen-only {\n    text-align: left !important;\n  }\n}\n\n@media screen and (min-width: 1408px) {\n  .has-text-left-fullhd {\n    text-align: left !important;\n  }\n}\n\n.has-text-right {\n  text-align: right !important;\n}\n\n@media screen and (max-width: 768px) {\n  .has-text-right-mobile {\n    text-align: right !important;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .has-text-right-tablet {\n    text-align: right !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 1023px) {\n  .has-text-right-tablet-only {\n    text-align: right !important;\n  }\n}\n\n@media screen and (max-width: 1023px) {\n  .has-text-right-touch {\n    text-align: right !important;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .has-text-right-desktop {\n    text-align: right !important;\n  }\n}\n\n@media screen and (min-width: 1024px) and (max-width: 1215px) {\n  .has-text-right-desktop-only {\n    text-align: right !important;\n  }\n}\n\n@media screen and (min-width: 1216px) {\n  .has-text-right-widescreen {\n    text-align: right !important;\n  }\n}\n\n@media screen and (min-width: 1216px) and (max-width: 1407px) {\n  .has-text-right-widescreen-only {\n    text-align: right !important;\n  }\n}\n\n@media screen and (min-width: 1408px) {\n  .has-text-right-fullhd {\n    text-align: right !important;\n  }\n}\n\n.is-capitalized {\n  text-transform: capitalize !important;\n}\n\n.is-lowercase {\n  text-transform: lowercase !important;\n}\n\n.is-uppercase {\n  text-transform: uppercase !important;\n}\n\n.is-italic {\n  font-style: italic !important;\n}\n\n.has-text-white {\n  color: white !important;\n}\n\na.has-text-white:hover, a.has-text-white:focus {\n  color: #e6e6e6 !important;\n}\n\n.has-text-black {\n  color: #0a0a0a !important;\n}\n\na.has-text-black:hover, a.has-text-black:focus {\n  color: black !important;\n}\n\n.has-text-light {\n  color: whitesmoke !important;\n}\n\na.has-text-light:hover, a.has-text-light:focus {\n  color: #dbdbdb !important;\n}\n\n.has-text-dark {\n  color: #363636 !important;\n}\n\na.has-text-dark:hover, a.has-text-dark:focus {\n  color: #1c1c1c !important;\n}\n\n.has-text-primary {\n  color: #7957d5 !important;\n}\n\na.has-text-primary:hover, a.has-text-primary:focus {\n  color: #5a32c7 !important;\n}\n\n.has-text-link {\n  color: #7957d5 !important;\n}\n\na.has-text-link:hover, a.has-text-link:focus {\n  color: #5a32c7 !important;\n}\n\n.has-text-info {\n  color: #167df0 !important;\n}\n\na.has-text-info:hover, a.has-text-info:focus {\n  color: #0d64c6 !important;\n}\n\n.has-text-success {\n  color: #23d160 !important;\n}\n\na.has-text-success:hover, a.has-text-success:focus {\n  color: #1ca64c !important;\n}\n\n.has-text-warning {\n  color: #ffdd57 !important;\n}\n\na.has-text-warning:hover, a.has-text-warning:focus {\n  color: #ffd324 !important;\n}\n\n.has-text-danger {\n  color: #ff3860 !important;\n}\n\na.has-text-danger:hover, a.has-text-danger:focus {\n  color: #ff0537 !important;\n}\n\n.has-text-black-bis {\n  color: #121212 !important;\n}\n\n.has-text-black-ter {\n  color: #242424 !important;\n}\n\n.has-text-grey-darker {\n  color: #363636 !important;\n}\n\n.has-text-grey-dark {\n  color: #4a4a4a !important;\n}\n\n.has-text-grey {\n  color: #7a7a7a !important;\n}\n\n.has-text-grey-light {\n  color: #b5b5b5 !important;\n}\n\n.has-text-grey-lighter {\n  color: #dbdbdb !important;\n}\n\n.has-text-white-ter {\n  color: whitesmoke !important;\n}\n\n.has-text-white-bis {\n  color: #fafafa !important;\n}\n\n.has-text-weight-light {\n  font-weight: 300 !important;\n}\n\n.has-text-weight-normal {\n  font-weight: 400 !important;\n}\n\n.has-text-weight-semibold {\n  font-weight: 600 !important;\n}\n\n.has-text-weight-bold {\n  font-weight: 700 !important;\n}\n\n.is-block {\n  display: block !important;\n}\n\n@media screen and (max-width: 768px) {\n  .is-block-mobile {\n    display: block !important;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .is-block-tablet {\n    display: block !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 1023px) {\n  .is-block-tablet-only {\n    display: block !important;\n  }\n}\n\n@media screen and (max-width: 1023px) {\n  .is-block-touch {\n    display: block !important;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .is-block-desktop {\n    display: block !important;\n  }\n}\n\n@media screen and (min-width: 1024px) and (max-width: 1215px) {\n  .is-block-desktop-only {\n    display: block !important;\n  }\n}\n\n@media screen and (min-width: 1216px) {\n  .is-block-widescreen {\n    display: block !important;\n  }\n}\n\n@media screen and (min-width: 1216px) and (max-width: 1407px) {\n  .is-block-widescreen-only {\n    display: block !important;\n  }\n}\n\n@media screen and (min-width: 1408px) {\n  .is-block-fullhd {\n    display: block !important;\n  }\n}\n\n.is-flex {\n  display: -webkit-box !important;\n  display: -ms-flexbox !important;\n  display: flex !important;\n}\n\n@media screen and (max-width: 768px) {\n  .is-flex-mobile {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .is-flex-tablet {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 1023px) {\n  .is-flex-tablet-only {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (max-width: 1023px) {\n  .is-flex-touch {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .is-flex-desktop {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (min-width: 1024px) and (max-width: 1215px) {\n  .is-flex-desktop-only {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (min-width: 1216px) {\n  .is-flex-widescreen {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (min-width: 1216px) and (max-width: 1407px) {\n  .is-flex-widescreen-only {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (min-width: 1408px) {\n  .is-flex-fullhd {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n.is-inline {\n  display: inline !important;\n}\n\n@media screen and (max-width: 768px) {\n  .is-inline-mobile {\n    display: inline !important;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .is-inline-tablet {\n    display: inline !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 1023px) {\n  .is-inline-tablet-only {\n    display: inline !important;\n  }\n}\n\n@media screen and (max-width: 1023px) {\n  .is-inline-touch {\n    display: inline !important;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .is-inline-desktop {\n    display: inline !important;\n  }\n}\n\n@media screen and (min-width: 1024px) and (max-width: 1215px) {\n  .is-inline-desktop-only {\n    display: inline !important;\n  }\n}\n\n@media screen and (min-width: 1216px) {\n  .is-inline-widescreen {\n    display: inline !important;\n  }\n}\n\n@media screen and (min-width: 1216px) and (max-width: 1407px) {\n  .is-inline-widescreen-only {\n    display: inline !important;\n  }\n}\n\n@media screen and (min-width: 1408px) {\n  .is-inline-fullhd {\n    display: inline !important;\n  }\n}\n\n.is-inline-block {\n  display: inline-block !important;\n}\n\n@media screen and (max-width: 768px) {\n  .is-inline-block-mobile {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .is-inline-block-tablet {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 1023px) {\n  .is-inline-block-tablet-only {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (max-width: 1023px) {\n  .is-inline-block-touch {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .is-inline-block-desktop {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (min-width: 1024px) and (max-width: 1215px) {\n  .is-inline-block-desktop-only {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (min-width: 1216px) {\n  .is-inline-block-widescreen {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (min-width: 1216px) and (max-width: 1407px) {\n  .is-inline-block-widescreen-only {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (min-width: 1408px) {\n  .is-inline-block-fullhd {\n    display: inline-block !important;\n  }\n}\n\n.is-inline-flex {\n  display: -webkit-inline-box !important;\n  display: -ms-inline-flexbox !important;\n  display: inline-flex !important;\n}\n\n@media screen and (max-width: 768px) {\n  .is-inline-flex-mobile {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .is-inline-flex-tablet {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 1023px) {\n  .is-inline-flex-tablet-only {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (max-width: 1023px) {\n  .is-inline-flex-touch {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .is-inline-flex-desktop {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (min-width: 1024px) and (max-width: 1215px) {\n  .is-inline-flex-desktop-only {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (min-width: 1216px) {\n  .is-inline-flex-widescreen {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (min-width: 1216px) and (max-width: 1407px) {\n  .is-inline-flex-widescreen-only {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (min-width: 1408px) {\n  .is-inline-flex-fullhd {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n.is-hidden {\n  display: none !important;\n}\n\n@media screen and (max-width: 768px) {\n  .is-hidden-mobile {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .is-hidden-tablet {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 1023px) {\n  .is-hidden-tablet-only {\n    display: none !important;\n  }\n}\n\n@media screen and (max-width: 1023px) {\n  .is-hidden-touch {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .is-hidden-desktop {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 1024px) and (max-width: 1215px) {\n  .is-hidden-desktop-only {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 1216px) {\n  .is-hidden-widescreen {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 1216px) and (max-width: 1407px) {\n  .is-hidden-widescreen-only {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 1408px) {\n  .is-hidden-fullhd {\n    display: none !important;\n  }\n}\n\n.is-invisible {\n  visibility: hidden !important;\n}\n\n@media screen and (max-width: 768px) {\n  .is-invisible-mobile {\n    visibility: hidden !important;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .is-invisible-tablet {\n    visibility: hidden !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 1023px) {\n  .is-invisible-tablet-only {\n    visibility: hidden !important;\n  }\n}\n\n@media screen and (max-width: 1023px) {\n  .is-invisible-touch {\n    visibility: hidden !important;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .is-invisible-desktop {\n    visibility: hidden !important;\n  }\n}\n\n@media screen and (min-width: 1024px) and (max-width: 1215px) {\n  .is-invisible-desktop-only {\n    visibility: hidden !important;\n  }\n}\n\n@media screen and (min-width: 1216px) {\n  .is-invisible-widescreen {\n    visibility: hidden !important;\n  }\n}\n\n@media screen and (min-width: 1216px) and (max-width: 1407px) {\n  .is-invisible-widescreen-only {\n    visibility: hidden !important;\n  }\n}\n\n@media screen and (min-width: 1408px) {\n  .is-invisible-fullhd {\n    visibility: hidden !important;\n  }\n}\n\n.is-marginless {\n  margin: 0 !important;\n}\n\n.is-paddingless {\n  padding: 0 !important;\n}\n\n.is-radiusless {\n  border-radius: 0 !important;\n}\n\n.is-shadowless {\n  -webkit-box-shadow: none !important;\n          box-shadow: none !important;\n}\n\n.is-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.box {\n  background-color: white;\n  border-radius: 5px;\n  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n          box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n  color: #4a4a4a;\n  display: block;\n  padding: 1.25rem;\n}\n\n.box:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\na.box:hover, a.box:focus {\n  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px #7957d5;\n          box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px #7957d5;\n}\n\na.box:active {\n  -webkit-box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2), 0 0 0 1px #7957d5;\n          box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2), 0 0 0 1px #7957d5;\n}\n\n.button {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border: 1px solid transparent;\n  border-radius: 3px;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1rem;\n  height: 2.25em;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  line-height: 1.5;\n  padding-bottom: calc(0.375em - 1px);\n  padding-left: calc(0.625em - 1px);\n  padding-right: calc(0.625em - 1px);\n  padding-top: calc(0.375em - 1px);\n  position: relative;\n  vertical-align: top;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  background-color: white;\n  border-color: #dbdbdb;\n  color: #363636;\n  cursor: pointer;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  text-align: center;\n  white-space: nowrap;\n}\n\n.button:focus, .button.is-focused, .button:active, .button.is-active {\n  outline: none;\n}\n\n.button[disabled] {\n  cursor: not-allowed;\n}\n\n.button strong {\n  color: inherit;\n}\n\n.button .icon, .button .icon.is-small, .button .icon.is-medium, .button .icon.is-large {\n  height: 1.5em;\n  width: 1.5em;\n}\n\n.button .icon:first-child:not(:last-child) {\n  margin-left: calc(-0.375em - 1px);\n  margin-right: 0.1875em;\n}\n\n.button .icon:last-child:not(:first-child) {\n  margin-left: 0.1875em;\n  margin-right: calc(-0.375em - 1px);\n}\n\n.button .icon:first-child:last-child {\n  margin-left: calc(-0.375em - 1px);\n  margin-right: calc(-0.375em - 1px);\n}\n\n.button:hover, .button.is-hovered {\n  border-color: #b5b5b5;\n  color: #363636;\n}\n\n.button:focus, .button.is-focused {\n  border-color: #7957d5;\n  color: #363636;\n}\n\n.button:focus:not(:active), .button.is-focused:not(:active) {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n}\n\n.button:active, .button.is-active {\n  border-color: #4a4a4a;\n  color: #363636;\n}\n\n.button.is-text {\n  background-color: transparent;\n  border-color: transparent;\n  color: #4a4a4a;\n  text-decoration: underline;\n}\n\n.button.is-text:hover, .button.is-text.is-hovered, .button.is-text:focus, .button.is-text.is-focused {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.button.is-text:active, .button.is-text.is-active {\n  background-color: #e8e8e8;\n  color: #363636;\n}\n\n.button.is-text[disabled] {\n  background-color: transparent;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\n.button.is-white {\n  background-color: white;\n  border-color: transparent;\n  color: #0a0a0a;\n}\n\n.button.is-white:hover, .button.is-white.is-hovered {\n  background-color: #f9f9f9;\n  border-color: transparent;\n  color: #0a0a0a;\n}\n\n.button.is-white:focus, .button.is-white.is-focused {\n  border-color: transparent;\n  color: #0a0a0a;\n}\n\n.button.is-white:focus:not(:active), .button.is-white.is-focused:not(:active) {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);\n}\n\n.button.is-white:active, .button.is-white.is-active {\n  background-color: #f2f2f2;\n  border-color: transparent;\n  color: #0a0a0a;\n}\n\n.button.is-white[disabled] {\n  background-color: white;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\n.button.is-white.is-inverted {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.button.is-white.is-inverted:hover {\n  background-color: black;\n}\n\n.button.is-white.is-inverted[disabled] {\n  background-color: #0a0a0a;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: white;\n}\n\n.button.is-white.is-loading:after {\n  border-color: transparent transparent #0a0a0a #0a0a0a !important;\n}\n\n.button.is-white.is-outlined {\n  background-color: transparent;\n  border-color: white;\n  color: white;\n}\n\n.button.is-white.is-outlined:hover, .button.is-white.is-outlined:focus {\n  background-color: white;\n  border-color: white;\n  color: #0a0a0a;\n}\n\n.button.is-white.is-outlined.is-loading:after {\n  border-color: transparent transparent white white !important;\n}\n\n.button.is-white.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: white;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: white;\n}\n\n.button.is-white.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: #0a0a0a;\n  color: #0a0a0a;\n}\n\n.button.is-white.is-inverted.is-outlined:hover, .button.is-white.is-inverted.is-outlined:focus {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.button.is-white.is-inverted.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: #0a0a0a;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #0a0a0a;\n}\n\n.button.is-black {\n  background-color: #0a0a0a;\n  border-color: transparent;\n  color: white;\n}\n\n.button.is-black:hover, .button.is-black.is-hovered {\n  background-color: #040404;\n  border-color: transparent;\n  color: white;\n}\n\n.button.is-black:focus, .button.is-black.is-focused {\n  border-color: transparent;\n  color: white;\n}\n\n.button.is-black:focus:not(:active), .button.is-black.is-focused:not(:active) {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);\n}\n\n.button.is-black:active, .button.is-black.is-active {\n  background-color: black;\n  border-color: transparent;\n  color: white;\n}\n\n.button.is-black[disabled] {\n  background-color: #0a0a0a;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\n.button.is-black.is-inverted {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.button.is-black.is-inverted:hover {\n  background-color: #f2f2f2;\n}\n\n.button.is-black.is-inverted[disabled] {\n  background-color: white;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #0a0a0a;\n}\n\n.button.is-black.is-loading:after {\n  border-color: transparent transparent white white !important;\n}\n\n.button.is-black.is-outlined {\n  background-color: transparent;\n  border-color: #0a0a0a;\n  color: #0a0a0a;\n}\n\n.button.is-black.is-outlined:hover, .button.is-black.is-outlined:focus {\n  background-color: #0a0a0a;\n  border-color: #0a0a0a;\n  color: white;\n}\n\n.button.is-black.is-outlined.is-loading:after {\n  border-color: transparent transparent #0a0a0a #0a0a0a !important;\n}\n\n.button.is-black.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: #0a0a0a;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #0a0a0a;\n}\n\n.button.is-black.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: white;\n  color: white;\n}\n\n.button.is-black.is-inverted.is-outlined:hover, .button.is-black.is-inverted.is-outlined:focus {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.button.is-black.is-inverted.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: white;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: white;\n}\n\n.button.is-light {\n  background-color: whitesmoke;\n  border-color: transparent;\n  color: #363636;\n}\n\n.button.is-light:hover, .button.is-light.is-hovered {\n  background-color: #eeeeee;\n  border-color: transparent;\n  color: #363636;\n}\n\n.button.is-light:focus, .button.is-light.is-focused {\n  border-color: transparent;\n  color: #363636;\n}\n\n.button.is-light:focus:not(:active), .button.is-light.is-focused:not(:active) {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);\n}\n\n.button.is-light:active, .button.is-light.is-active {\n  background-color: #e8e8e8;\n  border-color: transparent;\n  color: #363636;\n}\n\n.button.is-light[disabled] {\n  background-color: whitesmoke;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\n.button.is-light.is-inverted {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.button.is-light.is-inverted:hover {\n  background-color: #292929;\n}\n\n.button.is-light.is-inverted[disabled] {\n  background-color: #363636;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: whitesmoke;\n}\n\n.button.is-light.is-loading:after {\n  border-color: transparent transparent #363636 #363636 !important;\n}\n\n.button.is-light.is-outlined {\n  background-color: transparent;\n  border-color: whitesmoke;\n  color: whitesmoke;\n}\n\n.button.is-light.is-outlined:hover, .button.is-light.is-outlined:focus {\n  background-color: whitesmoke;\n  border-color: whitesmoke;\n  color: #363636;\n}\n\n.button.is-light.is-outlined.is-loading:after {\n  border-color: transparent transparent whitesmoke whitesmoke !important;\n}\n\n.button.is-light.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: whitesmoke;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: whitesmoke;\n}\n\n.button.is-light.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: #363636;\n  color: #363636;\n}\n\n.button.is-light.is-inverted.is-outlined:hover, .button.is-light.is-inverted.is-outlined:focus {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.button.is-light.is-inverted.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: #363636;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #363636;\n}\n\n.button.is-dark {\n  background-color: #363636;\n  border-color: transparent;\n  color: whitesmoke;\n}\n\n.button.is-dark:hover, .button.is-dark.is-hovered {\n  background-color: #2f2f2f;\n  border-color: transparent;\n  color: whitesmoke;\n}\n\n.button.is-dark:focus, .button.is-dark.is-focused {\n  border-color: transparent;\n  color: whitesmoke;\n}\n\n.button.is-dark:focus:not(:active), .button.is-dark.is-focused:not(:active) {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);\n}\n\n.button.is-dark:active, .button.is-dark.is-active {\n  background-color: #292929;\n  border-color: transparent;\n  color: whitesmoke;\n}\n\n.button.is-dark[disabled] {\n  background-color: #363636;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\n.button.is-dark.is-inverted {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.button.is-dark.is-inverted:hover {\n  background-color: #e8e8e8;\n}\n\n.button.is-dark.is-inverted[disabled] {\n  background-color: whitesmoke;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #363636;\n}\n\n.button.is-dark.is-loading:after {\n  border-color: transparent transparent whitesmoke whitesmoke !important;\n}\n\n.button.is-dark.is-outlined {\n  background-color: transparent;\n  border-color: #363636;\n  color: #363636;\n}\n\n.button.is-dark.is-outlined:hover, .button.is-dark.is-outlined:focus {\n  background-color: #363636;\n  border-color: #363636;\n  color: whitesmoke;\n}\n\n.button.is-dark.is-outlined.is-loading:after {\n  border-color: transparent transparent #363636 #363636 !important;\n}\n\n.button.is-dark.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: #363636;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #363636;\n}\n\n.button.is-dark.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: whitesmoke;\n  color: whitesmoke;\n}\n\n.button.is-dark.is-inverted.is-outlined:hover, .button.is-dark.is-inverted.is-outlined:focus {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.button.is-dark.is-inverted.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: whitesmoke;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: whitesmoke;\n}\n\n.button.is-primary {\n  background-color: #7957d5;\n  border-color: transparent;\n  color: white;\n}\n\n.button.is-primary:hover, .button.is-primary.is-hovered {\n  background-color: #714dd2;\n  border-color: transparent;\n  color: white;\n}\n\n.button.is-primary:focus, .button.is-primary.is-focused {\n  border-color: transparent;\n  color: white;\n}\n\n.button.is-primary:focus:not(:active), .button.is-primary.is-focused:not(:active) {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n}\n\n.button.is-primary:active, .button.is-primary.is-active {\n  background-color: #6943d0;\n  border-color: transparent;\n  color: white;\n}\n\n.button.is-primary[disabled] {\n  background-color: #7957d5;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\n.button.is-primary.is-inverted {\n  background-color: white;\n  color: #7957d5;\n}\n\n.button.is-primary.is-inverted:hover {\n  background-color: #f2f2f2;\n}\n\n.button.is-primary.is-inverted[disabled] {\n  background-color: white;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #7957d5;\n}\n\n.button.is-primary.is-loading:after {\n  border-color: transparent transparent white white !important;\n}\n\n.button.is-primary.is-outlined {\n  background-color: transparent;\n  border-color: #7957d5;\n  color: #7957d5;\n}\n\n.button.is-primary.is-outlined:hover, .button.is-primary.is-outlined:focus {\n  background-color: #7957d5;\n  border-color: #7957d5;\n  color: white;\n}\n\n.button.is-primary.is-outlined.is-loading:after {\n  border-color: transparent transparent #7957d5 #7957d5 !important;\n}\n\n.button.is-primary.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: #7957d5;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #7957d5;\n}\n\n.button.is-primary.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: white;\n  color: white;\n}\n\n.button.is-primary.is-inverted.is-outlined:hover, .button.is-primary.is-inverted.is-outlined:focus {\n  background-color: white;\n  color: #7957d5;\n}\n\n.button.is-primary.is-inverted.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: white;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: white;\n}\n\n.button.is-link {\n  background-color: #7957d5;\n  border-color: transparent;\n  color: white;\n}\n\n.button.is-link:hover, .button.is-link.is-hovered {\n  background-color: #714dd2;\n  border-color: transparent;\n  color: white;\n}\n\n.button.is-link:focus, .button.is-link.is-focused {\n  border-color: transparent;\n  color: white;\n}\n\n.button.is-link:focus:not(:active), .button.is-link.is-focused:not(:active) {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n}\n\n.button.is-link:active, .button.is-link.is-active {\n  background-color: #6943d0;\n  border-color: transparent;\n  color: white;\n}\n\n.button.is-link[disabled] {\n  background-color: #7957d5;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\n.button.is-link.is-inverted {\n  background-color: white;\n  color: #7957d5;\n}\n\n.button.is-link.is-inverted:hover {\n  background-color: #f2f2f2;\n}\n\n.button.is-link.is-inverted[disabled] {\n  background-color: white;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #7957d5;\n}\n\n.button.is-link.is-loading:after {\n  border-color: transparent transparent white white !important;\n}\n\n.button.is-link.is-outlined {\n  background-color: transparent;\n  border-color: #7957d5;\n  color: #7957d5;\n}\n\n.button.is-link.is-outlined:hover, .button.is-link.is-outlined:focus {\n  background-color: #7957d5;\n  border-color: #7957d5;\n  color: white;\n}\n\n.button.is-link.is-outlined.is-loading:after {\n  border-color: transparent transparent #7957d5 #7957d5 !important;\n}\n\n.button.is-link.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: #7957d5;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #7957d5;\n}\n\n.button.is-link.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: white;\n  color: white;\n}\n\n.button.is-link.is-inverted.is-outlined:hover, .button.is-link.is-inverted.is-outlined:focus {\n  background-color: white;\n  color: #7957d5;\n}\n\n.button.is-link.is-inverted.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: white;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: white;\n}\n\n.button.is-info {\n  background-color: #167df0;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-info:hover, .button.is-info.is-hovered {\n  background-color: #0f77ea;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-info:focus, .button.is-info.is-focused {\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-info:focus:not(:active), .button.is-info.is-focused:not(:active) {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(22, 125, 240, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(22, 125, 240, 0.25);\n}\n\n.button.is-info:active, .button.is-info.is-active {\n  background-color: #0e71de;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-info[disabled] {\n  background-color: #167df0;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\n.button.is-info.is-inverted {\n  background-color: #fff;\n  color: #167df0;\n}\n\n.button.is-info.is-inverted:hover {\n  background-color: #f2f2f2;\n}\n\n.button.is-info.is-inverted[disabled] {\n  background-color: #fff;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #167df0;\n}\n\n.button.is-info.is-loading:after {\n  border-color: transparent transparent #fff #fff !important;\n}\n\n.button.is-info.is-outlined {\n  background-color: transparent;\n  border-color: #167df0;\n  color: #167df0;\n}\n\n.button.is-info.is-outlined:hover, .button.is-info.is-outlined:focus {\n  background-color: #167df0;\n  border-color: #167df0;\n  color: #fff;\n}\n\n.button.is-info.is-outlined.is-loading:after {\n  border-color: transparent transparent #167df0 #167df0 !important;\n}\n\n.button.is-info.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: #167df0;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #167df0;\n}\n\n.button.is-info.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: #fff;\n  color: #fff;\n}\n\n.button.is-info.is-inverted.is-outlined:hover, .button.is-info.is-inverted.is-outlined:focus {\n  background-color: #fff;\n  color: #167df0;\n}\n\n.button.is-info.is-inverted.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: #fff;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #fff;\n}\n\n.button.is-success {\n  background-color: #23d160;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-success:hover, .button.is-success.is-hovered {\n  background-color: #22c65b;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-success:focus, .button.is-success.is-focused {\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-success:focus:not(:active), .button.is-success.is-focused:not(:active) {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(35, 209, 96, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(35, 209, 96, 0.25);\n}\n\n.button.is-success:active, .button.is-success.is-active {\n  background-color: #20bc56;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-success[disabled] {\n  background-color: #23d160;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\n.button.is-success.is-inverted {\n  background-color: #fff;\n  color: #23d160;\n}\n\n.button.is-success.is-inverted:hover {\n  background-color: #f2f2f2;\n}\n\n.button.is-success.is-inverted[disabled] {\n  background-color: #fff;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #23d160;\n}\n\n.button.is-success.is-loading:after {\n  border-color: transparent transparent #fff #fff !important;\n}\n\n.button.is-success.is-outlined {\n  background-color: transparent;\n  border-color: #23d160;\n  color: #23d160;\n}\n\n.button.is-success.is-outlined:hover, .button.is-success.is-outlined:focus {\n  background-color: #23d160;\n  border-color: #23d160;\n  color: #fff;\n}\n\n.button.is-success.is-outlined.is-loading:after {\n  border-color: transparent transparent #23d160 #23d160 !important;\n}\n\n.button.is-success.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: #23d160;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #23d160;\n}\n\n.button.is-success.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: #fff;\n  color: #fff;\n}\n\n.button.is-success.is-inverted.is-outlined:hover, .button.is-success.is-inverted.is-outlined:focus {\n  background-color: #fff;\n  color: #23d160;\n}\n\n.button.is-success.is-inverted.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: #fff;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #fff;\n}\n\n.button.is-warning {\n  background-color: #ffdd57;\n  border-color: transparent;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning:hover, .button.is-warning.is-hovered {\n  background-color: #ffdb4a;\n  border-color: transparent;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning:focus, .button.is-warning.is-focused {\n  border-color: transparent;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning:focus:not(:active), .button.is-warning.is-focused:not(:active) {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25);\n}\n\n.button.is-warning:active, .button.is-warning.is-active {\n  background-color: #ffd83d;\n  border-color: transparent;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning[disabled] {\n  background-color: #ffdd57;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\n.button.is-warning.is-inverted {\n  background-color: rgba(0, 0, 0, 0.7);\n  color: #ffdd57;\n}\n\n.button.is-warning.is-inverted:hover {\n  background-color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning.is-inverted[disabled] {\n  background-color: rgba(0, 0, 0, 0.7);\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #ffdd57;\n}\n\n.button.is-warning.is-loading:after {\n  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;\n}\n\n.button.is-warning.is-outlined {\n  background-color: transparent;\n  border-color: #ffdd57;\n  color: #ffdd57;\n}\n\n.button.is-warning.is-outlined:hover, .button.is-warning.is-outlined:focus {\n  background-color: #ffdd57;\n  border-color: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning.is-outlined.is-loading:after {\n  border-color: transparent transparent #ffdd57 #ffdd57 !important;\n}\n\n.button.is-warning.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: #ffdd57;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #ffdd57;\n}\n\n.button.is-warning.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: rgba(0, 0, 0, 0.7);\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning.is-inverted.is-outlined:hover, .button.is-warning.is-inverted.is-outlined:focus {\n  background-color: rgba(0, 0, 0, 0.7);\n  color: #ffdd57;\n}\n\n.button.is-warning.is-inverted.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: rgba(0, 0, 0, 0.7);\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-danger {\n  background-color: #ff3860;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-danger:hover, .button.is-danger.is-hovered {\n  background-color: #ff2b56;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-danger:focus, .button.is-danger.is-focused {\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-danger:focus:not(:active), .button.is-danger.is-focused:not(:active) {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25);\n}\n\n.button.is-danger:active, .button.is-danger.is-active {\n  background-color: #ff1f4b;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-danger[disabled] {\n  background-color: #ff3860;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\n.button.is-danger.is-inverted {\n  background-color: #fff;\n  color: #ff3860;\n}\n\n.button.is-danger.is-inverted:hover {\n  background-color: #f2f2f2;\n}\n\n.button.is-danger.is-inverted[disabled] {\n  background-color: #fff;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #ff3860;\n}\n\n.button.is-danger.is-loading:after {\n  border-color: transparent transparent #fff #fff !important;\n}\n\n.button.is-danger.is-outlined {\n  background-color: transparent;\n  border-color: #ff3860;\n  color: #ff3860;\n}\n\n.button.is-danger.is-outlined:hover, .button.is-danger.is-outlined:focus {\n  background-color: #ff3860;\n  border-color: #ff3860;\n  color: #fff;\n}\n\n.button.is-danger.is-outlined.is-loading:after {\n  border-color: transparent transparent #ff3860 #ff3860 !important;\n}\n\n.button.is-danger.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: #ff3860;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #ff3860;\n}\n\n.button.is-danger.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: #fff;\n  color: #fff;\n}\n\n.button.is-danger.is-inverted.is-outlined:hover, .button.is-danger.is-inverted.is-outlined:focus {\n  background-color: #fff;\n  color: #ff3860;\n}\n\n.button.is-danger.is-inverted.is-outlined[disabled] {\n  background-color: transparent;\n  border-color: #fff;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #fff;\n}\n\n.button.is-small {\n  border-radius: 2px;\n  font-size: 0.75rem;\n}\n\n.button.is-medium {\n  font-size: 1.25rem;\n}\n\n.button.is-large {\n  font-size: 1.5rem;\n}\n\n.button[disabled] {\n  background-color: white;\n  border-color: #dbdbdb;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  opacity: 0.5;\n}\n\n.button.is-fullwidth {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n}\n\n.button.is-loading {\n  color: transparent !important;\n  pointer-events: none;\n}\n\n.button.is-loading:after {\n  -webkit-animation: spinAround 500ms infinite linear;\n          animation: spinAround 500ms infinite linear;\n  border: 2px solid #dbdbdb;\n  border-radius: 290486px;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  content: \"\";\n  display: block;\n  height: 1em;\n  position: relative;\n  width: 1em;\n  position: absolute;\n  left: calc(50% - (1em / 2));\n  top: calc(50% - (1em / 2));\n  position: absolute !important;\n}\n\n.button.is-static {\n  background-color: whitesmoke;\n  border-color: #dbdbdb;\n  color: #7a7a7a;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  pointer-events: none;\n}\n\n.button.is-rounded {\n  border-radius: 290486px;\n  padding-left: 1em;\n  padding-right: 1em;\n}\n\n.buttons {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.buttons .button {\n  margin-bottom: 0.5rem;\n}\n\n.buttons .button:not(:last-child) {\n  margin-right: 0.5rem;\n}\n\n.buttons:last-child {\n  margin-bottom: -0.5rem;\n}\n\n.buttons:not(:last-child) {\n  margin-bottom: 1rem;\n}\n\n.buttons.has-addons .button:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.buttons.has-addons .button:not(:last-child) {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n  margin-right: -1px;\n}\n\n.buttons.has-addons .button:last-child {\n  margin-right: 0;\n}\n\n.buttons.has-addons .button:hover, .buttons.has-addons .button.is-hovered {\n  z-index: 2;\n}\n\n.buttons.has-addons .button:focus, .buttons.has-addons .button.is-focused, .buttons.has-addons .button:active, .buttons.has-addons .button.is-active, .buttons.has-addons .button.is-selected {\n  z-index: 3;\n}\n\n.buttons.has-addons .button:focus:hover, .buttons.has-addons .button.is-focused:hover, .buttons.has-addons .button:active:hover, .buttons.has-addons .button.is-active:hover, .buttons.has-addons .button.is-selected:hover {\n  z-index: 4;\n}\n\n.buttons.is-centered {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.buttons.is-right {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.container {\n  margin: 0 auto;\n  position: relative;\n}\n\n@media screen and (min-width: 1024px) {\n  .container {\n    max-width: 960px;\n    width: 960px;\n  }\n  .container.is-fluid {\n    margin-left: 32px;\n    margin-right: 32px;\n    max-width: none;\n    width: auto;\n  }\n}\n\n@media screen and (max-width: 1215px) {\n  .container.is-widescreen {\n    max-width: 1152px;\n    width: auto;\n  }\n}\n\n@media screen and (max-width: 1407px) {\n  .container.is-fullhd {\n    max-width: 1344px;\n    width: auto;\n  }\n}\n\n@media screen and (min-width: 1216px) {\n  .container {\n    max-width: 1152px;\n    width: 1152px;\n  }\n}\n\n@media screen and (min-width: 1408px) {\n  .container {\n    max-width: 1344px;\n    width: 1344px;\n  }\n}\n\n.content:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.content li + li {\n  margin-top: 0.25em;\n}\n\n.content p:not(:last-child),\n.content dl:not(:last-child),\n.content ol:not(:last-child),\n.content ul:not(:last-child),\n.content blockquote:not(:last-child),\n.content pre:not(:last-child),\n.content table:not(:last-child) {\n  margin-bottom: 1em;\n}\n\n.content h1,\n.content h2,\n.content h3,\n.content h4,\n.content h5,\n.content h6 {\n  color: #363636;\n  font-weight: 400;\n  line-height: 1.125;\n}\n\n.content h1 {\n  font-size: 2em;\n  margin-bottom: 0.5em;\n}\n\n.content h1:not(:first-child) {\n  margin-top: 1em;\n}\n\n.content h2 {\n  font-size: 1.75em;\n  margin-bottom: 0.5714em;\n}\n\n.content h2:not(:first-child) {\n  margin-top: 1.1428em;\n}\n\n.content h3 {\n  font-size: 1.5em;\n  margin-bottom: 0.6666em;\n}\n\n.content h3:not(:first-child) {\n  margin-top: 1.3333em;\n}\n\n.content h4 {\n  font-size: 1.25em;\n  margin-bottom: 0.8em;\n}\n\n.content h5 {\n  font-size: 1.125em;\n  margin-bottom: 0.8888em;\n}\n\n.content h6 {\n  font-size: 1em;\n  margin-bottom: 1em;\n}\n\n.content blockquote {\n  background-color: whitesmoke;\n  border-left: 5px solid #dbdbdb;\n  padding: 1.25em 1.5em;\n}\n\n.content ol {\n  list-style: decimal outside;\n  margin-left: 2em;\n  margin-top: 1em;\n}\n\n.content ul {\n  list-style: disc outside;\n  margin-left: 2em;\n  margin-top: 1em;\n}\n\n.content ul ul {\n  list-style-type: circle;\n  margin-top: 0.5em;\n}\n\n.content ul ul ul {\n  list-style-type: square;\n}\n\n.content dd {\n  margin-left: 2em;\n}\n\n.content figure {\n  margin-left: 2em;\n  margin-right: 2em;\n  text-align: center;\n}\n\n.content figure:not(:first-child) {\n  margin-top: 2em;\n}\n\n.content figure:not(:last-child) {\n  margin-bottom: 2em;\n}\n\n.content figure img {\n  display: inline-block;\n}\n\n.content figure figcaption {\n  font-style: italic;\n}\n\n.content pre {\n  -webkit-overflow-scrolling: touch;\n  overflow-x: auto;\n  padding: 1.25em 1.5em;\n  white-space: pre;\n  word-wrap: normal;\n}\n\n.content sup,\n.content sub {\n  font-size: 75%;\n}\n\n.content table {\n  width: 100%;\n}\n\n.content table td,\n.content table th {\n  border: 1px solid #dbdbdb;\n  border-width: 0 0 1px;\n  padding: 0.5em 0.75em;\n  vertical-align: top;\n}\n\n.content table th {\n  color: #363636;\n  text-align: left;\n}\n\n.content table tr:hover {\n  background-color: whitesmoke;\n}\n\n.content table thead td,\n.content table thead th {\n  border-width: 0 0 2px;\n  color: #363636;\n}\n\n.content table tfoot td,\n.content table tfoot th {\n  border-width: 2px 0 0;\n  color: #363636;\n}\n\n.content table tbody tr:last-child td,\n.content table tbody tr:last-child th {\n  border-bottom-width: 0;\n}\n\n.content.is-small {\n  font-size: 0.75rem;\n}\n\n.content.is-medium {\n  font-size: 1.25rem;\n}\n\n.content.is-large {\n  font-size: 1.5rem;\n}\n\n.input, .taginput .taginput-container.is-focusable,\n.textarea {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border: 1px solid transparent;\n  border-radius: 3px;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1rem;\n  height: 2.25em;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  line-height: 1.5;\n  padding-bottom: calc(0.375em - 1px);\n  padding-left: calc(0.625em - 1px);\n  padding-right: calc(0.625em - 1px);\n  padding-top: calc(0.375em - 1px);\n  position: relative;\n  vertical-align: top;\n  background-color: white;\n  border-color: #dbdbdb;\n  color: #363636;\n  -webkit-box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);\n          box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);\n  max-width: 100%;\n  width: 100%;\n}\n\n.input:focus, .taginput .taginput-container.is-focusable:focus, .input.is-focused, .taginput .is-focused.taginput-container.is-focusable, .input:active, .taginput .taginput-container.is-focusable:active, .input.is-active, .taginput .is-active.taginput-container.is-focusable,\n.textarea:focus,\n.textarea.is-focused,\n.textarea:active,\n.textarea.is-active {\n  outline: none;\n}\n\n.input[disabled], .taginput [disabled].taginput-container.is-focusable,\n.textarea[disabled] {\n  cursor: not-allowed;\n}\n\n.input::-moz-placeholder, .taginput .taginput-container.is-focusable::-moz-placeholder,\n.textarea::-moz-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.input::-webkit-input-placeholder, .taginput .taginput-container.is-focusable::-webkit-input-placeholder,\n.textarea::-webkit-input-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.input:-moz-placeholder, .taginput .taginput-container.is-focusable:-moz-placeholder,\n.textarea:-moz-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.input:-ms-input-placeholder, .taginput .taginput-container.is-focusable:-ms-input-placeholder,\n.textarea:-ms-input-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.input:hover, .taginput .taginput-container.is-focusable:hover, .input.is-hovered, .taginput .is-hovered.taginput-container.is-focusable,\n.textarea:hover,\n.textarea.is-hovered {\n  border-color: #b5b5b5;\n}\n\n.input:focus, .taginput .taginput-container.is-focusable:focus, .input.is-focused, .taginput .is-focused.taginput-container.is-focusable, .input:active, .taginput .taginput-container.is-focusable:active, .input.is-active, .taginput .is-active.taginput-container.is-focusable,\n.textarea:focus,\n.textarea.is-focused,\n.textarea:active,\n.textarea.is-active {\n  border-color: #7957d5;\n  -webkit-box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n}\n\n.input[disabled], .taginput [disabled].taginput-container.is-focusable,\n.textarea[disabled] {\n  background-color: whitesmoke;\n  border-color: whitesmoke;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #7a7a7a;\n}\n\n.input[disabled]::-moz-placeholder, .taginput [disabled].taginput-container.is-focusable::-moz-placeholder,\n.textarea[disabled]::-moz-placeholder {\n  color: rgba(122, 122, 122, 0.3);\n}\n\n.input[disabled]::-webkit-input-placeholder, .taginput [disabled].taginput-container.is-focusable::-webkit-input-placeholder,\n.textarea[disabled]::-webkit-input-placeholder {\n  color: rgba(122, 122, 122, 0.3);\n}\n\n.input[disabled]:-moz-placeholder, .taginput [disabled].taginput-container.is-focusable:-moz-placeholder,\n.textarea[disabled]:-moz-placeholder {\n  color: rgba(122, 122, 122, 0.3);\n}\n\n.input[disabled]:-ms-input-placeholder, .taginput [disabled].taginput-container.is-focusable:-ms-input-placeholder,\n.textarea[disabled]:-ms-input-placeholder {\n  color: rgba(122, 122, 122, 0.3);\n}\n\n.input[readonly], .taginput [readonly].taginput-container.is-focusable,\n.textarea[readonly] {\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\n.input.is-white, .taginput .is-white.taginput-container.is-focusable,\n.textarea.is-white {\n  border-color: white;\n}\n\n.input.is-white:focus, .taginput .is-white.taginput-container.is-focusable:focus, .input.is-white.is-focused, .taginput .is-white.is-focused.taginput-container.is-focusable, .input.is-white:active, .taginput .is-white.taginput-container.is-focusable:active, .input.is-white.is-active, .taginput .is-white.is-active.taginput-container.is-focusable,\n.textarea.is-white:focus,\n.textarea.is-white.is-focused,\n.textarea.is-white:active,\n.textarea.is-white.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);\n}\n\n.input.is-black, .taginput .is-black.taginput-container.is-focusable,\n.textarea.is-black {\n  border-color: #0a0a0a;\n}\n\n.input.is-black:focus, .taginput .is-black.taginput-container.is-focusable:focus, .input.is-black.is-focused, .taginput .is-black.is-focused.taginput-container.is-focusable, .input.is-black:active, .taginput .is-black.taginput-container.is-focusable:active, .input.is-black.is-active, .taginput .is-black.is-active.taginput-container.is-focusable,\n.textarea.is-black:focus,\n.textarea.is-black.is-focused,\n.textarea.is-black:active,\n.textarea.is-black.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);\n}\n\n.input.is-light, .taginput .is-light.taginput-container.is-focusable,\n.textarea.is-light {\n  border-color: whitesmoke;\n}\n\n.input.is-light:focus, .taginput .is-light.taginput-container.is-focusable:focus, .input.is-light.is-focused, .taginput .is-light.is-focused.taginput-container.is-focusable, .input.is-light:active, .taginput .is-light.taginput-container.is-focusable:active, .input.is-light.is-active, .taginput .is-light.is-active.taginput-container.is-focusable,\n.textarea.is-light:focus,\n.textarea.is-light.is-focused,\n.textarea.is-light:active,\n.textarea.is-light.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);\n}\n\n.input.is-dark, .taginput .is-dark.taginput-container.is-focusable,\n.textarea.is-dark {\n  border-color: #363636;\n}\n\n.input.is-dark:focus, .taginput .is-dark.taginput-container.is-focusable:focus, .input.is-dark.is-focused, .taginput .is-dark.is-focused.taginput-container.is-focusable, .input.is-dark:active, .taginput .is-dark.taginput-container.is-focusable:active, .input.is-dark.is-active, .taginput .is-dark.is-active.taginput-container.is-focusable,\n.textarea.is-dark:focus,\n.textarea.is-dark.is-focused,\n.textarea.is-dark:active,\n.textarea.is-dark.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);\n}\n\n.input.is-primary, .taginput .is-primary.taginput-container.is-focusable,\n.textarea.is-primary {\n  border-color: #7957d5;\n}\n\n.input.is-primary:focus, .taginput .is-primary.taginput-container.is-focusable:focus, .input.is-primary.is-focused, .taginput .is-primary.is-focused.taginput-container.is-focusable, .input.is-primary:active, .taginput .is-primary.taginput-container.is-focusable:active, .input.is-primary.is-active, .taginput .is-primary.is-active.taginput-container.is-focusable,\n.textarea.is-primary:focus,\n.textarea.is-primary.is-focused,\n.textarea.is-primary:active,\n.textarea.is-primary.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n}\n\n.input.is-link, .taginput .is-link.taginput-container.is-focusable,\n.textarea.is-link {\n  border-color: #7957d5;\n}\n\n.input.is-link:focus, .taginput .is-link.taginput-container.is-focusable:focus, .input.is-link.is-focused, .taginput .is-link.is-focused.taginput-container.is-focusable, .input.is-link:active, .taginput .is-link.taginput-container.is-focusable:active, .input.is-link.is-active, .taginput .is-link.is-active.taginput-container.is-focusable,\n.textarea.is-link:focus,\n.textarea.is-link.is-focused,\n.textarea.is-link:active,\n.textarea.is-link.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n}\n\n.input.is-info, .taginput .is-info.taginput-container.is-focusable,\n.textarea.is-info {\n  border-color: #167df0;\n}\n\n.input.is-info:focus, .taginput .is-info.taginput-container.is-focusable:focus, .input.is-info.is-focused, .taginput .is-info.is-focused.taginput-container.is-focusable, .input.is-info:active, .taginput .is-info.taginput-container.is-focusable:active, .input.is-info.is-active, .taginput .is-info.is-active.taginput-container.is-focusable,\n.textarea.is-info:focus,\n.textarea.is-info.is-focused,\n.textarea.is-info:active,\n.textarea.is-info.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(22, 125, 240, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(22, 125, 240, 0.25);\n}\n\n.input.is-success, .taginput .is-success.taginput-container.is-focusable,\n.textarea.is-success {\n  border-color: #23d160;\n}\n\n.input.is-success:focus, .taginput .is-success.taginput-container.is-focusable:focus, .input.is-success.is-focused, .taginput .is-success.is-focused.taginput-container.is-focusable, .input.is-success:active, .taginput .is-success.taginput-container.is-focusable:active, .input.is-success.is-active, .taginput .is-success.is-active.taginput-container.is-focusable,\n.textarea.is-success:focus,\n.textarea.is-success.is-focused,\n.textarea.is-success:active,\n.textarea.is-success.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(35, 209, 96, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(35, 209, 96, 0.25);\n}\n\n.input.is-warning, .taginput .is-warning.taginput-container.is-focusable,\n.textarea.is-warning {\n  border-color: #ffdd57;\n}\n\n.input.is-warning:focus, .taginput .is-warning.taginput-container.is-focusable:focus, .input.is-warning.is-focused, .taginput .is-warning.is-focused.taginput-container.is-focusable, .input.is-warning:active, .taginput .is-warning.taginput-container.is-focusable:active, .input.is-warning.is-active, .taginput .is-warning.is-active.taginput-container.is-focusable,\n.textarea.is-warning:focus,\n.textarea.is-warning.is-focused,\n.textarea.is-warning:active,\n.textarea.is-warning.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25);\n}\n\n.input.is-danger, .taginput .is-danger.taginput-container.is-focusable,\n.textarea.is-danger {\n  border-color: #ff3860;\n}\n\n.input.is-danger:focus, .taginput .is-danger.taginput-container.is-focusable:focus, .input.is-danger.is-focused, .taginput .is-danger.is-focused.taginput-container.is-focusable, .input.is-danger:active, .taginput .is-danger.taginput-container.is-focusable:active, .input.is-danger.is-active, .taginput .is-danger.is-active.taginput-container.is-focusable,\n.textarea.is-danger:focus,\n.textarea.is-danger.is-focused,\n.textarea.is-danger:active,\n.textarea.is-danger.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25);\n}\n\n.input.is-small, .taginput .is-small.taginput-container.is-focusable,\n.textarea.is-small {\n  border-radius: 2px;\n  font-size: 0.75rem;\n}\n\n.input.is-medium, .taginput .is-medium.taginput-container.is-focusable,\n.textarea.is-medium {\n  font-size: 1.25rem;\n}\n\n.input.is-large, .taginput .is-large.taginput-container.is-focusable,\n.textarea.is-large {\n  font-size: 1.5rem;\n}\n\n.input.is-fullwidth, .taginput .is-fullwidth.taginput-container.is-focusable,\n.textarea.is-fullwidth {\n  display: block;\n  width: 100%;\n}\n\n.input.is-inline, .taginput .is-inline.taginput-container.is-focusable,\n.textarea.is-inline {\n  display: inline;\n  width: auto;\n}\n\n.input.is-rounded, .taginput .is-rounded.taginput-container.is-focusable {\n  border-radius: 290486px;\n  padding-left: 1em;\n  padding-right: 1em;\n}\n\n.input.is-static, .taginput .is-static.taginput-container.is-focusable {\n  background-color: transparent;\n  border-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.textarea {\n  display: block;\n  max-width: 100%;\n  min-width: 100%;\n  padding: 0.625em;\n  resize: vertical;\n}\n\n.textarea:not([rows]) {\n  max-height: 600px;\n  min-height: 120px;\n}\n\n.textarea[rows] {\n  height: unset;\n}\n\n.textarea.has-fixed-size {\n  resize: none;\n}\n\n.checkbox,\n.radio {\n  cursor: pointer;\n  display: inline-block;\n  line-height: 1.25;\n  position: relative;\n}\n\n.checkbox input,\n.radio input {\n  cursor: pointer;\n}\n\n.checkbox:hover,\n.radio:hover {\n  color: #363636;\n}\n\n.checkbox[disabled],\n.radio[disabled] {\n  color: #7a7a7a;\n  cursor: not-allowed;\n}\n\n.radio + .radio {\n  margin-left: 0.5em;\n}\n\n.select {\n  display: inline-block;\n  max-width: 100%;\n  position: relative;\n  vertical-align: top;\n}\n\n.select:not(.is-multiple) {\n  height: 2.25em;\n}\n\n.select:not(.is-multiple)::after {\n  border: 1px solid #7957d5;\n  border-right: 0;\n  border-top: 0;\n  content: \" \";\n  display: block;\n  height: 0.5em;\n  pointer-events: none;\n  position: absolute;\n  -webkit-transform: rotate(-45deg);\n          transform: rotate(-45deg);\n  -webkit-transform-origin: center;\n          transform-origin: center;\n  width: 0.5em;\n  margin-top: -0.375em;\n  right: 1.125em;\n  top: 50%;\n  z-index: 4;\n}\n\n.select.is-rounded select {\n  border-radius: 290486px;\n  padding-left: 1em;\n}\n\n.select select {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border: 1px solid transparent;\n  border-radius: 3px;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1rem;\n  height: 2.25em;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  line-height: 1.5;\n  padding-bottom: calc(0.375em - 1px);\n  padding-left: calc(0.625em - 1px);\n  padding-right: calc(0.625em - 1px);\n  padding-top: calc(0.375em - 1px);\n  position: relative;\n  vertical-align: top;\n  background-color: white;\n  border-color: #dbdbdb;\n  color: #363636;\n  cursor: pointer;\n  display: block;\n  font-size: 1em;\n  max-width: 100%;\n  outline: none;\n}\n\n.select select:focus, .select select.is-focused, .select select:active, .select select.is-active {\n  outline: none;\n}\n\n.select select[disabled] {\n  cursor: not-allowed;\n}\n\n.select select::-moz-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.select select::-webkit-input-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.select select:-moz-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.select select:-ms-input-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.select select:hover, .select select.is-hovered {\n  border-color: #b5b5b5;\n}\n\n.select select:focus, .select select.is-focused, .select select:active, .select select.is-active {\n  border-color: #7957d5;\n  -webkit-box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n}\n\n.select select[disabled] {\n  background-color: whitesmoke;\n  border-color: whitesmoke;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #7a7a7a;\n}\n\n.select select[disabled]::-moz-placeholder {\n  color: rgba(122, 122, 122, 0.3);\n}\n\n.select select[disabled]::-webkit-input-placeholder {\n  color: rgba(122, 122, 122, 0.3);\n}\n\n.select select[disabled]:-moz-placeholder {\n  color: rgba(122, 122, 122, 0.3);\n}\n\n.select select[disabled]:-ms-input-placeholder {\n  color: rgba(122, 122, 122, 0.3);\n}\n\n.select select::-ms-expand {\n  display: none;\n}\n\n.select select[disabled]:hover {\n  border-color: whitesmoke;\n}\n\n.select select:not([multiple]) {\n  padding-right: 2.5em;\n}\n\n.select select[multiple] {\n  height: unset;\n  padding: 0;\n}\n\n.select select[multiple] option {\n  padding: 0.5em 1em;\n}\n\n.select:hover::after {\n  border-color: #363636;\n}\n\n.select.is-white select {\n  border-color: white;\n}\n\n.select.is-white select:focus, .select.is-white select.is-focused, .select.is-white select:active, .select.is-white select.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);\n}\n\n.select.is-black select {\n  border-color: #0a0a0a;\n}\n\n.select.is-black select:focus, .select.is-black select.is-focused, .select.is-black select:active, .select.is-black select.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);\n}\n\n.select.is-light select {\n  border-color: whitesmoke;\n}\n\n.select.is-light select:focus, .select.is-light select.is-focused, .select.is-light select:active, .select.is-light select.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);\n}\n\n.select.is-dark select {\n  border-color: #363636;\n}\n\n.select.is-dark select:focus, .select.is-dark select.is-focused, .select.is-dark select:active, .select.is-dark select.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);\n}\n\n.select.is-primary select {\n  border-color: #7957d5;\n}\n\n.select.is-primary select:focus, .select.is-primary select.is-focused, .select.is-primary select:active, .select.is-primary select.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n}\n\n.select.is-link select {\n  border-color: #7957d5;\n}\n\n.select.is-link select:focus, .select.is-link select.is-focused, .select.is-link select:active, .select.is-link select.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n}\n\n.select.is-info select {\n  border-color: #167df0;\n}\n\n.select.is-info select:focus, .select.is-info select.is-focused, .select.is-info select:active, .select.is-info select.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(22, 125, 240, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(22, 125, 240, 0.25);\n}\n\n.select.is-success select {\n  border-color: #23d160;\n}\n\n.select.is-success select:focus, .select.is-success select.is-focused, .select.is-success select:active, .select.is-success select.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(35, 209, 96, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(35, 209, 96, 0.25);\n}\n\n.select.is-warning select {\n  border-color: #ffdd57;\n}\n\n.select.is-warning select:focus, .select.is-warning select.is-focused, .select.is-warning select:active, .select.is-warning select.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25);\n}\n\n.select.is-danger select {\n  border-color: #ff3860;\n}\n\n.select.is-danger select:focus, .select.is-danger select.is-focused, .select.is-danger select:active, .select.is-danger select.is-active {\n  -webkit-box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25);\n}\n\n.select.is-small {\n  border-radius: 2px;\n  font-size: 0.75rem;\n}\n\n.select.is-medium {\n  font-size: 1.25rem;\n}\n\n.select.is-large {\n  font-size: 1.5rem;\n}\n\n.select.is-disabled::after {\n  border-color: #7a7a7a;\n}\n\n.select.is-fullwidth {\n  width: 100%;\n}\n\n.select.is-fullwidth select {\n  width: 100%;\n}\n\n.select.is-loading::after {\n  -webkit-animation: spinAround 500ms infinite linear;\n          animation: spinAround 500ms infinite linear;\n  border: 2px solid #dbdbdb;\n  border-radius: 290486px;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  content: \"\";\n  display: block;\n  height: 1em;\n  position: relative;\n  width: 1em;\n  margin-top: 0;\n  position: absolute;\n  right: 0.625em;\n  top: 0.625em;\n  -webkit-transform: none;\n          transform: none;\n}\n\n.select.is-loading.is-small:after {\n  font-size: 0.75rem;\n}\n\n.select.is-loading.is-medium:after {\n  font-size: 1.25rem;\n}\n\n.select.is-loading.is-large:after {\n  font-size: 1.5rem;\n}\n\n.file {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  position: relative;\n}\n\n.file.is-white .file-cta {\n  background-color: white;\n  border-color: transparent;\n  color: #0a0a0a;\n}\n\n.file.is-white:hover .file-cta, .file.is-white.is-hovered .file-cta {\n  background-color: #f9f9f9;\n  border-color: transparent;\n  color: #0a0a0a;\n}\n\n.file.is-white:focus .file-cta, .file.is-white.is-focused .file-cta {\n  border-color: transparent;\n  -webkit-box-shadow: 0 0 0.5em rgba(255, 255, 255, 0.25);\n          box-shadow: 0 0 0.5em rgba(255, 255, 255, 0.25);\n  color: #0a0a0a;\n}\n\n.file.is-white:active .file-cta, .file.is-white.is-active .file-cta {\n  background-color: #f2f2f2;\n  border-color: transparent;\n  color: #0a0a0a;\n}\n\n.file.is-black .file-cta {\n  background-color: #0a0a0a;\n  border-color: transparent;\n  color: white;\n}\n\n.file.is-black:hover .file-cta, .file.is-black.is-hovered .file-cta {\n  background-color: #040404;\n  border-color: transparent;\n  color: white;\n}\n\n.file.is-black:focus .file-cta, .file.is-black.is-focused .file-cta {\n  border-color: transparent;\n  -webkit-box-shadow: 0 0 0.5em rgba(10, 10, 10, 0.25);\n          box-shadow: 0 0 0.5em rgba(10, 10, 10, 0.25);\n  color: white;\n}\n\n.file.is-black:active .file-cta, .file.is-black.is-active .file-cta {\n  background-color: black;\n  border-color: transparent;\n  color: white;\n}\n\n.file.is-light .file-cta {\n  background-color: whitesmoke;\n  border-color: transparent;\n  color: #363636;\n}\n\n.file.is-light:hover .file-cta, .file.is-light.is-hovered .file-cta {\n  background-color: #eeeeee;\n  border-color: transparent;\n  color: #363636;\n}\n\n.file.is-light:focus .file-cta, .file.is-light.is-focused .file-cta {\n  border-color: transparent;\n  -webkit-box-shadow: 0 0 0.5em rgba(245, 245, 245, 0.25);\n          box-shadow: 0 0 0.5em rgba(245, 245, 245, 0.25);\n  color: #363636;\n}\n\n.file.is-light:active .file-cta, .file.is-light.is-active .file-cta {\n  background-color: #e8e8e8;\n  border-color: transparent;\n  color: #363636;\n}\n\n.file.is-dark .file-cta {\n  background-color: #363636;\n  border-color: transparent;\n  color: whitesmoke;\n}\n\n.file.is-dark:hover .file-cta, .file.is-dark.is-hovered .file-cta {\n  background-color: #2f2f2f;\n  border-color: transparent;\n  color: whitesmoke;\n}\n\n.file.is-dark:focus .file-cta, .file.is-dark.is-focused .file-cta {\n  border-color: transparent;\n  -webkit-box-shadow: 0 0 0.5em rgba(54, 54, 54, 0.25);\n          box-shadow: 0 0 0.5em rgba(54, 54, 54, 0.25);\n  color: whitesmoke;\n}\n\n.file.is-dark:active .file-cta, .file.is-dark.is-active .file-cta {\n  background-color: #292929;\n  border-color: transparent;\n  color: whitesmoke;\n}\n\n.file.is-primary .file-cta {\n  background-color: #7957d5;\n  border-color: transparent;\n  color: white;\n}\n\n.file.is-primary:hover .file-cta, .file.is-primary.is-hovered .file-cta {\n  background-color: #714dd2;\n  border-color: transparent;\n  color: white;\n}\n\n.file.is-primary:focus .file-cta, .file.is-primary.is-focused .file-cta {\n  border-color: transparent;\n  -webkit-box-shadow: 0 0 0.5em rgba(121, 87, 213, 0.25);\n          box-shadow: 0 0 0.5em rgba(121, 87, 213, 0.25);\n  color: white;\n}\n\n.file.is-primary:active .file-cta, .file.is-primary.is-active .file-cta {\n  background-color: #6943d0;\n  border-color: transparent;\n  color: white;\n}\n\n.file.is-link .file-cta {\n  background-color: #7957d5;\n  border-color: transparent;\n  color: white;\n}\n\n.file.is-link:hover .file-cta, .file.is-link.is-hovered .file-cta {\n  background-color: #714dd2;\n  border-color: transparent;\n  color: white;\n}\n\n.file.is-link:focus .file-cta, .file.is-link.is-focused .file-cta {\n  border-color: transparent;\n  -webkit-box-shadow: 0 0 0.5em rgba(121, 87, 213, 0.25);\n          box-shadow: 0 0 0.5em rgba(121, 87, 213, 0.25);\n  color: white;\n}\n\n.file.is-link:active .file-cta, .file.is-link.is-active .file-cta {\n  background-color: #6943d0;\n  border-color: transparent;\n  color: white;\n}\n\n.file.is-info .file-cta {\n  background-color: #167df0;\n  border-color: transparent;\n  color: #fff;\n}\n\n.file.is-info:hover .file-cta, .file.is-info.is-hovered .file-cta {\n  background-color: #0f77ea;\n  border-color: transparent;\n  color: #fff;\n}\n\n.file.is-info:focus .file-cta, .file.is-info.is-focused .file-cta {\n  border-color: transparent;\n  -webkit-box-shadow: 0 0 0.5em rgba(22, 125, 240, 0.25);\n          box-shadow: 0 0 0.5em rgba(22, 125, 240, 0.25);\n  color: #fff;\n}\n\n.file.is-info:active .file-cta, .file.is-info.is-active .file-cta {\n  background-color: #0e71de;\n  border-color: transparent;\n  color: #fff;\n}\n\n.file.is-success .file-cta {\n  background-color: #23d160;\n  border-color: transparent;\n  color: #fff;\n}\n\n.file.is-success:hover .file-cta, .file.is-success.is-hovered .file-cta {\n  background-color: #22c65b;\n  border-color: transparent;\n  color: #fff;\n}\n\n.file.is-success:focus .file-cta, .file.is-success.is-focused .file-cta {\n  border-color: transparent;\n  -webkit-box-shadow: 0 0 0.5em rgba(35, 209, 96, 0.25);\n          box-shadow: 0 0 0.5em rgba(35, 209, 96, 0.25);\n  color: #fff;\n}\n\n.file.is-success:active .file-cta, .file.is-success.is-active .file-cta {\n  background-color: #20bc56;\n  border-color: transparent;\n  color: #fff;\n}\n\n.file.is-warning .file-cta {\n  background-color: #ffdd57;\n  border-color: transparent;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.file.is-warning:hover .file-cta, .file.is-warning.is-hovered .file-cta {\n  background-color: #ffdb4a;\n  border-color: transparent;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.file.is-warning:focus .file-cta, .file.is-warning.is-focused .file-cta {\n  border-color: transparent;\n  -webkit-box-shadow: 0 0 0.5em rgba(255, 221, 87, 0.25);\n          box-shadow: 0 0 0.5em rgba(255, 221, 87, 0.25);\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.file.is-warning:active .file-cta, .file.is-warning.is-active .file-cta {\n  background-color: #ffd83d;\n  border-color: transparent;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.file.is-danger .file-cta {\n  background-color: #ff3860;\n  border-color: transparent;\n  color: #fff;\n}\n\n.file.is-danger:hover .file-cta, .file.is-danger.is-hovered .file-cta {\n  background-color: #ff2b56;\n  border-color: transparent;\n  color: #fff;\n}\n\n.file.is-danger:focus .file-cta, .file.is-danger.is-focused .file-cta {\n  border-color: transparent;\n  -webkit-box-shadow: 0 0 0.5em rgba(255, 56, 96, 0.25);\n          box-shadow: 0 0 0.5em rgba(255, 56, 96, 0.25);\n  color: #fff;\n}\n\n.file.is-danger:active .file-cta, .file.is-danger.is-active .file-cta {\n  background-color: #ff1f4b;\n  border-color: transparent;\n  color: #fff;\n}\n\n.file.is-small {\n  font-size: 0.75rem;\n}\n\n.file.is-medium {\n  font-size: 1.25rem;\n}\n\n.file.is-medium .file-icon .fa {\n  font-size: 21px;\n}\n\n.file.is-large {\n  font-size: 1.5rem;\n}\n\n.file.is-large .file-icon .fa {\n  font-size: 28px;\n}\n\n.file.has-name .file-cta {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.file.has-name .file-name {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.file.has-name.is-empty .file-cta {\n  border-radius: 3px;\n}\n\n.file.has-name.is-empty .file-name {\n  display: none;\n}\n\n.file.is-boxed .file-label {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.file.is-boxed .file-cta {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  height: auto;\n  padding: 1em 3em;\n}\n\n.file.is-boxed .file-name {\n  border-width: 0 1px 1px;\n}\n\n.file.is-boxed .file-icon {\n  height: 1.5em;\n  width: 1.5em;\n}\n\n.file.is-boxed .file-icon .fa {\n  font-size: 21px;\n}\n\n.file.is-boxed.is-small .file-icon .fa {\n  font-size: 14px;\n}\n\n.file.is-boxed.is-medium .file-icon .fa {\n  font-size: 28px;\n}\n\n.file.is-boxed.is-large .file-icon .fa {\n  font-size: 35px;\n}\n\n.file.is-boxed.has-name .file-cta {\n  border-radius: 3px 3px 0 0;\n}\n\n.file.is-boxed.has-name .file-name {\n  border-radius: 0 0 3px 3px;\n  border-width: 0 1px 1px;\n}\n\n.file.is-centered {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.file.is-fullwidth .file-label {\n  width: 100%;\n}\n\n.file.is-fullwidth .file-name {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  max-width: none;\n}\n\n.file.is-right {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.file.is-right .file-cta {\n  border-radius: 0 3px 3px 0;\n}\n\n.file.is-right .file-name {\n  border-radius: 3px 0 0 3px;\n  border-width: 1px 0 1px 1px;\n  -webkit-box-ordinal-group: 0;\n      -ms-flex-order: -1;\n          order: -1;\n}\n\n.file-label {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  cursor: pointer;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  overflow: hidden;\n  position: relative;\n}\n\n.file-label:hover .file-cta {\n  background-color: #eeeeee;\n  color: #363636;\n}\n\n.file-label:hover .file-name {\n  border-color: #d5d5d5;\n}\n\n.file-label:active .file-cta {\n  background-color: #e8e8e8;\n  color: #363636;\n}\n\n.file-label:active .file-name {\n  border-color: #cfcfcf;\n}\n\n.file-input {\n  height: 0.01em;\n  left: 0;\n  outline: none;\n  position: absolute;\n  top: 0;\n  width: 0.01em;\n}\n\n.file-cta,\n.file-name {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border: 1px solid transparent;\n  border-radius: 3px;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1rem;\n  height: 2.25em;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  line-height: 1.5;\n  padding-bottom: calc(0.375em - 1px);\n  padding-left: calc(0.625em - 1px);\n  padding-right: calc(0.625em - 1px);\n  padding-top: calc(0.375em - 1px);\n  position: relative;\n  vertical-align: top;\n  border-color: #dbdbdb;\n  border-radius: 3px;\n  font-size: 1em;\n  padding-left: 1em;\n  padding-right: 1em;\n  white-space: nowrap;\n}\n\n.file-cta:focus, .file-cta.is-focused, .file-cta:active, .file-cta.is-active,\n.file-name:focus,\n.file-name.is-focused,\n.file-name:active,\n.file-name.is-active {\n  outline: none;\n}\n\n.file-cta[disabled],\n.file-name[disabled] {\n  cursor: not-allowed;\n}\n\n.file-cta {\n  background-color: whitesmoke;\n  color: #4a4a4a;\n}\n\n.file-name {\n  border-color: #dbdbdb;\n  border-style: solid;\n  border-width: 1px 1px 1px 0;\n  display: block;\n  max-width: 16em;\n  overflow: hidden;\n  text-align: left;\n  text-overflow: ellipsis;\n}\n\n.file-icon {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 1em;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-right: 0.5em;\n  width: 1em;\n}\n\n.file-icon .fa {\n  font-size: 14px;\n}\n\n.label {\n  color: #363636;\n  display: block;\n  font-size: 1rem;\n  font-weight: 700;\n}\n\n.label:not(:last-child) {\n  margin-bottom: 0.5em;\n}\n\n.label.is-small {\n  font-size: 0.75rem;\n}\n\n.label.is-medium {\n  font-size: 1.25rem;\n}\n\n.label.is-large {\n  font-size: 1.5rem;\n}\n\n.help {\n  display: block;\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n}\n\n.help.is-white {\n  color: white;\n}\n\n.help.is-black {\n  color: #0a0a0a;\n}\n\n.help.is-light {\n  color: whitesmoke;\n}\n\n.help.is-dark {\n  color: #363636;\n}\n\n.help.is-primary {\n  color: #7957d5;\n}\n\n.help.is-link {\n  color: #7957d5;\n}\n\n.help.is-info {\n  color: #167df0;\n}\n\n.help.is-success {\n  color: #23d160;\n}\n\n.help.is-warning {\n  color: #ffdd57;\n}\n\n.help.is-danger {\n  color: #ff3860;\n}\n\n.field:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n\n.field.has-addons {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.field.has-addons .control:not(:last-child) {\n  margin-right: -1px;\n}\n\n.field.has-addons .control:not(:first-child):not(:last-child) .button,\n.field.has-addons .control:not(:first-child):not(:last-child) .input,\n.field.has-addons .control:not(:first-child):not(:last-child) .taginput .taginput-container.is-focusable, .taginput\n.field.has-addons .control:not(:first-child):not(:last-child) .taginput-container.is-focusable,\n.field.has-addons .control:not(:first-child):not(:last-child) .select select {\n  border-radius: 0;\n}\n\n.field.has-addons .control:first-child .button,\n.field.has-addons .control:first-child .input,\n.field.has-addons .control:first-child .taginput .taginput-container.is-focusable, .taginput\n.field.has-addons .control:first-child .taginput-container.is-focusable,\n.field.has-addons .control:first-child .select select {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.field.has-addons .control:last-child .button,\n.field.has-addons .control:last-child .input,\n.field.has-addons .control:last-child .taginput .taginput-container.is-focusable, .taginput\n.field.has-addons .control:last-child .taginput-container.is-focusable,\n.field.has-addons .control:last-child .select select {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.field.has-addons .control .button:hover, .field.has-addons .control .button.is-hovered,\n.field.has-addons .control .input:hover,\n.field.has-addons .control .taginput .taginput-container.is-focusable:hover, .taginput\n.field.has-addons .control .taginput-container.is-focusable:hover,\n.field.has-addons .control .input.is-hovered,\n.field.has-addons .control .taginput .is-hovered.taginput-container.is-focusable, .taginput\n.field.has-addons .control .is-hovered.taginput-container.is-focusable,\n.field.has-addons .control .select select:hover,\n.field.has-addons .control .select select.is-hovered {\n  z-index: 2;\n}\n\n.field.has-addons .control .button:focus, .field.has-addons .control .button.is-focused, .field.has-addons .control .button:active, .field.has-addons .control .button.is-active,\n.field.has-addons .control .input:focus,\n.field.has-addons .control .taginput .taginput-container.is-focusable:focus, .taginput\n.field.has-addons .control .taginput-container.is-focusable:focus,\n.field.has-addons .control .input.is-focused,\n.field.has-addons .control .taginput .is-focused.taginput-container.is-focusable, .taginput\n.field.has-addons .control .is-focused.taginput-container.is-focusable,\n.field.has-addons .control .input:active,\n.field.has-addons .control .taginput .taginput-container.is-focusable:active, .taginput\n.field.has-addons .control .taginput-container.is-focusable:active,\n.field.has-addons .control .input.is-active,\n.field.has-addons .control .taginput .is-active.taginput-container.is-focusable, .taginput\n.field.has-addons .control .is-active.taginput-container.is-focusable,\n.field.has-addons .control .select select:focus,\n.field.has-addons .control .select select.is-focused,\n.field.has-addons .control .select select:active,\n.field.has-addons .control .select select.is-active {\n  z-index: 3;\n}\n\n.field.has-addons .control .button:focus:hover, .field.has-addons .control .button.is-focused:hover, .field.has-addons .control .button:active:hover, .field.has-addons .control .button.is-active:hover,\n.field.has-addons .control .input:focus:hover,\n.field.has-addons .control .taginput .taginput-container.is-focusable:focus:hover, .taginput\n.field.has-addons .control .taginput-container.is-focusable:focus:hover,\n.field.has-addons .control .input.is-focused:hover,\n.field.has-addons .control .taginput .is-focused.taginput-container.is-focusable:hover, .taginput\n.field.has-addons .control .is-focused.taginput-container.is-focusable:hover,\n.field.has-addons .control .input:active:hover,\n.field.has-addons .control .taginput .taginput-container.is-focusable:active:hover, .taginput\n.field.has-addons .control .taginput-container.is-focusable:active:hover,\n.field.has-addons .control .input.is-active:hover,\n.field.has-addons .control .taginput .is-active.taginput-container.is-focusable:hover, .taginput\n.field.has-addons .control .is-active.taginput-container.is-focusable:hover,\n.field.has-addons .control .select select:focus:hover,\n.field.has-addons .control .select select.is-focused:hover,\n.field.has-addons .control .select select:active:hover,\n.field.has-addons .control .select select.is-active:hover {\n  z-index: 4;\n}\n\n.field.has-addons .control.is-expanded {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n\n.field.has-addons.has-addons-centered {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.field.has-addons.has-addons-right {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.field.has-addons.has-addons-fullwidth .control {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.field.is-grouped {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.field.is-grouped > .control {\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.field.is-grouped > .control:not(:last-child) {\n  margin-bottom: 0;\n  margin-right: 0.75rem;\n}\n\n.field.is-grouped > .control.is-expanded {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n}\n\n.field.is-grouped.is-grouped-centered {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.field.is-grouped.is-grouped-right {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.field.is-grouped.is-grouped-multiline {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n\n.field.is-grouped.is-grouped-multiline > .control:last-child, .field.is-grouped.is-grouped-multiline > .control:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n\n.field.is-grouped.is-grouped-multiline:last-child {\n  margin-bottom: -0.75rem;\n}\n\n.field.is-grouped.is-grouped-multiline:not(:last-child) {\n  margin-bottom: 0;\n}\n\n@media screen and (min-width: 769px), print {\n  .field.is-horizontal {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\n\n.field-label .label {\n  font-size: inherit;\n}\n\n@media screen and (max-width: 768px) {\n  .field-label {\n    margin-bottom: 0.5rem;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .field-label {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n    margin-right: 1.5rem;\n    text-align: right;\n  }\n  .field-label.is-small {\n    font-size: 0.75rem;\n    padding-top: 0.375em;\n  }\n  .field-label.is-normal {\n    padding-top: 0.375em;\n  }\n  .field-label.is-medium {\n    font-size: 1.25rem;\n    padding-top: 0.375em;\n  }\n  .field-label.is-large {\n    font-size: 1.5rem;\n    padding-top: 0.375em;\n  }\n}\n\n.field-body .field .field {\n  margin-bottom: 0;\n}\n\n@media screen and (min-width: 769px), print {\n  .field-body {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 5;\n        -ms-flex-positive: 5;\n            flex-grow: 5;\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n  }\n  .field-body .field {\n    margin-bottom: 0;\n  }\n  .field-body > .field {\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n  }\n  .field-body > .field:not(.is-narrow) {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n  }\n  .field-body > .field:not(:last-child) {\n    margin-right: 0.75rem;\n  }\n}\n\n.control {\n  font-size: 1rem;\n  position: relative;\n  text-align: left;\n}\n\n.control.has-icon .icon {\n  color: #dbdbdb;\n  height: 2.25em;\n  pointer-events: none;\n  position: absolute;\n  top: 0;\n  width: 2.25em;\n  z-index: 4;\n}\n\n.control.has-icon .input:focus + .icon, .control.has-icon .taginput .taginput-container.is-focusable:focus + .icon, .taginput .control.has-icon .taginput-container.is-focusable:focus + .icon {\n  color: #7a7a7a;\n}\n\n.control.has-icon .input.is-small + .icon, .control.has-icon .taginput .is-small.taginput-container.is-focusable + .icon, .taginput .control.has-icon .is-small.taginput-container.is-focusable + .icon {\n  font-size: 0.75rem;\n}\n\n.control.has-icon .input.is-medium + .icon, .control.has-icon .taginput .is-medium.taginput-container.is-focusable + .icon, .taginput .control.has-icon .is-medium.taginput-container.is-focusable + .icon {\n  font-size: 1.25rem;\n}\n\n.control.has-icon .input.is-large + .icon, .control.has-icon .taginput .is-large.taginput-container.is-focusable + .icon, .taginput .control.has-icon .is-large.taginput-container.is-focusable + .icon {\n  font-size: 1.5rem;\n}\n\n.control.has-icon:not(.has-icon-right) .icon {\n  left: 0;\n}\n\n.control.has-icon:not(.has-icon-right) .input, .control.has-icon:not(.has-icon-right) .taginput .taginput-container.is-focusable, .taginput .control.has-icon:not(.has-icon-right) .taginput-container.is-focusable {\n  padding-left: 2.25em;\n}\n\n.control.has-icon.has-icon-right .icon {\n  right: 0;\n}\n\n.control.has-icon.has-icon-right .input, .control.has-icon.has-icon-right .taginput .taginput-container.is-focusable, .taginput .control.has-icon.has-icon-right .taginput-container.is-focusable {\n  padding-right: 2.25em;\n}\n\n.control.has-icons-left .input:focus ~ .icon, .control.has-icons-left .taginput .taginput-container.is-focusable:focus ~ .icon, .taginput .control.has-icons-left .taginput-container.is-focusable:focus ~ .icon,\n.control.has-icons-left .select:focus ~ .icon, .control.has-icons-right .input:focus ~ .icon, .control.has-icons-right .taginput .taginput-container.is-focusable:focus ~ .icon, .taginput .control.has-icons-right .taginput-container.is-focusable:focus ~ .icon,\n.control.has-icons-right .select:focus ~ .icon {\n  color: #7a7a7a;\n}\n\n.control.has-icons-left .input.is-small ~ .icon, .control.has-icons-left .taginput .is-small.taginput-container.is-focusable ~ .icon, .taginput .control.has-icons-left .is-small.taginput-container.is-focusable ~ .icon,\n.control.has-icons-left .select.is-small ~ .icon, .control.has-icons-right .input.is-small ~ .icon, .control.has-icons-right .taginput .is-small.taginput-container.is-focusable ~ .icon, .taginput .control.has-icons-right .is-small.taginput-container.is-focusable ~ .icon,\n.control.has-icons-right .select.is-small ~ .icon {\n  font-size: 0.75rem;\n}\n\n.control.has-icons-left .input.is-medium ~ .icon, .control.has-icons-left .taginput .is-medium.taginput-container.is-focusable ~ .icon, .taginput .control.has-icons-left .is-medium.taginput-container.is-focusable ~ .icon,\n.control.has-icons-left .select.is-medium ~ .icon, .control.has-icons-right .input.is-medium ~ .icon, .control.has-icons-right .taginput .is-medium.taginput-container.is-focusable ~ .icon, .taginput .control.has-icons-right .is-medium.taginput-container.is-focusable ~ .icon,\n.control.has-icons-right .select.is-medium ~ .icon {\n  font-size: 1.25rem;\n}\n\n.control.has-icons-left .input.is-large ~ .icon, .control.has-icons-left .taginput .is-large.taginput-container.is-focusable ~ .icon, .taginput .control.has-icons-left .is-large.taginput-container.is-focusable ~ .icon,\n.control.has-icons-left .select.is-large ~ .icon, .control.has-icons-right .input.is-large ~ .icon, .control.has-icons-right .taginput .is-large.taginput-container.is-focusable ~ .icon, .taginput .control.has-icons-right .is-large.taginput-container.is-focusable ~ .icon,\n.control.has-icons-right .select.is-large ~ .icon {\n  font-size: 1.5rem;\n}\n\n.control.has-icons-left .icon, .control.has-icons-right .icon {\n  color: #dbdbdb;\n  height: 2.25em;\n  pointer-events: none;\n  position: absolute;\n  top: 0;\n  width: 2.25em;\n  z-index: 4;\n}\n\n.control.has-icons-left .input, .control.has-icons-left .taginput .taginput-container.is-focusable, .taginput .control.has-icons-left .taginput-container.is-focusable,\n.control.has-icons-left .select select {\n  padding-left: 2.25em;\n}\n\n.control.has-icons-left .icon.is-left {\n  left: 0;\n}\n\n.control.has-icons-right .input, .control.has-icons-right .taginput .taginput-container.is-focusable, .taginput .control.has-icons-right .taginput-container.is-focusable,\n.control.has-icons-right .select select {\n  padding-right: 2.25em;\n}\n\n.control.has-icons-right .icon.is-right {\n  right: 0;\n}\n\n.control.is-loading::after {\n  -webkit-animation: spinAround 500ms infinite linear;\n          animation: spinAround 500ms infinite linear;\n  border: 2px solid #dbdbdb;\n  border-radius: 290486px;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  content: \"\";\n  display: block;\n  height: 1em;\n  position: relative;\n  width: 1em;\n  position: absolute !important;\n  right: 0.625em;\n  top: 0.625em;\n  z-index: 4;\n}\n\n.control.is-loading.is-small:after {\n  font-size: 0.75rem;\n}\n\n.control.is-loading.is-medium:after {\n  font-size: 1.25rem;\n}\n\n.control.is-loading.is-large:after {\n  font-size: 1.5rem;\n}\n\n.icon {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  height: 1.5rem;\n  width: 1.5rem;\n}\n\n.icon.is-small {\n  height: 1rem;\n  width: 1rem;\n}\n\n.icon.is-medium {\n  height: 2rem;\n  width: 2rem;\n}\n\n.icon.is-large {\n  height: 3rem;\n  width: 3rem;\n}\n\n.image {\n  display: block;\n  position: relative;\n}\n\n.image img {\n  display: block;\n  height: auto;\n  width: 100%;\n}\n\n.image img.is-rounded {\n  border-radius: 290486px;\n}\n\n.image.is-square img, .image.is-1by1 img, .image.is-4by3 img, .image.is-3by2 img, .image.is-16by9 img, .image.is-2by1 img {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  height: 100%;\n  width: 100%;\n}\n\n.image.is-square, .image.is-1by1 {\n  padding-top: 100%;\n}\n\n.image.is-4by3 {\n  padding-top: 75%;\n}\n\n.image.is-3by2 {\n  padding-top: 66.6666%;\n}\n\n.image.is-16by9 {\n  padding-top: 56.25%;\n}\n\n.image.is-2by1 {\n  padding-top: 50%;\n}\n\n.image.is-16x16 {\n  height: 16px;\n  width: 16px;\n}\n\n.image.is-24x24 {\n  height: 24px;\n  width: 24px;\n}\n\n.image.is-32x32 {\n  height: 32px;\n  width: 32px;\n}\n\n.image.is-48x48 {\n  height: 48px;\n  width: 48px;\n}\n\n.image.is-64x64 {\n  height: 64px;\n  width: 64px;\n}\n\n.image.is-96x96 {\n  height: 96px;\n  width: 96px;\n}\n\n.image.is-128x128 {\n  height: 128px;\n  width: 128px;\n}\n\n.notification {\n  background-color: whitesmoke;\n  border-radius: 3px;\n  padding: 1.25rem 2.5rem 1.25rem 1.5rem;\n  position: relative;\n}\n\n.notification:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.notification a:not(.button) {\n  color: currentColor;\n  text-decoration: underline;\n}\n\n.notification strong {\n  color: currentColor;\n}\n\n.notification code,\n.notification pre {\n  background: white;\n}\n\n.notification pre code {\n  background: transparent;\n}\n\n.notification > .delete {\n  position: absolute;\n  right: 0.5rem;\n  top: 0.5rem;\n}\n\n.notification .title,\n.notification .subtitle,\n.notification .content {\n  color: currentColor;\n}\n\n.notification.is-white {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.notification.is-black {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.notification.is-light {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.notification.is-dark {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.notification.is-primary {\n  background-color: #7957d5;\n  color: white;\n}\n\n.notification.is-link {\n  background-color: #7957d5;\n  color: white;\n}\n\n.notification.is-info {\n  background-color: #167df0;\n  color: #fff;\n}\n\n.notification.is-success {\n  background-color: #23d160;\n  color: #fff;\n}\n\n.notification.is-warning {\n  background-color: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.notification.is-danger {\n  background-color: #ff3860;\n  color: #fff;\n}\n\n.progress {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  border: none;\n  border-radius: 290486px;\n  display: block;\n  height: 1rem;\n  overflow: hidden;\n  padding: 0;\n  width: 100%;\n}\n\n.progress:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.progress::-webkit-progress-bar {\n  background-color: #dbdbdb;\n}\n\n.progress::-webkit-progress-value {\n  background-color: #4a4a4a;\n}\n\n.progress::-moz-progress-bar {\n  background-color: #4a4a4a;\n}\n\n.progress::-ms-fill {\n  background-color: #4a4a4a;\n  border: none;\n}\n\n.progress.is-white::-webkit-progress-value {\n  background-color: white;\n}\n\n.progress.is-white::-moz-progress-bar {\n  background-color: white;\n}\n\n.progress.is-white::-ms-fill {\n  background-color: white;\n}\n\n.progress.is-black::-webkit-progress-value {\n  background-color: #0a0a0a;\n}\n\n.progress.is-black::-moz-progress-bar {\n  background-color: #0a0a0a;\n}\n\n.progress.is-black::-ms-fill {\n  background-color: #0a0a0a;\n}\n\n.progress.is-light::-webkit-progress-value {\n  background-color: whitesmoke;\n}\n\n.progress.is-light::-moz-progress-bar {\n  background-color: whitesmoke;\n}\n\n.progress.is-light::-ms-fill {\n  background-color: whitesmoke;\n}\n\n.progress.is-dark::-webkit-progress-value {\n  background-color: #363636;\n}\n\n.progress.is-dark::-moz-progress-bar {\n  background-color: #363636;\n}\n\n.progress.is-dark::-ms-fill {\n  background-color: #363636;\n}\n\n.progress.is-primary::-webkit-progress-value {\n  background-color: #7957d5;\n}\n\n.progress.is-primary::-moz-progress-bar {\n  background-color: #7957d5;\n}\n\n.progress.is-primary::-ms-fill {\n  background-color: #7957d5;\n}\n\n.progress.is-link::-webkit-progress-value {\n  background-color: #7957d5;\n}\n\n.progress.is-link::-moz-progress-bar {\n  background-color: #7957d5;\n}\n\n.progress.is-link::-ms-fill {\n  background-color: #7957d5;\n}\n\n.progress.is-info::-webkit-progress-value {\n  background-color: #167df0;\n}\n\n.progress.is-info::-moz-progress-bar {\n  background-color: #167df0;\n}\n\n.progress.is-info::-ms-fill {\n  background-color: #167df0;\n}\n\n.progress.is-success::-webkit-progress-value {\n  background-color: #23d160;\n}\n\n.progress.is-success::-moz-progress-bar {\n  background-color: #23d160;\n}\n\n.progress.is-success::-ms-fill {\n  background-color: #23d160;\n}\n\n.progress.is-warning::-webkit-progress-value {\n  background-color: #ffdd57;\n}\n\n.progress.is-warning::-moz-progress-bar {\n  background-color: #ffdd57;\n}\n\n.progress.is-warning::-ms-fill {\n  background-color: #ffdd57;\n}\n\n.progress.is-danger::-webkit-progress-value {\n  background-color: #ff3860;\n}\n\n.progress.is-danger::-moz-progress-bar {\n  background-color: #ff3860;\n}\n\n.progress.is-danger::-ms-fill {\n  background-color: #ff3860;\n}\n\n.progress.is-small {\n  height: 0.75rem;\n}\n\n.progress.is-medium {\n  height: 1.25rem;\n}\n\n.progress.is-large {\n  height: 1.5rem;\n}\n\n.table {\n  background-color: white;\n  color: #363636;\n  margin-bottom: 1.5rem;\n}\n\n.table td,\n.table th {\n  border: 1px solid #dbdbdb;\n  border-width: 0 0 1px;\n  padding: 0.5em 0.75em;\n  vertical-align: top;\n}\n\n.table td.is-white,\n.table th.is-white {\n  background-color: white;\n  border-color: white;\n  color: #0a0a0a;\n}\n\n.table td.is-black,\n.table th.is-black {\n  background-color: #0a0a0a;\n  border-color: #0a0a0a;\n  color: white;\n}\n\n.table td.is-light,\n.table th.is-light {\n  background-color: whitesmoke;\n  border-color: whitesmoke;\n  color: #363636;\n}\n\n.table td.is-dark,\n.table th.is-dark {\n  background-color: #363636;\n  border-color: #363636;\n  color: whitesmoke;\n}\n\n.table td.is-primary,\n.table th.is-primary {\n  background-color: #7957d5;\n  border-color: #7957d5;\n  color: white;\n}\n\n.table td.is-link,\n.table th.is-link {\n  background-color: #7957d5;\n  border-color: #7957d5;\n  color: white;\n}\n\n.table td.is-info,\n.table th.is-info {\n  background-color: #167df0;\n  border-color: #167df0;\n  color: #fff;\n}\n\n.table td.is-success,\n.table th.is-success {\n  background-color: #23d160;\n  border-color: #23d160;\n  color: #fff;\n}\n\n.table td.is-warning,\n.table th.is-warning {\n  background-color: #ffdd57;\n  border-color: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.table td.is-danger,\n.table th.is-danger {\n  background-color: #ff3860;\n  border-color: #ff3860;\n  color: #fff;\n}\n\n.table td.is-narrow,\n.table th.is-narrow {\n  white-space: nowrap;\n  width: 1%;\n}\n\n.table td.is-selected,\n.table th.is-selected {\n  background-color: #7957d5;\n  color: white;\n}\n\n.table td.is-selected a,\n.table td.is-selected strong,\n.table th.is-selected a,\n.table th.is-selected strong {\n  color: currentColor;\n}\n\n.table th {\n  color: #363636;\n  text-align: left;\n}\n\n.table tr.is-selected {\n  background-color: #7957d5;\n  color: white;\n}\n\n.table tr.is-selected a,\n.table tr.is-selected strong {\n  color: currentColor;\n}\n\n.table tr.is-selected td,\n.table tr.is-selected th {\n  border-color: white;\n  color: currentColor;\n}\n\n.table thead td,\n.table thead th {\n  border-width: 0 0 2px;\n  color: #363636;\n}\n\n.table tfoot td,\n.table tfoot th {\n  border-width: 2px 0 0;\n  color: #363636;\n}\n\n.table tbody tr:last-child td,\n.table tbody tr:last-child th {\n  border-bottom-width: 0;\n}\n\n.table.is-bordered td,\n.table.is-bordered th {\n  border-width: 1px;\n}\n\n.table.is-bordered tr:last-child td,\n.table.is-bordered tr:last-child th {\n  border-bottom-width: 1px;\n}\n\n.table.is-fullwidth {\n  width: 100%;\n}\n\n.table.is-hoverable tbody tr:not(.is-selected):hover {\n  background-color: #fafafa;\n}\n\n.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover {\n  background-color: whitesmoke;\n}\n\n.table.is-narrow td,\n.table.is-narrow th {\n  padding: 0.25em 0.5em;\n}\n\n.table.is-striped tbody tr:not(.is-selected):nth-child(even) {\n  background-color: #fafafa;\n}\n\n.tags {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.tags .tag {\n  margin-bottom: 0.5rem;\n}\n\n.tags .tag:not(:last-child) {\n  margin-right: 0.5rem;\n}\n\n.tags:last-child {\n  margin-bottom: -0.5rem;\n}\n\n.tags:not(:last-child) {\n  margin-bottom: 1rem;\n}\n\n.tags.has-addons .tag {\n  margin-right: 0;\n}\n\n.tags.has-addons .tag:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.tags.has-addons .tag:not(:last-child) {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.tags.is-centered {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.tags.is-centered .tag {\n  margin-right: 0.25rem;\n  margin-left: 0.25rem;\n}\n\n.tags.is-right {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.tags.is-right .tag:not(:first-child) {\n  margin-left: 0.5rem;\n}\n\n.tags.is-right .tag:not(:last-child) {\n  margin-right: 0;\n}\n\n.tag:not(body) {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: whitesmoke;\n  border-radius: 3px;\n  color: #4a4a4a;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 0.75rem;\n  height: 2em;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  line-height: 1.5;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  white-space: nowrap;\n}\n\n.tag:not(body) .delete {\n  margin-left: 0.25em;\n  margin-right: -0.375em;\n}\n\n.tag:not(body).is-white {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.tag:not(body).is-black {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.tag:not(body).is-light {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.tag:not(body).is-dark {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.tag:not(body).is-primary {\n  background-color: #7957d5;\n  color: white;\n}\n\n.tag:not(body).is-link {\n  background-color: #7957d5;\n  color: white;\n}\n\n.tag:not(body).is-info {\n  background-color: #167df0;\n  color: #fff;\n}\n\n.tag:not(body).is-success {\n  background-color: #23d160;\n  color: #fff;\n}\n\n.tag:not(body).is-warning {\n  background-color: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.tag:not(body).is-danger {\n  background-color: #ff3860;\n  color: #fff;\n}\n\n.tag:not(body).is-medium {\n  font-size: 1rem;\n}\n\n.tag:not(body).is-large {\n  font-size: 1.25rem;\n}\n\n.tag:not(body) .icon:first-child:not(:last-child) {\n  margin-left: -0.375em;\n  margin-right: 0.1875em;\n}\n\n.tag:not(body) .icon:last-child:not(:first-child) {\n  margin-left: 0.1875em;\n  margin-right: -0.375em;\n}\n\n.tag:not(body) .icon:first-child:last-child {\n  margin-left: -0.375em;\n  margin-right: -0.375em;\n}\n\n.tag:not(body).is-delete {\n  margin-left: 1px;\n  padding: 0;\n  position: relative;\n  width: 2em;\n}\n\n.tag:not(body).is-delete:before, .tag:not(body).is-delete:after {\n  background-color: currentColor;\n  content: \"\";\n  display: block;\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%) rotate(45deg);\n          transform: translateX(-50%) translateY(-50%) rotate(45deg);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.tag:not(body).is-delete:before {\n  height: 1px;\n  width: 50%;\n}\n\n.tag:not(body).is-delete:after {\n  height: 50%;\n  width: 1px;\n}\n\n.tag:not(body).is-delete:hover, .tag:not(body).is-delete:focus {\n  background-color: #e8e8e8;\n}\n\n.tag:not(body).is-delete:active {\n  background-color: #dbdbdb;\n}\n\n.tag:not(body).is-rounded {\n  border-radius: 290486px;\n}\n\na.tag:hover {\n  text-decoration: underline;\n}\n\n.title,\n.subtitle {\n  word-break: break-word;\n}\n\n.title:not(:last-child),\n.subtitle:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.title em,\n.title span,\n.subtitle em,\n.subtitle span {\n  font-weight: inherit;\n}\n\n.title sub,\n.subtitle sub {\n  font-size: 0.75em;\n}\n\n.title sup,\n.subtitle sup {\n  font-size: 0.75em;\n}\n\n.title .tag,\n.subtitle .tag {\n  vertical-align: middle;\n}\n\n.title {\n  color: #363636;\n  font-size: 2rem;\n  font-weight: 600;\n  line-height: 1.125;\n}\n\n.title strong {\n  color: inherit;\n  font-weight: inherit;\n}\n\n.title + .highlight {\n  margin-top: -0.75rem;\n}\n\n.title:not(.is-spaced) + .subtitle {\n  margin-top: -1.5rem;\n}\n\n.title.is-1 {\n  font-size: 3rem;\n}\n\n.title.is-2 {\n  font-size: 2.5rem;\n}\n\n.title.is-3 {\n  font-size: 2rem;\n}\n\n.title.is-4 {\n  font-size: 1.5rem;\n}\n\n.title.is-5 {\n  font-size: 1.25rem;\n}\n\n.title.is-6 {\n  font-size: 1rem;\n}\n\n.title.is-7 {\n  font-size: 0.75rem;\n}\n\n.subtitle {\n  color: #4a4a4a;\n  font-size: 1.25rem;\n  font-weight: 400;\n  line-height: 1.25;\n}\n\n.subtitle strong {\n  color: #363636;\n  font-weight: 600;\n}\n\n.subtitle:not(.is-spaced) + .title {\n  margin-top: -1.5rem;\n}\n\n.subtitle.is-1 {\n  font-size: 3rem;\n}\n\n.subtitle.is-2 {\n  font-size: 2.5rem;\n}\n\n.subtitle.is-3 {\n  font-size: 2rem;\n}\n\n.subtitle.is-4 {\n  font-size: 1.5rem;\n}\n\n.subtitle.is-5 {\n  font-size: 1.25rem;\n}\n\n.subtitle.is-6 {\n  font-size: 1rem;\n}\n\n.subtitle.is-7 {\n  font-size: 0.75rem;\n}\n\n.block:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.delete {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  background-color: rgba(10, 10, 10, 0.2);\n  border: none;\n  border-radius: 290486px;\n  cursor: pointer;\n  display: inline-block;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  font-size: 0;\n  height: 20px;\n  max-height: 20px;\n  max-width: 20px;\n  min-height: 20px;\n  min-width: 20px;\n  outline: none;\n  position: relative;\n  vertical-align: top;\n  width: 20px;\n}\n\n.delete:before, .delete:after {\n  background-color: white;\n  content: \"\";\n  display: block;\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%) rotate(45deg);\n          transform: translateX(-50%) translateY(-50%) rotate(45deg);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.delete:before {\n  height: 2px;\n  width: 50%;\n}\n\n.delete:after {\n  height: 50%;\n  width: 2px;\n}\n\n.delete:hover, .delete:focus {\n  background-color: rgba(10, 10, 10, 0.3);\n}\n\n.delete:active {\n  background-color: rgba(10, 10, 10, 0.4);\n}\n\n.delete.is-small {\n  height: 16px;\n  max-height: 16px;\n  max-width: 16px;\n  min-height: 16px;\n  min-width: 16px;\n  width: 16px;\n}\n\n.delete.is-medium {\n  height: 24px;\n  max-height: 24px;\n  max-width: 24px;\n  min-height: 24px;\n  min-width: 24px;\n  width: 24px;\n}\n\n.delete.is-large {\n  height: 32px;\n  max-height: 32px;\n  max-width: 32px;\n  min-height: 32px;\n  min-width: 32px;\n  width: 32px;\n}\n\n.heading {\n  display: block;\n  font-size: 11px;\n  letter-spacing: 1px;\n  margin-bottom: 5px;\n  text-transform: uppercase;\n}\n\n.highlight {\n  font-weight: 400;\n  max-width: 100%;\n  overflow: hidden;\n  padding: 0;\n}\n\n.highlight:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.highlight pre {\n  overflow: auto;\n  max-width: 100%;\n}\n\n.loader {\n  -webkit-animation: spinAround 500ms infinite linear;\n          animation: spinAround 500ms infinite linear;\n  border: 2px solid #dbdbdb;\n  border-radius: 290486px;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  content: \"\";\n  display: block;\n  height: 1em;\n  position: relative;\n  width: 1em;\n}\n\n.number {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: whitesmoke;\n  border-radius: 290486px;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1.25rem;\n  height: 2em;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-right: 1.5rem;\n  min-width: 2.5em;\n  padding: 0.25rem 0.5rem;\n  text-align: center;\n  vertical-align: top;\n}\n\n.breadcrumb {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  font-size: 1rem;\n  overflow: hidden;\n  overflow-x: auto;\n  white-space: nowrap;\n}\n\n.breadcrumb:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.breadcrumb a {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #7957d5;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 0.5em 0.75em;\n}\n\n.breadcrumb a:hover {\n  color: #363636;\n}\n\n.breadcrumb li {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.breadcrumb li:first-child a {\n  padding-left: 0;\n}\n\n.breadcrumb li.is-active a {\n  color: #363636;\n  cursor: default;\n  pointer-events: none;\n}\n\n.breadcrumb li + li::before {\n  color: #4a4a4a;\n  content: \"/\";\n}\n\n.breadcrumb ul, .breadcrumb ol {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.breadcrumb .icon:first-child {\n  margin-right: 0.5em;\n}\n\n.breadcrumb .icon:last-child {\n  margin-left: 0.5em;\n}\n\n.breadcrumb.is-centered ol, .breadcrumb.is-centered ul {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.breadcrumb.is-right ol, .breadcrumb.is-right ul {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.breadcrumb.is-small {\n  font-size: 0.75rem;\n}\n\n.breadcrumb.is-medium {\n  font-size: 1.25rem;\n}\n\n.breadcrumb.is-large {\n  font-size: 1.5rem;\n}\n\n.breadcrumb.has-arrow-separator li + li::before {\n  content: \"\\2192\";\n}\n\n.breadcrumb.has-bullet-separator li + li::before {\n  content: \"\\2022\";\n}\n\n.breadcrumb.has-dot-separator li + li::before {\n  content: \"\\B7\";\n}\n\n.breadcrumb.has-succeeds-separator li + li::before {\n  content: \"\\227B\";\n}\n\n.card {\n  background-color: white;\n  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n          box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n  color: #4a4a4a;\n  max-width: 100%;\n  position: relative;\n}\n\n.card-header {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  -webkit-box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);\n          box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.card-header-title {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #363636;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  font-weight: 700;\n  padding: 0.75rem;\n}\n\n.card-header-title.is-centered {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.card-header-icon {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 0.75rem;\n}\n\n.card-image {\n  display: block;\n  position: relative;\n}\n\n.card-content {\n  padding: 1.5rem;\n}\n\n.card-footer {\n  border-top: 1px solid #dbdbdb;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.card-footer-item {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 0.75rem;\n}\n\n.card-footer-item:not(:last-child) {\n  border-right: 1px solid #dbdbdb;\n}\n\n.card .media:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n\n.dropdown {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  position: relative;\n  vertical-align: top;\n}\n\n.dropdown.is-active .dropdown-menu, .dropdown.is-hoverable:hover .dropdown-menu {\n  display: block;\n}\n\n.dropdown.is-right .dropdown-menu {\n  left: auto;\n  right: 0;\n}\n\n.dropdown.is-up .dropdown-menu {\n  bottom: 100%;\n  padding-bottom: 4px;\n  padding-top: unset;\n  top: auto;\n}\n\n.dropdown-menu {\n  display: none;\n  left: 0;\n  min-width: 12rem;\n  padding-top: 4px;\n  position: absolute;\n  top: 100%;\n  z-index: 20;\n}\n\n.dropdown-content {\n  background-color: white;\n  border-radius: 3px;\n  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n          box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n  padding-bottom: 0.5rem;\n  padding-top: 0.5rem;\n}\n\n.dropdown-item, .dropdown .dropdown-menu .has-link a {\n  color: #4a4a4a;\n  display: block;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  padding: 0.375rem 1rem;\n  position: relative;\n}\n\na.dropdown-item, .dropdown .dropdown-menu .has-link a {\n  padding-right: 3rem;\n  white-space: nowrap;\n}\n\na.dropdown-item:hover, .dropdown .dropdown-menu .has-link a:hover {\n  background-color: whitesmoke;\n  color: #0a0a0a;\n}\n\na.dropdown-item.is-active, .dropdown .dropdown-menu .has-link a.is-active {\n  background-color: #7957d5;\n  color: white;\n}\n\n.dropdown-divider {\n  background-color: #dbdbdb;\n  border: none;\n  display: block;\n  height: 1px;\n  margin: 0.5rem 0;\n}\n\n.level {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n\n.level:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.level code {\n  border-radius: 3px;\n}\n\n.level img {\n  display: inline-block;\n  vertical-align: top;\n}\n\n.level.is-mobile {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.level.is-mobile .level-left,\n.level.is-mobile .level-right {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.level.is-mobile .level-left + .level-right {\n  margin-top: 0;\n}\n\n.level.is-mobile .level-item {\n  margin-right: 0.75rem;\n}\n\n.level.is-mobile .level-item:not(:last-child) {\n  margin-bottom: 0;\n}\n\n.level.is-mobile .level-item:not(.is-narrow) {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n\n@media screen and (min-width: 769px), print {\n  .level {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n  .level > .level-item:not(.is-narrow) {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n  }\n}\n\n.level-item {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-preferred-size: auto;\n      flex-basis: auto;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.level-item .title,\n.level-item .subtitle {\n  margin-bottom: 0;\n}\n\n@media screen and (max-width: 768px) {\n  .level-item:not(:last-child) {\n    margin-bottom: 0.75rem;\n  }\n}\n\n.level-left,\n.level-right {\n  -ms-flex-preferred-size: auto;\n      flex-basis: auto;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.level-left .level-item.is-flexible,\n.level-right .level-item.is-flexible {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n\n@media screen and (min-width: 769px), print {\n  .level-left .level-item:not(:last-child),\n  .level-right .level-item:not(:last-child) {\n    margin-right: 0.75rem;\n  }\n}\n\n.level-left {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n@media screen and (max-width: 768px) {\n  .level-left + .level-right {\n    margin-top: 1.5rem;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .level-left {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\n\n.level-right {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n@media screen and (min-width: 769px), print {\n  .level-right {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\n\n.media {\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  text-align: left;\n}\n\n.media .content:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n\n.media .media {\n  border-top: 1px solid rgba(219, 219, 219, 0.5);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding-top: 0.75rem;\n}\n\n.media .media .content:not(:last-child),\n.media .media .control:not(:last-child) {\n  margin-bottom: 0.5rem;\n}\n\n.media .media .media {\n  padding-top: 0.5rem;\n}\n\n.media .media .media + .media {\n  margin-top: 0.5rem;\n}\n\n.media + .media {\n  border-top: 1px solid rgba(219, 219, 219, 0.5);\n  margin-top: 1rem;\n  padding-top: 1rem;\n}\n\n.media.is-large + .media {\n  margin-top: 1.5rem;\n  padding-top: 1.5rem;\n}\n\n.media-left,\n.media-right {\n  -ms-flex-preferred-size: auto;\n      flex-basis: auto;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.media-left {\n  margin-right: 1rem;\n}\n\n.media-right {\n  margin-left: 1rem;\n}\n\n.media-content {\n  -ms-flex-preferred-size: auto;\n      flex-basis: auto;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n  overflow: auto;\n  text-align: left;\n}\n\n.menu {\n  font-size: 1rem;\n}\n\n.menu.is-small {\n  font-size: 0.75rem;\n}\n\n.menu.is-medium {\n  font-size: 1.25rem;\n}\n\n.menu.is-large {\n  font-size: 1.5rem;\n}\n\n.menu-list {\n  line-height: 1.25;\n}\n\n.menu-list a {\n  border-radius: 2px;\n  color: #4a4a4a;\n  display: block;\n  padding: 0.5em 0.75em;\n}\n\n.menu-list a:hover {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.menu-list a.is-active {\n  background-color: #7957d5;\n  color: white;\n}\n\n.menu-list li ul {\n  border-left: 1px solid #dbdbdb;\n  margin: 0.75em;\n  padding-left: 0.75em;\n}\n\n.menu-label {\n  color: #7a7a7a;\n  font-size: 0.75em;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n\n.menu-label:not(:first-child) {\n  margin-top: 1em;\n}\n\n.menu-label:not(:last-child) {\n  margin-bottom: 1em;\n}\n\n.message {\n  background-color: whitesmoke;\n  border-radius: 3px;\n  font-size: 1rem;\n}\n\n.message:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.message strong {\n  color: currentColor;\n}\n\n.message a:not(.button):not(.tag) {\n  color: currentColor;\n  text-decoration: underline;\n}\n\n.message.is-small {\n  font-size: 0.75rem;\n}\n\n.message.is-medium {\n  font-size: 1.25rem;\n}\n\n.message.is-large {\n  font-size: 1.5rem;\n}\n\n.message.is-white {\n  background-color: white;\n}\n\n.message.is-white .message-header {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.message.is-white .message-body {\n  border-color: white;\n  color: #4d4d4d;\n}\n\n.message.is-black {\n  background-color: #fafafa;\n}\n\n.message.is-black .message-header {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.message.is-black .message-body {\n  border-color: #0a0a0a;\n  color: #090909;\n}\n\n.message.is-light {\n  background-color: #fafafa;\n}\n\n.message.is-light .message-header {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.message.is-light .message-body {\n  border-color: whitesmoke;\n  color: #505050;\n}\n\n.message.is-dark {\n  background-color: #fafafa;\n}\n\n.message.is-dark .message-header {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.message.is-dark .message-body {\n  border-color: #363636;\n  color: #2a2a2a;\n}\n\n.message.is-primary {\n  background-color: #f8f7fd;\n}\n\n.message.is-primary .message-header {\n  background-color: #7957d5;\n  color: white;\n}\n\n.message.is-primary .message-body {\n  border-color: #7957d5;\n  color: #5534ae;\n}\n\n.message.is-link {\n  background-color: #f8f7fd;\n}\n\n.message.is-link .message-header {\n  background-color: #7957d5;\n  color: white;\n}\n\n.message.is-link .message-body {\n  border-color: #7957d5;\n  color: #5534ae;\n}\n\n.message.is-info {\n  background-color: #f5fafe;\n}\n\n.message.is-info .message-header {\n  background-color: #167df0;\n  color: #fff;\n}\n\n.message.is-info .message-body {\n  border-color: #167df0;\n  color: #115199;\n}\n\n.message.is-success {\n  background-color: #f6fef9;\n}\n\n.message.is-success .message-header {\n  background-color: #23d160;\n  color: #fff;\n}\n\n.message.is-success .message-body {\n  border-color: #23d160;\n  color: #0e301a;\n}\n\n.message.is-warning {\n  background-color: #fffdf5;\n}\n\n.message.is-warning .message-header {\n  background-color: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.message.is-warning .message-body {\n  border-color: #ffdd57;\n  color: #3b3108;\n}\n\n.message.is-danger {\n  background-color: #fff5f7;\n}\n\n.message.is-danger .message-header {\n  background-color: #ff3860;\n  color: #fff;\n}\n\n.message.is-danger .message-body {\n  border-color: #ff3860;\n  color: #cd0930;\n}\n\n.message-header {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: #4a4a4a;\n  border-radius: 3px 3px 0 0;\n  color: #fff;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  line-height: 1.25;\n  padding: 0.5em 0.75em;\n  position: relative;\n}\n\n.message-header .delete {\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  margin-left: 0.75em;\n}\n\n.message-header + .message-body {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  border-top: none;\n}\n\n.message-body {\n  border: 1px solid #dbdbdb;\n  border-radius: 3px;\n  color: #4a4a4a;\n  padding: 1em 1.25em;\n}\n\n.message-body code,\n.message-body pre {\n  background-color: white;\n}\n\n.message-body pre code {\n  background-color: transparent;\n}\n\n.modal {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: none;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  overflow: hidden;\n  position: fixed;\n  z-index: 40;\n}\n\n.modal.is-active {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.modal-background {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  background-color: rgba(10, 10, 10, 0.86);\n}\n\n.modal-content,\n.modal-card {\n  margin: 0 20px;\n  max-height: calc(100vh - 160px);\n  overflow: auto;\n  position: relative;\n  width: 100%;\n}\n\n@media screen and (min-width: 769px), print {\n  .modal-content,\n  .modal-card {\n    margin: 0 auto;\n    max-height: calc(100vh - 40px);\n    width: 640px;\n  }\n}\n\n.modal-close {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  background-color: rgba(10, 10, 10, 0.2);\n  border: none;\n  border-radius: 290486px;\n  cursor: pointer;\n  display: inline-block;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  font-size: 0;\n  height: 20px;\n  max-height: 20px;\n  max-width: 20px;\n  min-height: 20px;\n  min-width: 20px;\n  outline: none;\n  position: relative;\n  vertical-align: top;\n  width: 20px;\n  background: none;\n  height: 40px;\n  position: fixed;\n  right: 20px;\n  top: 20px;\n  width: 40px;\n}\n\n.modal-close:before, .modal-close:after {\n  background-color: white;\n  content: \"\";\n  display: block;\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%) rotate(45deg);\n          transform: translateX(-50%) translateY(-50%) rotate(45deg);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.modal-close:before {\n  height: 2px;\n  width: 50%;\n}\n\n.modal-close:after {\n  height: 50%;\n  width: 2px;\n}\n\n.modal-close:hover, .modal-close:focus {\n  background-color: rgba(10, 10, 10, 0.3);\n}\n\n.modal-close:active {\n  background-color: rgba(10, 10, 10, 0.4);\n}\n\n.modal-close.is-small {\n  height: 16px;\n  max-height: 16px;\n  max-width: 16px;\n  min-height: 16px;\n  min-width: 16px;\n  width: 16px;\n}\n\n.modal-close.is-medium {\n  height: 24px;\n  max-height: 24px;\n  max-width: 24px;\n  min-height: 24px;\n  min-width: 24px;\n  width: 24px;\n}\n\n.modal-close.is-large {\n  height: 32px;\n  max-height: 32px;\n  max-width: 32px;\n  min-height: 32px;\n  min-width: 32px;\n  width: 32px;\n}\n\n.modal-card {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  max-height: calc(100vh - 40px);\n  overflow: hidden;\n}\n\n.modal-card-head,\n.modal-card-foot {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: whitesmoke;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  padding: 20px;\n  position: relative;\n}\n\n.modal-card-head {\n  border-bottom: 1px solid #dbdbdb;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n}\n\n.modal-card-title {\n  color: #363636;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  font-size: 1.5rem;\n  line-height: 1;\n}\n\n.modal-card-foot {\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  border-top: 1px solid #dbdbdb;\n}\n\n.modal-card-foot .button:not(:last-child) {\n  margin-right: 10px;\n}\n\n.modal-card-body {\n  -webkit-overflow-scrolling: touch;\n  background-color: white;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n  overflow: auto;\n  padding: 20px;\n}\n\n.navbar {\n  background-color: white;\n  min-height: 3.25rem;\n  position: relative;\n}\n\n.navbar.is-white {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.navbar.is-white .navbar-brand > .navbar-item,\n.navbar.is-white .navbar-brand .navbar-link {\n  color: #0a0a0a;\n}\n\n.navbar.is-white .navbar-brand > a.navbar-item:hover, .navbar.is-white .navbar-brand > a.navbar-item.is-active,\n.navbar.is-white .navbar-brand .navbar-link:hover,\n.navbar.is-white .navbar-brand .navbar-link.is-active {\n  background-color: #f2f2f2;\n  color: #0a0a0a;\n}\n\n.navbar.is-white .navbar-brand .navbar-link::after {\n  border-color: #0a0a0a;\n}\n\n@media screen and (min-width: 1024px) {\n  .navbar.is-white .navbar-start > .navbar-item,\n  .navbar.is-white .navbar-start .navbar-link,\n  .navbar.is-white .navbar-end > .navbar-item,\n  .navbar.is-white .navbar-end .navbar-link {\n    color: #0a0a0a;\n  }\n  .navbar.is-white .navbar-start > a.navbar-item:hover, .navbar.is-white .navbar-start > a.navbar-item.is-active,\n  .navbar.is-white .navbar-start .navbar-link:hover,\n  .navbar.is-white .navbar-start .navbar-link.is-active,\n  .navbar.is-white .navbar-end > a.navbar-item:hover,\n  .navbar.is-white .navbar-end > a.navbar-item.is-active,\n  .navbar.is-white .navbar-end .navbar-link:hover,\n  .navbar.is-white .navbar-end .navbar-link.is-active {\n    background-color: #f2f2f2;\n    color: #0a0a0a;\n  }\n  .navbar.is-white .navbar-start .navbar-link::after,\n  .navbar.is-white .navbar-end .navbar-link::after {\n    border-color: #0a0a0a;\n  }\n  .navbar.is-white .navbar-item.has-dropdown:hover .navbar-link,\n  .navbar.is-white .navbar-item.has-dropdown.is-active .navbar-link {\n    background-color: #f2f2f2;\n    color: #0a0a0a;\n  }\n  .navbar.is-white .navbar-dropdown a.navbar-item.is-active {\n    background-color: white;\n    color: #0a0a0a;\n  }\n}\n\n.navbar.is-black {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.navbar.is-black .navbar-brand > .navbar-item,\n.navbar.is-black .navbar-brand .navbar-link {\n  color: white;\n}\n\n.navbar.is-black .navbar-brand > a.navbar-item:hover, .navbar.is-black .navbar-brand > a.navbar-item.is-active,\n.navbar.is-black .navbar-brand .navbar-link:hover,\n.navbar.is-black .navbar-brand .navbar-link.is-active {\n  background-color: black;\n  color: white;\n}\n\n.navbar.is-black .navbar-brand .navbar-link::after {\n  border-color: white;\n}\n\n@media screen and (min-width: 1024px) {\n  .navbar.is-black .navbar-start > .navbar-item,\n  .navbar.is-black .navbar-start .navbar-link,\n  .navbar.is-black .navbar-end > .navbar-item,\n  .navbar.is-black .navbar-end .navbar-link {\n    color: white;\n  }\n  .navbar.is-black .navbar-start > a.navbar-item:hover, .navbar.is-black .navbar-start > a.navbar-item.is-active,\n  .navbar.is-black .navbar-start .navbar-link:hover,\n  .navbar.is-black .navbar-start .navbar-link.is-active,\n  .navbar.is-black .navbar-end > a.navbar-item:hover,\n  .navbar.is-black .navbar-end > a.navbar-item.is-active,\n  .navbar.is-black .navbar-end .navbar-link:hover,\n  .navbar.is-black .navbar-end .navbar-link.is-active {\n    background-color: black;\n    color: white;\n  }\n  .navbar.is-black .navbar-start .navbar-link::after,\n  .navbar.is-black .navbar-end .navbar-link::after {\n    border-color: white;\n  }\n  .navbar.is-black .navbar-item.has-dropdown:hover .navbar-link,\n  .navbar.is-black .navbar-item.has-dropdown.is-active .navbar-link {\n    background-color: black;\n    color: white;\n  }\n  .navbar.is-black .navbar-dropdown a.navbar-item.is-active {\n    background-color: #0a0a0a;\n    color: white;\n  }\n}\n\n.navbar.is-light {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.navbar.is-light .navbar-brand > .navbar-item,\n.navbar.is-light .navbar-brand .navbar-link {\n  color: #363636;\n}\n\n.navbar.is-light .navbar-brand > a.navbar-item:hover, .navbar.is-light .navbar-brand > a.navbar-item.is-active,\n.navbar.is-light .navbar-brand .navbar-link:hover,\n.navbar.is-light .navbar-brand .navbar-link.is-active {\n  background-color: #e8e8e8;\n  color: #363636;\n}\n\n.navbar.is-light .navbar-brand .navbar-link::after {\n  border-color: #363636;\n}\n\n@media screen and (min-width: 1024px) {\n  .navbar.is-light .navbar-start > .navbar-item,\n  .navbar.is-light .navbar-start .navbar-link,\n  .navbar.is-light .navbar-end > .navbar-item,\n  .navbar.is-light .navbar-end .navbar-link {\n    color: #363636;\n  }\n  .navbar.is-light .navbar-start > a.navbar-item:hover, .navbar.is-light .navbar-start > a.navbar-item.is-active,\n  .navbar.is-light .navbar-start .navbar-link:hover,\n  .navbar.is-light .navbar-start .navbar-link.is-active,\n  .navbar.is-light .navbar-end > a.navbar-item:hover,\n  .navbar.is-light .navbar-end > a.navbar-item.is-active,\n  .navbar.is-light .navbar-end .navbar-link:hover,\n  .navbar.is-light .navbar-end .navbar-link.is-active {\n    background-color: #e8e8e8;\n    color: #363636;\n  }\n  .navbar.is-light .navbar-start .navbar-link::after,\n  .navbar.is-light .navbar-end .navbar-link::after {\n    border-color: #363636;\n  }\n  .navbar.is-light .navbar-item.has-dropdown:hover .navbar-link,\n  .navbar.is-light .navbar-item.has-dropdown.is-active .navbar-link {\n    background-color: #e8e8e8;\n    color: #363636;\n  }\n  .navbar.is-light .navbar-dropdown a.navbar-item.is-active {\n    background-color: whitesmoke;\n    color: #363636;\n  }\n}\n\n.navbar.is-dark {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.navbar.is-dark .navbar-brand > .navbar-item,\n.navbar.is-dark .navbar-brand .navbar-link {\n  color: whitesmoke;\n}\n\n.navbar.is-dark .navbar-brand > a.navbar-item:hover, .navbar.is-dark .navbar-brand > a.navbar-item.is-active,\n.navbar.is-dark .navbar-brand .navbar-link:hover,\n.navbar.is-dark .navbar-brand .navbar-link.is-active {\n  background-color: #292929;\n  color: whitesmoke;\n}\n\n.navbar.is-dark .navbar-brand .navbar-link::after {\n  border-color: whitesmoke;\n}\n\n@media screen and (min-width: 1024px) {\n  .navbar.is-dark .navbar-start > .navbar-item,\n  .navbar.is-dark .navbar-start .navbar-link,\n  .navbar.is-dark .navbar-end > .navbar-item,\n  .navbar.is-dark .navbar-end .navbar-link {\n    color: whitesmoke;\n  }\n  .navbar.is-dark .navbar-start > a.navbar-item:hover, .navbar.is-dark .navbar-start > a.navbar-item.is-active,\n  .navbar.is-dark .navbar-start .navbar-link:hover,\n  .navbar.is-dark .navbar-start .navbar-link.is-active,\n  .navbar.is-dark .navbar-end > a.navbar-item:hover,\n  .navbar.is-dark .navbar-end > a.navbar-item.is-active,\n  .navbar.is-dark .navbar-end .navbar-link:hover,\n  .navbar.is-dark .navbar-end .navbar-link.is-active {\n    background-color: #292929;\n    color: whitesmoke;\n  }\n  .navbar.is-dark .navbar-start .navbar-link::after,\n  .navbar.is-dark .navbar-end .navbar-link::after {\n    border-color: whitesmoke;\n  }\n  .navbar.is-dark .navbar-item.has-dropdown:hover .navbar-link,\n  .navbar.is-dark .navbar-item.has-dropdown.is-active .navbar-link {\n    background-color: #292929;\n    color: whitesmoke;\n  }\n  .navbar.is-dark .navbar-dropdown a.navbar-item.is-active {\n    background-color: #363636;\n    color: whitesmoke;\n  }\n}\n\n.navbar.is-primary {\n  background-color: #7957d5;\n  color: white;\n}\n\n.navbar.is-primary .navbar-brand > .navbar-item,\n.navbar.is-primary .navbar-brand .navbar-link {\n  color: white;\n}\n\n.navbar.is-primary .navbar-brand > a.navbar-item:hover, .navbar.is-primary .navbar-brand > a.navbar-item.is-active,\n.navbar.is-primary .navbar-brand .navbar-link:hover,\n.navbar.is-primary .navbar-brand .navbar-link.is-active {\n  background-color: #6943d0;\n  color: white;\n}\n\n.navbar.is-primary .navbar-brand .navbar-link::after {\n  border-color: white;\n}\n\n@media screen and (min-width: 1024px) {\n  .navbar.is-primary .navbar-start > .navbar-item,\n  .navbar.is-primary .navbar-start .navbar-link,\n  .navbar.is-primary .navbar-end > .navbar-item,\n  .navbar.is-primary .navbar-end .navbar-link {\n    color: white;\n  }\n  .navbar.is-primary .navbar-start > a.navbar-item:hover, .navbar.is-primary .navbar-start > a.navbar-item.is-active,\n  .navbar.is-primary .navbar-start .navbar-link:hover,\n  .navbar.is-primary .navbar-start .navbar-link.is-active,\n  .navbar.is-primary .navbar-end > a.navbar-item:hover,\n  .navbar.is-primary .navbar-end > a.navbar-item.is-active,\n  .navbar.is-primary .navbar-end .navbar-link:hover,\n  .navbar.is-primary .navbar-end .navbar-link.is-active {\n    background-color: #6943d0;\n    color: white;\n  }\n  .navbar.is-primary .navbar-start .navbar-link::after,\n  .navbar.is-primary .navbar-end .navbar-link::after {\n    border-color: white;\n  }\n  .navbar.is-primary .navbar-item.has-dropdown:hover .navbar-link,\n  .navbar.is-primary .navbar-item.has-dropdown.is-active .navbar-link {\n    background-color: #6943d0;\n    color: white;\n  }\n  .navbar.is-primary .navbar-dropdown a.navbar-item.is-active {\n    background-color: #7957d5;\n    color: white;\n  }\n}\n\n.navbar.is-link {\n  background-color: #7957d5;\n  color: white;\n}\n\n.navbar.is-link .navbar-brand > .navbar-item,\n.navbar.is-link .navbar-brand .navbar-link {\n  color: white;\n}\n\n.navbar.is-link .navbar-brand > a.navbar-item:hover, .navbar.is-link .navbar-brand > a.navbar-item.is-active,\n.navbar.is-link .navbar-brand .navbar-link:hover,\n.navbar.is-link .navbar-brand .navbar-link.is-active {\n  background-color: #6943d0;\n  color: white;\n}\n\n.navbar.is-link .navbar-brand .navbar-link::after {\n  border-color: white;\n}\n\n@media screen and (min-width: 1024px) {\n  .navbar.is-link .navbar-start > .navbar-item,\n  .navbar.is-link .navbar-start .navbar-link,\n  .navbar.is-link .navbar-end > .navbar-item,\n  .navbar.is-link .navbar-end .navbar-link {\n    color: white;\n  }\n  .navbar.is-link .navbar-start > a.navbar-item:hover, .navbar.is-link .navbar-start > a.navbar-item.is-active,\n  .navbar.is-link .navbar-start .navbar-link:hover,\n  .navbar.is-link .navbar-start .navbar-link.is-active,\n  .navbar.is-link .navbar-end > a.navbar-item:hover,\n  .navbar.is-link .navbar-end > a.navbar-item.is-active,\n  .navbar.is-link .navbar-end .navbar-link:hover,\n  .navbar.is-link .navbar-end .navbar-link.is-active {\n    background-color: #6943d0;\n    color: white;\n  }\n  .navbar.is-link .navbar-start .navbar-link::after,\n  .navbar.is-link .navbar-end .navbar-link::after {\n    border-color: white;\n  }\n  .navbar.is-link .navbar-item.has-dropdown:hover .navbar-link,\n  .navbar.is-link .navbar-item.has-dropdown.is-active .navbar-link {\n    background-color: #6943d0;\n    color: white;\n  }\n  .navbar.is-link .navbar-dropdown a.navbar-item.is-active {\n    background-color: #7957d5;\n    color: white;\n  }\n}\n\n.navbar.is-info {\n  background-color: #167df0;\n  color: #fff;\n}\n\n.navbar.is-info .navbar-brand > .navbar-item,\n.navbar.is-info .navbar-brand .navbar-link {\n  color: #fff;\n}\n\n.navbar.is-info .navbar-brand > a.navbar-item:hover, .navbar.is-info .navbar-brand > a.navbar-item.is-active,\n.navbar.is-info .navbar-brand .navbar-link:hover,\n.navbar.is-info .navbar-brand .navbar-link.is-active {\n  background-color: #0e71de;\n  color: #fff;\n}\n\n.navbar.is-info .navbar-brand .navbar-link::after {\n  border-color: #fff;\n}\n\n@media screen and (min-width: 1024px) {\n  .navbar.is-info .navbar-start > .navbar-item,\n  .navbar.is-info .navbar-start .navbar-link,\n  .navbar.is-info .navbar-end > .navbar-item,\n  .navbar.is-info .navbar-end .navbar-link {\n    color: #fff;\n  }\n  .navbar.is-info .navbar-start > a.navbar-item:hover, .navbar.is-info .navbar-start > a.navbar-item.is-active,\n  .navbar.is-info .navbar-start .navbar-link:hover,\n  .navbar.is-info .navbar-start .navbar-link.is-active,\n  .navbar.is-info .navbar-end > a.navbar-item:hover,\n  .navbar.is-info .navbar-end > a.navbar-item.is-active,\n  .navbar.is-info .navbar-end .navbar-link:hover,\n  .navbar.is-info .navbar-end .navbar-link.is-active {\n    background-color: #0e71de;\n    color: #fff;\n  }\n  .navbar.is-info .navbar-start .navbar-link::after,\n  .navbar.is-info .navbar-end .navbar-link::after {\n    border-color: #fff;\n  }\n  .navbar.is-info .navbar-item.has-dropdown:hover .navbar-link,\n  .navbar.is-info .navbar-item.has-dropdown.is-active .navbar-link {\n    background-color: #0e71de;\n    color: #fff;\n  }\n  .navbar.is-info .navbar-dropdown a.navbar-item.is-active {\n    background-color: #167df0;\n    color: #fff;\n  }\n}\n\n.navbar.is-success {\n  background-color: #23d160;\n  color: #fff;\n}\n\n.navbar.is-success .navbar-brand > .navbar-item,\n.navbar.is-success .navbar-brand .navbar-link {\n  color: #fff;\n}\n\n.navbar.is-success .navbar-brand > a.navbar-item:hover, .navbar.is-success .navbar-brand > a.navbar-item.is-active,\n.navbar.is-success .navbar-brand .navbar-link:hover,\n.navbar.is-success .navbar-brand .navbar-link.is-active {\n  background-color: #20bc56;\n  color: #fff;\n}\n\n.navbar.is-success .navbar-brand .navbar-link::after {\n  border-color: #fff;\n}\n\n@media screen and (min-width: 1024px) {\n  .navbar.is-success .navbar-start > .navbar-item,\n  .navbar.is-success .navbar-start .navbar-link,\n  .navbar.is-success .navbar-end > .navbar-item,\n  .navbar.is-success .navbar-end .navbar-link {\n    color: #fff;\n  }\n  .navbar.is-success .navbar-start > a.navbar-item:hover, .navbar.is-success .navbar-start > a.navbar-item.is-active,\n  .navbar.is-success .navbar-start .navbar-link:hover,\n  .navbar.is-success .navbar-start .navbar-link.is-active,\n  .navbar.is-success .navbar-end > a.navbar-item:hover,\n  .navbar.is-success .navbar-end > a.navbar-item.is-active,\n  .navbar.is-success .navbar-end .navbar-link:hover,\n  .navbar.is-success .navbar-end .navbar-link.is-active {\n    background-color: #20bc56;\n    color: #fff;\n  }\n  .navbar.is-success .navbar-start .navbar-link::after,\n  .navbar.is-success .navbar-end .navbar-link::after {\n    border-color: #fff;\n  }\n  .navbar.is-success .navbar-item.has-dropdown:hover .navbar-link,\n  .navbar.is-success .navbar-item.has-dropdown.is-active .navbar-link {\n    background-color: #20bc56;\n    color: #fff;\n  }\n  .navbar.is-success .navbar-dropdown a.navbar-item.is-active {\n    background-color: #23d160;\n    color: #fff;\n  }\n}\n\n.navbar.is-warning {\n  background-color: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.navbar.is-warning .navbar-brand > .navbar-item,\n.navbar.is-warning .navbar-brand .navbar-link {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.navbar.is-warning .navbar-brand > a.navbar-item:hover, .navbar.is-warning .navbar-brand > a.navbar-item.is-active,\n.navbar.is-warning .navbar-brand .navbar-link:hover,\n.navbar.is-warning .navbar-brand .navbar-link.is-active {\n  background-color: #ffd83d;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.navbar.is-warning .navbar-brand .navbar-link::after {\n  border-color: rgba(0, 0, 0, 0.7);\n}\n\n@media screen and (min-width: 1024px) {\n  .navbar.is-warning .navbar-start > .navbar-item,\n  .navbar.is-warning .navbar-start .navbar-link,\n  .navbar.is-warning .navbar-end > .navbar-item,\n  .navbar.is-warning .navbar-end .navbar-link {\n    color: rgba(0, 0, 0, 0.7);\n  }\n  .navbar.is-warning .navbar-start > a.navbar-item:hover, .navbar.is-warning .navbar-start > a.navbar-item.is-active,\n  .navbar.is-warning .navbar-start .navbar-link:hover,\n  .navbar.is-warning .navbar-start .navbar-link.is-active,\n  .navbar.is-warning .navbar-end > a.navbar-item:hover,\n  .navbar.is-warning .navbar-end > a.navbar-item.is-active,\n  .navbar.is-warning .navbar-end .navbar-link:hover,\n  .navbar.is-warning .navbar-end .navbar-link.is-active {\n    background-color: #ffd83d;\n    color: rgba(0, 0, 0, 0.7);\n  }\n  .navbar.is-warning .navbar-start .navbar-link::after,\n  .navbar.is-warning .navbar-end .navbar-link::after {\n    border-color: rgba(0, 0, 0, 0.7);\n  }\n  .navbar.is-warning .navbar-item.has-dropdown:hover .navbar-link,\n  .navbar.is-warning .navbar-item.has-dropdown.is-active .navbar-link {\n    background-color: #ffd83d;\n    color: rgba(0, 0, 0, 0.7);\n  }\n  .navbar.is-warning .navbar-dropdown a.navbar-item.is-active {\n    background-color: #ffdd57;\n    color: rgba(0, 0, 0, 0.7);\n  }\n}\n\n.navbar.is-danger {\n  background-color: #ff3860;\n  color: #fff;\n}\n\n.navbar.is-danger .navbar-brand > .navbar-item,\n.navbar.is-danger .navbar-brand .navbar-link {\n  color: #fff;\n}\n\n.navbar.is-danger .navbar-brand > a.navbar-item:hover, .navbar.is-danger .navbar-brand > a.navbar-item.is-active,\n.navbar.is-danger .navbar-brand .navbar-link:hover,\n.navbar.is-danger .navbar-brand .navbar-link.is-active {\n  background-color: #ff1f4b;\n  color: #fff;\n}\n\n.navbar.is-danger .navbar-brand .navbar-link::after {\n  border-color: #fff;\n}\n\n@media screen and (min-width: 1024px) {\n  .navbar.is-danger .navbar-start > .navbar-item,\n  .navbar.is-danger .navbar-start .navbar-link,\n  .navbar.is-danger .navbar-end > .navbar-item,\n  .navbar.is-danger .navbar-end .navbar-link {\n    color: #fff;\n  }\n  .navbar.is-danger .navbar-start > a.navbar-item:hover, .navbar.is-danger .navbar-start > a.navbar-item.is-active,\n  .navbar.is-danger .navbar-start .navbar-link:hover,\n  .navbar.is-danger .navbar-start .navbar-link.is-active,\n  .navbar.is-danger .navbar-end > a.navbar-item:hover,\n  .navbar.is-danger .navbar-end > a.navbar-item.is-active,\n  .navbar.is-danger .navbar-end .navbar-link:hover,\n  .navbar.is-danger .navbar-end .navbar-link.is-active {\n    background-color: #ff1f4b;\n    color: #fff;\n  }\n  .navbar.is-danger .navbar-start .navbar-link::after,\n  .navbar.is-danger .navbar-end .navbar-link::after {\n    border-color: #fff;\n  }\n  .navbar.is-danger .navbar-item.has-dropdown:hover .navbar-link,\n  .navbar.is-danger .navbar-item.has-dropdown.is-active .navbar-link {\n    background-color: #ff1f4b;\n    color: #fff;\n  }\n  .navbar.is-danger .navbar-dropdown a.navbar-item.is-active {\n    background-color: #ff3860;\n    color: #fff;\n  }\n}\n\n.navbar > .container {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  min-height: 3.25rem;\n  width: 100%;\n}\n\n.navbar.has-shadow {\n  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);\n          box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);\n}\n\n.navbar.is-fixed-bottom, .navbar.is-fixed-top {\n  left: 0;\n  position: fixed;\n  right: 0;\n  z-index: 30;\n}\n\n.navbar.is-fixed-bottom {\n  bottom: 0;\n}\n\n.navbar.is-fixed-bottom.has-shadow {\n  -webkit-box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1);\n          box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1);\n}\n\n.navbar.is-fixed-top {\n  top: 0;\n}\n\nhtml.has-navbar-fixed-top {\n  padding-top: 3.25rem;\n}\n\nhtml.has-navbar-fixed-bottom {\n  padding-bottom: 3.25rem;\n}\n\n.navbar-brand,\n.navbar-tabs {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  min-height: 3.25rem;\n}\n\n.navbar-tabs {\n  -webkit-overflow-scrolling: touch;\n  max-width: 100vw;\n  overflow-x: auto;\n  overflow-y: hidden;\n}\n\n.navbar-burger {\n  cursor: pointer;\n  display: block;\n  height: 3.25rem;\n  position: relative;\n  width: 3.25rem;\n  margin-left: auto;\n}\n\n.navbar-burger span {\n  background-color: currentColor;\n  display: block;\n  height: 1px;\n  left: calc(50% - 8px);\n  position: absolute;\n  -webkit-transform-origin: center;\n          transform-origin: center;\n  -webkit-transition-duration: 86ms;\n          transition-duration: 86ms;\n  -webkit-transition-property: background-color, opacity, -webkit-transform;\n  transition-property: background-color, opacity, -webkit-transform;\n  transition-property: background-color, opacity, transform;\n  transition-property: background-color, opacity, transform, -webkit-transform;\n  -webkit-transition-timing-function: ease-out;\n          transition-timing-function: ease-out;\n  width: 16px;\n}\n\n.navbar-burger span:nth-child(1) {\n  top: calc(50% - 6px);\n}\n\n.navbar-burger span:nth-child(2) {\n  top: calc(50% - 1px);\n}\n\n.navbar-burger span:nth-child(3) {\n  top: calc(50% + 4px);\n}\n\n.navbar-burger:hover {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n\n.navbar-burger.is-active span:nth-child(1) {\n  -webkit-transform: translateY(5px) rotate(45deg);\n          transform: translateY(5px) rotate(45deg);\n}\n\n.navbar-burger.is-active span:nth-child(2) {\n  opacity: 0;\n}\n\n.navbar-burger.is-active span:nth-child(3) {\n  -webkit-transform: translateY(-5px) rotate(-45deg);\n          transform: translateY(-5px) rotate(-45deg);\n}\n\n.navbar-menu {\n  display: none;\n}\n\n.navbar-item,\n.navbar-link {\n  color: #4a4a4a;\n  display: block;\n  line-height: 1.5;\n  padding: 0.5rem 1rem;\n  position: relative;\n}\n\na.navbar-item:hover, a.navbar-item.is-active,\na.navbar-link:hover,\na.navbar-link.is-active {\n  background-color: whitesmoke;\n  color: #7957d5;\n}\n\n.navbar-item {\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.navbar-item img {\n  max-height: 1.75rem;\n}\n\n.navbar-item.has-dropdown {\n  padding: 0;\n}\n\n.navbar-item.is-expanded {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n}\n\n.navbar-item.is-tab {\n  border-bottom: 1px solid transparent;\n  min-height: 3.25rem;\n  padding-bottom: calc(0.5rem - 1px);\n}\n\n.navbar-item.is-tab:hover {\n  background-color: transparent;\n  border-bottom-color: #7957d5;\n}\n\n.navbar-item.is-tab.is-active {\n  background-color: transparent;\n  border-bottom-color: #7957d5;\n  border-bottom-style: solid;\n  border-bottom-width: 3px;\n  color: #7957d5;\n  padding-bottom: calc(0.5rem - 3px);\n}\n\n.navbar-content {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n}\n\n.navbar-link {\n  padding-right: 2.5em;\n}\n\n.navbar-dropdown {\n  font-size: 0.875rem;\n  padding-bottom: 0.5rem;\n  padding-top: 0.5rem;\n}\n\n.navbar-dropdown .navbar-item {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n\n.navbar-divider {\n  background-color: #dbdbdb;\n  border: none;\n  display: none;\n  height: 1px;\n  margin: 0.5rem 0;\n}\n\n@media screen and (max-width: 1023px) {\n  .navbar > .container {\n    display: block;\n  }\n  .navbar-brand .navbar-item,\n  .navbar-tabs .navbar-item {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n  .navbar-menu {\n    background-color: white;\n    -webkit-box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);\n            box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);\n    padding: 0.5rem 0;\n  }\n  .navbar-menu.is-active {\n    display: block;\n  }\n  .navbar.is-fixed-bottom-touch, .navbar.is-fixed-top-touch {\n    left: 0;\n    position: fixed;\n    right: 0;\n    z-index: 30;\n  }\n  .navbar.is-fixed-bottom-touch {\n    bottom: 0;\n  }\n  .navbar.is-fixed-bottom-touch.has-shadow {\n    -webkit-box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1);\n            box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1);\n  }\n  .navbar.is-fixed-top-touch {\n    top: 0;\n  }\n  .navbar.is-fixed-top .navbar-menu, .navbar.is-fixed-top-touch .navbar-menu {\n    -webkit-overflow-scrolling: touch;\n    max-height: calc(100vh - 3.25rem);\n    overflow: auto;\n  }\n  html.has-navbar-fixed-top-touch {\n    padding-top: 3.25rem;\n  }\n  html.has-navbar-fixed-bottom-touch {\n    padding-bottom: 3.25rem;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .navbar,\n  .navbar-menu,\n  .navbar-start,\n  .navbar-end {\n    -webkit-box-align: stretch;\n        -ms-flex-align: stretch;\n            align-items: stretch;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n  .navbar {\n    min-height: 3.25rem;\n  }\n  .navbar.is-transparent a.navbar-item:hover, .navbar.is-transparent a.navbar-item.is-active,\n  .navbar.is-transparent a.navbar-link:hover,\n  .navbar.is-transparent a.navbar-link.is-active {\n    background-color: transparent !important;\n  }\n  .navbar.is-transparent .navbar-item.has-dropdown.is-active .navbar-link, .navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:hover .navbar-link {\n    background-color: transparent !important;\n  }\n  .navbar.is-transparent .navbar-dropdown a.navbar-item:hover {\n    background-color: whitesmoke;\n    color: #0a0a0a;\n  }\n  .navbar.is-transparent .navbar-dropdown a.navbar-item.is-active {\n    background-color: whitesmoke;\n    color: #7957d5;\n  }\n  .navbar-burger {\n    display: none;\n  }\n  .navbar-item,\n  .navbar-link {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n  .navbar-item.has-dropdown {\n    -webkit-box-align: stretch;\n        -ms-flex-align: stretch;\n            align-items: stretch;\n  }\n  .navbar-item.has-dropdown-up .navbar-link::after {\n    -webkit-transform: rotate(135deg) translate(0.25em, -0.25em);\n            transform: rotate(135deg) translate(0.25em, -0.25em);\n  }\n  .navbar-item.has-dropdown-up .navbar-dropdown {\n    border-bottom: 1px solid #dbdbdb;\n    border-radius: 5px 5px 0 0;\n    border-top: none;\n    bottom: 100%;\n    -webkit-box-shadow: 0 -8px 8px rgba(10, 10, 10, 0.1);\n            box-shadow: 0 -8px 8px rgba(10, 10, 10, 0.1);\n    top: auto;\n  }\n  .navbar-item.is-active .navbar-dropdown, .navbar-item.is-hoverable:hover .navbar-dropdown {\n    display: block;\n  }\n  .navbar-item.is-active .navbar-dropdown.is-boxed, .navbar-item.is-hoverable:hover .navbar-dropdown.is-boxed {\n    opacity: 1;\n    pointer-events: auto;\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n  }\n  .navbar-link::after {\n    border: 1px solid #7957d5;\n    border-right: 0;\n    border-top: 0;\n    content: \" \";\n    display: block;\n    height: 0.5em;\n    pointer-events: none;\n    position: absolute;\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg);\n    -webkit-transform-origin: center;\n            transform-origin: center;\n    width: 0.5em;\n    margin-top: -0.375em;\n    right: 1.125em;\n    top: 50%;\n  }\n  .navbar-menu {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n  }\n  .navbar-start {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    margin-right: auto;\n  }\n  .navbar-end {\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    margin-left: auto;\n  }\n  .navbar-dropdown {\n    background-color: white;\n    border-bottom-left-radius: 5px;\n    border-bottom-right-radius: 5px;\n    border-top: 1px solid #dbdbdb;\n    -webkit-box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1);\n            box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1);\n    display: none;\n    font-size: 0.875rem;\n    left: 0;\n    min-width: 100%;\n    position: absolute;\n    top: 100%;\n    z-index: 20;\n  }\n  .navbar-dropdown .navbar-item {\n    padding: 0.375rem 1rem;\n    white-space: nowrap;\n  }\n  .navbar-dropdown a.navbar-item {\n    padding-right: 3rem;\n  }\n  .navbar-dropdown a.navbar-item:hover {\n    background-color: whitesmoke;\n    color: #0a0a0a;\n  }\n  .navbar-dropdown a.navbar-item.is-active {\n    background-color: whitesmoke;\n    color: #7957d5;\n  }\n  .navbar-dropdown.is-boxed {\n    border-radius: 5px;\n    border-top: none;\n    -webkit-box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n            box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n    display: block;\n    opacity: 0;\n    pointer-events: none;\n    top: calc(100% + (-4px));\n    -webkit-transform: translateY(-5px);\n            transform: translateY(-5px);\n    -webkit-transition-duration: 86ms;\n            transition-duration: 86ms;\n    -webkit-transition-property: opacity, -webkit-transform;\n    transition-property: opacity, -webkit-transform;\n    transition-property: opacity, transform;\n    transition-property: opacity, transform, -webkit-transform;\n  }\n  .navbar-dropdown.is-right {\n    left: auto;\n    right: 0;\n  }\n  .navbar-divider {\n    display: block;\n  }\n  .navbar > .container .navbar-brand,\n  .container > .navbar .navbar-brand {\n    margin-left: -1rem;\n  }\n  .navbar > .container .navbar-menu,\n  .container > .navbar .navbar-menu {\n    margin-right: -1rem;\n  }\n  .navbar.is-fixed-bottom-desktop, .navbar.is-fixed-top-desktop {\n    left: 0;\n    position: fixed;\n    right: 0;\n    z-index: 30;\n  }\n  .navbar.is-fixed-bottom-desktop {\n    bottom: 0;\n  }\n  .navbar.is-fixed-bottom-desktop.has-shadow {\n    -webkit-box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1);\n            box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1);\n  }\n  .navbar.is-fixed-top-desktop {\n    top: 0;\n  }\n  html.has-navbar-fixed-top-desktop {\n    padding-top: 3.25rem;\n  }\n  html.has-navbar-fixed-bottom-desktop {\n    padding-bottom: 3.25rem;\n  }\n  a.navbar-item.is-active,\n  a.navbar-link.is-active {\n    color: #0a0a0a;\n  }\n  a.navbar-item.is-active:not(:hover),\n  a.navbar-link.is-active:not(:hover) {\n    background-color: transparent;\n  }\n  .navbar-item.has-dropdown:hover .navbar-link, .navbar-item.has-dropdown.is-active .navbar-link {\n    background-color: whitesmoke;\n  }\n}\n\n.pagination {\n  font-size: 1rem;\n  margin: -0.25rem;\n}\n\n.pagination.is-small {\n  font-size: 0.75rem;\n}\n\n.pagination.is-medium {\n  font-size: 1.25rem;\n}\n\n.pagination.is-large {\n  font-size: 1.5rem;\n}\n\n.pagination.is-rounded .pagination-previous,\n.pagination.is-rounded .pagination-next {\n  padding-left: 1em;\n  padding-right: 1em;\n  border-radius: 290486px;\n}\n\n.pagination.is-rounded .pagination-link {\n  border-radius: 290486px;\n}\n\n.pagination,\n.pagination-list {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  text-align: center;\n}\n\n.pagination-previous,\n.pagination-next,\n.pagination-link,\n.pagination-ellipsis {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border: 1px solid transparent;\n  border-radius: 3px;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1rem;\n  height: 2.25em;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  line-height: 1.5;\n  padding-bottom: calc(0.375em - 1px);\n  padding-left: calc(0.625em - 1px);\n  padding-right: calc(0.625em - 1px);\n  padding-top: calc(0.375em - 1px);\n  position: relative;\n  vertical-align: top;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  font-size: 1em;\n  padding-left: 0.5em;\n  padding-right: 0.5em;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin: 0.25rem;\n  text-align: center;\n}\n\n.pagination-previous:focus, .pagination-previous.is-focused, .pagination-previous:active, .pagination-previous.is-active,\n.pagination-next:focus,\n.pagination-next.is-focused,\n.pagination-next:active,\n.pagination-next.is-active,\n.pagination-link:focus,\n.pagination-link.is-focused,\n.pagination-link:active,\n.pagination-link.is-active,\n.pagination-ellipsis:focus,\n.pagination-ellipsis.is-focused,\n.pagination-ellipsis:active,\n.pagination-ellipsis.is-active {\n  outline: none;\n}\n\n.pagination-previous[disabled],\n.pagination-next[disabled],\n.pagination-link[disabled],\n.pagination-ellipsis[disabled] {\n  cursor: not-allowed;\n}\n\n.pagination-previous,\n.pagination-next,\n.pagination-link {\n  border-color: #dbdbdb;\n  color: #363636;\n  min-width: 2.25em;\n}\n\n.pagination-previous:hover,\n.pagination-next:hover,\n.pagination-link:hover {\n  border-color: #b5b5b5;\n  color: #363636;\n}\n\n.pagination-previous:focus,\n.pagination-next:focus,\n.pagination-link:focus {\n  border-color: #7957d5;\n}\n\n.pagination-previous:active,\n.pagination-next:active,\n.pagination-link:active {\n  -webkit-box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n          box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n}\n\n.pagination-previous[disabled],\n.pagination-next[disabled],\n.pagination-link[disabled] {\n  background-color: #dbdbdb;\n  border-color: #dbdbdb;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #7a7a7a;\n  opacity: 0.5;\n}\n\n.pagination-previous,\n.pagination-next {\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  white-space: nowrap;\n}\n\n.pagination-link.is-current {\n  background-color: #7957d5;\n  border-color: #7957d5;\n  color: white;\n}\n\n.pagination-ellipsis {\n  color: #b5b5b5;\n  pointer-events: none;\n}\n\n.pagination-list {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n\n@media screen and (max-width: 768px) {\n  .pagination {\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n  }\n  .pagination-previous,\n  .pagination-next {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n  }\n  .pagination-list li {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .pagination-list {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1;\n  }\n  .pagination-previous {\n    -webkit-box-ordinal-group: 3;\n        -ms-flex-order: 2;\n            order: 2;\n  }\n  .pagination-next {\n    -webkit-box-ordinal-group: 4;\n        -ms-flex-order: 3;\n            order: 3;\n  }\n  .pagination {\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n  }\n  .pagination.is-centered .pagination-previous {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1;\n  }\n  .pagination.is-centered .pagination-list {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-ordinal-group: 3;\n        -ms-flex-order: 2;\n            order: 2;\n  }\n  .pagination.is-centered .pagination-next {\n    -webkit-box-ordinal-group: 4;\n        -ms-flex-order: 3;\n            order: 3;\n  }\n  .pagination.is-right .pagination-previous {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1;\n  }\n  .pagination.is-right .pagination-next {\n    -webkit-box-ordinal-group: 3;\n        -ms-flex-order: 2;\n            order: 2;\n  }\n  .pagination.is-right .pagination-list {\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    -webkit-box-ordinal-group: 4;\n        -ms-flex-order: 3;\n            order: 3;\n  }\n}\n\n.panel {\n  font-size: 1rem;\n}\n\n.panel:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.panel-heading,\n.panel-tabs,\n.panel-block {\n  border-bottom: 1px solid #dbdbdb;\n  border-left: 1px solid #dbdbdb;\n  border-right: 1px solid #dbdbdb;\n}\n\n.panel-heading:first-child,\n.panel-tabs:first-child,\n.panel-block:first-child {\n  border-top: 1px solid #dbdbdb;\n}\n\n.panel-heading {\n  background-color: whitesmoke;\n  border-radius: 3px 3px 0 0;\n  color: #363636;\n  font-size: 1.25em;\n  font-weight: 300;\n  line-height: 1.25;\n  padding: 0.5em 0.75em;\n}\n\n.panel-tabs {\n  -webkit-box-align: end;\n      -ms-flex-align: end;\n          align-items: flex-end;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  font-size: 0.875em;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.panel-tabs a {\n  border-bottom: 1px solid #dbdbdb;\n  margin-bottom: -1px;\n  padding: 0.5em;\n}\n\n.panel-tabs a.is-active {\n  border-bottom-color: #4a4a4a;\n  color: #363636;\n}\n\n.panel-list a {\n  color: #4a4a4a;\n}\n\n.panel-list a:hover {\n  color: #7957d5;\n}\n\n.panel-block {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #363636;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  padding: 0.5em 0.75em;\n}\n\n.panel-block input[type=\"checkbox\"] {\n  margin-right: 0.75em;\n}\n\n.panel-block > .control {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n  width: 100%;\n}\n\n.panel-block.is-wrapped {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n\n.panel-block.is-active {\n  border-left-color: #7957d5;\n  color: #363636;\n}\n\n.panel-block.is-active .panel-icon {\n  color: #7957d5;\n}\n\na.panel-block,\nlabel.panel-block {\n  cursor: pointer;\n}\n\na.panel-block:hover,\nlabel.panel-block:hover {\n  background-color: whitesmoke;\n}\n\n.panel-icon {\n  display: inline-block;\n  font-size: 14px;\n  height: 1em;\n  line-height: 1em;\n  text-align: center;\n  vertical-align: top;\n  width: 1em;\n  color: #7a7a7a;\n  margin-right: 0.75em;\n}\n\n.panel-icon .fa {\n  font-size: inherit;\n  line-height: inherit;\n}\n\n.tabs {\n  -webkit-overflow-scrolling: touch;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  font-size: 1rem;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  overflow: hidden;\n  overflow-x: auto;\n  white-space: nowrap;\n}\n\n.tabs:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.tabs a {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom-color: #dbdbdb;\n  border-bottom-style: solid;\n  border-bottom-width: 1px;\n  color: #4a4a4a;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-bottom: -1px;\n  padding: 0.5em 1em;\n  vertical-align: top;\n}\n\n.tabs a:hover {\n  border-bottom-color: #363636;\n  color: #363636;\n}\n\n.tabs li {\n  display: block;\n}\n\n.tabs li.is-active a {\n  border-bottom-color: #7957d5;\n  color: #7957d5;\n}\n\n.tabs ul {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom-color: #dbdbdb;\n  border-bottom-style: solid;\n  border-bottom-width: 1px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.tabs ul.is-left {\n  padding-right: 0.75em;\n}\n\n.tabs ul.is-center {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n}\n\n.tabs ul.is-right {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  padding-left: 0.75em;\n}\n\n.tabs .icon:first-child {\n  margin-right: 0.5em;\n}\n\n.tabs .icon:last-child {\n  margin-left: 0.5em;\n}\n\n.tabs.is-centered ul {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.tabs.is-right ul {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.tabs.is-boxed a {\n  border: 1px solid transparent;\n  border-radius: 3px 3px 0 0;\n}\n\n.tabs.is-boxed a:hover {\n  background-color: whitesmoke;\n  border-bottom-color: #dbdbdb;\n}\n\n.tabs.is-boxed li.is-active a {\n  background-color: white;\n  border-color: #dbdbdb;\n  border-bottom-color: transparent !important;\n}\n\n.tabs.is-fullwidth li {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.tabs.is-toggle a {\n  border-color: #dbdbdb;\n  border-style: solid;\n  border-width: 1px;\n  margin-bottom: 0;\n  position: relative;\n}\n\n.tabs.is-toggle a:hover {\n  background-color: whitesmoke;\n  border-color: #b5b5b5;\n  z-index: 2;\n}\n\n.tabs.is-toggle li + li {\n  margin-left: -1px;\n}\n\n.tabs.is-toggle li:first-child a {\n  border-radius: 3px 0 0 3px;\n}\n\n.tabs.is-toggle li:last-child a {\n  border-radius: 0 3px 3px 0;\n}\n\n.tabs.is-toggle li.is-active a {\n  background-color: #7957d5;\n  border-color: #7957d5;\n  color: white;\n  z-index: 1;\n}\n\n.tabs.is-toggle ul {\n  border-bottom: none;\n}\n\n.tabs.is-toggle.is-toggle-rounded li:first-child a {\n  border-bottom-left-radius: 290486px;\n  border-top-left-radius: 290486px;\n  padding-left: 1.25em;\n}\n\n.tabs.is-toggle.is-toggle-rounded li:last-child a {\n  border-bottom-right-radius: 290486px;\n  border-top-right-radius: 290486px;\n  padding-right: 1.25em;\n}\n\n.tabs.is-small {\n  font-size: 0.75rem;\n}\n\n.tabs.is-medium {\n  font-size: 1.25rem;\n}\n\n.tabs.is-large {\n  font-size: 1.5rem;\n}\n\n.column {\n  display: block;\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n  padding: 0.75rem;\n}\n\n.columns.is-mobile > .column.is-narrow {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n}\n\n.columns.is-mobile > .column.is-full {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 100%;\n}\n\n.columns.is-mobile > .column.is-three-quarters {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 75%;\n}\n\n.columns.is-mobile > .column.is-two-thirds {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 66.6666%;\n}\n\n.columns.is-mobile > .column.is-half {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 50%;\n}\n\n.columns.is-mobile > .column.is-one-third {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 33.3333%;\n}\n\n.columns.is-mobile > .column.is-one-quarter {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 25%;\n}\n\n.columns.is-mobile > .column.is-one-fifth {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 20%;\n}\n\n.columns.is-mobile > .column.is-two-fifths {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 40%;\n}\n\n.columns.is-mobile > .column.is-three-fifths {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 60%;\n}\n\n.columns.is-mobile > .column.is-four-fifths {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 80%;\n}\n\n.columns.is-mobile > .column.is-offset-three-quarters {\n  margin-left: 75%;\n}\n\n.columns.is-mobile > .column.is-offset-two-thirds {\n  margin-left: 66.6666%;\n}\n\n.columns.is-mobile > .column.is-offset-half {\n  margin-left: 50%;\n}\n\n.columns.is-mobile > .column.is-offset-one-third {\n  margin-left: 33.3333%;\n}\n\n.columns.is-mobile > .column.is-offset-one-quarter {\n  margin-left: 25%;\n}\n\n.columns.is-mobile > .column.is-offset-one-fifth {\n  margin-left: 20%;\n}\n\n.columns.is-mobile > .column.is-offset-two-fifths {\n  margin-left: 40%;\n}\n\n.columns.is-mobile > .column.is-offset-three-fifths {\n  margin-left: 60%;\n}\n\n.columns.is-mobile > .column.is-offset-four-fifths {\n  margin-left: 80%;\n}\n\n.columns.is-mobile > .column.is-1 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 8.33333%;\n}\n\n.columns.is-mobile > .column.is-offset-1 {\n  margin-left: 8.33333%;\n}\n\n.columns.is-mobile > .column.is-2 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 16.66667%;\n}\n\n.columns.is-mobile > .column.is-offset-2 {\n  margin-left: 16.66667%;\n}\n\n.columns.is-mobile > .column.is-3 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 25%;\n}\n\n.columns.is-mobile > .column.is-offset-3 {\n  margin-left: 25%;\n}\n\n.columns.is-mobile > .column.is-4 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 33.33333%;\n}\n\n.columns.is-mobile > .column.is-offset-4 {\n  margin-left: 33.33333%;\n}\n\n.columns.is-mobile > .column.is-5 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 41.66667%;\n}\n\n.columns.is-mobile > .column.is-offset-5 {\n  margin-left: 41.66667%;\n}\n\n.columns.is-mobile > .column.is-6 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 50%;\n}\n\n.columns.is-mobile > .column.is-offset-6 {\n  margin-left: 50%;\n}\n\n.columns.is-mobile > .column.is-7 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 58.33333%;\n}\n\n.columns.is-mobile > .column.is-offset-7 {\n  margin-left: 58.33333%;\n}\n\n.columns.is-mobile > .column.is-8 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 66.66667%;\n}\n\n.columns.is-mobile > .column.is-offset-8 {\n  margin-left: 66.66667%;\n}\n\n.columns.is-mobile > .column.is-9 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 75%;\n}\n\n.columns.is-mobile > .column.is-offset-9 {\n  margin-left: 75%;\n}\n\n.columns.is-mobile > .column.is-10 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 83.33333%;\n}\n\n.columns.is-mobile > .column.is-offset-10 {\n  margin-left: 83.33333%;\n}\n\n.columns.is-mobile > .column.is-11 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 91.66667%;\n}\n\n.columns.is-mobile > .column.is-offset-11 {\n  margin-left: 91.66667%;\n}\n\n.columns.is-mobile > .column.is-12 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 100%;\n}\n\n.columns.is-mobile > .column.is-offset-12 {\n  margin-left: 100%;\n}\n\n@media screen and (max-width: 768px) {\n  .column.is-narrow-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n  }\n  .column.is-full-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-three-quarters-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-two-thirds-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.6666%;\n  }\n  .column.is-half-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-one-third-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.3333%;\n  }\n  .column.is-one-quarter-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-one-fifth-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 20%;\n  }\n  .column.is-two-fifths-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 40%;\n  }\n  .column.is-three-fifths-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 60%;\n  }\n  .column.is-four-fifths-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 80%;\n  }\n  .column.is-offset-three-quarters-mobile {\n    margin-left: 75%;\n  }\n  .column.is-offset-two-thirds-mobile {\n    margin-left: 66.6666%;\n  }\n  .column.is-offset-half-mobile {\n    margin-left: 50%;\n  }\n  .column.is-offset-one-third-mobile {\n    margin-left: 33.3333%;\n  }\n  .column.is-offset-one-quarter-mobile {\n    margin-left: 25%;\n  }\n  .column.is-offset-one-fifth-mobile {\n    margin-left: 20%;\n  }\n  .column.is-offset-two-fifths-mobile {\n    margin-left: 40%;\n  }\n  .column.is-offset-three-fifths-mobile {\n    margin-left: 60%;\n  }\n  .column.is-offset-four-fifths-mobile {\n    margin-left: 80%;\n  }\n  .column.is-1-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 8.33333%;\n  }\n  .column.is-offset-1-mobile {\n    margin-left: 8.33333%;\n  }\n  .column.is-2-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 16.66667%;\n  }\n  .column.is-offset-2-mobile {\n    margin-left: 16.66667%;\n  }\n  .column.is-3-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-3-mobile {\n    margin-left: 25%;\n  }\n  .column.is-4-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.33333%;\n  }\n  .column.is-offset-4-mobile {\n    margin-left: 33.33333%;\n  }\n  .column.is-5-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 41.66667%;\n  }\n  .column.is-offset-5-mobile {\n    margin-left: 41.66667%;\n  }\n  .column.is-6-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-offset-6-mobile {\n    margin-left: 50%;\n  }\n  .column.is-7-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 58.33333%;\n  }\n  .column.is-offset-7-mobile {\n    margin-left: 58.33333%;\n  }\n  .column.is-8-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.66667%;\n  }\n  .column.is-offset-8-mobile {\n    margin-left: 66.66667%;\n  }\n  .column.is-9-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-offset-9-mobile {\n    margin-left: 75%;\n  }\n  .column.is-10-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 83.33333%;\n  }\n  .column.is-offset-10-mobile {\n    margin-left: 83.33333%;\n  }\n  .column.is-11-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 91.66667%;\n  }\n  .column.is-offset-11-mobile {\n    margin-left: 91.66667%;\n  }\n  .column.is-12-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-offset-12-mobile {\n    margin-left: 100%;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .column.is-narrow, .column.is-narrow-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n  }\n  .column.is-full, .column.is-full-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-three-quarters, .column.is-three-quarters-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-two-thirds, .column.is-two-thirds-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.6666%;\n  }\n  .column.is-half, .column.is-half-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-one-third, .column.is-one-third-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.3333%;\n  }\n  .column.is-one-quarter, .column.is-one-quarter-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-one-fifth, .column.is-one-fifth-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 20%;\n  }\n  .column.is-two-fifths, .column.is-two-fifths-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 40%;\n  }\n  .column.is-three-fifths, .column.is-three-fifths-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 60%;\n  }\n  .column.is-four-fifths, .column.is-four-fifths-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 80%;\n  }\n  .column.is-offset-three-quarters, .column.is-offset-three-quarters-tablet {\n    margin-left: 75%;\n  }\n  .column.is-offset-two-thirds, .column.is-offset-two-thirds-tablet {\n    margin-left: 66.6666%;\n  }\n  .column.is-offset-half, .column.is-offset-half-tablet {\n    margin-left: 50%;\n  }\n  .column.is-offset-one-third, .column.is-offset-one-third-tablet {\n    margin-left: 33.3333%;\n  }\n  .column.is-offset-one-quarter, .column.is-offset-one-quarter-tablet {\n    margin-left: 25%;\n  }\n  .column.is-offset-one-fifth, .column.is-offset-one-fifth-tablet {\n    margin-left: 20%;\n  }\n  .column.is-offset-two-fifths, .column.is-offset-two-fifths-tablet {\n    margin-left: 40%;\n  }\n  .column.is-offset-three-fifths, .column.is-offset-three-fifths-tablet {\n    margin-left: 60%;\n  }\n  .column.is-offset-four-fifths, .column.is-offset-four-fifths-tablet {\n    margin-left: 80%;\n  }\n  .column.is-1, .column.is-1-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 8.33333%;\n  }\n  .column.is-offset-1, .column.is-offset-1-tablet {\n    margin-left: 8.33333%;\n  }\n  .column.is-2, .column.is-2-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 16.66667%;\n  }\n  .column.is-offset-2, .column.is-offset-2-tablet {\n    margin-left: 16.66667%;\n  }\n  .column.is-3, .column.is-3-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-3, .column.is-offset-3-tablet {\n    margin-left: 25%;\n  }\n  .column.is-4, .column.is-4-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.33333%;\n  }\n  .column.is-offset-4, .column.is-offset-4-tablet {\n    margin-left: 33.33333%;\n  }\n  .column.is-5, .column.is-5-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 41.66667%;\n  }\n  .column.is-offset-5, .column.is-offset-5-tablet {\n    margin-left: 41.66667%;\n  }\n  .column.is-6, .column.is-6-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-offset-6, .column.is-offset-6-tablet {\n    margin-left: 50%;\n  }\n  .column.is-7, .column.is-7-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 58.33333%;\n  }\n  .column.is-offset-7, .column.is-offset-7-tablet {\n    margin-left: 58.33333%;\n  }\n  .column.is-8, .column.is-8-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.66667%;\n  }\n  .column.is-offset-8, .column.is-offset-8-tablet {\n    margin-left: 66.66667%;\n  }\n  .column.is-9, .column.is-9-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-offset-9, .column.is-offset-9-tablet {\n    margin-left: 75%;\n  }\n  .column.is-10, .column.is-10-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 83.33333%;\n  }\n  .column.is-offset-10, .column.is-offset-10-tablet {\n    margin-left: 83.33333%;\n  }\n  .column.is-11, .column.is-11-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 91.66667%;\n  }\n  .column.is-offset-11, .column.is-offset-11-tablet {\n    margin-left: 91.66667%;\n  }\n  .column.is-12, .column.is-12-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-offset-12, .column.is-offset-12-tablet {\n    margin-left: 100%;\n  }\n}\n\n@media screen and (max-width: 1023px) {\n  .column.is-narrow-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n  }\n  .column.is-full-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-three-quarters-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-two-thirds-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.6666%;\n  }\n  .column.is-half-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-one-third-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.3333%;\n  }\n  .column.is-one-quarter-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-one-fifth-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 20%;\n  }\n  .column.is-two-fifths-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 40%;\n  }\n  .column.is-three-fifths-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 60%;\n  }\n  .column.is-four-fifths-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 80%;\n  }\n  .column.is-offset-three-quarters-touch {\n    margin-left: 75%;\n  }\n  .column.is-offset-two-thirds-touch {\n    margin-left: 66.6666%;\n  }\n  .column.is-offset-half-touch {\n    margin-left: 50%;\n  }\n  .column.is-offset-one-third-touch {\n    margin-left: 33.3333%;\n  }\n  .column.is-offset-one-quarter-touch {\n    margin-left: 25%;\n  }\n  .column.is-offset-one-fifth-touch {\n    margin-left: 20%;\n  }\n  .column.is-offset-two-fifths-touch {\n    margin-left: 40%;\n  }\n  .column.is-offset-three-fifths-touch {\n    margin-left: 60%;\n  }\n  .column.is-offset-four-fifths-touch {\n    margin-left: 80%;\n  }\n  .column.is-1-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 8.33333%;\n  }\n  .column.is-offset-1-touch {\n    margin-left: 8.33333%;\n  }\n  .column.is-2-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 16.66667%;\n  }\n  .column.is-offset-2-touch {\n    margin-left: 16.66667%;\n  }\n  .column.is-3-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-3-touch {\n    margin-left: 25%;\n  }\n  .column.is-4-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.33333%;\n  }\n  .column.is-offset-4-touch {\n    margin-left: 33.33333%;\n  }\n  .column.is-5-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 41.66667%;\n  }\n  .column.is-offset-5-touch {\n    margin-left: 41.66667%;\n  }\n  .column.is-6-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-offset-6-touch {\n    margin-left: 50%;\n  }\n  .column.is-7-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 58.33333%;\n  }\n  .column.is-offset-7-touch {\n    margin-left: 58.33333%;\n  }\n  .column.is-8-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.66667%;\n  }\n  .column.is-offset-8-touch {\n    margin-left: 66.66667%;\n  }\n  .column.is-9-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-offset-9-touch {\n    margin-left: 75%;\n  }\n  .column.is-10-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 83.33333%;\n  }\n  .column.is-offset-10-touch {\n    margin-left: 83.33333%;\n  }\n  .column.is-11-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 91.66667%;\n  }\n  .column.is-offset-11-touch {\n    margin-left: 91.66667%;\n  }\n  .column.is-12-touch {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-offset-12-touch {\n    margin-left: 100%;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .column.is-narrow-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n  }\n  .column.is-full-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-three-quarters-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-two-thirds-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.6666%;\n  }\n  .column.is-half-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-one-third-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.3333%;\n  }\n  .column.is-one-quarter-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-one-fifth-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 20%;\n  }\n  .column.is-two-fifths-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 40%;\n  }\n  .column.is-three-fifths-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 60%;\n  }\n  .column.is-four-fifths-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 80%;\n  }\n  .column.is-offset-three-quarters-desktop {\n    margin-left: 75%;\n  }\n  .column.is-offset-two-thirds-desktop {\n    margin-left: 66.6666%;\n  }\n  .column.is-offset-half-desktop {\n    margin-left: 50%;\n  }\n  .column.is-offset-one-third-desktop {\n    margin-left: 33.3333%;\n  }\n  .column.is-offset-one-quarter-desktop {\n    margin-left: 25%;\n  }\n  .column.is-offset-one-fifth-desktop {\n    margin-left: 20%;\n  }\n  .column.is-offset-two-fifths-desktop {\n    margin-left: 40%;\n  }\n  .column.is-offset-three-fifths-desktop {\n    margin-left: 60%;\n  }\n  .column.is-offset-four-fifths-desktop {\n    margin-left: 80%;\n  }\n  .column.is-1-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 8.33333%;\n  }\n  .column.is-offset-1-desktop {\n    margin-left: 8.33333%;\n  }\n  .column.is-2-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 16.66667%;\n  }\n  .column.is-offset-2-desktop {\n    margin-left: 16.66667%;\n  }\n  .column.is-3-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-3-desktop {\n    margin-left: 25%;\n  }\n  .column.is-4-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.33333%;\n  }\n  .column.is-offset-4-desktop {\n    margin-left: 33.33333%;\n  }\n  .column.is-5-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 41.66667%;\n  }\n  .column.is-offset-5-desktop {\n    margin-left: 41.66667%;\n  }\n  .column.is-6-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-offset-6-desktop {\n    margin-left: 50%;\n  }\n  .column.is-7-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 58.33333%;\n  }\n  .column.is-offset-7-desktop {\n    margin-left: 58.33333%;\n  }\n  .column.is-8-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.66667%;\n  }\n  .column.is-offset-8-desktop {\n    margin-left: 66.66667%;\n  }\n  .column.is-9-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-offset-9-desktop {\n    margin-left: 75%;\n  }\n  .column.is-10-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 83.33333%;\n  }\n  .column.is-offset-10-desktop {\n    margin-left: 83.33333%;\n  }\n  .column.is-11-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 91.66667%;\n  }\n  .column.is-offset-11-desktop {\n    margin-left: 91.66667%;\n  }\n  .column.is-12-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-offset-12-desktop {\n    margin-left: 100%;\n  }\n}\n\n@media screen and (min-width: 1216px) {\n  .column.is-narrow-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n  }\n  .column.is-full-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-three-quarters-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-two-thirds-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.6666%;\n  }\n  .column.is-half-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-one-third-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.3333%;\n  }\n  .column.is-one-quarter-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-one-fifth-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 20%;\n  }\n  .column.is-two-fifths-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 40%;\n  }\n  .column.is-three-fifths-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 60%;\n  }\n  .column.is-four-fifths-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 80%;\n  }\n  .column.is-offset-three-quarters-widescreen {\n    margin-left: 75%;\n  }\n  .column.is-offset-two-thirds-widescreen {\n    margin-left: 66.6666%;\n  }\n  .column.is-offset-half-widescreen {\n    margin-left: 50%;\n  }\n  .column.is-offset-one-third-widescreen {\n    margin-left: 33.3333%;\n  }\n  .column.is-offset-one-quarter-widescreen {\n    margin-left: 25%;\n  }\n  .column.is-offset-one-fifth-widescreen {\n    margin-left: 20%;\n  }\n  .column.is-offset-two-fifths-widescreen {\n    margin-left: 40%;\n  }\n  .column.is-offset-three-fifths-widescreen {\n    margin-left: 60%;\n  }\n  .column.is-offset-four-fifths-widescreen {\n    margin-left: 80%;\n  }\n  .column.is-1-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 8.33333%;\n  }\n  .column.is-offset-1-widescreen {\n    margin-left: 8.33333%;\n  }\n  .column.is-2-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 16.66667%;\n  }\n  .column.is-offset-2-widescreen {\n    margin-left: 16.66667%;\n  }\n  .column.is-3-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-3-widescreen {\n    margin-left: 25%;\n  }\n  .column.is-4-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.33333%;\n  }\n  .column.is-offset-4-widescreen {\n    margin-left: 33.33333%;\n  }\n  .column.is-5-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 41.66667%;\n  }\n  .column.is-offset-5-widescreen {\n    margin-left: 41.66667%;\n  }\n  .column.is-6-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-offset-6-widescreen {\n    margin-left: 50%;\n  }\n  .column.is-7-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 58.33333%;\n  }\n  .column.is-offset-7-widescreen {\n    margin-left: 58.33333%;\n  }\n  .column.is-8-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.66667%;\n  }\n  .column.is-offset-8-widescreen {\n    margin-left: 66.66667%;\n  }\n  .column.is-9-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-offset-9-widescreen {\n    margin-left: 75%;\n  }\n  .column.is-10-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 83.33333%;\n  }\n  .column.is-offset-10-widescreen {\n    margin-left: 83.33333%;\n  }\n  .column.is-11-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 91.66667%;\n  }\n  .column.is-offset-11-widescreen {\n    margin-left: 91.66667%;\n  }\n  .column.is-12-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-offset-12-widescreen {\n    margin-left: 100%;\n  }\n}\n\n@media screen and (min-width: 1408px) {\n  .column.is-narrow-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n  }\n  .column.is-full-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-three-quarters-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-two-thirds-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.6666%;\n  }\n  .column.is-half-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-one-third-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.3333%;\n  }\n  .column.is-one-quarter-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-one-fifth-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 20%;\n  }\n  .column.is-two-fifths-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 40%;\n  }\n  .column.is-three-fifths-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 60%;\n  }\n  .column.is-four-fifths-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 80%;\n  }\n  .column.is-offset-three-quarters-fullhd {\n    margin-left: 75%;\n  }\n  .column.is-offset-two-thirds-fullhd {\n    margin-left: 66.6666%;\n  }\n  .column.is-offset-half-fullhd {\n    margin-left: 50%;\n  }\n  .column.is-offset-one-third-fullhd {\n    margin-left: 33.3333%;\n  }\n  .column.is-offset-one-quarter-fullhd {\n    margin-left: 25%;\n  }\n  .column.is-offset-one-fifth-fullhd {\n    margin-left: 20%;\n  }\n  .column.is-offset-two-fifths-fullhd {\n    margin-left: 40%;\n  }\n  .column.is-offset-three-fifths-fullhd {\n    margin-left: 60%;\n  }\n  .column.is-offset-four-fifths-fullhd {\n    margin-left: 80%;\n  }\n  .column.is-1-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 8.33333%;\n  }\n  .column.is-offset-1-fullhd {\n    margin-left: 8.33333%;\n  }\n  .column.is-2-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 16.66667%;\n  }\n  .column.is-offset-2-fullhd {\n    margin-left: 16.66667%;\n  }\n  .column.is-3-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-3-fullhd {\n    margin-left: 25%;\n  }\n  .column.is-4-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.33333%;\n  }\n  .column.is-offset-4-fullhd {\n    margin-left: 33.33333%;\n  }\n  .column.is-5-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 41.66667%;\n  }\n  .column.is-offset-5-fullhd {\n    margin-left: 41.66667%;\n  }\n  .column.is-6-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-offset-6-fullhd {\n    margin-left: 50%;\n  }\n  .column.is-7-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 58.33333%;\n  }\n  .column.is-offset-7-fullhd {\n    margin-left: 58.33333%;\n  }\n  .column.is-8-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.66667%;\n  }\n  .column.is-offset-8-fullhd {\n    margin-left: 66.66667%;\n  }\n  .column.is-9-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-offset-9-fullhd {\n    margin-left: 75%;\n  }\n  .column.is-10-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 83.33333%;\n  }\n  .column.is-offset-10-fullhd {\n    margin-left: 83.33333%;\n  }\n  .column.is-11-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 91.66667%;\n  }\n  .column.is-offset-11-fullhd {\n    margin-left: 91.66667%;\n  }\n  .column.is-12-fullhd {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-offset-12-fullhd {\n    margin-left: 100%;\n  }\n}\n\n.columns {\n  margin-left: -0.75rem;\n  margin-right: -0.75rem;\n  margin-top: -0.75rem;\n}\n\n.columns:last-child {\n  margin-bottom: -0.75rem;\n}\n\n.columns:not(:last-child) {\n  margin-bottom: calc(1.5rem - 0.75rem);\n}\n\n.columns.is-centered {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.columns.is-gapless {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n}\n\n.columns.is-gapless > .column {\n  margin: 0;\n  padding: 0 !important;\n}\n\n.columns.is-gapless:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.columns.is-gapless:last-child {\n  margin-bottom: 0;\n}\n\n.columns.is-mobile {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.columns.is-multiline {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n\n.columns.is-vcentered {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n@media screen and (min-width: 769px), print {\n  .columns:not(.is-desktop) {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .columns.is-desktop {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\n\n.columns.is-variable {\n  --columnGap: 0.75rem;\n  margin-left: calc(-1 * var(--columnGap));\n  margin-right: calc(-1 * var(--columnGap));\n}\n\n.columns.is-variable .column {\n  padding-left: var(--columnGap);\n  padding-right: var(--columnGap);\n}\n\n.columns.is-variable.is-0 {\n  --columnGap: 0rem;\n}\n\n.columns.is-variable.is-1 {\n  --columnGap: 0.25rem;\n}\n\n.columns.is-variable.is-2 {\n  --columnGap: 0.5rem;\n}\n\n.columns.is-variable.is-3 {\n  --columnGap: 0.75rem;\n}\n\n.columns.is-variable.is-4 {\n  --columnGap: 1rem;\n}\n\n.columns.is-variable.is-5 {\n  --columnGap: 1.25rem;\n}\n\n.columns.is-variable.is-6 {\n  --columnGap: 1.5rem;\n}\n\n.columns.is-variable.is-7 {\n  --columnGap: 1.75rem;\n}\n\n.columns.is-variable.is-8 {\n  --columnGap: 2rem;\n}\n\n.tile {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: block;\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n  min-height: -webkit-min-content;\n  min-height: -moz-min-content;\n  min-height: min-content;\n}\n\n.tile.is-ancestor {\n  margin-left: -0.75rem;\n  margin-right: -0.75rem;\n  margin-top: -0.75rem;\n}\n\n.tile.is-ancestor:last-child {\n  margin-bottom: -0.75rem;\n}\n\n.tile.is-ancestor:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n\n.tile.is-child {\n  margin: 0 !important;\n}\n\n.tile.is-parent {\n  padding: 0.75rem;\n}\n\n.tile.is-vertical {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.tile.is-vertical > .tile.is-child:not(:last-child) {\n  margin-bottom: 1.5rem !important;\n}\n\n@media screen and (min-width: 769px), print {\n  .tile:not(.is-child) {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n  .tile.is-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 8.33333%;\n  }\n  .tile.is-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 16.66667%;\n  }\n  .tile.is-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .tile.is-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.33333%;\n  }\n  .tile.is-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 41.66667%;\n  }\n  .tile.is-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .tile.is-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 58.33333%;\n  }\n  .tile.is-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.66667%;\n  }\n  .tile.is-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .tile.is-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 83.33333%;\n  }\n  .tile.is-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 91.66667%;\n  }\n  .tile.is-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n}\n\n.hero {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n\n.hero .navbar {\n  background: none;\n}\n\n.hero .tabs ul {\n  border-bottom: none;\n}\n\n.hero.is-white {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.hero.is-white a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),\n.hero.is-white strong {\n  color: inherit;\n}\n\n.hero.is-white .title {\n  color: #0a0a0a;\n}\n\n.hero.is-white .subtitle {\n  color: rgba(10, 10, 10, 0.9);\n}\n\n.hero.is-white .subtitle a:not(.button),\n.hero.is-white .subtitle strong {\n  color: #0a0a0a;\n}\n\n@media screen and (max-width: 1023px) {\n  .hero.is-white .navbar-menu {\n    background-color: white;\n  }\n}\n\n.hero.is-white .navbar-item,\n.hero.is-white .navbar-link {\n  color: rgba(10, 10, 10, 0.7);\n}\n\n.hero.is-white a.navbar-item:hover, .hero.is-white a.navbar-item.is-active,\n.hero.is-white .navbar-link:hover,\n.hero.is-white .navbar-link.is-active {\n  background-color: #f2f2f2;\n  color: #0a0a0a;\n}\n\n.hero.is-white .tabs a {\n  color: #0a0a0a;\n  opacity: 0.9;\n}\n\n.hero.is-white .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-white .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-white .tabs.is-boxed a, .hero.is-white .tabs.is-toggle a {\n  color: #0a0a0a;\n}\n\n.hero.is-white .tabs.is-boxed a:hover, .hero.is-white .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-white .tabs.is-boxed li.is-active a, .hero.is-white .tabs.is-boxed li.is-active a:hover, .hero.is-white .tabs.is-toggle li.is-active a, .hero.is-white .tabs.is-toggle li.is-active a:hover {\n  background-color: #0a0a0a;\n  border-color: #0a0a0a;\n  color: white;\n}\n\n.hero.is-white.is-bold {\n  background-image: linear-gradient(141deg, #e6e6e6 0%, white 71%, white 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-white.is-bold .navbar-menu {\n    background-image: linear-gradient(141deg, #e6e6e6 0%, white 71%, white 100%);\n  }\n}\n\n.hero.is-black {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.hero.is-black a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),\n.hero.is-black strong {\n  color: inherit;\n}\n\n.hero.is-black .title {\n  color: white;\n}\n\n.hero.is-black .subtitle {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-black .subtitle a:not(.button),\n.hero.is-black .subtitle strong {\n  color: white;\n}\n\n@media screen and (max-width: 1023px) {\n  .hero.is-black .navbar-menu {\n    background-color: #0a0a0a;\n  }\n}\n\n.hero.is-black .navbar-item,\n.hero.is-black .navbar-link {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-black a.navbar-item:hover, .hero.is-black a.navbar-item.is-active,\n.hero.is-black .navbar-link:hover,\n.hero.is-black .navbar-link.is-active {\n  background-color: black;\n  color: white;\n}\n\n.hero.is-black .tabs a {\n  color: white;\n  opacity: 0.9;\n}\n\n.hero.is-black .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-black .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-black .tabs.is-boxed a, .hero.is-black .tabs.is-toggle a {\n  color: white;\n}\n\n.hero.is-black .tabs.is-boxed a:hover, .hero.is-black .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-black .tabs.is-boxed li.is-active a, .hero.is-black .tabs.is-boxed li.is-active a:hover, .hero.is-black .tabs.is-toggle li.is-active a, .hero.is-black .tabs.is-toggle li.is-active a:hover {\n  background-color: white;\n  border-color: white;\n  color: #0a0a0a;\n}\n\n.hero.is-black.is-bold {\n  background-image: linear-gradient(141deg, black 0%, #0a0a0a 71%, #181616 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-black.is-bold .navbar-menu {\n    background-image: linear-gradient(141deg, black 0%, #0a0a0a 71%, #181616 100%);\n  }\n}\n\n.hero.is-light {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.hero.is-light a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),\n.hero.is-light strong {\n  color: inherit;\n}\n\n.hero.is-light .title {\n  color: #363636;\n}\n\n.hero.is-light .subtitle {\n  color: rgba(54, 54, 54, 0.9);\n}\n\n.hero.is-light .subtitle a:not(.button),\n.hero.is-light .subtitle strong {\n  color: #363636;\n}\n\n@media screen and (max-width: 1023px) {\n  .hero.is-light .navbar-menu {\n    background-color: whitesmoke;\n  }\n}\n\n.hero.is-light .navbar-item,\n.hero.is-light .navbar-link {\n  color: rgba(54, 54, 54, 0.7);\n}\n\n.hero.is-light a.navbar-item:hover, .hero.is-light a.navbar-item.is-active,\n.hero.is-light .navbar-link:hover,\n.hero.is-light .navbar-link.is-active {\n  background-color: #e8e8e8;\n  color: #363636;\n}\n\n.hero.is-light .tabs a {\n  color: #363636;\n  opacity: 0.9;\n}\n\n.hero.is-light .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-light .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-light .tabs.is-boxed a, .hero.is-light .tabs.is-toggle a {\n  color: #363636;\n}\n\n.hero.is-light .tabs.is-boxed a:hover, .hero.is-light .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-light .tabs.is-boxed li.is-active a, .hero.is-light .tabs.is-boxed li.is-active a:hover, .hero.is-light .tabs.is-toggle li.is-active a, .hero.is-light .tabs.is-toggle li.is-active a:hover {\n  background-color: #363636;\n  border-color: #363636;\n  color: whitesmoke;\n}\n\n.hero.is-light.is-bold {\n  background-image: linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-light.is-bold .navbar-menu {\n    background-image: linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%);\n  }\n}\n\n.hero.is-dark {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.hero.is-dark a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),\n.hero.is-dark strong {\n  color: inherit;\n}\n\n.hero.is-dark .title {\n  color: whitesmoke;\n}\n\n.hero.is-dark .subtitle {\n  color: rgba(245, 245, 245, 0.9);\n}\n\n.hero.is-dark .subtitle a:not(.button),\n.hero.is-dark .subtitle strong {\n  color: whitesmoke;\n}\n\n@media screen and (max-width: 1023px) {\n  .hero.is-dark .navbar-menu {\n    background-color: #363636;\n  }\n}\n\n.hero.is-dark .navbar-item,\n.hero.is-dark .navbar-link {\n  color: rgba(245, 245, 245, 0.7);\n}\n\n.hero.is-dark a.navbar-item:hover, .hero.is-dark a.navbar-item.is-active,\n.hero.is-dark .navbar-link:hover,\n.hero.is-dark .navbar-link.is-active {\n  background-color: #292929;\n  color: whitesmoke;\n}\n\n.hero.is-dark .tabs a {\n  color: whitesmoke;\n  opacity: 0.9;\n}\n\n.hero.is-dark .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-dark .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-dark .tabs.is-boxed a, .hero.is-dark .tabs.is-toggle a {\n  color: whitesmoke;\n}\n\n.hero.is-dark .tabs.is-boxed a:hover, .hero.is-dark .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-dark .tabs.is-boxed li.is-active a, .hero.is-dark .tabs.is-boxed li.is-active a:hover, .hero.is-dark .tabs.is-toggle li.is-active a, .hero.is-dark .tabs.is-toggle li.is-active a:hover {\n  background-color: whitesmoke;\n  border-color: whitesmoke;\n  color: #363636;\n}\n\n.hero.is-dark.is-bold {\n  background-image: linear-gradient(141deg, #1f191a 0%, #363636 71%, #46403f 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-dark.is-bold .navbar-menu {\n    background-image: linear-gradient(141deg, #1f191a 0%, #363636 71%, #46403f 100%);\n  }\n}\n\n.hero.is-primary {\n  background-color: #7957d5;\n  color: white;\n}\n\n.hero.is-primary a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),\n.hero.is-primary strong {\n  color: inherit;\n}\n\n.hero.is-primary .title {\n  color: white;\n}\n\n.hero.is-primary .subtitle {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-primary .subtitle a:not(.button),\n.hero.is-primary .subtitle strong {\n  color: white;\n}\n\n@media screen and (max-width: 1023px) {\n  .hero.is-primary .navbar-menu {\n    background-color: #7957d5;\n  }\n}\n\n.hero.is-primary .navbar-item,\n.hero.is-primary .navbar-link {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-primary a.navbar-item:hover, .hero.is-primary a.navbar-item.is-active,\n.hero.is-primary .navbar-link:hover,\n.hero.is-primary .navbar-link.is-active {\n  background-color: #6943d0;\n  color: white;\n}\n\n.hero.is-primary .tabs a {\n  color: white;\n  opacity: 0.9;\n}\n\n.hero.is-primary .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-primary .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-primary .tabs.is-boxed a, .hero.is-primary .tabs.is-toggle a {\n  color: white;\n}\n\n.hero.is-primary .tabs.is-boxed a:hover, .hero.is-primary .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-primary .tabs.is-boxed li.is-active a, .hero.is-primary .tabs.is-boxed li.is-active a:hover, .hero.is-primary .tabs.is-toggle li.is-active a, .hero.is-primary .tabs.is-toggle li.is-active a:hover {\n  background-color: white;\n  border-color: white;\n  color: #7957d5;\n}\n\n.hero.is-primary.is-bold {\n  background-image: linear-gradient(141deg, #3725d4 0%, #7957d5 71%, #9b67df 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-primary.is-bold .navbar-menu {\n    background-image: linear-gradient(141deg, #3725d4 0%, #7957d5 71%, #9b67df 100%);\n  }\n}\n\n.hero.is-link {\n  background-color: #7957d5;\n  color: white;\n}\n\n.hero.is-link a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),\n.hero.is-link strong {\n  color: inherit;\n}\n\n.hero.is-link .title {\n  color: white;\n}\n\n.hero.is-link .subtitle {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-link .subtitle a:not(.button),\n.hero.is-link .subtitle strong {\n  color: white;\n}\n\n@media screen and (max-width: 1023px) {\n  .hero.is-link .navbar-menu {\n    background-color: #7957d5;\n  }\n}\n\n.hero.is-link .navbar-item,\n.hero.is-link .navbar-link {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-link a.navbar-item:hover, .hero.is-link a.navbar-item.is-active,\n.hero.is-link .navbar-link:hover,\n.hero.is-link .navbar-link.is-active {\n  background-color: #6943d0;\n  color: white;\n}\n\n.hero.is-link .tabs a {\n  color: white;\n  opacity: 0.9;\n}\n\n.hero.is-link .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-link .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-link .tabs.is-boxed a, .hero.is-link .tabs.is-toggle a {\n  color: white;\n}\n\n.hero.is-link .tabs.is-boxed a:hover, .hero.is-link .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-link .tabs.is-boxed li.is-active a, .hero.is-link .tabs.is-boxed li.is-active a:hover, .hero.is-link .tabs.is-toggle li.is-active a, .hero.is-link .tabs.is-toggle li.is-active a:hover {\n  background-color: white;\n  border-color: white;\n  color: #7957d5;\n}\n\n.hero.is-link.is-bold {\n  background-image: linear-gradient(141deg, #3725d4 0%, #7957d5 71%, #9b67df 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-link.is-bold .navbar-menu {\n    background-image: linear-gradient(141deg, #3725d4 0%, #7957d5 71%, #9b67df 100%);\n  }\n}\n\n.hero.is-info {\n  background-color: #167df0;\n  color: #fff;\n}\n\n.hero.is-info a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),\n.hero.is-info strong {\n  color: inherit;\n}\n\n.hero.is-info .title {\n  color: #fff;\n}\n\n.hero.is-info .subtitle {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-info .subtitle a:not(.button),\n.hero.is-info .subtitle strong {\n  color: #fff;\n}\n\n@media screen and (max-width: 1023px) {\n  .hero.is-info .navbar-menu {\n    background-color: #167df0;\n  }\n}\n\n.hero.is-info .navbar-item,\n.hero.is-info .navbar-link {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-info a.navbar-item:hover, .hero.is-info a.navbar-item.is-active,\n.hero.is-info .navbar-link:hover,\n.hero.is-info .navbar-link.is-active {\n  background-color: #0e71de;\n  color: #fff;\n}\n\n.hero.is-info .tabs a {\n  color: #fff;\n  opacity: 0.9;\n}\n\n.hero.is-info .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-info .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-info .tabs.is-boxed a, .hero.is-info .tabs.is-toggle a {\n  color: #fff;\n}\n\n.hero.is-info .tabs.is-boxed a:hover, .hero.is-info .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-info .tabs.is-boxed li.is-active a, .hero.is-info .tabs.is-boxed li.is-active a:hover, .hero.is-info .tabs.is-toggle li.is-active a, .hero.is-info .tabs.is-toggle li.is-active a:hover {\n  background-color: #fff;\n  border-color: #fff;\n  color: #167df0;\n}\n\n.hero.is-info.is-bold {\n  background-image: linear-gradient(141deg, #0286d1 0%, #167df0 71%, #2868f7 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-info.is-bold .navbar-menu {\n    background-image: linear-gradient(141deg, #0286d1 0%, #167df0 71%, #2868f7 100%);\n  }\n}\n\n.hero.is-success {\n  background-color: #23d160;\n  color: #fff;\n}\n\n.hero.is-success a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),\n.hero.is-success strong {\n  color: inherit;\n}\n\n.hero.is-success .title {\n  color: #fff;\n}\n\n.hero.is-success .subtitle {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-success .subtitle a:not(.button),\n.hero.is-success .subtitle strong {\n  color: #fff;\n}\n\n@media screen and (max-width: 1023px) {\n  .hero.is-success .navbar-menu {\n    background-color: #23d160;\n  }\n}\n\n.hero.is-success .navbar-item,\n.hero.is-success .navbar-link {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-success a.navbar-item:hover, .hero.is-success a.navbar-item.is-active,\n.hero.is-success .navbar-link:hover,\n.hero.is-success .navbar-link.is-active {\n  background-color: #20bc56;\n  color: #fff;\n}\n\n.hero.is-success .tabs a {\n  color: #fff;\n  opacity: 0.9;\n}\n\n.hero.is-success .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-success .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-success .tabs.is-boxed a, .hero.is-success .tabs.is-toggle a {\n  color: #fff;\n}\n\n.hero.is-success .tabs.is-boxed a:hover, .hero.is-success .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-success .tabs.is-boxed li.is-active a, .hero.is-success .tabs.is-boxed li.is-active a:hover, .hero.is-success .tabs.is-toggle li.is-active a, .hero.is-success .tabs.is-toggle li.is-active a:hover {\n  background-color: #fff;\n  border-color: #fff;\n  color: #23d160;\n}\n\n.hero.is-success.is-bold {\n  background-image: linear-gradient(141deg, #12af2f 0%, #23d160 71%, #2ce28a 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-success.is-bold .navbar-menu {\n    background-image: linear-gradient(141deg, #12af2f 0%, #23d160 71%, #2ce28a 100%);\n  }\n}\n\n.hero.is-warning {\n  background-color: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),\n.hero.is-warning strong {\n  color: inherit;\n}\n\n.hero.is-warning .title {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning .subtitle {\n  color: rgba(0, 0, 0, 0.9);\n}\n\n.hero.is-warning .subtitle a:not(.button),\n.hero.is-warning .subtitle strong {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n@media screen and (max-width: 1023px) {\n  .hero.is-warning .navbar-menu {\n    background-color: #ffdd57;\n  }\n}\n\n.hero.is-warning .navbar-item,\n.hero.is-warning .navbar-link {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning a.navbar-item:hover, .hero.is-warning a.navbar-item.is-active,\n.hero.is-warning .navbar-link:hover,\n.hero.is-warning .navbar-link.is-active {\n  background-color: #ffd83d;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning .tabs a {\n  color: rgba(0, 0, 0, 0.7);\n  opacity: 0.9;\n}\n\n.hero.is-warning .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-warning .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-warning .tabs.is-boxed a, .hero.is-warning .tabs.is-toggle a {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning .tabs.is-boxed a:hover, .hero.is-warning .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-warning .tabs.is-boxed li.is-active a, .hero.is-warning .tabs.is-boxed li.is-active a:hover, .hero.is-warning .tabs.is-toggle li.is-active a, .hero.is-warning .tabs.is-toggle li.is-active a:hover {\n  background-color: rgba(0, 0, 0, 0.7);\n  border-color: rgba(0, 0, 0, 0.7);\n  color: #ffdd57;\n}\n\n.hero.is-warning.is-bold {\n  background-image: linear-gradient(141deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-warning.is-bold .navbar-menu {\n    background-image: linear-gradient(141deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);\n  }\n}\n\n.hero.is-danger {\n  background-color: #ff3860;\n  color: #fff;\n}\n\n.hero.is-danger a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),\n.hero.is-danger strong {\n  color: inherit;\n}\n\n.hero.is-danger .title {\n  color: #fff;\n}\n\n.hero.is-danger .subtitle {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-danger .subtitle a:not(.button),\n.hero.is-danger .subtitle strong {\n  color: #fff;\n}\n\n@media screen and (max-width: 1023px) {\n  .hero.is-danger .navbar-menu {\n    background-color: #ff3860;\n  }\n}\n\n.hero.is-danger .navbar-item,\n.hero.is-danger .navbar-link {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-danger a.navbar-item:hover, .hero.is-danger a.navbar-item.is-active,\n.hero.is-danger .navbar-link:hover,\n.hero.is-danger .navbar-link.is-active {\n  background-color: #ff1f4b;\n  color: #fff;\n}\n\n.hero.is-danger .tabs a {\n  color: #fff;\n  opacity: 0.9;\n}\n\n.hero.is-danger .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-danger .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-danger .tabs.is-boxed a, .hero.is-danger .tabs.is-toggle a {\n  color: #fff;\n}\n\n.hero.is-danger .tabs.is-boxed a:hover, .hero.is-danger .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-danger .tabs.is-boxed li.is-active a, .hero.is-danger .tabs.is-boxed li.is-active a:hover, .hero.is-danger .tabs.is-toggle li.is-active a, .hero.is-danger .tabs.is-toggle li.is-active a:hover {\n  background-color: #fff;\n  border-color: #fff;\n  color: #ff3860;\n}\n\n.hero.is-danger.is-bold {\n  background-image: linear-gradient(141deg, #ff0561 0%, #ff3860 71%, #ff5257 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-danger.is-bold .navbar-menu {\n    background-image: linear-gradient(141deg, #ff0561 0%, #ff3860 71%, #ff5257 100%);\n  }\n}\n\n.hero.is-small .hero-body {\n  padding-bottom: 1.5rem;\n  padding-top: 1.5rem;\n}\n\n@media screen and (min-width: 769px), print {\n  .hero.is-medium .hero-body {\n    padding-bottom: 9rem;\n    padding-top: 9rem;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .hero.is-large .hero-body {\n    padding-bottom: 18rem;\n    padding-top: 18rem;\n  }\n}\n\n.hero.is-halfheight .hero-body, .hero.is-fullheight .hero-body {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.hero.is-halfheight .hero-body > .container, .hero.is-fullheight .hero-body > .container {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n}\n\n.hero.is-halfheight {\n  min-height: 50vh;\n}\n\n.hero.is-fullheight {\n  min-height: 100vh;\n}\n\n.hero-video {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  overflow: hidden;\n}\n\n.hero-video video {\n  left: 50%;\n  min-height: 100%;\n  min-width: 100%;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate3d(-50%, -50%, 0);\n          transform: translate3d(-50%, -50%, 0);\n}\n\n.hero-video.is-transparent {\n  opacity: 0.3;\n}\n\n@media screen and (max-width: 768px) {\n  .hero-video {\n    display: none;\n  }\n}\n\n.hero-buttons {\n  margin-top: 1.5rem;\n}\n\n@media screen and (max-width: 768px) {\n  .hero-buttons .button {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n  .hero-buttons .button:not(:last-child) {\n    margin-bottom: 0.75rem;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .hero-buttons {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n  }\n  .hero-buttons .button:not(:last-child) {\n    margin-right: 1.5rem;\n  }\n}\n\n.hero-head,\n.hero-foot {\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.hero-body {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  padding: 3rem 1.5rem;\n}\n\n.section {\n  padding: 3rem 1.5rem;\n}\n\n@media screen and (min-width: 1024px) {\n  .section.is-medium {\n    padding: 9rem 1.5rem;\n  }\n  .section.is-large {\n    padding: 18rem 1.5rem;\n  }\n}\n\n.footer {\n  background-color: whitesmoke;\n  padding: 3rem 1.5rem 6rem;\n}\n\n.is-noscroll {\n  position: fixed;\n  overflow-y: hidden;\n  width: 100%;\n  bottom: 0;\n}\n\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n.fadeOut {\n  -webkit-animation-name: fadeOut;\n          animation-name: fadeOut;\n}\n\n@keyframes fadeOutDown {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n            transform: translate3d(0, 100%, 0);\n  }\n}\n\n.fadeOutDown {\n  -webkit-animation-name: fadeOutDown;\n          animation-name: fadeOutDown;\n}\n\n@keyframes fadeOutUp {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n            transform: translate3d(0, -100%, 0);\n  }\n}\n\n.fadeOutUp {\n  -webkit-animation-name: fadeOutUp;\n          animation-name: fadeOutUp;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n.fadeIn {\n  -webkit-animation-name: fadeIn;\n          animation-name: fadeIn;\n}\n\n@keyframes fadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n            transform: translate3d(0, -100%, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n            transform: none;\n  }\n}\n\n.fadeInDown {\n  -webkit-animation-name: fadeInDown;\n          animation-name: fadeInDown;\n}\n\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n            transform: translate3d(0, 100%, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n            transform: none;\n  }\n}\n\n.fadeInUp {\n  -webkit-animation-name: fadeInUp;\n          animation-name: fadeInUp;\n}\n\n/**\r\n * Vue Transitions\r\n */\n.fade-enter-active,\n.fade-leave-active {\n  -webkit-transition: opacity 150ms ease-out;\n  transition: opacity 150ms ease-out;\n}\n\n.fade-enter,\n.fade-leave-to {\n  opacity: 0;\n}\n\n.zoom-in-enter-active,\n.zoom-in-leave-active {\n  -webkit-transition: opacity 150ms ease-out;\n  transition: opacity 150ms ease-out;\n}\n\n.zoom-in-enter-active .animation-content,\n.zoom-in-enter-active .animation-content,\n.zoom-in-leave-active .animation-content,\n.zoom-in-leave-active .animation-content {\n  -webkit-transition: -webkit-transform 150ms ease-out;\n  transition: -webkit-transform 150ms ease-out;\n  transition: transform 150ms ease-out;\n  transition: transform 150ms ease-out, -webkit-transform 150ms ease-out;\n}\n\n.zoom-in-enter,\n.zoom-in-leave-active {\n  opacity: 0;\n}\n\n.zoom-in-enter .animation-content,\n.zoom-in-enter .animation-content,\n.zoom-in-leave-active .animation-content,\n.zoom-in-leave-active .animation-content {\n  -webkit-transform: scale(0.95);\n          transform: scale(0.95);\n}\n\n.zoom-out-enter-active,\n.zoom-out-leave-active {\n  -webkit-transition: opacity 150ms ease-out;\n  transition: opacity 150ms ease-out;\n}\n\n.zoom-out-enter-active .animation-content,\n.zoom-out-enter-active .animation-content,\n.zoom-out-leave-active .animation-content,\n.zoom-out-leave-active .animation-content {\n  -webkit-transition: -webkit-transform 150ms ease-out;\n  transition: -webkit-transform 150ms ease-out;\n  transition: transform 150ms ease-out;\n  transition: transform 150ms ease-out, -webkit-transform 150ms ease-out;\n}\n\n.zoom-out-enter,\n.zoom-out-leave-active {\n  opacity: 0;\n}\n\n.zoom-out-enter .animation-content,\n.zoom-out-enter .animation-content,\n.zoom-out-leave-active .animation-content,\n.zoom-out-leave-active .animation-content {\n  -webkit-transform: scale(1.05);\n          transform: scale(1.05);\n}\n\n.slide-next-enter-active,\n.slide-next-leave-active,\n.slide-prev-enter-active,\n.slide-prev-leave-active {\n  -webkit-transition: -webkit-transform 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n  transition: -webkit-transform 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n  transition: transform 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n  transition: transform 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86), -webkit-transform 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86);\n}\n\n.slide-prev-leave-to, .slide-next-enter {\n  -webkit-transform: translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0);\n  position: absolute;\n  width: 100%;\n}\n\n.slide-prev-enter, .slide-next-leave-to {\n  -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0);\n  position: absolute;\n  width: 100%;\n}\n\n.autocomplete {\n  position: relative;\n}\n\n.autocomplete .dropdown-menu {\n  display: block;\n  min-width: 100%;\n}\n\n.autocomplete .dropdown-menu.is-opened-top {\n  top: auto;\n  bottom: 100%;\n}\n\n.autocomplete .dropdown-content {\n  overflow: auto;\n  max-height: 200px;\n}\n\n.autocomplete .dropdown-item.is-hovered, .autocomplete .dropdown .dropdown-menu .has-link a.is-hovered, .dropdown .dropdown-menu .has-link .autocomplete a.is-hovered {\n  background: whitesmoke;\n  color: #0a0a0a;\n}\n\n.autocomplete .dropdown-item.is-disabled, .autocomplete .dropdown .dropdown-menu .has-link a.is-disabled, .dropdown .dropdown-menu .has-link .autocomplete a.is-disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.autocomplete.is-small {\n  border-radius: 2px;\n  font-size: 0.75rem;\n}\n\n.autocomplete.is-medium {\n  font-size: 1.25rem;\n}\n\n.autocomplete.is-large {\n  font-size: 1.5rem;\n}\n\n.b-checkbox.checkbox {\n  outline: none;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.b-checkbox.checkbox + .checkbox {\n  margin-left: 0.5em;\n}\n\n.b-checkbox.checkbox input[type=checkbox] {\n  display: none;\n}\n\n.b-checkbox.checkbox input[type=checkbox] + .check {\n  width: 1.25em;\n  height: 1.25em;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  border-radius: 3px;\n  border: 2px solid #7a7a7a;\n  -webkit-transition: background 150ms ease-out;\n  transition: background 150ms ease-out;\n}\n\n.b-checkbox.checkbox input[type=checkbox]:checked + .check {\n  background: #7957d5 url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath style='fill:white' d='M 0.04038059,0.6267767 0.14644661,0.52071068 0.42928932,0.80355339 0.3232233,0.90961941 z M 0.21715729,0.80355339 0.85355339,0.16715729 0.95961941,0.2732233 0.3232233,0.90961941 z'%3E%3C/path%3E%3C/svg%3E\") no-repeat center center;\n  border-color: #7957d5;\n}\n\n.b-checkbox.checkbox .control-label {\n  padding-left: 0.5em;\n}\n\n.b-checkbox.checkbox[disabled] {\n  opacity: 0.5;\n}\n\n.b-checkbox.checkbox:hover input[type=checkbox] + .check {\n  border-color: #7957d5;\n}\n\n.b-checkbox.checkbox:focus input[type=checkbox] + .check {\n  -webkit-box-shadow: 0 0 0.5em rgba(122, 122, 122, 0.8);\n          box-shadow: 0 0 0.5em rgba(122, 122, 122, 0.8);\n}\n\n.b-checkbox.checkbox:focus input[type=checkbox]:checked + .check {\n  -webkit-box-shadow: 0 0 0.5em rgba(121, 87, 213, 0.8);\n          box-shadow: 0 0 0.5em rgba(121, 87, 213, 0.8);\n}\n\n.b-checkbox.checkbox.is-small {\n  border-radius: 2px;\n  font-size: 0.75rem;\n}\n\n.b-checkbox.checkbox.is-medium {\n  font-size: 1.25rem;\n}\n\n.b-checkbox.checkbox.is-large {\n  font-size: 1.5rem;\n}\n\n.collapse .collapse-trigger {\n  display: inline;\n  cursor: pointer;\n}\n\n.collapse .collapse-content {\n  display: inherit;\n}\n\n.datepicker {\n  font-size: 0.875rem;\n}\n\n.datepicker .dropdown,\n.datepicker .dropdown-trigger {\n  width: 100%;\n}\n\n.datepicker .dropdown-item, .datepicker .dropdown .dropdown-menu .has-link a, .dropdown .dropdown-menu .has-link .datepicker a {\n  font-size: inherit;\n}\n\n.datepicker .datepicker-header {\n  padding-bottom: 0.875rem;\n  margin-bottom: 0.875rem;\n  border-bottom: 1px solid #dbdbdb;\n}\n\n.datepicker .datepicker-footer {\n  padding-top: 0.875rem;\n  border-top: 1px solid #dbdbdb;\n}\n\n.datepicker .datepicker-table {\n  display: table;\n  margin: 0 auto 0.875rem auto;\n}\n\n.datepicker .datepicker-table .datepicker-cell {\n  text-align: center;\n  vertical-align: middle;\n  display: table-cell;\n  border-radius: 3px;\n  padding: 0.5rem 0.75rem;\n}\n\n.datepicker .datepicker-table .datepicker-header {\n  display: table-header-group;\n}\n\n.datepicker .datepicker-table .datepicker-header .datepicker-cell {\n  color: #7a7a7a;\n  font-weight: 600;\n}\n\n.datepicker .datepicker-table .datepicker-body {\n  display: table-row-group;\n}\n\n.datepicker .datepicker-table .datepicker-body .datepicker-row {\n  display: table-row;\n}\n\n.datepicker .datepicker-table .datepicker-body .datepicker-row .datepicker-cell.is-unselectable {\n  color: #b5b5b5;\n}\n\n.datepicker .datepicker-table .datepicker-body .datepicker-row .datepicker-cell.is-today {\n  border: solid 1px rgba(121, 87, 213, 0.5);\n}\n\n.datepicker .datepicker-table .datepicker-body .datepicker-row .datepicker-cell.is-selectable {\n  color: #4a4a4a;\n}\n\n.datepicker .datepicker-table .datepicker-body .datepicker-row .datepicker-cell.is-selectable:hover:not(.is-selected), .datepicker .datepicker-table .datepicker-body .datepicker-row .datepicker-cell.is-selectable:focus:not(.is-selected) {\n  background-color: whitesmoke;\n  color: #0a0a0a;\n  cursor: pointer;\n}\n\n.datepicker .datepicker-table .datepicker-body .datepicker-row .datepicker-cell.is-selected {\n  background-color: #7957d5;\n  color: white;\n}\n\n.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell {\n  padding: 0.3rem 0.75rem 0.75rem;\n}\n\n.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event {\n  position: relative;\n}\n\n.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events {\n  bottom: .425rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  left: 0;\n  padding: 0 .35rem;\n  position: absolute;\n  width: 100%;\n}\n\n.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-white {\n  background-color: white;\n}\n\n.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-black {\n  background-color: #0a0a0a;\n}\n\n.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-light {\n  background-color: whitesmoke;\n}\n\n.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-dark {\n  background-color: #363636;\n}\n\n.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-primary {\n  background-color: #7957d5;\n}\n\n.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-link {\n  background-color: #7957d5;\n}\n\n.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-info {\n  background-color: #167df0;\n}\n\n.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-success {\n  background-color: #23d160;\n}\n\n.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-warning {\n  background-color: #ffdd57;\n}\n\n.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-danger {\n  background-color: #ff3860;\n}\n\n.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event.dots .event {\n  border-radius: 50%;\n  height: .35em;\n  margin: 0 .1em;\n  width: .35em;\n}\n\n.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event.bars .event {\n  height: .25em;\n  width: 100%;\n}\n\n.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.is-selected {\n  overflow: hidden;\n}\n\n.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.is-selected .events .event.is-primary {\n  background-color: #aa94e4;\n}\n\n.datepicker.is-small {\n  border-radius: 2px;\n  font-size: 0.75rem;\n}\n\n.datepicker.is-medium {\n  font-size: 1.25rem;\n}\n\n.datepicker.is-large {\n  font-size: 1.5rem;\n}\n\n@media screen and (min-width: 769px) and (max-width: 1023px) {\n  .datepicker .datepicker-table .datepicker-cell {\n    padding: 0.75rem 1rem;\n  }\n}\n\n@media screen and (max-width: 768px) {\n  .datepicker .datepicker-table .datepicker-cell {\n    padding: 0.25rem 0.5rem;\n  }\n}\n\n.dialog .modal-card {\n  max-width: 460px;\n  width: auto;\n}\n\n.dialog .modal-card .modal-card-head {\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n\n.dialog .modal-card .modal-card-body .field {\n  margin-top: 16px;\n}\n\n.dialog .modal-card .modal-card-body.is-titleless {\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n}\n\n.dialog .modal-card .modal-card-foot {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.dialog .modal-card .modal-card-foot .button {\n  display: inline;\n  min-width: 5em;\n  font-weight: 600;\n}\n\n@media screen and (min-width: 769px), print {\n  .dialog .modal-card {\n    min-width: 320px;\n  }\n}\n\n.dialog.is-small .modal-card,\n.dialog.is-small .input,\n.dialog.is-small .taginput .taginput-container.is-focusable, .taginput\n.dialog.is-small .taginput-container.is-focusable,\n.dialog.is-small .button {\n  border-radius: 2px;\n  font-size: 0.75rem;\n}\n\n.dialog.is-medium .modal-card,\n.dialog.is-medium .input,\n.dialog.is-medium .taginput .taginput-container.is-focusable, .taginput\n.dialog.is-medium .taginput-container.is-focusable,\n.dialog.is-medium .button {\n  font-size: 1.25rem;\n}\n\n.dialog.is-large .modal-card,\n.dialog.is-large .input,\n.dialog.is-large .taginput .taginput-container.is-focusable, .taginput\n.dialog.is-large .taginput-container.is-focusable,\n.dialog.is-large .button {\n  font-size: 1.5rem;\n}\n\n.dropdown + .dropdown {\n  margin-left: 0.5em;\n}\n\n.dropdown .background {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  position: fixed;\n  background-color: rgba(10, 10, 10, 0.86);\n  z-index: 10;\n  cursor: pointer;\n}\n\n@media screen and (min-width: 1024px) {\n  .dropdown .background {\n    display: none;\n  }\n}\n\n.dropdown .dropdown-menu .dropdown-item.is-disabled, .dropdown .dropdown-menu .has-link a.is-disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n\n.dropdown .dropdown-menu .dropdown-item.is-disabled:hover, .dropdown .dropdown-menu .has-link a.is-disabled:hover {\n  background: inherit;\n  color: inherit;\n}\n\n.dropdown .dropdown-menu .has-link a {\n  padding-right: 3rem;\n  white-space: nowrap;\n}\n\n.dropdown .navbar-item {\n  height: 100%;\n}\n\n.dropdown.is-disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.dropdown.is-disabled .dropdown-trigger {\n  pointer-events: none;\n}\n\n.dropdown.is-inline .dropdown-menu {\n  position: static;\n  display: inline-block;\n  padding: 0;\n}\n\n.dropdown.is-top-right .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n}\n\n.dropdown.is-top-left .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  right: 0;\n  left: auto;\n}\n\n.dropdown.is-bottom-left .dropdown-menu {\n  right: 0;\n  left: auto;\n}\n\n@media screen and (max-width: 1023px) {\n  .dropdown.is-mobile-modal .dropdown-menu {\n    position: fixed;\n    width: calc(100vw - 40px);\n    max-width: 460px;\n    max-height: calc(100vh - 120px);\n    top: 25% !important;\n    left: 50% !important;\n    bottom: auto !important;\n    right: auto !important;\n    -webkit-transform: translate3d(-50%, -25%, 0);\n            transform: translate3d(-50%, -25%, 0);\n    white-space: normal;\n    overflow-y: auto;\n  }\n  .dropdown.is-mobile-modal .dropdown-menu .dropdown-item, .dropdown.is-mobile-modal .dropdown-menu .has-link a {\n    padding: 1rem 1.5rem;\n  }\n}\n\n.label {\n  font-weight: 600;\n}\n\n.field.is-grouped .field {\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.field.is-grouped .field + .field {\n  margin-left: 0.75rem;\n}\n\n.field.is-grouped .field.is-expanded {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n}\n\n.field.has-addons .control:first-child .control .button,\n.field.has-addons .control:first-child .control .input,\n.field.has-addons .control:first-child .control .taginput .taginput-container.is-focusable, .taginput\n.field.has-addons .control:first-child .control .taginput-container.is-focusable,\n.field.has-addons .control:first-child .control .select select {\n  border-bottom-left-radius: 3px;\n  border-top-left-radius: 3px;\n}\n\n.field.has-addons .control:last-child .control .button,\n.field.has-addons .control:last-child .control .input,\n.field.has-addons .control:last-child .control .taginput .taginput-container.is-focusable, .taginput\n.field.has-addons .control:last-child .control .taginput-container.is-focusable,\n.field.has-addons .control:last-child .control .select select {\n  border-bottom-right-radius: 3px;\n  border-top-right-radius: 3px;\n}\n\n.field.has-addons .control .control .button,\n.field.has-addons .control .control .input,\n.field.has-addons .control .control .taginput .taginput-container.is-focusable, .taginput\n.field.has-addons .control .control .taginput-container.is-focusable,\n.field.has-addons .control .control .select select {\n  border-radius: 0;\n}\n\n.control .help.counter {\n  float: right;\n  margin-left: 0.5em;\n}\n\n.control .icon.is-clickable {\n  pointer-events: auto;\n  cursor: pointer;\n}\n\n.icon {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  cursor: inherit;\n}\n\n.icon svg {\n  background-color: transparent;\n  fill: currentColor;\n  stroke-width: 0;\n  stroke: currentColor;\n  pointer-events: none;\n  width: 1.5rem;\n  height: 1.5rem;\n}\n\n.loading-overlay {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: none;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  overflow: hidden;\n  z-index: 999;\n}\n\n.loading-overlay.is-active {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.loading-overlay.is-full-page {\n  position: fixed;\n}\n\n.loading-overlay.is-full-page .loading-icon:after {\n  top: calc(50% - 2.5em);\n  left: calc(50% - 2.5em);\n  width: 5em;\n  height: 5em;\n}\n\n.loading-overlay .loading-background {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  background: #7f7f7f;\n  background: rgba(255, 255, 255, 0.5);\n}\n\n.loading-overlay .loading-icon {\n  position: relative;\n}\n\n.loading-overlay .loading-icon:after {\n  -webkit-animation: spinAround 500ms infinite linear;\n          animation: spinAround 500ms infinite linear;\n  border: 2px solid #dbdbdb;\n  border-radius: 290486px;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  content: \"\";\n  display: block;\n  height: 1em;\n  position: relative;\n  width: 1em;\n  position: absolute;\n  top: calc(50% - 1.5em);\n  left: calc(50% - 1.5em);\n  width: 3em;\n  height: 3em;\n  border-width: 0.25em;\n}\n\n.message .media,\n.notification .media {\n  padding-top: 0;\n  border: 0;\n}\n\n.notification > .delete {\n  right: 0.5rem !important;\n  top: 0.5rem !important;\n}\n\n.modal .animation-content {\n  margin: 0 20px;\n}\n\n.modal .animation-content .modal-card {\n  margin: 0;\n}\n\n@media screen and (max-width: 768px) {\n  .modal .animation-content {\n    width: 100%;\n  }\n}\n\n.notices {\n  position: fixed;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 2em;\n  overflow: hidden;\n  z-index: 1000;\n  pointer-events: none;\n}\n\n.notices .toast {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-animation-duration: 150ms;\n          animation-duration: 150ms;\n  margin: 0.5em 0;\n  text-align: center;\n  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);\n          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);\n  border-radius: 2em;\n  padding: 0.75em 1.5em;\n  pointer-events: auto;\n  opacity: 0.92;\n}\n\n.notices .toast.is-white {\n  color: #0a0a0a;\n  background: white;\n}\n\n.notices .toast.is-black {\n  color: white;\n  background: #0a0a0a;\n}\n\n.notices .toast.is-light {\n  color: #363636;\n  background: whitesmoke;\n}\n\n.notices .toast.is-dark {\n  color: whitesmoke;\n  background: #363636;\n}\n\n.notices .toast.is-primary {\n  color: white;\n  background: #7957d5;\n}\n\n.notices .toast.is-link {\n  color: white;\n  background: #7957d5;\n}\n\n.notices .toast.is-info {\n  color: #fff;\n  background: #167df0;\n}\n\n.notices .toast.is-success {\n  color: #fff;\n  background: #23d160;\n}\n\n.notices .toast.is-warning {\n  color: rgba(0, 0, 0, 0.7);\n  background: #ffdd57;\n}\n\n.notices .toast.is-danger {\n  color: #fff;\n  background: #ff3860;\n}\n\n.notices .snackbar {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  -webkit-animation-duration: 150ms;\n          animation-duration: 150ms;\n  margin: 0.5em 0;\n  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);\n          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);\n  border-radius: 3px;\n  pointer-events: auto;\n  background: #363636;\n  color: whitesmoke;\n  min-height: 3em;\n}\n\n.notices .snackbar .text {\n  padding: 0.5em 1em;\n}\n\n.notices .snackbar .action {\n  margin-left: auto;\n  padding: 0.5em;\n  padding-left: 0;\n}\n\n.notices .snackbar .action .button {\n  font-weight: 600;\n  text-transform: uppercase;\n}\n\n.notices .snackbar .action.is-white .button {\n  color: white;\n}\n\n.notices .snackbar .action.is-black .button {\n  color: #0a0a0a;\n}\n\n.notices .snackbar .action.is-light .button {\n  color: whitesmoke;\n}\n\n.notices .snackbar .action.is-dark .button {\n  color: #363636;\n}\n\n.notices .snackbar .action.is-primary .button {\n  color: #7957d5;\n}\n\n.notices .snackbar .action.is-link .button {\n  color: #7957d5;\n}\n\n.notices .snackbar .action.is-info .button {\n  color: #167df0;\n}\n\n.notices .snackbar .action.is-success .button {\n  color: #23d160;\n}\n\n.notices .snackbar .action.is-warning .button {\n  color: #ffdd57;\n}\n\n.notices .snackbar .action.is-danger .button {\n  color: #ff3860;\n}\n\n@media screen and (max-width: 768px) {\n  .notices .snackbar {\n    width: 100%;\n    margin: 0;\n    border-radius: 0;\n  }\n}\n\n@media screen and (min-width: 769px), print {\n  .notices .snackbar {\n    min-width: 350px;\n    max-width: 600px;\n    overflow: hidden;\n  }\n}\n\n.notices .toast.is-top, .notices .toast.is-bottom,\n.notices .snackbar.is-top,\n.notices .snackbar.is-bottom {\n  -ms-flex-item-align: center;\n      align-self: center;\n}\n\n.notices .toast.is-top-right, .notices .toast.is-bottom-right,\n.notices .snackbar.is-top-right,\n.notices .snackbar.is-bottom-right {\n  -ms-flex-item-align: end;\n      align-self: flex-end;\n}\n\n.notices .toast.is-top-left, .notices .toast.is-bottom-left,\n.notices .snackbar.is-top-left,\n.notices .snackbar.is-bottom-left {\n  -ms-flex-item-align: start;\n      align-self: flex-start;\n}\n\n.notices .toast.is-toast,\n.notices .snackbar.is-toast {\n  opacity: 0.92;\n}\n\n.notices.is-top {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.notices.is-bottom {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: reverse;\n      -ms-flex-direction: column-reverse;\n          flex-direction: column-reverse;\n}\n\n.notices.has-custom-container {\n  position: absolute;\n}\n\n@media screen and (max-width: 768px) {\n  .notices {\n    padding: 0;\n    position: fixed !important;\n  }\n}\n\n.pagination .pagination-next,\n.pagination .pagination-previous {\n  padding-left: 0.25em;\n  padding-right: 0.25em;\n}\n\n.pagination .pagination-next.is-disabled,\n.pagination .pagination-previous.is-disabled {\n  pointer-events: none;\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n\n.pagination.is-simple {\n  -webkit-box-pack: normal;\n      -ms-flex-pack: normal;\n          justify-content: normal;\n}\n\n.pagination .is-current {\n  pointer-events: none;\n  cursor: not-allowed;\n}\n\n.panel .panel-heading.is-collapsible {\n  cursor: pointer;\n}\n\n.panel .panel-content {\n  width: 100%;\n}\n\n.b-radio.radio {\n  outline: none;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.b-radio.radio + .radio {\n  margin-left: 0.5em;\n}\n\n.b-radio.radio input[type=radio] {\n  display: none;\n}\n\n.b-radio.radio input[type=radio] + .check {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 1.25em;\n  height: 1.25em;\n  border: 2px solid #7a7a7a;\n  border-radius: 50%;\n  -webkit-transition: background 150ms ease-out;\n  transition: background 150ms ease-out;\n}\n\n.b-radio.radio input[type=radio] + .check:before {\n  content: \"\";\n  border-radius: 50%;\n  width: 0.625em;\n  height: 0.625em;\n  background: #7957d5;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  -webkit-transition: -webkit-transform 150ms ease-out;\n  transition: -webkit-transform 150ms ease-out;\n  transition: transform 150ms ease-out;\n  transition: transform 150ms ease-out, -webkit-transform 150ms ease-out;\n}\n\n.b-radio.radio input[type=radio]:checked + .check {\n  border-color: #7957d5;\n}\n\n.b-radio.radio input[type=radio]:checked + .check:before {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n\n.b-radio.radio .control-label {\n  padding-left: 0.5em;\n}\n\n.b-radio.radio[disabled] {\n  opacity: 0.5;\n}\n\n.b-radio.radio:hover input[type=radio] + .check {\n  border-color: #7957d5;\n}\n\n.b-radio.radio:focus input[type=radio] + .check {\n  -webkit-box-shadow: 0 0 0.5em rgba(122, 122, 122, 0.8);\n          box-shadow: 0 0 0.5em rgba(122, 122, 122, 0.8);\n}\n\n.b-radio.radio:focus input[type=radio]:checked + .check {\n  -webkit-box-shadow: 0 0 0.5em rgba(121, 87, 213, 0.8);\n          box-shadow: 0 0 0.5em rgba(121, 87, 213, 0.8);\n}\n\n.b-radio.radio.is-small {\n  border-radius: 2px;\n  font-size: 0.75rem;\n}\n\n.b-radio.radio.is-medium {\n  font-size: 1.25rem;\n}\n\n.b-radio.radio.is-large {\n  font-size: 1.5rem;\n}\n\n.select select {\n  padding-right: 2.5em;\n}\n\n.select select option {\n  color: #4a4a4a;\n  padding: 0.25em 0.5em;\n}\n\n.select select option:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n\n.select select optgroup {\n  color: #b5b5b5;\n  font-weight: 400;\n  font-style: normal;\n  padding: 0.25em 0;\n}\n\n.select.is-empty select {\n  color: rgba(122, 122, 122, 0.7);\n}\n\n.switch {\n  cursor: pointer;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.switch + .switch {\n  margin-left: 0.5em;\n}\n\n.switch input[type=checkbox] {\n  display: none;\n}\n\n.switch input[type=checkbox] + .check {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: 2.75em;\n  height: 1.575em;\n  padding: 0.2em;\n  background: #b5b5b5;\n  border-radius: 1em;\n  -webkit-transition: background 150ms ease-out;\n  transition: background 150ms ease-out;\n}\n\n.switch input[type=checkbox] + .check:before {\n  content: \"\";\n  border-radius: 1em;\n  width: 1.175em;\n  height: 1.175em;\n  background: whitesmoke;\n  -webkit-box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);\n          box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);\n  -webkit-transition: width 150ms ease-out, -webkit-transform 150ms ease-out;\n  transition: width 150ms ease-out, -webkit-transform 150ms ease-out;\n  transition: transform 150ms ease-out, width 150ms ease-out;\n  transition: transform 150ms ease-out, width 150ms ease-out, -webkit-transform 150ms ease-out;\n  will-change: transform;\n}\n\n.switch input[type=checkbox] + .check.is-elastic:before {\n  width: 1.75em;\n}\n\n.switch input[type=checkbox]:checked + .check {\n  background: #7957d5;\n}\n\n.switch input[type=checkbox]:checked + .check.is-white {\n  background: white;\n}\n\n.switch input[type=checkbox]:checked + .check.is-black {\n  background: #0a0a0a;\n}\n\n.switch input[type=checkbox]:checked + .check.is-light {\n  background: whitesmoke;\n}\n\n.switch input[type=checkbox]:checked + .check.is-dark {\n  background: #363636;\n}\n\n.switch input[type=checkbox]:checked + .check.is-primary {\n  background: #7957d5;\n}\n\n.switch input[type=checkbox]:checked + .check.is-link {\n  background: #7957d5;\n}\n\n.switch input[type=checkbox]:checked + .check.is-info {\n  background: #167df0;\n}\n\n.switch input[type=checkbox]:checked + .check.is-success {\n  background: #23d160;\n}\n\n.switch input[type=checkbox]:checked + .check.is-warning {\n  background: #ffdd57;\n}\n\n.switch input[type=checkbox]:checked + .check.is-danger {\n  background: #ff3860;\n}\n\n.switch input[type=checkbox]:checked + .check:before {\n  -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0);\n}\n\n.switch input[type=checkbox]:checked + .check.is-elastic:before {\n  -webkit-transform: translate3d(36.36364%, 0, 0);\n          transform: translate3d(36.36364%, 0, 0);\n}\n\n.switch .control-label {\n  padding-left: 0.5em;\n}\n\n.switch:hover input[type=checkbox] + .check {\n  background: rgba(181, 181, 181, 0.9);\n}\n\n.switch:hover input[type=checkbox]:checked + .check {\n  background: rgba(121, 87, 213, 0.9);\n}\n\n.switch:hover input[type=checkbox]:checked + .check.is-white {\n  background: rgba(255, 255, 255, 0.9);\n}\n\n.switch:hover input[type=checkbox]:checked + .check.is-black {\n  background: rgba(10, 10, 10, 0.9);\n}\n\n.switch:hover input[type=checkbox]:checked + .check.is-light {\n  background: rgba(245, 245, 245, 0.9);\n}\n\n.switch:hover input[type=checkbox]:checked + .check.is-dark {\n  background: rgba(54, 54, 54, 0.9);\n}\n\n.switch:hover input[type=checkbox]:checked + .check.is-primary {\n  background: rgba(121, 87, 213, 0.9);\n}\n\n.switch:hover input[type=checkbox]:checked + .check.is-link {\n  background: rgba(121, 87, 213, 0.9);\n}\n\n.switch:hover input[type=checkbox]:checked + .check.is-info {\n  background: rgba(22, 125, 240, 0.9);\n}\n\n.switch:hover input[type=checkbox]:checked + .check.is-success {\n  background: rgba(35, 209, 96, 0.9);\n}\n\n.switch:hover input[type=checkbox]:checked + .check.is-warning {\n  background: rgba(255, 221, 87, 0.9);\n}\n\n.switch:hover input[type=checkbox]:checked + .check.is-danger {\n  background: rgba(255, 56, 96, 0.9);\n}\n\n.switch:focus {\n  outline: none;\n}\n\n.switch:focus input[type=checkbox] + .check {\n  -webkit-box-shadow: 0 0 0.5em rgba(122, 122, 122, 0.6);\n          box-shadow: 0 0 0.5em rgba(122, 122, 122, 0.6);\n}\n\n.switch:focus input[type=checkbox]:checked + .check {\n  -webkit-box-shadow: 0 0 0.5em rgba(121, 87, 213, 0.8);\n          box-shadow: 0 0 0.5em rgba(121, 87, 213, 0.8);\n}\n\n.switch:focus input[type=checkbox]:checked + .check.is-white {\n  -webkit-box-shadow: 0 0 0.5em rgba(255, 255, 255, 0.8);\n          box-shadow: 0 0 0.5em rgba(255, 255, 255, 0.8);\n}\n\n.switch:focus input[type=checkbox]:checked + .check.is-black {\n  -webkit-box-shadow: 0 0 0.5em rgba(10, 10, 10, 0.8);\n          box-shadow: 0 0 0.5em rgba(10, 10, 10, 0.8);\n}\n\n.switch:focus input[type=checkbox]:checked + .check.is-light {\n  -webkit-box-shadow: 0 0 0.5em rgba(245, 245, 245, 0.8);\n          box-shadow: 0 0 0.5em rgba(245, 245, 245, 0.8);\n}\n\n.switch:focus input[type=checkbox]:checked + .check.is-dark {\n  -webkit-box-shadow: 0 0 0.5em rgba(54, 54, 54, 0.8);\n          box-shadow: 0 0 0.5em rgba(54, 54, 54, 0.8);\n}\n\n.switch:focus input[type=checkbox]:checked + .check.is-primary {\n  -webkit-box-shadow: 0 0 0.5em rgba(121, 87, 213, 0.8);\n          box-shadow: 0 0 0.5em rgba(121, 87, 213, 0.8);\n}\n\n.switch:focus input[type=checkbox]:checked + .check.is-link {\n  -webkit-box-shadow: 0 0 0.5em rgba(121, 87, 213, 0.8);\n          box-shadow: 0 0 0.5em rgba(121, 87, 213, 0.8);\n}\n\n.switch:focus input[type=checkbox]:checked + .check.is-info {\n  -webkit-box-shadow: 0 0 0.5em rgba(22, 125, 240, 0.8);\n          box-shadow: 0 0 0.5em rgba(22, 125, 240, 0.8);\n}\n\n.switch:focus input[type=checkbox]:checked + .check.is-success {\n  -webkit-box-shadow: 0 0 0.5em rgba(35, 209, 96, 0.8);\n          box-shadow: 0 0 0.5em rgba(35, 209, 96, 0.8);\n}\n\n.switch:focus input[type=checkbox]:checked + .check.is-warning {\n  -webkit-box-shadow: 0 0 0.5em rgba(255, 221, 87, 0.8);\n          box-shadow: 0 0 0.5em rgba(255, 221, 87, 0.8);\n}\n\n.switch:focus input[type=checkbox]:checked + .check.is-danger {\n  -webkit-box-shadow: 0 0 0.5em rgba(255, 56, 96, 0.8);\n          box-shadow: 0 0 0.5em rgba(255, 56, 96, 0.8);\n}\n\n.switch.is-small {\n  border-radius: 2px;\n  font-size: 0.75rem;\n}\n\n.switch.is-medium {\n  font-size: 1.25rem;\n}\n\n.switch.is-large {\n  font-size: 1.5rem;\n}\n\n.switch[disabled] {\n  opacity: 0.5;\n  cursor: not-allowed;\n  color: #7a7a7a;\n}\n\n.table-wrapper .table {\n  margin-bottom: 0;\n}\n\n.table-wrapper:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n@media screen and (max-width: 1023px) {\n  .table-wrapper {\n    overflow-x: auto;\n  }\n}\n\n.b-table {\n  -webkit-transition: opacity 86ms ease-out;\n  transition: opacity 86ms ease-out;\n}\n\n@media screen and (min-width: 769px), print {\n  .b-table .table-mobile-sort {\n    display: none;\n  }\n}\n\n.b-table .icon {\n  -webkit-transition: opacity 86ms ease-out, -webkit-transform 150ms ease-out;\n  transition: opacity 86ms ease-out, -webkit-transform 150ms ease-out;\n  transition: transform 150ms ease-out, opacity 86ms ease-out;\n  transition: transform 150ms ease-out, opacity 86ms ease-out, -webkit-transform 150ms ease-out;\n}\n\n.b-table .icon.is-desc {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.b-table .icon.is-expanded {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.b-table .table {\n  width: 100%;\n  border: 1px solid transparent;\n  border-radius: 3px;\n  border-collapse: separate;\n}\n\n.b-table .table th {\n  font-weight: 600;\n}\n\n.b-table .table th .th-wrap {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.b-table .table th .th-wrap .icon {\n  margin-left: 0.5rem;\n  margin-right: 0;\n  font-size: 1rem;\n}\n\n.b-table .table th .th-wrap.is-numeric {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: reverse;\n      -ms-flex-direction: row-reverse;\n          flex-direction: row-reverse;\n  text-align: right;\n}\n\n.b-table .table th .th-wrap.is-numeric .icon {\n  margin-left: 0;\n  margin-right: 0.5rem;\n}\n\n.b-table .table th .th-wrap.is-centered {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  text-align: center;\n}\n\n.b-table .table th.is-current-sort {\n  border-color: #7a7a7a;\n  font-weight: 700;\n}\n\n.b-table .table th.is-sortable:hover {\n  border-color: #7a7a7a;\n}\n\n.b-table .table th.is-sortable,\n.b-table .table th.is-sortable .th-wrap {\n  cursor: pointer;\n}\n\n.b-table .table tr.is-selected .checkbox input:checked + .check {\n  background: white url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath style='fill:%237957d5' d='M 0.04038059,0.6267767 0.14644661,0.52071068 0.42928932,0.80355339 0.3232233,0.90961941 z M 0.21715729,0.80355339 0.85355339,0.16715729 0.95961941,0.2732233 0.3232233,0.90961941 z'%3E%3C/path%3E%3C/svg%3E\") no-repeat center center;\n}\n\n.b-table .table tr.is-selected .checkbox input + .check {\n  border-color: white;\n}\n\n.b-table .table tr.is-empty:hover {\n  background-color: transparent;\n}\n\n.b-table .table .checkbox-cell {\n  width: 40px;\n}\n\n.b-table .table .checkbox-cell .checkbox {\n  vertical-align: middle;\n}\n\n.b-table .table .checkbox-cell .checkbox .check {\n  -webkit-transition: none;\n  transition: none;\n}\n\n.b-table .table tr.detail {\n  -webkit-box-shadow: inset 0 1px 3px #dbdbdb;\n          box-shadow: inset 0 1px 3px #dbdbdb;\n  background: #fafafa;\n}\n\n.b-table .table tr.detail .detail-container {\n  padding: 1rem;\n}\n\n.b-table .table:focus {\n  border-color: #7957d5;\n  -webkit-box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n          box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);\n}\n\n.b-table .table.is-bordered th.is-current-sort,\n.b-table .table.is-bordered th.is-sortable:hover {\n  border-color: #dbdbdb;\n  background: whitesmoke;\n}\n\n@media screen and (max-width: 768px) {\n  .b-table .table.has-mobile-cards thead {\n    display: none;\n  }\n  .b-table .table.has-mobile-cards tfoot th {\n    border: 0;\n    display: inherit;\n  }\n  .b-table .table.has-mobile-cards tr {\n    -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n            box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n    max-width: 100%;\n    position: relative;\n    display: block;\n  }\n  .b-table .table.has-mobile-cards tr td {\n    border: 0;\n    display: inherit;\n  }\n  .b-table .table.has-mobile-cards tr td:last-child {\n    border-bottom: 0;\n  }\n  .b-table .table.has-mobile-cards tr:not(:last-child) {\n    margin-bottom: 1rem;\n  }\n  .b-table .table.has-mobile-cards tr:not([class*=\"is-\"]) {\n    background: inherit;\n  }\n  .b-table .table.has-mobile-cards tr:not([class*=\"is-\"]):hover {\n    background-color: inherit;\n  }\n  .b-table .table.has-mobile-cards tr.detail {\n    margin-top: -1rem;\n  }\n  .b-table .table.has-mobile-cards tr:not(.detail):not(.is-empty):not(.table-footer) td {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    width: auto;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    text-align: right;\n    border-bottom: 1px solid whitesmoke;\n  }\n  .b-table .table.has-mobile-cards tr:not(.detail):not(.is-empty):not(.table-footer) td:before {\n    content: attr(data-label);\n    font-weight: 600;\n    margin-right: auto;\n    padding-right: 0.5em;\n    text-align: left;\n  }\n}\n\n.b-table .level {\n  padding-bottom: 1.5rem;\n}\n\n.b-table.is-loading {\n  position: relative;\n  pointer-events: none;\n  opacity: 0.5;\n}\n\n.b-table.is-loading:after {\n  -webkit-animation: spinAround 500ms infinite linear;\n          animation: spinAround 500ms infinite linear;\n  border: 2px solid #dbdbdb;\n  border-radius: 290486px;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  content: \"\";\n  display: block;\n  height: 1em;\n  position: relative;\n  width: 1em;\n  position: absolute;\n  top: 4em;\n  left: calc(50% - 2.5em);\n  width: 5em;\n  height: 5em;\n  border-width: 0.25em;\n}\n\n.b-tabs .tabs {\n  margin-bottom: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.b-tabs .is-disabled {\n  pointer-events: none;\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n\n.b-tabs .tab-content {\n  position: relative;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding: 1rem;\n}\n\n.b-tabs .tab-content .tab-item {\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -ms-flex-preferred-size: auto;\n      flex-basis: auto;\n}\n\n.b-tabs:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.b-tabs.is-fullwidth {\n  width: 100%;\n}\n\n.tag .delete {\n  margin-left: 0.25rem !important;\n  margin-right: -0.25rem !important;\n}\n\n.tag .delete[disabled] {\n  pointer-events: none;\n}\n\n.taginput .taginput-container.is-focusable {\n  padding-bottom: 0;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  height: auto;\n  cursor: text;\n}\n\n.taginput .taginput-container > .tag,\n.taginput .taginput-container > .tags {\n  margin-bottom: calc(0.375em - 1px);\n  font-size: 0.9em;\n  height: 2.25em;\n}\n\n.taginput .taginput-container > .tag .tag,\n.taginput .taginput-container > .tags .tag {\n  margin-bottom: 0;\n  font-size: 0.9em;\n  height: 2.25em;\n}\n\n.taginput .taginput-container > .tag:not(:last-child),\n.taginput .taginput-container > .tags:not(:last-child) {\n  margin-right: 0.375rem;\n}\n\n.taginput .taginput-container .autocomplete {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n\n.taginput .taginput-container .autocomplete input {\n  height: 2em;\n  margin-bottom: calc(0.375em - 1px);\n  padding-top: 0;\n  padding-bottom: 0;\n  border: none;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  min-width: 10em;\n}\n\n.taginput .taginput-container .autocomplete input:focus {\n  -webkit-box-shadow: none !important;\n          box-shadow: none !important;\n}\n\n.timepicker .dropdown,\n.timepicker .dropdown-trigger {\n  width: 100%;\n}\n\n.timepicker .dropdown-item, .timepicker .dropdown .dropdown-menu .has-link a, .dropdown .dropdown-menu .has-link .timepicker a {\n  font-size: inherit;\n}\n\n.timepicker .timepicker-footer {\n  padding-top: 0.875rem;\n}\n\n.timepicker .control .select {\n  font-size: 2.5rem;\n}\n\n.timepicker .control .select select {\n  font-weight: 600;\n  padding-right: calc(0.625em - 1px);\n}\n\n.timepicker .control .select select option {\n  font-size: 1.5rem;\n}\n\n.timepicker .control .select select option:disabled {\n  color: rgba(122, 122, 122, 0.7);\n}\n\n.timepicker .control .select:after {\n  display: none;\n}\n\n.timepicker .control:nth-child(1) .select select {\n  border-right: none;\n}\n\n.timepicker .control:nth-child(1) .select:before {\n  content: \":\";\n  color: #b5b5b5;\n  display: inline-block;\n  position: absolute;\n  z-index: 6;\n  font-size: 3rem;\n  right: -0.325rem;\n  top: 0.25rem;\n}\n\n.timepicker .control:nth-child(2) .select select {\n  border-left: none;\n}\n\n.timepicker.is-small {\n  border-radius: 2px;\n  font-size: 0.75rem;\n}\n\n.timepicker.is-medium {\n  font-size: 1.25rem;\n}\n\n.timepicker.is-large {\n  font-size: 1.5rem;\n}\n\n.tooltip {\n  position: relative;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n}\n\n.tooltip.is-top:before, .tooltip.is-top:after {\n  top: auto;\n  right: auto;\n  bottom: calc(100% + 5px + 2px);\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n}\n\n.tooltip.is-top.is-white:before {\n  border-top: 5px solid white;\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  bottom: calc(100% + 2px);\n}\n\n.tooltip.is-top.is-black:before {\n  border-top: 5px solid #0a0a0a;\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  bottom: calc(100% + 2px);\n}\n\n.tooltip.is-top.is-light:before {\n  border-top: 5px solid whitesmoke;\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  bottom: calc(100% + 2px);\n}\n\n.tooltip.is-top.is-dark:before {\n  border-top: 5px solid #363636;\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  bottom: calc(100% + 2px);\n}\n\n.tooltip.is-top.is-primary:before {\n  border-top: 5px solid #7957d5;\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  bottom: calc(100% + 2px);\n}\n\n.tooltip.is-top.is-link:before {\n  border-top: 5px solid #7957d5;\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  bottom: calc(100% + 2px);\n}\n\n.tooltip.is-top.is-info:before {\n  border-top: 5px solid #167df0;\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  bottom: calc(100% + 2px);\n}\n\n.tooltip.is-top.is-success:before {\n  border-top: 5px solid #23d160;\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  bottom: calc(100% + 2px);\n}\n\n.tooltip.is-top.is-warning:before {\n  border-top: 5px solid #ffdd57;\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  bottom: calc(100% + 2px);\n}\n\n.tooltip.is-top.is-danger:before {\n  border-top: 5px solid #ff3860;\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  bottom: calc(100% + 2px);\n}\n\n.tooltip.is-top.is-multiline.is-small:after {\n  width: 180px;\n}\n\n.tooltip.is-top.is-multiline.is-medium:after {\n  width: 240px;\n}\n\n.tooltip.is-top.is-multiline.is-large:after {\n  width: 300px;\n}\n\n.tooltip.is-right:before, .tooltip.is-right:after {\n  top: 50%;\n  right: auto;\n  bottom: auto;\n  left: calc(100% + 5px + 2px);\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n\n.tooltip.is-right.is-white:before {\n  border-top: 5px solid transparent;\n  border-right: 5px solid white;\n  border-bottom: 5px solid transparent;\n  left: calc(100% + 2px);\n}\n\n.tooltip.is-right.is-black:before {\n  border-top: 5px solid transparent;\n  border-right: 5px solid #0a0a0a;\n  border-bottom: 5px solid transparent;\n  left: calc(100% + 2px);\n}\n\n.tooltip.is-right.is-light:before {\n  border-top: 5px solid transparent;\n  border-right: 5px solid whitesmoke;\n  border-bottom: 5px solid transparent;\n  left: calc(100% + 2px);\n}\n\n.tooltip.is-right.is-dark:before {\n  border-top: 5px solid transparent;\n  border-right: 5px solid #363636;\n  border-bottom: 5px solid transparent;\n  left: calc(100% + 2px);\n}\n\n.tooltip.is-right.is-primary:before {\n  border-top: 5px solid transparent;\n  border-right: 5px solid #7957d5;\n  border-bottom: 5px solid transparent;\n  left: calc(100% + 2px);\n}\n\n.tooltip.is-right.is-link:before {\n  border-top: 5px solid transparent;\n  border-right: 5px solid #7957d5;\n  border-bottom: 5px solid transparent;\n  left: calc(100% + 2px);\n}\n\n.tooltip.is-right.is-info:before {\n  border-top: 5px solid transparent;\n  border-right: 5px solid #167df0;\n  border-bottom: 5px solid transparent;\n  left: calc(100% + 2px);\n}\n\n.tooltip.is-right.is-success:before {\n  border-top: 5px solid transparent;\n  border-right: 5px solid #23d160;\n  border-bottom: 5px solid transparent;\n  left: calc(100% + 2px);\n}\n\n.tooltip.is-right.is-warning:before {\n  border-top: 5px solid transparent;\n  border-right: 5px solid #ffdd57;\n  border-bottom: 5px solid transparent;\n  left: calc(100% + 2px);\n}\n\n.tooltip.is-right.is-danger:before {\n  border-top: 5px solid transparent;\n  border-right: 5px solid #ff3860;\n  border-bottom: 5px solid transparent;\n  left: calc(100% + 2px);\n}\n\n.tooltip.is-right.is-multiline.is-small:after {\n  width: 180px;\n}\n\n.tooltip.is-right.is-multiline.is-medium:after {\n  width: 240px;\n}\n\n.tooltip.is-right.is-multiline.is-large:after {\n  width: 300px;\n}\n\n.tooltip.is-bottom:before, .tooltip.is-bottom:after {\n  top: calc(100% + 5px + 2px);\n  right: auto;\n  bottom: auto;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n}\n\n.tooltip.is-bottom.is-white:before {\n  border-right: 5px solid transparent;\n  border-bottom: 5px solid white;\n  border-left: 5px solid transparent;\n  top: calc(100% + 2px);\n}\n\n.tooltip.is-bottom.is-black:before {\n  border-right: 5px solid transparent;\n  border-bottom: 5px solid #0a0a0a;\n  border-left: 5px solid transparent;\n  top: calc(100% + 2px);\n}\n\n.tooltip.is-bottom.is-light:before {\n  border-right: 5px solid transparent;\n  border-bottom: 5px solid whitesmoke;\n  border-left: 5px solid transparent;\n  top: calc(100% + 2px);\n}\n\n.tooltip.is-bottom.is-dark:before {\n  border-right: 5px solid transparent;\n  border-bottom: 5px solid #363636;\n  border-left: 5px solid transparent;\n  top: calc(100% + 2px);\n}\n\n.tooltip.is-bottom.is-primary:before {\n  border-right: 5px solid transparent;\n  border-bottom: 5px solid #7957d5;\n  border-left: 5px solid transparent;\n  top: calc(100% + 2px);\n}\n\n.tooltip.is-bottom.is-link:before {\n  border-right: 5px solid transparent;\n  border-bottom: 5px solid #7957d5;\n  border-left: 5px solid transparent;\n  top: calc(100% + 2px);\n}\n\n.tooltip.is-bottom.is-info:before {\n  border-right: 5px solid transparent;\n  border-bottom: 5px solid #167df0;\n  border-left: 5px solid transparent;\n  top: calc(100% + 2px);\n}\n\n.tooltip.is-bottom.is-success:before {\n  border-right: 5px solid transparent;\n  border-bottom: 5px solid #23d160;\n  border-left: 5px solid transparent;\n  top: calc(100% + 2px);\n}\n\n.tooltip.is-bottom.is-warning:before {\n  border-right: 5px solid transparent;\n  border-bottom: 5px solid #ffdd57;\n  border-left: 5px solid transparent;\n  top: calc(100% + 2px);\n}\n\n.tooltip.is-bottom.is-danger:before {\n  border-right: 5px solid transparent;\n  border-bottom: 5px solid #ff3860;\n  border-left: 5px solid transparent;\n  top: calc(100% + 2px);\n}\n\n.tooltip.is-bottom.is-multiline.is-small:after {\n  width: 180px;\n}\n\n.tooltip.is-bottom.is-multiline.is-medium:after {\n  width: 240px;\n}\n\n.tooltip.is-bottom.is-multiline.is-large:after {\n  width: 300px;\n}\n\n.tooltip.is-left:before, .tooltip.is-left:after {\n  top: 50%;\n  right: calc(100% + 5px + 2px);\n  bottom: auto;\n  left: auto;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n\n.tooltip.is-left.is-white:before {\n  border-top: 5px solid transparent;\n  border-bottom: 5px solid transparent;\n  border-left: 5px solid white;\n  right: calc(100% + 2px);\n}\n\n.tooltip.is-left.is-black:before {\n  border-top: 5px solid transparent;\n  border-bottom: 5px solid transparent;\n  border-left: 5px solid #0a0a0a;\n  right: calc(100% + 2px);\n}\n\n.tooltip.is-left.is-light:before {\n  border-top: 5px solid transparent;\n  border-bottom: 5px solid transparent;\n  border-left: 5px solid whitesmoke;\n  right: calc(100% + 2px);\n}\n\n.tooltip.is-left.is-dark:before {\n  border-top: 5px solid transparent;\n  border-bottom: 5px solid transparent;\n  border-left: 5px solid #363636;\n  right: calc(100% + 2px);\n}\n\n.tooltip.is-left.is-primary:before {\n  border-top: 5px solid transparent;\n  border-bottom: 5px solid transparent;\n  border-left: 5px solid #7957d5;\n  right: calc(100% + 2px);\n}\n\n.tooltip.is-left.is-link:before {\n  border-top: 5px solid transparent;\n  border-bottom: 5px solid transparent;\n  border-left: 5px solid #7957d5;\n  right: calc(100% + 2px);\n}\n\n.tooltip.is-left.is-info:before {\n  border-top: 5px solid transparent;\n  border-bottom: 5px solid transparent;\n  border-left: 5px solid #167df0;\n  right: calc(100% + 2px);\n}\n\n.tooltip.is-left.is-success:before {\n  border-top: 5px solid transparent;\n  border-bottom: 5px solid transparent;\n  border-left: 5px solid #23d160;\n  right: calc(100% + 2px);\n}\n\n.tooltip.is-left.is-warning:before {\n  border-top: 5px solid transparent;\n  border-bottom: 5px solid transparent;\n  border-left: 5px solid #ffdd57;\n  right: calc(100% + 2px);\n}\n\n.tooltip.is-left.is-danger:before {\n  border-top: 5px solid transparent;\n  border-bottom: 5px solid transparent;\n  border-left: 5px solid #ff3860;\n  right: calc(100% + 2px);\n}\n\n.tooltip.is-left.is-multiline.is-small:after {\n  width: 180px;\n}\n\n.tooltip.is-left.is-multiline.is-medium:after {\n  width: 240px;\n}\n\n.tooltip.is-left.is-multiline.is-large:after {\n  width: 300px;\n}\n\n.tooltip:before, .tooltip:after {\n  position: absolute;\n  content: \"\";\n  opacity: 0;\n  visibility: hidden;\n  pointer-events: none;\n}\n\n.tooltip:before {\n  z-index: 889;\n}\n\n.tooltip:after {\n  content: attr(data-label);\n  width: auto;\n  padding: 0.35rem 0.75rem;\n  border-radius: 5px;\n  font-size: 0.85rem;\n  font-weight: 400;\n  -webkit-box-shadow: 0px 1px 2px 1px rgba(0, 1, 0, 0.2);\n          box-shadow: 0px 1px 2px 1px rgba(0, 1, 0, 0.2);\n  z-index: 888;\n  white-space: nowrap;\n}\n\n.tooltip:not([data-label=\"\"]):hover:before, .tooltip:not([data-label=\"\"]):hover:after {\n  opacity: 1;\n  visibility: visible;\n}\n\n.tooltip.is-white:after {\n  background: white;\n  color: #0a0a0a;\n}\n\n.tooltip.is-black:after {\n  background: #0a0a0a;\n  color: white;\n}\n\n.tooltip.is-light:after {\n  background: whitesmoke;\n  color: #363636;\n}\n\n.tooltip.is-dark:after {\n  background: #363636;\n  color: whitesmoke;\n}\n\n.tooltip.is-primary:after {\n  background: #7957d5;\n  color: white;\n}\n\n.tooltip.is-link:after {\n  background: #7957d5;\n  color: white;\n}\n\n.tooltip.is-info:after {\n  background: #167df0;\n  color: #fff;\n}\n\n.tooltip.is-success:after {\n  background: #23d160;\n  color: #fff;\n}\n\n.tooltip.is-warning:after {\n  background: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.tooltip.is-danger:after {\n  background: #ff3860;\n  color: #fff;\n}\n\n.tooltip:not([data-label=\"\"]).is-always:before, .tooltip:not([data-label=\"\"]).is-always:after {\n  opacity: 1;\n  visibility: visible;\n}\n\n.tooltip.is-multiline:after {\n  display: flex-block;\n  text-align: center;\n  white-space: normal;\n}\n\n.tooltip.is-dashed {\n  border-bottom: 1px dashed #b5b5b5;\n  cursor: default;\n}\n\n.tooltip.is-square:after {\n  border-radius: 0;\n}\n\n.tooltip.is-animated:before, .tooltip.is-animated:after {\n  -webkit-transition: opacity 86ms ease-out, visibility 86ms ease-out;\n  transition: opacity 86ms ease-out, visibility 86ms ease-out;\n}\n\n.upload {\n  position: relative;\n}\n\n.upload input[type=file] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  opacity: 0;\n  outline: none;\n}\n\n.upload .upload-draggable {\n  display: inline-block;\n  cursor: pointer;\n  padding: 0.25em;\n  border: 1px dashed #b5b5b5;\n  border-radius: 5px;\n}\n\n.upload .upload-draggable.is-disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.upload .upload-draggable.is-loading {\n  position: relative;\n  pointer-events: none;\n  opacity: 0.5;\n}\n\n.upload .upload-draggable.is-loading:after {\n  -webkit-animation: spinAround 500ms infinite linear;\n          animation: spinAround 500ms infinite linear;\n  border: 2px solid #dbdbdb;\n  border-radius: 290486px;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  content: \"\";\n  display: block;\n  height: 1em;\n  position: relative;\n  width: 1em;\n  top: 0;\n  left: calc(50% - 1.5em);\n  width: 3em;\n  height: 3em;\n  border-width: 0.25em;\n}\n\n.upload .upload-draggable:hover.is-white, .upload .upload-draggable.is-hovered.is-white {\n  border-color: white;\n  background: rgba(255, 255, 255, 0.05);\n}\n\n.upload .upload-draggable:hover.is-black, .upload .upload-draggable.is-hovered.is-black {\n  border-color: #0a0a0a;\n  background: rgba(10, 10, 10, 0.05);\n}\n\n.upload .upload-draggable:hover.is-light, .upload .upload-draggable.is-hovered.is-light {\n  border-color: whitesmoke;\n  background: rgba(245, 245, 245, 0.05);\n}\n\n.upload .upload-draggable:hover.is-dark, .upload .upload-draggable.is-hovered.is-dark {\n  border-color: #363636;\n  background: rgba(54, 54, 54, 0.05);\n}\n\n.upload .upload-draggable:hover.is-primary, .upload .upload-draggable.is-hovered.is-primary {\n  border-color: #7957d5;\n  background: rgba(121, 87, 213, 0.05);\n}\n\n.upload .upload-draggable:hover.is-link, .upload .upload-draggable.is-hovered.is-link {\n  border-color: #7957d5;\n  background: rgba(121, 87, 213, 0.05);\n}\n\n.upload .upload-draggable:hover.is-info, .upload .upload-draggable.is-hovered.is-info {\n  border-color: #167df0;\n  background: rgba(22, 125, 240, 0.05);\n}\n\n.upload .upload-draggable:hover.is-success, .upload .upload-draggable.is-hovered.is-success {\n  border-color: #23d160;\n  background: rgba(35, 209, 96, 0.05);\n}\n\n.upload .upload-draggable:hover.is-warning, .upload .upload-draggable.is-hovered.is-warning {\n  border-color: #ffdd57;\n  background: rgba(255, 221, 87, 0.05);\n}\n\n.upload .upload-draggable:hover.is-danger, .upload .upload-draggable.is-hovered.is-danger {\n  border-color: #ff3860;\n  background: rgba(255, 56, 96, 0.05);\n}", ""]);

// exports


/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)))

/***/ })

/******/ });