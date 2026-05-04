"use strict";

function isEqual(obj1, obj2) {
  const seen = new WeakMap();

  function deepEqual(value1, value2) {
    if (Object.is(value1, value2)) {
      return true;
    }

    if (value1 === null || value2 === null || typeof value1 !== 'object' || typeof value2 !== 'object') {
      return false;
    }

    if (Object.getPrototypeOf(value1) !== Object.getPrototypeOf(value2)) {
      return false;
    }

    if (seen.has(value1)) {
      return seen.get(value1) === value2;
    }
    seen.set(value1, value2);

    if (value1 instanceof Date && value2 instanceof Date) {
      return value1.getTime() === value2.getTime();
    }

    if (value1 instanceof RegExp && value2 instanceof RegExp) {
      return value1.source === value2.source && value1.flags === value2.flags;
    }

    if (value1 instanceof ArrayBuffer && value2 instanceof ArrayBuffer) {
      if (value1.byteLength !== value2.byteLength) {
        return false;
      }

      const view1 = new Uint8Array(value1);
      const view2 = new Uint8Array(value2);

      for (let i = 0; i < view1.length; i++) {
        if (view1[i] !== view2[i]) {
          return false;
        }
      }

      return true;
    }

    if (ArrayBuffer.isView(value1) && ArrayBuffer.isView(value2)) {
      if (value1.constructor !== value2.constructor || value1.length !== value2.length) {
        return false;
      }

      for (let i = 0; i < value1.length; i++) {
        if (!Object.is(value1[i], value2[i])) {
          return false;
        }
      }

      return true;
    }

    if (value1 instanceof Map && value2 instanceof Map) {
      if (value1.size !== value2.size) {
        return false;
      }

      for (const [key1, mapValue1] of value1) {
        let hasMatch = false;

        for (const [key2, mapValue2] of value2) {
          if (deepEqual(key1, key2) && deepEqual(mapValue1, mapValue2)) {
            hasMatch = true;
            break;
          }
        }

        if (!hasMatch) {
          return false;
        }
      }

      return true;
    }

    if (value1 instanceof Set && value2 instanceof Set) {
      if (value1.size !== value2.size) {
        return false;
      }

      for (const setValue1 of value1) {
        let hasMatch = false;

        for (const setValue2 of value2) {
          if (deepEqual(setValue1, setValue2)) {
            hasMatch = true;
            break;
          }
        }

        if (!hasMatch) {
          return false;
        }
      }

      return true;
    }

    if (Array.isArray(value1) && Array.isArray(value2)) {
      if (value1.length !== value2.length) {
        return false;
      }

      for (let i = 0; i < value1.length; i++) {
        if (!deepEqual(value1[i], value2[i])) {
          return false;
        }
      }

      return true;
    }

    const keys1 = Reflect.ownKeys(value1);
    const keys2 = Reflect.ownKeys(value2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!Object.prototype.hasOwnProperty.call(value2, key)) {
        return false;
      }

      if (!deepEqual(value1[key], value2[key])) {
        return false;
      }
    }

    return true;
  }

  return deepEqual(obj1, obj2);
}

function filterObject(obj, predicate) {
  if (!obj || typeof obj !== 'object') {
    return {};
  }

  if (typeof predicate !== 'function') {
    throw new TypeError('Predicate should be a function');
  }

  const result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key])) {
      result[key] = obj[key];
    }
  }

  return result;
}

function removeUndefinedProperties(obj) {
  if (Array.isArray(obj)) {
    return obj.map(removeUndefinedProperties);
  }

  if (typeof obj === 'object' && obj !== null) {
    const result = {};

    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
        result[key] = removeUndefinedProperties(value);
      }
    }

    return result;
  }

  return obj;
}

const getNestedProperty = function (obj, path, defaultValue = undefined) {
  let current = obj;

  if (!current || !path) {
    return returnValue(current, defaultValue);
  }

  const properties = path.split('.');

  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    if (!(current = validatePropertyExists(current, prop))) {
      break;
    }

    current = current[prop];
  }

  return returnValue(current, defaultValue);
};

