module.exports = {
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
      return array.splice(to, 0, array.splice(from, 1)[0]);
    },

    /**
     * Get unique items from given array
     * @param  {Array} arr
     * @return {Array}
     */
    unique(arr) {
      // eslint-disable-next-line no-shadow
      return arr.filter((elem, pos, arr) => arr.indexOf(elem) === pos);
    },
  },

  // DOM utilities
  dom: {
    /**
     * Closest DOM parent by CSS selector
     * @param  {Object} start - DOM element from which to start search
     * @param  {String} selector - CSS selector
     * @return {Object}
     */
    closest(start, selector) {
      let el = start;
      let parent;
      while (el) {
        parent = el.parentElement;
        if (parent && this.dom.matches(parent, selector)) return parent;
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

  // Environment utilities
  env: {
    /**
     * Is application in development mode?
     * @return {Boolean}
     */
    dev() {
      return process.env.NODE_ENV === 'development';
    },
  },

  // Object utilities
  object: {
    /**
     * Get object by string path
     * @param  {Object} search - Object to search
     * @param  {String} path - Search key path ('parent.child.grandchild')
     * @param  {Object} value - Set target object to this value instead of getting value
     * @return {Object}
     */
    byPath(search, path, value) {
      const obj = search;
      if (typeof path === 'string') return this.object.byPath(obj, path.split('.'), value);
      // eslint-disable-next-line no-return-assign
      else if (path.length === 1 && value !== undefined) return obj[path[0]] = value;
      else if (path.length === 0) return obj;
      return this.object.byPath(obj[path[0]], path.slice(1), value);
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
     * Compare objects for equality
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
     * Deep merge objects
     * @param  {Object} target - Properties will be copied into this object
     * @param  {Object} sources - One or more objects to merge into the target
     * @return {Object}
     */
    merge(target, ...sources) {
      if (!sources.length) return target;
      const source = sources.shift();
      if (this.object.is(target) && this.object.is(source)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const key in source) {
          if (this.object.is(source[key])) {
            if (!target[key]) Object.assign(target, { [key]: {} });
            this.object.merge(target[key], source[key]);
          } else {
            Object.assign(target, { [key]: source[key] });
          }
        }
      }
      return this.object.merge(target, ...sources);
    },

    /**
     * Build configuration object with default values
     * @param  {Object} defaultConfig
     * @param  {Object} config
     * @return {Object}
     */
    options(defaultConfig = {}, config = {}) {
      return this.object.merge({}, defaultConfig, config);
    },
  },

  // Query string utilities
  queryString: {
    /**
     * Parse query string URL for given parameter value
     * @param  {String} name
     * @param  {String} url
     * @return {String}
     */
    parse(name, url) {
      // eslint-disable-next-line no-useless-escape
      const param = name.replace(/[\[\]]/g, '\\$&');
      const regex = new RegExp(`[?&]${param}(=([^&#]*)|&|#|$)`);
      const results = regex.exec(url);
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
    update(uri, key, value) {
      const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
      const separator = uri.indexOf('?') !== -1 ? '&' : '?';
      if (uri.match(re)) return uri.replace(re, `$1${key}=${value}$2`);
      return `${uri}${separator}${key}=${value}`;
    },
  },

  // Sort utilities
  sort: {
    /**
     * Naturally sort strings with numbers ([1, 10, 2, 20] => [1, 2, 10, 20])
     * @param  {String}  a
     * @param  {String}  b
     * @return {Integer}
     */
    natural(a, b) {
      if (a.indexOf('1/2 ') === 0) return -1;
      else if (b.indexOf('1/2 ') === 0) return 1;
      const ax = [];
      const bx = [];
      a.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
        ax.push([$1 || Infinity, $2 || '']);
      });
      b.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
        bx.push([$1 || Infinity, $2 || '']);
      });
      while (ax.length && bx.length) {
        const an = ax.shift();
        const bn = bx.shift();
        const nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
        if (nn) return nn;
      }
      return ax.length - bx.length;
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
     * Return title case of string
     * @param  {String} str
     * @return {String}
     */
    titleCase(str) {
      return str.replace(/\w\S*/g, txt => `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`);
    },

    /**
     * Trim slashes on path
     * @param  {String} path
     * @return {String}
     */
    trimSlashes(path = '') {
      return path.replace(/^\/|\/$/g, '');
    },
  },
};
