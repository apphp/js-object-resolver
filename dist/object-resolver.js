/**
 * Object Resolver
 * @license https://github.com/apphp/js-object-resolver/blob/main/LICENSE
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2021-2023 Samuel Akopyan <admin@apphp.com>
 */

"use strict";

/**
 |------------------------------------------------------------
 | Main functions
 |------------------------------------------------------------
 */

/**
 * Compares two objects for deep equality.
 *
 * @function
 * @name isEqual
 * @param {Object} obj1 - The first object to compare.
 * @param {Object} obj2 - The second object to compare.
 * @returns {boolean} Returns true if the objects are deeply equal, otherwise false.
 * @example
 * isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })
 * // => true
 *
 * isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })
 * // => false
 */
function isEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Filters the properties of an object based on a predicate function.
 *
 * @function
 * @name filterObject
 * @param {Object} obj - The object to filter.
 * @param {function} predicate - A function that tests each property's value. Return `true` to keep the property, `false` otherwise.
 * @returns {Object} A new object with properties that pass the predicate test.
 * @throws {TypeError} Will throw a TypeError if the first argument is not an object or the second argument is not a function.
 * @example
 *
 * const original = { a: 1, b: 2, c: 3, d: 4 };
 * const filtered = filterObject(original, (value, key) => value % 2 === 0);
 * console.log(filtered); // Outputs: { b: 2, d: 4 }
 *
 * @note
 * This function does not modify the original object; it returns a new one.
 */
function filterObject(obj, predicate) {
  if (!obj || typeof obj !== 'object') {
    return {};
  }

  if (typeof predicate !== 'function') {
    throw new TypeError('Predicate should be a function');
  }

  const result = {};

  for(const key in obj) {
    if(obj.hasOwnProperty(key) && predicate(obj[key])) {
      result[key] = obj[key];
    }
  }

  return result;
}

/**
 * Recursively removes properties with `undefined` values from an object.
 *
 * @function
 * @name removeUndefinedProperties
 * @param {Object} obj - The object from which to remove properties.
 * @returns {Object} A new object with all properties with `undefined` values removed.
 * @throws Will throw an error if the provided argument is not an object.
 * @example
 *
 * const original = { a: 1, b: undefined, c: { d: 4, e: undefined } };
 * const cleaned = removeUndefinedProperties(original);
 * console.log(cleaned); // Outputs: { a: 1, c: { d: 4 } }
 *
 * @note
 * This function does not modify the original object; it returns a new one.
 * The function will recursively traverse nested objects and remove properties with `undefined` values.
 */
function removeUndefinedProperties(obj) {
  if (Array.isArray(obj)) {
    return obj.map(removeUndefinedProperties);
  }

  if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
        // Recurse into nested objects
        result[key] = removeUndefinedProperties(value);
      }
    }
    return result;
  }

  return obj;
}

/**
 * Check if object has nested property and returns it or default value.
 * If the property does not exist, it returns the provided default value or undefined.
 *
 * @function
 * @name getNestedProperty
 * @param {Object} obj - The object to query.
 * @param {string} path - The path of the property to get, formed as "prop1.prop2.prop3".
 * @param {*} defaultValue - The value returned if the property path is undefined.
 * @returns {*} - The value at the specified property path or defaultValue.
 * @example
 *
 * const obj = {
 *   user: {
 *     name: 'John Doe',
 *     address: {
 *       city: 'New York'
 *     }
 *   }
 * };
 *
 * getNestedProperty(obj, 'user.address.city', 'Unknown'); // Returns 'New York'
 * getNestedProperty(obj, 'user.age', 'Unknown'); // Returns 'Unknown'
 */
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
}

/**
 * Determines whether an object has a nested property corresponding to the specified property path.
 *
 * @function
 * @name hasNestedProperty
 * @param {Object} obj - The object to inspect.
 * @param {string} path - The path of the property to check, formed as "prop1.prop2.prop3".
 * @returns {boolean} Returns true if the nested property is found, otherwise false.
 * @example
 *
 * const obj = {
 *   user: {
 *     name: 'John Doe',
 *     address: {
 *       city: 'New York'
 *     }
 *   }
 * };
 *
 * hasNestedProperty(obj, 'user.address.city'); // Returns true
 * hasNestedProperty(obj, 'user.age'); // Returns false
 */
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
}

/**
 * Recursively searches for a nested property in an object and returns the value of the last occurrence of that property in the object chain.
 *
 * @function
 * @name fetchLastNestedProperty
 * @param {Object} obj - The object to search within.
 * @param {string} path - The name of the property to search for.
 * @returns {*} Returns the value of the last occurrence of the nested property if found, otherwise undefined.
 * @throws Will not throw an error if the property does not exist in the object chain.
 * @example
 *
 * const obj = { role: { role: { role: 'student' } }};
 * const role = fetchLastNestedProperty(obj, 'role'); // Returns 'student'
 */
const fetchLastNestedProperty = function (obj, path) {
  if (!obj || !path) {
    return undefined;
  }

  let result, property;

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
}

