
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

### isEqual(obj, propertyPath)
Compares two objects for deep equality
```js
const result = resolver.isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } });
const result = resolver.isEqual([1, 2, 3], [1, 2, 4]);
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
