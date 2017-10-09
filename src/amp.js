/**
 * amp
 * A collection of handy utilities.
 * https://github.com/oldrivercreative/amp
 */
const amp = {
  // Array utilities
  array: {
    /**
     * Move an item within an array
     * @param  {Array}  array - Array to modify
     * @param  {Number} from - Previous index position
     * @param  {Number} to - New index position
     * @return {Array}
     */
    move(array, from, to) {
      const el = array.splice(from, 1)[0];
      array.splice(to, 0, el);
      return array;
    },

    /**
     * Get unique items from an array
     * @param  {Array} arr
     * @return {Array}
     */
    unique(arr) {
      // eslint-disable-next-line no-shadow
      return arr.filter((elem, pos, arr) => arr.indexOf(elem) === pos);
    },
  },

  // HTML utilities
  html: {
    /**
     * Get the closest matching DOM parent by CSS selector
     * @param  {Object} start - DOM element from which to start search
     * @param  {String} selector - CSS selector
     * @return {HTMLElement}
     */
    closest(start, selector) {
      let el = start;
      let parent;
      while (el) {
        parent = el.parentElement;
        if (parent && amp.html.matches(parent, selector)) return parent;
        el = parent;
      }
      return null;
    },

    /**
     * Does this DOM element match the provided CSS selector?
     * @param  {Object}  el - DOM element for comparison
     * @param  {String}  selector - CSS selector
     * @return {Boolean}
     */
    matches(el, selector) {
      return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
    },
  },

  // Object utilities
  object: {
    /**
     * Get or set object value by key path
     * @param  {Object} search - Object to search
     * @param  {String} path - Search key path ('parent.child.grandchild')
     * @param  {Object} value - Set target object to this value instead of getting value
     * @return {Object}
     */
    byPath(search, path, value) {
      const obj = search;
      if (typeof path === 'string') return amp.object.byPath(obj, path.split('.'), value);
      else if (path.length === 1 && value !== undefined) {
        obj[path[0]] = value;
        return obj;
      } else if (path.length === 0) return obj;
      return amp.object.byPath(obj[path[0]], path.slice(1), value);
    },

    /**
     * Clone the given object
     * @param  {Object} obj
     * @return {Object}
     */
    clone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Compare two objects for equality
     * @param  {Object}  a
     * @param  {Object}  b
     * @return {Boolean}
     */
    equal(a, b) {
      return JSON.stringify(a) === JSON.stringify(b);
    },

    /**
     * Is this an object?
     * @param  {Object} el
     * @return {Boolean}
     */
    is(el) {
      return el && typeof (el) === 'object' && !Array.isArray(el);
    },

    /**
     * Deep merge two or more objects
     * @param  {Object} target - Properties will be copied into this object
     * @param  {Object} sources - One or more objects to merge into the target
     * @return {Object}
     */
    merge(target, ...sources) {
      if (!sources.length) return target;
      const source = sources.shift();
      if (amp.object.is(target) && amp.object.is(source)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const key in source) {
          if (amp.object.is(source[key])) {
            if (!target[key]) Object.assign(target, { [key]: {} });
            amp.object.merge(target[key], source[key]);
          } else {
            Object.assign(target, { [key]: source[key] });
          }
        }
      }
      return amp.object.merge(target, ...sources);
    },

    /**
     * Build a configuration object with default values
     * @param  {Object} defaultConfig
     * @param  {Object} config
     * @return {Object}
     */
    options(defaultConfig = {}, config = {}) {
      return amp.object.merge({}, defaultConfig, config);
    },
  },

  // Options (synonym)
  options: (defaultConfig = {}, config = {}) => amp.object.options(defaultConfig, config),

  // Query string utilities
  queryString: {
    /**
     * Parse query string for given parameter value
     * @param  {String} uri
     * @param  {String} key
     * @return {String}
     */
    get(uri, key) {
      // eslint-disable-next-line no-useless-escape
      const param = key.replace(/[\[\]]/g, '\\$&');
      const regex = new RegExp(`[?&]${param}(=([^&#]*)|&|#|$)`);
      const results = regex.exec(uri);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },

    /**
     * Update query string parameter value
     * @param  {String} uri
     * @param  {String} key
     * @param  {String} value
     * @return {String}
     */
    set(uri, key, value) {
      const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
      const separator = uri.indexOf('?') !== -1 ? '&' : '?';
      if (uri.match(re)) return uri.replace(re, `$1${key}=${value}$2`);
      return `${uri}${separator}${key}=${value}`;
    },
  },

  // String utilities
  string: {
    /**
     * Slugify the given string
     * @param  {String} str
     * @return {String}
     */
    slug(str = '') {
      return str.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    },

    /**
     * Transform a string to title case
     * @param  {String} str
     * @return {String}
     */
    titleCase(str) {
      return str.replace(/\w\S*/g, txt => `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`);
    },

    /**
     * Trim slashes from a string or path
     * @param  {String} path
     * @return {String}
     */
    trimSlashes(path = '') {
      return path.replace(/^\/|\/$/g, '');
    },
  },
};

module.exports = amp;
