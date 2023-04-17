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
 * Check if object has nested property and returns it or default value
 * @param objParam
 * @param propertyPath
 * @param defaultValue
 * @usage: console.log(getNestedProperty(obj, 'innerObject.deepObject.value', false));
 */
const getNestedProperty = function (objParam, propertyPath, defaultValue) {
  let obj = objParam;

  if (!obj || !propertyPath) {
    return returnValue(obj, defaultValue);
  }

  const properties = propertyPath.split('.');

  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    if (!(obj = validatePropertyExists(obj, prop))) {
      break;
    }

    obj = obj[prop];
  }

  return returnValue(obj, defaultValue);
}

/**
 * Check if object has nested property
 * @param objParam
 * @param propertyPath
 * @usage: console.log(hasNestedProperty(obj, 'innerObject.deepObject.value'));
 */
const hasNestedProperty = function (objParam, propertyPath) {
  let obj = objParam;
  let isFound = true;

  if (!obj || !propertyPath) {
    return false;
  }

  const properties = propertyPath.split('.');

  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    if (!(obj = validatePropertyExists(obj, prop))) {
      isFound = false;
      break;
    }

    obj = obj[prop];
  }

  return isFound;
}

/**
 * Check if object has chained nested property and return the last found property value
 * @param obj
 * @param path
 * @usage: const obj = { role: { role: { role: 'student' } }};
 *         const role = fetchNestedProperty(obj, 'role');
 */
const fetchNestedProperty = function (obj, path) {
  if (!obj || !path) {
    return undefined;
  }

  let result, property;
  for (property in obj) {
    if (obj.hasOwnProperty(property) && property === path) {
      if (typeof obj[property] === 'object') {
        result = fetchNestedProperty(obj[property], path);
      } else {
        result = obj[property];
      }
    }
  }
  return result;
};

/**
 * Deep cloning - creates a real clone of object (not by reference)
 * Usable for cloning objects, that includes other objects
 * @param obj
 * @usage: objCopy = cloneObject(obj);
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
 * @param obj
 * @param options object with the following properties: transfer (array of transferable objects that will be moved rather than cloned to the returned object.)
 * @usage: deepClone = cloneObject(obj, options);
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
 * Prepare return value
 * @param objParam
 * @param defaultValue
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
 * Validates if property exists
 * @param obj
 * @param prop
 */
const validatePropertyExists = function (obj, prop) {
  let result = obj
  if (!obj || !obj.hasOwnProperty(prop)) {
    result = undefined;
  }
  return result;
}

module.exports = {
  hasNestedProperty: hasNestedProperty,
  getNestedProperty: getNestedProperty,
  fetchNestedProperty: fetchNestedProperty,
  cloneObject: cloneObject,
  cloneStructure: cloneStructure
}

