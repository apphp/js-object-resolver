/**

*/

class ObjectResolver {

  /**
   * Prepare return value
   * @param objParam
   * @param defaultValue
   */
  returnValue = function (objParam, defaultValue) {
    if (typeof objParam !== "undefined") {
      return objParam;
    }

    if (defaultValue !== null) {
      return defaultValue;
    }

    return undefined;
  }

  /**
   * Check if object has nested property and returns it or default value
   * @usage: console.log(objectGetNestedProperty(obj, 'innerObject.deepObject.value', false));
   */
  objectGetNestedProperty(objParam, propertyPath, defaultValue = null) {
    let obj = objParam;

    if (!obj || !propertyPath) {
      return returnValue(obj, defaultValue);
    }

    const properties = propertyPath.split('.');

    for (let i = 0; i < properties.length; i++) {
      const prop = properties[i];

      if (!obj || !obj.hasOwnProperty(prop)) {
        obj = undefined;
        break;
      }

      obj = obj[prop];
    }

    return returnValue(obj, defaultValue);
  }

  /**
   * Check if object has nested property
   * @usage: console.log(objectHasNestedProperty(obj, 'innerObject.deepObject.value'));
   */
  objectHasNestedProperty(obj, propertyPath) {
    return objectGetNestedProperty(obj, propertyPath) !== undefined;
  }

  /**
   * Deep cloning - create a real clone of object (not by reference)
   * Usable for cloning objects, that includes other objects
   * @usage: objCopy = objectClone(obj);
   */
  objectClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}

export default (new ObjectResolver());
