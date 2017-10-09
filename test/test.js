const amp = require('../src/amp');
const assert = require('assert');

describe('array', () => {
  describe('move()', () => {
    it('should reorder the array', () => {
      assert.equal([3, 1, 2].toString(), amp.array.move([1, 2, 3], 2, 0).toString());
    });
  });
  describe('unique()', () => {
    it('should filter unique array items', () => {
      assert.equal([1, 2].toString(), amp.array.unique([1, 2, 2]).toString());
    });
  });
});

describe('object', () => {
  describe('byPath()', () => {
    it('should get value by dot notation', () => {
      assert.equal('Hello', amp.object.byPath({ say: { hello: 'Hello' } }, 'say.hello'));
    });
    it('should set value by dot notation', () => {
      assert.equal({ hello: 'Hola' }.toString(), amp.object.byPath({ say: { hello: 'Hello' } }, 'say.hello', 'Hola'));
    });
  });
  describe('clone()', () => {
    it('should return a cloned object', () => {
      const a = { a: 'A' };
      assert.equal(a.toString(), amp.object.clone(a).toString());
    });
  });
  describe('equal()', () => {
    it('should return true', () => {
      const a = { a: 'A' };
      const b = { b: 'B' };
      assert.equal(true, amp.object.equal(a, a));
    });
    it('should return false', () => {
      const a = { a: 'A' };
      const b = { b: 'B' };
      assert.equal(false, amp.object.equal(a, b));
    });
  });
  describe('is()', () => {
    it('should return true', () => {
      assert.equal(true, amp.object.is({}));
    });
    it('should return false', () => {
      assert.equal(false, amp.object.is('a string'));
    });
  });
  describe('merge()', () => {
    it('should return merged object', () => {
      assert.equal({ a: 1, b: 2 }.toString(), amp.object.merge({ a: 1 }, { b: 2 }).toString());
    });
  });
  describe('options()', () => {
    it('should return options object', () => {
      assert.equal({ a: 3, b: 2 }.toString(), amp.object.options({ a: 1 }, { a: 3, b: 2 }).toString());
    });
    it('synonym should return options object', () => {
      assert.equal({ a: 3, b: 2 }.toString(), amp.options({ a: 1 }, { a: 3, b: 2 }).toString());
    });
  });
});

describe('queryString', () => {
  describe('get()', () => {
    it('should return string value', () => {
      assert.equal('1', amp.queryString.get('?a=1&b=2', 'a'));
    });
    it('should return appended string value', () => {
      assert.equal('2', amp.queryString.get('?a=1&b=2', 'b'));
    });
  });
  describe('set()', () => {
    it('should return updated uri string', () => {
      assert.equal('?a=2', amp.queryString.set('?a=1', 'a', '2'));
    });
    it('should return updated uri string with appended parameter', () => {
      assert.equal('?a=1&b=2', amp.queryString.set('?a=1', 'b', '2'));
    });
  });
});

describe('string', () => {
  describe('slug()', () => {
    it('should return slugged string', () => {
      assert.equal('pomp-circumstance', amp.string.slug('Pomp & Circumstance'));
    });
  });
  describe('titleCase()', () => {
    it('should return title case string', () => {
      assert.equal('Eine Kleine Nachtmusik', amp.string.titleCase('eine kleine nachtmusik'));
    });
  });
  describe('trimSlashes()', () => {
    it('should return trimmed path string', () => {
      assert.equal('dogs/moby/fetch', amp.string.trimSlashes('/dogs/moby/fetch/'));
    });
  });
});