/**
 * Set a deeply nested property in an object.
 *
 * @param {Object} obj - The object in which to set the nested property.
 * @param {string|string[]} path - The path to the nested property (e.g., 'user.profile.name', 'user.profile[0].name' or ['user', 'profile[0]', 'name']).
 * @param {*} value - The value to set for the nested property.
 */
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

    // Prevent prototype pollution
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      throw new Error('Invalid property key');
    }

    // Check if the current property is an array and if the key has array notation
    const isArray = Array.isArray(current);
    const isArrayNotation = key.includes('[') && key.endsWith(']');
    const isNumericKey = /^\d+$/.test(key.replace(/\[.*\]/, ''));

    if (isArray && isArrayNotation && isNumericKey) {
      const [arrayKey, indexKey] = key.split(/\[|\]/).filter(Boolean);
      const index = parseInt(indexKey, 10);

      while (current[arrayKey].length <= index) {
        current[arrayKey].push(null); // Ensure the array is long enough
      }

      if (i === keys.length - 1) {
        // Last key in the path, set the value
        current[arrayKey][index] = value;
      } else {
        // Prevent undefined objects in the path
        if (!current[arrayKey][index]) current[arrayKey][index] = {};
        current = current[arrayKey][index];
      }
    } else {
      if (i === keys.length - 1) {
        // Last key in the path, set the value
        current[key] = value;
      } else {
        // Prevent undefined objects in the path
        if (!current[key]) current[key] = {};
        current = current[key];
      }
    }
  }
}


/**
 * Delete a deeply nested property in an object.
 *
 * @param {Object} obj - The object from which to delete the nested property.
 * @param {string|string[]} path - The path to the nested property (e.g., 'user.profile.name' or ['user', 'profile', 'name']).
 */
const deleteNestedProperty = function (obj, path) {
  if (obj === null || typeof obj !== 'object') {
    return; // Object is null or not an object, nothing to delete
  }

  const keys = Array.isArray(path) ? path : path.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) {
      return; // Property doesn't exist, nothing to delete
    }
    current = current[key];
  }

  const lastKey = keys[keys.length - 1];
  if (Array.isArray(current) && lastKey in current) {
    current.splice(lastKey, 1); // Delete element in array
  } else {
    delete current[lastKey]; // Delete property in object
  }
}


/**
 * Creates a deep clone of the given object.
 * (real clone of object, not by reference)
 *
 * @function
 * @name cloneObject
 * @param {Object} obj - The object to clone.
 * @returns {Object|null} Returns a deep clone of the original object or the original object if it is falsy.
 * @example
 *
 * const original = { a: 1, b: { c: 2 } };
 * const cloned = cloneObject(original);
 * console.log(cloned); // Outputs: { a: 1, b: { c: 2 } }
 *
 * @note
 * This function uses `JSON.parse` and `JSON.stringify` for cloning,
 * so it will not correctly clone functions, `undefined`, `RegExp`, `Map`, `Set`, etc.
 * It is suitable for plain objects with primitive types, arrays, and nested structures.
 */
const cloneObject = function (obj) {
  if (!obj) {
    return obj;
  }
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Clone Structure - deep clone of a given object using the structured clone algorithm
 * Usable for cloning nested objects, arrays, cyclic references, different JS types, etc.
 * Transferred objects are detached from the original object and attached to the new object; they are no longer accessible in the original object.
 *
 *
 * @function
 * @name cloneStructure
 * @param {Object} obj - The object to clone.
 * @param {Object} [options] - Optional settings for cloning the structure.
 * @returns {Object|null} Returns a structured clone of the original object, or the original object if it is falsy.
 * @throws Will throw an error if the `structuredClone` fails.
 * @example
 *
 * const original = { a: 1, b: { c: 2 } };
 * const cloned = cloneStructure(original, options);
 * console.log(cloned); // Outputs a structured clone of the original object
 *
 * @note
 * This function relies on the `structuredClone` function,
 * and the cloning accuracy and capabilities depend on it.
 */
const cloneStructure = function (obj, options) {
  if (!obj) {
    return obj;
  }

  return structuredClone(obj, options);
}


/**
 |------------------------------------------------------------
 | Helpers
 |------------------------------------------------------------
 */

/**
 * Prepare return value - returns the first defined value among the provided values.
 *
 * @function
 * @name returnValue
 * @param {*} objParam - The primary value to return if it's defined.
 * @param {*} [defaultValue] - The secondary value to return if the primary value is undefined.
 * @returns {*} Returns the primary value if it's defined; otherwise, returns the secondary value if it's defined, and undefined if both are undefined.
 * @example
 *
 * console.log(returnValue(undefined, 'default')); // Outputs: 'default'
 * console.log(returnValue('primary', 'default')); // Outputs: 'primary'
 * console.log(returnValue(undefined, undefined)); // Outputs: undefined
 *
 * @note
 * This function doesn't check whether the values are null, it only checks whether the values are undefined.
 */
const returnValue = function (objParam, defaultValue) {
  if (typeof objParam !== "undefined") {
    return objParam;
  }

  if (typeof defaultValue !== "undefined") {
    return defaultValue;
  }

  return undefined;
}

/**
 * Validates whether a property exists on an object and returns the object if it does, otherwise returns undefined.
 *
 * @function
 * @name validatePropertyExists
 * @param {Object} obj - The object to validate.
 * @param {string} prop - The name of the property to check.
 * @returns {Object|undefined} Returns the original object if the property exists, otherwise returns undefined.
 * @example
 *
 * const obj = { name: 'John' };
 * console.log(validatePropertyExists(obj, 'name')); // Outputs: { name: 'John' }
 * console.log(validatePropertyExists(obj, 'age')); // Outputs: undefined
 *
 * @note
 * This function only checks whether the property exists directly on the object, and does not check the object's prototype chain.
 */
const validatePropertyExists = function (obj, prop) {
  let result = obj
  if (!obj || !obj.hasOwnProperty(prop)) {
    result = undefined;
  }

  return result;
}


module.exports = {
  isEqual: isEqual,
  filterObject: filterObject,
  removeUndefinedProperties: removeUndefinedProperties,
  hasNestedProperty: hasNestedProperty,
  getNestedProperty: getNestedProperty,
  fetchLastNestedProperty: fetchLastNestedProperty,
  setNestedProperty: setNestedProperty,
  deleteNestedProperty: deleteNestedProperty,
  cloneObject: cloneObject,
  cloneStructure: cloneStructure
}

