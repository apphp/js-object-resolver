
# Object Resolver 
### Provides general functionality for dealing with nested properties in JavaScript objects
&nbsp;
Available methods:
- objectHasNestedProperty
- objectGetNestedProperty
- objectClone
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


## Usage

Require package:
```js
const resolver = require('@apphp/object-resolver');
//import resolver from "@apphp/object-resolver";
```

### objectHasNestedProperty(obj, propertyPath)
Check if nested property exists, if not return default value
```js
const prop = resolver.objectHasNestedProperty(obj, 'innerObject.deepObject.value');
const prop = resolver.objectHasNestedProperty(obj, 'innerObject.deepObject.value', 'defaultValue');
```

### objectGetNestedProperty(objParam, propertyPath, defaultValue)
Get nested property exists and if not empty perform some action
```js
const prop = resolver.objectGetNestedProperty(obj, 'innerObject.deepObject.value')
if (prop) {
  // ...
}
```

### objectClone(obj)
Deep cloning of object
```js
const objCopy = resolver.objectClone(obj);
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

console.log(resolver.objectHasNestedProperty(obj, 'innerObject.deepObject.value'));                         // true
console.log(resolver.objectHasNestedProperty(obj, 'innerObject.deepObject.wrongValue'));                    // false
console.log(resolver.objectGetNestedProperty(obj, 'innerObject.deepObject.value'));                         // 'Here I am'
console.log(resolver.objectGetNestedProperty(obj, 'innerObject.deepObject.wrongValue'));                    // undefined
console.log(resolver.objectGetNestedProperty(obj, 'innerObject.deepObject.wrongValue.oneMore', 'Oh-h-h'));  // 'Oh-h-h'
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

console.log(resolver.objectHasNestedProperty(obj, 'innerObject.deepObject.0.name'));              // true
console.log(resolver.objectGetNestedProperty(obj, 'innerObject.deepObject.1.name'));              // 'Nick'
```


```js
const obj = {'a':{'b':2}, 'c':3};
const objCopy = resolver.objectClone(obj);
```

## License
MIT
