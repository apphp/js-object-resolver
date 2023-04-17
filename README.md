
# Object Resolver 
### Provides general functionality for dealing with nested properties in JavaScript objects
&nbsp;

Available methods:
- hasNestedProperty
- getNestedProperty
- fetchNestedProperty
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

### hasNestedProperty(obj, propertyPath)
Check if nested property exists, if not return default value
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

### fetchNestedProperty(obj, path)
Fetch chained nested property
```js
const prop = resolver.fetchNestedProperty(obj, 'prop');
```

### cloneObject(obj)
Deep cloning of object
```js
const objCopy = resolver.cloneObject(obj);
```

### cloneStructure(obj, options)
Deep cloning of structure
```js
const structureCopy = resolver.cloneStructure(obj, options);
```

## Examples

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
const role = resolver.fetchNestedProperty(obj, 'role');
```

```js
const obj = {'a':{'b':2}, 'c':3};
const objCopy = resolver.cloneObject(obj);
```

## License
MIT
