# amp
A collection of handy utilities.


## Installation
```sh
npm install amp-utils
```


## Usage
```js
const amp = require('amp-utils');

amp.string.slug('This string will be slugged.');
```


## Array Utilities
### `amp.array.move(array, from, to)`
Move an item within an array. Returns `Array`.

#### Configuration
- `array`: The target `Array`
- `from`: The old `Integer` index of the array item
- `to`: The new `Integer` index of the array item

#### Examples
```js
const breakfast = [
  'eggs',
  'toast',
  'bacon',
];

amp.array.move(breakfast, 2, 0); // ['bacon', 'eggs', 'toast']
```

### `amp.array.unique(array)`
Get unique items from an array. Returns `Array`.

#### Configuration
- `array`: The target `Array`

#### Examples
```js
amp.array.unique(['a', 'a', 'b', 'c', 'c']); // ['a', 'b', 'c']
```


## HTML Utilities
### `amp.html.closest(start, selector)`
Get the closest matching HTML element parent by CSS selector. Returns `HTMLElement` or `null` (if no matching parent is found).

#### Configuration
- `start`: The starting `HTMLElement`
- `selector`: A valid CSS selector `String` for matching parent elements

#### Examples
```js
amp.html.closest(document.getElementById('menu'), '.menu-container');
```

### `amp.html.matches(el, selector)`
Does this DOM element match the provided CSS selector? Returns `Boolean`.

#### Configuration
- `el`: The `HTMLElement` for comparison
- `selector`: A valid CSS selector `String` for matching

#### Examples
```js
amp.html.matches(document.getElementById('menu'), '.menu');
```


## Object Utilities
### `amp.object.byPath(search, path, value)`
Get or set object value by key path. Returns `Object` or `null` if the target object is not found.

#### Configuration
- `search`: The `Object` that will be searched
- `path`: The `String` path to the target object or value in dot notation (for example, 'parent.child.grandchild')
- `value`: Set target object to this value instead of getting its value

#### Examples
```js
const ride = {
  type: 'Truck',
  wheels: 4,
  passengers: {
    driver: {
      name: 'Edith',
      age: 30,
    },
    shotgun: {
      name: 'Edmund',
      age: 29,
    }
  },
};

amp.object.byPath(ride, 'type'); // 'Truck'

amp.object.byPath(ride, 'passengers.driver.name'); // 'Edith'

amp.object.byPath(ride, 'passengers.shotgun.name', 'Joe'); // Object ('Edmund' is now 'Joe')
```

### `amp.object.clone(obj)`
Clone an object. Returns `Object`.

#### Configuration
- `obj`: The `Object` that will be cloned

#### Examples
```js
const original = {
  a: 'one',
  b: {
    one: [1, 2, 3],
  },
};

const clone = amp.object.clone(original);
```

### `amp.object.equal(a, b)`
Compare two `Objects` for equality. Returns `Boolean`.

#### Configuration
- `a`: The first `Object` for comparison
- `b`: The second `Object` for comparison

#### Examples
```js
amp.object.equal({ a: 'A'}, { a: 'A'}); // true

amp.object.equal({ a: 'A' }, { a: 'B' }); // false
```

### `amp.object.is(obj)`
Is this an object? Returns `Boolean`.

#### Configuration
- `obj`: The `Object` in question

#### Examples
```js
amp.object.is({ a: 'A' }); // true

amp.object.is('A string!'); // false
```

### `amp.object.merge(target, ...sources)`
Deep merge two or more objects. Returns `Object`.

#### Configuration
- `target`: Properties will be copied into this `Object`
- `sources`: One or more source `Objects` to merge into the target

#### Examples
```js
amp.object.merge({ a: 'A' }, { b: 'B' }); // { a: 'A', b: 'B' }

amp.object.merge({ a: 'A' }, { a: 'B' }); // { a: 'B' }
```

### `amp.object.options(defaultConfig, config)`
Build a configuration object with default values. Returns `Object`. This is similar to the `amp.object.merge()` method, but does not overwrite the default configuration values. Note that you may also use `amp.options()`, a synonym for this method.

#### Configuration
- `defaultConfig`: Default configuration options `Object`
- `config`: Configuration options `Object`, will overwrite default options

#### Examples
```js
const getAnimal = (config) => {
  const options = amp.object.options({
    name: 'Moby',
    type: 'dog',
  }, config);
  return options;
};

getAnimal({ name: 'Mighty' }); // { name: 'Mighty', type: 'dog' }

getAnimal({ name: 'Edith', type: 'cat' }); // { name: 'Edith', type: 'cat' }

getAnimal({ name: 'T-Bone', type: 'bird', age: 3 }); // { name: 'T-Bone', type: 'bird', age: 3 }
```


## Query String Utilities
### `amp.queryString.get(uri, key)`
Parse query string for a parameter value. Returns `String` or `null` if no value is found.

#### Configuration
- `uri`: The URI or query `String`
- `key`: The query string parameter name (`String`)

#### Examples
```js
const url = '?name=Edmund&type=cat';

amp.queryString.get(url, 'name'); // 'Edmund'
amp.queryString.get(url, 'type'); // 'cat'
```

### `amp.queryString.set(uri, key, value)`
Update query string with a new parameter value. Returns `String`.

#### Configuration
- `uri`: The URI or query `String`
- `key`: The query string parameter name (`String`)
- `value`: The new parameter value

#### Examples
```js
const url = '?name=Edmund&type=cat';

amp.queryString.set(url, 'name', 'Edith'); // '?name=Edith&type=cat'
amp.queryString.set(url, 'age', '3'); // '?name=Edmund&type=cat&age=3'
```


## String Utilities
### `amp.string.slug(str)`
Slugify the given string. Returns `String`.

#### Configuration
- `str`: The `String` to slugify

#### Examples
```js
amp.string.slug('Pomp & Circumstance'); // 'pomp-circumstance'
```

### `amp.string.titleCase(str)`
Transform a string to title case. Returns `String`.

#### Configuration
- `str`: The `String` to transform

#### Examples
```js
amp.string.titleCase('eine kleine nachtmusik'); // 'Eine Kleine Nachtmusik'
```

### `amp.string.trimSlashes(path)`
Trim slashes from a string or path. Returns `String`.

#### Configuration
- `path`: The `String` that will be trimmed

#### Examples
```js
amp.string.trimSlashes('/dogs/moby/fetch/'); // 'dogs/moby/fetch'
```