const hasNestedProperty = function (obj, path) {
  let current = obj;
  let isFound = true;

  if (!current || !path) {
    return false;
  }

  const properties = path.split('.');

  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    if (!(current = validatePropertyExists(current, prop))) {
      isFound = false;
      break;
    }

    current = current[prop];
  }

  return isFound;
};

const fetchLastNestedProperty = function (obj, path) {
  if (!obj || !path) {
    return undefined;
  }

  let result;
  let property;

  for (property in obj) {
    if (obj.hasOwnProperty(property) && property === path) {
      if (typeof obj[property] === 'object') {
        result = fetchLastNestedProperty(obj[property], path);
      } else {
        result = obj[property];
      }
    }
  }

  return result;
};

const setNestedProperty = function (obj, path, value) {
  let keys = path;
  let current = obj;

  if (typeof keys === 'string') {
    keys = keys.split('.');
  }

  if (!Array.isArray(keys)) {
    throw new Error('Path must be a string or an array');
  }

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      throw new Error('Invalid property key');
    }

    const isArray = Array.isArray(current);
    const isArrayNotation = key.includes('[') && key.endsWith(']');
    const isNumericKey = /^\d+$/.test(key.replace(/\[.*\]/, ''));

    if (isArray && isArrayNotation && isNumericKey) {
      const [arrayKey, indexKey] = key.split(/\[|\]/).filter(Boolean);
      const index = parseInt(indexKey, 10);

      while (current[arrayKey].length <= index) {
        current[arrayKey].push(null);
      }

      if (i === keys.length - 1) {
        current[arrayKey][index] = value;
      } else {
        if (!current[arrayKey][index]) current[arrayKey][index] = {};
        current = current[arrayKey][index];
      }
    } else {
      if (i === keys.length - 1) {
        current[key] = value;
      } else {
        if (!current[key]) current[key] = {};
        current = current[key];
      }
    }
  }
};

const deleteNestedProperty = function (obj, path) {
  if (obj === null || typeof obj !== 'object') {
    return;
  }

  const keys = Array.isArray(path) ? path : path.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) {
      return;
    }
    current = current[key];
  }

  const lastKey = keys[keys.length - 1];
  if (Array.isArray(current) && lastKey in current) {
    current.splice(lastKey, 1);
  } else {
    delete current[lastKey];
  }
};

const cloneObject = function (obj) {
  if (!obj) {
    return obj;
  }

  return JSON.parse(JSON.stringify(obj));
};

const cloneStructure = function (obj, options) {
  if (!obj) {
    return obj;
  }

  return structuredClone(obj, options);
};

const cloneForImmutableOperation = function (obj) {
  if (typeof structuredClone === 'function') {
    return structuredClone(obj);
  }

  return cloneObject(obj);
};

const setNestedPropertyImmutable = function (obj, path, value) {
  const objCopy = cloneForImmutableOperation(obj);
  setNestedProperty(objCopy, path, value);
  return objCopy;
};

const deleteNestedPropertyImmutable = function (obj, path) {
  const objCopy = cloneForImmutableOperation(obj);
  deleteNestedProperty(objCopy, path);
  return objCopy;
};

const returnValue = function (objParam, defaultValue) {
  if (typeof objParam !== 'undefined') {
    return objParam;
  }

  if (typeof defaultValue !== 'undefined') {
    return defaultValue;
  }

  return undefined;
};

const validatePropertyExists = function (obj, prop) {
  let result = obj;

  if (!obj || !obj.hasOwnProperty(prop)) {
    result = undefined;
  }

  return result;
};

module.exports = {
  isEqual: isEqual,
  filterObject: filterObject,
  removeUndefinedProperties: removeUndefinedProperties,
  hasNestedProperty: hasNestedProperty,
  getNestedProperty: getNestedProperty,
  fetchLastNestedProperty: fetchLastNestedProperty,
  setNestedProperty: setNestedProperty,
  deleteNestedProperty: deleteNestedProperty,
  setNestedPropertyImmutable: setNestedPropertyImmutable,
  deleteNestedPropertyImmutable: deleteNestedPropertyImmutable,
  cloneObject: cloneObject,
  cloneStructure: cloneStructure
};
