
# Object Resolver 
### Provides general functionality for dealing with nested properties in JavaScript objects
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

Check if nested property exists
```js
const prop = objectHasNestedProperty(obj, 'innerObject.deepObject.value');
```
Check if nested property exists, if not return default value
```js
const prop = objectHasNestedProperty(obj, 'innerObject.deepObject.value', 'defaultValue');
```
Get nested property exists and if not empty perform some action
```js
const prop = objectGetNestedProperty(obj, 'innerObject.deepObject.value')
if (prop) {
  // ...
}
```
Deep cloning of object
```js
const objCopy = objectClone(obj);
```

## Examples

```js
const {objectHasNestedProperty, objectGetNestedProperty} = require('nested-props-validator');

const obj = {
  innerObject: {
    deepObject: {
      value: 'Here I am'
    }
  }
};

console.log(objectHasNestedProperty(obj, 'innerObject.deepObject.value'));                         // true
console.log(objectHasNestedProperty(obj, 'innerObject.deepObject.wrongValue'));                    // false
console.log(objectGetNestedProperty(obj, 'innerObject.deepObject.value'));                         // 'Here I am'
console.log(objectGetNestedProperty(obj, 'innerObject.deepObject.wrongValue'));                    // undefined
console.log(objectGetNestedProperty(obj, 'innerObject.deepObject.wrongValue.oneMore', 'Oh-h-h'));  // 'Oh-h-h'
```

```js
const nestedObj = require('nested-props-validator');
//import nestedObj from "nested-props-validator";

const obj = {
  innerObject: {
    deepObject: [
      { name: 'John' },
      { name: 'Nick' },
      { name: 'Ron' }
    ]
  }
};

console.log(nestedObj.objectHasNestedProperty(obj, 'innerObject.deepObject.0.name'));              // true
console.log(nestedObj.objectGetNestedProperty(obj, 'innerObject.deepObject.1.name'));              // 'Nick'
```


```js
const obj = {'a':{'b':2}, 'c':3};
const objCopy = objectClone(obj);
```