
# Object Resolver 
### Provides general functionality for dealing with nested properties in JavaScript objects
&nbsp;

Available methods:
- isEqual
- filterObject
- removeUndefinedProperties
- hasNestedProperty
- getNestedProperty
- fetchLastNestedProperty
- setNestedProperty
- deleteNestedProperty
- cloneObject
- cloneStructure

&nbsp;

## Install

Install / Uninstall with [npm](https://www.npmjs.com/):

```sh
$ npm install @apphp/object-resolver
```

## Uninstall

```sh
$ npm uninstall @apphp/object-resolver
```

## Run Tests
```sh
$ npm run test
```
After tests running coverage report can be found in coverage directory


## Run ESLint
To perform ESlint check run following command: 
```sh
$ npm run eslint
```
To fix issues, found by ESLint run:
```sh
$ npm run eslint-fix
```

## Usage

Require package:
```js
// by using require
const resolver = require('@apphp/object-resolver');
// by using import 
//import resolver from "@apphp/object-resolver";
// by using object destructor
//const {cloneObject} = require('dist/object-resolver');
```

### isEqual(value1, value2)
Compares two values for deep equality.

`isEqual()` performs a recursive deep comparison and supports primitives, arrays, plain objects, and common built-in JavaScript types.

Behavior highlights:
- Object key order does not matter (`{ a: 1, b: 2 }` equals `{ b: 2, a: 1 }`)
- Nested objects/arrays are compared deeply
- Supports `Date`, `RegExp`, `Map`, `Set`, `ArrayBuffer`, and typed arrays
- Handles circular references safely
- Uses strict prototype checks (values with different prototypes are not equal)

```js
resolver.isEqual({ a: 1, b: { c: 2 } }, { b: { c: 2 }, a: 1 }); // true
resolver.isEqual([1, 2, 3], [1, 2, 4]); // false

resolver.isEqual(new Date('2023-01-01'), new Date('2023-01-01')); // true
resolver.isEqual(/abc/gi, /abc/g); // false

resolver.isEqual(new Set([1, { a: 2 }]), new Set([{ a: 2 }, 1])); // true

const x = { a: 1 };
const y = { a: 1 };
x.self = x;
y.self = y;
resolver.isEqual(x, y); // true
```

### filterObject(obj, predicate)
Filters the properties of an object based on a predicate function
```js
const filtered = resolver.filterObject({ a: 1, b: 2, c: 3, d: 4 }, (value, key) => value % 2 === 0);
```

### removeUndefinedProperties(obj)
Removes properties with `undefined` values from an object
```js
const cleaned = resolver.removeUndefinedProperties({ a: 1, b: undefined, c: { d: 4, e: undefined } });
```

### hasNestedProperty(obj, propertyPath)
Checks if nested property exists, if not return default value
```js
const prop = resolver.hasNestedProperty(obj, 'innerObject.deepObject.value');
const prop = resolver.hasNestedProperty(obj, 'innerObject.deepObject.value', 'defaultValue');
```

### getNestedProperty(objParam, propertyPath, defaultValue)
Get nested property exists and if not empty perform some action
```js
const prop = resolver.getNestedProperty(obj, 'innerObject.deepObject.value')
if (prop) {
  // ...
}
```

### fetchLastNestedProperty(obj, path)
Fetch last chained nested property
```js
const prop = resolver.fetchLastNestedProperty(obj, 'prop');
```

### setNestedProperty(obj, path, value)
Set a deeply nested property in an object
```js
const prop = resolver.setNestedProperty(obj, 'user.profile.name', 'John Doe');
```

### deleteNestedProperty(obj, path)
Delete a deeply nested property in an object
```js
const prop = resolver.deleteNestedProperty(obj, 'user.profile.name', 'John Doe');
```

### cloneObject(obj)
Deep cloning of object
```js
const objCopy = resolver.cloneObject(obj);
```

### cloneStructure(obj, options)
Deep cloning of structure (node > v17)
```js
const structureCopy = resolver.cloneStructure(obj, options);
```

## Examples

```js
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
const compareResult = resolver.isEqual(obj1, obj2);
```

```js
const original = { a: 1, b: 2, c: 3, d: 4 };
const filtered = resolver.filterObject(original, (value, key) => value % 2 === 0);
console.log(filtered); 
```

```js
const original = { a: 1, b: undefined, c: { d: 4, e: undefined } };
const cleaned = resolver.removeUndefinedProperties(original);
```

```js
const obj = {
  innerObject: {
    deepObject: {
      value: 'Here I am'
    }
  }
};

console.log(resolver.hasNestedProperty(obj, 'innerObject.deepObject.value'));                         // true
console.log(resolver.hasNestedProperty(obj, 'innerObject.deepObject.wrongValue'));                    // false
console.log(resolver.getNestedProperty(obj, 'innerObject.deepObject.value'));                         // 'Here I am'
console.log(resolver.getNestedProperty(obj, 'innerObject.deepObject.wrongValue'));                    // undefined
console.log(resolver.getNestedProperty(obj, 'innerObject.deepObject.wrongValue.oneMore', 'Oh-h-h'));  // 'Oh-h-h'
```

```js
const obj = {
  innerObject: {
    deepObject: [
      { name: 'John' },
      { name: 'Nick' },
      { name: 'Ron' }
    ]
  }
};

console.log(resolver.hasNestedProperty(obj, 'innerObject.deepObject.0.name'));              // true
console.log(resolver.getNestedProperty(obj, 'innerObject.deepObject.1.name'));              // 'Nick'
```

```js
const obj = { role: { role: { role: 'student' } }};
const role = resolver.fetchLastNestedProperty(obj, 'role');
```

```js
const obj = {'a':{'b':2}, 'c':3};
const objCopy = resolver.cloneObject(obj);
```

## License
MIT
