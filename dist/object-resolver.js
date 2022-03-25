/**
 * Object Resolver
 * @license https://github.com/apphp/js-object-resolver/blob/main/LICENSE
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2021-2022 Samuel Akopyan <admin@apphp.com>
 */

"use strict";

/**
 |------------------------------------------------------------
 | Main functions
 |------------------------------------------------------------
 */

/**
 * Check if object has nested property and returns it or default value
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
 * Deep cloning - create a real clone of object (not by reference)
 * Usable for cloning objects, that includes other objects
 * @usage: objCopy = cloneObject(obj);
 */
const cloneObject = function (obj) {
  if (!obj) {
    return obj;
  }
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if object has chained nested property and return the last found property value
 * @example: obj = { role: { role: { role: 'student' } }}
 * @usage: let role = objectGetNestedProperty(obj, 'role');
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
  cloneObject: cloneObject
}

